import axios from "axios"

const webVpn = async (username, password, callback) => {
    let rp = await axios.post('https://linkway.site:5557/', {
        username,
        password
    }, {
        timeout: 120000
    }).catch((e) => {
        /*将最新内容存储。。。*/
        callback({
            status: 500
        });
    });
    callback(rp);
}

export default webVpn;