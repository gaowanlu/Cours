const movieSearch = require('./movieSearch');
const movieDetail = require('./movieDetail');

function search(callback, name, page) {
    movieSearch(callback, name, page);
}

function detail(callback, name, page) {
    movieDetail(callback, name, page);
}

module.exports = {
    search,
    detail
};