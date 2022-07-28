import React from 'react';

import { makeStyles } from '@material-ui/styles'

import { LinhaVariavel } from './linhaVariavel'

export const DespesasVariaveis = ({ DesV }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {DesV.map(d => <LinhaVariavel linha={d} />)}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    width: '100%',
    padding: '8px 0px 8px 0px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    margin: '8px'
  },
}))