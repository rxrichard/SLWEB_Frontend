/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { api } from '../../services/api'

import { TextInput, Button, Icon, Modal, Table } from 'react-materialize'
import { Toast } from '../../components/toasty'
import '../../style/compra.css'

export default class Produtos extends Component {
  state = {
    produtos: [],
    pedido: [],
    total: 0,
    Obs: ''
  }

  async componentDidMount() {
    try {
      this.setState({ produtos: this.props.produtos })
    } catch (err) {
      Toast('Falha ao comunicar com o servidor', 'error')
    }
  }

  async handleSubmit() {
    try {
      const response = await api.post('/buy', {
        token: localStorage.getItem('token'),
        prodList: this.state.pedido,
        Obs: this.state.Obs
      })

      if (response.data === 400) throw Error

      Toast('Pedido cadastrado com sucesso', 'success')
    } catch (err) {
      Toast('Falha ao registrar seu pedido', 'error')
    }
  }

  handleAddProduct(prod) {
    let exists = false
    this.state.pedido.map(produto => {
      if (produto.Produto === this.state.produtos[prod].Produto) {
        exists = true
      }
    })
    if (exists) return

    this.setState({
      pedido: [
        ...this.state.pedido,
        { ...this.state.produtos[prod], Quantidade: 1 }
      ]
    })
    setTimeout(() => this.calcTotal(), 1)
  }

  handleQttEdit(qtt, prod, event) {
    if (isNaN(qtt)) {
      event.target.value = 1
      qtt = 1
    }

    if (qtt < 1) {
      qtt = 1
      event.target.value = 1
    }

    let umArray = this.state.pedido
    umArray[prod].Quantidade = Number(qtt)
    this.setState({ pedido: umArray })

    this.calcTotal()
  }

  handleRemove(prod) {
    let umArray = this.state.pedido

    umArray.splice(prod, 1)

    this.setState({ pedido: umArray })
    this.calcTotal()
  }

  calcTotal() {
    let i = this.state.pedido.reduce(function(total, numero) {
      return total + numero.Quantidade * (numero.QtMin * numero.DA1_PRCVEN)
    }, 0)
    this.setState({ total: i })
  }

  render() {
    return (
      <div style={{ width: '90vw' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '90vw',
            justifyContent: 'space-around'
          }}
        >
          <div
            className='tableFixHead'
            style={{ height: '70vh', width: '50%', overflow: 'auto' }}
          >
            <Table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Qt. Mínima</th>
                  <th>Preço Un.</th>
                </tr>
              </thead>
              <tbody>
                {this.state.produtos.map((produto, i) => (
                  <tr
                    className='Produto'
                    onClick={() => {
                      this.handleAddProduct(i)
                    }}
                  >
                    <td>{produto.Produto}</td>
                    <td>
                      {produto.QtMin.toFixed(1)} {produto.UnMedida}
                    </td>
                    <td>R$ {produto.DA1_PRCVEN}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div
            className='tableFixHead'
            style={{ height: '70vh', width: '50%', overflow: 'auto' }}
          >
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Produto</th>
                  <th>Qt. por Un.</th>
                  <th>Preço por Un.</th>
                  <th>Unidades</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody>
                {this.state.pedido.map((item, i) => (
                  <tr>
                    <td>
                      <a
                        href='#'
                        onClick={() => {
                          this.handleRemove(i)
                        }}
                      >
                        <Icon center>cancel</Icon>
                      </a>
                    </td>
                    <td>{item.Produto}</td>
                    <td>
                      {item.QtMin.toFixed(1)} {item.UnMedida}
                    </td>
                    <td>{item.DA1_PRCVEN}</td>
                    <td>
                      <input
                        placeholder={item.Quantidade}
                        onChange={e => {
                          this.handleQttEdit(e.target.value, i, e)
                        }}
                        style={{
                          all: 'unset',
                          borderBottom: '1px solid #000',
                          width: '40px',
                          textAlign: 'center'
                        }}
                      />
                    </td>
                    <td>
                      {parseFloat(
                        item.Quantidade * (item.DA1_PRCVEN * item.QtMin)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Modal
            actions={[
              <Button
                onClick={() => {
                  this.handleSubmit()
                }}
              >
                Fazer pedido<Icon left>add_shopping_cart</Icon>
              </Button>,
              <Button flat modal='close' node='button' waves='green'>
                Close
              </Button>
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header='Confirmar compra'
            id='modal-0'
            options={{
              dismissible: true,
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
            trigger={
              <Button style={{ marginLeft: '10px', marginRight: '10px' }}>
                Fazer pedido<Icon left>add_shopping_cart</Icon>
              </Button>
            }
          >
            <p>
              O valor total do pedido será: R$ {this.state.total.toFixed(2)}
            </p>
          </Modal>

          <Button
            onClick={() => {
              this.setState({ pedido: [] })
              this.setState({ total: 0 })
            }}
          >
            Limpar<Icon left>clear_all</Icon>
          </Button>
          <TextInput
            onChange={e => {
              this.setState({ Obs: e.target.value })
            }}
            label='Observações do pedido'
          />
        </div>
      </div>
    )
  }
}
