import React from 'react'
import { Button, Icon } from 'react-materialize'
import {
  CONFIRM_BUTTON_COLOR,
  CANCEL_BUTTON_COLOR,
  SAFE_BUTTON_COLOR,
  GOBACK_BUTTON_COLOR
} from './colors'

//Botão que se desativa após pressionado, com aspecto de "confirmar(é verde)"
export const ConfirmButton = props => (
  <Button
    {...props}
    onClick={e => {
      e.target.disabled = true
      props.onClick(e)
    }}
    style={{
      backgroundColor: CONFIRM_BUTTON_COLOR,
      margin: '10px'
    }}
  >
    <Icon left>check</Icon>
    {props.children}
  </Button>
)

//Botão que se desativa após pressionado, com aspecto de "perigo(é vermelho)"
export const CancelButton = props => (
  <Button
    {...props}
    onClick={e => {
      e.target.disabled = true
      props.onClick(e)
    }}
    style={{
      backgroundColor: CANCEL_BUTTON_COLOR,
      margin: '10px 10px 10px 0px'
    }}
  >
    <Icon left>close</Icon>
    {props.children}
  </Button>
)

//Botão comum, mas tem aspecto de "segurança(é amarelo)"
export const SafeButton = props => (
  <Button
    {...props}
    onClick={e => {
      props.onClick(e)
    }}
    style={{ backgroundColor: SAFE_BUTTON_COLOR, margin: '10px' }}
  >
    {props.children}
  </Button>
)

//Volta pra última pagina sem perder histórico
export const GoBack = props => (
  <Button
    {...props}
    onClick={() => {
      window.history.back()
    }}
    style={{
      backgroundColor: GOBACK_BUTTON_COLOR,
      margin: '10px',
      color: '#000'
    }}
  >
    <Icon left>arrow_back</Icon>
    Voltar
  </Button>
)

//Só funciona para modal
export const CloseButton = props => (
  <Button
    modal='close'
    {...props}
    style={{ backgroundColor: GOBACK_BUTTON_COLOR, color: '#000' }}
  >
    <Icon left>close</Icon>
    Fechar
  </Button>
)
