import React, { useState, useEffect } from 'react'
import { api } from '../../../services/api'

import { makeStyles } from '@material-ui/styles'
import { List, Button } from '@material-ui/core'

import { File } from './file'
import { Toast } from '../../../components/toasty'

export const FileList = ({ fileList }) => {
  const classes = useStyles();
  const [markedItems, setMarkedItems] = useState([])

  useEffect(() => {
    setMarkedItems([])
  }, [fileList])

  const handleCheckItem = (item) => {
    let foundIndex = null
    if (markedItems.filter((it, i) => {
      if (it.filename === item.filename) {
        foundIndex = i
        return true
      }
    }).length > 0) {
      //remover
      setMarkedItems(oldState => {
        let aux = [...oldState]
        aux.splice(foundIndex, 1)
        return aux
      })
    } else {
      //add
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

  const handleDownload = async (filepath) => {
    let toastId = null;
    toastId = Toast("Baixando...", "wait");

    try {
      const response = await api.get(`/files/download/${filepath}`, {
        responseType: "arraybuffer",
      })

      Toast("Download concluído", "update", toastId, "success");
      
      //Converto o PDF para BLOB
      // const blob = new Blob([response.data], { type:  });

      //Salvo em PDF junto com a data atual, só pra não sobreescrever nada
      // saveAs(blob, );
    } catch (err) {
      Toast("Falha no download", "update", toastId, "error");
    }
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
      {/* <Button
        variant='contained'
        color='primary'
        disabled={markedItems.length === 0}
        onClick={handleDownloadMarked}
      >
        Baixar tudo
      </Button> */}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // height: 'calc(100% - 170px)',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    overflowY: 'auto'
  }
}))