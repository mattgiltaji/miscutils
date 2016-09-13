# Tests for filtermanuel.py
# run from miscutils dir as:
#    py.test tests/test_filtermanuel.py

from os import path
import pytest

import filtermanuel.filtermanuel as fm

# paths to test files and such
current_dir = path.dirname(path.abspath(__file__))
test_data_dir = path.join(current_dir, 'files', 'filtermanuel')
basic_test_dir = path.join(test_data_dir, 'basic_files')
small_file = path.join(basic_test_dir, 'small.txt')
blank_file = path.join(basic_test_dir, 'blank.txt')
big_file = path.join(basic_test_dir, 'big.txt')
not_exist_file = path.join(basic_test_dir, 'not_exist.txt')
no_matches_dir = path.join(test_data_dir, 'copy_nothing')
some_matches_dir = path.join(test_data_dir, 'copy_some')
all_matches_dir = path.join(test_data_dir, 'copy_everything')


# hardcoding fun
fake_monster_file_contents = ("Monster", "Monster'1", "Monster 2", "Monster.37",
                              "monster-dash", "comma, the monster")


class TestShouldCopy:
    @pytest.mark.parametrize("test_input", [
        "=================================",  # real line
        "=====================================",  # longer
        "==========",# arbitrarily short but valid
        "====",  # shortest possible valid
    ])
    def test_copy_separator(self, test_input):
        assert fm.should_copy(test_input)

    @pytest.mark.parametrize("test_input", [
        "=", "==", "===",  # all too short
        "---------------------------",  # wrong symbol
        "-=-=-=-=-=-=-=-=-=-=",  # no mixing
        "----=======-----",  # nope
        "============================-",  # no dash
    ])
    def test_dont_copy_bad_separator(self,test_input):
        assert not fm.should_copy(test_input)

    @pytest.mark.parametrize("test_input", [
        "[Ye Olde Medievale Villagee]",  # real area
        # real areas (with fun characters)
        "[An Incredibly Strange Place (Mediocre Trip)]",
        "[Anger Man's Level]",
        "[The Gourd!]",
        "[LavaCo™ Lamp Factory]",
        "[A Deserted Stretch of I-911]",
    ])
    def test_copy_area_name(self, test_input):
        assert fm.should_copy(test_input)

    @pytest.mark.parametrize("test_input", [
        "[]", "[ ]",  # no blanks
        # fake areas to test regex bounds
        "[a]", "[urmom]", "[Urmom]", "[aarht shgthde aetgfgd]"
    ])
    def test_dont_copy_bad_area_name(self, test_input):
        assert not fm.should_copy(test_input)

    @pytest.mark.parametrize("test_input", [
        "Monster", "Monster 2", "Monster'1", "comma, the monster",
        "monster-dash", "Monster.37",
    ])
    def test_copy_matching_monster(self, test_input):
        assert fm.should_copy(test_input, fake_monster_file_contents)

    @pytest.mark.parametrize("test_input", [
        "monster", "yolo", "comma, ", "-dash", "37", "Monst",
    ])
    def test_dont_copy_nonmatching_monster(self, test_input):
        assert not fm.should_copy(test_input, fake_monster_file_contents)

    @pytest.mark.parametrize("test_input", [
        "Monster {1}", "Monster 2 {3}", "Monster'1 {2}",
        "comma, the monster {3}", "monster-dash {2}", "Monster.37 {1}",
    ])
    def test_copy_matching_monster_with_brackets(self, test_input):
        assert fm.should_copy(test_input, fake_monster_file_contents)


class TestGetFileContents:
    def test_get_blank_file_contents(self):
        results = fm.get_file_contents(blank_file)
        assert results == []

    def test_error_on_bad_filename(self):
        with pytest.raises(FileNotFoundError) as excinfo:
            fm.get_file_contents(not_exist_file)

    def test_get_big_file_contents(self):
        results = fm.get_file_contents(big_file)
        assert len(results) == 5001
        for x in range(0,5000):
            assert "this is a much longer line{0:04d}\n".format(x) in results

    def test_get_small_file_contents(self):
        results = fm.get_file_contents(small_file)
        assert len(results) == 11
        for x in range(0,10):
            assert "line{0:02d}\n".format(x) in results
        assert "line11\n" not in results


class TestFilterManuel:
    @pytest.mark.parametrize("test_dir", [
        no_matches_dir, some_matches_dir, all_matches_dir,
    ])
    def test_filtering(self, tmpdir, test_dir):
        actual_file = str(tmpdir.join('filtered_manuel.txt'))
        manuel_file = path.join(test_dir, 'manuel.txt')
        faxbot_file = path.join(test_dir, 'faxbot.txt')
        expected_file = path.join(test_dir, 'expected.txt')

        fm.filter_manuel(manuel_path=manuel_file, faxbot_path=faxbot_file,
                         output_path=actual_file)

        with open(expected_file, 'r') as ef:
            expected = ef.readlines()
        with open(actual_file, 'r') as af:
            actual = af.readlines()

        assert expected == actual
