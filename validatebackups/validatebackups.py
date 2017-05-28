# This script is intended to download a sample of random files from backup locations
# These files can then be manually verified to make sure the backups are working.
# High level procedure
# connect to google cloud storage
# Run validation procedure for known buckets
# These validation procedures are similar but not identical
# Report success/failure for each bucket
import argparse
import sys
from google.cloud import storage


def validate_backups():
    client = storage.Client()

    for bucket in client.list_buckets():
        print(bucket)

    # send to appropriate subfunction to handle it


def parse_args(args):
    """
        Parses and validates command line arguments
        :param list args: arguments passed into the script (usually sys.argv[1:])
        :return: arguments parsed into a neat object
        """
    parser = argparse.ArgumentParser(
        description='Download random sample of backup files for validation')
    return parser.parse_args(args)


def main():
    """
    Call parse_args, then pass to validate_backups() fo do all the work
    :return: nothing
    """
    parse_args(sys.argv[1:])
    validate_backups()


if __name__ == "__main__":  # pragma: no cover
    main()
