# This script is intended to download a sample of random files from backup locations
# These files can then be manually verified to make sure the backups are working.
# High level procedure
# connect to google cloud storage
# Run validation procedure for known buckets
# These validation procedures are similar but not identical
# Report success/failure for each bucket
import argparse
import os
import operator
import sys
from datetime import datetime
from warnings import warn
from google.cloud import storage
from tzlocal import get_localzone

SERVER_BACKUP_OLDEST_AGE_IN_DAYS = 60
SERVER_BACKUP_NEWEST_AGE_IN_DAYS = 7
NUM_SERVER_BACKUPS_TO_DOWNLOAD = 4


def main():
    """
    Call parse_args, then pass to validate_backups() fo do all the work
    :return: nothing
    """
    parse_args(sys.argv[1:])
    validate_backups()


def parse_args(args):
    """
        Parses and validates command line arguments
        :param list args: arguments passed into the script (usually sys.argv[1:])
        :return: arguments parsed into a neat object
        """
    parser = argparse.ArgumentParser(
        description="Download random sample of backup files for validation")
    return parser.parse_args(args)


def validate_backups():
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"D:\Matt\Documents\google cloud storage\backup-validator-auth.json"
    client = storage.Client()

    for bucket in client.list_buckets():
        validate_bucket(bucket)


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


def validate_giltaji_media_bucket(bucket):
    pass


def validate_giltaji_photos_bucket(bucket):
    pass


def validate_matt_server_backups_bucket(bucket):
    validate_newest_file_in_proper_age_range(bucket)
    validate_oldest_file_in_proper_age_range(bucket)
    # download most recent 4 files


def validate_newest_file_in_proper_age_range(bucket):
    newest_blob = get_newest_blob(bucket.list_blobs())
    if get_blob_age_in_days(newest_blob) > SERVER_BACKUP_NEWEST_AGE_IN_DAYS:
        warn("The newest file, " + newest_blob.name +
             ", is more than a week old! Check matt-server-backup cron job.")


def get_newest_blob(blobs):
    sorted_blobs = get_blobs_sorted_newest_to_oldest(blobs)
    return sorted_blobs[0]


def get_blobs_sorted_newest_to_oldest(blobs):
    return sorted(blobs, key=operator.attrgetter("time_created"), reverse=True)


def get_blob_age_in_days(blob):
    now = get_localized_time(datetime.now())
    age = now - blob.time_created
    return age.days


def get_localized_time(timestamp):
    return get_localzone().localize(timestamp)


def validate_oldest_file_in_proper_age_range(bucket):
    oldest_blob = get_oldest_blob(bucket.list_blobs())
    if get_blob_age_in_days(oldest_blob) > SERVER_BACKUP_OLDEST_AGE_IN_DAYS:
        warn("The oldest file, " + oldest_blob.name +
             ", is more than 2 months old! Check matt-server-backup lifecycle delete rules.")


def get_oldest_blob(blobs):
    sorted_blobs = get_blobs_sorted_newest_to_oldest(blobs)
    return sorted_blobs[-1]



if __name__ == "__main__":  # pragma: no cover
    main()
