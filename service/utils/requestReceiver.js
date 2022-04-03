/**
 * 同步接收request object body内容
 * 解决在项目中的接受请求体数据代码复用方案
 * @param {Request} req
 * @returns body内容
 */
async function requestReceiver(req) {
    let resolve, reject;
    const wait = new Promise((resolve_, reject_) => {
        resolve = resolve_;
        reject = reject_;
    });
    //获取请求体
    let rawData = '';
    req.on('data', (chunk) => {
        rawData += chunk;
    });
    req.on('end', () => {
        if (resolve)
            resolve(rawData);
    });
    req.on('error', () => {
        if (reject)
            reject(null);
    });
    const result = await wait;
    return result;
}
module.exports = requestReceiver;
