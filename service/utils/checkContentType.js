/*
 *检查http请求的contenttype  
 * */
const checkContentType = {
    /*判断是否为json类型
     * */
    'application/json': (contentType) => {
        if (!contentType || typeof contentType !== "string") {
            return false;
        }
        return null !== contentType.toString().match('application/json');
    }
}

module.exports = checkContentType;
