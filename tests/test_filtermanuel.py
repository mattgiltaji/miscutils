# Tests for filtermanuel.py
# run from miscutils dir as:
#    py.test tests/test_filtermanuel.py

import pytest
import filtermanuel.filtermanuel as fm


class TestShouldCopy:

    def test_copy_separator(self):
        assert fm.should_copy("=================================")  # real line
        assert fm.should_copy("=====================================")  # longer
        assert fm.should_copy("==========")  # arbitrarily short but valid
        assert fm.should_copy("====")  # shortest possible valid

    def test_dont_copy_bad_separator(self):
        assert not fm.should_copy("=")
        assert not fm.should_copy("==")
        assert not fm.should_copy("===")  # longest invalid

        assert not fm.should_copy("---------------------------")  # wrong symbol
        assert not fm.should_copy("-=-=-=-=-=-=-=-=-=-=")  # no mixing
        assert not fm.should_copy("----=======-----")  # nope
        assert not fm.should_copy("============================-")  # no dash

    def test_copy_area_name(self):
        # real area
        assert fm.should_copy("[Ye Olde Medievale Villagee]")
        # real areas (with fun characters)
        assert fm.should_copy("[An Incredibly Strange Place (Mediocre Trip)]")
        assert fm.should_copy("[Anger Man's Level]")
        assert fm.should_copy("[The Gourd!]")
        assert fm.should_copy("[LavaCo™ Lamp Factory]")
        assert fm.should_copy("[A Deserted Stretch of I-911]")

    def test_dont_copy_bad_area_name(self):
        assert not fm.should_copy("[]")
        assert not fm.should_copy("[ ]")
        # fake areas to test regex bounds
        assert not fm.should_copy("[a]")
        assert not fm.should_copy("[urmom]")
        assert not fm.should_copy("[Urmom]")
        assert not fm.should_copy("[aarht shgthde aetgfgd]")

    def test_copy_matching_monster(self):
        file_contents = ("Monster", "Monster'1", "Monster 2", "Monster.37",
                         "monster-dash", "comma, the monster")
        assert fm.should_copy("Monster", file_contents)
        assert fm.should_copy("Monster 2", file_contents)
        assert fm.should_copy("Monster'1", file_contents)
        assert fm.should_copy("comma, the monster", file_contents)
        assert fm.should_copy("monster-dash", file_contents)
        assert fm.should_copy("Monster.37", file_contents)

    def test_dont_copy_nonmatching_monster(self):
        file_contents = ("Monster", "Monster'1", "Monster 2", "Monster.37",
                         "monster-dash", "comma, the monster")
        assert not fm.should_copy("monster", file_contents)
        assert not fm.should_copy("yolo", file_contents)
        assert not fm.should_copy("comma, ", file_contents)
        assert not fm.should_copy("-dash", file_contents)
        assert not fm.should_copy("37", file_contents)


class TestGetFileContents:
    def test_get_blank_file_contents(self):
        pass

    def test_error_on_bad_filename(self):
        pass

    def test_get_big_file_contents(self):
        pass

    def test_get_small_file_contents(self):
        pass
