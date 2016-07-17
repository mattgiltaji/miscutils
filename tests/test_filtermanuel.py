# Tests for filtermanuel.py
# run from miscutils dir as:
#    py.test tests/test_filtermanuel.py

import pytest
import filtermanuel.filtermanuel as fm

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
        "monster", "yolo", "comma, ", "-dash", "37",
    ])
    def test_dont_copy_nonmatching_monster(self, test_input):
        assert not fm.should_copy(test_input, fake_monster_file_contents)


class TestGetFileContents:
    def test_get_blank_file_contents(self):
        pass

    def test_error_on_bad_filename(self):
        pass

    def test_get_big_file_contents(self):
        pass

    def test_get_small_file_contents(self):
        pass
