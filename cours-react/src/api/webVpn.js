import axios from "axios"
import {
    webVpnPath
} from './config';

const webVpn = async (username, password, callback) => {
    // let rp = await axios(webVpnPath, {
    //     username,
    //     password
    // }, {
    //     timeout: 120000
    // });
    let rp = axios({
        method: 'post',
        url: webVpnPath,
        data: {
            username,
            password
        },
        timeout: 120000
    });
    rp.then((res) => {
        console.log("RES", res);
        callback(res);
    });
    rp.catch((e) => {
        callback({
            status: 500
        });
        console.log("GET FROM PROXY ERROR", e);
    });
}

export default webVpn;