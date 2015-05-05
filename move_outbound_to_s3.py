__author__ = 'mattgiltaji'

from os import walk
from boto.s3.connection import S3Connection, Location
from boto.s3.key import Key

BUCKET_NAME = 'giltajidjangobackups'
BACKUP_DIR = '~/backups/outbound/'

conn = S3Connection()
bucket = conn.create_bucket(BUCKET_NAME, location=Location.DEFAULT)

files = []

for (dirpath, dirnames, filenames) in walk(BACKUP_DIR):
    files.extend(filenames)
    break

for file in files:
    print(file)
    newKey = Key(bucket)
    newKey.set_contents_from_filename(file, encrypt_key=True)

