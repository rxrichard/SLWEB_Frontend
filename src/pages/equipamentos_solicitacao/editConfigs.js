import React, { Component } from 'react'
import { api } from '../../services/api'

import { Toast, ToastyContainer } from '../../components/toasty'
import Loading from '../../components/loading_screen'
import { Panel, Rotulo } from '../../components/commom_in'
import { Select, Table, Button, Icon } from 'react-materialize'

let opcoes = [
  [{}, {}, {}],
  [{}, {}, {}]
]

let ModeloMaquinas = [
  'KIKKO',
  'KIKKO MAX',
  'LEI 400',
  'LEI SA',
  'CAFITESSE NG 110',
  'SNAKKY MAX',
  'SNAKKY',
  'CAFITESSE EXCELLENCE',
  'COLIBRI',
  'IDEA',
  'PHEDRA',
  'SOLISTA',
  'SAMBA',
  'ROYAL'
]

export default class configManagement extends Component {
  state = {
    maquina: {}, //informações da maquina que está sendo trabalhada
    configs: [], //todas as configurações da máquina que está sendo trabalhada
    configToTable: [], //configuração X que está sendo trabalhada
    MaquinasDisponiveis: [],
    loaded: false,
    creating: false
  }

  async componentDidMount() {
    try {
      const response = await api.get('/equip/adresses', {
        params: {
          token: sessionStorage.getItem('token'),
          maq: ''
        }
      })

      this.setState({
        MaquinasDisponiveis: response.data.MaqDisp,
        loaded: true
      })
    } catch (err) {
      Toast('Falha ao buscar padrões de máquina')
    }
  }

  async seeConfigs(maquina) {
    this.setState({
      maquina: {
        tipo: maquina,
        config: null
      },
      configToTable: []
    })

    let b = document.querySelectorAll('select')
    for (let i = 1; i < b.length; i++) {
      b[i].selectedIndex = 0
    }

    try {
      const response = await api.get('/equip/adresses', {
        params: {
          token: sessionStorage.getItem('token'),
          maq: maquina
        }
      })

      this.setState({
        configs: response.data.configsMaq,
        loaded: true
      })

      if (response.data.configsMaq.length > 0) {
        //ALERTA DE GAMBIARRA
        opcoes = response.data.configsMaq.map((config, i) => {
          return [
            Object.assign({
              opc: 1,
              nome: config.MaqSel01,
              vlr: config.MaqSelPr01
            }),
            Object.assign({
              opc: 2,
              nome: config.MaqSel02,
              vlr: config.MaqSelPr02
            }),
            Object.assign({
              opc: 3,
              nome: config.MaqSel03,
              vlr: config.MaqSelPr03
            }),
            Object.assign({
              opc: 4,
              nome: config.MaqSel04,
              vlr: config.MaqSelPr04
            }),
            Object.assign({
              opc: 5,
              nome: config.MaqSel05,
              vlr: config.MaqSelPr05
            }),
            Object.assign({
              opc: 6,
              nome: config.MaqSel06,
              vlr: config.MaqSelPr06
            }),
            Object.assign({
              opc: 7,
              nome: config.MaqSel07,
              vlr: config.MaqSelPr07
            }),
            Object.assign({
              opc: 8,
              nome: config.MaqSel08,
              vlr: config.MaqSelPr08
            }),
            Object.assign({
              opc: 9,
              nome: config.MaqSel09,
              vlr: config.MaqSelPr09
            })
          ]
        })
      }
    } catch (err) {
      Toast('Falha ao buscar configurações da maquina', 'error')
    }
  }

  handleChangeTableContent(value) {
    let a = document.querySelectorAll('input')
    for (let i = 0; i < a.length; i++) {
      a[i].value = ''
    }

    this.setState({
      configToTable: opcoes[value],
      maquina: {
        ...this.state.maquina,
        config: parseFloat(value) + 1
      }
    })
  }

  handleChangeProduct(product, index) {
    let aux = this.state.configToTable

    aux[index].nome = product

    this.setState({ configToTable: aux })
  }

  handleChangeValue(value, index) {
    let aux = this.state.configToTable

    aux[index].vlr = value

    this.setState({ configToTable: aux })
  }

  handleCreatePattern() {
    let a = document.querySelectorAll('input')
    for (let i = 0; i < a.length; i++) {
      a[i].value = ''
    }

    let b = document.querySelectorAll('select')
    for (let i = 0; i < b.length; i++) {
      b[i].selectedIndex = 0
    }

    //MAIS GAMBIARRA AINDA
    this.setState({
      configToTable: [
        {
          opc: 1,
          nome: 'Preencher',
          vlr: 0
        },
        {
          opc: 2,
          nome: 'Preencher',
          vlr: 0
        },
        {
          opc: 3,
          nome: 'Preencher',
          vlr: 0
        },
        {
          opc: 4,
          nome: 'Preencher',
          vlr: 0
        },
        {
          opc: 5,
          nome: 'Preencher',
          vlr: 0
        },
        {
          opc: 6,
          nome: 'Preencher',
          vlr: 0
        },
        {
          opc: 7,
          nome: 'Preencher',
          vlr: 0
        },
        {
          opc: 8,
          nome: 'Preencher',
          vlr: 0
        },
        {
          opc: 9,
          nome: 'Preencher',
          vlr: 0
        }
      ]
    })

    this.setState({
      maquina: {
        config: '',
        tipo: ''
      },
      configs: []
    })
  }

  async handleUpdate() {
    if (this.state.maquina === {})
      try {
        const response = await api.put('/equip/config/update', {
          token: sessionStorage.getItem('token'),
          config: this.state.configToTable,
          maqDet: this.state.maquina
        })

        if (response.data !== 200) throw Error

        Toast('Padrão atualizado com sucesso', 'success')
        setTimeout(() => {
          document.location.reload()
        }, 3000)
      } catch (err) {
        Toast('Falha ao atualizar padrão de máquina', 'error')
      }
  }

  async handleSubmit() {
    if (this.state.maquina.tipo === '') {
      Toast('Informe qual máquina é a detentora da configuração')
      return
    }

    try {
      const response = await api.post('/equip/config/create', {
        token: sessionStorage.getItem('token'),
        config: this.state.configToTable,
        maqDet: this.state.maquina
      })

      console.log(response.data)
      if (response.data !== 201) throw Error
      Toast('Padrão salvo com sucesso', 'success')
    } catch (err) {
      Toast('Falha ao cadastrar novo padrão de máquina', 'error')
    }
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Panel>
        <ToastyContainer />
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <div
            className='tableFixHead'
            style={{
              height: '70vh',
              width: '60vw'
            }}
          >
            <Table centered>
              <thead>
                <tr>
                  <th>Seleção</th>
                  <th>Bebida</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody>
                {this.state.configToTable.map((config, i) => (
                  <tr key={i}>
                    <td>{config.opc}</td>
                    <td>
                      <input
                        onChange={e => {
                          this.handleChangeProduct(e.target.value, i)
                        }}
                        placeholder={config.nome}
                        style={{
                          all: 'unset',
                          borderBottom: '1px solid #000'
                        }}
                      />
                    </td>
                    <td>
                      <input
                        onChange={e => {
                          this.handleChangeValue(e.target.value, i)
                        }}
                        placeholder={config.vlr}
                        style={{
                          all: 'unset',
                          borderBottom: '1px solid #000'
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '1%'
            }}
          >
            <Rotulo>Editar configuração:</Rotulo>
            <Select
              onChange={e => this.seeConfigs(e.target.value)}
              value={null}
            >
              <option selected disabled hidden value={null}>
                Escolha máquina alvo
              </option>
              {this.state.MaquinasDisponiveis.map((maquina, i) => (
                <option key={i} value={maquina.OSConfigMaq}>
                  {maquina.OSConfigMaq}
                </option>
              ))}
            </Select>
            {this.state.configs.length > 0 && (
              <Select
                value={null}
                onChange={e => {
                  this.handleChangeTableContent(e.target.value)
                  this.setState({ creating: false })
                }}
              >
                <option selected disabled hidden value={null}>
                  Selecione configuração
                </option>
                {this.state.configs.map((config, i) => (
                  <option key={i} value={i}>
                    Configuração {config.ConfigMaqId}
                  </option>
                ))}
              </Select>
            )}
            <Button
              disabled={this.state.creating}
              onClick={() => this.handleUpdate()}
            >
              Atualizar Padrão
              <Icon left>cloud_upload</Icon>
            </Button>
            <Button
              disabled={this.state.creating}
              onClick={() => {
                this.handleCreatePattern()
                this.setState({ creating: true })
              }}
              style={{ marginTop: '10px' }}
            >
              Criar Padrão
              <Icon left>add</Icon>
            </Button>

            {this.state.maquina.config === '' ? (
              <>
                <Select
                  onChange={e => {
                    this.setState({
                      maquina: { ...this.state.maquina, tipo: e.target.value }
                    })
                    console.log(e.target.value)
                  }}
                >
                  <option hidden disabled selected>
                    Modelo da máquina
                  </option>
                  {ModeloMaquinas.map(modelo => (
                    <option value={modelo}>{modelo}</option>
                  ))}
                </Select>
                <Button
                  style={{
                    backgroundColor: 'green'
                  }}
                  onClick={() => this.handleSubmit()}
                >
                  <Icon left>save</Icon>
                  Salvar padrão
                </Button>
              </>
            ) : null}
            <Button
              style={{ marginTop: '10px' }}
              onClick={() =>
                document.location.assign('/equipamentos/solicitacao/')
              }
            >
              <Icon left>arrow_back</Icon>
              voltar
            </Button>
          </div>
        </div>
      </Panel>
    )
  }
}
