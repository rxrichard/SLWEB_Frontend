import React from 'react'
import { api } from '../../services/api'
import { Button, TextInput, Select, Icon, Modal } from 'react-materialize'

import Loading from '../../components/loading_screen'
import { Panel, Titulo, Campo, Rotulo } from '../../components/commom_in'
import { Toast, ToastyContainer } from '../../components/toasty'
import { ConfirmButton, GoBack, CloseButton } from '../../components/buttons'
import { dateCheck } from '../../components/commom_functions'

class AddContrato extends React.Component {
  state = {
    clientes: [],
    clienteSet: false,
    loaded: false,
    newContract: {
      GrpVen: '',
      CNPJ: '',
      ConId: '',
      cnpjn: '',
      Dt_Inicio: '',
      Dt_Fim: '',
      ConMesBase: '',
      Nome_Fantasia: '',
      Contato_Empresa: '',
      Email: '',
      Contato_Empresa_2: '',
      Email_2: '',
      Fone_2: '',
      Contato2: '',
      Obs_Específica_Cliente: '',
      CLIENTE: '',
      CNPJss: ''
    }
  }

  async componentDidMount() {
    try {
      const response = await api.post('/client', {
        token: sessionStorage.getItem('token')
      })
      this.setState({ clientes: response.data, loaded: true })
    } catch (err) {
      console.log(err)
    }
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

    const inputs = document.querySelectorAll('input')
    let i
    for (i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }

    this.setState({
      newContract: {
        ...this.state.newContract,
        GrpVen: this.state.clientes[client].GrpVen,
        CNPJ: this.state.clientes[client].CNPJ,
        ConId: 1,
        cnpjn: this.state.clientes[client].CNPJn,
        Dt_Inicio: dateCheck(),
        Dt_Fim: null,
        ConMesBase: null,
        Nome_Fantasia: this.state.clientes[client].Nome_Fantasia,
        Contato_Empresa: this.state.clientes[client].Contato_Empresa,
        Email: this.state.clientes[client].Email,
        Contato_Empresa_2: '',
        Email_2: '',
        Fone_2: this.state.clientes[client].Fone,
        Contato2: '',
        Obs_Específica_Cliente: 'Contrato criado pelo SLAPLIC web',
        CLIENTE: null,
        CNPJss: this.state.clientes[client].CNPJss
      }
    })
  }

  async submit() {
    try {
      if (!this.state.clienteSet) {
        Toast('Selecione um cliente cadastrado', 'error')
        return
      } else {
        await api.post('/contract/new', {
          token: sessionStorage.getItem('token'),
          contrato: this.state.newContract
        })
        Toast('Contrato cadastrado com sucesso', 'success')
        setTimeout(() => {
          this.props.history.push('/contratos')
        }, 3000)
      }
    } catch (err) {
      Toast('Falha ao cadastrar novo contrato', 'error')
      setTimeout(() => {
        this.props.history.push('/contratos')
      }, 3000)
    }
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Panel>
        <ToastyContainer />

        <Titulo style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label>Criar Contrato</label>
        </Titulo>

        <div className='XAlign'>
          <Campo className='camp'>
            <Rotulo>Nome Fantasia</Rotulo>
            <Select
              onChange={e => {
                this.setState({ clienteSet: true })
                this.switchClient(e.target.value)
              }}
            >
              <option></option>
              {this.state.clientes.map((cliente, i) => (
                <option key={cliente.CNPJ} value={i}>
                  {cliente.Nome_Fantasia}
                </option>
              ))}
            </Select>
          </Campo>

          <Campo className='camp'>
            <Rotulo>CNPJ</Rotulo>
            <TextInput disabled placeholder={this.state.newContract.CNPJss} />
          </Campo>
          <Campo className='camp'>
            <Rotulo>1º Contato na empresa</Rotulo>
            <TextInput
              placeholder={this.state.newContract.Contato_Empresa}
              onChange={e => {
                this.setState({
                  newContract: {
                    ...this.state.newContract,
                    Contato_Empresa: e.target.value
                  }
                })
              }}
            />
          </Campo>

          <Campo className='camp'>
            <Rotulo>Email Principal</Rotulo>
            <TextInput
              type='email'
              placeholder={this.state.newContract.Email}
              onChange={e => {
                this.setState({
                  newContract: {
                    ...this.state.newContract,
                    Email: e.target.value
                  }
                })
              }}
            />
          </Campo>

          <Campo className='camp'>
            <Rotulo>Telefone Principal</Rotulo>
            <TextInput
              type='tel'
              placeholder={this.state.newContract.Fone_2}
              onChange={e => {
                this.setState({
                  newContract: {
                    ...this.state.newContract,
                    Fone_2: e.target.value
                  }
                })
              }}
              pattern="[0-9-' ']+$"
            />
          </Campo>
        </div>

        <div className='XAlign'>
          <Campo className='camp'>
            <Rotulo>2º Contato na empresa</Rotulo>
            <TextInput
              placeholder={this.state.newContract.Contato_Empresa_2}
              onChange={e => {
                this.setState({
                  newContract: {
                    ...this.state.newContract,
                    Contato_Empresa_2: e.target.value
                  }
                })
              }}
            />
          </Campo>

          <Campo className='camp'>
            <Rotulo>Email Secundário</Rotulo>
            <TextInput
              double
              type='email'
              placeholder={this.state.newContract.Email_2}
              onChange={e => {
                this.setState({
                  newContract: {
                    ...this.state.newContract,
                    Email_2: e.target.value
                  }
                })
              }}
            />
          </Campo>
          <Campo className='camp'>
            <Rotulo>Telefone Secundário</Rotulo>
            <TextInput
              type='tel'
              placeholder={this.state.newContract.Contato2}
              onChange={e => {
                this.setState({
                  newContract: {
                    ...this.state.newContract,
                    Contato2: e.target.value
                  }
                })
              }}
              pattern="[0-9' ']+$"
            />
          </Campo>

          <Campo className='camp'>
            <Rotulo>Observação</Rotulo>
            <TextInput
              placeholder={this.state.newContract.Obs_Específica_Cliente}
              onChange={e => {
                this.setState({
                  newContract: {
                    ...this.state.newContract,
                    Obs_Específica_Cliente: e.target.value
                  }
                })
              }}
            />
          </Campo>
        </div>

        <div className='XAlign'>
          <GoBack />

          <Modal
            actions={[
              <ConfirmButton
                onClick={() => {
                  this.submit()
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
              <Button>
                Criar contrato
                <Icon left>add</Icon>
              </Button>
            }
          >
            <p>Confirmar dados e incluir contrato?</p>
          </Modal>
        </div>
      </Panel>
    )
  }
}

export default AddContrato
