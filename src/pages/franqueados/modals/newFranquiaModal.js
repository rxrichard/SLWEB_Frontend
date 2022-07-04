import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api'

import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  useMediaQuery,
  IconButton,
  Typography
} from '@material-ui/core/';
import { useTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import { Close as CloseIcon, DeleteForever as DeleteForeverIcon, Save as SaveIcon, ThumbDownAlt as ThumbDownAltIcon, ThumbUpAlt as ThumbUpAltIcon, Edit as EditIcon, KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';

import { Toast } from '../../../components/toasty'

export const NewFranquiaModal = ({ open, onClose }) => {
  const theme = useTheme();
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [wait, setWait] = useState(false);
  const [newFranquiaData, setNewFranquiaData] = useState(NEW_FRANQUIA_FORM_INITIAL_STATE);

  const handleSubmit = () => {
    setWait(true)

    //fazer post aqui

    setWait(false)
  }

  const handleClose = () => {
    if (!wait) {
      onClose()
    }
  }

  const handleDiscart = () => {

  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      maxWidth={false}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >

      <DialogTitle onClose={handleClose} >
        Nova Franquia
      </DialogTitle>

      <DialogContent dividers>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.GrpVen}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                GrpVen: e.target.value
              }))
            }}
            label="Grupo de Venda"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.CodTOTVs}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                CodTOTVs: e.target.value
              }))
            }}
            label="Código TOTVs"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.LojaTOTVs}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                LojaTOTVs: e.target.value
              }))
            }}
            label="Loja TOTVs"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.Filial}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                Filial: e.target.value
              }))
            }}
            label="Código Filial"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.Franqueado}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                Franqueado: e.target.value
              }))
            }}
            label="Titular da Franquia"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.RazaoSocial}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                RazaoSocial: e.target.value
              }))
            }}
            label="Razão Social"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.NomeFantasia}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                NomeFantasia: e.target.value
              }))
            }}
            label="Nome Fantasia"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.CNPJ}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                CNPJ: e.target.value
              }))
            }}
            label="CNPJ"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.Email}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                Email: e.target.value
              }))
            }}
            label="Email"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.Consultor}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                Consultor: e.target.value
              }))
            }}
            label="Consultor(SELECT)"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.Credito}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                Credito: e.target.value
              }))
            }}
            label="Crédito"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.CNAE}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                CNAE: e.target.value
              }))
            }}
            label="CNAE"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.EmiteNF}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                EmiteNF: e.target.value
              }))
            }}
            label="Emite NFe"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.UF}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                UF: e.target.value
              }))
            }}
            label="UF"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.minCompra}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                minCompra: e.target.value
              }))
            }}
            label="Minimo Compra"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.retira}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                retira: e.target.value
              }))
            }}
            label="Retira"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.maxLeads}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                maxLeads: e.target.value
              }))
            }}
            label="Max Leads"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.confiavel}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                confiavel: e.target.value
              }))
            }}
            label="Confiável?"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.CondPag}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                CondPag: e.target.value
              }))
            }}
            label="Condição de Pagamento(Select)"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.Logradouro}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                Logradouro: e.target.value
              }))
            }}
            label="Logradouro"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.Municipio}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                Municipio: e.target.value
              }))
            }}
            label="Município"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.CEP}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                CEP: e.target.value
              }))
            }}
            label="CEP"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.Bairro}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                Bairro: e.target.value
              }))
            }}
            label="Bairro"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.Complemento}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                Complemento: e.target.value
              }))
            }}
            label="Complemento"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.FPAS}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                FPAS: e.target.value
              }))
            }}
            label="FPAS"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.CodMun}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                CodMun: e.target.value
              }))
            }}
            label="Código do Município"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.NIRE}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                NIRE: e.target.value
              }))
            }}
            label="NIRE"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.NATJUR}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                NATJUR: e.target.value
              }))
            }}
            label="Natureza Jurídica"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.IE}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                IE: e.target.value
              }))
            }}
            label="Inscrição Estadual"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.TelCel}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                TelCel: e.target.value
              }))
            }}
            label="Telefone Celular"
            variant="outlined"
          />
          <TextField
            className={classes.TextInput}
            value={newFranquiaData.Senha}
            onChange={e => {
              e.persist()
              setNewFranquiaData(oldState => ({
                ...oldState,
                Senha: e.target.value
              }))
            }}
            label="Senha de Acesso"
            variant="outlined"
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleSubmit}
          variant='contained'
          color='primary'
          startIcon={<SaveIcon />}
          disabled={wait}
        >
          Salvar
        </Button>
        <Button
          onClick={handleDiscart}
          variant='outlined'
          color='secondary'
          startIcon={<DeleteForeverIcon />}
          disabled={wait}
        >
          Limpar
        </Button>
      </DialogActions>

    </Dialog >
  );
}

const useStyles = makeStyles(() => ({
  TextInput: {
    width: "100%",
    maxWidth: '413px',
    '&:nth-child(1) > div > input': {
      marginLeft: '8px'
    },
  }
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
  formControl: {
    minWidth: 120,
  }
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

const NEW_FRANQUIA_FORM_INITIAL_STATE = {
  GrpVen: '',
  CodTOTVs: '',
  LojaTOTVs: '',
  Filial: '',
  Franqueado: '',
  RazaoSocial: '',
  NomeFantasia: '',
  CNPJ: '',
  Email: '',
  Consultor: '',
  Credito: '',
  CNAE: '',
  EmiteNF: false,
  UF: '',
  minCompra: '',
  retira: '',
  maxLeads: '',
  confiavel: true,
  CondPag: '',
  Logradouro: '',
  Municipio: '',
  CEP: '',
  Bairro: '',
  Complemento: '',
  FPAS: '',
  CodMun: '',
  NIRE: '',
  NATJUR: '',
  IE: '',
  TelCel: '',
  Senha: ''
}