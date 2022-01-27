import React from 'react';

import { makeStyles, Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons'

import Input from '../../components/materialComponents/InputUnderline'

export const ClienteListOptions = ({ filtro, onChangeFiltro, onOpenNewClientesModal }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Input
        disabled={false}
        type='text'
        label='Pesquisar...'
        onChange={e => onChangeFiltro(e.target.value)}
        value={filtro}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onOpenNewClientesModal}
        startIcon={<AddIcon />}
      >
        Novo Cliente
      </Button>
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