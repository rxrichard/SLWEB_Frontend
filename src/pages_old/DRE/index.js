import React, { Component } from 'react'
import { api } from '../../services/api'

import { Panel } from '../../components/commom_in'
import { Select, Icon, Button, Modal } from 'react-materialize'
import Loading from '../../components/loading_screen'
import { Toast, ToastyContainer } from '../../components/toasty'

export default class DRE extends Component {
  state = {
    loaded: false,
    DRED: [],
    DREG: [],
    Margem: []
  }

  async componentDidMount() {
    try {
      const response = await api.get('/ref', {
        params: {
          token: localStorage.getItem('token')
        }
      })

      this.setState({
        loaded: true,
        Margem: response.data
      })
    } catch (err) {
      Toast('Erro ao buscar dados do servidor', 'error')
      setTimeout(() => {
        window.location.assign('/')
      }, 4000)
    }
  }

  async handleSwitchMonth(i) {
    const Data = `${this.state.Margem[i].RefAno}/${this.state.Margem[i].RefMes}`

    try {
      const response = await api.get('/dre', {
        params: {
          token: localStorage.getItem('token'),
          data: Data
        }
      })

      this.setState({
        DRED: response.data.DRED,
        DREG: response.data.DREG
      })
    } catch (err) {
      Toast('Falha ao comunicar ao servidor', 'error')
    }
  }

  async handleSaveDRE() {

    try {
      const response = await api.post('/dre', {
        token: localStorage.getItem('token'),
        DRE: this.state.DRED,
        totalMes: this.state.DREG[0].DreVlr
      })

      if(response.data === 202){
        Toast('DRE salvo com sucesso')
      }else{
        throw Error
      }
    } catch (err) {
      Toast('Falha ao salvar dados', 'error')
    }
  }

  EditDRE(value, DREid) {
    if (value === '') value = 0
    let aux = this.state.DRED

    aux[DREid - 23].DreVlr = parseFloat(value)

    this.setState({ DRED: aux })
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Panel>
        <ToastyContainer />
        <div
          className='tableFixHead'
          style={{ height: '70vh', width: '40%', overflow: 'auto' }}
        >
          <table>
            <thead>
              <tr>
                <th>Centro de custos</th>
                <th>Custo</th>
                <th>Porcentagem</th>
              </tr>
            </thead>
            <tbody>
              {this.state.DREG.map((custo, i) => (
                <tr key={custo.DreCod}>
                  <td>{custo.DreDesc}</td>
                  <td>{custo.DreVlr}</td>
                  <td>{parseFloat(custo.DrePorc * 100).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className='tableFixHead'
          style={{ height: '70vh', width: '40%', overflow: 'auto' }}
        >
          <table>
            <thead>
              <tr>
                <th>Centro de custos</th>
                <th>Custo</th>
                <th>Porcentagem</th>
              </tr>
            </thead>
            <tbody>
              {this.state.DRED.map(custo => (
                <tr key={custo.DreCod}>
                  <td>{custo.DreDesc}</td>
                  <input
                    disabled={custo.DreCod === 34 ? true : false}
                    onChange={e => {
                      this.EditDRE(e.target.value, custo.DreCod)
                    }}
                    style={{
                      all: 'unset',
                      borderBottom: '1px solid #CCCCCC',
                      marginTop: '20%',
                      width: '60px',
                      textAlign: 'center'
                    }}
                    placeholder={custo.DreVlr}
                  />
                  <td>{parseFloat(custo.DrePorc * 100).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <Select
            onChange={e => {
              this.handleSwitchMonth(e.target.value)
            }}
          >
            <option value='' disabled>
              Selecionar mês
            </option>
            {this.state.Margem.map((mes, i) => (
              <option value={i} key={mes.Refdt}>
                {mes.RefMes}/{mes.RefAno}
              </option>
            ))}
          </Select>

          <Modal
            actions={[
              <Button onClick={() => this.handleSaveDRE()}>
                Confirmar
                <Icon left>check</Icon>
              </Button>,
              <Button flat modal='close' node='button' waves='green'>
                Fechar
                <Icon left>close</Icon>
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
              <Button>
                <Icon left>save</Icon>
                Salvar
              </Button>
            }
          >
            Confirmar alterações no DRE?
          </Modal>
        </div>
      </Panel>
    )
  }
}
