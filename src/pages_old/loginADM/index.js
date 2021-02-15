import React, { Component } from 'react'
import { api } from '../../services/api'

import Image from '../../assets/logo_sl.PNG'
import { Select, Button, Icon, TextInput } from 'react-materialize'
import { Toast, ToastyContainer } from '../../components/toasty'
import { Container, Box, Logo } from '../../components/commom_out'

export default class LoginADM extends Component {
  state = {
    adm_code: '',
    adm_password: '',
    validADM: false,
    usersList: [],
    user_code: ''
  }

  async verifyInputs(value, state) {
    if (value === null || value === undefined || value === '') return

    switch (state) {
      case 'adm':
        this.setState({ adm_code: value })
        break
      case 'password':
        this.setState({ adm_password: value })
        break
      case 'user':
        this.setState({ user_code: this.state.usersList[value].M0_CODFIL })
        break

      default:
        break
    }
    this.allSet()
  }

  async allSet() {
    if (this.state.adm_code !== '' && this.state.adm_password !== '') {
      try {
        // const response = await api.get('admAuth', {
        //   params: {
        //     admin_code: this.state.adm_code,
        //     admin_password: this.state.adm_password
        //   }
        // })

        // if (typeof response.data !== Array) throw Error
        // if (response.data.length() === 0) throw Error

        // this.setState({ usersList: response.data, validADM: true })
        this.setState({ validADM: true })
      } catch (err) {
        Toast('Falha ao comunicar com o servidor', 'error')
      }
    }
  }

  async handleLogin() {
    try {
        const response = await api.post('/', {
          adm_code: this.state.adm_code,
          adm_password: this.state.adm_password,
          user_code: this.state.user_code
        })
  
        localStorage.setItem('token', response.data)
      } catch (err) {}
  }

  render() {
    return (
      <Container>
        <ToastyContainer />
        <Box>
          <Logo src={Image} alt='Pilão professional' />
          <TextInput
            onChange={e => {
              this.verifyInputs(e.target.value, 'adm')
            }}
            label='Código de administrador'
          />
          <TextInput
            onChange={e => {
              this.verifyInputs(e.target.value, 'password')
            }}
            label='Senha de administrador'
          />
          {this.state.validADM ? (
            <>
              <Select
                onChange={e => {
                  this.verifyInputs(e.target.value, 'user')
                }}
              ><option value={null}>Selecione o franqueado</option>
                {this.state.usersList.map((user, i) => (
                  <option key={user.M0_CODFIL} value={i}>
                    {user.Grupo_Venda}
                  </option>
                ))}
              </Select>

              <Button 
              style={{ marginBottom: '10px'}}
              onClick={() => this.handleLogin()}>
                <Icon left>add</Icon>Login
              </Button>
            </>
          ) : null}
        </Box>
      </Container>
    )
  }
}
