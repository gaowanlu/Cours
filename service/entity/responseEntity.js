/**
 * 返回JSON实体类
 */
class ResponseEntity {
    /**
     * 
     * @param {响应状态} status 
     * @param {描述信息} message 
     * @param {Object:JSON Object} data 
     */
    constructor(status, message, data) {
        if (status === undefined) {
            status = 404;
        }
        if (message === undefined) {
            message = '未知错误';
        }
        this.head = {
            status,
            message
        };
        if (data === undefined) {
            this.data = {

            }
        } else {
            this.data = data;
        }
    }
    toJson() {
        return JSON.stringify(this);
    }
}
// console.log(new ResponseEntity().toJson());

module.exports = ResponseEntity;