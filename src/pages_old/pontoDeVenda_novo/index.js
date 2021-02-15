import React, { Component } from 'react'
import { api } from '../../services/api'

import { Panel, Campo, Rotulo, Titulo } from '../../components/commom_in'
import { TextInput, Select, Button, Icon, Modal } from 'react-materialize'
import { Toast, ToastyContainer } from '../../components/toasty'
import Loading from '../../components/loading_screen'
export default class PDV_novo extends Component {
  state = {
    anexos: [],
    depositos: [],
    maquinas: [],
    configs: [],
    newPDV: {
      PdvStatus: 'I',
      PdvDataAlteracao: new Date().toISOString()
    },
    clienteSet: false,
    loaded: false
  }

  async componentDidMount() {
    try {
      const response = await api.get('/annex', {
        params: {
          token: localStorage.getItem('token')
        }
      })

      const deps = await api.get('/deposit', {
        params: {
          token: localStorage.getItem('token')
        }
      })

      const equip = await api.get('/seelingpoint/new', {
        params: {
          token: localStorage.getItem('token')
        }
      })

      this.setState({
        anexos: response.data,
        depositos: deps.data,
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

    if (this.state.newPDV.DepId === null || this.state.newPDV.DepId === ''){
      Toast('Selecione um depósito', 'error')
      return
    }

    if (
      this.state.newPDV.EquiCod !== '' && 
      this.state.newPDV.CfgId === '' || this.state.newPDV.CfgId === undefined || this.state.newPDV.CfgId === null) {
      Toast('Selecione uma configuração para a máquina', 'error')
      return
    }

    try {
      await api.post('/seelingpoint/new', {
        token: localStorage.getItem('token'),
        PDV: this.state.newPDV
      })
      Toast('Ponto de Venda criado com sucesso', 'success')
      setTimeout(() => {
        window.location.assign('/pontosdevenda')
      }, 5000)
    } catch (err) {
      Toast('Falha ao criar novo Ponto de Venda', 'error')
      setTimeout(() => {
        window.location.reload()
      }, 5000)
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
        PdvDataAlteracao: new Date().toISOString(),
        AnxDesc: this.state.anexos[client].AnxDesc
      }
    })
  }

  render() {
    return (
      !this.state.loaded ? <Loading /> : 
        <Panel style={{ alignItems: 'center' }}>
          <ToastyContainer />

          <Titulo style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label>Cadastrar Ponto de Venda</label>
            <Button
              onClick={() => {
                window.location.assign('/pontosdevenda')
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
          </Titulo>

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

          <Modal
            actions={[
              <Button flat modal='close' node='button' waves='green'>
                Fechar
              </Button>
            ]}
            fixedFooter
            header='Escolher depósito'
            trigger={
              <Campo>
                <Rotulo>Depósito</Rotulo>
                <TextInput
                  placeholder={
                    this.state.newPDV.DepId
                      ? this.state.depositos[this.state.newPDV.DepId].DepNome
                      : 'Selecione um depósito'
                  }
                />
              </Campo>
            }
          >
            <Campo>
              <Select
                onChange={e => {
                  if (e.target.value)
                    this.setState({
                      newPDV: {
                        ...this.state.newPDV,
                        DepId: e.target.value
                      }
                    })
                }}
              >
                <option value=''></option>
                {this.state.depositos.map((deposito, i) => (
                  <option key={deposito.DepId} value={deposito.DepId}>
                    {deposito.DepNome}
                  </option>
                ))}
              </Select>
            </Campo>
          </Modal>

          <Modal
            actions={[
              <Button flat modal='close' node='button' waves='green'>
                Fechar
              </Button>
            ]}
            fixedFooter
            header='Escolher máquina'
            trigger={
              <Campo>
                <Rotulo>Máquina</Rotulo>
                <TextInput
                  placeholder={this.state.newPDV.EQUIMOD_Desc || 'Selecione uma máquina'}
                />
              </Campo>
            }
          >
            <Campo>
              <Rotulo>Máquinas ainda não atribuidas</Rotulo>
              <Select
                onChange={e => {
                  if (e.target.value !== '') {
                    this.setState({
                      newPDV: {
                        ...this.state.newPDV,
                        EquiCod: this.state.maquinas[e.target.value].EquiCod,
                        EquiMatr: this.state.maquinas[e.target.value].EquiCod,
                        IMEI: this.state.maquinas[e.target.value].IMEI,
                        EQUIMOD_Desc: this.state.maquinas[e.target.value]
                          .EquiDesc
                      }
                    })
                  } else {
                    this.setState({
                      newPDV: {
                        ...this.state.newPDV,
                        EquiCod: null,
                        EquiMatr: null,
                        IMEI: null,
                        EQUIMOD_Desc: null
                      }
                    })
                  }
                }}
              >
                <option></option>
                {this.state.maquinas.map((maquina, i) => (
                  <option key={maquina.EquiCod} value={i}>
                    {maquina.EquiDesc + ', ' + maquina.EquiCod}
                  </option>
                ))}
              </Select>
            </Campo>
          </Modal>

          <Campo>
            <Rotulo>Departamento</Rotulo>
            <TextInput
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
          {this.state.newPDV.EquiCod && (
            <Modal
              actions={[
                <Button flat modal='close' node='button' waves='green'>
                  Fechar
                </Button>
              ]}
              bottomSheet={false}
              fixedFooter={false}
              header='Configuração da máquina'
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
                <Campo>
                  <Rotulo>Configuração da maquina</Rotulo>
                  <TextInput placeholder={ this.state.newPDV.CfgId ? this.state.configs[this.state.newPDV.CfgId].CfgDesc : 'Selecione a configuração'} />
                </Campo>
              }
            >
              <Rotulo>Selecione a configuração da máquina</Rotulo>
              <Select
                onChange={e => {
                  this.setState({
                    newPDV: { ...this.state.newPDV, CfgId: e.target.value }
                  })
                }}
              >
                <option value={null}></option>
                {this.state.configs.map((config, i) => (
                  <option key={i} value={config.CfgId}>
                    {config.CfgDesc}
                  </option>
                ))}
              </Select>
            </Modal>
          )}
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
              <Button node='button'>
                CADASTRAR PONTO DE VENDA<Icon left>cloud_upload</Icon>
              </Button>
            }
          >
            <p>Confirmar dados e cadastrar Ponto de Venda?</p>
          </Modal>
        </Panel>
      
    )
  }
}
