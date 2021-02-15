import React, { Component } from 'react'
import { api } from '../../services/api'
import { Toast } from '../../components/toasty'

import { Icon, Button, Modal } from 'react-materialize'

export default class Historico extends Component {
  state = {
    vendas: [],
    pedido: [],
    pedidoDados: [],
    NFAtual: ''
  }

  componentDidMount() {
    try {
      this.setState({
        vendas: this.props.vendas
      })
    } catch (err) {
      Toast('Falha ao comunicar com o servidor', 'error')
    }
  }

  converterData(data) {
    if (data === 'NA' || data === null) {
      return 'NA'
    }

    let Data = String(data)

    const dataA = Data.split('T')
    const dataB = dataA[0].replace(/-/g, '/')
    return dataB
      .split('/')
      .reverse()
      .join('/')
  }

  showStatus(status) {
    switch (status) {
      case null:
        return <Icon center>playlist_add_check</Icon>
      case 'C':
        return <Icon center>money_off</Icon>

      case 'S':
        return <Icon center>sync_problem</Icon>

      default:
        return <Icon center>playlist_add_check</Icon>
    }
  }

  async handleSeeSell(i) {
    this.setState({ NFAtual: this.state.vendas[i].PvcID })
    try {
      const response = await api.get('/sell/order', {
        params: {
          token: localStorage.getItem('token'),
          NF: this.state.vendas[i].PvcID
        }
      })

      this.setState({
        pedido: response.data.prodList,
        pedidoDados: response.data.prodData
      })
    } catch (err) {
      Toast('Falha ao buscar dados da venda')
    }
  }

  handleGenPDF() {}

  handleGenNF() {}

  handleGenExcel() {}

  async handleDellSell() {
    try {
      const response = await api.delete('/sell/delete', {
        params: {
          token: localStorage.getItem('token'),
          NF: this.state.NFAtual
        }
      })

      switch (response.data) {
        case 'TOTVS':
          Toast(
            'Venda realizada pelo TOTVS não pode ser cancelada, faça nota de devolução',
            'error'
          )
          break
        case 'CANCELADO':
          Toast('Venda já foi cancelada', 'error')
          break
        case 'EXPIROU D':
          Toast(
            'Venda realizada à mais de dez dias não pode ser cancelada',
            'error'
          )
          break
        case 'EXPIROU M':
          Toast(
            'Venda realizada à mais de um mês não pode ser cancelada',
            'error'
          )
          break
        case 400:
          Toast('Falha ao processar a requisição', 'error')
          break
        default:
          Toast('Venda cancelada com sucesso', 'success')
          setTimeout(() => window.location.reload(), 5000)
          break
      }
    } catch (err) {
      Toast('Falha ao cancelar a venda', 'error')
    }
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '97vw'
        }}
      >
        <div
          className='tableFixHead'
          style={{
            height: '70vh',
            width: '55%',
            overflow: 'auto'
          }}
        >
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Emissão</th>
                <th>NF</th>
                <th>CNPJ D.</th>
                <th>Nome Fantasia D.</th>
              </tr>
            </thead>
            <tbody>
              {this.state.vendas.map((venda, i) => (
                <tr className='Produto' onClick={() => this.handleSeeSell(i)}>
                  <td>{this.showStatus(venda.STATUS)}</td>
                  <td>{this.converterData(venda.DataIntegracao)}</td>
                  <td>{venda.PvcID}</td>
                  <td>{venda.CNPJss}</td>
                  <td>{venda.Nome_Fantasia}</td>
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
          <table>
            <thead>
              <tr>
                <th>NF</th>
                <th>Produto</th>
                <th>Qtda.</th>
                <th>Valor Un.</th>
                <th>Valor total</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pedido.map((pedido, i) => (
                <tr>
                  <td>{this.state.pedidoDados[i].PvcID}</td>
                  <td>{pedido.Produto}</td>
                  <td>{this.state.pedidoDados[i].PvdQtd.toFixed(2)}</td>
                  <td>{this.state.pedidoDados[i].PvdVlrUnit.toFixed(2)}</td>
                  <td>{this.state.pedidoDados[i].PvdVlrTotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {this.state.NFAtual && (
            <div
              style={{
                display: 'flex',
                marginTop: '10px',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Button
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  this.handleGenNF()
                }}
              >
                Gerar NF
              </Button>
              <Button
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  this.handleGenPDF()
                }}
              >
                Gerar PDF
              </Button>
              <Button
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  this.handleGenExcel()
                }}
              >
                Gerar Excel
              </Button>
              <Button
                className='modal-trigger'
                href='#modal1'
                node='button'
                style={{ marginLeft: '10px' }}
              >
                Cancelar venda
              </Button>

              <Modal
                actions={[
                  <Button
                    onClick={() => {
                      this.handleDellSell()
                    }}
                  >
                    <Icon left>warning</Icon>
                    Confirmar
                  </Button>,
                  <Button flat modal='close' node='button' waves='green'>
                    Close
                  </Button>
                ]}
                bottomSheet={false}
                fixedFooter={false}
                header='Confirmação'
                id='modal1'
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
              >
                Cancelar da venda de NF {this.state.NFAtual}?
              </Modal>
            </div>
          )}
        </div>
      </div>
    )
  }
}
