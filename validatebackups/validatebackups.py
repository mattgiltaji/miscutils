# This script is intended to download a sample of random files from backup locations
# These files can then be manually verified to make sure the backups are working.
# High level procedure
# connect to google cloud storage
# Run validation procedure for known buckets
# These validation procedures are similar but not identical
# Report success/failure for each bucket
import argparse
import errno
import os
import operator
import sys
from datetime import datetime
from warnings import warn
from google.cloud import storage
from tzlocal import get_localzone

OLDEST_SERVER_BACKUP_FILE_MAX_AGE_IN_DAYS = 60
NEWEST_SERVER_BACKUP_FILE_MAX_AGE_IN_DAYS = 7
NUM_SERVER_BACKUPS_TO_DOWNLOAD = 4
FILE_DOWNLOAD_LOCATION = os.path.join(r"D:\temp\backup_test")


def main():
    """
    Call parse_args, then pass to validate_backups() to do all the work
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
    download_most_recent_files(bucket)


def validate_newest_file_in_proper_age_range(bucket):
    newest_blob = get_newest_blob(bucket.list_blobs())
    if get_blob_age_in_days(newest_blob) > NEWEST_SERVER_BACKUP_FILE_MAX_AGE_IN_DAYS:
        warn("The newest file, " + newest_blob.name + ", is more than " +
             str(NEWEST_SERVER_BACKUP_FILE_MAX_AGE_IN_DAYS) +
             "days old! Check matt-server-backup cron job.")


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
    if get_blob_age_in_days(oldest_blob) > OLDEST_SERVER_BACKUP_FILE_MAX_AGE_IN_DAYS:
        warn("The oldest file, " + oldest_blob.name + ", is more than " +
             str(OLDEST_SERVER_BACKUP_FILE_MAX_AGE_IN_DAYS) +
             "days old! Check matt-server-backup lifecycle delete rules.")


def get_oldest_blob(blobs):
    sorted_blobs = get_blobs_sorted_newest_to_oldest(blobs)
    return sorted_blobs[-1]


def download_most_recent_files(bucket):
    blobs_to_download = get_most_recent_blobs_to_download(bucket.list_blobs())
    download_blobs(blobs_to_download)


def get_most_recent_blobs_to_download(blobs):
    sorted_blobs = get_blobs_sorted_newest_to_oldest(blobs)
    return sorted_blobs[:NUM_SERVER_BACKUPS_TO_DOWNLOAD]


def download_blobs(blobs):
    for blob in blobs:
        download_blob(blob)


def download_blob(blob):
    file_location = get_download_location_for_blob(blob)
    create_missing_directories(file_location)
    blob.download_to_filename(file_location)


def get_download_location_for_blob(blob):
    bucket_name = blob.bucket.name
    blob_name = blob.name
    return os.path.join(FILE_DOWNLOAD_LOCATION, bucket_name, blob_name)


def create_missing_directories(file_path):
    dir_only_file_path = os.path.dirname(file_path)
    try:
        os.makedirs(dir_only_file_path, exist_ok=True)
    except OSError as exception:
        if exception.errno != errno.EEXIST:
            raise


if __name__ == "__main__":  # pragma: no cover
    main()
