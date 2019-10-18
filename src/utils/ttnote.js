import {createBrowserHistory} from 'history';

window.browserHistory = createBrowserHistory();

const SERVER_URL = {
    development: 'http://beta.api.ttnote.cn',
    production: 'https://prod-kellis-server.dev.saybot.net:443',
};

const _ttnote = {
    goto(path) {
       window.browserHistory.push(path)
    },

    baseUrl: SERVER_URL[process.env.NODE_ENV],

    searchObject() {
        const query = decodeURIComponent(window.location.search)
            .replace(/^\?/, '')
            .split('&');
        const queryObject = {};
        for (let i = 0, len = query.length; i < len; i++) {
            const item = query[i];
            const [key, value] = item.split('=');
            queryObject[key] = value;
        }
        return queryObject;
    } ,

    fetch(input, params) {
      return new Promise(function(resolve, reject) {
          window.fetch(input, params)
              .then(res => {
                  res.clone()
                      .json()
                      .then(res => resolve(res))
              }).catch(err => reject(err))
      })
    },
};

window.ttnote = _ttnote;
