import React, { Component } from 'react'
import { api } from '../../services/api'

import { Toast } from '../../components/toasty'
import { Button, Icon } from 'react-materialize'
import { convertData } from '../../components/commom_functions'

export default class PedidosPendentes extends Component {
  state = {
    pedidos: [],
    items: [],
    PedidoID: undefined
  }

  componentDidMount() {
    try {
      this.setState({ pedidos: this.props.pedidos })
    } catch (err) {
      Toast('Falha ao comunicar com o servidor', 'error')
    }
  }

  showStatus(status) {
    switch (status) {
      case null:
        return 'Não faturado'
      case 'C':
        return 'Cancelado'

      default:
        return 'NA'
    }
  }

  async handleSeePurchase(id) {
    this.setState({ PedidoID: id })

    try {
      const response = await api.get('/buy/order/over', {
        params: {
          token: sessionStorage.getItem('token'),
          PedidoID: id
        }
      })

      this.setState({ items: response.data })
    } catch (err) {
      Toast('Não foi possivel carregar detalhes do pedido', 'error')
    }
  }

  async handleCancelOrder() {
    alert('Excluir pedido com ID: ' + this.state.PedidoID)
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '90vw'
        }}
      >
        <div style={{ height: '70vh', maxWidth: '50%', overflow: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Cancelar pedido</th>
                <th>Status</th>
                <th>Dt. Solicitação</th>
                <th>N. Pedido</th>
                <th>Qtda. itens</th>
                <th>Valor Total</th>
                <th>DL</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pedidos.map((pedido, i) => (
                <tr
                  className='Item'
                  onClick={() =>
                    this.handleSeePurchase(this.state.pedidos[i].PedidoID)
                  }
                >
                  <td
                    onClick={() => {
                      this.handleCancelOrder()
                    }}
                  >
                    <Button>
                      <Icon small center>
                        cancel
                      </Icon>
                    </Button>
                  </td>
                  <td>{pedido.Status}</td>
                  <td>{convertData(pedido.Solicitação)}</td>
                  <td>{pedido.PedidoID}</td>
                  <td>{pedido.QtItens}</td>
                  <td>{parseFloat(pedido.VlrTotal).toFixed(2)}</td>
                  <td>{pedido.DL || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ height: '70vh', maxWidth: '50%', overflow: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Produto</th>
                <th>Qtda. comprada</th>
                <th>Vlr. da un. / pac.</th>
                <th>Vlr. total</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(item => (
                <tr>
                  <td>{item.PedidoID}</td>
                  <td>{item.Produto}</td>
                  <td>{parseFloat(item.QtdeVendida).toFixed(2)}</td>
                  <td>{parseFloat(item.PrecoUnitarioLiquido).toFixed(2)}</td>
                  <td>{parseFloat(item.PrecoTotal).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
