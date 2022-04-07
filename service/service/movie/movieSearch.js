const cheerio = require('cheerio');
const https = require('https');

const HOST = "www.dqsj.cc";
const SEARCH_PATH = (str, page) => `https://${HOST}/index.php/vod/search/page/${page}/wd/${str}.html`;

/**
 * 电影搜索爬虫
 * @param {*} callback 回调(result)=>{}
 * @param {*} searchString 搜索关键词
 * @param number 第几页
 */
function movieSearch(callback, searchString, page) {
    //console.log("search>>", SEARCH_PATH(searchString, page));
    https.get(SEARCH_PATH(searchString, page), (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            //console.log('接收数据中...');
            rawData += chunk;
        });
        let APP = {
            imgs: [],
            headers: [],
            mains: [],
            footers: []
        };
        res.on('end', () => {
            //使用cheerio解析HTML
            const $ = cheerio.load(rawData);
            //展示图片地址
            $('div.module-search-item').each(function (i, elem) {
                APP.imgs.push($(elem).find('div.module-item-pic').find('img').attr('data-src'));
            });
            //头部信息
            $('div.video-info-header').find('a.video-serial').each((i, elem) => {
                APP.headers.push({
                    name: $(elem).attr('title'),
                    text: $(elem).text()
                });
            });
            //主题信息
            $('div.video-info-main').each((i, elem) => {
                let items = [];
                $(elem).find('div.video-info-items').each((i, elem) => {
                    let datas = [];
                    $(elem).find('div.video-info-item').each((i1, elem1) => {
                        datas.push($(elem1).text().replace("/\n\t\t\t\t\t", "").replace("/\t\t\t\t\t\t", "").replace("\t", "").replace(" ", ""));
                    });
                    items.push(datas);
                });
                APP.mains.push(items);
            });
            //尾部信息
            $('div.video-info-footer').each((i, elem) => {
                APP.footers.push($(elem).find('a').attr('href'));
            })
            callback({
                result: APP
            });
        });
    }).on('error', (e) => {
        callback({
            result: {}
        })
    });
}

//movieSearch((result) => {
//     console.log(result);
//}, "你的名字", 1);

module.exports = movieSearch;
