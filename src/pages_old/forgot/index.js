import React from 'react'
import { api } from '../../services/api'
import { Toast, ToastyContainer } from '../../components/toasty'

import { TextInput, Button, Icon } from 'react-materialize'
import { Container, Box, Logo } from '../../components/commom_out'

import Image from '../../assets/logo_sl.PNG'

export default class Forgot extends React.Component {
  state = {
    email: '',
    user_code: '',
    password: '',
    confirmation: '',
    tentativas: 0,

    reset: null
  }

  async handleReset() {
    if (
      this.state.password !== this.state.confirmation &&
      this.state.password !== '' &&
      this.state.confirmation !== ''
    ) {
      Toast('Senhas divergem', 'error')
      return
    } else if (this.state.password === '' || this.state.confirmation === '') {
      Toast('Senhas não podem ser nulas', 'error')
      return
    } else {
      try {
        const response = await api.post('/forgot', {
          user_code: this.state.user_code,
          newPassword: this.state.password,
          confirmation: this.state.confirmation
        })
        this.setState({ reset: response.data })
      } catch (err) {
        Toast('Erro ao estabelecer conexão com o servidor', 'error')
        setTimeout(() => {
          window.location.reload()
        }, 5000)
      }
    }
  }

  convertToInt(code) {
    if (isNaN(code)) {
      this.setState({ invalid: 'O código só deve conter numeros' })
    } else {
      this.setState({ user_code: parseInt(code) })
      this.setState({ invalid: '' })
    }
  }

  render() {
    return (
      <Container>
        <ToastyContainer />
        <Box>
          <Logo src={Image} alt='Pilão professional' />
          <TextInput
            style={{ fontSize: '20px', fontWeight: 'bold' }}
            label='Código de acesso'
            onChange={e => {
              this.convertToInt(e.target.value)
            }}
          />
          <TextInput
            style={{ fontSize: '20px', fontWeight: 'bold' }}
            password
            label='Nova senha'
            onChange={e => {
              this.setState({ password: e.target.value })
            }}
          />
          <TextInput
            style={{ fontSize: '20px', fontWeight: 'bold' }}
            password
            label='Confirmação da senha'
            onChange={e => {
              this.setState({ confirmation: e.target.value })
            }}
          />

          <Button
            style={{
              background: 'rgba(120,28,29,1)',
              marginBottom: '10px',
              width: '200px'
            }}
            onClick={() => {
              this.handleReset()
            }}
          >
            <Icon left>lock_outline</Icon>
            Redefinir senha
          </Button>
        </Box>
      </Container>
    )
  }
}
