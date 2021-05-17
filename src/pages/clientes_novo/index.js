import React from 'react'
import { api } from '../../services/api'
import axios from 'axios'

import { TextInput, Button, Icon, Select, Modal } from 'react-materialize'
import { Toast, ToastyContainer } from '../../components/toasty'
import { Panel, Campo, Data, Combox, Tit } from '../../components/commom_in'
import { INCLUIR_CLIENTE_WARNING } from '../../components/messages'
import { ConfirmButton, GoBack, CloseButton } from '../../components/buttons'
import { dateCheck } from '../../components/commom_functions'

class AddCliente extends React.Component {
  state = {
    newUser: {
      GrpVen: '',
      CNPJn: '',
      A1_COD: '',
      A1_LOJA: '',
      CNPJ: '',
      A1_SATIV1: '',
      NIRE: '',
      FPAS: '',
      NIREDt: '',
      Razão_Social: '',
      Nome_Fantasia: '',
      CNPJss: '',
      IE: '',
      Contato_Empresa: '',
      Email: '',
      DDD: '',
      TPessoa: 'F',
      DtSolicita: dateCheck(),
      DtCadastro: '',
      Logradouro: '',
      Número: '',
      Complemento: '',
      CEP: '',
      Fone: '',
      Município: '',
      UF: '',
      Bairro: ''
    }
  }

  componentDidMount() {
    const dataAtual = document.querySelector('input[type="date"]')
    dataAtual.value = dateCheck()
  }

  async searchCNPJ(cnpj) {
    try {
      if (cnpj.length === 14) {
        const empresa = await axios.get(
          `https://cors-anywhere.herokuapp.com/www.receitaws.com.br/v1/cnpj/${cnpj}`
        )

        this.setState({
          newUser: {
            ...this.state.newUser,
            Razão_Social: empresa.data.nome,
            Nome_Fantasia: empresa.data.fantasia,
            Logradouro: empresa.data.logradouro,
            Número: empresa.data.numero,
            CEP: empresa.data.cep,
            Bairro: empresa.data.bairro,
            Município: empresa.data.municipio,
            UF: empresa.data.uf,
            Complemento: empresa.data.complemento,
            DDD: empresa.data.telefone.substring(1, 3),
            Fone: empresa.data.telefone.substring(5, 15),
            Email: empresa.data.email,
            TPessoa: 'J'
          }
        })

        const a = document.querySelectorAll('select')

        a[0].selectedIndex = 2
      }
    } catch (err) {
      return
    }
  }

  async handleAddCliente() {

    if (this.state.newUser.CNPJn === '') {
      Toast('Por favor, preencha o CNPJ / CPF do cliente')
      return
    }

    if (this.state.newUser.TPessoa === '') {
      Toast('Por favor, selecione o tipo de cliente')
      return
    }
    try {
      const response = await api.post('/client/new', {
        token: sessionStorage.getItem('token'),
        cliente: this.state.newUser
      })

      if (response.data === 200) {
        Toast('Cliente cadastrado com sucesso', 'success')
        setTimeout(() => {
          this.props.history.push('/clientes')
        }, 3000)
      } else {
        throw Error
      }
    } catch (err) {
      Toast('Falha ao cadastrar novo cliente', 'error')
      setTimeout(() => {
        this.props.history.push('/clientes')
      }, 3000)
    }
  }

  render() {
    return (
      <Panel>
        <ToastyContainer />
        <Tit className='titulo'>
          <label>Dados Gerais</label>
        </Tit>
        <Combox>
        <Campo className= "quad">
            <Select
              className='TIPO_PESSOA'
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, TPessoa: e.target.value }
                })
              }}
            >
              <option disabled hidden selected>
                Tipo de pessoa
              </option>
              <option value='F'>Física</option>
              <option value='J'>Jurídica</option>
              <option value='E'>Estrangeiro</option>
            </Select>
          </Campo>
          <Campo className= "quad">
            <TextInput
              label='CNPJ / CPF'
              onChange={e => {
                this.setState({
                  newUser: {
                    ...this.state.newUser,
                    CNPJn: e.target.value
                  }
                })
                this.searchCNPJ(e.target.value.replace(/([-,./])/g, ''))
              }}
            />
          </Campo>
          <Campo className= "quad">
            <TextInput
              disabled
              type='number'
              label='IE'
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, IE: e.target.value }
                })
              }}
            />
          </Campo>

          
          <Campo className= "oct">
            <TextInput
              label='Apelido (Opcional)'
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, codId: e.target.value }
                })
              }}
            />
          </Campo>
          <Campo className='twenty'>
            <TextInput
              disabled
              value={this.state.newUser.Razão_Social}
              label='Razão Social'
              onChange={e => {
                this.setState({
                  newUser: {
                    ...this.state.newUser,
                    Razão_Social: e.target.value
                  }
                })
              }}
            />
          </Campo>
          <Campo className='twenty'>
            <TextInput
              value={this.state.newUser.Nome_Fantasia}
              label='Nome Fantasia'
              onChange={e => {
                this.setState({
                  newUser: {
                    ...this.state.newUser,
                    Nome_Fantasia: e.target.value
                  }
                })
              }}
            />
          </Campo>
        </Combox>

        {/* endereco */}
        <Tit className='titulo'>
          <label>Endereço</label>
        </Tit>
        <Combox >
          <Campo className='triple'>
            <TextInput
              disabled
              value={this.state.newUser.CEP}
              label='CEP'
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, CEP: e.target.value }
                })
              }}
            />
          </Campo>
          <Campo className='six'>
            <TextInput
              disabled
              value={this.state.newUser.Município}
              label='Município'
              onChange={e => {
                this.setState({
                  newUser: {
                    ...this.state.newUser,
                    Município: e.target.value
                  }
                })
              }}
            />
          </Campo>
          <Campo className='double'>
            <TextInput
              disabled
              value={this.state.newUser.UF}
              label='UF'
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, UF: e.target.value }
                })
              }}
            />
          </Campo>

         
          <Campo className='oct'>
            <TextInput
              disabled
              value={this.state.newUser.Bairro}
              label='Bairro'
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, Bairro: e.target.value }
                })
              }}
            />
          </Campo>
          <Campo className='ehtn'>
            <TextInput
              disabled
              value={this.state.newUser.Logradouro}
              label='Logradouro'
              onChange={e => {
                this.setState({
                  newUser: {
                    ...this.state.newUser,
                    Logradouro: e.target.value
                  }
                })
              }}
            />
          </Campo>
          <Campo className='double'>
            <TextInput
              disabled
              value={this.state.newUser.Número}
              label='Número'
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, Número: e.target.value }
                })
              }}
            />
          </Campo>
           
          <Campo className='oct'>
            <TextInput
              disabled
              label='Complemento'
              value={this.state.newUser.Complemento}
              onChange={e => {
                this.setState({
                  newUser: {
                    ...this.state.newUser,
                    Complemento: e.target.value
                  }
                })
              }}
            />
          </Campo>
        </Combox>

        <Tit className='titulo'>
          <label>Contato</label>
        </Tit>
        <Combox className='t1'>
          <Campo className='oct'>
            <TextInput
              value={this.state.newUser.Contato_Empresa}
              label='Contato'
              onChange={e => {
                this.setState({
                  newUser: {
                    ...this.state.newUser,
                    Contato_Empresa: e.target.value
                  }
                })
              }}
            />
          </Campo>
          <Campo className='double'>
            <TextInput
              label='DDD'
              value={this.state.newUser.DDD}
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, DDD: e.target.value }
                })
              }}
            />
          </Campo>
          <Campo className='triple'>
            <TextInput
              label='Telefone'
              value={this.state.newUser.Fone}
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, Fone: e.target.value }
                })
              }}
            />
          </Campo>

          <Campo className='sntn'>
            <TextInput
              label='Email'
              value={this.state.newUser.Email}
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, Email: e.target.value }
                })
              }}
            />
          </Campo>
          <Campo disable>
            <Data type='date' value='' readOnly />
          </Campo>
        </Combox>

        <div className='XAlign'>
          <GoBack />

          <Modal
            actions={[
              <ConfirmButton
                onClick={() => {
                  this.handleAddCliente()
                }}
              >
                Confirmar
              </ConfirmButton>,
              <CloseButton />
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header='Aviso'
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
              startingTop: '25%'
            }}
            trigger={
              <Button node='button' className='btnModal'>
                Cadastrar<Icon left>add</Icon>
              </Button>
            }
          >
            <p>{INCLUIR_CLIENTE_WARNING}</p>
          </Modal>
        </div>
      </Panel>
    )
  }
}

export default AddCliente
