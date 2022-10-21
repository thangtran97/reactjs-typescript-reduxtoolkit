from flask import Flask, render_template, Response 
import cv2
app = Flask(__name__) 
import os

RTSP_URL1 = 'rtsp://root:11111Qaz@172.20.109.238:554/live2.sdp'
RTSP_URL2 = 'rtsp://root:11111Qaz@172.20.109.238:554/live3.sdp'
RTSP_URL3 = 'rtsp://root:11111Qaz@172.20.109.238:554/live4.sdp'
RTSP_URL4 = 'rtsp://root:11111Qaz@172.20.109.239:554/live2.sdp'
RTSP_URL5 = 'rtsp://root:11111Qaz@172.20.109.239:554/live3.sdp'
RTSP_URL6 = 'rtsp://root:11111Qaz@172.20.109.239:554/live4.sdp'
RTSP_URL7 = 'rtsp://root:11111Qaz@172.20.109.240:554/live2.sdp'
RTSP_URL8 = 'rtsp://root:11111Qaz@172.20.109.240:554/live3.sdp'
RTSP_URL9 = 'rtsp://root:11111Qaz@172.20.109.240:554/live4.sdp'
os.environ['OPENCV_FFMPEG_CAPTURE_OPTIONS'] = 'rtsp_transport;udp'

cap1 = cv2.VideoCapture(RTSP_URL1, cv2.CAP_FFMPEG)
cap2 = cv2.VideoCapture(RTSP_URL2, cv2.CAP_FFMPEG)
cap3 = cv2.VideoCapture(RTSP_URL3, cv2.CAP_FFMPEG)
cap4 = cv2.VideoCapture(RTSP_URL4, cv2.CAP_FFMPEG)
cap5 = cv2.VideoCapture(RTSP_URL5, cv2.CAP_FFMPEG)
cap6 = cv2.VideoCapture(RTSP_URL6, cv2.CAP_FFMPEG)
cap7 = cv2.VideoCapture(RTSP_URL7, cv2.CAP_FFMPEG)
cap8 = cv2.VideoCapture(RTSP_URL8, cv2.CAP_FFMPEG)
cap9 = cv2.VideoCapture(RTSP_URL9, cv2.CAP_FFMPEG)
@app.route('/') 
def index(): 
   """Video streaming .""" 
   return render_template('play-rtsp.html') 
def gen(cap, picname): 
   """Video streaming generator function.""" 
   while True: 
       _, frame = cap.read()
       cv2.imwrite(picname, frame) 
       yield (b'--frame\r\n' 
              b'Content-Type: image/jpeg\r\n\r\n' + open(picname, 'rb').read() + b'\r\n') 

@app.route('/video_feed1') 
def video_feed1(): 
   return Response(gen(cap1, 'pic1.jpg'), 
                   mimetype='multipart/x-mixed-replace; boundary=frame') 
@app.route('/video_feed2') 
def video_feed2(): 
   return Response(gen(cap2, 'pic2.jpg'), 
                   mimetype='multipart/x-mixed-replace; boundary=frame')   
@app.route('/video_feed3') 
def video_feed3(): 
   return Response(gen(cap3, 'pic3.jpg'), 
                   mimetype='multipart/x-mixed-replace; boundary=frame') 
@app.route('/video_feed4') 
def video_feed4(): 
   return Response(gen(cap4, 'pic4.jpg'), 
                   mimetype='multipart/x-mixed-replace; boundary=frame') 
@app.route('/video_feed5') 
def video_feed5(): 
   return Response(gen(cap5, 'pic5.jpg'), 
                   mimetype='multipart/x-mixed-replace; boundary=frame') 
@app.route('/video_feed6') 
def video_feed6(): 
   return Response(gen(cap6, 'pic6.jpg'), 
                   mimetype='multipart/x-mixed-replace; boundary=frame')   
@app.route('/video_feed7') 
def video_feed7(): 
   return Response(gen(cap7, 'pic7.jpg'), 
                   mimetype='multipart/x-mixed-replace; boundary=frame') 
@app.route('/video_feed8') 
def video_feed8(): 
   return Response(gen(cap8, 'pic8.jpg'), 
                   mimetype='multipart/x-mixed-replace; boundary=frame') 
@app.route('/video_feed9') 
def video_feed9(): 
   return Response(gen(cap9, 'pic9.jpg'), 
                   mimetype='multipart/x-mixed-replace; boundary=frame')                                 
if __name__ == '__main__': 
	app.run(host='0.0.0.0', debug=True, threaded=True) 