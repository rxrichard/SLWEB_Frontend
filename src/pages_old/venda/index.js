import React, { Component } from 'react'
import { api } from '../../services/api'

import Vender from './produtos'
import Loading from '../../components/loading_screen'
import Historico from './historico'

import { Panel } from '../../components/commom_in'
import { Tabs, Tab } from 'react-materialize'
import { Toast, ToastyContainer } from '../../components/toasty'

export default class Venda extends Component {
  state = {
    items: [],
    vendas: [],
    clientes: [],
    depositos: [],
    loaded: false
  }

  async componentDidMount() {
    try {
      const prod = await api.get('/sell', {
        params: {
          token: localStorage.getItem('token')
        }
      })

      const client = await api.post('/client', {
        token: localStorage.getItem('token')
      })

      const depositos = await api.get('/deposit', {
        params:{
          token: localStorage.getItem('token')
        }
      })

      this.setState({
        items: prod.data.produtos,
        vendas: prod.data.vendas,
        clientes: client.data,
        depositos: depositos.data,
        loaded: true
      })
    } catch (err) {
      Toast('Falha ao buscar dados no servidor', 'error')
    }
  }
  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Panel>
        <ToastyContainer />
        <Tabs className='tab-demo z-depth-1'>
          <Tab
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false
            }}
            title='Vender'
          >
            <Vender clientes={this.state.clientes} items={this.state.items} depositos={this.state.depositos}/>
          </Tab>
          <Tab
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false
            }}
            title='Vendas realizadas'
          >
            <Historico vendas={this.state.vendas} />
          </Tab>
        </Tabs>
      </Panel>
    )
  }
}
