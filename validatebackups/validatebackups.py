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
import random
import sys
from datetime import datetime
from warnings import warn
from google.cloud import storage
from tzlocal import get_localzone


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
    backup_validator = BackupValidator(client=storage.Client())
    backup_validator.validate_backups()


class BackupValidator:
    FILE_DOWNLOAD_LOCATION = os.path.join(r"D:\temp\backup_test")
    OLDEST_SERVER_BACKUP_FILE_MAX_AGE_IN_DAYS = 60
    NEWEST_SERVER_BACKUP_FILE_MAX_AGE_IN_DAYS = 7
    NUM_SERVER_BACKUPS_TO_DOWNLOAD = 4
    NUM_MEDIA_FILES_TO_DOWNLOAD = 3
    NUM_PHOTOS_FROM_THIS_MONTH_TO_DOWNLOAD = 5
    NUM_PHOTOS_FROM_EACH_YEAR_TO_DOWNLOAD = 10

    def __init__(self, client=None, media_bucket=None, photo_bucket=None, server_backups_bucket=None):
        self.client = client
        self.media_bucket = media_bucket
        self.photos_bucket = photo_bucket
        self.server_backups_bucket = server_backups_bucket

    def validate_backups(self):
        for bucket in self.client.list_buckets():
            self.validate_bucket(bucket)

    def validate_bucket(self, bucket):
        if bucket.name == "giltaji-media":
            self.media_bucket = bucket
            self.validate_giltaji_media_bucket()
        elif bucket.name == "giltaji-photos":
            self.photos_bucket = bucket
            self.validate_giltaji_photos_bucket()
        elif bucket.name == "matt-server-backups":
            self.server_backups_bucket = bucket
            self.validate_matt_server_backups_bucket()
        elif bucket.name == "giltajidjangobackups":
            pass
        else:
            raise ValueError("Unable to handle Bucket " + bucket.name)

    def validate_giltaji_media_bucket(self):
        folders = self.get_top_level_media_folders()
        self.download_random_media_files_from_each_folder(folders)

    def get_top_level_media_folders(self):
        # TODO: revisit this when https://github.com/GoogleCloudPlatform/google-cloud-python/issues/920 is resolved
        blobs = self.media_bucket.list_blobs(delimiter='/')
        list(blobs)  # needed to populate prefixes
        return blobs.prefixes

    def download_random_media_files_from_each_folder(self, folders):
        for folder in folders:
            self.download_random_media_files_from_folder(folder)

    def download_random_media_files_from_folder(self, folder):
        blobs = self.get_random_sample_of_blobs(
            bucket=self.media_bucket,
            filter_criteria=folder,
            sample_size=self.NUM_MEDIA_FILES_TO_DOWNLOAD
        )
        BackupValidator.download_blobs(blobs)

    @staticmethod
    def get_random_sample_of_blobs(bucket, filter_criteria, sample_size):
        filtered_blobs = bucket.list_blobs(prefix=filter_criteria)
        return random.sample(population=filtered_blobs, k=sample_size)

    @classmethod
    def download_blobs(cls, blobs):
        for blob in blobs:
            cls.download_blob(blob)

    @classmethod
    def download_blob(cls, blob):
        file_location = cls.get_download_location_for_blob(blob)
        BackupValidator.create_missing_directories(file_location)
        blob.download_to_filename(file_location)

    @staticmethod
    def create_missing_directories(file_path):
        dir_only_file_path = os.path.dirname(file_path)
        try:
            os.makedirs(dir_only_file_path, exist_ok=True)
        except OSError as exception:
            if exception.errno != errno.EEXIST:
                raise

    @classmethod
    def get_download_location_for_blob(cls, blob):
        bucket_name = blob.bucket.name
        blob_name = blob.name
        return os.path.join(cls.FILE_DOWNLOAD_LOCATION, bucket_name, blob_name)

    def validate_giltaji_photos_bucket(self):
        self.download_random_photos_from_this_month()
        self.download_random_photos_from_each_year()

    def download_random_photos_from_this_month(self):
        current_year = datetime.now().year
        current_month = datetime.now().month
        blobs = BackupValidator.get_random_sample_of_blobs(
            bucket=self.photos_bucket,
            filter_criteria=str(current_year) + "-" + str(current_month),
            sample_size=self.NUM_PHOTOS_FROM_THIS_MONTH_TO_DOWNLOAD
        )
        self.download_blobs(blobs)

    def download_random_photos_from_each_year(self):
        current_year = datetime.now().year
        for year in range(2010, current_year+1):
            self.download_random_photos_from_specific_year(year)

    def download_random_photos_from_specific_year(self, year):
        blobs = BackupValidator.get_random_sample_of_blobs(
            bucket=self.photos_bucket,
            filter_criteria=str(year) + "-",
            sample_size=self.NUM_PHOTOS_FROM_EACH_YEAR_TO_DOWNLOAD
        )
        self.download_blobs(blobs)

    def validate_matt_server_backups_bucket(self):
        self.validate_newest_file_in_proper_age_range()
        self.validate_oldest_file_in_proper_age_range()
        self.download_most_recent_server_backups()

    def validate_newest_file_in_proper_age_range(self):
        newest_blob = BackupValidator.get_newest_blob(self.server_backups_bucket.list_blobs())
        if BackupValidator.get_blob_age_in_days(newest_blob) > self.NEWEST_SERVER_BACKUP_FILE_MAX_AGE_IN_DAYS:
            warn("The newest file, " + newest_blob.name + ", is more than " +
                 str(self.NEWEST_SERVER_BACKUP_FILE_MAX_AGE_IN_DAYS) +
                 "days old! Check matt-server-backup cron job.")

    @staticmethod
    def get_newest_blob(blobs):
        sorted_blobs = BackupValidator.get_blobs_sorted_newest_to_oldest(blobs)
        return sorted_blobs[0]

    @staticmethod
    def get_blobs_sorted_newest_to_oldest(blobs):
        return sorted(blobs, key=operator.attrgetter("time_created"), reverse=True)

    @staticmethod
    def get_blob_age_in_days(blob):
        now = BackupValidator.get_localized_time(datetime.now())
        age = now - blob.time_created
        return age.days

    @staticmethod
    def get_localized_time(timestamp):
        return get_localzone().localize(timestamp)

    def validate_oldest_file_in_proper_age_range(self):
        oldest_blob = BackupValidator.get_oldest_blob(self.server_backups_bucket.list_blobs())
        if BackupValidator.get_blob_age_in_days(oldest_blob) > self.OLDEST_SERVER_BACKUP_FILE_MAX_AGE_IN_DAYS:
            warn("The oldest file, " + oldest_blob.name + ", is more than " +
                 str(self.OLDEST_SERVER_BACKUP_FILE_MAX_AGE_IN_DAYS) +
                 "days old! Check matt-server-backup lifecycle delete rules.")

    @staticmethod
    def get_oldest_blob(blobs):
        sorted_blobs = BackupValidator.get_blobs_sorted_newest_to_oldest(blobs)
        return sorted_blobs[-1]

    def download_most_recent_server_backups(self):
        blobs_to_download = self.get_most_recent_backup_blobs_to_download(self.server_backups_bucket.list_blobs())
        self.download_blobs(blobs_to_download)

    def get_most_recent_backup_blobs_to_download(self, blobs):
        sorted_blobs = BackupValidator.get_blobs_sorted_newest_to_oldest(blobs)
        return sorted_blobs[:self.NUM_SERVER_BACKUPS_TO_DOWNLOAD]


if __name__ == "__main__":  # pragma: no cover
    main()
