# This script is intended to download a sample of random files from backup locations
# These files can then be manually verified to make sure the backups are working.
# High level procedure
# connect to google cloud storage
# Run validation procedure for known buckets
# These validation procedures are similar but not identical
# Report success/failure for each bucket
import argparse
import os
import sys
from datetime import datetime, timezone
from warnings import warn
from google.cloud import storage
from tzlocal import get_localzone



def get_oldest_blob(blobs):
    oldest = None
    for blob in blobs:
        if oldest is None:
            oldest = blob
        if blob.time_created < oldest.time_created:
            oldest = blob
    return oldest


def get_newest_blob(blobs):
    newest = None
    for blob in blobs:
        if newest is None:
            newest = blob
        if blob.time_created > newest.time_created:
            newest = blob
    return newest


def validate_giltaji_media_bucket(bucket):
    pass


def validate_giltaji_photos_bucket(bucket):
    pass


def validate_matt_server_backups_bucket(bucket):
    now = get_localzone().localize(datetime.now())
    newest = get_newest_blob(bucket.list_blobs())
    newest_age = now - newest.time_created
    if newest_age.days > 7:
        warn("The newest file, " + newest.name + ", is more than a week old! Check matt-server-backup cron job.")

    oldest = get_oldest_blob(bucket.list_blobs())
    oldest_age = now - oldest.time_created
    if oldest_age.days > 60:
        warn("The oldest file, " + oldest.name + ", is more than 2 months old! Check matt-server-backup lifecycle delete rules.")

    # download most recent 4


def validate_bucket(bucket):
    if bucket.name == "giltaji-media":
        validate_giltaji_media_bucket(bucket)
    elif bucket.name == "giltaji-photos":
        validate_giltaji_photos_bucket(bucket)
    elif bucket.name == "matt-server-backups":
        validate_matt_server_backups_bucket(bucket)
    elif bucket.name == "giltajidjangobackups":
        pass
    else:
        raise ValueError("Unable to handle Bucket " + bucket.name)


def validate_backups():
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"D:\Matt\Documents\google cloud storage\backup-validator-auth.json"
    client = storage.Client()

    for bucket in client.list_buckets():
        validate_bucket(bucket)


def parse_args(args):
    """
        Parses and validates command line arguments
        :param list args: arguments passed into the script (usually sys.argv[1:])
        :return: arguments parsed into a neat object
        """
    parser = argparse.ArgumentParser(
        description="Download random sample of backup files for validation")
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
