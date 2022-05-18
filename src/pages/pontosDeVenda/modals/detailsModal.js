import React, { useState } from 'react';
// import { api } from '../../../services/api'

import { Button, Dialog, MobileStepper, DialogActions, DialogContent, DialogTitle as MuiDialogTitle, useMediaQuery, IconButton, Typography } from '@material-ui/core/';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { Close as CloseIcon, Save as SaveIcon, ThumbDownAlt as ThumbDownAltIcon, ThumbUpAlt as ThumbUpAltIcon, Edit as EditIcon, KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';

// import { Toast } from '../../../components/toasty'

import { Configuracao } from './_configuracao'
import { Dados } from './_dados'
import { Equipamento } from './_equipamentos'

export const DetailsModal = ({ open, onClose, PdvId, PdvStatus, updatePDVsArray }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [activeStep, setActiveStep] = useState(0);
  const [allowEditing, setAllowEditing] = useState(false);
  const [wait, setWait] = useState(false);

  const handleChangeEditingState = async (PDV) => {
    alert('revisar função de inativar')
    return
    // setAllowEditing(oldState => !oldState)

    // if (!allowEditing) {
    //   let toastId = null

    //   toastId = Toast('Atualizando...', 'wait')
    //   setWait(true)

    //   try {
    //     if (activeStep === 0) {
    //       await api.put('/pontosdevenda/atualizar', {
    //         PDV: PDV
    //       })

    //       Toast('Ponto de venda atualizado', 'update', toastId, 'success')
    //       setWait(false)

    //       updatePDVsArray(oldState => {
    //         let pdvIndex = null
    //         let aux = [...oldState]

    //         oldState.forEach((item, index) => {
    //           if (item.PdvId === PDV.PdvId && item.AnxId === PDV.AnxId) {
    //             pdvIndex = index
    //           }
    //         })

    //         aux[pdvIndex] = PDV

    //         return aux
    //       })

    //       setBackupData(PDV)
    //     } else {
    //       Toast('Qualquer coisa atualizada', 'update', toastId, 'success')
    //       setWait(false)
    //     }
    //   } catch (err) {
    //     Toast('Falha ao atualizar ponto de venda', 'update', toastId, 'error')
    //     setAllowEditing(false)
    //     setWait(false)
    //   }
    // }
  }

  const handleInativar = async (PDV) => {
    alert('revisar função de inativar')
    return

    // let toastId = null

    // toastId = Toast(PDV.PdvStatus === 'A' ? 'Inativando...' : 'Ativando...', 'wait')
    // setWait(true)

    // try {

    //   await api.put('/pontosdevenda/inativar', {
    //     PdvId: PDV.PdvId,
    //     AnxId: PDV.AnxId,
    //     Status: PDV.PdvStatus === 'A' ? 'I' : 'A'
    //   })

    //   Toast(PDV.PdvStatus === 'A' ? 'Ponto de venda inativado' : 'Ponto de venda ativado', 'update', toastId, 'success')
    //   setWait(false)

    //   DetailsChangeHandler(oldState => ({
    //     ...oldState,
    //     PdvStatus: PDV.PdvStatus === 'A' ? 'I' : 'A',
    //     PdvDataAlteracao: new Date(),
    //     PdvDataEncerramento: PDV.PdvStatus === 'A' ? new Date() : null
    //   }))

    //   updatePDVsArray(oldState => {
    //     let pdvIndex = null
    //     let aux = [...oldState]

    //     oldState.forEach((item, index) => {
    //       if (item.PdvId === PDV.PdvId && item.AnxId === PDV.AnxId) {
    //         pdvIndex = index
    //       }
    //     })

    //     aux[pdvIndex] = {
    //       ...PDV,
    //       PdvStatus: PDV.PdvStatus === 'A' ? 'I' : 'A',
    //       PdvDataAlteracao: new Date(),
    //       PdvDataEncerramento: PDV.PdvStatus === 'A' ? new Date() : null
    //     }

    //     return aux
    //   })

    //   updateEqsArray(oldState => {
    //     if (PDV.PdvStatus === 'I') {
    //       //remover
    //       let i = null

    //       oldState.forEach((Eq, index) => {
    //         if (Eq.EquiCod === PDV.EquiCod) {
    //           i = index
    //         }
    //       })

    //       let a = [...oldState]

    //       a.splice(i, 1)

    //       return a
    //     } else {
    //       //add
    //       return [...oldState, { EquiCod: PDV.EquiCod }]
    //     }
    //   })

    // } catch (err) {
    //   Toast(PDV.PdvStatus === 'A' ? 'Falha ao inativar ponto de venda' : 'Falha ao ativar ponto de venda', 'update', toastId, 'error')
    //   setWait(false)
    // }
  }

  const handleDiscardChanges = () => {}

  const whichContentShow = (stage) => {
    switch (stage) {
      case 0:
        return (
          <Dados
            PdvId={PdvId}
            allowEditing={allowEditing}
            onAllowEditingChange={setAllowEditing}
          />
        )
      case 1:
        return (
          <Configuracao
            PdvId={PdvId}
            allowEditing={allowEditing}
            onAllowEditingChange={setAllowEditing}
          />
        )
      case 2:
        return (
          <Equipamento
            PdvId={PdvId}
            allowEditing={allowEditing}
            onAllowEditingChange={setAllowEditing}
          />
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
        Ponto de Venda
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
                onClick={handleInativar}
                color="primary"
                startIcon={PdvStatus === 'A' ? <ThumbDownAltIcon /> : <ThumbUpAltIcon />}
              >
                {PdvStatus === 'A' ? 'Inativar' : 'Reativar'}
              </Button>
              :
              <Button
                disabled={wait}
                onClick={handleDiscardChanges}
                color="secondary"
                startIcon={<CloseIcon />}
              >
                Descartar Alterações
              </Button>
            }

            <Button
              disabled={wait}
              onClick={handleChangeEditingState}
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
