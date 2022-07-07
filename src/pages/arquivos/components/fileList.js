import React from 'react'

import { makeStyles } from '@material-ui/styles'
import { List, Button, Typography } from '@material-ui/core'
import { DoneAll as DoneAllIcon, ClearAll as ClearAllIcon } from '@material-ui/icons'

import { File } from './file'

export const FileList = ({ fileList, onBlock, onDelete, markedItems, onMarkUnmarkAll, onCheckItem }) => {
  const classes = useStyles();



  // useEffect(() => {
  //   setMarkedItems([])
  // }, [fileList])

  return (
    <section className={classes.container}>
      {fileList.length === 0 ? (
        <>
          <Typography
            align='center'
            variant='h6'
            style={{
              padding: '16px 0px'
            }}
          >
            Nenhum arquivo nesta pasta
          </Typography>
        </>
      )
        :
        <List dense className={classes.root}>
          {fileList.map(f => (
            <File
              file={f}
              key={f.path}
              onMarkItem={onCheckItem}
              markedItems={markedItems.map(item => item.filename)}
              onBlock={onBlock}
              onDelete={onDelete}
            />
          ))}
        </List>
      }

      {fileList.length > 0 ? <Button
        className={classes.buttonRight}
        disabled={fileList.length === 0}
        onClick={onMarkUnmarkAll}
        startIcon={markedItems.length === fileList.length ? <ClearAllIcon /> : <DoneAllIcon />}
      >
        {markedItems.length === fileList.length ? 'Desmarcar todos' : 'Marcar todos'}
      </Button>
        :
        null
      }


    </section>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: 'calc(100% - 133px)',
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    overflowY: 'auto',
    height: 'calc(100% - 43px)'
  },
  buttonRight: {
    width: '100%',
  }
}))