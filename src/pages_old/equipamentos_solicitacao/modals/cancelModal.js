import React from 'react'

import { Button, Icon } from 'react-materialize'
import { Toast } from '../../../components/toasty'
import { api } from '../../../services/api'

export default class CancelModal extends React.Component {
  state = {}

  async handleCancel() {
    try {
      const response = await api.delete('/equip', {
        params: {
          token: localStorage.getItem('token'),
          ID: this.props.del
        }
      })
      if (response.data === 200) {
        Toast('Solicitação cancelada com sucesso', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 5000)
      } else {
        throw Error
      }
    } catch (err) {
      Toast('Falha ao cancelar a solicitação', 'error')
    }
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <strong>
          Cancelando a solicitação você está abrindo mão de receber o conteudo
          da solicitação, porem, se gastos não reembolsaveis já haverem sido
          realizados pela Pilão Professional, encargos poderão ser aplicadaos.
        </strong>
        <Button
          node='button'
          style={{
            margin: '10px 0px 0px 50px',
            backgroundColor: '#FF2525'
          }}
          waves='light'
          onClick={() => {
            this.handleCancel()
          }}
        >
          Confirmar
          <Icon left>warning</Icon>
        </Button>
      </div>
    )
  }
}
