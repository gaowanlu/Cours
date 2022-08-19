const cheerio = require('cheerio');
const https = require('https');

const HOST = "www.dqsj.cc";
const VIDEOHOST = "https://dm.dqsj.cc/m3u8.php?url=";

/**
 * 视频详情
 * @param {*} callback
 */
function movieDetail(callback, path) {
    // console.log("path=>", path);
    https.get(`https://${HOST}${path}`, (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            //使用cheerio解析HTML
            const $ = cheerio.load(rawData);
            let details = [];
            $('div.hl-play-source').each((i, elem) => {
                let detail = [];
                $(elem).find('div.row').each((i, elem) => {
                    $(elem).find('li').find('a').each((i, elem) => {
                        detail.push({
                            name: $(elem).text(),
                            path: $(elem).attr('href')
                        });
                    });
                });
                details.push(detail);
            });
            //检查是否有iframe
            let url = '';
            $('div.conch-content').find('script').each((i, elem) => {
                if (i == 0) {
                    try {
                        let script = $(elem).html();
                        //console.log(script);
                        let result = JSON.parse(script.split('=')[1]);
                        //console.log(result);
                        if (result && result.url) {
                            result.url = VIDEOHOST + result.url; //frame url
                            url = result.url;
                        }
                        // console.log(result);
                    } catch (e) {
                        //console.error(e);
                    }
                }
            });

            callback({
                result: {
                    url: url,
                    html: rawData
                },
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
// }, "/index.php/vod/play/id/28931/sid/1/nid/1.html");

module.exports = movieDetail;