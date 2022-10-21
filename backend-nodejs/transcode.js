const express = require('express');
const app = express();

const port = 3002;

// initialise the cameras
const outputs = require('./ffmpeg.js');

app.listen(port, () => {
    console.log(`*** NVR running on port ${port} ***`);
})

outputs.initTrans();