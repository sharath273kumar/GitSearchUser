const express = require('express');
const cors = require('cors');
const getUsers = require('./getUsers');
const constants = require('./constants');
const Cache = require('node-cache' );
const PORT = process.env.PORT || 3001 ;


const app = express();
const cache = new Cache({deleteOnExpire: true});

app.use(cors());
app.options('*', cors());

app.post('/api/search', (request, response) => {
    const searchKey = request.query.searchKey;
    const searchType = request.query.searchType;
    const page = request.query.page;
    const cacheKey = searchKey+page;
    response.setHeader('Content-Type', 'application/json');

    if(cache.get(cacheKey)){
      console.log('[VSK] Returned from cache');
      const cachedData = cache.get(cacheKey);
      response.send(cachedData);
    }
    else{
      console.log('[VSK] No-Cache Data Found');
      getUsers(searchKey, page, constants.RECORDS_PER_PAGES, (error, userData) => {
        if(error)
          return response.send(error)

        cache.set(cacheKey, userData, constants.CACHE_TIMEOUT);
        response.send(userData)
      })
    }

});

app.post('/api/clear-cache', (request, response) => {
  console.log('Cache cleared');
    cache.flushAll();
    response.send({status: 'Cleared'});
})

app.listen(PORT, () =>
  console.log('Express server is running on localhost:'+PORT)
);