import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//Import das telas
import Login from '../../pages/login/index'
import LoginADM from '../../pages/loginADM/index'
import Forgot from '../../pages/forgot'
import XRoute from '../../pages/unauthorized/index'

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