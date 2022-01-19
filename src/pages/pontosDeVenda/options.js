import React from 'react';

import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';

import Input from '../../components/materialComponents/InputUnderline'

export const PdvListOptions = ({ onRequestInactivePdvs, showInactivePdvs, filtro, onChangeFiltro }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <FormControlLabel
        control={
          <Checkbox
            className={classes.checkbox}
            checked={showInactivePdvs}
            onChange={(e) => onRequestInactivePdvs(e.target.checked)}
          />
        }
        label="Mostrar PDVs inativos"
      />
      <Input 
      disabled={false}
      onChange={onChangeFiltro}
      value={filtro}
      type='text'
      label='Pesquisar...'
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100px',
    background: 'unset',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  checkbox: {
    transform: "scale(0.3)",
  }
}))