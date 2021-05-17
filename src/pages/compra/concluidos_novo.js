import React, { Component } from 'react'
import { api } from '../../services/api'

import { Toast } from '../../components/toasty'
import { Button, Modal, Icon } from 'react-materialize'
import { convertData } from '../../components/commom_functions'
import { CloseButton } from '../../components/buttons'

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
        className='tableFixHead'
        style={{
          height: '70vh',
          width: '97vw'
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Dt. da emissão</th>
              <th>Num. do pedido</th>
              <th>Tipo de venda</th>
              <th>Nº da NF</th>
              <th>Dep.</th>
              <th>Inspecionar</th>
            </tr>
          </thead>
          <tbody>
            {this.state.pedidos.map((pedido, i) => (
              <tr
                onClick={() => {
                  this.handleShowItems(i)
                }}
              >
                <td>{convertData(pedido.DtEmissao)}</td>
                <td>{pedido.Pedido}</td>
                <td>{this.typeOrigem(pedido.F_SERIE)}</td>
                <td>{Number(pedido.DOC)}</td>
                <td>{pedido.DEPDEST}</td>
                <Button
                  className='modal-trigger'
                  href='#modal2'
                  style={{
                    marginTop: '10px'
                  }}
                >
                  <Icon center>search</Icon>
                </Button>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          actions={[
            <CloseButton />
          ]}
          bottomSheet={false}
          fixedFooter={false}
          header='Items do Pedido'
          id='modal2'
          options={{
            dismissible: false,
            endingTop: '10%',
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: () => { this.setState({ items: [] })},
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: '4%'
          }}
        >
          <div
            style={{
              height: '100%',
              width: '100%'
            }}
            className='tableFixHead'
          >
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
        </Modal>
      </div>
    )
  }
}
