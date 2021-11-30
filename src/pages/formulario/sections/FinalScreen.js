import React from 'react';

import { Button, TextInput, Icon } from "react-materialize";

import Typography from '@material-ui/core/Typography';

export const End = (props) => {
  return (
    <>
      <div style={divAlinha}>
        <div style={{ ...divAlinha, marginTop: "10px" }}>
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
        <div style={{ ...divAlinha, marginTop: "10px" }}>
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
          <div style={{ ...divAlinha, marginTop: "10px" }}>
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

        <div style={{ ...divAlinha, marginTop: "10px" }}>
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
          onClick={(e) => {
            e.persist();
            this.handleRetriveWORD(e);
          }}
          tooltipMenuItems={{
            position: "top",
          }}
          tooltip="Se preferir, faça o download do formulário e abra com o Microsoft Word"
        >
          <Icon left>file_download</Icon>
          DOWNLOAD
        </Button>
      </div>
      <div style={{ ...divStyle, justifyContent: "flex-end" }}>
        <Button
          onClick={(e) => {
            e.persist();
            this.handleSubmit(e);
          }}
          tooltipMenuItems={{
            position: "top",
          }}
          tooltip="Confirmar e enviar à Pilão Professional"
        >
          <Icon left>send</Icon>Enviar
        </Button>
        
      </div>
    </>
  )
}

const divAlinha = {
  display: "flex",
  flex: "1",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const divStyle = {
  display: "Flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignContent: "center",
  alignItems: "center",
  marginBottom: "2%",
};

const labels = {
  all: "unset",
  fontSize: "1.20rem",
};