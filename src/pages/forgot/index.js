import React from 'react'
import { api } from '../../services/api'
import { Toast, ToastyContainer } from '../../components/toasty'
import { Link } from 'react-router-dom'

import { TextInput, Button, Icon } from 'react-materialize'
import { Container, Box, Logo } from '../../components/commom_out'
import { FAILED_REQUEST } from '../../components/messages'
import Image from '../../assets/logo_sl.PNG'

export default class Forgot extends React.Component {
  state = {
    user_code: ''
  }

  async handleReset() {
    if (this.state.user_code === '') {
      Toast('Informe o código da sua filial')
    } else {
      Toast('...Aguarde')
      try {
        const response = await api.post('/forgot', {
          user_code: this.state.user_code
        })

        if (response.data === 200) {
          Toast('.Sua senha foi enviada para seu e-mail', 'success')
          setTimeout(() => {
            this.props.history.push('/')
          }, 3000)
        } else {
          throw Error
        }
      } catch (err) {
        Toast(FAILED_REQUEST, 'error')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }
    }
  }

  render() {
    return (
      <Container>
        <ToastyContainer />
        <Box>
          <Logo src={Image} alt='SLAPLIC WEB' />
          <TextInput
            style={{ fontSize: '20px', fontWeight: 'bold' }}
            label='Código de acesso'
            onChange={e => {
              this.setState({ user_code: e.target.value })
            }}
          />

          <Button
            tooltipOptions={{
              position: 'left'
            }}
            tooltip='Enviará sua senha para o seu email'
            style={{
              background: 'rgba(120,28,29,1)',
              marginTop: '10px',
              width: '200px'
            }}
            onClick={() => {
              this.handleReset()
            }}
          >
            <Icon left>lock_outline</Icon>
            Recuperar senha
          </Button>
          <Link to='/'>
            <Button
              style={{
                background: 'rgba(120,28,29,1)',
                marginTop: '10px',
                width: '200px'
              }}
            >
              <Icon left>arrow_back</Icon>
              Voltar
            </Button>
          </Link>
        </Box>
      </Container>
    )
  }
}
