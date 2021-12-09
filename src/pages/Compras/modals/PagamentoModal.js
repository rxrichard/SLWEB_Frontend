import React, { useState, useEffect } from 'react';
import Draggable from "react-draggable";

import { Close, Receipt, Check } from "@material-ui/icons";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grow,
  Paper,
  Typography,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox
} from "@material-ui/core/";
import { Icon } from "react-materialize";

import NewFileInput from '../../../components/FileInput'
import { Toast } from '../../../components/toasty'

function ContasModal(props) {
  const [confirmDuplicatas, setConfirmDuplicatas] = useState([])
  const [fileNames, setFileNames] = useState([])
  const [fetching, setFetching] = useState(false)

  const handleSubmit = async () => {
    setFetching(true)
    const arquivos = getFiles()
    const formData = makeFormData(arquivos)

    //verificar se o cara marcou alguma duplicata
    if (confirmDuplicatas.length === 0) {
      Toast('Selecione pelo menos uma duplicata a ser compensada', 'warn')
      setFetching(false)
      return
    }

    //verificar se o cara escolheu algum arquivo
    if (formData.getAll('formData').length < 1) {
      Toast('Anexe pelo menos um arquivo de imagem ou PDF que comprove o pagamento da duplicata', 'warn')
      setFetching(false)
      return
    }

    try {


      //se tudo der certo eu recarrego a pagina ou atualizo o state Dupliacatas(se não der mto trabalho)
      //zerar os inputs depois de enviar os arquivos
      for (let i = 0; i < arquivos.length; i++) {
        arquivos[i].value = null
      }
      setFetching(false)
      setConfirmDuplicatas([])
      getFileNames(makeFormData(getFiles()))
    } catch (err) {
      setFetching(false)
    }
  }

  const handleClickDuplicata = (NumNFE, checked) => {
    if (checked && confirmDuplicatas.indexOf(NumNFE) === -1) {
      setConfirmDuplicatas([...confirmDuplicatas, NumNFE])
      return
    } else if (!checked && confirmDuplicatas.indexOf(NumNFE) !== -1) {
      setConfirmDuplicatas(confirmDuplicatas.filter(duplicata => duplicata !== NumNFE))
      return
    } else {
      setConfirmDuplicatas([])
    }
  }

  const getFiles = () => {
    //Pega todos inputs do tipo arquivos
    const arquivos = document.getElementsByClassName("files");

    return arquivos
  }

  const makeFormData = (htmlFileCollection) => {
    //cria um objeto do tipo formulario
    const formData = new FormData();

    //poe o conteudo de todos os inputs do tipo arquivo dentro do mesmo formulario
    for (let j = 0; j < htmlFileCollection.length; j++) {
      for (let i = 0; i < htmlFileCollection[j].files.length; i++) {
        formData.append(`formData`, htmlFileCollection[j].files[i]);
      }
    }

    return formData
  }

  const getFileNames = (FormData) => {
    let aux = []
    for (let i = 0; i < FormData.getAll('formData').length; i++) {
      aux.push(FormData.getAll('formData')[i].name)
    }
    setFileNames(aux)
  }

  const handleClose = () => {
    props.onClose()
    setFileNames([])
    setConfirmDuplicatas([])
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      TransitionComponent={Transition}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        <div className='XAlign' style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
          <Receipt />
          Agilizar pagamento(s)
        </div>
      </DialogTitle>
      <DialogContent>
        <div className='YAlign'>
          <Typography
            variant='body1'
            gutterBottom
          >
            Caso o pagamento de alguma duplicata esteja levando muito tempo para ser confirmado pelo sistema, nos envie o comprovante de pagamento.
          </Typography>
          <div
            className='XAlign'
            style={{
              alignItems: 'flex-start',
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px dashed #CCC',
              justifyContent: 'space-evenly'
            }}
          >
            <div
              className='YAlign'
              style={{
                width: '100%',
                flex: 'unset',
                maxWidth: '250px'
              }}
            >
              <Typography variant='body1'>
                <strong>Selecione o(s) comprovante(s)</strong>
              </Typography>
              <NewFileInput
                ContainerStyle={{
                  display: 'flex',
                  flexDirection: "column",
                  height: '100%',
                  width: '80%',
                }}
                onChange={() => getFileNames(makeFormData(getFiles()))}
                multiple
                name="upload"
                accept="application/pdf,image/png, image/jpeg"
                label={
                  <div className="XAlign">
                    <Icon>attach_file</Icon>
                    UPLOAD
                  </div>
                }
              />
              <ul style={{ listStyleType: 'disclosure-closed', paddingLeft: '16px' }}>
                {fileNames.map(filename => (
                  <li style={{ listStyleType: 'disclosure-closed' }}>
                    <Typography variant='subtitle1'>
                      {filename}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className='XAlign'
              style={{
                maxWidth: '250px'
              }}
            >
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  style={{
                    paddingTop: '4px'
                  }}
                >
                  <strong>
                    Selecione a(s) duplicata(s) paga(s)
                  </strong>
                </FormLabel>
                <FormGroup>
                  {props.duplicatas.map((duplicata) => (
                    <FormControlLabel
                      key={duplicata.E1_NUM}
                      control={
                        <Checkbox
                          style={{
                            transform: 'scale(0.3)'
                          }}
                          checked={confirmDuplicatas.indexOf(duplicata.E1_NUM) !== -1}
                          onChange={e => handleClickDuplicata(e.target.value, e.target.checked)}
                          name={duplicata.E1_NUM}
                          value={duplicata.E1_NUM}
                        />
                      }
                      label={`${duplicata.E1_NUM} (R$ ${duplicata.E1_VALOR})`}
                    />
                  ))}
                </FormGroup>
                <FormHelperText>*Seleciona apenas as quais o comprovante se refere</FormHelperText>
              </FormControl>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions style={{ padding: '8px 24px' }}>
        <Button
          color="primary"
          onClick={() => handleSubmit()}
          startIcon={<Check />}
          disabled={fetching}
        >
          Enviar
        </Button>
        <Button
          color="secondary"
          onClick={handleClose}
          startIcon={<Close />}
          disabled={fetching}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContasModal;

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper
        {...props}
        style={{
          width: "100%",
        }}
      />
    </Draggable>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow {...props} />;
});
