Record audio and video. This doesn't work though since the audio stream isn't mkv compatable.
```
ffmpeg -hide_banner -y -loglevel warning -i rtsplink -acodec copy -vcodec copy output.mkv
```

Record audio and video by re-encoding the audio to be mkv compatable.
```
ffmpeg -hide_banner -i rtsplink -acodec aac -vcodec copy output.mkv
```

Record just the video
```
ffmpeg -hide_banner -i rtsplink -map 0:v -vcodec copy output.mkv
```

Converting a video to h265
```
ffmpeg -i input -vcodec libx265 -crf 28 output
```

Merge script
```
node concat "/media/pi/back/2022/09/06"
```

This allows playback while recording  
```
ffmpeg -hide_banner -i rtsplink -vcodec copy output.h264
```
The `movflags` flag tells the stream to stick the moovatom at the start of the stream, but it doesn't seem to be needed
```
ffmpeg -hide_banner -i rtsplink -vcodec copy -movflags +faststart output.h264
```

## Camera video ffmpeg 
```
ffmpeg -hide_banner -y -loglevel warning -rtsp_transport tcp -use_wallclock_as_timestamps 1 -i rtsplink -vcodec copy -f segment -reset_timestamps 1 -segment_time 300 -segment_format mkv -segment_atclocktime 1 -strftime 1 "%Y-%m-%dT%H %M %S%z.mkv"
```