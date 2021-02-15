import React from 'react'
import { api } from '../../services/api'
import axios from 'axios'

import { TextInput, Button, Icon, Select, Modal } from 'react-materialize'
import { Toast, ToastyContainer } from '../../components/toasty'
import { Panel, Campo, Data, CB, Tit } from '../../components/commom_in'
import '../../style/cad.css'
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
      DtSolicita: new Date().toISOString(),
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
    dataAtual.value = new Date().toISOString().split('T')[0]
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
      }
    } catch (err) {
      return
    }
  }

  async handleAddCliente() {
    const token = localStorage.getItem('token')
    const cliente = this.state.newUser

    try {
      await api.post('/client/new', {
        token,
        cliente
      })
      Toast('Cliente cadastrado com sucesso', 'success')
      setTimeout(() => {
        window.location.assign('/clientes')
      }, 5000)
    } catch (err) {
      Toast('Falha ao cadastrar novo cliente', 'error')
      setTimeout(() => {
        window.location.assign('/clientes')
      }, 5000)
    }
  }

  render() {
    return (
      <Panel>
        <ToastyContainer />
        <Tit className='titulo'>
          <label>Dados Gerais</label>
        </Tit>
        <CB>
          <Campo>
            <TextInput
              type='number'
              label='CNPJ / CPF'
              onChange={e => {
                this.setState({
                  newUser: {
                    ...this.state.newUser,
                    CNPJn: e.target.value
                  }
                })
                this.searchCNPJ(e.target.value)
              }}
            />
          </Campo>
          <Campo>
            <TextInput
              type='number'
              label='IE'
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, IE: e.target.value }
                })
              }}
            />
          </Campo>

          <Campo>
            <Select
              disable
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, TPessoa: e.target.value }
                })
              }}
            >
              <option value='F'>Física</option>
              <option value='J'>Jurídica</option>
              <option value='E'>Estrangeiro</option>
            </Select>
          </Campo>
          <Campo>
            <TextInput
              label='Codigo(Opcional)'
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, codId: e.target.value }
                })
              }}
            />
          </Campo>
          <Campo className='quad'>
            <TextInput
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
          <Campo className='quad'>
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
        </CB>

        {/* endereco */}
        <Tit className='titulo'>
          <label>Endereço</label>
        </Tit>
        <CB>
          <Campo className='cep'>
            <TextInput
              type='number'
              value={this.state.newUser.CEP}
              label='CEP'
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, CEP: e.target.value }
                })
              }}
            />
          </Campo>
          <Campo className='double'>
            <TextInput
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
          <Campo>
            <TextInput
              value={this.state.newUser.UF}
              label='UF'
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, UF: e.target.value }
                })
              }}
            />
          </Campo>

          <Campo className='quad'>
            <TextInput
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
              value={this.state.newUser.Bairro}
              label='Bairro'
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, Bairro: e.target.value }
                })
              }}
            />
          </Campo>
          <Campo>
            <TextInput
              value={this.state.newUser.Número}
              label='Número'
              onChange={e => {
                this.setState({
                  newUser: { ...this.state.newUser, Número: e.target.value }
                })
              }}
            />
          </Campo>
          <Campo>
            <TextInput
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
        </CB>
        <Tit className='titulo'>
          <label>Contato</label>
        </Tit>
        <CB className='t1'>
          <Campo>
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
          <Campo>
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
          <Campo>
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

          <Campo className='triple'>
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
        </CB>
        <buttonFooter>
          <Button
            onClick={() => {
              window.location.assign('/clientes')
            }}
            node='button'
            style={{
              marginRight: '5px'
            }}
            waves='light'
          >
            Voltar
            <Icon left>arrow_back</Icon>
          </Button>
          <Modal
            actions={[
              <Button
                node='button'
                waves='light'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  this.handleAddCliente()
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
            header='Aviso'
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
              startingTop: '25%'
            }}
            trigger={
              <Button node='button' className='btnModal'>
                Cadastrar<Icon left>add</Icon>
              </Button>
            }
          >
            <p>
              Após confirmar o cadastro, os dados ainda precisarão ser validados
              pela Pilão Professional, para evitar qualquer incoveniente, emitir
              qualquer NF para esse novo cliente por pelo menos 24hrs.
            </p>
          </Modal>
        </buttonFooter>
      </Panel>
    )
  }
}

export default AddCliente
