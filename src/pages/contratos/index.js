import React from 'react'
import { api } from '../../services/api'

import { Combobox, Campo, Rotulo, Panel } from '../../components/commom_in'
import { Icon, TextInput, Button, Modal } from 'react-materialize'
import Loading from '../../components/loading_screen'
import { Toast, ToastyContainer } from '../../components/toasty'
import { SafeButton, CancelButton, CloseButton } from '../../components/buttons'
import { convertData } from '../../components/commom_functions'

class Contratos extends React.Component {
  state = {
    contratos: [],
    update: {},
    headerInfo: {},
    displayed: 0,
    updated: false,
    lock: true,
    loaded: false
  }

  async componentDidMount() {
    try {
      const response = await api.get('/contract', {
        params: {
          token: sessionStorage.getItem('token')
        }
      })

      this.setState({ contratos: response.data })
      this.setState({ loaded: true })
      this.switchCliente(0)
    } catch (err) {
      Toast('Erro ao estabelecer conexão com o servidor.', 'error')
      this.props.history.push('/')
    }
  }

  async switchCliente(num) {
    this.setState({ displayed: num })
    this.setState({ update: this.state.contratos[num] })

    const inputs = document.querySelectorAll('input')
    let i
    for (i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }
  }

  async handleUpdate() {
    try {
      const response = await api.put('/contract', {
        usuario: this.state.update,
        token: sessionStorage.getItem('token')
      })

      if (response.data === 200) {
        Toast('Dados do contrato atualizados com sucesso', 'success')

        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } else {
        throw Error
      }
    } catch (err) {
      Toast('Falha ao atualizar contrato', 'error')
    }
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Panel>
        <ToastyContainer />

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
                <th></th>
                <th>Nome Fantasia</th>
                <th>Email</th>
                <th>CNPJ</th>
                <th>Contato</th>
                <th>Telefone</th>
              </tr>
            </thead>
            <tbody>
              {this.state.contratos.map((contrato, i) => (
                <tr
                  key={contrato.CNPJss}
                  onClick={() => {
                    this.switchCliente(i)
                  }}
                  className='modal-trigger'
                  href='#Dados'
                >
                  <td>{i + 1}</td>
                  <td>{contrato.Nome_Fantasia}</td>
                  <td>{contrato.Email}</td>
                  <td>{contrato.CNPJss}</td>
                  <td>{contrato.Contato_Empresa}</td>
                  <td>{contrato.Fone_2}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal
            actions={[
              <Button
                style={{
                  marginRight: '5px'
                }}
                onClick={() => {
                  alert('Vai para anexos')
                }}
              >
                <Icon left>description</Icon>
                Anexos do cliente
              </Button>,

              <CancelButton
                disabled={!this.state.updated}
                onClick={e => {
                  alert('Cancela contrato')
                  e.target.disabled = true
                }}
              >
                Excluir contrato
              </CancelButton>,

              <SafeButton
                disabled={!this.state.updated}
                style={{
                  marginRight: '5px',
                  backgroundColor: 'blue'
                }}
                onClick={e => {
                  this.handleUpdate()
                  e.target.disabled = true
                }}
              >
                <Icon left>cloud_upload</Icon>
                Atualizar
              </SafeButton>,

              <Button
                style={{
                  marginRight: '5px',
                  backgroundColor: this.state.lock ? 'green' : 'yellow'
                }}
                onClick={() => {
                  this.setState({
                    lock: !this.state.lock,
                    updated: !this.state.updated
                  })
                }}
              >
                <Icon left>edit</Icon>
                Habilitar edição
              </Button>,
              <CloseButton />
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header='Dados do Contrato'
            id='Dados'
            options={{
              dismissible: true,
              endingTop: '10%',
              inDuration: 250,
              onCloseEnd: null,
              onCloseStart: () => this.setState({ lock: true, updated: false }),
              onOpenEnd: null,
              onOpenStart: null,
              opacity: 0.5,
              outDuration: 250,
              preventScrolling: true,
              startingTop: '4%'
            }}
          >
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
                  value={convertData(
                    this.state.contratos[this.state.displayed].Dt_Inicio
                  )}
                ></TextInput>
              </Campo>
              <Campo>
                <Rotulo>Mês de Reajuste</Rotulo>
                <TextInput
                  disabled
                  value={convertData(
                    this.state.contratos[this.state.displayed].ConMesBase
                  )}
                ></TextInput>
              </Campo>
              <Campo>
                <Rotulo>Data de Encerramento</Rotulo>
                <TextInput
                  disabled
                  value={convertData(
                    this.state.contratos[this.state.displayed].Dt_Fim
                  )}
                ></TextInput>
              </Campo>
              <Campo>
                <Rotulo>Nome Fantasia</Rotulo>
                <TextInput
                  disabled={this.state.lock}
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
                  disabled={this.state.lock}
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
                  disabled={this.state.lock}
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
                  disabled={this.state.lock}
                  onChange={e => {
                    this.setState({
                      update: { ...this.state.update, Fone_2: e.target.value }
                    })
                  }}
                  placeholder={
                    this.state.contratos[this.state.displayed].Fone_2
                  }
                ></TextInput>
              </Campo>
              <Campo>
                <Rotulo>2º Contato na empresa</Rotulo>
                <TextInput
                  disabled={this.state.lock}
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
                  disabled={this.state.lock}
                  onChange={e => {
                    this.setState({
                      update: {
                        ...this.state.update,
                        Email_2: e.target.value
                      }
                    })
                  }}
                  placeholder={
                    this.state.contratos[this.state.displayed].Email_2
                  }
                ></TextInput>
              </Campo>
              <Campo>
                <Rotulo>Fone secundário</Rotulo>
                <TextInput
                  disabled={this.state.lock}
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
                  disabled={this.state.lock}
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
          </Modal>
        </div>

        <Button
          onClick={() => {
            this.props.history.push('/contratos/novo')
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
