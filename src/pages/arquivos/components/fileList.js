import React, { useState } from 'react'

import { makeStyles } from '@material-ui/styles'
import { List, Button } from '@material-ui/core'

import { File } from './file'

export const FileList = ({ fileList }) => {
  const classes = useStyles();
  const [markedItems, setMarkedItems] = useState([])

  const handleCheckItem = (item) => {
    let foundIndex = null
    if (markedItems.filter((it, i) => {
      if (it.filename === item.filename) {
        foundIndex = i
        return true
      }
    }).length > 0) {
      //remover
      console.log('caiu no remover')
      setMarkedItems(oldState => {
        let aux = [...oldState]
        aux.splice(foundIndex, 1)
        return aux
      })
    } else {
      //add
      console.log('caiu no add')
      setMarkedItems(oldState => {
        let aux = [...oldState]
        aux.push(item)
        return aux
      })
    }
  }

  const handleDownloadMarked = async () => {
    alert('baixar todos marcados')
  }

  return (
    <>
      <List dense className={classes.root}>
        {fileList.map(f => (
          <File
            file={f}
            key={f.path}
            onMarkItem={handleCheckItem}
            markedItems={markedItems.map(item => item.filename)}
          />
        ))}
      </List>
      <Button
        variant='contained'
        color='primary'
        disabled={markedItems.length === 0}
        onClick={handleDownloadMarked}
      >
        Baixar tudo
      </Button>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    heigth: 'calc(100% - 64px)',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  }
}))