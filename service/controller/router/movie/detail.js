const movie = require('../../../service/movie/movie');
const url = require('url');

function detail(req, res) {
    let Url = url.parse(req.url, true);
    let path = Url.query.path || '';
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf8'
    });
    try {
        movie.detail((result) => {
            res.write(JSON.stringify(result));
            res.end();
        }, path);
    } catch (e) {
        console.log(e);
        res.end();
    }
}
module.exports = detail;