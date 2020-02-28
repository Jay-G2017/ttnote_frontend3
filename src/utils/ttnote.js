import {createBrowserHistory} from 'history';
import {getCookie, setCookie} from './helper';
// import BreakSound from '../audio/BreakSoundLoudAbr64.mp3'
// import DingDingSound from '../audio/DingDingSoundAbr64.mp3';
// import BeginSound from '../audio/BeginSoundAbr64.mp3';
// import {Howl} from 'howler';

window.browserHistory = createBrowserHistory();

const SERVER_URL = {
    development: 'https://beta.api.ttnote.cn',
  // development: 'http://localhost:3004',
  production: 'https://beta.api.ttnote.cn',
};

const savingEvent = new CustomEvent('changeStatus', {detail: 'saving'});
const savedEvent = new CustomEvent('changeStatus', {detail: 'saved'});
const failedEvent = new CustomEvent('changeStatus', {detail: 'failed'});

const dispatchSavedEventLater = (milliSeconds = 600) => {
  setTimeout((() => window.dispatchEvent(savedEvent)), milliSeconds)
};

const _ttnote = {
    goto(path) {
       window.browserHistory.push(path)
    },

    baseUrl: SERVER_URL[process.env.NODE_ENV],
    user: JSON.parse(localStorage.getItem('ttnoteUser')),
    userSetting: JSON.parse(localStorage.getItem('ttnoteUserSetting')),

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
        window.dispatchEvent(savingEvent);
        window.fetch(input, {headers, ...params})
          .then(res => {
            if (res.status >= 200 && res.status <= 202) {
              dispatchSavedEventLater();
              res.json()
                .then(res => resolve(res))
            }
            if (res.status === 204) {
              dispatchSavedEventLater();
              resolve(res)
            }
            if (res.status === 401) {
              window.dispatchEvent(savedEvent);
              setCookie('token', '', '-10');
              window.ttnote.goto('/login?needLogin');
            }
          }).catch(err => {
            window.dispatchEvent(failedEvent);
            reject(err)
        })
      })
    },
};

window.ttnote = _ttnote;
// window.restAudio = new Howl({src: BreakSound, html5: true});
// window.restAudio = new Howl({src: BreakSound});
// // window.dingDingAudio = new Howl({src: DingDingSound, html5: true});
// window.dingDingAudio = new Howl({src: DingDingSound});
// window.beginAudio = new Howl({src: BeginSound, volume: 0.8});

