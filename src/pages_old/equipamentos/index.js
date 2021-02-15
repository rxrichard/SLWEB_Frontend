import React from 'react'
import Loading from '../../components/loading_screen'

import { Combobox, Titulo, Contagem, Panel } from '../../components/commom_in'
import { Toast } from '../../components/toasty'
import { Table, Button, Icon, Select, Modal } from 'react-materialize'
import { api } from '../../services/api'

class Equipamentos extends React.Component {
  state = {
    QTDA: 0,
    QTDA_Disp: 0,
    maquinas: [],
    clientes: [],
    loaded: false,
    Maq: {}
  }

  async componentDidMount() {
    try {
      const response = await api.get('/equip', {
        params: {
          token: localStorage.getItem('token')
        }
      })

      if(response.data.maquinas.length < 1) throw Error

      this.setState({
        QTDA: response.data.QTDA,
        QTDA_Disp: response.data.QTDA_Disp,
        maquinas: response.data.maquinas,
        clientes: response.data.cliente,
        loaded: true
      })

    } catch (err) {
        Toast("Erro ao estabelecer conexão com o servidor.", "error");
        localStorage.clear();
        window.location.assign("/");
    }
  }

  async handleUpdate(maquina, cliente) {
    if (cliente === '') {
      return
    }

    try {
      await api.put('/equip', {
        token: localStorage.getItem('token'),
        cliente: this.state.clientes[cliente],
        maquina: this.state.Maq
      })
      window.location.reload()
    } catch (err) {
      Toast('Erro ao estabelecer conexão com o servidor.', 'error')
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
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
      <div
        style={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          marginTop: '60px'
        }}
      >
        <Titulo>
          <label>Total de maquinas: </label>
          <Contagem>{this.state.QTDA}</Contagem>
          <label>Maquinas instaladas: </label>
          <Contagem>{this.state.QTDA_Disp}</Contagem>
        </Titulo>

        <div className='tableFixHead'>
          <Table centered>
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
                  <td>
                    {this.showStatus(maquina.EquiStatus)}
                  </td>

                  <td>{this.checkIMEI(maquina.IMEI)}</td>
                  <td>{maquina.AnxDesc || 'NA'}</td>
                  <td>{this.CNPJssMask(maquina.CNPJ)}</td>
                  <td>
                    <Button
                      onClick={() => this.setState({ Maq: this.state.maquinas[i] })}
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
        </div>

        <Button
          node='button'
          style={{
            marginLeft: '5px',
            width: '20%'
          }}
          waves='light'
          onClick={() => {
            window.location.assign('equipamentos/solicitacao')
          }}
        >
          Solicitar Equipamento
          <Icon left>add_box</Icon>
        </Button>

        <Modal
          actions={[
            <Button flat modal='close' node='button' waves='green'>
              Fechar
              <Icon left>close</Icon>
            </Button>
          ]}
          bottomSheet={false}
          fixedFooter={false}
          header='Atribuir à'
          id='atribuir'
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
          <div className='tableFixHead' style={{ height: '40vh' }}>
            <table>
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
                  <tr onClick={() => this.handleUpdate( this.state.Maq, i)} className='Produto'>
                    <td>{cliente.Nome_Fantasia}</td>
                    <td>{cliente.CNPJss}</td>
                    <td>{cliente.Município}</td>
                    <td>{cliente.Logradouro}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Equipamentos
