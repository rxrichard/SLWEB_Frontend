import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Login from '../../pages_old/login/index'
import LoginADM from '../../pages_old/loginADM/index'
import Forgot from '../../pages_old/forgot'
import XRoute from '../../pages_old/unauthorized/index'

export default class Out extends React.Component {
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/pilao' component={LoginADM} />
                    <Route exact path='/forgot' component={Forgot} />
                    <Route path='*' component={XRoute} />
                </Switch>
            </Router>
        )
    }
}