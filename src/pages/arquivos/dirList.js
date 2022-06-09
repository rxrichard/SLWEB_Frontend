import React from 'react'

import { makeStyles } from "@material-ui/core/styles";

import { DirItem } from './dirItem'

export const DirList = ({ Arquivos, Pastas }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <section className={classes.folders}>
        {Pastas.map(pas => (
          <DirItem
            filename={pas}
            type='folder'
          />
        ))}
      </section>
      <section className={classes.archives}>
        {Arquivos.map(arq => (
          <DirItem
            filename={arq}
            type='file'
          />
        ))}
      </section>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    height: 'calc(100% - 64px)',
    // maxHeight: 'calc(100% - 100px)',
    background: 'unset',
    overflowY: 'auto',
    overflowX: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: '0px 0px 4px 4px',
    borderBottom: `5px solid #000`,
    borderLeft: `1px solid #000`,
    borderRight: `1px solid #000`,
    borderTop: `1px solid #CCC`,
    paddingTop: '8px'
  },
  folders: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    overflowY: 'auto',
  },
  archives: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    overflowY: 'auto',
  }
}))