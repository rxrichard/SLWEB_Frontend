import React from 'react';

import { TextInput, Icon } from "react-materialize";
import { Button } from '@material-ui/core'
import { CloudDownload } from '@material-ui/icons'


import Typography from '@material-ui/core/Typography';

export const End = (props) => {
  return (
    <div style={divBorder}>
      <div style={{ ...divAlinha, marginBottom: "10px" }}>
        <label style={labels}>
          Comprovante de disponibilidade do capital declarado
        </label>
        <TextInput
          className="files"
          type="file"
          name="upload"
          accept="application/pdf,image/png, image/jpeg"
          label={<Icon>attach_file</Icon>}
        />
      </div>
      <div style={{ ...divAlinha, marginBottom: "10px" }}>
        <label style={labels}>
          Cópias do CPF e RG de quem está apresentando o questionário
        </label>
        <TextInput
          multiple
          className="files"
          type="file"
          name="upload"
          accept="application/pdf,image/png, image/jpeg"
          label={<Icon>attach_file</Icon>}
        />
      </div>
      {props.Form.Est_Civil < 4 &&
        props.Form.Est_Civil !== null ? (
        <div style={{ ...divAlinha, marginBottom: "10px" }}>
          <label style={labels}>
            Cópias do CPF e RG do(a) cônjuge ou semelhante
          </label>
          <TextInput
            multiple
            className="files"
            type="file"
            name="upload"
            accept="application/pdf,image/png, image/jpeg"
            label={<Icon>attach_file</Icon>}
          />
        </div>
      ) : null}

      <div style={{ ...divAlinha, marginBottom: "30px" }}>
        <label style={labels}>
          Cópia e da última declaração de imposto de renda
        </label>
        <TextInput
          className="files"
          type="file"
          name="upload"
          accept="application/pdf,image/png, image/jpeg"
          label={<Icon>attach_file</Icon>}
        />
      </div>
      <Typography>Caso encontre dificuldades ao enviar o formulário, tente baixar o arquivo para edição no Microsoft Word</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => {
          e.persist();
          props.onRequestWord(e);
        }}
        startIcon={<CloudDownload />}
      >
        DOWNLOAD
      </Button>
    </div>
  )
}

const divBorder = {
  display: "flex",
  padding: "10px 10px 10px 10px",
  marginBottom: "10px",
  width: "100%",
  flexDirection: "column",
  border: "1px solid #c1c1c1",
  borderRadius: "1vw",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const divAlinha = {
  display: "flex",
  flex: "1",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const labels = {
  all: "unset",
  fontSize: "1.20rem",
};