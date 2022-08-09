import React from 'react'

import { makeStyles } from '@material-ui/core'
import { RED_PRIMARY } from '../../../misc/colors'

export const ConfigListItemHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.line}>
      <label className={classes.Sel}>Seleção</label>
      <label className={classes.Prod}>Bebida</label>
      <label className={classes.TV}> Tipo de Venda </label>
      <label className={classes.Val}>Val. 1</ label>
      <label className={classes.Val}>Val. 2</ label>
      <label className={classes.Rec}>Receita</label>
    </div>
  )
}


const useStyles = makeStyles((theme) => ({
  line: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minWidth: '500px',
    height: '40px',
    borderRadius: '20px',
    margin: '0px 0px 4px 0px',
    border: '1px solid #CCC',

    '@media (max-width: 850px)': {
      border: 'none',
    }
  },
  Sel: {
    width: '100% !important',
    minWidth: '30px !important',
    maxWidth: '50px !important',
    textAlign: 'center',
    // height: '100% !important',
    borderRadius: '18px 0px 0px 18px !important',
    borderBottom: 'none !important'
  },
  Prod: {
    display: 'block',
    cursor: 'pointer',
    width: '300px',
    // height: '100%',
    borderRadius: '0px',
    border: 'none',
  },
  Opt: {
    cursor: 'pointer'
  },
  TV: {
    display: 'block',
    cursor: 'pointer',
    width: '200px',
    // height: '100%',
    borderRadius: '0px',
    border: 'none',
  },
  Val: {
    width: '100% !important',
    minWidth: '40px !important',
    maxWidth: '70px !important',
    // height: '100% !important',
    borderRadius: '0px !important',
    padding: '0px 0px 0px 8px !important',
    borderBottom: 'none !important'
  },
  Rec: {
    display: 'block',
    cursor: 'pointer',
    width: '200px',
    // height: '100%',
    border: 'none',
  },
  ButtonContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '0px 18px 18px 0px !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: RED_PRIMARY,
    cursor: 'pointer'
  }
}));
