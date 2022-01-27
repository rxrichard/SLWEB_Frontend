import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  useMediaQuery,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core/';
import {
  useTheme,
  withStyles,
  makeStyles
} from '@material-ui/core/styles';
import {
  Close as CloseIcon,
  Save as SaveIcon,
} from '@material-ui/icons';

import { Toast } from '../../../components/toasty'
import { InputCNPJ } from '../customComponents/inputCNPJ'
import { InputCEP } from '../customComponents/inputCEP'
import { InputTel } from '../customComponents/inputTel'

export const NewClientModal = ({ open, onClose, title }) => {
  const theme = useTheme();
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [newClient, setNewClient] = useState(newClientInitialState)

  const handleClose = () => {
    onClose();
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle
        onClose={handleClose}
      >
        {title}
      </DialogTitle>

      <DialogContent dividers>
        <section
          className={classes.line}
          style={{
            justifyContent: 'space-between',
          }}
        >
          <FormControl className={classes.formControl}>
            <InputLabel>Tipo de Pessoa</InputLabel>
            <Select
              value={newClient.TPessoa}
              onChange={(e) => setNewClient(
                oldState => ({
                  ...oldState,
                  TPessoa: e.target.value,
                  CNPJ: e.target.value === 'F' ? String(oldState.CNPJ).slice(0, 11) : String(oldState.CNPJ)
                })
              )}
              style={{ width: '120px' }}
            >
              <MenuItem value='J'>Jurídica</MenuItem>
              <MenuItem value='F'>Física</MenuItem>
            </Select>
          </FormControl>
          <InputCNPJ
            value={newClient.CNPJ}
            onChange={e => setNewClient(
              oldState => ({
                ...oldState,
                CNPJ: e.target.value
              })
            )}
            Tipo={newClient.TPessoa}
            disabled={false}
          />
        </section>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => { }}
          color="primary"
          startIcon={<SaveIcon />}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles(theme => ({
  line: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexWrap: 'nowrap',
    minWidth: '400px'
  },
  infoBox: {
    padding: '4px',
    border: '1px solid #ccc',
  },
  formControl: {
    minWidth: 400,
  },
}))

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

const newClientInitialState = {
  CNPJ: '',
  Nome_Fantasia: '',
  Razão_Social: '',
  IE: '',
  Logradouro: '',
  Número: '',
  Complemento: '',
  Bairro: '',
  CEP: '',
  Município: '',
  UF: '',
  Contato_Empresa: '',
  Email: '',
  DDD: '',
  Fone: '',
  TPessoa: 'J',
}