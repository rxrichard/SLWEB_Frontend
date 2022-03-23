import React, { useState } from 'react';
import { api } from '../../../services/api'
import { saveAs } from 'file-saver'

import {
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  useMediaQuery,
  IconButton,
  Typography,
  Button as ButtonMaterial,
  TextField,
  makeStyles
} from '@material-ui/core/';

import {
  CloudDownload as CloudDownloadIcon
} from '@material-ui/icons'

import {
  useTheme,
  withStyles,
} from '@material-ui/core/styles';

import {
  Close as CloseIcon,
} from '@material-ui/icons';

import { Toast } from '../../../components/toasty'

export const HelperModal = ({ open, onClose, title }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({
    fullScreen
  })
  const [mensagemWhatsapp, setMensagemWhatsapp] = useState(INITIAL_STRING)

  const handleClose = () => {
    onClose();
  }

  const handleRetriveWORD = async () => {
    let toastId = null

    toastId = Toast('Buscando formulário...', 'wait')

    try {
      const response = await api.get("/form/original", {
        responseType: "arraybuffer",
      });

      Toast('Formulário encontrado!', 'update', toastId, 'success')

      const blob = new Blob([response.data], { type: "application/msword" });

      saveAs(blob, `Questionário de Perfil.doc`);
    } catch (err) {
      Toast('Falha ao recuperar formulário do servidor', 'update', toastId, 'error')
    }
  }

  const handleSendWhatsappMessage = async () => {
    if(mensagemWhatsapp.trim() === INITIAL_STRING){
      Toast('Altera a mensagem com seus dados antes de enviar aos consultores', 'warn')
      return
    }

    //Número da Tati ou do Alessandro

    let target = ''
    let message = mensagemWhatsapp.replace(/ +/, '%20')

    window.open(`https://api.whatsapp.com/send?phone=${target}&text=${message}`,'_blank').focus();
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      classes={{
        paper: classes.dialog
      }}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <div
          className='YAlign'
          style={{
            padding: '8px'
          }}
        >
          <Typography>
            Envie uma mensagem para os consultores e eles entrarão em contato para te auxiliar!
          </Typography>
          <TextField
            className={classes.messageTextArea}
            label="Mensagem"
            multiline
            rows={4}
            value={mensagemWhatsapp}
            onChange={e => setMensagemWhatsapp(e.currentTarget.value)}
            variant="outlined"
          />
          <ButtonMaterial
            className={classes.sendMessageButton}
            variant="contained"
            onClick={handleSendWhatsappMessage}

            startIcon={<i class="fa fa-whatsapp" style={{ fontSize: '30px', }}></i>}
          >
            ENVIAR MENSAGEM
          </ButtonMaterial>
          <ButtonMaterial
            className={classes.formDownloadButton}
            variant="outlined"
            color="primary"
            onClick={handleRetriveWORD}
            startIcon={<CloudDownloadIcon />}
          >
            DOWNLOAD DE FORMULÁRIO WORD
          </ButtonMaterial>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const useStyles = makeStyles({
  dialog: (props) => ({
    position: 'absolute',
    right: props.fullScreen ? 0 : -30,
    bottom: props.fullScreen ? 0 : -30,
    maxWidth: props.fullScreen ? 'unset' : '500px'
  }),
  messageTextArea: {
    width: '100%',
    margin: '8px 0px 8px 0px'
  },
  formDownloadButton: {
    width: '100%',
  },
  sendMessageButton: {
    width: '100%',
    margin: '0px 0px 32px 0px',
    background: '#34AF23'
  }
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: '400px'
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
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: '0px',
  },
}))(MuiDialogContent);

const INITIAL_STRING = 'Bom dia, meu nome é FULANO e estou precisando de uma ajuda com o formulário de franquia. Pode entrar em contato comigo por (XX) X XXXX-XXXX? Obrigado!'