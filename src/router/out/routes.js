import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//Import das telas
import Login from '../../pages/login/index'
import LoginADM from '../../pages/loginADM/index'
import Forgot from '../../pages/forgot'
import Formulario from '../../pages/formulario'
import XRoute from '../../pages/1_UNAUTHORIZED/index'
import autoLogin from '../../pages/autoLogin'

export default class Out extends React.Component {
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/pilao' component={LoginADM} />
                    <Route exact path='/forgot' component={Forgot} />
                    <Route exact path='/formulario' component={Formulario} />
                    <Route path='/integracao/:code' component={autoLogin} />
                    <Route path='*' component={XRoute} />
                </Switch>
            </Router>
        )
    }
}
