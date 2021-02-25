import React, { Component } from 'react'
import { api } from '../../services/api'
import { Link } from 'react-router-dom'

import Image from '../../assets/logo_sl.PNG'
import { Button, Icon, TextInput, Modal } from 'react-materialize'
import { Toast, ToastyContainer } from '../../components/toasty'
import {
  Container,
  Box,
  Logo,
  LinkContainer
} from '../../components/commom_out'
import { Bright } from '../../components/commom_functions'
import { CloseButton } from '../../components/buttons'

export default class LoginADM extends Component {
  state = {
    adm_code: null,
    adm_password: null,
    validADM: false,
    usersList: [],
    usersListFiltered: [],
    user_code: null,
    user_name: null
  }

  async handleAttempt() {
    if (
      this.state.adm_code !== null &&
      this.state.adm_password !== null
    ) {
      Toast('Aguarde')
      try {
        const response = await api.get('/admAuth', {
          params: {
            admin_code: this.state.adm_code,
            admin_password: this.state.adm_password
          }
        })
        if (response.status === 401) throw Error
        Toast('Autenticado', 'success')
        this.setState({ usersList: response.data, usersListFiltered: response.data, validADM: true })
      } catch (err) {
        Toast('Falha na autenticação', 'error')
        this.setState({ validADM: false })
      }
    } else {
      Toast('Preencha todos os campo')
    }
  }

  async handleLogin() {
    try {
      const response = await api.post('/admAuth', {
        admin_code: this.state.adm_code,
        admin_password: this.state.adm_password,
        user_code: this.state.user_code
      })

      if (typeof response.data != 'object') throw Error

      sessionStorage.setItem('token', response.data.token)
      sessionStorage.setItem('role', response.data.role)
      sessionStorage.setItem('usuario', response.data.nome)

      window.location.assign('/')
    } catch (err) {
      Toast('Falha ao realizar o login', 'error')
    }
  }

  handleFilter(value, event) {
    this.setState({ usersListFiltered: this.state.usersList })

    if (value === '') {
      this.setState({ usersListFiltered: this.state.usersList })
      return
    }

    if (value.length > 4) {
      event.target.value = value.slice(0, 4)
      return
    }

    this.setState({ usersListFiltered: this.state.usersList })
    let aux = []
    let newArray = []
    aux = this.state.usersList
    
    for (let i = 0; i < aux.length; i++) {
      if (aux[i].M0_CODFIL.slice(0, value.length) === value) {
        newArray.push(aux[i])
      }
    }
    
    this.setState({ usersListFiltered: newArray })
  }

  render() {
    return (
      <Container>
        <ToastyContainer />
        <Box>
          <Logo src={Image} alt='Pilão professional' />
          <TextInput
            className='txt'
            onChange={e => {
              this.setState({ adm_code: e.target.value, validADM: false })
            }}
            label='Código de administrador'
          />
          <TextInput
            className='txt'
            password
            onChange={e => {
              this.setState({ adm_password: e.target.value, validADM: false })
            }}
            label='Senha de administrador'
          />

          <Button
            style={{ margin: '10px' }}
            onClick={() => this.handleAttempt()}
          >
            <Icon left>cast</Icon>Validar Credenciais
          </Button>

          <Modal
            actions={[
              <input onChange={e => this.handleFilter(e.target.value, e)} type='text' style={{ width: '50px' }} placeholder='Filial...' />,
              <Button
                style={{ margin: '10px' }}
                disabled={this.state.user_code === null ? true : false}
                onClick={() => this.handleLogin()}
              >
                Acessar
                <Icon left>lock_outline</Icon>
              </Button>,
              <CloseButton />
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header={
              this.state.user_name !== null
                ? `Franqueado: ${this.state.user_name}`
                : 'Escolher Filial'
            }
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
                style={{ margin: '10px' }}
                disabled={!this.state.validADM}
              >
                Selecionar Franqueado<Icon left>person</Icon>
              </Button>
            }
          >
            <div
              className='tableFixHead'
              style={{
                height: '50vh',
                width: '100%'
              }}
            >
              <table>
                <thead>
                  <tr>
                    <th>Nº</th>
                    <th>Filial</th>
                    <th>Franqueado</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.usersListFiltered.map((user, i) => (
                    <tr
                      className='Item'
                      onClick={e => {
                        this.setState({
                          user_code: user.M0_CODFIL,
                          user_name: user.GrupoVenda
                        })

                        Bright(e)
                      }}
                      key={user.M0_CODFIL}
                      value={i}
                    >
                      <td>{i + 1}</td>
                      <td>{user.M0_CODFIL}</td>
                      <td>{user.GrupoVenda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal>
        </Box>
        <Link to='/'>
          <LinkContainer>
            <Icon left>tag_faces</Icon>Franqueados
          </LinkContainer>
        </Link>
      </Container>
    )
  }
}
