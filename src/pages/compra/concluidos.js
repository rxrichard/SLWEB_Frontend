import React, { Component } from 'react'
import { api } from '../../services/api'

import { Toast } from '../../components/toasty'
import { convertData } from '../../components/commom_functions'

export default class PedidosConcluidos extends Component {
  state = {
    pedidos: [],
    items: []
  }

  componentDidMount() {
    try {
      this.setState({ pedidos: this.props.pedidos })
    } catch (err) {
      Toast('Falha ao comunicar com o servidor', 'error')
    }
  }

  typeOrigem(type) {
    switch (type) {
      case '1':
        return 'Produtos'
      case 1:
        return 'Produtos'
      case 'D':
        return 'Taxas'
      default:
        return 'Desconhecida'
    }
  }

  async handleShowItems(count) {
    try {
      const response = await api.get('/buy/order/done', {
        params: {
          token: sessionStorage.getItem('token'),
          DOC: this.state.pedidos[count].DOC
        }
      })

      this.setState({ items: response.data })
    } catch (err) {
      Toast('Falha ao buscar dados do pedido', 'error')
    }
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
        <div style={{ height: '70vh', width: '40%', overflow: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Dt. da emissão</th>
                <th>Num. do pedido</th>
                <th>Tipo de venda</th>
                <th>Nº da NF</th>
                <th>Dep.</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pedidos.map((pedido, i) => (
                <tr
                  className='Item'
                  onClick={() => {
                    this.handleShowItems(i)
                  }}
                >
                  <td>{convertData(pedido.DtEmissao)}</td>
                  <td>{pedido.Pedido}</td>
                  <td>{this.typeOrigem(pedido.F_SERIE)}</td>
                  <td>{Number(pedido.DOC)}</td>
                  <td>{pedido.DEPDEST}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ height: '70vh', width: '60%', overflow: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Emissão</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Valor Un.</th>
                <th>Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(item => (
                <tr>
                  <td>{item.Pedido}</td>
                  <td>{convertData(item.DtEmissao)}</td>
                  <td>{item.Produto[0]}</td>
                  <td>{parseFloat(item.D_QUANT).toFixed(2)}</td>
                  <td>{parseFloat(item.VENVLR).toFixed(2)}</td>
                  <td>{parseFloat(item.D_TOTAL).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
