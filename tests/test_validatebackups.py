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

class TestGetOldestBlob:

    def test_get_oldest_blob(self, gcs_client):
        bucket = gcs_client.get_bucket("test-matt-server-backups")
        result = vb.get_oldest_blob(bucket.list_blobs())
        assert result.name == "oldest.txt"

class TestGetNewestBlob:

    def test_get_newest_blob(self, gcs_client):
        bucket = gcs_client.get_bucket("test-matt-server-backups")
        result = vb.get_newest_blob(bucket.list_blobs())
        assert result.name == "newest.txt"
