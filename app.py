from flask import Flask, request, jsonify, make_response, send_file
from flask_cors import CORS
import gi

gi.require_version("Gst", "1.0")

from gi.repository import Gst

Gst.init()
app = Flask(__name__)
CORS(app)

videos = [
    {
        "id": 0,
        "label": "HLS",
        "url": "https://wowza.peer5.com/live/smil:bbb_abr.smil/playlist.m3u8",
        "type": "application/x-mpegURL"
    },
    {
        "id": 1,
        "label": "DASH",
        "url": "https://livesim.dashif.org/livesim/mup_30/testpic_2s/Manifest.mpd",
        "type": "application/dash+xml"
    },
]

@app.route("/videos")
def get_all():
    response = {
        "success": True,
        "total": len(videos),
        "data": videos
    }
    return make_response(jsonify(response))

@app.route("/videos/<id>")
def get_detail(id):
    video = next((val for val in videos if str(val["id"]) == id), None)
    response = {
        "success": True,
        "data": video
    }

    return make_response(jsonify(response))

@app.route("/videos", methods=["POST"])
def create():
    data = request.get_json()
    videos.append({
        "id": videos[len(videos) - 1]["id"] + 1,
        "label": data["label"],
        "url": data["url"],
        "type": data["type"]
    })

    response = {
        "success": True
    }

    return make_response(jsonify(response))

@app.route("/videos/<id>", methods=["PUT"])
def edit(id):
    data = request.get_json()
    for index, val in enumerate(videos):
        if (str(val["id"]) == id):
            video = {
                "id": id,
                "label": data["label"],
                "url": data["url"],
                "type": data["type"]
            }
            videos[index] = video

    response = {
        "success": True
    }

    return make_response(jsonify(response))

@app.route("/videos/<id>", methods=["DELETE"])
def delete(id):
    for index, val in enumerate(videos):
        if (str(val["id"]) == id):
            videos.pop(index)

    response = {
        "success": True
    }

    return make_response(jsonify(response))

@app.route("/videos/<file_name>")
def live_stream(file_name): 
    return send_file(file_name)

@app.route("/<segment>")
def get_segment(segment): 
    return send_file("segments/" + segment)

@app.route("/videos/compositing", methods=["POST"])
def compositing():
    data = request.get_json()
    videos = data["videos"]
    compositing_and_record(videos=videos)

    return make_response(jsonify({"success": True}))

def compositing_and_record(videos):
    command = "compositor name=comp"
    for index, val in enumerate(videos):
        command += ' sink_'+ str(index) + '::xpos=' + str(320*index) + ' sink_'+ str(index) + '::ypos=0 sink_'+ str(index) + '::width=320 sink_'+ str(index) + '::height=240'
        pipeline_recording = Gst.parse_launch('rtspsrc location="' + val + '" ! decodebin3 ! avenc_mpeg4 ! matroskamux ! filesink location=records/camera' + str(index) + '.mkv')
        pipeline_recording.set_state(Gst.State.PLAYING)

    command += ' ! videoconvert ! x264enc bitrate=20000 ! h264parse ! hlssink2 playlist-root=http://localhost:5000 location=segments/segment.%05d.ts target-duration=1'
    
    for index, val in enumerate(videos):
        command += ' rtspsrc location="' + val + '" ! rtph264depay ! avdec_h264 ! queue2 ! comp.sink_' + str(index)

    pipeline = Gst.parse_launch(command)
    pipeline.set_state(Gst.State.PLAYING)


if __name__ == "__main__":
    app.run()

