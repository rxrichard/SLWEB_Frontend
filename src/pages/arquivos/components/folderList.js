import React from 'react'

import { makeStyles } from '@material-ui/styles'

import { Folder } from './folder'

export const FolderList = ({ folderList, onRequestOpenFolder, goBack, depthLevel }) => {
  const classes = useStyles();

  return (
    <section className={classes.folders}>
      {depthLevel > 1 ?
        <Folder
          folder={{ folder: 'VOLTAR', path: '' }}
          onOpenFolder={onRequestOpenFolder}
          type='empty'
          goBack={goBack}
        />
        :
        null
      }

      {folderList.map(f =>
        <Folder
          key={f.path}
          folder={f}
          onOpenFolder={onRequestOpenFolder}
          type='folder'
          goBack={goBack}
        />
      )}
    </section>
  )
}

const useStyles = makeStyles((theme) => ({
  folders: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    overflowY: 'auto',
    height: '133px',
    flexShrink: 0
  }
}))