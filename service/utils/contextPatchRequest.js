/**
 * 为Request创建上下文 主要用于拦截器与转发等情况
 * @param {*} req 
 * @returns 
 */
function contextPatchRequest(req) {
    if (req.__cours__) {} else {
        req.__cours__ = {};
    }
    return req.__cours__;
}
module.exports = contextPatchRequest;