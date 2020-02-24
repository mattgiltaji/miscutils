# do the sync
gsutil -m cp -n -r D:\Matt\Pictures\20* gs://giltaji-photos/
gsutil -m cp -n -r D:\Matt\Pictures\specia* gs://giltaji-photos/

# let pushmon know we succeeded
$urlString = "http://pshmn.com/WMgnwq"
(new-object System.Net.WebClient).DownloadString($urlString)
