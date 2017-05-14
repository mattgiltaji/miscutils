#!/bin/bash
# This script encrypts files with gpg, then uploads them to google cloud storage
# 
RECIPIENT=matt@giltaji.com
ORIG_FILE_RAW=$1
ORIG_FILE="$(echo "${ORIG_FILE_RAW}" | sed -e 's/%y%m%d/'$(date +%y%m%d)'/g')"
ENCRYPTED_FILE=$ORIG_FILE.gpg
echo "$ORIG_FILE"

if [ ! -e "$ORIG_FILE" ]
then
	echo "Unable to find file $ORIG_FILE, aborting."
	exit 1
fi

echo "encrypting $ORIG_FILE"
gpg --encrypt --recipient $RECIPIENT $ORIG_FILE

if [ ! -e "$ENCRYPTED_FILE" ] || [ ! -s "$ENCRYPTED_FILE" ]
then
	echo "encrypted file $ENCRYPTED_FILE not found, aborting."
	exit 1
fi

echo "$ORIG_FILE successfully encrypted. Deleting the original and using $ENCRYPTED_FILE"

rm $ORIG_FILE
if [ -e "$ORIG_FILE" ]
then
	echo "Unable to delete $ORIG_FILE after encrypting, aborting."
	exit 1
fi


echo "uploading $ENCRYPTED_FILE"
gsutil cp $ENCRYPTED_FILE gs://matt-server-backups/

echo "upload complete, verifying..."
#gsutil ls gs://matt-server-backups/$ENCRYPTED_FILE

echo "everything good, deleting local copy of $ENCRYPTED_FILE"
rm $ENCRYPTED_FILE
if [ -e "$ENCRYPTED_FILE" ]
then
	echo "Unable to delete $ENCRYPTED_FILE after uploading, aborting."
	exit 1
fi


exit 0
