/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { api } from '../../services/api'
import { valueCheck } from '../../components/commom_functions'

import { Campo, Rotulo } from '../../components/commom_in'
import { Toast } from '../../components/toasty'
import { Button, Icon, Modal, Select, Table } from 'react-materialize'
import { CloseButton } from '../../components/buttons'

export default class VenderItems extends Component {
  state = {
    items: [],
    listaVenda: [],
    clientes: [],
    dadosVenda: {},
    depo: [],
    total: 0
  }

  componentDidMount() {
    try {
      this.setState({
        items: this.props.items,
        clientes: this.props.clientes,
        depo: this.props.depositos
      })
      setTimeout(() => this.switchClient(0), 100)
    } catch (err) {
      Toast('Falha ao comunicar com o servidor', 'error')
    }
  }

  switchClient(i) {
    this.setState({
      dadosVenda: {
        ...this.state.clientes[i],
        tipoVenda: '',
        DepId: 0,
        DepIdDest: 0
      }
    })
    document.querySelectorAll('select')[1].selectedIndex = 0
  }

  handleAddProduct(prod) {
    let exists = false
    this.state.listaVenda.map(produto => {
      if (produto.Produto === this.state.items[prod].Produto) {
        exists = true
      }
    })
    if (exists) return

    this.setState({
      listaVenda: [
        ...this.state.listaVenda,
        { ...this.state.items[prod], Quantidade: 1 }
      ]
    })

    setTimeout(() => this.calcTotal(), 1)
  }

  handleQttEdit(qtt, prod, event) {
    if (qtt < this.state.items[prod].ProdQtMinVenda) {
      qtt = this.state.items[prod].ProdQtMinVenda
      event.target.value = this.state.items[prod].ProdQtMinVenda
    }

    let umArray = this.state.listaVenda
    umArray[prod].Quantidade = Number(qtt)
    this.setState({ listaVenda: umArray })

    this.calcTotal()
  }

  handleRemove(prod) {
    let umArray = this.state.listaVenda

    umArray.splice(prod, 1)

    this.setState({ listaVenda: umArray })

    this.calcTotal()
  }

  handleResetList() {
    this.setState({
      listaVenda: [],
      total: 0,
      dadosVenda: { ...this.state.dadosVenda, tipoVenda: '' }
    })
    const selects = document.querySelectorAll('select')
    for (let i = 0; i < selects.length; i++) {
      selects[0].selectedIndex = 0
    }
  }

  calcTotal() {
    let i = this.state.listaVenda.reduce(function(total, numero) {
      return total + numero.Quantidade * (numero.PvnVlr * numero.ProdQtMinVenda)
    }, 0)
    this.setState({ total: i })
  }

  handleChangeSellValue(id, value) {
    if (value === null || value === undefined || value === '') return

    let aux = this.state.listaVenda

    aux[id].PvnVlr = value

    this.setState({ listaVenda: aux })
  }

  async handleSubmit() {
    if (this.state.listaVenda.length === 0) {
      Toast('Insira itens ao pedido antes de concluí-lo', 'error')
      return
    } else if (!this.state.dadosVenda.CNPJn) {
      Toast('Escolha um destinatário para a venda', 'error')
      return
    } else if (this.state.dadosVenda.tipoVenda === '') {
      Toast('Escolha qual é o tipo de venda', 'error')
    } else {
      try {
        const response = await api.post('/sell', {
          token: sessionStorage.getItem('token'),
          destinatario: this.state.dadosVenda,
          listaProdutos: this.state.listaVenda
        })

        if (response.data === 201) {
          this.handleResetList()
          Toast('Venda registrada com sucesso', 'success')
        }
        if (response.data === 400) throw Error
      } catch (err) {
        Toast('Falha ao registrar a venda', 'error')
      }
    }
  }

  render() {
    return (
      <div style={{ width: '95vw' }}>
        <Campo style={{ border: '1px dashed #000', margin: '10px', span: 4 }}>
          <Rotulo style={{ marginLeft: '10px' }}>Venda para: </Rotulo>
          <Select
            icon={<Icon center>people_outline</Icon>}
            onChange={e => {
              this.switchClient(e.target.value)
            }}
          >
            {this.state.clientes.map((usuario, i) => (
              <option key={usuario.CNPJn} value={i}>
                {usuario.Nome_Fantasia + ', CNPJ: ' + usuario.CNPJss}
              </option>
            ))}
          </Select>
        </Campo>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around'
          }}
        >
          <div
            className='tableFixHead'
            style={{
              height: '70vh',
              width: '45%',
              overflow: 'auto'
            }}
          >
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Qt. Mínima</th>
                  <th>Valor Un.</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((item, i) => (
                  <tr
                    className='Item'
                    onClick={() => {
                      this.handleAddProduct(i)
                    }}
                  >
                    <td>{item.Produto}</td>
                    <td>
                      {item.ProdQtMinVenda} {item.UnMedida}
                    </td>
                    <td>{item.PvnVlr.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className='tableFixHead'
            style={{
              height: '70vh',
              width: '55%',
              overflow: 'auto'
            }}
          >
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Produto</th>
                  <th>Qt. Mínima</th>
                  <th>Valor Un.</th>
                  <th>Un. / Pac.</th>
                  <th>Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listaVenda.map((item, i) => (
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
                      {item.ProdQtMinVenda} {item.UnMedida}
                    </td>
                    <td>
                      <input
                        onChange={e => {
                          this.handleChangeSellValue(
                            i,
                            valueCheck(e.target.value, e)
                          )
                        }}
                        style={{
                          all: 'unset',
                          borderBottom: '1px solid #000',
                          width: '40px',
                          textAlign: 'center'
                        }}
                        placeholder={parseFloat(item.PvnVlr).toFixed(2)}
                      />
                    </td>
                    <td>
                      <input
                        placehoder={item.Quantidade}
                        onChange={e => {
                          this.handleQttEdit(
                            valueCheck(e.target.value, e),
                            i,
                            e
                          )
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
                      {!isNaN(
                        parseFloat(
                          item.Quantidade * (item.PvnVlr * item.ProdQtMinVenda)
                        ).toFixed(2)
                      )
                        ? parseFloat(
                            item.Quantidade *
                              (item.PvnVlr * item.ProdQtMinVenda)
                          ).toFixed(2)
                        : 'Erro'}
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
                Efetuar venda<Icon left>add_shopping_cart</Icon>
              </Button>,
              <CloseButton />
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header='Confirmar venda'
            id='modal-0'
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
            trigger={
              <Button style={{ marginLeft: '10px', marginRight: '10px' }}>
                Efetuar venda<Icon left>add_shopping_cart</Icon>
              </Button>
            }
          >
            <p>O valor total da venda será: R$ {this.state.total.toFixed(2)}</p>
            <p>Para o cliente: {this.state.dadosVenda.Nome_Fantasia}</p>
            <p>
              Tipo de venda: {this.state.dadosVenda.tipoVenda || 'Não definido'}
            </p>
          </Modal>

          <Select
            onChange={e => {
              this.setState({
                dadosVenda: {
                  ...this.state.dadosVenda,
                  tipoVenda: e.target.value,
                  CpgId: 0,
                  DepId: 1,
                  DepIdDest: null
                }
              })
            }}
            defaultValue=''
          >
            <option disabled value=''>
              Selecione tipo de venda
            </option>
            <option>Venda</option>
            <option>Remessa</option>
          </Select>

          {this.state.dadosVenda.tipoVenda === 'Venda' && (
            <>
              <label>Depósito Origem:</label>
              <Select
                onChange={e => {
                  this.setState({
                    dadosVenda: {
                      ...this.state.dadosVenda,
                      DepId: this.state.depo[e.target.value].DepId
                    }
                  })
                }}
                defaultValue=''
              >
                <option disabled value=''>
                  Selecione Depósito
                </option>
                {this.state.depo.map((depo, i) => (
                  <option value={i}>{depo.DepNome}</option>
                ))}
              </Select>
              <label>Destino: </label>
              <Select
                onChange={e => {
                  this.setState({
                    dadosVenda: {
                      ...this.state.dadosVenda,
                      DepIdDest: this.state.depo[e.target.value].DepId
                    }
                  })
                }}
                defaultValue=''
              >
                <option disabled value=''>
                  Selecione Depósito
                </option>
                {this.state.depo.map((depo, i) => (
                  <option value={i}>{depo.DepNome}</option>
                ))}
              </Select>
            </>
          )}
          {this.state.dadosVenda.tipoVenda === 'Remessa' && (
            <Select
              onChange={e => {
                this.setState({
                  dadosVenda: {
                    ...this.state.dadosVenda,
                    CpgId: e.target.value
                  }
                })
              }}
              defaultValue=''
            >
              <option disabled value=''>
                Condição de pagamento
              </option>
              <option value={2}>02 DDL</option>
            </Select>
          )}

          <Button
            onClick={() => {
              this.handleResetList()
            }}
          >
            Limpar<Icon left>clear_all</Icon>
          </Button>
        </div>
      </div>
    )
  }
}
