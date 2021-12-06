import React from 'react'

import { ContactMail, LabelImportant } from '@material-ui/icons'
import { Typography, Button } from "@material-ui/core";

import Dialog from "../../components/materialComponents/Dialog";
import Input from "../../components/materialComponents/InputUnderline";

const CodeView = (props) => {
  return (
    <div style={divAlinha2}>
      <input
        onChange={(e) => {
          e.persist();
          props.onCodeInsertion(e.target.value, e);
        }}
        autoFocus={true}
        disabled={false}
        style={{
          all: "unset",
          textAlign: "center",
          border: "1px solid #000",
          borderRadius: "5px",
          padding: "10px",
          fontSize: "2vw",
        }}
        type="text"
        placeholder="Código de acesso"
      />
      <div className="YAlign" style={{ justifyContent: "center", alignItems: "center" }}>
        <Typography variant='h5' >Não possui um código?</Typography>

        <Dialog
          onOpen={() => props.onEmailChange('')}
          disabled={false}
          buttonStyle={{ marginTop: '8px' }}
          icone={<ContactMail />}
          botao='Clique aqui!'
          title='Solicitar acesso ao formulário'
          action={
            <Button
              variant="contained"
              color="primary"
              disabled={props.fetching}
              onClick={(e) => props.onCodeRequest(e)}
              startIcon={<LabelImportant />}
            >
              Solicitar
            </Button>
          }
        >
          <Input
            style={{ width: '100%' }}
            onChange={(e) => props.onEmailChange(e)}
            label="Email"
          />
        </Dialog>
      </div>
    </div>
  )
}

export default CodeView

const divAlinha2 = {
  display: "flex",
  flex: "1",
  flexDirection: "column",
  justifyContent: "space-between",
  alignContent: "center",
  alignItems: "center",
};