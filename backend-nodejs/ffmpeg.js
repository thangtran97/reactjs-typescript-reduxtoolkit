const childProcess = require("child_process");
const path = require("path");
const outputs = [];

module.exports.initTrans = () => {
    for (let i = 0; i < 16; i++) {
        const fileName = path.join(__dirname, '/images/videos/h264-encode-' + i + '.mkv');
        const output = new Transcode(fileName);
        outputs.push(output);
    }
}

class Transcode {
    constructor(name) {
        this.log(`Initialising video...`);
        this.fileName = name;
        this.inputFile = path.join(__dirname, '/images/videos/h265-encode.mkv');
        this.ffmpegProcess = null;

        this.args = [
            "-hwaccel", "qsv",
            "-c:v", "hevc_qsv",
            "-i", this.inputFile,
            "-map", "0",
            "-c:v", "h264_qsv",
            "-c:a", "copy",
            "-y", this.fileName,
        ];
        this.startTranscoding();
        this.log(`Video initialised`);
    }

    log(message, ...optionalParams) {
        console.log(`${new Date().toISOString()} [${this.fileName}] ${message}`, ...optionalParams);
    }

    startTranscoding() {
        try {
            this.log(`*** Spawing ffmpeg process ***`);
            this.ffmpegProcess = childProcess.spawn("ffmpeg", this.args, {});

            this.ffmpegProcess.stdout.on('data', (data) => {
                this.log('[STDOUT]', data.toString());
            });

            this.ffmpegProcess.stderr.on('data', (data) => {
                this.log('[STDERR]', data.toString());
            });

            this.ffmpegProcess.on('exit', (code) => {
                this.log(`[EXIT] code ${code}`);
            });

            this.ffmpegProcess.on('error', (err) => {
                this.log(`[ERROR]`, err);
            });

        } catch (error) {
            this.log('start transcoding error', error);
            if (this.ffmpegProcess) this.ffmpegProcess.kill();
        }
    }
}