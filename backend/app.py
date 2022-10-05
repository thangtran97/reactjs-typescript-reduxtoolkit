from flask import Flask, request, jsonify, make_response, send_file, Response
from flask_cors import CORS
import os
import io
import base64

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

@app.route("/files")
def get_file():
    directory = request.args.get("directory")
    file = request.args.get("file")
    return send_file(directory + "/" + file if directory else file)

@app.route("/<segment>")
def get_segment(segment): 
    return send_file("segments/" + segment)

@app.route("/records")
def get_all_record():
    records = []
    for file in os.listdir("records"):
        if file.endswith((".mkv", ".mp4")):
            records.append(file)
    response = {
        "success": True,
        "total": len(records),
        "data": records
    }
    return make_response(jsonify(response))

@app.route("/records/play")
def play_video():
    name = request.args.get("name")
    headers = request.headers
    start, end = headers["Range"].replace("bytes=", "").split("-")
    video_path = "records/" + name

    chunk, start, length, file_size = get_chunk(int(start), int(end) if end else end, video_path)

    response = Response(chunk, 206, mimetype='video/mp4', content_type='video/mp4', direct_passthrough=True)
    response.headers.add('Content-Range', 'bytes {0}-{1}/{2}'.format(start, start + length - 1, file_size))
    return response

def get_chunk(byte1, byte2, video_path):
    file_size = os.stat(video_path).st_size
    start = 0
    
    if byte1 < file_size:
        start = byte1
    if byte2:
        length = byte2 + 1 - byte1
    else:
        length = file_size - start

    with open(video_path, 'rb') as video:
        video.seek(start)
        chunk = video.read(length)
    return chunk, start, length, file_size

@app.route("/images", methods=["POST"])
def upload_image():
    data = request.get_json()

    img_string = data["image"].replace('data:image/png;base64,', '')
    img_data = base64.b64decode(img_string)
    filename = data["name"]

    with open("images/" + filename + ".png", "wb") as f:
        f.write(img_data)

    response = {
        "success": True,
    }

    return make_response(jsonify(response))


if __name__ == "__main__":
    app.run()

