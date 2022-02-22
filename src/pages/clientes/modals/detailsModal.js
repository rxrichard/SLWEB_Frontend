import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api'

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
import { RED_PRIMARY } from '../../../misc/colors'
import { toValidString } from '../../../misc/commom_functions'
import { Toast } from '../../../components/toasty'

import { InputCNPJ } from '../customComponents/inputCNPJ'
import { InputCEP } from '../customComponents/inputCEP'
import { InputTel } from '../customComponents/inputTel'

export const DetailsModal = ({ open, onClose, title, Details, DetailsChangeHandler, updateClientesArray }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [backupData, setBackupData] = useState({})
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [allowEditing, setAllowEditing] = useState(true)
  const [wait, setWait] = useState(false)

  useEffect(() => {
    setBackupData(Details)
    // eslint-disable-next-line
  }, [open])

  const handleClose = () => {
    if (wait) {
      return
    }
    onClose();
    setAllowEditing(true)
    setWait(false)
  }

  const handleChangeEditingState = async (Cliente) => {
    setAllowEditing(oldState => !oldState)

    if (!allowEditing) {
      let toastId = null

      toastId = Toast('Atualizando...', 'wait')
      setWait(true)

      try {
        await api.put('/client', {
          cliente: Cliente
        })

        Toast('Cliente atualizado', 'update', toastId, 'success')
        setWait(false)

        updateClientesArray(oldState => {
          let clienteIndex = null
          let aux = [...oldState]

          oldState.forEach((item, index) => {
            if (item.A1_COD === Cliente.A1_COD && item.A1_LOJA === Cliente.A1_LOJA) {
              clienteIndex = index
            }
          })

          aux[clienteIndex] = Cliente

          return aux
        })
      } catch (err) {
        Toast('Falha ao atualizar cliente', 'update', toastId, 'error')
        setAllowEditing(false)
        setWait(false)
      }
    }
  }

  const handleInativar = async (Cliente) => {
    let toastId = null

    toastId = Toast(Cliente.ClienteStatus === 'A' ? 'Inativando...' : 'Ativando...', 'wait')
    setWait(true)

    try {

      await api.put('/client/inativar', {
        COD: Cliente.A1_COD,
        LOJA: Cliente.A1_LOJA,
        CNPJ: Cliente.CNPJ,
        Status: Cliente.ClienteStatus === 'A' ? 'I' : 'A'
      })

      Toast(Cliente.ClienteStatus === 'A' ? 'Cliente inativado' : 'Cliente ativado', 'update', toastId, 'success')
      setWait(false)

      DetailsChangeHandler(oldState => ({
        ...oldState,
        ClienteStatus: Cliente.ClienteStatus === 'A' ? 'I' : 'A'
      }))

      updateClientesArray(oldState => {
        let clienteIndex = null
        let aux = [...oldState]

        oldState.forEach((item, index) => {
          if (item.A1_COD === Cliente.A1_COD && item.A1_LOJA === Cliente.A1_LOJA) {
            clienteIndex = index
          }
        })

        aux[clienteIndex] = {
          ...Cliente,
          ClienteStatus: Cliente.ClienteStatus === 'A' ? 'I' : 'A'
        }

        return aux
      })
    } catch (err) {
      Toast(Cliente.ClienteStatus === 'A' ? 'Falha ao inativar cliente' : 'Falha ao ativar cliente', 'update', toastId, 'error')
      setWait(false)
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
            value={toValidString(Details.Nome_Fantasia)}
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
            value={toValidString(Details.Razão_Social)}
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
            value={toValidString(Details.IE)}
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
            value={toValidString(Details.Email)}
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
          <div>
            <TextField
              variant='standard'
              label="DDD"
              value={toValidString(Details.DDD)}
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
          </div>
          <TextField
            variant='standard'
            label="Contato"
            value={toValidString(Details.Contato_Empresa)}
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
            value={toValidString(Details.Logradouro)}
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
            value={toValidString(Details.Bairro)}
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
            value={toValidString(Details.Número)}
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
            value={toValidString(Details.Município)}
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
            value={toValidString(Details.UF)}
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
            value={toValidString(Details.Complemento)}
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
          {Details.ClienteStatus === 'I' ?
            <Typography
              style={{
                color: RED_PRIMARY,
                fontWeight: 'bold'
              }}
            >
              *INATIVADO*
            </Typography>
            :
            null
          }
        </section>
      </DialogContent>

      <DialogActions>
        {allowEditing ?
          <Button
            disabled={wait}
            onClick={() => handleInativar(Details)}
            color="primary"
            startIcon={Details.ClienteStatus === 'A' ? <ThumbDownAltIcon /> : <ThumbUpAltIcon />}
          >
            {Details.ClienteStatus === 'A' ? 'Inativar' : 'Reativar'}
          </Button>
          :
          <Button
            disabled={wait}
            onClick={() => {
              DetailsChangeHandler(backupData)
              setAllowEditing(true)
            }
            }
            color="secondary"
            startIcon={<CloseIcon />}
          >
            Discartar Alterações
          </Button>
        }

        <Button
          disabled={wait}
          onClick={() => handleChangeEditingState(Details)}
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

