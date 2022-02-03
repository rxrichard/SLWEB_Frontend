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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core/';
import {
  useTheme,
  withStyles,
  makeStyles
} from '@material-ui/core/styles';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  ThumbDownAlt as ThumbDownAltIcon,
  ThumbUpAlt as ThumbUpAltIcon,
} from '@material-ui/icons';

import { InputCNPJ } from '../customComponents/inputCNPJ'
import { InputCEP } from '../customComponents/inputCEP'
import { InputTel } from '../customComponents/inputTel'

export const DetailsModal = ({ open, onClose, title, Details, DetailsChangeHandler, onUpdate }) => {
  const theme = useTheme();
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [allowEditing, setAllowEditing] = useState(true)

  const handleClose = () => {
    // if (!allowEditing) {
    //   Toast('Finalize a edição antes de fechar os detalhes do cliente', 'warn')
    //   return
    // }
    onClose();
    setAllowEditing(true)
  }

  const handleChangeEditingState = async () => {
    setAllowEditing(oldState => !oldState)

    if (!allowEditing) {
      //desabilitar qualquer ação

      //fazer update do cliente
      onUpdate(Details)
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}>
        {title}
      </DialogTitle>

      <DialogContent dividers>
        <section className={classes.line}>
          <TextField
            variant='standard'
            label="Nome Fantasia"
            value={Details.Nome_Fantasia}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                Nome_Fantasia: e.target.value
              }))
            }}
            style={{ width: '100%' }}
          />
        </section>

        <section className={classes.line}>
          <TextField
            variant='standard'
            label="Razão Social"
            multiline
            maxRows={4}
            value={Details.Razão_Social}
            disabled={true}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                Razão_Social: e.target.value
              }))
            }}
            style={{ width: '100%' }}
          />
        </section>
        <section
          className={classes.line}
          style={{
            justifyContent: 'space-between',
          }}
        >
          <InputCNPJ
            value={Details.CNPJ}
            onChange={(e) => DetailsChangeHandler(oldState => ({
              ...oldState,
              CNPJ: e.target.value
            }))}
            Tipo={Details.TPessoa}
            disabled={true}
          />
          {Details.TPessoa === 'J' ? <TextField
            variant='standard'
            label="Inscrição Estadual"
            value={Details.IE}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                IE: e.target.value
              }))
            }}
          /> : null}
        </section>
        <section className={classes.line}>
          <TextField
            variant='standard'
            label="Email"
            value={Details.Email}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                Email: e.target.value
              }))
            }}
            style={{ width: '100%' }}
          />
        </section>
        <section
          className={classes.line}
          style={{
            justifyContent: 'space-between',
          }}
        >
          <TextField
            variant='standard'
            label="DDD"
            value={Details.DDD}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                DDD: e.target.value
              }))
            }}
            style={{ width: '40px', marginRight: '8px' }}
          />
          <InputTel
            value={Details.Fone}
            onChange={(e) => DetailsChangeHandler(oldState => ({
              ...oldState,
              Fone: e.target.value
            }))}
            disabled={allowEditing}
          />
          <TextField
            variant='standard'
            label="Contato"
            value={Details.Contato_Empresa}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                Contato_Empresa: e.target.value
              }))
            }}
            style={{
              maxWidth: '150px',
            }}
          />
        </section>
        <section className={classes.line}>
          <TextField
            variant='standard'
            label="Logradouro"
            value={Details.Logradouro}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                Logradouro: e.target.value
              }))
            }}
            multiline
            maxRows={4}
            style={{ width: '100%' }}
          />
        </section>
        <section
          className={classes.line}
          style={{
            justifyContent: 'space-between',
          }}
        >
          <TextField
            variant='standard'
            label="Bairro"
            value={Details.Bairro}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                Bairro: e.target.value
              }))
            }}
            style={{ width: '70%' }}
          />
          <TextField
            variant='standard'
            label="Número"
            value={Details.Número}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                Número: e.target.value
              }))
            }}
            style={{ width: '15%' }}
          />
        </section>
        <section
          className={classes.line}
          style={{
            justifyContent: 'space-between',
          }}
        >
          <TextField
            variant='standard'
            label="Município"
            value={Details.Município}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                Município: e.target.value
              }))
            }}
            style={{ width: '70%' }}
          />
          <TextField
            variant='standard'
            label="UF"
            value={Details.UF}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                UF: e.target.value
              }))
            }}
            style={{ width: '15%' }}
          />
        </section>
        <section
          className={classes.line}
          style={{
            justifyContent: 'space-between',
          }}
        >
          <InputCEP
            value={Details.CEP}
            onChange={(e) => DetailsChangeHandler(oldState => ({
              ...oldState,
              CEP: e.target.value
            }))}
            disabled={allowEditing}
          />
          <TextField
            variant='standard'
            label="Complemento"
            value={Details.Complemento}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                Complemento: e.target.value
              }))
            }}
          />
        </section>
        <section
          className={classes.line}
          style={{
            justifyContent: 'space-between',
          }}
        >
          <FormControl className={classes.formControl}>
            <InputLabel>Tipo de Pessoa</InputLabel>
            <Select
              value={Details.TPessoa}
              onChange={(e) => DetailsChangeHandler(oldState => ({
                ...oldState,
                TPessoa: e.target.value
              }))}
              disabled={true}
            >
              <MenuItem value='J'>Jurídica</MenuItem>
              <MenuItem value='F'>Física</MenuItem>
            </Select>
          </FormControl>

        </section>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => alert(Details.ClienteStatus === 'A' ? 'Inativar' : 'Reativar')}
          color="primary"
          startIcon={Details.ClienteStatus === 'A' ? <ThumbDownAltIcon /> : <ThumbUpAltIcon />}
        >
          {Details.ClienteStatus === 'A' ? 'Inativar' : 'Reativar'}
        </Button>
        <Button
          onClick={handleChangeEditingState}
          color="primary"
          startIcon={allowEditing ? <EditIcon /> : <SaveIcon />}
        >
          {allowEditing ? 'Editar' : 'Salvar'}
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
    minWidth: 120,
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

