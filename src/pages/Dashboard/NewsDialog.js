import React from 'react';
import { api } from '../../services/api'

import { withStyles } from '@material-ui/core/styles';
import {
  Close as CloseIcon,
  VpnLock as VpnLockIcon,
  PermDataSetting as PermDataSettingIcon
} from '@material-ui/icons';

import {
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  IconButton,
  Typography,
} from '@material-ui/core'

export const NewsDialog = ({ open, onClose }) => {

  const handleRequestVPNFiles = async(type) => {
    try{
      const response = await api.get(`/vpn/files/${type}`)
    
      if(type === 'ovpn'){
        //salvar como .ovpn
      }else if(type === 'pritunl'){
        //salvar como .pritunl
      }
    }catch(err){

    }
  }

  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={onClose}
        >
          Atualização de VPN
        </DialogTitle>
        <DialogContent
          dividers
          style={{
            width: '550px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <Typography gutterBottom>
              A VPN da Pilão será <strong>atualizada</strong> para uma nova versão e para tal será necessário instalar o <strong>novo gerenciador de VPN</strong> junto a um <strong>novo arquivo de configuração</strong>.
            </Typography>
            <Typography gutterBottom>
              Faça o download dos arquivos abaixo e siga o passo a passo no video para completar a instalação.
            </Typography>
            <div
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                margin: '0px 0px 8px 0px'
              }}
            >
              <Button
                variant='contained'
                onClick={() => handleRequestVPNFiles('ovpn')}
                color='primary'
                style={{
                  marginRight: '8px'
                }}
                startIcon={
                  <VpnLockIcon />
                }
                >
                Configuração VPN
              </Button>
              <Button
                variant='contained'
                onClick={() => handleRequestVPNFiles('pritunl')}
                color='primary'
                startIcon={
                  <PermDataSettingIcon />
                }
              >
                PritUnl
              </Button>
            </div>
            <iframe
              width="504"
              height="283,5"
              src="https://www.youtube.com/embed/dBFv5FX6Ig0"
              title="Instalação PritUnl"
              frameborder="0"
              allow="
            accelerometer; 
            autoplay; 
            clipboard-write; 
            encrypted-media; 
            gyroscope; 
            picture-in-picture
            "
              allowfullscreen
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="primary"
          >
            Ciente!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
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