import React from 'react'
import { api } from '../../services/api'
import { Toast, ToastyContainer } from '../../components/toasty'
import Loading from '../../components/loading_screen'

import {
  Panel,
  Combobox,
  Titulo,
  Contagem,
  Campo,
  Rotulo
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

class Anexos extends React.Component {
  state = {
    anexos: [],
    produtos: [],
    displayed: 0,
    loaded: false,
    numMáquinas: 0,
    update: {}
  }

  async componentDidMount() {
    try {
      const response = await api.get('/annex', {
        params: {
          token: localStorage.getItem('token')
        }
      })

      this.setState({ anexos: response.data })
      this.setState({ loaded: true })
      this.switchAnexo(0)
    } catch (err) {
      Toast('Erro ao estabelecer conexão com o servidor', 'error')
      window.location.assign('/')
    }
  }

  async switchAnexo(num) {
    const inputs = document.querySelectorAll('input')
    let i
    for (i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }
    this.setState({ displayed: num })
    this.setState({ update: this.state.anexos[this.state.displayed] })
    try {
      const response = await api.post('/annex', {
        token: localStorage.getItem('token'),
        CNPJ: this.state.anexos[this.state.displayed].CNPJ
      })
      this.setState({ numMáquinas: response.data.numMaquinas })
      this.setState({ produtos: response.data.Produtos })
    } catch (err) {
      Toast('Erro ao estabelecer conexão com o servidor', 'error')
    }
  }

  async handleUpdate() {
    try {
      await api.put('/annex', {
        token: localStorage.getItem('token'),
        newAnexo: this.state.update
      })
      Toast('Dados atualizados com sucesso', 'success')
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    } catch (err) {
      Toast('Falha ao atualizar dados do anexo', 'error')
    }
  }

  tipoDeVenda(tipo) {
    switch (tipo) {
      case 1:
        return 'ALUGUEL'
      case 2:
        return 'COMODATO'
      case 3:
        return 'COMODATO COM MÍNIMO POR MAQUINA'
      case 4:
        return 'COMODATO COM MÍNIMO GLOBAL'
      case 5:
        return 'COMODATO COM PREÇO COMPARTILHADO'
      case 6:
        return 'COMODATO POR FAIXA DE CONSUMO'
      case 255:
        return 'VENDA DE INSUMOS'
      default:
        return 'NA'
    }
  }
  render() {
    return (
      !this.state.loaded ? <Loading /> :
      <>
        <ToastyContainer />
        <Panel>
          <Titulo>
            <Campo style={{ border: '1px dashed #000', margin: '10px' }}>
              <Rotulo>Cliente: </Rotulo>
              <Select
                icon={<Icon center>people_outline</Icon>}
                onChange={e => {
                  this.switchAnexo(e.target.value)
                }}
              >
                {this.state.anexos.map((anexo, i) => (
                  <option value={i} key={anexo.AnxId}>
                    {anexo.AnxDesc + ', CNPJ: ' + anexo.CNPJss}
                  </option>
                ))}
              </Select>
            </Campo>
            <label>Máquinas: </label>
            <Contagem>{this.state.numMáquinas}</Contagem>
          </Titulo>
          <Tabs className='tab-demo z-depth-1'>
            <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
              }}
              title='Informações'
            >
                <Combobox>
                  <Campo>
                    <Rotulo>Nome Fantasia</Rotulo>
                    <TextInput
                      disabled
                      value={this.state.anexos[this.state.displayed].AnxDesc}
                    />
                  </Campo>
                  <Campo>
                    <Rotulo>CNPJ</Rotulo>
                    <TextInput
                      disabled
                      value={this.state.anexos[this.state.displayed].CNPJss}
                    />
                  </Campo>
                  <Campo>
                    <Rotulo>Status</Rotulo>
                    <TextInput
                      disabled
                      value={this.state.anexos[this.state.displayed].AnxStatus}
                    />
                  </Campo>
                  <Campo>
                    <Rotulo>Data da Inclusão</Rotulo>
                    <TextInput
                      disabled
                      value={
                        this.state.anexos[this.state.displayed].AnxDataInclusao
                      }
                    />
                  </Campo>

                  <Campo>
                    <Rotulo>Data de encerramento</Rotulo>
                    <TextInput
                      disabled
                      value={
                        this.state.anexos[this.state.displayed]
                          .AnxDataEncerramento
                      }
                    />
                  </Campo>
                  <Campo>
                    <Rotulo>Motivo do encerramento</Rotulo>
                    <TextInput
                      disabled
                      value={
                        this.state.anexos[this.state.displayed]
                          .AnxMotivoEncerramento
                      }
                    />
                  </Campo>
                  <Campo>
                    <Rotulo>Observação</Rotulo>
                    <TextInput
                      onChange={e => {
                        this.setState({
                          update: {
                            ...this.state.update,
                            AnxObs: e.target.value
                          }
                        })
                      }}
                      placeholder={
                        this.state.anexos[this.state.displayed].AnxObs
                      }
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
              title='Faturamento'
            >
                <Combobox>
                  <Campo>
                    <Rotulo>Dt. de emissão da última fatura</Rotulo>
                    <TextInput
                      disabled
                      value={
                        this.state.anexos[this.state.displayed].AnxDtEmisUFat
                      }
                    />
                  </Campo>
                  <Campo>
                    <Rotulo>Data da Ultima Fatura</Rotulo>
                    <TextInput
                      disabled
                      value={
                        this.state.anexos[this.state.displayed].AnxDataUltFat
                      }
                    />
                  </Campo>
                  <Campo>
                    <Rotulo>
                      Tipo de faturamento:
                      {this.tipoDeVenda(
                        this.state.anexos[this.state.displayed].CalcFatId
                      )}
                    </Rotulo>
                    <Select
                      disabled
                      onChange={e => {
                        this.setState({
                          update: {
                            ...this.state.update,
                            CalcFatId: Number(e.target.value)
                          }
                        })
                      }}
                    >
                      <option value={null}></option>
                      <option value={1}>ALUGUEL</option>
                      <option value={2}>COMODATO</option>
                      <option value={4}>comodato com mínimo global</option>
                      <option value={3}>comodato com mínimo por máquina</option>
                      <option value={5}>
                        comodato com preço compartilhado
                      </option>
                      <option value={6}>comodato por faixa de consumo</option>
                      <option value={255}>Venda de insumos</option>
                    </Select>
                  </Campo>
                  <Campo>
                    <Rotulo>Dia de fechamento</Rotulo>
                    <TextInput
                      disabled
                      placeholder={
                        this.state.anexos[this.state.displayed].AnxDiaFecha
                      }
                    />
                  </Campo>

                  <Campo>
                    <Rotulo>Faturamento mínimo</Rotulo>
                    <TextInput
                      disabled
                      placeholder={
                        this.state.anexos[this.state.displayed].AnxFatMinimo
                      }
                    />
                  </Campo>

                  <Campo>
                    <Rotulo>Pró-Rata</Rotulo>
                    <TextInput
                      disabled
                      placeholder={
                        this.state.anexos[this.state.displayed].AnxProRata
                      }
                    />
                  </Campo>

                  <Campo>
                    <Rotulo>Calculo mínimo por</Rotulo>
                    <TextInput
                      disabled
                      placeholder={
                        this.state.anexos[this.state.displayed].AnxCalcMinPor
                      }
                    />
                  </Campo>

                  <Campo>
                    <Rotulo>Tipo mínimo</Rotulo>
                    <TextInput
                      disabled
                      placeholder={
                        this.state.anexos[this.state.displayed].AnxTipMin
                      }
                    />
                  </Campo>

                  <Campo>
                    <Rotulo>Mínimo moeda</Rotulo>
                    <TextInput
                      disabled
                      placeholder={
                        this.state.anexos[this.state.displayed].AnxMinMoeda
                      }
                    />
                  </Campo>

                  <Campo>
                    <Rotulo>
                      <Icon left>shopping_cart</Icon>Produto com mínimo
                    </Rotulo>
                    <Select disabled onChange={e => {}}>
                      <option value={null}></option>
                      {this.state.produtos.map((produto, i) => (
                        <option key={produto.ProdId} value={i}>
                          {produto.Produto}
                        </option>
                      ))}
                    </Select>
                  </Campo>

                  <Campo>
                    <Rotulo>
                      <Icon left>remove_shopping_cart</Icon>Produto fora do
                      mínimo
                    </Rotulo>
                    <Select disabled onChange={e => {}}>
                      <option value={null}></option>
                      {this.state.produtos.map((produto, i) => (
                        <option key={produto.ProdId} value={i}>
                          {produto.Produto}
                        </option>
                      ))}
                    </Select>
                  </Campo>

                  <Campo>
                    <Rotulo>Valor unitário mínimo</Rotulo>
                    <TextInput
                      disabled
                      placeholder={
                        this.state.anexos[this.state.displayed].AnxVlrUnitMin
                      }
                    />
                  </Campo>
                </Combobox>
            </Tab>
          </Tabs>

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
                ATUALIZAR ANEXO<Icon left>cloud_upload</Icon>
              </Button>
            }
          >
            <p>Confirmar dados e atualizar anexo?</p>
          </Modal>

          <Button
            onClick={() => {
              window.location.assign('/anexos/novo')
            }}
          >
            Adicionar Anexo
            <Icon left>add</Icon>
          </Button>
        </Panel>
      </>
    )
  }
}

export default Anexos
