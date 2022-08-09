import gi

gi.require_version("Gst", "1.0")

from gi.repository import Gst, GObject

Gst.init()

videos = [
        "rtsp://rtsp.stream/pattern",
        "rtsp://rtsp.stream/pattern",
        "rtsp://rtsp.stream/pattern",
        "rtsp://rtsp.stream/pattern",
    ]

if __name__ == '__main__':
    loop = GObject.MainLoop()

    command = 'compositor name=comp'
    for index, val in enumerate(videos):
        command += ' sink_'+ str(index) + '::xpos=' + str(320*index) + ' sink_'+ str(index) + '::ypos=0 sink_'+ str(index) + '::width=320 sink_'+ str(index) + '::height=240'
        pipelineRecording = Gst.parse_launch('rtspsrc location="' + val + '" ! decodebin3 ! avenc_mpeg4 ! matroskamux ! filesink location=camera' + str(index) + '.mkv')
        pipelineRecording.set_state(Gst.State.PLAYING)

    command += ' ! videoconvert ! x264enc bitrate=20000 ! h264parse ! hlssink2 playlist-root=http://172.20.109.114:8181 location=segment.%05d.ts target-duration=1'
    
    for index, val in enumerate(videos):
        command += ' rtspsrc location="' + val + '" ! rtph264depay ! avdec_h264 ! queue2 ! comp.sink_' + str(index)



    pipeline = Gst.parse_launch(command)
    
    pipeline.set_state(Gst.State.PLAYING)

    try:
        loop.run()
    except Exception:
        loop.quit()

    pipeline.set_state(Gst.State.NULL)