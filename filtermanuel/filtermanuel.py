# This script is intended to filter a file by lines contained in another
# This is as trivial as it sounds; we need to maintain insertion order
# More practically (in terms of Kingdom of Loathing):
#   Take the output from a monster manuel status utility
#   Find the matching monsters in a faxbot list
#   Output the list of matches (in manuel order) into an output file
#   We would also like to preserve area headings from manuel in the output

import re

SECTION_SEPARATOR_REGEX = '^=====*$'
# this regex should match the section separator.
# Why 5 equal signs? entirely arbitrary


def should_copy(contents):
    """ Returns true if contents should be copied to output file

    3 types of lines should return true:
    A) a monster that matches a line in the faxbot list
    B) a section header - [foo bar]
    C) a section divider - =====...===
    We don't necessarily evaluate these in order, we try the easy ones first

    :param str contents: data that will be checked
    :return: Boolean indicating the line should be copied to output
    """

    return re.match(SECTION_SEPARATOR_REGEX, contents)