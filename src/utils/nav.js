import {createBrowserHistory} from 'history';

window.browserHistory = createBrowserHistory();

class Nav {
    goto(path) {
       window.browserHistory.push(path)
    }
}

window.nav = new Nav();
