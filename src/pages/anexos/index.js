import React from 'react'
import { api } from '../../services/api'
import { Toast, ToastyContainer } from '../../components/toasty'
import Loading from '../../components/loading_screen'

import { Panel, Combobox, Campo, Rotulo } from '../../components/commom_in'
import {
  Select,
  TextInput,
  Button,
  Icon,
  Tabs,
  Tab,
  Modal
} from 'react-materialize'
import { CloseButton, CancelButton, SafeButton } from '../../components/buttons'

class Anexos extends React.Component {
  state = {
    anexos: [],
    produtos: [],
    displayed: 0,
    loaded: false,
    updated: false,
    lock: true,
    numMáquinas: 0,
    update: {}
  }

  async componentDidMount() {
    try {
      const response = await api.get('/annex', {
        params: {
          token: sessionStorage.getItem('token')
        }
      })

      this.setState({ anexos: response.data })
      this.setState({ loaded: true })
      this.switchCliente(0)
    } catch (err) {
      Toast('Erro ao estabelecer conexão com o servidor', 'error')
      this.props.history.push('/')
    }
  }

  async switchCliente(num) {
    this.setState({ displayed: num })
    this.setState({ update: this.state.anexos[this.state.displayed] })
    const inputs = document.querySelectorAll('input')
    let i
    for (i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }
  }

  async handleUpdate() {
    try {
      await api.put('/annex', {
        token: sessionStorage.getItem('token'),
        newAnexo: this.state.update
      })
      Toast('Dados atualizados com sucesso', 'success')
      setTimeout(() => {
        window.location.reload()
      }, 3000)

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
                <th>CNPJ</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {this.state.anexos.map((anexo, i) => (
                <tr
                  onClick={() => {
                    this.switchCliente(i)
                  }}
                  className='modal-trigger'
                  href='#Dados'
                >
                  <td>{i}</td>
                  <td>{anexo.AnxDesc}</td>
                  <td>{anexo.CNPJss}</td>
                  <td>{this.tipoDeVenda(anexo.CalcFatId)}</td>
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
                  alert('Vai para Pontos de Venda')
                }}
              >
                <Icon left>description</Icon>
                PdV do cliente
              </Button>,

              <CancelButton
                disabled={!this.state.updated}
                onClick={e => {
                  alert('Exclui anexo do cliente')
                  e.target.disabled = true
                }}
              >
                Excluir anexo
              </CancelButton>,

              <SafeButton
                disabled={!this.state.updated}
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
            header='Dados do Anexo'
            id='Dados'
            options={{
              dismissible: false,
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
                      disabled={this.state.lock ? true : false}
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
          </Modal>
        </div>

        <Button
          onClick={() => {
            this.props.history.push('/anexos/novo')
          }}
        >
          Adicionar Anexo
          <Icon left>add</Icon>
        </Button>
      </Panel>
    )
  }
}

export default Anexos
