import React from 'react'
import { api } from '../../services/api'

import Image from '../../assets/logo_fhd.jpg'
import { Container, Box, Logo } from '../../components/commom_out'
import { TextInput, Icon, Button } from 'react-materialize'
import { Toast, ToastyContainer } from "../../components/toasty";
import "../../style/form.css";
class Login extends React.Component {
  state = {
    user_code: '',
    password: '',
  }

  componentDidMount() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }

  async handleLogin() {
    try {
      const response = await api.post('/auth/', {
        user_code: this.state.user_code,
        password: this.state.password
      })

      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('usuario', response.data.nome)
        window.location.assign('/')
      } else {
        Toast('Dados de login incorretos ou inexistentes', 'error')
        localStorage.clear()
      }
    } catch (err) {
      console.log(err)
      Toast('Falha na conexão', 'error')
    }
  }
  render() {
    return (
      <Container>
        <ToastyContainer />
          <Box>
            <Logo src={Image} alt='Pilão professional' />
            <TextInput className='txt'
              style={{ fontSize: '20px', fontWeight: 'bold' }}
              label='Código de acesso'
              onChange={e => {
                this.setState({ user_code: e.target.value })
              }}
            />
            <TextInput className='txt'
              style={{ fontSize: '20px', fontWeight: 'bold' }}
              password
              label='Senha'
              onChange={e => {
                this.setState({
                  password: e.target.value
                })
              }}
            />
            <Button
            type="submit"
              style={{
                background: 'rgba(120,28,29,1)',
                marginBottom: '10px',
                width: '200px'
              }}
              onClick={() => {
                this.handleLogin()
              }}
            >
              <Icon left>input</Icon>
              Acessar
            </Button>

            <Button 
                  type="submit"
              style={{
                background: 'rgba(120,28,29,1)',
                marginBottom: '10px',
                width: '200px'
              }}
              onClick={() => {
                window.location.assign('/forgot')
              }}
            >
              <Icon left>lock_outline</Icon>
              Recuperar senha
            </Button>
          </Box>
      </Container>
    )
  }
}

export default Login
