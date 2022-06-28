import React, { useState, useEffect } from "react";
import { api } from '../../services/api'
import Draggable from "react-draggable";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  List,
  ListItem,
  Divider,
  ListItemText,
  TextField
} from '@material-ui/core';
import { Toast } from '../toasty'
import { navigateTo } from '../../misc/commom_functions'

export const FilialSelectionModal = ({ open, onClose }) => {
  const [filiais, setFiliais] = useState([])
  const [filterWord, setFilterWord] = useState('')

  useEffect(() => {
    if (open) {
      LoadData()
    }
  }, [open])

  const LoadData = async () => {
    try {
      const response = await api.get('/dashboard/filiais')

      setFiliais(response.data)
    } catch (err) {
      setFiliais([])
    }
  }

  const handleSwitchFilial = async (filial) => {
    let toastId = null
    toastId = Toast('Aguarde...', 'wait')

    try {

      const response = await api.post("/admAuth/full", {
        user_code: filial,
      });

      Toast('Conectado!', 'update', toastId, 'success')

      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", response.data.role);
      sessionStorage.setItem("filial_logada", response.data.nome !== '');
      sessionStorage.setItem("usuário", response.data.nome);
      sessionStorage.setItem("links", JSON.parse(response.data.Links));

      navigateTo('reload')
    } catch (err) {
      Toast('Falha ao logar na filial', 'update', toastId, 'error')
    }
  }

  const handleLogoutFilial = async () => {
    let toastId = null
    toastId = Toast('Aguarde...', 'wait')

    try {
      const response = await api.get("/admAuth/logout");

      Toast('Conectado!', 'update', toastId, 'success')

      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", response.data.role);
      sessionStorage.setItem("filial_logada", response.data.nome !== '');
      sessionStorage.setItem("usuário", response.data.nome);
      sessionStorage.setItem("links", JSON.parse(response.data.Links));

      navigateTo('move', '/')
    } catch (err) {
      Toast('Falha ao logar na filial', 'update', toastId, 'error')
    }
  }

  const handleClose = () => {
    setFiliais([])
    setFilterWord('')
    onClose()
  }

<<<<<<< HEAD

function ModalPersonalizado(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
=======
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
>>>>>>> a7a7733cb03b740084b46f4617bdf1ad4aab45b8
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {props.title}
        </DialogTitle>

        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: 'column',
            }}
          >
            <TextField
<<<<<<< HEAD
              onChange={e => props.onFilter(e.target.value, e)}
=======
              onChange={e => setFilterWord(e.target.value)}
>>>>>>> a7a7733cb03b740084b46f4617bdf1ad4aab45b8
              type="text"
              label='Procurar'
              autoFocus
            />
            <List
              style={{
                maxHeight: '300px',
                overflow: 'auto',
                marginTop: '8px',
                minWidth: '400px'
              }}
            >
<<<<<<< HEAD
              {props.Filiais.length === 0 ?
=======
              {returnFilteredFranquadosList(filiais, filterWord).length === 0 ?
>>>>>>> a7a7733cb03b740084b46f4617bdf1ad4aab45b8
                <ListItem button onClick={() => { }}>
                  <ListItemText primary='' />
                  <ListItemText primary='Carregando Filiais...' />
                </ListItem>
                :
<<<<<<< HEAD
                props.Filiais.map((filial, index) => (
                  <>
                    <ListItem button onClick={() => props.onSelect(filial.M0_CODFIL)}>
=======
                returnFilteredFranquadosList(filiais, filterWord).map((filial, index) => (
                  <div
                    key={filial.M0_CODFIL}
                  >
                    <ListItem
                      button
                      onClick={() => handleSwitchFilial(filial.M0_CODFIL)}
                    >
>>>>>>> a7a7733cb03b740084b46f4617bdf1ad4aab45b8
                      <ListItemText primary={filial.M0_CODFIL} />
                      <ListItemText primary={filial.GrupoVenda} />
                    </ListItem>
                    <Divider />
                  </>
                ))}
            </List>
          </div>
        </DialogContent>
        <DialogActions style={{ padding: '8px 24px' }}>
<<<<<<< HEAD
          <Button onClick={props.onClose} color="primary">
            Fechar
          </Button>
=======
          <div className="XAlign" style={{ justifyContent: 'space-between' }}>
            {sessionStorage.getItem("filial_logada") === 'true' ?
              (
                <Button onClick={handleLogoutFilial} color="primary">
                  Logout Filial
                </Button>
              )
              :
              <div />
            }
            <Button onClick={handleClose} color="primary">
              Fechar
            </Button>
          </div>
>>>>>>> a7a7733cb03b740084b46f4617bdf1ad4aab45b8
        </DialogActions>
      </Dialog>
    </div>
  );
}

function PaperComponent(props) {
  return (
    <Draggable
      {...props}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} style={{ maxHeight: '600px' }} />
    </Draggable>
  );
}

const returnFilteredFranquadosList = (franqueados, filterString) => {
  var re = new RegExp(filterString.trim().toLowerCase())

  return franqueados.filter(franqueado => {
    if (filterString.trim() === '') {
      return true
    } else if (filterString.trim() !== '' && (
      franqueado.GrupoVenda.trim().toLowerCase().match(re) || franqueado.M0_CODFIL.trim().toLowerCase().match(re)
    )) {
      return true
    } else {
      return false
    }
  })
}