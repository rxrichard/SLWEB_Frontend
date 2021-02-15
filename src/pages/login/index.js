import React from 'react'
import { api } from '../../services/api'
import { Link } from 'react-router-dom'

import Image from '../../assets/logo_sl.PNG'
import {
  Container,
  Box,
  Logo,
  LinkContainer
} from '../../components/commom_out'
import { TextInput, Icon, Button } from 'react-materialize'
import { Toast, ToastyContainer } from '../../components/toasty'
import { Go } from '../../components/commom_functions'

class Login extends React.Component {
  state = {
    user_code: '',
    password: ''
  }

  componentDidMount() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('usuario')
  }

  async handleLogin() {
    Toast('...Autenticando')

    try {
      const response = await api.post('/auth/', {
        user_code: this.state.user_code,
        password: this.state.password
      })

      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token)
        sessionStorage.setItem('usuario', response.data.nome)
        sessionStorage.setItem('role', response.data.role)
        window.location.assign('/')
      } else {
        Toast('Dados de login incorretos ou inexistentes', 'error')
        sessionStorage.clear()
      }
    } catch (err) {
      Toast('Falha na conexão', 'error')
    }
  }
  render() {
    return (
      <Container>
        <ToastyContainer />
        <Box>
          <Logo src={Image} alt='Pilão professional' />
          <TextInput
            className='txt'
            label='Filial'
            onChange={e => {
              e.target.value = e.target.value.toUpperCase()
              this.setState({ user_code: e.target.value })
            }}
          />
          <TextInput
            className='txt'
            password
            label='Senha'
            onChange={e => {
              this.setState({
                password: e.target.value
              })
            }}
          />
          <Button
            type='submit'
            style={{
              background: 'rgba(120,28,29,1)',
              marginTop: '2%',
              width: '200px'
            }}
            onClick={() => {
              this.handleLogin()
            }}
          >
            <Icon left>input</Icon>
            Acessar
          </Button>
          <Link to='/forgot'>
            <Button
              type='submit'
              style={{
                background: 'rgba(120,28,29,1)',
                marginTop: '2%',
                width: '200px'
              }}
            >
              <Icon left>lock_outline</Icon>
              Recuperar senha
            </Button>
          </Link>
        </Box>
        <Link to='/PILAO'>
          <LinkContainer>
            <Icon left>work</Icon>Internos
          </LinkContainer>
        </Link>
      </Container>
    )
  }
}

export default Login
