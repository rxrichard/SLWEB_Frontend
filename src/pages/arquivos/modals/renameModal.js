import React, { useState, useEffect } from 'react';

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle as MuiDialogTitle, useMediaQuery, IconButton, Typography } from '@material-ui/core/';
import { useTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import { Close as CloseIcon, Edit as EditIcon } from '@material-ui/icons';

export const RenameModal = ({ open, onClose, itemsSelecionados, folderPath }) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [wait, setWait] = useState(false)

  const handleSubmit = async () => {
    alert('continua no backend')
  }

  const handleClose = () => {
    if (wait) return
    onClose();

    setWait(false)
  }

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title" >
      <DialogTitle id="customized-dialog-title" onClose={handleClose} >
        Renomear {itemsSelecionados.length === 1 ? 'arquivo' : itemsSelecionados.length > 1 ? 'arquivos' : 'pasta'}
      </DialogTitle>

      <DialogContent dividers>
        <div className='XAlign' style={{ flexWrap: 'nowrap' }}>
          <TextField
            className={classes.TextInput}
            label="Nome atual"
            variant="outlined"
            value='Pilao.pdf'
            onChange={() => { }}
            disabled={true}
          />
          <TextField
            className={classes.TextInput}
            label="Novo nome"
            variant="outlined"
            value=''
            onChange={() => { }}
            disabled={false}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          color="primary"
          onClick={handleSubmit}
          startIcon={<EditIcon />}
          disabled={wait}
        >
          Renomear
        </Button>
        <Button
          color="secondary"
          onClick={handleClose}
          startIcon={<CloseIcon />}
          disabled={wait}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  TextInput: {
    height: '55px',
    width: '100%',
    '& div': {
      height: '100%',
    },
    '& div>input:nth-child(1)': {
      margin: '0px 8px',
    },
  }
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: 500
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
