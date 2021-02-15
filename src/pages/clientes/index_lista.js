import React from 'react'
import { api } from '../../services/api'
import { TextInput, Select, Button, Icon, Modal } from 'react-materialize'

import Loading from '../../components/loading_screen'
import { Toast, ToastyContainer } from '../../components/toasty'
import { Combobox, Panel, Campo, Rotulo } from '../../components/commom_in'
import { SafeButton, CancelButton, CloseButton } from '../../components/buttons'
import { convertData } from '../../components/commom_functions'

export default class Cliente extends React.Component {
  state = {
    usuarios: [],
    headerInfo: {},
    displayed: 0,
    loaded: false,
    lock: true,
    update: {},
    updated: false
  }

  async componentDidMount() {
    try {
      const token = sessionStorage.getItem('token')
      const clientes = await api.post('/client/', {
        token: token
      })

      this.setState({ usuarios: clientes.data })
      this.setState({ loaded: true })
    } catch (err) {
      this.props.history.push('/')
    }
  }

  switchCliente(num) {
    this.setState({ displayed: num })
    this.setState({ update: this.state.usuarios[num] })

    const inputs = document.querySelectorAll('input')
    let i
    for (i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }
  }

  async handleUpdate() {
    try {
      const token = sessionStorage.getItem('token')
      const cliente = this.state.update

      await api.put('/client/update', {
        token,
        cliente
      })
      Toast('Dados do cliente atualizados com sucesso', 'success')
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (err) {
      Toast('Falha ao atualizar dados do cliente', 'error')
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
  }

  async handleDelete() {
    try {
      const response = await api.delete('/client/delete', {
        params: {
          token: sessionStorage.getItem('token'),
          clienteCNPJ: this.state.usuarios[this.state.displayed].CNPJ
        }
      })

      if (response.data === 200) {
        Toast('Cliente excluído com sucesso', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } else if (response.data === 409) {
        Toast('Cliente com movimentação, Anexo, ou Ponto de Venda')
      } else {
        throw Error
      }
    } catch (err) {
      Toast('.Não foi possivel excluir o cliente', 'error')
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
                <th>Contato</th>
                <th>Telefone</th>
              </tr>
            </thead>
            <tbody>
              {this.state.usuarios.map((cliente, i) => (
                <tr
                  onClick={() => {
                    this.switchCliente(i)
                  }}
                  className='modal-trigger'
                  href='#Dados'
                >
                  <td>{i + 1}</td>
                  <td>{cliente.Nome_Fantasia}</td>
                  <td>{cliente.Email}</td>
                  <td>{cliente.Contato_Empresa}</td>
                  <td>{cliente.Fone}</td>
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
                  alert('Vai para contratos')
                }}
              >
                <Icon left>description</Icon>
                Contrato do cliente
              </Button>,

              <CancelButton
                disabled={!this.state.updated}
                tooltipOptions={{
                  position: 'top'
                }}
                tooltip='Não é possivel excluir cliente com movimentação de produtos, Anexos ou Pontos de Venda.'
                onClick={e => {
                  this.handleDelete()
                  e.target.disabled = true
                }}
              >
                Excluir cliente
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
                  backgroundColor: this.state.lock ? 'green' : '#26a69a'
                }}
                onClick={() => {
                  this.setState({
                    lock: !this.state.lock,
                    updated: !this.state.updated
                  })
                }}
              >
                <Icon left>{this.state.lock ? 'edit' : 'close'}</Icon>
                {this.state.lock ? 'Habilitar edição' : 'Cancelar edição'}
              </Button>,
              <CloseButton />
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header='Dados do Cliente'
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
            <Combobox className='double'>
              <Campo>
                <Rotulo>Razão Social: </Rotulo>
                <TextInput
                  disabled={true}
                  placeholder={this.state.update.Razão_Social}
                  onChange={e =>
                    this.setState({
                      update: {
                        ...this.state.update,
                        Razão_Social: e.target.value
                      }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Nome Fantasia: </Rotulo>
                <TextInput
                  disabled={this.state.lock}
                  placeholder={this.state.update.Nome_Fantasia || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: {
                        ...this.state.update,
                        Nome_Fantasia: e.target.value
                      }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>CNPJ / CPF: </Rotulo>
                <TextInput
                  disabled
                  placeholder={this.state.update.CNPJss || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, CNPJ: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>IE: </Rotulo>
                <TextInput
                  disabled
                  placeholder={this.state.update.IE || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, IE: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Pessoa: </Rotulo>
                <Select
                  disabled
                  onChange={e => {
                    this.setState({
                      update: {
                        ...this.state.update,
                        TPessoa: e.target.value
                      }
                    })
                  }}
                >
                  {this.state.update.TPessoa === 'J' ? (
                    <>
                      <option defaultValue value='J'>
                        Jurídica
                      </option>
                      <option value='F'>Física</option>
                    </>
                  ) : (
                    <>
                      <option defaultValue value='F'>
                        Física
                      </option>
                      <option value='J'>Jurídica</option>
                    </>
                  )}
                </Select>
              </Campo>
            </Combobox>

            <Combobox>
              <Campo>
                <Rotulo>Logradouro: </Rotulo>
                <TextInput
                  disabled={this.state.lock}
                  placeholder={this.state.update.Logradouro || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: {
                        ...this.state.update,
                        Logradouro: e.target.value
                      }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Número: </Rotulo>
                <TextInput
                  disabled={this.state.lock}
                  placeholder={this.state.update.Número || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, Número: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Complemento: </Rotulo>
                <TextInput
                  disabled={this.state.lock}
                  placeholder={this.state.update.Complemento || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: {
                        ...this.state.update,
                        Complemento: e.target.value
                      }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>CEP: </Rotulo>
                <TextInput
                  disabled={this.state.lock}
                  placeholder={this.state.update.CEP || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, CEP: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Bairro: </Rotulo>
                <TextInput
                  disabled={this.state.lock}
                  placeholder={this.state.update.Bairro || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, Bairro: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Município: </Rotulo>
                <TextInput
                  disabled={this.state.lock}
                  placeholder={this.state.update.Município || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: {
                        ...this.state.update,
                        Município: e.target.value
                      }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>UF: </Rotulo>
                <TextInput
                  disabled={this.state.lock}
                  placeholder={this.state.update.UF || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, UF: e.target.value }
                    })
                  }
                />
              </Campo>
            </Combobox>
            <Combobox>
              <Campo>
                <Rotulo>Contato: </Rotulo>
                <TextInput
                  disabled={this.state.lock}
                  placeholder={this.state.update.Contato_Empresa || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: {
                        ...this.state.update,
                        Contato_Empresa: e.target.value
                      }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Email: </Rotulo>
                <TextInput
                  disabled={this.state.lock}
                  placeholder={this.state.update.Email || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, Email: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>DDD: </Rotulo>
                <TextInput
                  disabled={this.state.lock}
                  placeholder={this.state.update.DDD || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, DDD: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Fone: </Rotulo>
                <TextInput
                  disabled={this.state.lock}
                  placeholder={this.state.update.Fone || 'NA'}
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, Fone: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>DtSolicita: </Rotulo>
                <TextInput
                  value={convertData(this.state.update.DtSolicita)}
                  readOnly
                />
              </Campo>
              <Campo>
                <Rotulo>DtCadastro: </Rotulo>
                <TextInput
                  value={convertData(this.state.update.DtCadastro)}
                  readOnly
                />
              </Campo>
            </Combobox>
          </Modal>
        </div>
        <Button
          node='button'
          style={{
            marginLeft: '5px'
          }}
          waves='light'
          onClick={() => {
            this.props.history.push('/clientes/novo')
          }}
        >
          Adicionar Cliente
          <Icon left>person_add</Icon>
        </Button>
      </Panel>
    )
  }
}
