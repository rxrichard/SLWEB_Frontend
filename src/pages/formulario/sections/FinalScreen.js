import React from 'react';

import { TextInput, Icon } from "react-materialize";
import { CloudDownload } from '@material-ui/icons'


import {
  Typography,
  Button,
  MenuItem
} from '@material-ui/core/';
import Select from '../../../components/materialComponents/Select'

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

      <Typography
        gutterBottom
      >
        Indique se você recebeu assistência de um de nossos <strong>consultores</strong> para entender melhor a proposta da franquia.
      </Typography>
      <Select
        value={props.Form.Consultor}
        variant="outlined"
        onChange={(e) =>
          props.FormHandler({
            ...props.Form,
            Consultor: e.target.value,
          })}
        label="Consultor"
      >
        <MenuItem value='Alessandro'>Alessandro</MenuItem>
        <MenuItem value='Kauê'>Kauê</MenuItem>
        <MenuItem value='Priscila'>Priscila</MenuItem>
        <MenuItem value='Richard'>Richard</MenuItem>
        <MenuItem value='Tatiane'>Tatiane</MenuItem>
        <MenuItem value='Outros'>Outros</MenuItem>
      </Select>
      <Typography
        gutterBottom
        style={{ marginTop: "20px" }}
      >
        Caso encontre dificuldades ao enviar o formulário online, tente baixar o arquivo para edição no <strong>Microsoft Word</strong> e nos encaminhar por email.
      </Typography>
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