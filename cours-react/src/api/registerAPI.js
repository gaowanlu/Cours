import axios from "axios";
import {
    webVpnPath
} from './config';

function postUsername(rec,username) {
    axios({
        method:'post',
        url:`${webVpnPath}user/register`,
        data:JSON.stringify({username}),
        headers:{
            'Content-Type':'application/json;charset=UTF-8'
        }
    }).then(rec).catch((e) => {
        console.log(e);
    });
}


const registerAPI = {
    postUsername
};

export default registerAPI;
