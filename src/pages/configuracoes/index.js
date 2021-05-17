import React from 'react'
import { api } from '../../services/api'
import Loading from '../../components/loading_screen'

import { valueCheck } from '../../components/commom_functions'
import { Panel, Rotulo, Campo } from '../../components/commom_in'
import { Table } from '../../components/table'
import { Toast, ToastyContainer } from '../../components/toasty'
import { FAILED_REQUEST } from '../../components/messages'
import { convertData, Bright } from '../../components/commom_functions'
import { Card, Icon, Modal, Button, TextInput } from 'react-materialize'
import {
  CancelButton,
  ConfirmButton,
  CloseButton,
  SafeButton
} from '../../components/buttons'
export default class Configuracoes extends React.Component {
  state = {
    configs: [], //Cad de todas as configurações
    selectedConfig: {
      Nome: 'Selecione...',
      Id: null,
      Status: 'A'
    },
    Det: [],
    Cad: [],
    ProdList: [], //Todos os produtos
    RecipeList: [], //Todas as receitas
    newConfig: [], //Objeto para guardar nova configuração
    loaded: false
  }

  async componentDidMount() {
    try {
      const response = await api.get('/config', {
        params: {
          token: sessionStorage.getItem('token')
        }
      })

      if (response.data === 400) throw Error

      this.setState({
        configs: response.data.configuracoes,
        ProdList: response.data.ProdList,
        RecipeList: response.data.RecipeList,
        newConfig: init,
        loaded: true
      })
    } catch (err) {
      Toast(FAILED_REQUEST, 'error')
    }
  }

  async handleUpdateConfig() {
    try {
      const response = await api.put('/config', {
        token: sessionStorage.getItem('token'),
        configDet: editConfig,
        configCad: this.state.Cad
      })

      if (response.data === 400) throw Error

      Toast('Configuração atualizada com sucesso', 'success')
      setTimeout(() => window.location.reload(), 3000)
    } catch (err) {
      Toast('Falha ao salvar alterações', 'error')
    }
  }

  async handleDeleteConfig() {
    if (this.state.selectedConfig.Id === null) {
      Toast('Selecione uma configuração para inativar')
      return
    }

    if (this.state.selectedConfig.Status === 'I') {
      Toast('A configuração já foi inativada')
      return
    }

    try {
      const response = await api.delete('/config', {
        params: {
          token: sessionStorage.getItem('token'),
          CfgId: this.state.selectedConfig.Id
        }
      })

      if (response.data === 400) throw Error

      Toast('Configuração inativada com sucesso', 'success')
      setTimeout(() => window.location.reload(), 3000)
    } catch (err) {
      Toast('Falha ao inativar configuração', 'error')
    }
  }

  async handleCreateConfig() {
    try {
      const response = await api.post('/config', {
        token: sessionStorage.getItem('token'),
        configDet: this.state.Det,
        configCad: this.state.Cad
      })

      if (response.data === 400) throw Error

      Toast('Configuração criada com sucesso', 'success')
      setTimeout(() => window.location.reload(), 3000)
    } catch (err) {
      Toast('Falha ao criar configuração', 'error')
    }
  }

  async SeeCfgDet(ID) {
    if (ID === null) {
      Toast('Selecione uma configuração para editar')
      return
    }
    try {
      const response = await api.get('/config/details', {
        params: {
          token: sessionStorage.getItem('token'),
          ConfigID: ID
        }
      })

      if (response.data === 400) throw Error

      this.setState({
        Det: response.data
      })

      editConfig = response.data
    } catch (err) {
      Toast('Falha ao recuperar detalhes da configuração', 'error')
    }
  }

  handleClearAll() {
    init = [
      {
        PvpSel: null, //Numero da seleção
        TveId: 0, //Tipo de venda, especificado no array "opcoes"
        ProdId: 1020,
        RecId: 19,
        CfdObs: null
      }
    ]
    this.setState({ newConfig: init })

    const selects = document.querySelectorAll('select')

    const inputs = document.querySelectorAll('input')

    for (let i = 0; i < selects.length; i++) {
      selects[i].selectedIndex = 0
      inputs[i].value = ''
    }
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Panel>
        <ToastyContainer />
        <div
          className='XAlign'
          style={{ alignItems: 'flex-start', justifyContent: 'space-evenly' }}
        >
          {/* Tabela de todas as configurações */}
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Configuração</th>
                <th>Status</th>
                <th>Criada em</th>
                <th>Inativada em</th>
                <th>Observação</th>
              </tr>
            </thead>
            <tbody>
              {this.state.configs.map((config, i) => (
                <tr
                  className='Item'
                  onClick={e => {
                    this.setState({
                      selectedConfig: {
                        Nome: config.CfgDesc,
                        Id: config.CfgId,
                        Status: config.CfgStatus
                      },
                      Cad: config
                    })

                    Bright(e)
                  }}
                >
                  <td>{config.CfgId}</td>
                  <td>{config.CfgDesc}</td>
                  <td>{config.CfgStatus}</td>
                  <td>{convertData(config.CfgDtInic)}</td>
                  <td>{convertData(config.CfgDtCancel)}</td>
                  <td>{config.CfgObs}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Card de ações */}
          <Card
            actions={[]}
            className='blue-grey darken-1'
            textClassName='white-text'
            title={`Configuração: ${this.state.selectedConfig.Nome}`}
          >
            <div className='YAlign'>
              <Button
                href='#modalAdd'
                className='modal-trigger'
                onClick={() => {
                  this.setState({ Det: init })
                }}
              >
                Adicionar configuração
                <Icon left>add</Icon>
              </Button>

              <CancelButton
                disabled={this.state.selectedConfig.Id === null ? true : false}
                onClick={() => this.handleDeleteConfig()}
              >
                Inativar configuração
              </CancelButton>
              <Button
                disabled={this.state.selectedConfig.Id === null ? true : false}
                className='modal-trigger'
                href='#produtos'
                onClick={() => this.SeeCfgDet(this.state.selectedConfig.Id)}
              >
                Editar configurações
              </Button>
            </div>
          </Card>
        </div>

        {/* Editar configurações */}
        <Modal
          actions={[
            <ConfirmButton
              disabled={false}
              onClick={() => {
                this.handleUpdateConfig()
              }}
            >
              Salvar alterações
            </ConfirmButton>,
            <CloseButton />
          ]}
          bottomSheet={false}
          fixedFooter={false}
          header='Editar configuração'
          id='produtos'
          options={{
            dismissible: false,
            endingTop: '10%',
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: () => {
              this.setState({
                Det: [],
                Cad: [],
                selectedConfig: {
                  Nome: 'Selecione...',
                  Id: null,
                  Status: 'A'
                }
              })
              this.handleClearAll()
            },
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: '4%'
          }}
        >
          <div className='XAlign' style={{ justifyContent: 'flex-start' }}>
            <Campo>
              <Rotulo>Nome:</Rotulo>
              <TextInput
                onChange={e =>
                  this.setState({
                    Cad: {
                      ...this.state.Cad,
                      CfgDesc: e.target.value
                    }
                  })
                }
                placeholder={this.state.Cad.CfgDesc}
              />
            </Campo>
            <Campo>
              <Rotulo>Observações:</Rotulo>
              <TextInput
                onChange={e =>
                  this.setState({
                    Cad: {
                      ...this.state.Cad,
                      CfgObs: e.target.value
                    }
                  })
                }
                placeholder={this.state.Cad.CfgObs}
              />
            </Campo>
          </div>
          <Table height='55'>
            <thead>
              <tr>
                <th>Seleção</th>
                <th>Venda</th>
                <th>Produto</th>
                <th>Receita</th>
                <th>Observação</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Det.map((escolha, i) => (
                <tr>
                  <td>{escolha.PvpSel}</td>

                  <td>
                    <select
                      className='DefaultSelect'
                      onChange={e => {
                        editConfig[i].TveId = e.target.value
                      }}
                      defaultValue={escolha.TveId}
                    >
                      {opcoes.map(opcao => (
                        <option value={opcao.id}>{opcao.opc}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select
                      className='DefaultSelect'
                      onChange={e => {
                        editConfig[i].ProdId = e.target.value
                      }}
                      defaultValue={escolha.ProdId}
                    >
                      {this.state.ProdList.map((Produto, j) => (
                        <option value={Produto.ProdId}>
                          {Produto.Produto}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select
                      className='DefaultSelect'
                      onChange={e => {
                        editConfig[i].RecId = e.target.value
                      }}
                      defaultValue={escolha.RecId}
                    >
                      <option>Selecione...</option>
                      {this.state.RecipeList.map(Receita => (
                        <option value={Receita.RecId}>{Receita.RecDesc}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      placeholder={escolha.CfdObs || 'Observações'}
                      onChange={e => {
                        editConfig[i].CfdObs = e.target.value
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal>

        {/* Nova configuração */}
        <Modal
          actions={[
            <ConfirmButton
              disabled={false}
              onClick={() => this.handleCreateConfig()}
            >
              Salvar configuração
            </ConfirmButton>,
            <SafeButton
              onClick={() => {
                this.handleClearAll()
              }}
            >
              Limpar
              <Icon left>clear_all</Icon>
            </SafeButton>,
            <CloseButton />
          ]}
          bottomSheet={false}
          fixedFooter={false}
          header='Adicionar configuração'
          id='modalAdd'
          options={{
            dismissible: false,
            endingTop: '10%',
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: () => {
              this.setState({
                Cad: [],
                Det: [],
                selectedConfig: {
                  Nome: 'Selecione...',
                  Id: null,
                  Status: 'A'
                }
              })
              this.handleClearAll()
            },
            onOpenEnd: null,
            onOpenStart: () => {
              this.setState({
                Cad: []
              })
            },
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: '4%'
          }}
        >
          <div className='XAlign' style={{ justifyContent: 'flex-start' }}>
            <Campo>
              <Rotulo>Nome:</Rotulo>
              <TextInput
                onChange={e =>
                  this.setState({
                    Cad: {
                      ...this.state.Cad,
                      CfgDesc: e.target.value
                    }
                  })
                }
                placeholder={this.state.Cad.CfgDesc}
              />
            </Campo>
            <Campo>
              <Rotulo>Observações:</Rotulo>
              <TextInput
                onChange={e =>
                  this.setState({
                    Cad: {
                      ...this.state.Cad,
                      CfgObs: e.target.value
                    }
                  })
                }
                placeholder={this.state.Cad.CfgObs}
              />
            </Campo>
          </div>
          <Table height='55'>
            <thead>
              <tr>
                <th>Seleção</th>
                <th>Venda</th>
                <th>Produto</th>
                <th>Receita</th>
                <th>Observação</th>
              </tr>
            </thead>
            <tbody>
              {this.state.newConfig.map((det, i) => (
                <tr>
                  <td>
                    <input
                      onChange={e => {
                        e.target.value = valueCheck(e.target.value, e)
                        init[i].PvpSel = e.target.value
                        if (
                          (init[i + 1] === null ||
                            typeof init[i + 1] == 'undefined') &&
                          init.length < 8 &&
                          e.target.value !== '0'
                        ) {
                          init.push({ ...init[i], PvpSel: null })
                        }
                        this.setState({ newConfig: init })
                      }}
                    />
                  </td>
                  <td>
                    <select
                      className='DefaultSelect'
                      onChange={e => {
                        init[i].TveId = e.target.value
                      }}
                    >
                      {opcoes.map(opcao => (
                        <option value={opcao.id}>{opcao.opc}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className='DefaultSelect'
                      onChange={e => {
                        init[i].Produto = this.state.ProdList[
                          e.target.value
                        ].Produto
                        init[i].ProdId = this.state.ProdList[
                          e.target.value
                        ].ProdId
                      }}
                    >
                      {this.state.ProdList.map((Produto, j) => (
                        <option value={j}>{Produto.Produto}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className='DefaultSelect'
                      onChange={e => {
                        init[i].RecDesc = this.state.RecipeList[
                          e.target.value
                        ].RecDesc
                        init[i].RecId = this.state.RecipeList[
                          e.target.value
                        ].RecId
                      }}
                    >
                      {this.state.RecipeList.map((Receita, j) => (
                        <option value={j}>{Receita.RecDesc}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      onChange={e => {
                        init[i].CfdObs = e.target.value
                      }}
                      placeholder='Observações'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal>
      </Panel>
    )
  }
}

//Tipos de venda
const opcoes = [
  { id: 0, opc: 'Desconfigurado' },
  { id: 1, opc: 'Livre' },
  { id: 2, opc: 'Pago' },
  { id: 3, opc: 'Cartão' },
  { id: 4, opc: 'Moeda / Cartão' },
  { id: 5, opc: 'Compartilhado' },
  { id: 6, opc: 'Cartão Visa' },
  { id: 7, opc: 'Chave' },
  { id: 9, opc: 'Visa Vale' },
  { id: 10, opc: 'Moeda / Visa Vale' },
  { id: 11, opc: 'Moeda / Cartão Remessa' },
  { id: 12, opc: 'Moeda/Cartão Venda' }
]

//Modelo de dados que precisam ser preenchidos em uma nova configuração (CfgDet)
let init = [
  {
    PvpSel: null, //Numero da seleção
    TveId: 0, //Tipo de venda, especificado no array "opcoes"
    ProdId: 1020,
    RecId: 19,
    CfdObs: null
  }
]

//Um array só pra copiar o estado e ser mais facil de manipular os dados
let editConfig = []
