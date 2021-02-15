import React, { Component } from 'react'

import Out from './out/routes'
import In from './in/routes'

//import de css
import 'materialize-css'
import '../style/materialize.css'
import '../style/MainStyle.css'
import '../style/BurgerMenu.css'

export default class Main extends Component {
  render() {
    return sessionStorage.getItem('token') ? <In /> : <Out />
  }
}
