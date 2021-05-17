import React, { Component } from 'react'
import { api } from '../../services/api'

import { Toast } from '../../components/toasty'
import { Button, Icon, Modal } from 'react-materialize'
import { convertData } from '../../components/commom_functions'
import { CloseButton } from '../../components/buttons'

export default class PedidosPendentes extends Component {
  state = {
    pedidos: [],
    items: [],
    PedidoID: undefined,
    ShouldDisableCancel: false
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

  async handleSeePurchase(i) {
    this.setState({ PedidoID: this.state.pedidos[i].PedidoID })

    if (this.state.pedidos[i].Status === 'Cancelado' || this.state.pedidos[i].ST === 'C') {
      this.setState({ ShouldDisableCancel: true })
    } else {
      this.setState({ ShouldDisableCancel: false })
    }

    try {
      const response = await api.get('/buy/order/over', {
        params: {
          token: sessionStorage.getItem('token'),
          PedidoID: this.state.pedidos[i].PedidoID
        }
      })

      this.setState({ items: response.data })
    } catch (err) {
      Toast('Não foi possivel carregar detalhes do pedido', 'error')
    }
  }

  async handleCancelOrder() {
    try{
      const response = await api.delete('/buy/order/delete', {
        params: {
          token: sessionStorage.getItem('token'),
          NumPedido: this.state.PedidoID
        }
      })
      if(response.data.protocolo === 409) throw Error

      Toast('Pedido cancelado com sucesso', 'success')
    }catch(err){
      Toast('Falha ao cancelar pedido, entre em contato com o atendimento', 'error')
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
              <th>Status</th>
              <th>Data de Solicitação</th>
              <th>Numero do Pedido</th>
              <th>Quantidade de itens</th>
              <th>Valor Total</th>
              <th>DL</th>
              <th>Inspecionar</th>
            </tr>
          </thead>
          <tbody>
            {this.state.pedidos.map((pedido, i) => (
              <tr onClick={() => this.handleSeePurchase(i)}>
                <td>{pedido.Status}</td>
                <td>{convertData(pedido.Solicitação)}</td>
                <td>{pedido.PedidoID}</td>
                <td>{pedido.QtItens}</td>
                <td>{parseFloat(pedido.VlrTotal).toFixed(2)}</td>
                <td>{pedido.DL || ''}</td>
                <Button
                  className='modal-trigger'
                  href='#modal1'
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
            <Button
              disabled={this.state.ShouldDisableCancel}
              onClick={() => {
                this.handleCancelOrder()
              }}
            >
              Cancelar Pedido
              <Icon small left>
                cancel
              </Icon>
            </Button>,
            <CloseButton />
          ]}
          bottomSheet={false}
          fixedFooter={false}
          header='Items do Pedido'
          id='modal1'
          options={{
            dismissible: false,
            endingTop: '10%',
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: '4%'
          }}
        >
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
        </Modal>
      </div>
    )
  }
}
