# This script is intended to filter a file by lines contained in another
# This is as trivial as it sounds; we need to maintain insertion order
# More practically (in terms of Kingdom of Loathing):
#   Take the output from a monster manuel status utility
#   Find the matching monsters in a faxbot list
#   Output the list of matches (in manuel order) into an output file
#   We would also like to preserve area headings from manuel in the output
import argparse
import re
import sys


SECTION_SEPARATOR_REGEX = r'^=====*$'
# This regex should match the section separator.
# Why 5 equal signs? entirely arbitrary
SECTION_HEADER_REGEX = r'^\[[A-Z]+.*\]$'
# This regex should match the name of an area, enclosed in square brackets
# Why is it so nasty? Kol lets a lot of things be in the area name
# Including punctuation, spaces, alphanumerics, non-ascii
# I've settled on an uppercase letter followed by other chars,
# the whole thing in square brackets. Spaces are not mandatory!
# If it breaks, add more test scenarios and good luck
ENDING_BRACKETS_REGEX = r' \{[0-3]\}$'
# This regex should match the {0} {1} {2} {3} line suffix in the monster manual
# In the monster manual, the number in the {} is how many factoids are missing


def should_copy(string, contents=None):
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
    if contents is None:
        contents = []

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


def remove_blank_areas(contents=None):
    """ Filter contents and remove any lines for blank areas.

    A blank area is defined as a section header followed immediately by a section divider

    :param list contents: search space
    :return list: contents with blank areas removed
    """
    if contents is None:
        contents = []

    filtered_contents = []

    # iterate manually so we can do lookahead
    try:
        it = iter(contents)
        while True:
            line = next(it)
            if re.match(SECTION_HEADER_REGEX, line):
                # Look at the next line to see if we keep this one
                next_line = next(it)
                if re.match(SECTION_SEPARATOR_REGEX, next_line):
                    # Nope, it's empty, so skip these lines
                    continue
                else:
                    # False alarm, keep these lines
                    filtered_contents.append(line)
                    filtered_contents.append(next_line)
            else:
                filtered_contents.append(line)
    except StopIteration:
        pass

    return filtered_contents


def get_file_contents(path_to_file):
    """
    Reads a file from the filesystem and returns its contents all at once
    :param str path_to_file:
    :return list: contents of the file, line by line
    """
    with open(path_to_file, 'r') as f:
        return f.readlines()


def filter_manuel(manuel_path, faxbot_path, output_path):
    """
    Copies lines from manuel to output, provided the line is also in faxbot
    :param manuel_path: path to the file with manuel data
    :param faxbot_path: path to the file with faxbot data
    :param output_path: path to file that will hold the filtered data
    :return: None, but writes files as a side effect
    """
    manuel = get_file_contents(manuel_path)
    faxbot = get_file_contents(faxbot_path)
    with open(output_path, 'w') as output:
        for line in manuel:
            if should_copy(line, faxbot):
                output.write(line)

    first_pass_contents = get_file_contents(output_path)
    second_pass_contents = remove_blank_areas(first_pass_contents)
    with open(output_path, 'w') as output:
        output.writelines(second_pass_contents)


def parse_args(args):
    """
    Parses and validates command line arguments
    :param list args: arguments passed into the script (usually sys.argv[1:])
    :return: arguments parsed into a neat object
    """
    parser = argparse.ArgumentParser(
        description='Filter the lines in a monster manuel data file by what '
                    'also exists in a faxbot data file and write it '
                    'to an output file')
    parser.add_argument('manuel',
                        help='filepath to the monster manuel data file')
    parser.add_argument('faxbot',
                        help='filepath to the faxbot data file')
    parser.add_argument('output',
                        help='filepath where the output data should be written')
    return parser.parse_args(args)


def main():
    """
    Call parse_args, then pass to filter_manuel() fo do all the work
    :return: nothing
    """
    args = parse_args(sys.argv[1:])
    filter_manuel(manuel_path=args.manuel,
                  faxbot_path=args.faxbot,
                  output_path=args.output)


if __name__ == "__main__":  # pragma: no cover
    main()
