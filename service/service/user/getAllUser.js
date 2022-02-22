const userDao = require('../../dao/userDao');
/**
 * 获取所有用户
 * @returns 
 */
async function getAllUser() {
    //同步检索用户列表
    let resolve_;
    let waitUsers = new Promise((resolve, reject) => {
        resolve_ = resolve;
    });
    let users = [];
    userDao.SELECT((result) => {
        users = result;
    }, resolve_);
    await waitUsers;
    return users;
}
module.exports = getAllUser;