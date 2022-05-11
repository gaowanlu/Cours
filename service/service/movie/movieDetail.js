const cheerio = require('cheerio');
const https = require('https');

const HOST = "www.dqsj.cc";
const VIDEOHOST = "https://dm.dqsj.cc/?url=";

/**
 * 视频详情
 * @param {*} callback
 */
function movieDetail(callback, path) {
    //console.log("path=>", path);
    https.get(`https://${HOST}${path}`, (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            //使用cheerio解析HTML
            const $ = cheerio.load(rawData);
            let scripts = [];
            $('div.player-wrapper').find('script').each((i, elem) => {
                scripts.push($(elem).html());
            });
            let details = [];
            $('div.sort-item').each((i, elem) => {
                let t1 = [];
                $(elem).find('a').each((i1, elem1) => {
                    let path = $(elem1).attr('href');
                    let name = '';
                    $(elem).find('span').each((i2, elem2) => {
                        if (i2 === i1) {
                            name = $(elem2).text();
                        }
                    });
                    t1.push({
                        name,
                        path
                    });
                });
                details.push(t1);
            });
            let result = JSON.parse(scripts[0].split('=')[1]);
            if (result && result.url) {
                result.url = VIDEOHOST + result.url; //frame url
            }
            callback({
                result,
                details
            });
        });
    }).on('error', (e) => {
        callback({
            result: {}
        })
    });
}

// movieDetail((res) => {
//     console.log(JSON.stringify(res));
// }, "/index.php/vod/play/id/2616/sid/1/nid/1.html");

module.exports = movieDetail;