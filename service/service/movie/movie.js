const url = require('url');
const movieSearch = require('./movieSearch');
const movieDetail = require('./movieDetail');

function search(req, res) {
    let Url = url.parse(req.url, true);
    let name = Url.query.name || '';
    let page = Url.query.page || 1;
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf8'
    });
    try {
        movieSearch((result) => {
            res.write(JSON.stringify(result));
            res.end();
        }, name, page);
    } catch (e) {
        console.log(e);
        res.end();
    }
}

function detail(req, res) {
    let Url = url.parse(req.url, true);
    let path = Url.query.path || '';
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf8'
    });
    try {
        movieDetail((result) => {
            res.write(JSON.stringify(result));
            res.end();
        }, path);
    } catch (e) {
        console.log(e);
        res.end();
    }
}

module.exports = {
    search,
    detail
};