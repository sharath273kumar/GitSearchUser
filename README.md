# Project Overview

This Project is a web applictaion which allows you to search for GitHub Users which uses the GitHub Search API as the third-party API

-> There is a search input where you can enter the search term to get the list of users. It contains a debounce of half a second to prevent inefficency in api calls.
-> All the data is cached in the backend thereby increasint the efficency of multiple similar API calls. An option for Clearing the Backend cache is given to flush all the cache data.
-> There can be multiple users for a search term, so each page will be showing only 20 users and if there is more than 20 results for a API then there will be an option to traverse to next page to list the next set of users for the search term.


## Technologies Used

FrontEnd - ReactJS, HTML, CSS
BackEnd - NodeJS, Express, node-cache

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
