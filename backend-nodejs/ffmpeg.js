const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

ffmpeg('rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4', { timeout: 100000 }).addOptions([
    '-profile:v baseline',
    '-s 640x480',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10',
    '-hls_list_size 0',
    '-f hls'
]).output('outputs/output.m3u8').on('end', () => {
    console.log('end');
}).run();