import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api'

import { Button, Dialog, MobileStepper, DialogActions, DialogContent, DialogTitle as MuiDialogTitle, useMediaQuery, IconButton, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Divider } from '@material-ui/core/';
import { useTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import { Close as CloseIcon, Save as SaveIcon, ThumbDownAlt as ThumbDownAltIcon, ThumbUpAlt as ThumbUpAltIcon, Edit as EditIcon, KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';

import DatePicker from '../../../components/materialComponents/datePicker'
import { Toast } from '../../../components/toasty'
import { toValidString } from '../../../misc/commom_functions'

export const DetailsModal = ({ open, onClose, Details, DetailsChangeHandler, Depositos, Configuracoes, Equipamentos, updatePDVsArray, updateEqsArray }) => {
  const theme = useTheme();
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [backupData, setBackupData] = useState({})
  const [allowEditing, setAllowEditing] = useState(true)
  const [wait, setWait] = useState(false)
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setBackupData(Details)
    // eslint-disable-next-line
  }, [open])

  const handleChangeEditingState = async (PDV) => {
    setAllowEditing(oldState => !oldState)

    if (!allowEditing) {
      let toastId = null

      toastId = Toast('Atualizando...', 'wait')
      setWait(true)

      try {
        if (activeStep === 0) {
          await api.put('/pontosdevenda/atualizar', {
            PDV: PDV
          })

          Toast('Ponto de venda atualizado', 'update', toastId, 'success')
          setWait(false)

          updatePDVsArray(oldState => {
            let pdvIndex = null
            let aux = [...oldState]

            oldState.forEach((item, index) => {
              if (item.PdvId === PDV.PdvId && item.AnxId === PDV.AnxId) {
                pdvIndex = index
              }
            })

            aux[pdvIndex] = PDV

            return aux
          })

          setBackupData(PDV)
        } else {
          Toast('Qualquer coisa atualizada', 'update', toastId, 'success')
          setWait(false)
        }
      } catch (err) {
        Toast('Falha ao atualizar ponto de venda', 'update', toastId, 'error')
        setAllowEditing(false)
        setWait(false)
      }
    }
  }

  const handleInativar = async (PDV) => {
    let toastId = null

    toastId = Toast(PDV.PdvStatus === 'A' ? 'Inativando...' : 'Ativando...', 'wait')
    setWait(true)

    try {

      await api.put('/pontosdevenda/inativar', {
        PdvId: PDV.PdvId,
        AnxId: PDV.AnxId,
        Status: PDV.PdvStatus === 'A' ? 'I' : 'A'
      })

      Toast(PDV.PdvStatus === 'A' ? 'Ponto de venda inativado' : 'Ponto de venda ativado', 'update', toastId, 'success')
      setWait(false)

      DetailsChangeHandler(oldState => ({
        ...oldState,
        PdvStatus: PDV.PdvStatus === 'A' ? 'I' : 'A',
        PdvDataAlteracao: new Date(),
        PdvDataEncerramento: PDV.PdvStatus === 'A' ? new Date() : null
      }))

      updatePDVsArray(oldState => {
        let pdvIndex = null
        let aux = [...oldState]

        oldState.forEach((item, index) => {
          if (item.PdvId === PDV.PdvId && item.AnxId === PDV.AnxId) {
            pdvIndex = index
          }
        })

        aux[pdvIndex] = {
          ...PDV,
          PdvStatus: PDV.PdvStatus === 'A' ? 'I' : 'A',
          PdvDataAlteracao: new Date(),
          PdvDataEncerramento: PDV.PdvStatus === 'A' ? new Date() : null
        }

        return aux
      })

      updateEqsArray(oldState => {
        if (PDV.PdvStatus === 'I') {
          //remover
          let i = null

          oldState.forEach((Eq, index) => {
            if (Eq.EquiCod === PDV.EquiCod) {
              i = index
            }
          })

          let a = [...oldState]

          a.splice(i, 1)

          return a
        } else {
          //add
          return [...oldState, { EquiCod: PDV.EquiCod }]
        }
      })

    } catch (err) {
      Toast(PDV.PdvStatus === 'A' ? 'Falha ao inativar ponto de venda' : 'Falha ao ativar ponto de venda', 'update', toastId, 'error')
      setWait(false)
    }
  }

  const whichContentShow = (stage) => {
    switch (stage) {
      case 0:
        return (
          <>
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
                value={toValidString(Details.AnxDesc)}
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
                  {Depositos.map(dep => (
                    <MenuItem value={dep.DepId}>{dep.DepNome}</MenuItem>
                  ))}
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
                  {Configuracoes.map(cfg => (
                    <MenuItem value={cfg.CfgId}>{cfg.CfgDesc}</MenuItem>
                  ))}
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
                value={toValidString(Details.PdvLogradouroPV)}
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
                value={toValidString(Details.PdvNumeroPV)}
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
                value={toValidString(Details.PdvComplementoPV)}
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
                value={toValidString(Details.PdvBairroPV)}
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
                value={toValidString(Details.PdvCidadePV)}
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
                value={toValidString(Details.PdvUfPV)}
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
                value={toValidString(Details.PdvCEP)}
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
                value={toValidString(Details.PdvDepartamento)}
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
                value={toValidString(Details.PdvObs)}
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
                  label='Data Ativação'
                  disabled={true}
                  defaultValue={Details.PdvDataAtivacao}
                  onChange={() => { }}
                />
                <DatePicker
                  label='Data Encerramento'
                  disabled={true}
                  defaultValue={Details.PdvDataEncerramento}
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
                <TextField
                  variant='standard'
                  label="Motivo do encerramento"
                  value={Details.PdvMotivoEncerramento}
                  disabled={allowEditing}
                  onChange={(e) => {
                    e.persist()
                    DetailsChangeHandler(oldState => ({
                      ...oldState,
                      PdvMotivoEncerramento: e.target.value
                    }))
                  }}
                  style={{ width: '170px', margin: '16px 0px 8px 0px' }}
                />
              </div>
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
                  minWidth: '120px'
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
                  minWidth: '120px'
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
            <section
              className={classes.line}
              style={{
                alignItems: 'flex-end',
              }}
            >
              <FormControl
                className={classes.formControl}
                style={{
                  minWidth: '120px',
                  marginRight: '8px'
                }}
              >
                <InputLabel>Consumo mín.</InputLabel>
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
                style={{ width: '120px', marginRight: '8px' }}
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
                style={{ width: '120px' }}
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
          </>
        )
      case 1:
        return (
          <h6>Configuracao</h6>
        )
      case 2:
        return (
          <>
            <h6>Equipamento</h6>

            {Equipamentos.length === 0 ?
              (
                <p>Todas suas máquinas já estão atribuidas.</p>
              )
              :
              Equipamentos.map(eqs => (
                <p>{eqs.EquiCod}</p>
              ))}
          </>
        )
      default:
        return null
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep === 2 ? 0 : prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep === 0 ? 2 : prevActiveStep - 1);
  };

  const discardChanges = (stage) => {
    switch (stage) {
      case 0:
        DetailsChangeHandler(backupData)
        setAllowEditing(true)
        break
      case 1:
        setAllowEditing(true)
        break
      case 2:
        setAllowEditing(true)
        break
      default:
        break
    }
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
        onClose={onClose}
      >
        Detalhes do PDV
      </DialogTitle>

      <DialogContent dividers>
        {whichContentShow(activeStep)}
      </DialogContent>

      <DialogActions>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItem: 'center',
            width: '100%',
          }}
        >
          {allowEditing ? (
            <MobileStepper
              steps={3}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={false}>
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={false}>
                  <KeyboardArrowLeft />
                </Button>
              }
            />
          ) : <div />}
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
                onClick={() => discardChanges(activeStep)}
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
