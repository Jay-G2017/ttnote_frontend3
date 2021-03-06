import React, {useEffect} from 'react';
import {Router, Switch, Route} from "react-router-dom";
import Home from "./Home";
import Registration from "./Registration";
import Login from "./Login";
import NotFoundPage from "./NotFoundPage";
import Note from "./Note";
import Support from "./Support";
import DevelopPlan from "./DevelopPlan";
import Feedback from "./Feedback";
import PomodoroTechnique from "./PomodoroTechnique";
import {initSound} from './utils/helper';

function App() {
  useEffect(() => {
    document.addEventListener('touchend', function() {
      initSound();
    });
    document.addEventListener('click', function() {
      initSound();
    });

    return (() => {
      document.removeEventListener('touchend', function() {
        initSound();
      });
      document.removeEventListener('click', function() {
        initSound();
      });
    })
  }, []);

  return (
    <Router history={window.browserHistory}>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/note' component={Note}/>
        <Route path='/login' component={Login}/>
        <Route path='/registration' component={Registration}/>
        <Route path='/support' component={Support}/>
        <Route path='/develop_plan' component={DevelopPlan}/>
        <Route path='/feedback' component={Feedback}/>
        <Route path='/pomodoro_technique' component={PomodoroTechnique}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
  )
}

export default App;
