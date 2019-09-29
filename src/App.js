import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Registration from "./Registration";
import Login from "./Login";
import NotFoundPage from "./NotFoundPage";

function App() {
   return (
       <Router>
           <Switch>
               <Route exact path='/' component={HomePage}/>
               <Route path='/login' component={Login}/>
               <Route path='/registration' component={Registration}/>
               <Route component={NotFoundPage}/>
           </Switch>
       </Router>
   )
}

export default App;