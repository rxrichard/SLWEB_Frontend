import React, { Component } from 'react'
import Loading from '../../components/loading_screen'
import { api } from '../../services/api'

import {
  Panel,
  Titulo,
  Campo,
  Rotulo,
  Combobox
} from '../../components/commom_in'
import {
  Select,
  TextInput,
  Button,
  Icon,
  Tabs,
  Tab,
  Modal
} from 'react-materialize'
import { Toast, ToastyContainer } from '../../components/toasty'
import { dateCheck } from '../../components/commom_functions'
import { CloseButton } from '../../components/buttons'

export default class PDV extends Component {
  state = {
    PDV: [],
    Configs: [],
    Receitas: [],
    Depositos: [],
    update: {},
    displayed: 0,
    loaded: false
  }

  async componentDidMount() {
    try {
      const points = await api.get('seelingpoint', {
        params: {
          token: sessionStorage.getItem('token')
        }
      })

      const recipes = await api.get('recipes', {
        params: {
          token: sessionStorage.getItem('token')
        }
      })

      const deps = await api.get('deposit', {
        params: {
          token: sessionStorage.getItem('token')
        }
      })
      this.setState({
        PDV: points.data.pdvs,
        Configs: points.data.configs,
        Receitas: recipes.data,
        Depositos: deps.data.dep
      })
      this.switchPDV(0)
      this.setState({ loaded: true })
    } catch (err) {
      this.props.history.push('/404')
    }
  }

  switchPDV(num) {
    const inputs = document.querySelectorAll('input')
    let i
    for (i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }
    this.setState({ displayed: num })

    this.setState({
      update: {
        ...this.state.PDV[num],
        PdvObs: 'Ponto de venda alterado pela web',
        PdvDataAlteracao: dateCheck()
      }
    })
  }

  async handleUpdate() {
    try {
      await api.put('seelingpoint', {
        token: sessionStorage.getItem('token'),
        PDV: this.state.update
      })
      Toast('Ponto de Venda atualizado com sucesso', 'success')
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (err) {
      Toast('Falha ao atualizar o Ponto de Vendas', 'error')
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Panel>
        <ToastyContainer />
        <Titulo>
          <Campo style={{ border: '1px dashed #000', margin: '10px' }}>
            <Rotulo>Ponto de venda: </Rotulo>
            <Select
              icon={<Icon center>people_outline</Icon>}
              onChange={e => {
                this.switchPDV(e.target.value)
              }}
            >
              {this.state.PDV.map((pdv, i) => (
                <option value={i} key={pdv.AnxId}>
                  {pdv.AnxDesc +
                    ', CNPJ: ' +
                    pdv.CNPJ +
                    ' - Ponto de Venda número: ' +
                    pdv.PdvId}
                </option>
              ))}
            </Select>
          </Campo>
        </Titulo>
        <Tabs className='tab-demo z-depth-1'>
          <Tab
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false
            }}
            title='Cadastro'
          >
            <Combobox>
              <Campo>
                <Rotulo>Atribuido à</Rotulo>
                <TextInput
                  disabled
                  placeholder={this.state.PDV[this.state.displayed].AnxDesc}
                />
              </Campo>
              <Campo>
                <Rotulo>CNPJ</Rotulo>
                <TextInput
                  disabled
                  placeholder={this.state.PDV[this.state.displayed].CNPJ}
                />
              </Campo>
              <Campo>
                <Rotulo>Status</Rotulo>
                <Select
                  onChange={e => {
                    this.setState({
                      update: {
                        ...this.state.update,
                        PdvStatus: e.target.value
                      }
                    })
                  }}
                  value={this.state.update.PdvStatus}
                >
                  <option disabled hidden value={null}>
                    Status PDV
                  </option>
                  <option value='A'>Ativo</option>
                  <option value='I'>Inativo</option>
                </Select>
              </Campo>
              <Campo>
                <Rotulo>Número do PDV.</Rotulo>
                <TextInput
                  disabled
                  placeholder={this.state.PDV[this.state.displayed].PdvId}
                />
              </Campo>

              <Modal
                actions={[
                  <CloseButton />
                ]}
                fixedFooter
                header='Escolher depósito'
                trigger={
                  <Campo>
                    <Rotulo>Depósito</Rotulo>
                    <TextInput
                      placeholder={
                        this.state.Depositos[this.state.update.DepId].DepNome
                      }
                    />
                  </Campo>
                }
              >
                <Campo>
                  <Select
                    onChange={e => {
                      this.setState({
                        update: {
                          ...this.state.update,
                          DepId: e.target.value
                        }
                      })
                    }}
                    value={this.state.update.DepId}
                  >
                    <option disabled hidden value={null}>
                      Selecione Depósito
                    </option>
                    {this.state.Depositos.map(deposito => (
                      <option key={deposito.DepId} value={deposito.DepId}>
                        {deposito.DepNome}
                      </option>
                    ))}
                  </Select>
                </Campo>
              </Modal>

              <Campo>
                <Rotulo>Máquina</Rotulo>
                <TextInput
                  disabled
                  placeholder={
                    this.state.PDV[this.state.displayed].EQUIPMOD_Desc
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Código do equipamento</Rotulo>
                <TextInput
                  disabled
                  placeholder={this.state.PDV[this.state.displayed].EquiCod}
                />
              </Campo>
              <Campo>
                <Rotulo>IMEI</Rotulo>
                <TextInput
                  disabled
                  placeholder={this.state.PDV[this.state.displayed].IMEI}
                />
              </Campo>
              <Campo>
                <Rotulo>Departamento</Rotulo>
                <TextInput
                  onChange={e => {
                    this.setState({
                      update: {
                        ...this.state.update,
                        PdvDepartamento: e.target.value
                      }
                    })
                  }}
                  placeholder={
                    this.state.PDV[this.state.displayed].PdvDepartamento ||
                    'Ex.: Comercial'
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Observação</Rotulo>
                <TextInput
                  onChange={e => {
                    this.setState({
                      update: { ...this.state.update, PdvObs: e.target.value }
                    })
                  }}
                  placeholder={this.state.PDV[this.state.displayed].PdvObs}
                />
              </Campo>
            </Combobox>
          </Tab>
          <Tab
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false
            }}
            title='Localização'
          >
            <>
              <Combobox>
                <Campo>
                  <Rotulo>Logradouro</Rotulo>
                  <TextInput
                    onChange={e => {
                      this.setState({
                        update: {
                          ...this.state.update,
                          PdvLogradouroPV: e.target.value
                        }
                      })
                    }}
                    placeholder={
                      this.state.PDV[this.state.displayed].PdvLogradouroPV
                    }
                  />
                </Campo>
                <Campo>
                  <Rotulo>Número</Rotulo>
                  <TextInput
                    onChange={e => {
                      this.setState({
                        update: {
                          ...this.state.update,
                          PdvNumeroPV: e.target.value
                        }
                      })
                    }}
                    placeholder={
                      this.state.PDV[this.state.displayed].PdvNumeroPV || 'NA'
                    }
                  />
                </Campo>
                <Campo>
                  <Rotulo>Complemento</Rotulo>
                  <TextInput
                    onChange={e => {
                      this.setState({
                        update: {
                          ...this.state.update,
                          PdvComplementoPV: e.target.value
                        }
                      })
                    }}
                    placeholder={
                      this.state.PDV[this.state.displayed].PdvComplementoPV ||
                      'NA'
                    }
                  />
                </Campo>
                <Campo>
                  <Rotulo>CEP</Rotulo>
                  <TextInput
                    onChange={e => {
                      this.setState({
                        update: {
                          ...this.state.update,
                          PdvCEP: e.target.value
                        }
                      })
                    }}
                    placeholder={this.state.PDV[this.state.displayed].PdvCEP}
                  />
                </Campo>
                <Campo>
                  <Rotulo>Bairro</Rotulo>
                  <TextInput
                    onChange={e => {
                      this.setState({
                        update: {
                          ...this.state.update,
                          PdvBairroPV: e.target.value
                        }
                      })
                    }}
                    placeholder={
                      this.state.PDV[this.state.displayed].PdvBairroPV
                    }
                  />
                </Campo>
                <Campo>
                  <Rotulo>Cidade</Rotulo>
                  <TextInput
                    onChange={e => {
                      this.setState({
                        update: {
                          ...this.state.update,
                          PdvCidadePV: e.target.value
                        }
                      })
                    }}
                    placeholder={
                      this.state.PDV[this.state.displayed].PdvCidadePV
                    }
                  />
                </Campo>
                <Campo>
                  <Rotulo>UF</Rotulo>
                  <TextInput
                    onChange={e => {
                      this.setState({
                        update: {
                          ...this.state.update,
                          PdvUfPV: e.target.value
                        }
                      })
                    }}
                    placeholder={this.state.PDV[this.state.displayed].PdvUfPV}
                  />
                </Campo>
              </Combobox>
            </>
          </Tab>
          <Tab
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false
            }}
            title='Produtos'
          >
            <p>
              Em Obras<Icon left>directions_walk</Icon>
            </p>
            {/* {this.state.loaded && (
              <>
                <Combobox>
                  <Rotulo>Configuração de maquina:</Rotulo>
                  <Contagem>
                    {this.state.PDV[this.state.displayed].CfgId}
                  </Contagem>
                  <Table>
                    <thead>
                      <tr>
                        <th>Seleção</th>
                        <th>Produto</th>
                        <th>Receita</th>
                      </tr>
                    </thead>
                    <td>
                      {this.state.Configs.map((config, i) => (
                        <tr>{i + 1}</tr>
                      ))}
                    </td>
                    <td>
                      {this.state.Configs.map((config, i) => (
                        <tr>{config.Produto}</tr>
                      ))}
                    </td>
                      <td>{this.state.Receitas.map(receita => (<option>{receita.RecDesc}</option>))}</td>
                  </Table>
                </Combobox>
              </>
            )} */}
          </Tab>
        </Tabs>

        <div className='XAlign'>
          <Modal
            actions={[
              <Button
                onClick={() => {
                  this.handleUpdate()
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
                ATUALIZAR PONTO DE VENDA<Icon left>cloud_upload</Icon>
              </Button>
            }
          >
            <p>Confirmar dados e atualizar Ponto de Venda?</p>
          </Modal>

          <Button
            onClick={() => {
              this.props.history.push('/pontosdevenda/novo')
            }}
          >
            Adicionar Ponto de Venda
            <Icon left>add</Icon>
          </Button>
        </div>
      </Panel>
    )
  }
}
