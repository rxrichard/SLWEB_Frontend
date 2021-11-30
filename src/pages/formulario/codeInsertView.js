import React from 'react'

import { Button, Icon } from "react-materialize";
import Typography from "@material-ui/core/Typography";

import Modal from "../../components/modal";
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

        <Modal
          actions={
            <Button
              style={{ marginRight: "10px" }}
              onClick={(e) => props.onCodeRequest(e)}
            >
              <Icon left>send</Icon>Solicitar
            </Button>
          }
          header="Solicitar código de acesso"
          trigger={
            <Button>
              Clique aqui
              <Icon right small>
                contact_mail
              </Icon>
            </Button>
          }
        >
          <Input
            style={{ width: '100%' }}
            onChange={(e) => props.onEmailChange(e)}
            label="Email"
          />
        </Modal>
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