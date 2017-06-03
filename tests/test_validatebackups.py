# Tests for validatebackups.py
# run from miscutils dir as:
#    python -m pytest tests/test_validatebackups.py
import os
import pytest

import validatebackups.validatebackups as vb
from google.cloud import storage


@pytest.fixture()
def gcs_client():
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"D:\Matt\Documents\google cloud storage\test-backup-validator-auth.json"
    client = storage.Client()
    yield client


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



class TestValidateMattServerBackupsBucket:
    def test_validate_matt_server_backups_bucket_has_no_warnings(self, gcs_client):
        bucket = gcs_client.get_bucket("test-matt-server-backups")
        with pytest.warns(None) as record:
            vb.validate_matt_server_backups_bucket(bucket=bucket)
        assert len(record) == 0

    # TODO: figure out how to make sure warnings fire when they should
