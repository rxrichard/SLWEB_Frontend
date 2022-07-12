import React, { useState } from 'react';

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle as MuiDialogTitle, useMediaQuery, IconButton, Typography } from '@material-ui/core/';
import { useTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import { Close as CloseIcon, CreateNewFolder as CreateNewFolderIcon } from '@material-ui/icons';

import { Toast } from '../../../components/toasty'

import { useFiles } from '../../../hooks/useFiles'

export const NewFolderModal = ({ open, onClose }) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    data: { folderPath }
  } = useFiles()

  const [wait, setWait] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  const handleSubmit = async () => {
    alert('continua no backend')
    //verificar se o nome da pasta é válido(não existe outro no diretório)

    setWait(true)
    let toastId = null
    toastId = Toast('Enviando...', 'wait')

    try {
      //fazer request      

      //incluir pasta no array de pastas
      Toast('Pasta criada com sucesso', 'update', toastId, 'success')
      handleClose()
    } catch (err) {
      Toast('Falha ao criar pasta, tente remover caractéres especiais', 'update', toastId, 'error')
      setWait(false)
    }
  }

  const handleClose = () => {
    if (wait) return
    onClose();

    setWait(false)
    setNewFolderName('')
  }

  const actualFolderFormated = (AF) => {
    return String(AF).toString().replace(/,/g, '\\')
  }

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title" >
      <DialogTitle id="customized-dialog-title" onClose={handleClose} >
        Criar nova pasta no diretório
      </DialogTitle>

      <DialogContent dividers>
        <div className='YAlign'>
          <TextField
            className={classes.TextInput}
            label="Nome da pasta"
            variant="outlined"
            value={newFolderName}
            onChange={e => setNewFolderName(e.target.value)}
            disabled={wait}
          />
          <Typography variant='caption'><strong>Caminho: </strong>{actualFolderFormated(folderPath)}\{newFolderName}</Typography>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          color="primary"
          onClick={handleSubmit}
          startIcon={<CreateNewFolderIcon />}
          disabled={wait}
        >
          Criar
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
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
    height: '54px',
  },
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
