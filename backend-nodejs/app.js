const express = require('express')
const app = express()
const childProcess = require("child_process");
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const path = require('path');
const { getVideoDurationInSeconds } = require('get-video-duration')

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const VIDEO_FOLDER = 'D:\\training-reactjs\\test-git\\Traning-Reacjs\\frontend-js\\public\\videos\\';
const IMG_FOLDER = 'D:\\training-reactjs\\media\\thumbnail\\';
const THUMBNAIL_FOLDER = __dirname + '/images/'
const OUTPUT_FOLDER = THUMBNAIL_FOLDER + '/videos/'

app.use(express.json());
app.use(express.static(THUMBNAIL_FOLDER));
app.post('/search', (req, res) => {
    let result = []
    console.log(req.body)
    let lstCam = req.body.comboBoxSelected;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    for (const cam of lstCam) {
        const camName = cam.label;
        const camValue = cam.value;
        fs.readdirSync(VIDEO_FOLDER).forEach((file) => {
            if (fs.lstatSync(VIDEO_FOLDER + file).isFile()) {
                result.push({camName: camName, fileName: file, path: VIDEO_FOLDER})
            }
        });
    }
    res.send(result);
});

app.post('/get-thumbnail', (req, res) => {
    let result = []
    console.log('File name ' + req.body.fileName);
    let time
    getVideoDurationInSeconds(VIDEO_FOLDER + req.body.fileName).then((duration) => {
        console.log(duration)
        time = (duration | 0)
        for (let i = 7; i > 0; i--) {
            ffmpeg({source: VIDEO_FOLDER + req.body.fileName, nolog: true})
                .on('filenames', function (filenames) {
                    result.push(filenames);
                })
                .on('end', function () {
                })
                .screenshots({
                    filename: '2-images-%s.jpg',
                    timestamps: [((time / i) | 0)],
                }, 'images');
        }
        console.log('rs ' + result);
        setTimeout(function () {
            res.send(result)
        }, 1000);
    })

});

app.post('/decode-video', (req, res) => {
    const args = [
        "-y",
        "-i", VIDEO_FOLDER + req.body.fileName,
        "-vcodec", "libx264", //libsvtav1 libx265
        "-acodec", "copy",
        OUTPUT_FOLDER + "meomeo.mkv"
    ];
    let ffmpegProcess = null;
    try {
        ffmpegProcess = childProcess.spawn("ffmpeg", args, {});
        let done = false;
        ffmpegProcess.stdout.on('data', (data) => {
            log('[STDOUT]', data.toString());
        });

        // ffmpegProcess.stderr.on('data', (data) => {
        //     log('[STDERR]', data.toString());
        // });

        ffmpegProcess.on('exit', (code) => {
            log(`[EXIT] code ${code}`);
            res.send('meomeo.mkv')
        });

        ffmpegProcess.on('error', (err) => {
            log(`[ERROR]`, err);
        });

    } catch (error) {
        log('startRecording error', error);
        if (ffmpegProcess) ffmpegProcess.kill();
    }

});

app.get('/get-all-cb-data', (req, res) => {
    let result = []
    for (let step = 1; step < 10; step++) {
        result.push({label: 'Camera-' + zeroPad(step, 2), value: 'cam-' + step})
    }
    res.send(result);
});

const zeroPad = (num, places) => String(num).padStart(places, '0');
const log = (message, ...optionalParams) => {
    console.log(`${new Date().toISOString()} [${this.name}] ${message}`, ...optionalParams);
}

const returnResult = (fileName, res) => {
    fs.stat(OUTPUT_FOLDER + fileName, function (err, stat) {
        if (err == null) {
            setTimeout(function () {
                res.send(fileName)
            }, 1000);
            console.log('Send file');
        } else {
            setTimeout(function () {
                returnResult(fileName, res)
            }, 1000);
            console.log('recursive');
        }
    });
}

app.listen(9000);