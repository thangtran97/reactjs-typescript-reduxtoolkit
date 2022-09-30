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
const storage = require('./nvr/storage.json');

app.use(express.json());
app.use(express.static(THUMBNAIL_FOLDER));
app.post('/search', (req, res) => {
    let result = []
    let lstCam = req.body.comboBoxSelected;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let start = new Date(startDate);

    for (const cam of lstCam) {
        const camName = cam.label;
        const camValue = cam.value;
        let camUrl = path.join(camValue, start.getFullYear() + '',
            zeroPad(start.getMonth() + 1, 2), zeroPad(start.getDate(), 2));
        let storagePath = path.join(storage.rootpath, camUrl);
        fs.readdirSync(storagePath).forEach((file) => {
            if (fs.lstatSync(path.join(storagePath, file)).isFile()) {
                result.push({camName: camName, fileName: file, path: storagePath, url: camUrl})
            }
        });
    }
    log('seach output ', result);
    res.send(result);
});

app.post('/get-thumbnail', (req, res) => {
    let result = []
    let time
    let fileUrl = path.join(storage.rootpath, req.body.filePath, req.body.fileName);
    console.log('File name ' + req.body.fileName);
    console.log('File path ' + req.body.filePath);

    getVideoDurationInSeconds(fileUrl).then((duration) => {
        console.log(duration)
        time = (duration | 0)
        for (let i = 7; i > 0; i--) {
            ffmpeg({source: fileUrl, nolog: true})
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
    }).catch((err) => {
        log("[ERR] ", err)
    })

});

app.get('/decode-video', (req, res) => {
    let ffmpegProcess = null;
    const ext = req.params.ext;
    const parts = `${req.params['0']}.${ext}`.split('/').filter(x => x.length > 0);

    const filepath = path.join(storage.rootpath, ...parts);
    const args = [
        "-y",
        "-i", filepath,
        "-vcodec", "libx264", //libsvtav1 libx265
        "-acodec", "copy",
        OUTPUT_FOLDER + "meomeo.mkv"
    ];

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
        });

        ffmpegProcess.on('error', (err) => {
            log(`[ERROR]`, err);
        });

        setTimeout(function () {

        }, 2000);

    } catch (error) {
        log('startRecording error', error);
        if (ffmpegProcess) ffmpegProcess.kill();
    }

});

app.get('/get-all-cb-data', (req, res) => {
    let result = []
    fs.readdirSync(storage.rootpath).forEach((file) => {
        if (fs.lstatSync(path.join(storage.rootpath, file)).isDirectory()) {
            result.push({label: file, value: file, key: '', disabled: false})
        }
    });
    log('cb-box', result);
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