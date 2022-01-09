import React from "react";
import Draggable from "react-draggable";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
  Grid,
  makeStyles
} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';

import { toValidString } from '../../../misc/commom_functions'
import { RED_PRIMARY } from '../../../misc/colors'

function ModalPersonalizado(props) {
  const classes = useStyles()

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <div         style={{ display:"flex",justifyContent:"space-around", flexDirection:"row" }}>
        <DialogTitle style={{ cursor: "move"}} id="draggable-dialog-title">
          
          {props.title}
        </DialogTitle>
        <Button
            onClick={props.onClose}
            color="primary"
            
          >
           Fechar <CloseIcon/>
          </Button>
          </div>
        
        <DialogContent>
          {whichContentShow(props.TMT, props.tipo, classes)}
        </DialogContent>
        <DialogActions style={{ padding: '8px 24px' }}>
          {props.action}
       
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalPersonalizado;

function PaperComponent(props) {
  return (
    <Draggable
      {...props}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    padding: '10px 0px',
  },
  grid: {
    textAlign: 'center',
  },
  gridPai: {
    width: '100%',
    margin: '0px',
    justifyContent: 'space-around'
  }
}));

const whichContentShow = (TMT, type, classes) => {
  switch (type) {
    case 'Leituras':
      return (
        <Grid className={classes.gridPai} container spacing={3}>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Esta semana</Typography>
            <Paper className={classes.paper}><Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>{toValidString(TMT.Ql0, 0)}</Typography></Paper>
          </Grid>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Há uma semana</Typography>
            <Paper className={classes.paper}><Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>{toValidString(TMT['Ql-1'], 0)}</Typography></Paper>
          </Grid>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Há duas semanas</Typography>
            <Paper className={classes.paper}><Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>{toValidString(TMT['Ql-2'], 0)}</Typography></Paper>
          </Grid>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Há três semanas</Typography>
            <Paper className={classes.paper}>
              <Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>
                {toValidString(TMT['Ql-3'], 0)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Há quatro semanas</Typography>
            <Paper className={classes.paper}>
              <Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>
                {toValidString(TMT['Ql-4'], 0)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )
    case 'Contador':
      return (
        <Grid className={classes.gridPai} container spacing={3}>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Esta semana</Typography>
            <Paper className={classes.paper}><Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>{toValidString(TMT.Con0, 0)}</Typography></Paper>
          </Grid>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Há uma semana</Typography>
            <Paper className={classes.paper}><Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>{toValidString(TMT['Con-1'], 0)}</Typography></Paper>
          </Grid>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Há duas semanas</Typography>
            <Paper className={classes.paper}><Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>{toValidString(TMT['Con-2'], 0)}</Typography></Paper>
          </Grid>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Há três semanas</Typography>
            <Paper className={classes.paper}><Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>{toValidString(TMT['Con-3'], 0)}</Typography></Paper>
          </Grid>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Há quatro semanas</Typography>
            <Paper className={classes.paper}><Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>{toValidString(TMT['Con-4'], 0)}</Typography></Paper>
          </Grid>
        </Grid>
      )
    case 'Produção de doses':
      return (
        <Grid className={classes.gridPai} container spacing={3}>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Esta semana</Typography>
            <Paper className={classes.paper}><Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>{toValidString(TMT.Prd, 0)}</Typography></Paper>
          </Grid>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Há uma semana</Typography>
            <Paper className={classes.paper}><Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>{toValidString(TMT.Prd1, 0)}</Typography></Paper>
          </Grid>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Há duas semanas</Typography>
            <Paper className={classes.paper}><Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>{toValidString(TMT.Prd2, 0)}</Typography></Paper>
          </Grid>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Há três semanas</Typography>
            <Paper className={classes.paper}><Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>{toValidString(TMT.Prd3, 0)}</Typography></Paper>
          </Grid>
          <Grid item className={classes.grid} xs={15} sm={2}>
            <Typography variant="subtitle2">Total Mensal</Typography>
            <Paper className={classes.paper}>

              <Typography style={{ color: RED_PRIMARY, fontWeight: 'bold' }} variant='body1'>
                {
                  Number(toValidString(TMT.Prd, 0)) +
                  Number(toValidString(TMT.Prd1, 0)) +
                  Number(toValidString(TMT.Prd2, 0)) +
                  Number(toValidString(TMT.Prd3, 0))
                }
              </Typography>

            </Paper>
          </Grid>
        </Grid>
      )
    default:
      return
  }
}