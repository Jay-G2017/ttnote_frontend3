import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Registration from "./Registration";
import Login from "./Login";
import NotFoundPage from "./NotFoundPage";
import Note from "./Note";

function App() {
   return (
       <Router history={window.browserHistory}>
           <Switch>
               <Route exact path='/' component={Home}/>
               <Route path='/note' component={Note} />
               <Route path='/login' component={Login}/>
               <Route path='/registration' component={Registration}/>
               <Route component={NotFoundPage}/>
           </Switch>
       </Router>
   )
}

export default App;