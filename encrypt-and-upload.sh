#!/bin/bash
# This script encrypts files with gpg, then uploads them to google cloud storage
# 
RECIPIENT=matt@giltaji.com
dir_to_check=$1


encrypt_file() {
	orig_file=$1
	
	encrypted_file=$orig_file.gpg
	echo "encrypting $orig_file"
	gpg2 --encrypt --recipient $RECIPIENT $orig_file

	if [ ! -e "$encrypted_file" ] || [ ! -s "$encrypted_file" ]
	then
		echo "encrypted file $encrypted_file not found, aborting."
		exit 1
	fi

	echo "$orig_file successfully encrypted. Deleting the original and using $ENCRYPTED_FILE"

	rm $orig_file
	if [ -e "$orig_file" ]
	then
		echo "Unable to delete $orig_file after encrypting, aborting."
		exit 1
	fi
}

upload_files() {
	location=$1
	echo "uploading encrypted files from $location"
	gsutil cp $location/*.gpg gs://matt-server-backups/
	
	echo "everything good, deleting local copies"
	rm $location/*.gpg
	if [ -e "$location/*.gpg" ]
	then
		echo "Unable to delete encrypted files after uploading, aborting."
		exit 1
	fi
}


if [ ! -d "$dir_to_check" ]
then
	echo "Unable to find directory $dir_to_check, aborting."
	exit 1
fi

for entry in "$dir_to_check"/*.tar.gz
do
	encrypt_file $entry
done

upload_files $dir_to_check

exit 0
