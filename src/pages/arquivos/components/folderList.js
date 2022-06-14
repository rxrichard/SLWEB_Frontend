import React from 'react'

import { makeStyles } from '@material-ui/styles'

import { Folder } from './folder'

export const FolderList = ({ folderList }) => {
  const classes = useStyles();

  return (
    <section className={classes.folders}>
      {folderList.map(f => (
        <Folder folder={f} key={f.path} />
      ))}
    </section>
  )
}

const useStyles = makeStyles((theme) => ({
  folders: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    overflowY: 'auto',
  }
}))