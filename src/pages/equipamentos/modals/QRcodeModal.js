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

function ModalPersonalizado(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
        >
          {props.title}
        </DialogTitle>

        <DialogContent>
          {props.children}
        </DialogContent>
        
        <DialogActions style={{ padding: '8px 24px' }}>
          <Button onClick={props.onClose} color="primary">
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
      <Paper {...props} style={{ maxHeight: '600px' }} />
    </Draggable>
  );
}
