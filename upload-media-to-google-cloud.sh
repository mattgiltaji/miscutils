#!/bin/bash
# This script uploads shared media files to google cloud storage

gsutil cp -n -r /srv/samba/media/*/  "gs://giltaji-media/"
