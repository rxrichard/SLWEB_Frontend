import React from 'react'
import Loading from '../../components/loading_screen'

import {
  Button,
  Icon,
  Checkbox,
  Modal,
  DatePicker,
  Tabs,
  Tab,
  Table,
  Switch
} from 'react-materialize'
import { Campo, Rotulo } from '../../components/commom_in'
import { Toast, ToastyContainer } from '../../components/toasty'
import { api } from '../../services/api'

let opcoes = [
  [{}, {}, {}],
  [{}, {}, {}]
] //formato em que as configs devem chegar para funcionar a tela xD

export default class Cadastro extends React.Component {
  state = {
    requisicao: {
      maquina: '',
      destino: null,
      abastecimento: null,
      idVisual: null,
      gabinete: null,
      DtPretendida: null,

      estabilizador: false,
      transformador: false,
      telemetria: false,

      validador: false,
      moedeiro: false,
      sisPagamento: null,
      filtro: false
    },
    endereços_entrega: [],
    ConfigMaquina: undefined,
    valorConfig: [],
    a: false, //só um switch, pode dar um nome descente se quiser...
    MaqsDisp: [], //Maquinas que ja possuem pelo menos uma configuração disponivel
    loaded: false
  }

  async componentDidMount() {
    try {
      const response = await api.get('/equip/adresses', {
        params: {
          token: sessionStorage.getItem('token'),
          maq: this.state.requisicao.maquina
        }
      })

      this.setState({
        endereços_entrega: response.data.endereços,
        MaqsDisp: response.data.MaqDisp,
        loaded: true
      })
    } catch (err) {
      Toast('Falha ao buscar endereços para entrega', 'error')
    }
  }

  async handleRequest() {
    if (this.state.requisicao.destino === null) {
      Toast('Preencha um destino para a solicitação')
      return
    }
    if (
      this.state.requisicao.maquina !== '' &&
      this.state.ConfigMaquina === undefined
    ) {
      Toast('Ative uma das configurações padrão para a máquina')
      return
    }
    if (
      this.state.requisicao.maquina !== '' &&
      this.state.requisicao.abastecimento === null
    ) {
      Toast('Selecione o sistema de abastecimento da máquina')
      return
    }

    if (
      this.state.requisicao.maquina !== '' &&
      this.state.requisicao.idVisual === null
    ) {
      Toast('Selecione a identidade visual da máquina')
      return
    }

    if (
      this.state.requisicao.maquina !== '' &&
      this.state.requisicao.sisPagamento === null
    ) {
      Toast('Selecione um meio de pagamento para a máquina')
      return
    }

    if (this.state.requisicao.DtPretendida === null) {
      Toast('Preencha uma data conveniente para entrega')
      return
    }

    try {
      const response = await api.post('/equip', {
        token: sessionStorage.getItem('token'),
        requisicao: this.state.requisicao,
        ConfigMaquina: this.state.ConfigMaquina,
        valoresConfig: this.state.valorConfig
      })

      if (response.data === 201) {
        Toast('Solicitação registrada com sucesso', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } else {
        throw Error
      }
    } catch (err) {
      Toast('Falha ao realizar solicitação', 'error')
      // setTimeout(() => {
      //   window.location.reload()
      // }, 3000)
    }
  }

  async handleChangeTargetMaq(maq) {
    this.setState({
      requisicao: {
        ...this.state.requisicao,
        maquina: maq
      }
    })

    this.handleActivateConfig(1, false) //preciso desativar a config da maquina anterior selecionada ou ela fica ativa na nova maquina escolhida

    try {
      const response = await api.get('/equip/adresses', {
        params: {
          token: sessionStorage.getItem('token'),
          maq
        }
      })

      if (response.data.configsMaq.length > 0) {
        //ALERTA DE GAMBIARRA
        opcoes = response.data.configsMaq.map((config, i) => {
          return [
            Object.assign({
              opc: i + 1,
              nome: config.MaqSel01,
              vlr: config.MaqSelPr01
            }),
            Object.assign({
              opc: i + 2,
              nome: config.MaqSel02,
              vlr: config.MaqSelPr02
            }),
            Object.assign({
              opc: i + 3,
              nome: config.MaqSel03,
              vlr: config.MaqSelPr03
            }),
            Object.assign({
              opc: i + 4,
              nome: config.MaqSel04,
              vlr: config.MaqSelPr04
            }),
            Object.assign({
              opc: i + 5,
              nome: config.MaqSel05,
              vlr: config.MaqSelPr05
            }),
            Object.assign({
              opc: i + 6,
              nome: config.MaqSel06,
              vlr: config.MaqSelPr06
            }),
            Object.assign({
              opc: i + 7,
              nome: config.MaqSel07,
              vlr: config.MaqSelPr07
            }),
            Object.assign({
              opc: i + 8,
              nome: config.MaqSel08,
              vlr: config.MaqSelPr08
            }),
            Object.assign({
              opc: i + 9,
              nome: config.MaqSel09,
              vlr: config.MaqSelPr09
            })
          ]
        })

        this.setState({ a: true })
      } else {
        opcoes = [[]]
        this.setState({ a: false })
      }
    } catch (err) {
      Toast('Falha ao buscar configurações padrão de máquina', 'error')
    }
  }

  handleActivateConfig(configNum, status, idSwitch) {
    //Seleciono os checkbox'es do modal
    let a = document.querySelectorAll('input[type=checkbox]')

    //seleciono os inputs comuns do modal
    let b = document.querySelectorAll('input')

    //se a ação for false (desativar), limpo tudo em todo lugar
    if (status === false) {
      this.setState({ ConfigMaquina: undefined })

      for (let i = 0; i < b.length; i++) {
        b[i].value = null
      }

      for (let i = 0; i < a.length; i++) {
        a[i].checked = false
      }

      return
    } else {
      //se não, limpo tudo só onde não for da config em questão

      for (let i = 0; i < a.length; i++) {
        if (a[i].id !== idSwitch) {
          a[i].checked = false
        }
      }

      for (let i = 0; i < b.length; i++) {
        b[i].value = null
      }
    }

    /*Aqui eu pegaria os valores padrões da config selecionada que estaria em um estado,
      jogaria em um outro objeto com a propriedade "active" que pode ser true ou false.
    */

    let aux = opcoes[configNum - 1].map(opcao => {
      return Object.assign({
        active: false,
        valorPadrao: parseFloat(opcao.vlr).toFixed(2),
        valorCobrado: parseFloat(opcao.vlr).toFixed(2)
      })
    })

    this.setState({ ConfigMaquina: configNum })
    this.setState({ valorConfig: aux })
  }

  editConfigCost(itemID, value) {
    if (isNaN(parseFloat(value))) return

    let aux = []

    aux = this.state.valorConfig

    aux[itemID].valorCobrado = parseFloat(value).toFixed(2)

    this.setState({ valorConfig: aux })
  }

  editConfigActive(itemID, value) {
    let aux = []

    aux = this.state.valorConfig

    aux[itemID].active = value

    this.setState({ valorConfig: aux })
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <>
        <ToastyContainer />
        <div
          style={{
            width: '50vw',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end'
              }}
            >
              <Campo>
                <Rotulo>Máquina:</Rotulo>
                <select
                  style={{
                    all: 'unset',
                    marginTop: '10px',
                    borderBottom: '1px solid #FF2525',
                    borderLeft: '1px dotted #FF2525'
                  }}
                  onChange={e => {
                    this.handleChangeTargetMaq(e.target.value)
                  }}
                >
                  <option selected hidden disabled value={null}>
                    Selecione...
                  </option>
                  {this.state.MaqsDisp.map((maq, i) => (
                    <option key={i} value={maq.OSConfigMaq}>
                      {maq.OSConfigMaq}
                    </option>
                  ))}
                </select>
              </Campo>
              <Modal
                actions={[
                  <Button flat modal='close' node='button' waves='green'>
                    Fechar
                  </Button>
                ]}
                bottomSheet={false}
                fixedFooter={false}
                header='Configuração da máquina'
                trigger={
                  <Button
                    disabled={
                      this.state.requisicao.maquina === '' ? true : false
                    }
                    style={{ marginLeft: '10px' }}
                  >
                    <Icon center>settings</Icon>
                  </Button>
                }
              >
                {this.state.a === true ? (
                  <Tabs className='tab-demo z-depth-1'>
                    {opcoes.map((opcao, i) => (
                      <Tab
                        options={{
                          duration: 300,
                          onShow: null,
                          responsiveThreshold: Infinity,
                          swipeable: false
                        }}
                        title={`Configuração ${i + 1}`}
                      >
                        <Table centered>
                          <thead>
                            <tr>
                              <th>Seleção</th>
                              <th>Produto</th>
                              <th>Valor Real</th>
                              <th>Valor Cobrado</th>
                              <th>Seleção ativa</th>
                            </tr>
                          </thead>
                          <tbody>
                            {opcao.map((opc, j) => {
                              if (opc.nome !== null)
                                return (
                                  <tr>
                                    <td>{j + 1}</td>
                                    <td>{opc.nome}</td>
                                    <td>{parseFloat(opc.vlr).toFixed(2)}</td>

                                    <td>
                                      <input
                                        disabled={
                                          parseFloat(
                                            this.state.ConfigMaquina
                                          ) !==
                                          i + 1
                                            ? true
                                            : false
                                        }
                                        style={{
                                          all: 'unset',
                                          borderBottom: `1px solid ${
                                            parseFloat(
                                              this.state.ConfigMaquina
                                            ) !==
                                            i + 1
                                              ? '#CCC'
                                              : '#000'
                                          }`
                                        }}
                                        onChange={e =>
                                          this.editConfigCost(j, e.target.value)
                                        }
                                      />
                                    </td>

                                    <td>
                                      <Checkbox
                                        disabled={
                                          parseFloat(
                                            this.state.ConfigMaquina
                                          ) ===
                                          i + 1
                                            ? false
                                            : true
                                        }
                                        onChange={e => {
                                          this.editConfigActive(
                                            j,
                                            e.target.checked
                                          )
                                        }}
                                      />
                                    </td>
                                  </tr>
                                )
                            })}
                          </tbody>
                        </Table>
                        <Switch
                          id={`switch-${i + 1}`}
                          className='CHECK'
                          value={i + 1}
                          offLabel='Desativada'
                          onChange={e =>
                            this.handleActivateConfig(
                              e.target.value,
                              e.target.checked,
                              e.target.id
                            )
                          }
                          onLabel='Selecionada'
                        />
                      </Tab>
                    ))}
                  </Tabs>
                ) : (
                  <p>Nenhuma configuração padrãp disponivel.</p>
                )}
              </Modal>
            </div>

            <Campo>
              <Rotulo>Local de entrega:</Rotulo>
              <select
                style={{
                  all: 'unset',
                  marginTop: '10px',
                  borderBottom: '1px solid #FF2525',
                  borderLeft: '1px dotted #FF2525'
                }}
                onChange={e => {
                  this.setState({
                    requisicao: {
                      ...this.state.requisicao,
                      destino: e.target.value
                    }
                  })
                }}
              >
                <option selected hidden disabled value={null}>
                  Selecione...
                </option>
                {this.state.endereços_entrega.map(cliente => (
                  <option
                    key={cliente.CNPJ}
                    value={`${
                      cliente.Logradouro === null
                        ? 'NA'
                        : cliente.Logradouro.trim()
                    }, numero: ${
                      cliente.Número === null ? 'NA' : cliente.Número.trim()
                    }, complemento: ${
                      cliente.Complemento === null
                        ? 'NA'
                        : cliente.Complemento.trim()
                    }, bairro: ${
                      cliente.Bairro === null ? 'NA' : cliente.Bairro.trim()
                    }, CEP: ${
                      cliente.CEP === null ? 'NA' : cliente.CEP.trim()
                    }, ${
                      cliente.Município === null
                        ? 'NA'
                        : cliente.Município.trim()
                    }, ${cliente.UF === null ? 'NA' : cliente.UF.trim()}`}
                  >
                    {cliente.Nome_Fantasia}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo>
              <Rotulo>Abastecimento de Água:</Rotulo>
              <select
                style={{
                  all: 'unset',
                  marginTop: '10px',
                  borderBottom: '1px solid #FF2525',
                  borderLeft: '1px dotted #FF2525'
                }}
                onChange={e => {
                  this.setState({
                    requisicao: {
                      ...this.state.requisicao,
                      abastecimento: e.target.value
                    }
                  })
                }}
              >
                <option selected hidden disabled value={null}>
                  Selecione...
                </option>
                <option value='Galão'>Galão</option>
                <option value='Ponto Hidrico'>Ponto Hídrico</option>
                <option value='Depósito Próprio'>Depósito Próprio</option>
              </select>
            </Campo>
            <Campo>
              <Rotulo>Imagem:</Rotulo>
              <select
                style={{
                  all: 'unset',
                  marginTop: '10px',
                  borderBottom: '1px solid #FF2525',
                  borderLeft: '1px dotted #FF2525'
                }}
                onChange={e => {
                  this.setState({
                    requisicao: {
                      ...this.state.requisicao,
                      idVisual: e.target.value
                    }
                  })
                }}
              >
                <option selected hidden disabled value={null}>
                  Selecione...
                </option>
                <option value='Sem Imagem'>Sem Imagem</option>
                <option value='Pilão'>Pilão</option>
                <option value='Café do Ponto'>Café do Ponto</option>
                <option value='Damasco'>Damasco</option>
              </select>
            </Campo>
            <Campo>
              <Rotulo>Gabinete:</Rotulo>
              <select
                style={{
                  all: 'unset',
                  marginTop: '10px',
                  borderBottom: '1px solid #FF2525',
                  borderLeft: '1px dotted #FF2525'
                }}
                onChange={e => {
                  this.setState({
                    requisicao: {
                      ...this.state.requisicao,
                      gabinete: e.target.value
                    }
                  })
                }}
              >
                <option selected hidden disabled value={null}>
                  Selecione...
                </option>
                <option value='Sem Gabinete'>Sem Gabinete</option>
                <option value='BRIO 3'>BRIO 3</option>
                <option value='CAFITESSE'>CAFITESSE</option>
                <option value='COLIBRI'>COLIBRI</option>
                <option value='GAIA'>GAIA</option>
                <option value='KORO'>KORO</option>
                <option value='LEI SA'>LEI SA</option>
                <option value='PHEDRA'>PHEDRA</option>
                <option value='SOLISTA'>SOLISTA</option>
              </select>
            </Campo>
          </div>

          <div>
            <Campo>
              <Rotulo>Acessorios</Rotulo>

              <Checkbox
                filledIn
                onChange={e => {
                  this.setState({
                    requisicao: {
                      ...this.state.requisicao,
                      estabilizador: e.target.checked
                    }
                  })
                }}
                label='Estabilizador de Tensão'
              />
              <Checkbox
                filledIn
                onChange={e => {
                  this.setState({
                    requisicao: {
                      ...this.state.requisicao,
                      transformador: e.target.checked
                    }
                  })
                }}
                label='Transformador (110v / 220v)'
              />
              <Checkbox
                filledIn
                onChange={e => {
                  this.setState({
                    requisicao: {
                      ...this.state.requisicao,
                      telemetria: e.target.checked
                    }
                  })
                }}
                label='Telemetria'
              />
              <Checkbox
                filledIn
                onChange={e => {
                  this.setState({
                    requisicao: {
                      ...this.state.requisicao,
                      validador: e.target.checked
                    }
                  })
                }}
                label='Validador'
              />
              <Checkbox
                filledIn
                onChange={e => {
                  this.setState({
                    requisicao: {
                      ...this.state.requisicao,
                      moedeiro: e.target.checked
                    }
                  })
                }}
                label='Moedeiro'
              />
              <Checkbox
                filledIn
                onChange={e => {
                  this.setState({
                    requisicao: {
                      ...this.state.requisicao,
                      filtro: e.target.checked
                    }
                  })
                }}
                label='Kit de filtro'
              />
              <label>Sistema de pagamento: </label>
              <select
                style={{
                  all: 'unset',
                  borderBottom: '1px solid #FF2525',
                  borderLeft: '1px solid #FF2525'
                }}
                onChange={e => {
                  this.setState({
                    requisicao: {
                      ...this.state.requisicao,
                      sisPagamento: e.target.value
                    }
                  })
                }}
              >
                <option selected hidden disabled value={null}>
                  Selecione...
                </option>
                <option value='Nº Série Redecard'>Nº Série Redecard</option>
                <option value='Nº Série Verifone'>Nº Série Verifone</option>
              </select>
            </Campo>

            <Campo>
              <DatePicker
                placeholder='Data desejada'
                style={{
                  all: 'unset',
                  borderBottom: '1px solid #ccc'
                }}
                onChange={e => {
                  this.setState({
                    requisicao: { ...this.state.requisicao, DtPretendida: e }
                  })
                }}
                options={{
                  autoClose: true,
                  container: null,
                  defaultDate: null,
                  disableDayFn: null,
                  disableWeekends: true,
                  events: [],
                  firstDay: 0,
                  format: 'mmm dd, yyyy',
                  i18n: {
                    cancel: 'Cancelar',
                    clear: 'Limpar',
                    done: 'Confirmar',
                    months: [
                      'Janeiro',
                      'Fevereiro',
                      'Março',
                      'Abril',
                      'Maio',
                      'Junho',
                      'Julho',
                      'Agosto',
                      'Setembro',
                      'Outubro',
                      'Novembro',
                      'Dezembro'
                    ],
                    monthsShort: [
                      'Jan',
                      'Fev',
                      'Mar',
                      'Abr',
                      'Mai',
                      'Jun',
                      'Jul',
                      'Ago',
                      'Set',
                      'Out',
                      'Nov',
                      'Dez'
                    ],
                    nextMonth: '›',
                    previousMonth: '‹',
                    weekdays: [
                      'Domingo',
                      'Segunda',
                      'Terça',
                      'Quarta',
                      'Quinta',
                      'Sexta',
                      'Sábado'
                    ],
                    weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                    weekdaysShort: [
                      'Dom',
                      'Seg',
                      'Ter',
                      'Qua',
                      'Qui',
                      'Sex',
                      'Sab'
                    ]
                  },
                  isRTL: false,
                  maxDate: null,
                  minDate: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate() + 7
                  ),
                  onClose: null,
                  onDraw: null,
                  onOpen: null,
                  onSelect: null,
                  parse: null,
                  setDefaultDate: false,
                  showClearBtn: true,
                  showDaysInNextAndPreviousMonths: false,
                  showMonthAfterYear: false,
                  yearRange: 1
                }}
              />
            </Campo>

            <Button
              className='modal-trigger'
              href='#confirm'
              style={{
                margin: '10px 0px 0px 50px'
              }}
              waves='light'
            >
              Solicitar
              <Icon left>add</Icon>
            </Button>
          </div>

          <Modal
            actions={[
              <Button
                disabled={false}
                onClick={e => {
                  this.handleRequest()
                  e.target.disabled = true
                }}
              >
                <Icon left>check</Icon>
                Confirmar
              </Button>,
              <Button flat modal='close' node='button' waves='green'>
                <Icon left>close</Icon>
                Fechar
              </Button>
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header='Confirmar solicitação?'
            id='confirm'
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
            <label>
              Após confirmar, custos poderão ser aplicados mesmo com o
              cancelamento da solicitação na tela de Solicitações
            </label>
          </Modal>
        </div>
      </>
    )
  }
}
