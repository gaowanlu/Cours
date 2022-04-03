const checkContentType = require('./checkContentType');
const requestReceiver = require('./requestReceiver');

/*
 *Json工具
 * */
const requestJson = {
    /**
     *
     * @param {*} string json
     * @param {*} success 转换成功回调函数
     * @param {*} error 转换错误回调函数
     */
    json2Object: (string, success, error) => {
        try {
            let obj = JSON.parse(string);
            if (typeof obj === 'object') {
                success(obj);
            }
        } catch (e) {
            error(e);
        }
    },
    /**
     *
     * @param {*} obj 需要转json的对象
     * @param {*} success 转换成功的回调函数
     * @param {*} error 转换错误的回调函数
     * @returns
     */
    object2Json: (obj, success, error) => {
        try {
            if (typeof obj !== 'object') {
                return error();
            }
            let string = JSON.stringify(obj);
            if (typeof string === 'string') {
                success(string);
            }
        } catch (e) {
            error(e);
        }
    },
    /**
     * 从Request中接收JSON请求体
     * @param {Request} req
     * @returns body JSON format
     */
    async jsonReceiver(req) {
        //判断提交的是否为json数据
        if (checkContentType['application/json'](req.headers['content-type'])) {
            let body = await requestReceiver(req);//接受请求提及交的json内容
            requestJson.json2Object(body, (res) => body = res, (e) => body = {});
            return body;//返回将json转换后的对象
        } else {
            return null;//非法情况返回null
        }
    }
}

module.exports = requestJson;

