import React from 'react'
import { api } from '../../services/api'
import { Toast, ToastyContainer } from '../../components/toasty'
import Loading from '../../components/loading_screen'
import { Table } from '../../components/table'
import { Panel } from '../../components/commom_in'

export default class extends React.Component {
  state = {
    depo: [],
    anexos: [],
    qtdMaq: [],
    loaded: false
  }
  async componentDidMount() {
    try {
      const response = await api.get('/deposit', {
        params: {
          token: sessionStorage.getItem('token')
        }
      })
      if (response.data === 400) throw Error

      this.setState({
        depo: response.data.dep,
        anexos: response.data.anexos,
        qtdMaq: response.data.qtdMaq,

        loaded: true
      })
    } catch (err) {
      Toast('Falha ao comunicar com o servidor', 'error')
    }
  }
  async handleCreateConfig() {
    try {
    } catch (err) {
      Toast('Falha ao criar depósito', 'error')
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
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Qtd. Anexos</th>
                <th>Qtd. Maquinas</th>
              </tr>
            </thead>
            <tbody>
              {this.state.depo.map((depo, i) => (
                <tr>
                  <td>{depo.DepId}</td>
                  <td>{depo.DepNome}</td>
                  <td>{this.state.qtdMaq}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Panel>
    )
  }
}
