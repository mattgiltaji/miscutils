# This script is intended to filter a file by lines contained in another
# This is as trivial as it sounds; we need to maintain insertion order
# More practically (in terms of Kingdom of Loathing):
#   Take the output from a monster manuel status utility
#   Find the matching monsters in a faxbot list
#   Output the list of matches (in manuel order) into an output file
#   We would also like to preserve area headings from manuel in the output
import re
import sys

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
ENDING_BRACKETS_REGEX = r' \{[0-3]\}$'
# This regex should match the {0} {1} {2} {3} line suffix in the monster manual
# In the monster manual, the number in the {} is how many factoids are missing


def should_copy(string, contents=()):
    """ Returns true if string should be copied to output file

    3 types of lines should return true:
    A) a monster that matches a line in contents
    B) a section header - [foo bar]
    C) a section divider - =====...===
    We don't necessarily evaluate these in order, we try the easy ones first

    :param str string: data to search for
    :param list contents: search space
    :return Boolean: whether the line should be copied to output or not
    """

    # Make a few calls with simpler regexes for clarity
    # As opposed to a single call with a complex regex
    if re.match(SECTION_SEPARATOR_REGEX, string) \
            or re.match(SECTION_HEADER_REGEX, string):
        return True

    # Now the huge loop. We might need to optimize this later.
    string_without_brackets = re.sub(ENDING_BRACKETS_REGEX, '', string)
    for line in contents:
        if string_without_brackets == line:
            return True
    return False


def get_file_contents(path_to_file):
    """
    Reads a file from the filesystem and returns its contents all at once
    :param str path_to_file:
    :return list: contents of the file, line by line
    """
    with open(path_to_file, 'r') as f:
        return f.readlines()


def filter_manuel(manuel_file, faxbot_file, output_file):
    manuel = get_file_contents(manuel_file)
    faxbot = get_file_contents(faxbot_file)
    with open(output_file, 'w') as output:
        for line in manuel:
            if should_copy(line, faxbot):
                output.write(line)





def parse_args(args):
    """
    Parses and validates command line arguments
    :param list args: arguments passed into the script (usually sys.argv[1:])
    :return: arguments parsed into a neat object
    """
    pass


def main():
    """
    Call parse_args, then pass to filter_manuel() fo do all the work
    :return: nothing
    """
    args = parse_args(sys.argv[1:])
    # filter_manuel()
    pass


if __name__ == "__main__":  # pragma: no cover
    main()