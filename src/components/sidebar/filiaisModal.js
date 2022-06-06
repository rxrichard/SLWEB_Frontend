import React from "react";
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
          <div
            style={{
              display: "flex",
              flexDirection: 'column',
            }}
          >
            <TextField
              onChange={e => props.onFilter(e.target.value, e)}
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
              {props.Filiais.length === 0 ?
                <ListItem button onClick={() => { }}>
                  <ListItemText primary='' />
                  <ListItemText primary='Carregando Filiais...' />
                </ListItem>
                :
                props.Filiais.map((filial, index) => (
                  <>
                    <ListItem button onClick={() => props.onSelect(filial.M0_CODFIL)}>
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
          <div className="XAlign" style={{ justifyContent: 'space-between' }}>
          {sessionStorage.getItem("filial_logada") === 'true' ?
            (
              <Button onClick={props.onLogout} color="primary">
                Logout Filial
              </Button>
            )
            :
            <div />
          }
          <Button onClick={props.onClose} color="primary">
            Fechar
          </Button>
          </div>
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
      <Paper {...props} style={{ maxHeight: '600px' }} />
    </Draggable>
  );
}
