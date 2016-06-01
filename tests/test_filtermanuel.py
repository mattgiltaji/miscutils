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
        # fake areas to test regex bounds
        assert not fm.should_copy("[a]")
        assert not fm.should_copy("[urmom]")
        assert not fm.should_copy("[aarht shgthde aetgfgd]")

    def test_dont_copy_bad_area_name(self):
        assert not fm.should_copy("[]")
        assert not fm.should_copy("[ ]")