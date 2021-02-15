import React from 'react'
import { api } from '../../services/api'

import { Panel } from '../../components/commom_in'
import {
  maskCNPJ,
  maskCEP,
  valueCheck
} from '../../components/commom_functions'
import { Toast, ToastyContainer } from '../../components/toasty'
import { Card, Icon, Button, Modal, TextInput } from 'react-materialize'
import { FAILED_REQUEST } from '../../components/messages'
import Loading from '../../components/loading_screen'
import { CloseButton, ConfirmButton } from '../../components/buttons'

class Perfil extends React.Component {
  state = {
    info: {},
    password: {},
    newEmail: null,
    newTaxa: {},
    loaded: false
  }

  async componentDidMount() {
    try {
      const response = await api.get('/profile', {
        params: {
          token: sessionStorage.getItem('token')
        }
      })

      if (response.data === 400) throw Error

      this.setState({
        info: response.data,
        loaded: true,
        newTaxa: { tipo: response.data.ParamTxt, valor: response.data.ParamVlr }
      })
    } catch (err) {
      Toast(FAILED_REQUEST, 'error')
    }
  }

  async handleChangePassword() {
    try {
      const response = await api.put('/profile/password', {
        token: sessionStorage.getItem('token'),
        password: this.state.password
      })

      switch (response.data) {
        case 409:
          Toast('A nova senha diverge da confirmação', 'error')
          break
        case 406:
          Toast('A senha deve possuir no máximo seis caractéres', 'error')
          break
        case 405:
          Toast('A senha atual não está correta', 'error')
          break
        case 304:
          Toast('Nova senha e atual são identicas', 'error')
          break
        case 400:
          Toast(
            'Não foi possivel alterar sua senha, contate o suporte',
            'error'
          )
          break
        default:
          Toast('Senha atualizada com sucesso', 'success')
          break
      }
    } catch (err) {
      Toast(FAILED_REQUEST, 'error')
    }
  }

  async handleChangeEmail() {
    try {
      const response = await api.put('/profile/email', {
        token: sessionStorage.getItem('token'),
        email: this.state.newEmail
      })

      if (response.data === 400) throw Error
      console.log(response.data)
      Toast('Email atualizado com sucesso', 'success')
    } catch (err) {
      Toast(FAILED_REQUEST, 'error')
    }
  }

  async handleChangeTax() {
    try {
      const response = await api.put('/profile/tax', {
        token: sessionStorage.getItem('token'),
        newTax: this.state.newTaxa
      })

      if (response.data === 400) throw Error

    } catch (err) {
      Toast(FAILED_REQUEST, 'error')
    }
  }

  wichColor() {
    if (
      typeof this.state.password.nova == 'undefined' ||
      this.state.password.nova === '' ||
      typeof this.state.password.confirmacao == 'undefined' ||
      this.state.password.confirmacao === ''
    )
      return '1px solid #9e9e9e'
    if (this.state.password.nova === this.state.password.confirmacao)
      return '1px solid green'
    if (this.state.password.nova !== this.state.password.confirmacao)
      return '1px solid red'
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Panel>
        <ToastyContainer />
        <div
          className='XAlign'
          style={{ justifyContent: 'space-evenly', flexWrap: 'wrap' }}
        >
          <Card
            actions={[
              <Button className='modal-trigger' href='#newPassword'>
                <Icon left>vpn_key</Icon>Alterar senha
              </Button>
            ]}
            className='blue-grey darken-1'
            textClassName='white-text'
            title={this.state.info.M0_FILIAL[0]}
          >
            <p>CNPJ: {maskCNPJ(this.state.info.M0_CGC[0])}</p>
            <p>FILIAL: {this.state.info.Dominio}</p>
            <p>IE: {this.state.info.M0_INSC}</p>
            <p>NIRE: {this.state.info.M0_NIRE}</p>
            <p>CNAE: {this.state.info.M0_CNAE}</p>
            <p>FPAS: {this.state.info.M0_FPAS}</p>
            <p>Natureza Jurídica: {this.state.info.M0_NATJUR}</p>
          </Card>

          <Card
            actions={[
              <Button className='modal-trigger' href='#newEmail'>
                <Icon left>email</Icon>Alterar email
              </Button>
            ]}
            className='blue-grey darken-1'
            textClassName='white-text'
            title='CONTATO'
          >
            <p>Email: {this.state.info.Email.trim()}</p>
            <p>Endereço: {this.state.info.M0_ENDCOB}</p>
            <p>CEP: {maskCEP(this.state.info.M0_CEPCOB)}</p>
            <p>Estado: {this.state.info.M0_ESTCOB}</p>
            <p>Município: {this.state.info.M0_CIDCOB}</p>
          </Card>

          <Card
            actions={[
              <Button
                onClick={() => this.handleChangeTax()}
                disabled={
                  this.state.info.ParamTxt !== this.state.newTaxa.tipo ||
                  this.state.info.ParamVlr !== this.state.newTaxa.valor
                    ? false
                    : true
                }
              >
                Salvar<Icon left>save</Icon>
              </Button>
            ]}
            className='blue-grey darken-1'
            textClassName='white-text'
            title='TAXAS'
          >
            <label>TIPO</label>
            <select
              onChange={e => {
                this.setState({ newTaxa: { tipo: e.target.value, valor: 0 } })
                const i = document.querySelectorAll('input')

                i[0].value = ''
              }}
              style={{ display: 'inline' }}
              defaultValue={this.state.info.ParamTxt}
            >
              <option value='PERCENTUAL'>Imposto</option>
              <option value='VALOR FIXO'>Valor fixo</option>
            </select>
            <TextInput
              onChange={e => {
                e.target.value = valueCheck(e.target.value, e)

                this.setState({
                  newTaxa: { ...this.state.newTaxa, valor: e.target.value }
                })
              }}
              icon={<Icon left>attach_money</Icon>}
              placeholder={
                this.state.newTaxa.tipo === 'PERCENTUAL'
                  ? `${parseFloat(this.state.newTaxa.valor) * 100}%`
                  : `R$ ${this.state.newTaxa.valor}`
              }
            />
          </Card>
        </div>

        <Modal
          actions={[
            <ConfirmButton
              disabled={
                typeof this.state.password.atual != 'undefined' &&
                typeof this.state.password.nova != 'undefined' &&
                typeof this.state.password.confirmacao != 'undefined' &&
                this.state.password.atual !== '' &&
                this.state.password.nova !== '' &&
                this.state.password.confirmacao !== ''
                  ? false
                  : true
              }
              onClick={() => this.handleChangePassword()}
            >
              Salvar senha
            </ConfirmButton>,
            <CloseButton />
          ]}
          bottomSheet={false}
          fixedFooter={false}
          header='Trocar senha'
          id='newPassword'
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
        >
          <TextInput
            password
            data-length={6}
            label='Senha atual'
            onChange={e =>
              this.setState({
                password: { ...this.state.password, atual: e.target.value }
              })
            }
          />
          <TextInput
            password
            style={{
              borderBottom: this.wichColor()
            }}
            data-length={6}
            label='Nova senha'
            onChange={e =>
              this.setState({
                password: { ...this.state.password, nova: e.target.value }
              })
            }
          />
          <TextInput
            password
            style={{
              borderBottom: this.wichColor()
            }}
            data-length={6}
            label='Confirmar nova senha'
            onChange={e =>
              this.setState({
                password: {
                  ...this.state.password,
                  confirmacao: e.target.value
                }
              })
            }
          />
        </Modal>

        <Modal
          actions={[
            <ConfirmButton
              disabled={
                typeof this.state.newEmail != 'undefined' &&
                this.state.newEmail !== '' &&
                this.state.newEmail !== null
                  ? false
                  : true
              }
              onClick={() => this.handleChangeEmail()}
            >
              Atualizar email
            </ConfirmButton>,
            <CloseButton />
          ]}
          bottomSheet={false}
          fixedFooter={false}
          header='Email para recebimento de NF'
          id='newEmail'
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
        >
          <TextInput
            email
            validate
            placeholder={`Atual: ${this.state.info.Email.trim()}`}
            onChange={e => this.setState({ newEmail: e.target.value })}
          />
        </Modal>
      </Panel>
    )
  }
}

export default Perfil
