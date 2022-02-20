import axios from "axios";
import {
    webVpnPath
} from './config';

function searchResultFormat(result) {
    let formated = [];
    let {
        footers,
        headers,
        imgs,
        mains
    } = result;
    if (footers && headers && imgs && mains) {
        for (let i = 0; i < footers.length; i++) {
            formated.push({
                path: footers[i],
                name: headers[i].name,
                last: headers[i].text,
                img: imgs[i],
                persons: mains[i],
            });
        }
    }
    return formated;
}

function detail(rec, path) {
    axios
        .get(`${webVpnPath}movie/detail?path=${path}`)
        .then(rec)
        .catch((e) => {
            console.log(e);
        });
}

function search(rec, searchString) {
    axios
        .get(`${webVpnPath}movie/search?name=${searchString}&page=1`)
        .then(rec)
        .catch((e) => {
            console.log(e);
        });
}


const movieAPI = {
    search,
    detail,
    searchResultFormat
};

export default movieAPI;