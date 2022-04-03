/**
 * 为Request创建上下文 主要用于拦截器与转发等情况
 * 主要解决在进行身份鉴权等情况下本项目需要解决类似于java web中的拦截器
 * 而经过的拦截器链节点之间需要进行通信，直接在request对象内定义属于本项目的信息
 * 我们暂且把它称为request context即上下文
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
