import {createBrowserHistory} from 'history';
import {getCookie, setCookie} from './helper';

window.browserHistory = createBrowserHistory();

const SERVER_URL = {
    development: 'https://beta.api.ttnote.cn',
  // development: 'http://localhost:3003',
  production: 'https://beta.api.ttnote.cn',
};

const _ttnote = {
    goto(path) {
       window.browserHistory.push(path)
    },

    baseUrl: SERVER_URL[process.env.NODE_ENV],
    user: JSON.parse(localStorage.getItem('ttnoteUser')),

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

    objectToUrl(params){
      return Object.keys(params)
        .filter(v => params[v] !== undefined)
        .reduce((result, next, index) => {
          if (index === 0) {
            result += '?';
          }
          result += `${next}=${params[next]}&`;
          return result;
        }, '')
        .replace(/&$/, '');
    },

    fetch(input, params = {method: 'get'}) {
        let headers = {'Content-Type': 'application/json'};
        if (getCookie('token')) headers['Authorization'] = getCookie('token');

      return new Promise(function(resolve, reject) {
          window.fetch(input, {headers, ...params})
              .then(res => {
                  if (res.status >= 200 && res.status <= 202) {
                    res.json()
                      .then(res => resolve(res))
                  }
                  if (res.status === 204) {
                    resolve(res)
                  }
                  if (res.status === 401) {
                   setCookie('token', '', '-10');
                    window.ttnote.goto('/login?needLogin');
                  }
              }).catch(err => reject(err))
      })
    },
};

window.ttnote = _ttnote;
