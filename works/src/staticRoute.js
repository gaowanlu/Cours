const fs = require('fs');
const path = require('path');
const mime = require('mime-types')

/**
 * common static source route
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 * @param {info} context 
 * @param {string} filePath 
 */
async function staticRoute(req, res, context, filePath) {
    //check filePath
    try {
        fs.accessSync(filePath, fs.constants.R_OK);
    } catch (err) {
        res.writeHead(404, {});
        res.end();
        return;
    }
    const readStream = fs.ReadStream(filePath);
    const extName = path.extname(filePath);
    let contentType = mime.lookup(extName);
    res.writeHead(200, {
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Server': 'Works.js'
    });
    readStream.on('close', function () {
        res.end();
    });
    readStream.pipe(res);
}

module.exports = staticRoute;