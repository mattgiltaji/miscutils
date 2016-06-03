# This script is intended to filter a file by lines contained in another
# This is as trivial as it sounds; we need to maintain insertion order
# More practically (in terms of Kingdom of Loathing):
#   Take the output from a monster manuel status utility
#   Find the matching monsters in a faxbot list
#   Output the list of matches (in manuel order) into an output file
#   We would also like to preserve area headings from manuel in the output

import re

SECTION_SEPARATOR_REGEX = r'^=====*$'
# This regex should match the section separator.
# Why 5 equal signs? entirely arbitrary
SECTION_HEADER_REGEX = r'^\[[A-Z].*\s+.+\]$'
# This regex should match the name of an area, enclosed in square brackets
# Why is it so nasty? Kol lets a lot of things be in the area name
# Including punctuation, spaces, alphanumerics, non-ascii
# I've settled on an uppercase letter followed by other chars, with a space
#  somewhere in it, the whole thing in square brackets
# If it breaks, add more test scenarios and good luck


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

    # Make a few calls with simpler regexes for clarity
    # As opposed to a single call with a complex regex
    if re.match(SECTION_SEPARATOR_REGEX, contents) \
            or re.match(SECTION_HEADER_REGEX, contents):
        return True

    return False