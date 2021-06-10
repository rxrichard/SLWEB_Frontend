import React from 'react'
import { api } from '../../services/api'

import { Titulo, Contagem, Panel } from '../../components/commom_in'
import { Toast, ToastyContainer } from '../../components/toasty'
import { Button, Icon, Modal } from 'react-materialize'
import { CloseButton } from '../../components/buttons'
import { Table } from '../../components/table'
import Loading from '../../components/loading_screen'

class Equipamentos extends React.Component {
  state = {
    QTDA_Total: 0,
    QTDA_Disponivel: 0,
    reports: [],
    maquinas: [],
    clientes: [],
    loaded: false,
    Maq: {}
  }

  async componentDidMount() {
    try {
      const response = await api.get('/equip', {
        params: {
          token: sessionStorage.getItem('token')
        }
      })

      if (response.data.maquinas.length < 1) throw Error

      this.setState({
        QTDA_Total: response.data.QTDA,
        QTDA_Disponivel: response.data.QTDA_Disp,
        reports: response.data.reports,
        maquinas: response.data.maquinas,
        clientes: response.data.cliente,
        loaded: true
      })
    } catch (err) {
      window.location.assign('/')
    }
  }

  async handleUpdate(maquina, cliente) {
    if (cliente === '') {
      return
    }

    try {
      const response = await api.put('/equip', {
        token: sessionStorage.getItem('token'),
        cliente: this.state.clientes[cliente],
        maquina: this.state.Maq
      })

      if (response.data === 400) throw Error
      if (response.data === 406) {
        Toast('Não houve alteração')
        return
      }

      Toast('Equipamento atribuído com sucesso', 'success')
      setTimeout(() => window.location.reload(), 3000)
    } catch (err) {
      Toast('Falha ao processar a atribuição', 'error')
      setTimeout(() => window.location.reload(), 3000)
    }
  }

  async handleReport(maquina, erro) {
    alert('Reportará erro')
    // try {
    //   const response = await api.post('', {})

    //   if (response.data === 400) throw Error
    // } catch (err) {
    //   Toast(FAILED_REQUEST, 'error')
    // }
  }

  CNPJssMask(CNPJ) {
    if (!CNPJ) return 'NA'
    // só deus sabe meu raciocinio aqui...
    var CNPJ_Final

    CNPJ = CNPJ.replace(/([' '])/g, '')

    if (CNPJ.length < 14) {
      var CPF = []

      CPF[0] = CNPJ.substring(0, 3)
      CPF[1] = CNPJ.substring(3, 6)
      CPF[2] = CNPJ.substring(6, 9)
      CPF[3] = CNPJ.substring(9, 11)

      CNPJ_Final = `${CPF[0]}.${CPF[1]}.${CPF[2]}-${CPF[3]}`
      return CNPJ_Final
    } else {
      var CNPJss = []

      CNPJss[0] = CNPJ.substring(0, 2)
      CNPJss[1] = CNPJ.substring(2, 5)
      CNPJss[2] = CNPJ.substring(5, 8)
      CNPJss[3] = CNPJ.substring(8, 12)
      CNPJss[4] = CNPJ.substring(12, 14)

      CNPJ_Final = `${CNPJss[0]}.${CNPJss[1]}.${CNPJss[2]}/${CNPJss[3]}-${CNPJss[4]}`
      return CNPJ_Final
    }
  }

  showStatus(status) {
    switch (status) {
      case 'A':
        return 'Ativo'

      case 'I':
        return 'Inativo'

      default:
        return 'Desconhecido'
    }
  }

  checkIMEI(IMEI) {
    if (IMEI === null) {
      return 'NA'
    } else if (IMEI === '') {
      return 'NA'
    } else {
      return IMEI[0]
    }
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Panel>
        <ToastyContainer />
        <Titulo>
          <label>Total de maquinas: </label>
          <Contagem>{this.state.QTDA_Total}</Contagem>
          <label>Maquinas instaladas: </label>
          <Contagem>{this.state.QTDA_Disponivel}</Contagem>

          <Button
            node='button'
            style={{
              marginLeft: '5px',
              width: '20%'
            }}
            waves='light'
            onClick={() => {
              this.props.history.push('equipamentos/solicitacao')
            }}
          >
            Solicitar Equipamento
            <Icon left>add_box</Icon>
          </Button>

          <Button
            className='modal-trigger'
            href='#modalerro'
            node='button'
            waves='light'
            style={{
              marginLeft: '5px'
            }}
          >
            Informar erro
            <Icon left>priority_high</Icon>
          </Button>
        </Titulo>

        <Table width={100} height={60} centered>
          <thead>
            <tr>
              <th>Código do equipamento</th>
              <th>Modelo</th>
              <th>Status</th>
              <th>IMEI</th>
              <th id='espaco'>Atribuida à</th>
              <th>CNPJ</th>
              <th>Atribuir à</th>
            </tr>
          </thead>
          <tbody>
            {this.state.maquinas.map((maquina, i) => (
              <tr key={maquina.EquiCod[0]}>
                <td>{maquina.EquiCod[0]}</td>
                <td>{maquina.EquiDesc}</td>
                <td>{this.showStatus(maquina.EquiStatus)}</td>

                <td>{this.checkIMEI(maquina.IMEI)}</td>
                <td>{maquina.AnxDesc || 'NA'}</td>
                <td>{this.CNPJssMask(maquina.CNPJ)}</td>
                <td>
                  <Button
                    onClick={() =>
                      this.setState({ Maq: this.state.maquinas[i] })
                    }
                    className='modal-trigger'
                    href='#atribuir'
                    node='button'
                  >
                    <Icon center>settings</Icon>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal
          actions={[<CloseButton />]}
          bottomSheet={false}
          fixedFooter={false}
          header='Atribuir à'
          id='atribuir'
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
          <Table width={100} height={40} centered>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Cidade</th>
                <th>Bairro</th>
              </tr>
            </thead>
            {this.state.clientes.map((cliente, i) => (
              <tbody>
                <tr
                  modal='close'
                  className='Item'
                  onClick={() => this.handleUpdate(this.state.Maq, i)}
                >
                  <td>{cliente.Nome_Fantasia}</td>
                  <td>{cliente.CNPJss}</td>
                  <td>{cliente.Município}</td>
                  <td>{cliente.Logradouro}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Modal>
        <Modal
          actions={[<CloseButton />]}
          bottomSheet={false}
          fixedFooter={false}
          header='Informar erro de cadastro'
          id='modalerro'
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
          <Table height={40} centered>
            <thead>
              <tr>
                <th>Código do equipamento</th>
                <th>Modelo</th>
                <th>Status</th>
                <th>IMEI</th>
                <th>Erro</th>
              </tr>
            </thead>
            <tbody>
              {this.state.maquinas.map((maquina, i) => {
                if (
                  maquina.CNPJ === this.state.clientes[0].CNPJ ||
                  maquina.CNPJ === this.state.clientes[1].CNPJ ||
                  maquina.CNPJ === null
                ) {
                  return (
                    <tr>
                      <td>{maquina.EquiCod[0]}</td>
                      <td>{maquina.EquiDesc}</td>
                      <td>{maquina.EquiStatus}</td>
                      <td>{this.checkIMEI(maquina.IMEI)}</td>
                      <td>
                        <select
                          onChange={e =>
                            this.handleReport(maquina, e.target.value)
                          }
                          className='DefaultSelect'
                        >
                          <option hidden selected disabled value={null}>
                            Selecione...
                          </option>
                          <option>Não está comigo</option>
                          <option>Modelo errado</option>
                          <option>Problema solucionado</option>
                        </select>
                      </td>
                    </tr>
                  )
                }
                return null
              })}
            </tbody>
          </Table>
        </Modal>
      </Panel>
    )
  }
}

export default Equipamentos
