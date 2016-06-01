# Tests for filtermanuel.py
# run from miscutils dir as:
#    py.test tests/test_filtermanuel.py

import pytest
import filtermanuel.filtermanuel as fm


class TestShouldCopy:

    def test_should_copy_separator(self):
        assert fm.should_copy("=================================")  # real line
        assert fm.should_copy("==========")  # arbitrarily short but valid
        assert fm.should_copy("====")  # shortest possible valid
        assert not fm.should_copy("=")
        assert not fm.should_copy("==")
        assert not fm.should_copy("===")  # longest invalid

        assert not fm.should_copy("---------------------------")  # wrong symbol
        assert not fm.should_copy("-=-=-=-=-=-=-=-=-=-=")  # no mixing
        assert not fm.should_copy("----=======-----")  # nope
        assert not fm.should_copy("============================-")  # no dash
