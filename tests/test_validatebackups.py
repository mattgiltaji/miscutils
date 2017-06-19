# Tests for validatebackups.py
# run from miscutils dir as:
#    python -m pytest tests/test_validatebackups.py
import os
import pytest

from validatebackups.validatebackups import BackupValidator
from google.cloud import storage

current_dir = os.path.dirname(os.path.abspath(__file__))
test_data_dir = os.path.join(current_dir, "files", "validatebackups")
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


class TestPhotosBucket:

    def test_validate_giltaji_photos_bucket(self):
        pass


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
