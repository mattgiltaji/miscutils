# Tests for validatebackups.py
# run from miscutils dir as:
#    python -m pytest tests/test_validatebackups.py
import os
import pytest

from validatebackups.validatebackups import BackupValidator
from google.cloud import storage

current_dir = os.path.dirname(os.path.abspath(__file__))
test_data_dir = os.path.join(current_dir, "files", "validatebackups")
matt_media_download_dir = os.path.join(BackupValidator.FILE_DOWNLOAD_LOCATION, "test-matt-media")
matt_photos_dir = os.path.join(test_data_dir, "matt-photos")
matt_month_photos_download_dir = os.path.join(BackupValidator.FILE_DOWNLOAD_LOCATION, "test-matt-photos-fresh")
matt_year_photos_download_dir = os.path.join(BackupValidator.FILE_DOWNLOAD_LOCATION, "test-matt-photos")
matt_server_backups_dir = os.path.join(test_data_dir, "matt-server-backups")
matt_server_backups_download_dir = os.path.join(BackupValidator.FILE_DOWNLOAD_LOCATION,
                                                "test-matt-server-backups-fresh")


@pytest.fixture
def validator():
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = \
        r"D:\Matt\Documents\google cloud storage\test-backup-validator-auth.json"
    backup_validator = BackupValidator(client=storage.Client())
    yield backup_validator


# noinspection PyShadowingNames
@pytest.fixture
def test_media_validator(validator):
    validator.media_bucket = validator.client.get_bucket("test-matt-media")
    yield validator


# noinspection PyShadowingNames
@pytest.fixture
def test_media_validator_with_downloads(test_media_validator):
    delete_existing_files_from_directory(matt_media_download_dir)
    yield test_media_validator


# noinspection PyShadowingNames
@pytest.fixture
def test_year_photos_validator(validator):
    validator.photos_bucket = validator.client.get_bucket("test-matt-photos")
    delete_existing_files_from_directory(matt_year_photos_download_dir)
    yield validator


# noinspection PyShadowingNames
@pytest.fixture
def test_backup_validator(validator):
    validator.server_backups_bucket = validator.client.get_bucket("test-matt-server-backups")
    yield validator


# noinspection PyShadowingNames
@pytest.fixture
def old_backup_validator(validator):
    validator.server_backups_bucket = validator.client.get_bucket("test-matt-server-backups-old")
    yield validator


# noinspection PyShadowingNames
@pytest.fixture
def fresh_backup_validator_with_uploads(validator):
    validator.server_backups_bucket = validator.client.get_bucket("test-matt-server-backups-fresh")
    delete_existing_blobs_from_bucket(validator.server_backups_bucket)
    upload_new_file_to_bucket(
        bucket=validator.server_backups_bucket,
        file_location=os.path.join(matt_server_backups_dir, "newest.txt")
    )
    yield validator


def delete_existing_blobs_from_bucket(bucket):
    existing_blobs = bucket.list_blobs()
    if existing_blobs:
        bucket.delete_blobs(existing_blobs)


def upload_new_file_to_bucket(bucket, file_location):
    blob = bucket.blob(os.path.basename(file_location))
    blob.upload_from_filename(file_location)


# noinspection PyShadowingNames
@pytest.fixture
def fresh_backup_validator_with_downloads(validator):
    validator.server_backups_bucket = validator.client.get_bucket("test-matt-server-backups-fresh")
    delete_existing_blobs_from_bucket(validator.server_backups_bucket)
    delete_existing_files_from_directory(matt_server_backups_download_dir)
    for number in range(1, BackupValidator.NUM_SERVER_BACKUPS_TO_DOWNLOAD + 1):
        upload_new_file_to_bucket(
            bucket=validator.server_backups_bucket,
            file_location=os.path.join(matt_server_backups_dir, "mid" + str(number) + ".txt")
        )

    yield validator


def delete_existing_files_from_directory(directory_location):
    try:
        for file in os.listdir(directory_location):
            os.remove(file)
    except FileNotFoundError:
        pass


# noinspection PyShadowingNames
class TestMediaBucket:
    def test_get_top_level_folders(self, test_media_validator):
        expected = {"show 1/", "show 2/", "show 3/"}
        actual = test_media_validator.get_top_level_media_folders()
        assert expected == actual

    @pytest.mark.slowtest
    def test_validate_giltaji_media_bucket_downloads_files(self, test_media_validator_with_downloads):
        expected = self.get_static_downloads_expected_file_paths()
        test_media_validator_with_downloads.validate_giltaji_media_bucket()
        actual = []
        for path, subdirs, files in os.walk(matt_media_download_dir):
            for filename in files:
                actual.append(os.path.join(path, filename))
        assert expected == actual

    @staticmethod
    def get_static_downloads_expected_file_paths():
        paths = [
            os.path.join("show 1", "season 1", "01x01 episode.ogv"),
            os.path.join("show 1", "season 1", "S01E22 episode.ogv"),
            os.path.join("show 1", "season 2", "s02e02 - episode.ogv"),
            os.path.join("show 2", "season 3", "03x03 - episode.ogv"),
            os.path.join("show 2", "season 5", "05x01 episode.ogv"),
            os.path.join("show 2", "season 7", "S07E77 episode.ogv"),
            os.path.join("show 3", "season 1000", "s1000e947 - episode.ogv"),
            os.path.join("show 3", "specials", "00x01 making of episode.ogv"),
            os.path.join("show 3", "specials", "s00e03 - holiday special.ogv")
        ]
        expected = []
        for path in paths:
            expected.append(os.path.join(matt_media_download_dir, path))
        return expected


# noinspection PyShadowingNames
class TestPhotosBucket:
    @pytest.mark.slowtest
    def test_download_random_photos_from_each_year_downloads_files(self, test_year_photos_validator):
        expected = self.get_static_year_downloads_expected_file_paths()
        test_year_photos_validator.download_random_photos_from_each_year()
        actual = []
        for path, subdirs, files in os.walk(matt_year_photos_download_dir):
            for filename in files:
                actual.append(os.path.join(path, filename))
        assert expected == actual

    def get_static_year_downloads_expected_file_paths(self):
        #  Build the expected list of paths to match our test data
        #  We umm, we have a lot of files in this test data
        #  Sometimes I think I'm too clever for my own good
        paths = []
        max_file_num_per_year = BackupValidator.NUM_PHOTOS_FROM_EACH_YEAR_TO_DOWNLOAD + 1

        # 2010 - all in one
        for number in range(1, max_file_num_per_year):
            paths.append(self.get_path_from_year_month_and_number(2010, 2, number))

        # 2011 - split evens and odds (insertion order to paths must be alphabetical)
        even_paths = []
        odd_paths = []
        for number in range(1, max_file_num_per_year):
            if number % 2:
                odd_paths.append(self.get_path_from_year_month_and_number(2011, 3, number))
            else:
                even_paths.append(self.get_path_from_year_month_and_number(2011, 6, number))
        for path in odd_paths:
            paths.append(path)
        for path in even_paths:
            paths.append(path)

        # 2012, 2013, 2014 - all in one
        for number in range(1, max_file_num_per_year):
            paths.append(self.get_path_from_year_month_and_number(2012, 12, number))
        for number in range(1, max_file_num_per_year):
            paths.append(self.get_path_from_year_month_and_number(2013, 7, number))
        for number in range(1, max_file_num_per_year):
            paths.append(self.get_path_from_year_month_and_number(2014, 11, number))

        # 2015 - each in corresponding month
        for number in range(1, max_file_num_per_year):
            if number % 12:
                paths.append(self.get_path_from_year_month_and_number(2015, number % 12, number))
            else:
                paths.append(self.get_path_from_year_month_and_number(2015, 12, number))

        # 2016, 2017, 2018 - all in one
        for number in range(1, max_file_num_per_year):
            paths.append(self.get_path_from_year_month_and_number(2016, 10, number))
        for number in range(1, max_file_num_per_year):
            paths.append(self.get_path_from_year_month_and_number(2017, 1, number))
        #  TODO: add this back in 2018
        # for number in range(1, max_file_num_per_year):
        #    paths.append(self.get_path_from_year_month_and_number(2018, 5, number))

        return paths

    def get_path_from_year_month_and_number(self, year, month, number):
        return os.path.join(matt_year_photos_download_dir,
                            self.get_subfolder_name_from_year_and_month(year, month),
                            self.get_image_filename_from_number(number))

    @staticmethod
    def get_subfolder_name_from_year_and_month(year, month):
        return str(year) + "-" + str(month).zfill(2)

    @staticmethod
    def get_image_filename_from_number(number):
        return "IMG_" + str(number).zfill(2) + ".gif"


# noinspection PyShadowingNames
class TestBlobSorting:
    def test_get_oldest_blob(self, test_backup_validator):
        result = test_backup_validator.get_oldest_blob(
            test_backup_validator.server_backups_bucket.list_blobs()
        )
        assert result.name == "oldest.txt"

    def test_get_newest_blob(self, test_backup_validator):
        result = test_backup_validator.get_newest_blob(
            test_backup_validator.server_backups_bucket.list_blobs()
        )
        assert result.name == "newest.txt"

    def test_get_blobs_sorted_newest_to_oldest(self, test_backup_validator):
        expected = ["newest.txt", "new2.txt", "new3.txt", "new4.txt",
                    "mid6.txt", "mid5.txt", "mid4.txt", "mid3.txt", "mid2.txt", "mid1.txt",
                    "oldest.txt"]
        results = test_backup_validator.get_blobs_sorted_newest_to_oldest(
            test_backup_validator.server_backups_bucket.list_blobs()
        )
        actual = list(result.name for result in results)
        assert expected == actual

    def test_get_most_recent_blobs_to_download(self, test_backup_validator):
        expected = ["newest.txt", "new2.txt", "new3.txt", "new4.txt"]
        results = test_backup_validator.get_most_recent_backup_blobs_to_download(
            test_backup_validator.server_backups_bucket.list_blobs()
        )
        actual = list(result.name for result in results)
        assert expected == actual


# noinspection PyShadowingNames
class TestValidateMattServerBackupsBucket:
    def test_validate_newest_file_throws_warnings_properly(self, old_backup_validator):
        with pytest.warns(None) as record:
            old_backup_validator.validate_newest_file_in_proper_age_range()
        assert len(record) > 0

    @pytest.mark.skip(reason="file not old enough- try after 7/29")
    def test_validate_oldest_file_throws_warnings_properly(self, old_backup_validator):
        with pytest.warns(None) as record:
            old_backup_validator.validate_oldest_file_in_proper_age_range()
        assert len(record) > 0

    def test_validate_fresh_files_has_no_warnings(self, fresh_backup_validator_with_uploads):
        with pytest.warns(None) as record:
            fresh_backup_validator_with_uploads.validate_newest_file_in_proper_age_range()
            fresh_backup_validator_with_uploads.validate_oldest_file_in_proper_age_range()
        assert len(record) == 0

    @pytest.mark.slowtest
    def test_validate_matt_server_backups_downloads_files(self, fresh_backup_validator_with_downloads):
        expected = ["mid1.txt", "mid2.txt", "mid3.txt", "mid4.txt"]
        fresh_backup_validator_with_downloads.validate_matt_server_backups_bucket()
        actual_files = os.listdir(matt_server_backups_download_dir)
        assert expected == actual_files
