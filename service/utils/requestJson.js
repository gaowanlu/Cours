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
}

module.exports = requestJson;