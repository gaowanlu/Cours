import axios from "axios"

const webVpn = async (username, password, callback) => {
    let rp = await axios.post('http://61.171.51.135:5557/', {
        username,
        password
    });
    console.log(rp);
    callback();
}

export default webVpn;