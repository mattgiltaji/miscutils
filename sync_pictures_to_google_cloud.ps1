# auth with service account
$env:CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE = "D:\Matt\OneDrive\Documents\keys\nightly-pc-backup-private.json"

# do the sync
gcloud storage cp -n -r D:\Matt\OneDrive\Pictures\202* gs://giltaji-photos/
gcloud storage cp -n -r D:\Matt\OneDrive\Pictures\blase* gs://giltaji-misc/
gcloud storage cp -n -r D:\Matt\OneDrive\Pictures\specia* gs://giltaji-photos/
gcloud storage cp -n -r D:\Matt\OneDrive\Pictures\Deva* gs://giltaji-photos/

# let pushmon know we succeeded
$urlString = "http://pshmn.com/WMgnwq"
(new-object System.Net.WebClient).DownloadString($urlString)
