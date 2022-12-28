ROOT=$(readlink -f "$( dirname -- "$0")/../../");
crontab -l | { cat; echo "*/5 * * * * cd $ROOT; $ROOT/cloudflare-dns >> $ROOT/run.log"; } | crontab -
crontab -l | { cat; echo "@reboot cd $ROOT; $ROOT/cloudflare-dns >> $ROOT/run.log"; } | crontab -
