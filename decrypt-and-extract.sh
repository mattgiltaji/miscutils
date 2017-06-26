#!/bin/bash
# This script decrypts files with gpg and extracts them out of the tarball
# 
RECIPIENT=matt@giltaji.com
dir_to_check=$1


decrypt_file() {
	orig_file=$1
	
	decrypted_basename=`basename $orig_file .gpg`
	decrypted_dirname=`dirname $orig_file`
	decrypted_file="$decrypted_dirname/$decrypted_basename"
	echo "decrypting $orig_file to $decrypted_file"
	gpg2 --decrypt --output $decrypted_file --recipient $RECIPIENT $orig_file

	if [ ! -e "$decrypted_file" ] || [ ! -s "$decrypted_file" ]
	then
		echo "decrypted file $decrypted_file not found, aborting."
		exit 1
	fi

	echo "$orig_file successfully decrypted. Deleting the original and using $decrypted_file"

	rm $orig_file
	if [ -e "$orig_file" ]
	then
		echo "Unable to delete $orig_file after decrypting, aborting."
		exit 1
	fi
}

extract_file() {
	decrypted_file=$1
	echo "extracting decrypted files from tarball"
	tar xvzf $decrypted_file -C $dir_to_check
	
	echo "everything good, deleting local copies"
	rm $decrypted_file
	if [ -e "$decrypted_file" ]
	then
		echo "Unable to delete $decrypted_file after extracting, aborting."
		exit 1
	fi
}


if [ ! -d "$dir_to_check" ]
then
	echo "Unable to find directory $dir_to_check, aborting."
	exit 1
fi

echo "processing  $dir_to_check"
for entry in "$dir_to_check"/*.tar.gz.gpg
do
	decrypt_file $entry
done

for entry in "$dir_to_check"/*.tar.gz
do
	extract_file $entry
done

exit 0
