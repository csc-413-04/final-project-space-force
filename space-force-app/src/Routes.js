import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Upload from "./containers/Upload";
import Followers from "./containers/Followers";
import Following from "./containers/Following";



export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/upload" exact component={Upload} />
    <Route path="/followers" exact component={Followers}/>
    <Route path="/following" exact component={Following}/>
 


    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;