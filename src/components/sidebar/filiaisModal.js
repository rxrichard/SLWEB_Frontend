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

function ModalPersonalizado({ open, onClose, Filiais, onSelect, onLogout, onChangeFilterWord }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Filiais
        </DialogTitle>

        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: 'column',
            }}
          >
            <TextField
              onChange={e => onChangeFilterWord(e.target.value, e)}
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
              {Filiais.length === 0 ?
                <ListItem button onClick={() => { }}>
                  <ListItemText primary='' />
                  <ListItemText primary='Carregando Filiais...' />
                </ListItem>
                :
                Filiais.map((filial, index) => (
                  <div
                    key={filial.M0_CODFIL}
                  >
                    <ListItem
                      button
                      onClick={() => onSelect(filial.M0_CODFIL)}
                    >
                      <ListItemText primary={filial.M0_CODFIL} />
                      <ListItemText primary={filial.GrupoVenda} />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
            </List>
          </div>
        </DialogContent>
        <DialogActions style={{ padding: '8px 24px' }}>
          <div className="XAlign" style={{ justifyContent: 'space-between' }}>
            {sessionStorage.getItem("filial_logada") === 'true' ?
              (
                <Button onClick={onLogout} color="primary">
                  Logout Filial
                </Button>
              )
              :
              <div />
            }
            <Button onClick={onClose} color="primary">
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
