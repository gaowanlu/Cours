const url = require('url');
const movie = require('../../../service/movie/movie');

function search(req, res) {
    let Url = url.parse(req.url, true);
    let name = Url.query.name || '';
    let page = Url.query.page || 1;
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf8'
    });
    try {
        movie.search((result) => {
            res.write(JSON.stringify(result));
            res.end();
        }, name, page);
    } catch (e) {
        console.log(e);
        res.end();
    }
}
module.exports = search;