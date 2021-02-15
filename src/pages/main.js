import React, { Component } from 'react'

import Out from './out/index'
import In from './in/index'

export default class Main extends Component {
  render() {
    return <>{localStorage.getItem('token') ? <In /> : <Out />}</>
  }
}
