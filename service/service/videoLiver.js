const NodeMediaServer = require('node-media-server');
const fs = require("fs");
// use ffmpeg
// ./ffmpeg -f dshow -i video="Integrated Webcam" -vcodec h264 -acodec copy -r 30 -offset_x 10 -offset_y 20  -f flv rtmp://127.0.0.1:1935/live/cliver
//ffmpeg -f dshow -i video="Integrated Webcam" -f dshow -i audio="麦克风阵列 (英特尔® 智音技术)" -vcodec h264 -acodec copy -r 30 -offset_x 10 -offset_y 20  -f flv rtmp://127.0.0.1:1935/live/cliver
// ./ffmpeg -f dshow -i video="Integrated Webcam" -f dshow -i audio="麦克风阵列 (英特尔® 智音技术)" -vcodec h264 -preset:v ultrafast -pix_fmt yuv420p -acodec aac -f flv rtmp://127.0.0.1:1935/live/cliver
const config = {
    rtmp: {
        port: 1935,
        chunk_size: 20000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 6000,
        allow_origin: '*'
    },
    https: {
        port: 5559,
        allow_origin: '*',
        pfx: fs.readFileSync('./linkway.site.pfx'),
        passphrase: fs.readFileSync('./keystorePass.txt'),
    }
};

const nms = new NodeMediaServer(config);

module.exports = () => {
    nms.run();
}