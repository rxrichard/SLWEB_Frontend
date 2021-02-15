import React from 'react'
import Loading from '../../components/loading_screen'

import { Button, Modal, Icon, Table } from 'react-materialize'
import { ToastyContainer } from '../../components/toasty'
import { api } from '../../services/api'
import ReportModal from './modals/reportModal'
import AdmModal from './modals/admModal'
import CancelModal from './modals/cancelModal'

export default class Logs extends React.Component {
  state = {
    logs: [],
    loaded: false
  }

  async componentDidMount() {
    try {
      const response = await api.get('/equip/requests', {
        params: {
          token: localStorage.getItem('token')
        }
      })
      console.log(response.data)
      this.setState({ logs: response.data, loaded: true })
    } catch (err) {
      console.log(err)
    }
  }

  converterData(data) {
    if (data === 'NA' || data === null) {
      return 'NA'
    }

    let DtSolicita = String(data)

    const dataA = DtSolicita.split('T')
    const dataB = dataA[0].replace(/-/g, '/')
    return dataB
      .split('/')
      .reverse()
      .join('/')
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : this.state.logs.length > 0 ? ( //Se nao tiver nenhum log, nem mostra a estrutura da tabela
      <Table border='5' cellPadding='10px' cellSpacing='1px'>
        <ToastyContainer />
        <thead>
          <tr>
            <th>Status</th>
            <th>Máquina</th>
            <th>Gabinete</th>
            <th>Configuração</th>
            <th>Data de solicitação</th>
            <th>Data pretendida</th>
            <th>Data estimada</th>
            <th>Destino</th>
            <th>Ações</th>
          </tr>
        </thead>
        {this.state.logs.map((log, i) => (
          <tr>
            <td align='center'>{log.OSCStatus}</td>
            <td align='center'>{log.OSCMaquina}</td>
            <td align='center'>{log.OSCGabinete}</td>
            <td align='center'>{log.OSCConfigMaq}</td>
            <td align='center'>{this.converterData(log.OSCDtSolicita)}</td>
            <td align='center'>{this.converterData(log.OSCDtPretendida)}</td>
            <td align='center'>{this.converterData(log.OSCExpDtPrevisao)}</td>
            <td align='center'>{log.OSCDestino}</td>
            <td>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Modal
                  actions={[
                    <Button flat modal='close' node='button' waves='red'>
                      Fechar
                      <Icon left>close</Icon>
                    </Button>
                  ]}
                  bottomSheet={false}
                  fixedFooter={false}
                  header='Detalhes da solicitação'
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
                    <Button
                      node='button'
                      style={{
                        marginBottom: '10px'
                      }}
                    >
                      Inspecionar<Icon left>find_in_page</Icon>
                    </Button>
                  }
                >
                  <ReportModal log={this.state.logs[i]} />
                </Modal>

                <Modal
                  actions={[
                    <Button
                      style={{
                        margin: '10px 0px 0px 50px'
                      }}
                      flat
                      modal='close'
                      node='button'
                      waves='red'
                    >
                      Fechar
                      <Icon left>close</Icon>
                    </Button>
                  ]}
                  bottomSheet={true}
                  fixedFooter={true}
                  header='Cancelar solicitação?'
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
                    <Button
                      node='button'
                      style={{
                        marginBottom: '10px'
                      }}
                    >
                      Cancelar<Icon left>cancel</Icon>
                    </Button>
                  }
                >
                  <CancelModal del={this.state.logs[i].OSCtrlId} />
                </Modal>

                <Modal
                  actions={[
                    <Button flat modal='close' node='button' waves='red'>
                      Fechar
                      <Icon left>close</Icon>
                    </Button>
                  ]}
                  bottomSheet={false}
                  fixedFooter={false}
                  header='Gerenciamento de solicitação'
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
                    <Button
                      node='button'
                      style={{
                        marginBottom: '10px'
                      }}
                    >
                      Gerenciar<Icon left>build</Icon>
                    </Button>
                  }
                >
                  <AdmModal />
                </Modal>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    ) : (
      <></>
    )
  }
}
