myyear=$(date -d "-30 days" +"%Y")
mymonth=$(date -d "-30 days" +"%m")
myday=$(date -d "-30 days" +"%d")

echo "path = /$myyear/$mymonth/$myday"

for d in /training-reactjs/media/pi/*/; do
    folder="$d$myyear/$mymonth/$myday"
    if [ -d "$folder" ] ; then
        echo "$folder found"
        ionice -c3 wipe -rfi $folder
    else
        echo "$folder does not exist"
    fi
done