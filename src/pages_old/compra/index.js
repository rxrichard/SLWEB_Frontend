import React, { Component } from 'react'
import { api } from '../../services/api'

import Produtos from './produtos'
import PedidosPendentes from './pendentes_novo'
import PedidosConcluidos from './concluidos_novo'
import Loading from '../../components/loading_screen'

import { Panel } from '../../components/commom_in'
import { Tabs, Tab } from 'react-materialize'
import { Toast, ToastyContainer } from '../../components/toasty'

export default class Compra extends Component {
  state = {
    produtos: {},
    atendidos: {},
    abertos: {},
    loaded: false
  }

  async componentDidMount() {
    try {
      const response = await api.get('/buy', {
        params: {
          token: localStorage.getItem('token')
        }
      })
      this.setState({
        produtos: response.data.prodList,
        atendidos: response.data.PedidosAtendidos,
        abertos: response.data.PedidosAbertos,
        loaded: true
      })
    } catch (err) {
      Toast('Falha ao comunicar com o servidor', 'error')
    }
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Panel>
        <ToastyContainer />
        <Tabs className='tab-demo z-depth-1' style={{ overflow: 'hidden' }}>
          <Tab
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false
            }}
            title='Comprar'
          >
            <Produtos produtos={this.state.produtos} />
          </Tab>

          <Tab
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false
            }}
            title='Pedidos não atendidos'
          >
            <PedidosPendentes pedidos={this.state.abertos} />
          </Tab>

          <Tab
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false
            }}
            title='Pedidos atendidos'
          >
            <PedidosConcluidos pedidos={this.state.atendidos} />
          </Tab>
        </Tabs>
      </Panel>
    )
  }
}
