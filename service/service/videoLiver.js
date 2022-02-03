const NodeMediaServer = require('node-media-server');

const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 6000,
        allow_origin: '*'
    },
    http: {
        port: 5559,
        allow_origin: '*'
    }
};

const nms = new NodeMediaServer(config);

module.exports = () => {
    nms.run();
}