const axios = require('axios');

let api_key = 'Wfv8Wdg1gq5KoaQq0Q5JDnwfQmoGrpf5';
let q = 'not found';
let limit = 25;

module.exports = {
    get404Gif: () => {
        return axios.get('https://api.giphy.com/v1/gifs/search', {
            params: { api_key, q, limit }
        });
    }
}