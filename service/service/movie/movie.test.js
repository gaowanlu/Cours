const movieAPI = require('./movie.js');
movieAPI.search((res) => {
    console.log(res);
}, "", 1);