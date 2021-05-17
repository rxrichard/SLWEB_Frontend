import React, { Component } from 'react'
import { api } from '../../services/api'

import { Panel, Campo, Rotulo, Titulo } from '../../components/commom_in'
import { TextInput, Select, Button, Icon, Modal } from 'react-materialize'
import { Toast, ToastyContainer } from '../../components/toasty'
import Loading from '../../components/loading_screen'
import { dateCheck, Bright } from '../../components/commom_functions'
import { CloseButton } from '../../components/buttons'
export default class PDV_novo extends Component {
  state = {
    anexos: [],
    depositos: [],
    maquinas: [],
    configs: [],
    newPDV: {
      PdvStatus: 'I',
      PdvDataAlteracao: dateCheck()
    },
    clienteSet: false,
    loaded: false
  }

  async componentDidMount() {
    try {
      const response = await api.get('/annex', {
        params: {
          token: sessionStorage.getItem('token')
        }
      })

      const deps = await api.get('/deposit', {
        params: {
          token: sessionStorage.getItem('token')
        }
      })

      const equip = await api.get('/seelingpoint/new', {
        params: {
          token: sessionStorage.getItem('token')
        }
      })

      this.setState({
        anexos: response.data,
        depositos: deps.data.dep,
        maquinas: equip.data.maquinas,
        configs: equip.data.configs
      })
      this.setState({ loaded: true })
    } catch (err) {
      console.log(err)
    }
  }
  async handleSubmit() {
    if (!this.state.clienteSet) {
      Toast('Selecione um anexo existente', 'error')
      return
    }

    if (this.state.newPDV.DepId === null || this.state.newPDV.DepId === '') {
      Toast('Selecione um depósito', 'error')
      return
    }

    if (
      (this.state.newPDV.EquiCod !== '' && this.state.newPDV.CfgId === '') ||
      this.state.newPDV.CfgId === undefined ||
      this.state.newPDV.CfgId === null
    ) {
      Toast('Selecione uma configuração para a máquina', 'error')
      return
    }

    try {
      await api.post('/seelingpoint/new', {
        token: sessionStorage.getItem('token'),
        PDV: this.state.newPDV
      })
      Toast('Ponto de Venda criado com sucesso', 'success')
      setTimeout(() => {
        this.props.history.push('/pontosdevenda')
      }, 3000)
    } catch (err) {
      Toast('Falha ao criar novo Ponto de Venda', 'error')
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
  }

  switchAnexo(client) {
    if (!client) {
      this.setState({ clienteSet: false })
      const inputs = document.querySelectorAll('input')
      let i
      for (i = 0; i < inputs.length; i++) {
        inputs[i].placeholder = ''
        inputs[i].value = ''
      }
      return
    }

    this.setState({ clienteSet: true })
    const inputs = document.querySelectorAll('input')
    let i
    for (i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }

    this.setState({
      newPDV: {
        ...this.state.anexos[client],
        PdvStatus: 'P',
        DepId: null,
        CfgId: null,
        PdvDataAlteracao: dateCheck(),
        AnxDesc: this.state.anexos[client].AnxDesc
      }
    })
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Panel>
        <ToastyContainer />

        <Titulo>
          <label>Cadastrar Ponto de Venda</label>
        </Titulo>

        <div className='XAlign'>
          <Campo>
            <Rotulo>Nome Fantasia</Rotulo>
            <Select
              onChange={e => {
                this.switchAnexo(e.target.value)
              }}
            >
              <option value={null}></option>
              {this.state.anexos.map((anexo, i) => (
                <option key={anexo.CNPJ} value={i}>
                  {anexo.AnxDesc}
                </option>
              ))}
            </Select>
          </Campo>
          <Campo>
            <Rotulo>CNPJ</Rotulo>
            <TextInput disabled placeholder={this.state.newPDV.CNPJss} />
          </Campo>

          <Campo>
            <Rotulo>Status</Rotulo>
            <TextInput disabled placeholder='Em ativação' />
          </Campo>

          <Campo>
            <Rotulo>Departamento</Rotulo>
            <TextInput
              placeholder='Ex: Comercial'
              onChange={e => {
                this.setState({
                  newPDV: {
                    ...this.state.newPDV,
                    PdvDepartamento: e.target.value
                  }
                })
              }}
            />
          </Campo>

          <Campo>
            <Rotulo>Observação</Rotulo>
            <TextInput
              onChange={e => {
                this.setState({
                  newPDV: { ...this.state.newPDV, PdvObs: e.target.value }
                })
              }}
            />
          </Campo>
        </div>
        <div className='XAlign'>
          <Modal
            actions={[<CloseButton />]}
            fixedFooter
            header='Escolher depósito'
            trigger={
              <Campo>
                <Rotulo>Depósito</Rotulo>
                <TextInput
                  placeholder={
                    this.state.newPDV.DepNome || 'Selecione um depósito'
                  }
                />
              </Campo>
            }
          >
            <div
              className='tableFixHead'
              style={{
                height: '90%',
                width: '100%',
                overflow: 'auto'
              }}
            >
              <table>
                <thead>
                  <tr>
                    <th>Depósitos disponiveis</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.depositos.map((deposito, i) => (
                    <tr key={deposito.DepId} className='Item'>
                      <td
                        onClick={e => {
                          this.setState({
                            newPDV: {
                              ...this.state.newPDV,
                              DepId: this.state.depositos[i].DepId,
                              DepNome: this.state.depositos[i].DepNome
                            }
                          })

                          Bright(e)
                        }}
                      >
                        {deposito.DepNome}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal>

          <Modal
            actions={[<CloseButton />]}
            fixedFooter
            header='Escolher máquina'
            trigger={
              <Campo>
                <Rotulo>Máquina</Rotulo>
                <TextInput
                  placeholder={
                    this.state.newPDV.EquiCod
                      ? `${this.state.newPDV.EQUIMOD_Desc}, Matricula: ${this.state.newPDV.EquiCod}`
                      : 'Selecione uma máquina'
                  }
                />
              </Campo>
            }
          >
            <div
              className='tableFixHead'
              style={{
                height: '90%',
                width: '100%',
                overflow: 'auto'
              }}
            >
              <table>
                <thead>
                  <tr>
                    <th>Máquinas disponiveis</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.maquinas.map((maquina, i) => (
                    <tr className='Item'>
                      <td
                        key={maquina.EquiCod}
                        onClick={e => {
                          this.setState({
                            newPDV: {
                              ...this.state.newPDV,
                              EquiCod: this.state.maquinas[i].EquiCod,
                              EquiMatr: this.state.maquinas[i].EquiCod,
                              IMEI: this.state.maquinas[i].IMEI,
                              EQUIMOD_Desc: this.state.maquinas[i].EquiDesc
                            }
                          })
                          Bright(e)
                        }}
                      >
                        {maquina.EquiDesc + ', Matricula: ' + maquina.EquiCod}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal>
          {this.state.newPDV.EquiCod && (
            <Modal
              actions={[<CloseButton />]}
              bottomSheet={false}
              fixedFooter={false}
              header='Configuração da máquina'
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
                <Campo>
                  <Rotulo>Configuração da maquina</Rotulo>
                  <TextInput
                    placeholder={
                      this.state.newPDV.CfgId
                        ? this.state.configs[this.state.newPDV.CfgId - 1]
                            .CfgDesc
                        : 'Selecione a configuração'
                    }
                  />
                </Campo>
              }
            >
              <div
                className='tableFixHead'
                style={{
                  height: '90%',
                  width: '100%',
                  overflow: 'auto'
                }}
              >
                <table>
                  <thead>
                    <tr>
                      <th>Configurações disponiveis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.configs.map(config => (
                      <tr className='Item'>
                        <td
                          key={config.CfgId}
                          onClick={e => {
                            this.setState({
                              newPDV: {
                                ...this.state.newPDV,
                                CfgId: config.CfgId
                              }
                            })

                            Bright(e)
                          }}
                        >
                          {config.CfgDesc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Modal>
          )}
        </div>

        <div className='XAlign'>
          <Button
            onClick={() => {
              this.props.history.push('/pontosdevenda')
            }}
            node='button'
            style={{
              marginRight: '5px'
            }}
            waves='light'
          >
            Voltar
            <Icon left>arrow_back</Icon>
          </Button>
          <Modal
            actions={[
              <Button
                onClick={() => {
                  this.handleSubmit()
                }}
              >
                Confirmar
                <Icon left>check</Icon>
              </Button>,
              <CloseButton />
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header='Confirmação'
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
              <Button node='button'>
                CADASTRAR PONTO DE VENDA<Icon left>cloud_upload</Icon>
              </Button>
            }
          >
            <p>Confirmar dados e cadastrar Ponto de Venda?</p>
          </Modal>
        </div>
      </Panel>
    )
  }
}
