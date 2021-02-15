import React from 'react'
import { api } from '../../services/api'
import Loading from '../../components/loading_screen'

import { Combobox, Contagem, Campo, Rotulo, Titulo, Panel } from '../../components/commom_in'
import { Select, Icon, TextInput, Button, Modal } from 'react-materialize'
import { Toast, ToastyContainer } from '../../components/toasty'

class Contratos extends React.Component {
  state = {
    contratos: [],
    update: [],
    headerInfo: {},
    displayed: 0,
    loaded: false
  }

  async componentDidMount() {
    try {
      const response = await api.get('/contract', {
        params: {
          token: localStorage.getItem('token')
        }
      })

      this.setState({ contratos: response.data })
      this.setState({ loaded: true })
      this.switchCliente(0)
    } catch (err) {
      Toast('Erro ao estabelecer conexão com o servidor.', 'error')
      window.location.assign('/')
    }
  }

  converterData(data) {
    if (data === 'NA' || data === null) {
      return 'NA'
    }

    let DtSolicita = String(data)

    const dataA = DtSolicita.split('T')
    const dataB = dataA[0].replace(/-/g, '/')
    return dataB
      .split('/')
      .reverse()
      .join('/')
  }

  async switchCliente(num) {
    this.setState({ displayed: num })
    this.setState({ update: this.state.contratos[num] })

    const inputs = document.querySelectorAll('input')
    let i
    for (i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }

    try {
      const response = await api.post('/contract', {
        CNPJ: this.state.contratos[num].CNPJ,
        token: localStorage.getItem('token')
      })
      this.setState({ headerInfo: response.data })
    } catch (err) {
      Toast('Falha ao estabelecer conexão ao servidor', 'error')
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
  }

  async Update() {
    try {
      const response = await api.put('/contract', {
        usuario: this.state.update,
        token: localStorage.getItem('token')
      })
      if (response.data === 1) {
        Toast('Dados do contrato atualizados com sucesso', 'success')

        setTimeout(() => {
          window.location.reload()
        }, 5000)
      } else {
        console.log(response.data)
        Toast('Não foi possivel atualizar os dados do contrato', 'error')
      }
    } catch (err) {
      Toast('Falha ao comunicar com o servidor', 'error')
    }
  }

  render() {
    return (
      !this.state.loaded ? <Loading /> :
      <Panel>
        <ToastyContainer />
        <Titulo>
          <Campo style={{ border: '1px dashed #000', margin: '10px' }}>
            <Rotulo>Cliente: </Rotulo>
            <Select
              onChange={e => {
                this.switchCliente(e.target.value)
              }}
              icon={<Icon center>people_outline</Icon>}
            >
              {this.state.contratos.map((contrato, i) => (
                <option key={contrato.CNPJ} value={i}>
                  {contrato.Nome_Fantasia + ', CNPJ: ' + contrato.CNPJss}
                </option>
              ))}
            </Select>
          </Campo>
          <label>Anexos: </label>
          <Contagem>{this.state.headerInfo.Anexos}</Contagem>
          <label>Máquinas: </label>
          <Contagem>{this.state.headerInfo.Maquinas}</Contagem>
        </Titulo>
          <Combobox>
            <Campo>
              <Rotulo>Grupo de Venda</Rotulo>
              <TextInput
                disabled
                value={this.state.contratos[this.state.displayed].GrpVen}
              ></TextInput>
            </Campo>
            <Campo>
              <Rotulo>CNPJ</Rotulo>
              <TextInput
                disabled
                value={this.state.contratos[this.state.displayed].CNPJss}
              ></TextInput>
            </Campo>
            <Campo>
              <Rotulo>Contrato</Rotulo>
              <TextInput
                disabled
                value={this.state.contratos[this.state.displayed].ConId}
              ></TextInput>
            </Campo>
            <Campo>
              <Rotulo>Data de Inicio</Rotulo>
              <TextInput
                disabled
                value={this.converterData(
                  this.state.contratos[this.state.displayed].Dt_Inicio
                )}
              ></TextInput>
            </Campo>
            <Campo>
              <Rotulo>Mês de Reajuste</Rotulo>
              <TextInput
                disabled
                value={this.converterData(
                  this.state.contratos[this.state.displayed].ConMesBase
                )}
              ></TextInput>
            </Campo>
            <Campo>
              <Rotulo>Data de Encerramento</Rotulo>
              <TextInput
                disabled
                value={this.converterData(
                  this.state.contratos[this.state.displayed].Dt_Fim
                )}
              ></TextInput>
            </Campo>
            <Campo>
              <Rotulo>Nome Fantasia</Rotulo>
              <TextInput
                onChange={e => {
                  this.setState({
                    update: {
                      ...this.state.update,
                      Nome_Fantasia: e.target.value
                    }
                  })
                }}
                placeholder={
                  this.state.contratos[this.state.displayed].Nome_Fantasia
                }
              ></TextInput>
            </Campo>
            <Campo>
              <Rotulo>1º Contato na empresa</Rotulo>
              <TextInput
                onChange={e => {
                  this.setState({
                    update: {
                      ...this.state.update,
                      Contato_Empresa: e.target.value
                    }
                  })
                }}
                placeholder={
                  this.state.contratos[this.state.displayed].Contato_Empresa
                }
              ></TextInput>
            </Campo>
            <Campo>
              <Rotulo>Email principal</Rotulo>
              <TextInput
                onChange={e => {
                  this.setState({
                    update: { ...this.state.update, Email: e.target.value }
                  })
                }}
                placeholder={this.state.contratos[this.state.displayed].Email}
              ></TextInput>
            </Campo>
            <Campo>
              <Rotulo>Fone principal</Rotulo>
              <TextInput
                onChange={e => {
                  this.setState({
                    update: { ...this.state.update, Fone_2: e.target.value }
                  })
                }}
                placeholder={this.state.contratos[this.state.displayed].Fone_2}
              ></TextInput>
            </Campo>
            <Campo>
              <Rotulo>2º Contato na empresa</Rotulo>
              <TextInput
                onChange={e => {
                  this.setState({
                    update: {
                      ...this.state.update,
                      Contato_Empresa_2: e.target.value
                    }
                  })
                }}
                placeholder={
                  this.state.contratos[this.state.displayed].Contato_Empresa_2
                }
              ></TextInput>
            </Campo>
            <Campo>
              <Rotulo>Email secundário</Rotulo>
              <TextInput
                onChange={e => {
                  this.setState({
                    update: {
                      ...this.state.update,
                      Email_2: e.target.value
                    }
                  })
                }}
                placeholder={this.state.contratos[this.state.displayed].Email_2}
              ></TextInput>
            </Campo>
            <Campo>
              <Rotulo>Fone secundário</Rotulo>
              <TextInput
                onChange={e => {
                  this.setState({
                    update: {
                      ...this.state.update,
                      Contato2: e.target.value
                    }
                  })
                }}
                placeholder={
                  this.state.contratos[this.state.displayed].Contato2
                }
              ></TextInput>
            </Campo>
            <Campo>
              <Rotulo>Observação</Rotulo>
              <TextInput
                onChange={e => {
                  this.setState({
                    update: {
                      ...this.state.update,
                      Obs_Específica_Cliente: e.target.value
                    }
                  })
                }}
                placeholder={
                  this.state.contratos[this.state.displayed]
                    .Obs_Específica_Cliente
                }
              ></TextInput>
            </Campo>
          </Combobox>

        <Modal
          actions={[
            <Button
              onClick={() => {
                this.Update()
              }}
            >
              Confirmar
              <Icon left>check</Icon>
            </Button>,
            <Button flat modal='close' node='button' waves='green'>
              Fechar
            </Button>
          ]}
          bottomSheet={false}
          fixedFooter={false}
          header='Confirmação'
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
            <Button
              onClick={() => {
                this.Update()
              }}
            >
              Atualizar Contrato
              <Icon left>cloud_upload</Icon>
            </Button>
          }
        >
          <p>Confirmar dados e atualizar contrato?</p>
        </Modal>

        <Button
          onClick={() => {
            window.location.assign('/contratos/novo')
          }}
        >
          Adicionar Contrato
          <Icon left>add</Icon>
        </Button>
      </Panel>
    )
  }
}

export default Contratos
