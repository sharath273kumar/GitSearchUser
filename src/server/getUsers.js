const request = require('request')

const getUsers = (searchKey, page, contentPerPage, callback) => {
    const searchUserUrl = 'https://api.github.com/search/users?per_page=' + contentPerPage + '&page=' + page 
    + '&q=' + searchKey;

    console.log('[VSK] searchKey= ' + searchKey + 'Page request=' + page);
    request({url: searchUserUrl, json: true, headers:{'User-Agent' : 'application/vnd.github.v3+json'}}, (error, response) => {
        if(error){
            callback('Search Services is not available')
        } else if(response.body.error){
            callback('Something went wrong. Try again later')
        } else{
            callback(undefined, {
                items: response.body.items
            })
        }

    })
}

module.exports = getUsers