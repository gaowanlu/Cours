import axios from "axios"

const webVpn = async (username, password, callback) => {
    let rp = await axios.post('http://61.171.51.135:5557/', {
        username,
        password
    }, {
        timeout: 120000
    });
    /*将最新内容存储。。。*/
    callback(rp);
}

export default webVpn;