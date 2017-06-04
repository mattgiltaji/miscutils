# Tests for validatebackups.py
# run from miscutils dir as:
#    python -m pytest tests/test_validatebackups.py
import os
import pytest

import validatebackups.validatebackups as vb
from google.cloud import storage

current_dir = os.path.dirname(os.path.abspath(__file__))
test_data_dir = os.path.join(current_dir, "files", "validatebackups")
matt_server_backups_dir = os.path.join(test_data_dir, "matt-server-backups")


@pytest.fixture()
def gcs_client():
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = \
        r"D:\Matt\Documents\google cloud storage\test-backup-validator-auth.json"
    client = storage.Client()
    yield client


# noinspection PyShadowingNames
@pytest.fixture()
def gcs_fresh_upload(gcs_client):
    bucket = gcs_client.get_bucket("test-matt-server-backups-fresh")
    existing_blobs = bucket.list_blobs()
    if existing_blobs:
        bucket.delete_blobs(existing_blobs)
    new_blob = bucket.blob("newest.txt")
    new_blob.upload_from_filename(os.path.join(matt_server_backups_dir, "newest.txt"))
    yield gcs_client


# noinspection PyShadowingNames
class TestBlobSorting:

    def test_get_oldest_blob(self, gcs_client):
        bucket = gcs_client.get_bucket("test-matt-server-backups")
        result = vb.get_oldest_blob(bucket.list_blobs())
        assert result.name == "oldest.txt"

    def test_get_newest_blob(self, gcs_client):
        bucket = gcs_client.get_bucket("test-matt-server-backups")
        result = vb.get_newest_blob(bucket.list_blobs())
        assert result.name == "newest.txt"

    def test_get_blobs_sorted_newest_to_oldest(self, gcs_client):
        bucket = gcs_client.get_bucket("test-matt-server-backups")
        expected = ["newest.txt", "new2.txt", "new3.txt", "new4.txt",
                    "mid6.txt", "mid5.txt", "mid4.txt", "mid3.txt", "mid2.txt", "mid1.txt",
                    "oldest.txt"]
        results = vb.get_blobs_sorted_newest_to_oldest(bucket.list_blobs())
        actual = list(result.name for result in results)
        assert expected == actual

    def test_get_most_recent_blobs_to_download(self, gcs_client):
        bucket = gcs_client.get_bucket("test-matt-server-backups")
        expected = ["newest.txt", "new2.txt", "new3.txt", "new4.txt"]
        results = vb.get_most_recent_blobs_to_download(bucket.list_blobs())
        actual = list(result.name for result in results)
        assert expected == actual


# noinspection PyShadowingNames
class TestValidateMattServerBackupsBucket:
    @pytest.mark.skip(reason="file not old enough- try after 6/6")
    def test_validate_newest_file_throws_warnings_properly(self, gcs_client):
        bucket = gcs_client.get_bucket("test-matt-server-backups-old")
        with pytest.warns(None) as record:
            vb.validate_newest_file_in_proper_age_range(bucket=bucket)
        assert len(record) > 0

    @pytest.mark.skip(reason="file not old enough- try after 7/29")
    def test_validate_oldest_file_throws_warnings_properly(self, gcs_client):
        bucket = gcs_client.get_bucket("test-matt-server-backups-old")
        with pytest.warns(None) as record:
            vb.validate_oldest_file_in_proper_age_range(bucket=bucket)
        assert len(record) > 0

    def test_validate_fresh_files_has_no_warnings(self, gcs_fresh_upload):
        bucket = gcs_fresh_upload.get_bucket("test-matt-server-backups-fresh")
        with pytest.warns(None) as record:
            vb.validate_newest_file_in_proper_age_range(bucket=bucket)
            vb.validate_oldest_file_in_proper_age_range(bucket=bucket)
        assert len(record) == 0
