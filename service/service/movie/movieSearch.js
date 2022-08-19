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

            //名称和更新状态
            $('ul.hl-one-list').each((i, elem) => {
                $(elem).find('li.hl-list-item').each((i, elem) => {
                    let obj = {
                        text: '',
                        name: ''
                    };
                    $(elem).find('a.hl-item-thumb').each((i, elem) => {
                        obj.name = $(elem).attr('title'); //名字
                    });
                    $(elem).find('span.hl-lc-1').each((i, elem) => {
                        obj.text = $(elem).text(); //更新状态
                    });
                    APP.headers.push(obj);
                });
            });

            //封面url
            $('a.hl-item-thumb').each((i, elem) => {
                let img = $(elem).attr('data-original');
                APP.imgs.push(img);
                let path = $(elem).attr('href');
                APP.footers.push(path);
            });


            $('div.hl-item-content').each((i, elem) => {
                let texts = [];
                $(elem).find('p.hl-item-sub').each((i, elem) => {
                    texts.push($(elem).text());
                });
                APP.mains.push(texts);
            });

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

// movieSearch((result) => {
//     console.log(result);
// }, "你的名字", 1);

module.exports = movieSearch;