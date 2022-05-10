import React, { useState, useEffect } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle as MuiDialogTitle, useMediaQuery, IconButton, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Divider } from '@material-ui/core/';
import { useTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import { Close as CloseIcon, Save as SaveIcon, ThumbDownAlt as ThumbDownAltIcon, ThumbUpAlt as ThumbUpAltIcon, Edit as EditIcon } from '@material-ui/icons';

import DatePicker from '../../../components/materialComponents/datePicker'

export const DetailsModal = ({ open, onClose, title, Details, DetailsChangeHandler }) => {
  const theme = useTheme();
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [backupData, setBackupData] = useState({})
  const [allowEditing, setAllowEditing] = useState(true)
  const [wait, setWait] = useState(false)

  console.log(Details)

  useEffect(() => {
    setBackupData(Details)
    // eslint-disable-next-line
  }, [open])

  const handleChangeEditingState = async (PDV) => {
    setAllowEditing(oldState => !oldState)

    if (!allowEditing) {
      console.log(PDV)
    }

    // if (!allowEditing) {
    //   let toastId = null

    //   toastId = Toast('Atualizando...', 'wait')
    //   setWait(true)

    //   try {
    //     await api.put('/client', {
    //       cliente: Cliente
    //     })

    //     Toast('Cliente atualizado', 'update', toastId, 'success')
    //     setWait(false)

    //     updateClientesArray(oldState => {
    //       let clienteIndex = null
    //       let aux = [...oldState]

    //       oldState.forEach((item, index) => {
    //         if (item.A1_COD === Cliente.A1_COD && item.A1_LOJA === Cliente.A1_LOJA) {
    //           clienteIndex = index
    //         }
    //       })

    //       aux[clienteIndex] = Cliente

    //       return aux
    //     })

    //     setBackupData(PDV)
    //   } catch (err) {
    //     Toast('Falha ao atualizar cliente', 'update', toastId, 'error')
    //     setAllowEditing(false)
    //     setWait(false)
    //   }
    // }
  }

  const handleInativar = async (PDV) => {
    // let toastId = null

    // toastId = Toast(Cliente.ClienteStatus === 'A' ? 'Inativando...' : 'Ativando...', 'wait')
    // setWait(true)

    // try {

    //   await api.put('/client/inativar', {
    //     COD: Cliente.A1_COD,
    //     LOJA: Cliente.A1_LOJA,
    //     CNPJ: Cliente.CNPJ,
    //     Status: Cliente.ClienteStatus === 'A' ? 'I' : 'A'
    //   })

    //   Toast(Cliente.ClienteStatus === 'A' ? 'Cliente inativado' : 'Cliente ativado', 'update', toastId, 'success')
    //   setWait(false)

    //   DetailsChangeHandler(oldState => ({
    //     ...oldState,
    //     ClienteStatus: Cliente.ClienteStatus === 'A' ? 'I' : 'A'
    //   }))

    //   updateClientesArray(oldState => {
    //     let clienteIndex = null
    //     let aux = [...oldState]

    //     oldState.forEach((item, index) => {
    //       if (item.A1_COD === Cliente.A1_COD && item.A1_LOJA === Cliente.A1_LOJA) {
    //         clienteIndex = index
    //       }
    //     })

    //     aux[clienteIndex] = {
    //       ...Cliente,
    //       ClienteStatus: Cliente.ClienteStatus === 'A' ? 'I' : 'A'
    //     }

    //     return aux
    //   })
    // } catch (err) {
    //   Toast(Cliente.ClienteStatus === 'A' ? 'Falha ao inativar cliente' : 'Falha ao ativar cliente', 'update', toastId, 'error')
    //   setWait(false)
    // }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={onClose}>
        {title}
      </DialogTitle>

      <DialogContent dividers>

        <Divider variant="inset" />
        <li
          style={{
            listStyleType: 'none'
          }}
        >
          <Typography
            className={classes.dividerInset}
            color="primary"
            display="block"
            variant="caption"
          >
            Dados Básicos
          </Typography>
        </li>

        <section className={classes.line}>
          <TextField
            variant='standard'
            label="Cliente"
            value={Details.AnxDesc}
            disabled={true}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                AnxDesc: e.target.value
              }))
            }}
            style={{ width: '100%' }}
          />
        </section>
        <section className={classes.line}>
          <FormControl className={classes.formControl}>
            <InputLabel>Depósito</InputLabel>
            <Select
              value={Details.DepId}
              onChange={(e) => {
                DetailsChangeHandler(oldState => ({
                  ...oldState,
                  DepId: e.target.value
                }))
              }}
              disabled={allowEditing}
            >
              <MenuItem value={Details.DepId}>DEPÓSITO X</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Configuracao</InputLabel>
            <Select
              value={Details.CfgId}
              onChange={(e) => {
                DetailsChangeHandler(oldState => ({
                  ...oldState,
                  CfgId: e.target.value
                }))
              }}
              disabled={allowEditing}
            >
              <MenuItem value={Details.CfgId}>CONFIGURAÇÃO X</MenuItem>
            </Select>
          </FormControl>
        </section>
        <section className={classes.lineStart}>
          <TextField
            variant='standard'
            label="Modelo"
            value={Details.EQUIPMOD_Desc}
            disabled={true}
            style={{ width: '50px', marginRight: '8px' }}
          />
          <TextField
            variant='standard'
            label="Ativo"
            value={Details.EquiCod}
            disabled={true}
            style={{ width: '100px', marginRight: '8px' }}
          />
          <TextField
            variant='standard'
            label="IMEI"
            value={Details.IMEI}
            disabled={true}
          />
        </section>
        <section className={classes.line}>
          <TextField
            variant='standard'
            label="Logradouro"
            value={Details.PdvLogradouroPV}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                PdvLogradouroPV: e.target.value
              }))
            }}
            style={{ width: '250px', marginRight: '8px' }}
          />
          <TextField
            variant='standard'
            label="Número"
            value={Details.PdvNumeroPV}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                PdvNumeroPV: e.target.value
              }))
            }}
            style={{ width: '70px', marginRight: '8px' }}
          />
        </section>
        <section className={classes.line}>
          <TextField
            variant='standard'
            label="Complemento"
            value={Details.PdvComplementoPV}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                PdvComplementoPV: e.target.value
              }))
            }}
            style={{ width: '100%' }}
          />
        </section>
        <section className={classes.line}>
          <TextField
            variant='standard'
            label="Bairro"
            value={Details.PdvBairroPV}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                PdvBairroPV: e.target.value
              }))
            }}
            style={{ width: '100%', marginRight: '8px' }}
          />
          <TextField
            variant='standard'
            label="Município"
            value={Details.PdvCidadePV}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                PdvCidadePV: e.target.value
              }))
            }}
            style={{ width: '200px' }}
          />
        </section>
        <section className={classes.lineStart}>
          <TextField
            variant='standard'
            label="UF"
            value={Details.PdvUfPV}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                PdvUfPV: e.target.value
              }))
            }}
            style={{ width: '50px', marginRight: '8px' }}
          />
          <TextField
            variant='standard'
            label="CEP"
            value={Details.PdvCEP}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                PdvCEP: e.target.value
              }))
            }}
            style={{ width: '100px' }}
          />
        </section>
        <section className={classes.lineStart}>
          <TextField
            variant='standard'
            label="Departamento"
            value={Details.PdvDepartamento}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                PdvDepartamento: e.target.value
              }))
            }}
            style={{ width: '100%', marginRight: '8px' }}
          />
          <TextField
            variant='standard'
            label="Anotações"
            value={Details.PdvObs}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                PdvObs: e.target.value
              }))
            }}
            style={{ width: '100%' }}
          />
        </section>

        <Divider variant="inset" />
        <li
          style={{
            listStyleType: 'none'
          }}
        >
          <Typography
            className={classes.dividerInset}
            color="primary"
            display="block"
            variant="caption"
          >
            Alterações
          </Typography>
        </li>

        <section className={classes.line}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <DatePicker
              label='Data Solicitação'
              disabled={true}
              defaultValue={Details.PdvDataSolicitacao}
              onChange={() => { }}
            />
            <DatePicker
              label='Data Inclusão'
              disabled={true}
              defaultValue={Details.PdvDataInclusao}
              onChange={() => { }}
            />
            <DatePicker
              label='Data Ativação'
              disabled={true}
              defaultValue={Details.PdvDataAtivacao}
              onChange={() => { }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <DatePicker
              label='Data Alteração'
              disabled={true}
              defaultValue={Details.PdvDataAlteracao}
              onChange={() => { }}
            />
            <DatePicker
              label='Data Sol. Enc.'
              disabled={true}
              defaultValue={Details.PdvDtSolicEncerra}
              onChange={() => { }}
            />
            <DatePicker
              label='Data Encerramento'
              disabled={true}
              defaultValue={Details.PdvDataEncerramento}
              onChange={() => { }}
            />
          </div>
        </section>
        <section className={classes.line}>
          <TextField
            variant='standard'
            label="Motivo do encerramento"
            value={Details.PdvDataEncerramento}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                PdvDataEncerramento: e.target.value
              }))
            }}
            style={{ width: '100%' }}
          />
        </section>

        <Divider variant="inset" />
        <li
          style={{
            listStyleType: 'none'
          }}
        >
          <Typography
            className={classes.dividerInset}
            color="primary"
            display="block"
            variant="caption"
          >
            Faturamento
          </Typography>
        </li>

        <section className={classes.line}>
          <FormControl
            className={classes.formControl}
            style={{
              minWidth: '120px'
            }}
          >
            <InputLabel>Anexo tem mín.</InputLabel>
            <Select
              value={Details.AnxFatMinimo}
              onChange={(e) => {
                DetailsChangeHandler(oldState => ({
                  ...oldState,
                  AnxFatMinimo: e.target.value
                }))
              }}
              disabled={allowEditing}
            >
              <MenuItem value='S'>Sim</MenuItem>
              <MenuItem value='N'>Não</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            className={classes.formControl}
            style={{
              minWidth: '150px'
            }}
          >
            <InputLabel>Mínimo por</InputLabel>
            <Select
              value={Details.AnxCalcMinPor}
              onChange={(e) => {
                DetailsChangeHandler(oldState => ({
                  ...oldState,
                  AnxCalcMinPor: e.target.value
                }))
              }}
              disabled={allowEditing}
            >
              <MenuItem value='A'>Anexo</MenuItem>
              <MenuItem value='P'>Ponto de Venda</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            className={classes.formControl}
            style={{
              minWidth: '100px'
            }}
          >
            <InputLabel>Tipo de mín.</InputLabel>
            <Select
              value={Details.AnxTipMin}
              onChange={(e) => {
                DetailsChangeHandler(oldState => ({
                  ...oldState,
                  AnxTipMin: e.target.value
                }))
              }}
              disabled={allowEditing}
            >
              <MenuItem value='R'>Reais</MenuItem>
              <MenuItem value='D'>Doses</MenuItem>
            </Select>
          </FormControl>
        </section>
        <section className={classes.line}>
          <FormControl
            className={classes.formControl}
            style={{
              minWidth: '150px'
            }}
          >
            <InputLabel>Consumo mínimo</InputLabel>
            <Select
              value={Details.PdvConsMin}
              onChange={(e) => {
                DetailsChangeHandler(oldState => ({
                  ...oldState,
                  PdvConsMin: e.target.value
                }))
              }}
              disabled={allowEditing}
            >
              <MenuItem value='S'>Sim</MenuItem>
              <MenuItem value='N'>Não</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant='standard'
            label="Consumo mín. em R$"
            value={Details.PdvConsValor}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                PdvConsValor: e.target.value
              }))
            }}
            style={{ width: '100%' }}
          />
          <TextField
            variant='standard'
            label="Consumo mín. em doses"
            value={Details.PdvConsDose}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              DetailsChangeHandler(oldState => ({
                ...oldState,
                PdvConsDose: e.target.value
              }))
            }}
            style={{ width: '100%' }}
          />
        </section>
        <section className={classes.line}>
          <FormControl
            className={classes.formControl}
            style={{
              width: '100%',
            }}
          >
            <InputLabel>Considerar valor pago no cálculo de mínimo?</InputLabel>
            <Select
              value={Details.PdvSomaCompartilhado}
              onChange={(e) => {
                DetailsChangeHandler(oldState => ({
                  ...oldState,
                  PdvSomaCompartilhado: e.target.value
                }))
              }}
              disabled={allowEditing}
            >
              <MenuItem value='S'>Sim</MenuItem>
              <MenuItem value='N'>Não</MenuItem>
            </Select>
          </FormControl>
        </section>
        
      </DialogContent>

      <DialogActions>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItem: 'center',
          }}
        >
          {allowEditing ?
            <Button
              disabled={wait}
              onClick={() => handleInativar(Details)}
              color="primary"
              startIcon={Details.PdvStatus === 'A' ? <ThumbDownAltIcon /> : <ThumbUpAltIcon />}
            >
              {Details.PdvStatus === 'A' ? 'Inativar' : 'Reativar'}
            </Button>
            :
            <Button
              disabled={wait}
              onClick={() => {
                DetailsChangeHandler(oldState => {
                  console.log(oldState)
                  console.log(backupData)
                  return backupData
                })
                setAllowEditing(true)
              }}
              color="secondary"
              startIcon={<CloseIcon />}
            >
              Descartar Alterações
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
        </div>
      </DialogActions>
    </Dialog >
  );
}

const useStyles = makeStyles(theme => ({
  line: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    minWidth: '400px',
    marginBottom: '8px'
  },
  lineStart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'nowrap',
    minWidth: '400px',
    marginBottom: '8px'
  },
  infoBox: {
    padding: '4px',
    border: '1px solid #ccc',
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
