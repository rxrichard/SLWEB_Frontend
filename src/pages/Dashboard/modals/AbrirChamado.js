import React from "react";
import Draggable from "react-draggable";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper

} from '@material-ui/core';
import TextField from '../../../components/materialComponents/InputUnderline'
import { toValidString } from '../../../misc/commom_functions'
import InputPhone from '../../../components/materialComponents/inputPhoneNumber'

function ModalPersonalizado(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {props.title}
        </DialogTitle>

        <DialogContent>
          <div className="YAlign">
            <div
              className="XAlign"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <TextField
                style={{ margin: "0px 8px 8px 0px" }}
                value={toValidString(props.Details.Email)}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={(value) => props.onChangeDetails((oldState) => {
                  return { ...oldState, Email: value }
                })}
              />
              <InputPhone
                onChange={
                  (e) => props.onChangeDetails((oldState) => {
                    return { ...oldState, Telefone: e.target.value }
                  })
                }
                value={toValidString(props.Details.Telefone)}
                style={{ margin: "0px 0px 8px 0px" }}
                label="Telefone"
              />
            </div>

            <div
              className="XAlign"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <TextField
                style={{ margin: "0px 0px 8px 0px", width: "100%" }}
                value={toValidString(props.Details.Endereco.Logradouro)}
                id="outlined-basic"
                label="Logradouro"
                variant="outlined"
                onChange={(value) => props.onChangeDetails((oldState) => {
                  return { ...oldState, Endereco: { ...oldState.Endereco, Logradouro: value } }
                })}
              />
            </div>

            <div
              className="XAlign"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <TextField
                style={{ margin: "0px 8px 8px 0px" }}
                value={toValidString(props.Details.Endereco.Numero)}
                id="outlined-basic"
                label="Numero"
                variant="outlined"
                onChange={(value) => props.onChangeDetails((oldState) => {
                  return { ...oldState, Endereco: { ...oldState.Endereco, Numero: value } }
                })}
              />
              <TextField
                style={{ margin: "0px 0px 8px 0px" }}
                value={toValidString(props.Details.Endereco.Bairro)}
                id="outlined-basic"
                label="Bairro"
                variant="outlined"
                onChange={(value) => props.onChangeDetails((oldState) => {
                  return { ...oldState, Endereco: { ...oldState.Endereco, Bairro: value } }
                })}
              />

            </div>

            <div
              className="XAlign"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <TextField
                style={{ margin: "0px 8px 8px 0px" }}
                value={toValidString(props.Details.Endereco.Complemento)}
                id="outlined-basic"
                label="Complemento"
                variant="outlined"
                onChange={(value) => props.onChangeDetails((oldState) => {
                  return { ...oldState, Endereco: { ...oldState.Endereco, Complemento: value } }
                })}
              />
              <TextField
                style={{ margin: "0px 0px 8px 0px" }}
                value={toValidString(props.Details.Endereco.Cidade)}
                id="outlined-basic"
                label="Cidade"
                variant="outlined"
                onChange={(value) => props.onChangeDetails((oldState) => {
                  return { ...oldState, Endereco: { ...oldState.Endereco, Cidade: value } }
                })}
              />

            </div>

            <div
              className="XAlign"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <TextField
                style={{ margin: "0px 8px 8px 0px" }}
                value={toValidString(props.Details.Endereco.UF)}
                id="outlined-basic"
                label="UF"
                variant="outlined"
                onChange={(value) => props.onChangeDetails((oldState) => {
                  return { ...oldState, Endereco: { ...oldState.Endereco, UF: value } }
                })}
              />
              <TextField
                style={{ margin: "0px 0px 8px 0px" }}
                value={toValidString(props.Details.Endereco.CEP)}
                id="outlined-basic"
                label="CEP"
                variant="outlined"
                onChange={(value) => props.onChangeDetails((oldState) => {
                  return { ...oldState, Endereco: { ...oldState.Endereco, CEP: value } }
                })}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions style={{ padding: '8px 24px' }}>
          {props.action}
          <Button
            onClick={props.onClose}
            color="secondary"
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalPersonalizado;

function PaperComponent(props) {
  return (
    <Draggable
      {...props}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
