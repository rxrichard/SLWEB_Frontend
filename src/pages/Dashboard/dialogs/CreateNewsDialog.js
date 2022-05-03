import React, { useState } from 'react';
import { api } from '../../../services/api'

import { withStyles, useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Close as CloseIcon,
} from '@material-ui/icons';
import {
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  IconButton,
  Typography,
  useMediaQuery,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core'
import { Toast } from '../../../components/toasty'

export const CreateNews = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({
    fullScreen
  });

  const [novaNoticia, setNovaNoticia] = useState(INITIAL_NEWS_STATE)
  const [wait, setWait] = useState(false)

  const handlePublish = async (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }

    if (novaNoticia.BannerTitle.trim() === '' || novaNoticia.BannerDescription.trim() === '') {
      Toast('O titulo e/ou a descrição do banner não podem ser nulos', 'warn')
      return
    }

    let toastId = null

    toastId = Toast('Publicando notícia...', 'wait')
    setWait(true)

    try {
      await api.post('/dashboard/news', {
        news: novaNoticia
      })

      Toast('Notícia salva', 'update', toastId, 'success')
      setWait(false)
      handleCloseModal()
    } catch (e) {
      Toast('Falha ao salvar notícia', 'update', toastId, 'error')
      setWait(false)
    }

  }

  const handleCloseModal = () => {
    setNovaNoticia(INITIAL_NEWS_STATE)
    onClose()
  }

  return (
    <div>
      <Dialog
        onClose={handleCloseModal}
        fullScreen={fullScreen}
        open={open}
      >
        <DialogTitle
          onClose={handleCloseModal}
        >
          Publicar nova notícia
        </DialogTitle>
        <DialogContent dividers>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(e) => handlePublish(e)}
          >
            <div className="YAlign">
              <TextField
                variant="outlined"
                label={`Titulo do Banner(${25 - novaNoticia.BannerTitle.length})`}
                value={novaNoticia.BannerTitle}
                className={classes.inputInnerMargin}
                onChange={e => setNovaNoticia({
                  ...novaNoticia,
                  BannerTitle: e.target.value
                })}
              />
              <TextField
                label={`Descrição do Banner(${60 - novaNoticia.BannerDescription.length})`}
                variant="outlined"
                value={novaNoticia.BannerDescription}
                onChange={e => setNovaNoticia({
                  ...novaNoticia,
                  BannerDescription: e.target.value
                })}
                className={classes.paddingRight}
                rows={4}
                multiline
              />
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel>Alinhamento do Banner</InputLabel>
                <Select
                  className={classes.Select}
                  value={novaNoticia.BannerAlign}
                  onChange={e => setNovaNoticia({
                    ...novaNoticia,
                    BannerAlign: e.target.value
                  })}
                  label="Alinhamento do Banner"
                  variant='outlined'
                >
                  <MenuItem value={null} disabled>
                    Selecione...
                  </MenuItem>
                  <MenuItem value='center'>Centro</MenuItem>
                  <MenuItem value='right'>Direita</MenuItem>
                  <MenuItem value='left'>Esquerda</MenuItem>
                </Select>
              </FormControl>
              <TextField
                variant="outlined"
                label={`Titulo do Modal(${20 - novaNoticia.ModalHeaderTitle.length})`}
                value={novaNoticia.ModalHeaderTitle}
                className={classes.inputInnerMargin}
                onChange={e => setNovaNoticia({
                  ...novaNoticia,
                  ModalHeaderTitle: e.target.value
                })}
              />
              <TextField
                label={`Conteudo do Modal`}
                variant="outlined"
                value={novaNoticia.ModalContent}
                onChange={e => setNovaNoticia({
                  ...novaNoticia,
                  ModalContent: e.target.value
                })}
                className={classes.paddingRight}
                rows={4}
                multiline
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => handlePublish(e)}
            color="primary"
            disabled={wait}
          >
            Publicar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const INITIAL_NEWS_STATE = {
  BannerTitle: '',
  BannerDescription: '',
  BannerAlign: 'right',
  ModalHeaderTitle: '',
  ModalContent: ''
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  root: props => ({
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: props.fullScreen ? '100%' : '300px',
    },
  }),
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 'calc(100% - 16px)'
  },
  inputInnerMargin: props => ({
    paddingRight: props.fullScreen ? '16px' : '0px',
    '&:nth-child(1) > div > input': {
      marginLeft: '8px'
    },
    '&:nth-child(4) > div > input': {
      marginLeft: '8px'
    },
  }),
  Select: {
    width: '100%'
  },
  paddingRight: props => ({
    paddingRight: props.fullScreen ? '16px' : '0px',
  })
}));

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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);