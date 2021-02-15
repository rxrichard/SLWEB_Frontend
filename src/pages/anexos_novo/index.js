import React, { Component } from 'react'
import { api } from '../../services/api'
import Loading from '../../components/loading_screen'

import { Panel, Campo, Rotulo, Titulo, Data } from '../../components/commom_in'
import {
  Select,
  Button,
  Icon,
  TextInput,
  Checkbox,
  Modal
} from 'react-materialize'
import { Toast, ToastyContainer } from '../../components/toasty'
import { GoBack, ConfirmButton, CloseButton } from '../../components/buttons'
import { dateCheck } from '../../components/commom_functions'

export default class AddAnexo extends Component {
  state = {
    contratos: [],
    produtos: [],
    newAnexo: {},
    loaded: false,
    clienteSet: false,
    fatMin: false
  }

  async componentDidMount() {
    //uso a rota de contratos para ver com quem pode se fazer anexo
    const response = await api.get('contract', {
      params: {
        token: sessionStorage.getItem('token')
      }
    })

    const res = await api.get('products', {
      params: {
        token: sessionStorage.getItem('token')
      }
    })

    this.setState({ contratos: response.data })
    this.setState({ produtos: res.data })
    this.setState({ loaded: true })
    this.switchClient(0)

    //define 'hoje' para data de inclusão
    const dataAtual = document.querySelector('input[type="date"]')
    dataAtual.value = dateCheck()
  }

  switchClient(client) {
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
      newAnexo: {
        ...this.state.newAnexo,
        CNPJ: this.state.contratos[client].CNPJ,
        CNPJss: this.state.contratos[client].CNPJss,
        AnxDesc: this.state.contratos[client].Nome_Fantasia,
        CalcFatId: null,
        AnxDiaFecha: 30,
        AnxProRata: 'N',
        AnxFatMinimo: null,
        AnxCalcMinPor: 'A',
        AnxTipMin: 'R',
        AnxMinMoeda: 'S',
        AnxConsDose: null,
        AnxConsValor: null,
        ProdId: null,
        AnxVlrUnitMin: null,
        AnxObs: 'Anexo criado pelo SLAPLIC web'
      }
    })
  }

  async handleSubmit() {
    if (!this.state.clienteSet) {
      Toast('Selecione um contrato cadastrado', 'error')
      return
    }

    this.setState({
      newAnexo: {
        ...this.state.newAnexo,
        AnxConsValor:
          this.state.newAnexo.AnxConsDose *
          Number(this.state.newAnexo.AnxVlrUnitMin)
      }
    })

    try {
      await api.post('annex/new', {
        token: sessionStorage.getItem('token'),
        newAnexo: this.state.newAnexo
      })

      Toast('Anexo criado com sucesso', 'success')
      setTimeout(() => {
        this.props.history.push('/anexos')
      }, 3000)
    } catch (err) {
      Toast('Falha ao criar novo anexo', 'error')
    }
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
        <Panel style={{ alignItems: 'center' }}>
          <ToastyContainer />

          <Titulo style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label>Criar Anexo</label>
          </Titulo>

          <div className='XAlign'>
            <Campo>
              <Rotulo>Nome Fantasia</Rotulo>
              <Select
                onChange={e => {
                  this.switchClient(e.target.value)
                }}
              >
                <option value={null}></option>
                {this.state.contratos.map((contrato, i) => (
                  <option key={contrato.CNPJ} value={i}>
                    {contrato.Nome_Fantasia}
                  </option>
                ))}
              </Select>
            </Campo>

            <Campo>
              <Rotulo>CNPJ</Rotulo>
              <TextInput disabled placeholder={this.state.newAnexo.CNPJss} />
            </Campo>

            <Campo>
              <Rotulo>Data de criação</Rotulo>
              <Data type='date' value='' readOnly />
            </Campo>

            <Campo>
              <Rotulo>Observações</Rotulo>
              <TextInput
                disabled={this.state.newAnexo.CNPJss ? false : true}
                placeholder={this.state.newAnexo.AnxObs}
                onChange={e => {
                  this.setState({
                    newAnexo: { ...this.state.newAnexo, AnxObs: e.target.value }
                  })
                }}
              />
            </Campo>

            <Campo>
              <Rotulo>Tipo de faturamento</Rotulo>
              <Select
                disabled={this.state.newAnexo.CNPJss ? false : true}
                onChange={e => {
                  this.setState({
                    newAnexo: {
                      ...this.state.newAnexo,
                      CalcFatId: e.target.value,
                      AnxFatMinimo:
                        e.target.value >= 2 && e.target.value <= 6 ? 'S' : 'N'
                    }
                  })
                }}
              >
                <option hidden selected disabled value={null}>
                  Selecione
              </option>
                <option value={1}>ALUGUEL</option>
                <option value={2}>COMODATO</option>
                <option value={4}>comodato com mínimo global</option>
                <option value={3}>comodato com mínimo por máquina</option>
                <option value={5}>comodato com preço compartilhado</option>
                <option value={6}>comodato por faixa de consumo</option>
                <option value={255}>Venda de insumos</option>
              </Select>
            </Campo>

            <Campo>
              <Rotulo>Dia de fechamento</Rotulo>
              <TextInput
                onChange={e => {
                  this.setState({
                    newAnexo: {
                      ...this.state.newAnexo,
                      AnxDiaFecha: e.target.value
                    }
                  })
                }}
                disabled
                value={30}
              />
            </Campo>

            <Campo>
              <Rotulo>Pró-Rata</Rotulo>
              <Select
                disabled={this.state.newAnexo.CNPJss ? false : true}
                onChange={e => {
                  this.setState({
                    newAnexo: {
                      ...this.state.newAnexo,
                      AnxProRata: e.target.value
                    }
                  })
                }}
              >
                <option hidden disabled selected>
                  Selecionar
              </option>
                <option value='N'>Não</option>
                <option value='S'>Sim</option>
              </Select>
            </Campo>

            <Campo>
              <Rotulo>Min. Moeda</Rotulo>
              <Select
                disabled={this.state.newAnexo.CNPJss ? false : true}
                onChange={e => {
                  this.setState({
                    newAnexo: {
                      ...this.state.newAnexo,
                      AnxMinMoeda: e.target.value
                    }
                  })
                }}
              >
                <option hidden disabled selected>
                  Selecionar
              </option>
                <option value='N'>Não</option>
                <option value='S'>Sim</option>
              </Select>
            </Campo>
          </div>

          <div className='XAlign'>
            {this.state.newAnexo.AnxFatMinimo === 'S' && (
              //opção de faturamento minimo só vai aparecer se algum tipo de comodato for escolhido
              <>
                <Campo>
                  <Rotulo>Tipo de Mínimo</Rotulo>
                  <Select
                    onChange={e => {
                      this.setState({
                        newAnexo: {
                          ...this.state.newAnexo,
                          AnxTipMin: e.target.value
                        }
                      })
                    }}
                  >
                    <option value='R'>Remessa</option>
                    <option value='D'>Dose</option>
                  </Select>
                </Campo>
                <Campo>
                  <Rotulo>Produto com mínimo</Rotulo>
                  <Select
                    onChange={e => {
                      this.setState({
                        newAnexo: {
                          ...this.state.newAnexo,
                          ProdId: this.state.produtos[e.target.value].ProdId
                        }
                      })
                    }}
                  >
                    <option value={null}></option>
                    {this.state.produtos.map((produto, i) => (
                      <option key={produto.ProdId} value={i}>
                        {produto.Produto}
                      </option>
                    ))}
                  </Select>
                </Campo>
                <Campo>
                  <Rotulo>Quantidade mínima</Rotulo>
                  <TextInput
                    onChange={e => {
                      this.setState({
                        newAnexo: {
                          ...this.state.newAnexo,
                          AnxConsDose: Number(e.target.value)
                        }
                      })
                    }}
                  />
                </Campo>

                <Campo>
                  <Rotulo>Valor un. de venda R$</Rotulo>
                  <TextInput
                    onChange={e => {
                      this.setState({
                        newAnexo: {
                          ...this.state.newAnexo,
                          AnxVlrUnitMin: e.target.value
                        }
                      })
                    }}
                  />
                </Campo>

                <Campo>
                  <Rotulo>Valor total do consumo mínimo</Rotulo>
                  <TextInput
                    onChange={e => {
                      this.setState({
                        newAnexo: {
                          ...this.state.newAnexo,
                          AnxConsValor: e.target.value
                        }
                      })
                    }}
                    value={`R$ ${this.state.newAnexo.AnxVlrUnitMin *
                      this.state.newAnexo.AnxConsDose || 0}`}
                  />
                </Campo>
                <Checkbox
                  checked
                  filledIn
                  onChange={e => {
                    this.setState({ fatMin: e.target.checked })
                  }}
                  label='Faturamento mínimo de produto'
                />
              </>
            )}
          </div>

          <div className='XAlign'>
            <GoBack />
            <Modal
              actions={[
                <ConfirmButton
                  onClick={() => {
                    this.handleSubmit()
                  }}
                >
                  Confirmar
                </ConfirmButton>,
                <CloseButton />
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
                  Criar anexo<Icon left>add</Icon>
                </Button>
              }
            >
              <p>Confirmar dados e criar anexo?</p>
            </Modal>
          </div>
        </Panel>
      )
  }
}
