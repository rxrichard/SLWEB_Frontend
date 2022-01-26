import React from 'react'

import { ClientItem } from './clientItem'
import { makeStyles } from '@material-ui/core'

export const ClientList = ({ Clientes, onOpenModal }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {Clientes.map((cliente, index) =>
        <ClientItem
          Cliente={cliente}
          i={index}
          onOpenModal={onOpenModal}
        />
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 'calc(100% - 100px)',
    background: 'unset',
    overflowY: 'scroll',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    borderRadius: '0px 0px 4px 4px',
    borderBottom: `5px solid #000`,
    borderLeft: `1px solid #000`,
    borderRight: `1px solid #000`,
    borderTop: `1px solid #CCC`,
    paddingTop: '8px'
  }
}))