const movieSearch = require('./movieSearch');
const movieDetail = require('./movieDetail');

/*
 *影视资源搜索
 * */
function search(callback, name, page) {
    movieSearch(callback, name, page);
}

/*
 *影视详情获取
 * */
function detail(callback, name, page) {
    movieDetail(callback, name, page);
}

module.exports = {
    search,
    detail
};