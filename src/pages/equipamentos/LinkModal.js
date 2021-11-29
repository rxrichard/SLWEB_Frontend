import React from "react";

import { Typography, makeStyles } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

import { RED_SECONDARY } from '../../misc/colors'

function ModalPersonalizado(props) {
    const classes = useStyles();

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
                    {props.Clientes.map(cliente => (
                        <div
                            className={classes.root}
                            onClick={() => props.onConfirm(cliente)}
                        >
                            <Typography variant="h6">
                                {cliente.Nome_Fantasia}
                            </Typography>
                            <Typography style={{ color: RED_SECONDARY }} variant='subtitle1'>
                                {cliente.CNPJss}
                            </Typography>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions style={{ padding: '8px 24px' }}>
                    {props.action}
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

const useStyles = makeStyles((theme) => ({
    root: {
      padding: "8px 8px 8px 8px",
      borderRadius: "8px",
      "&:hover": {
        transition: "150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
      }
    },
  }));