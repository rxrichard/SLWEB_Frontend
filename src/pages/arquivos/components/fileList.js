import React, { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import { api } from '../../../services/api'

import { makeStyles } from '@material-ui/styles'
import { List, Button, Typography } from '@material-ui/core'
import { DoneAll as DoneAllIcon, ClearAll as ClearAllIcon, CloudDownload as CloudDownloadIcon } from '@material-ui/icons'

import { File } from './file'
import { Toast } from '../../../components/toasty'

export const FileList = ({ fileList, onBlock }) => {
  const classes = useStyles();
  const [markedItems, setMarkedItems] = useState([])
  const [wait, setWait] = useState(false)

  useEffect(() => {
    setMarkedItems([])
  }, [fileList])

  const handleCheckItem = (item) => {
    let foundIndex = null
    if (markedItems.filter((it, i) => {
      if (it.filename === item.filename) {
        foundIndex = i
        return true
      } else {
        return false
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
    let baixadosComSucesso = []

    for (let i = 0; i < markedItems.length; i++) {
      let downloaded = await handleDownload(markedItems[i].path)

      if (downloaded) {
        baixadosComSucesso.push(markedItems[i].path)
      }
    }

    setMarkedItems(oldState => {
      let aux = [...oldState].filter(marked => baixadosComSucesso.indexOf(marked.path) === -1)

      return aux
    })
  }

  const handleDownload = async (filepath) => {
    let toastId = null;
    toastId = Toast("Baixando...", "wait");
    setWait(true)

    try {
      const response = await api.get(`/files/download/${encodeURI(filepath)}`, {
        responseType: "arraybuffer",
      })

      Toast("Download concluído", "update", toastId, "success");

      //Converto o PDF para BLOB
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      //Salvo em PDF junto com a data atual, só pra não sobreescrever nada
      saveAs(blob, String(filepath).split('\\')[String(filepath).split('\\').length - 1]);
      setWait(false)
      return true
    } catch (err) {
      Toast("Falha no download", "update", toastId, "error");
      setWait(false)
      return false
    }
  }



  const handleMarkUnmarkAll = () => {
    if (markedItems.length === fileList.length) {
      setMarkedItems([])
    } else {
      setMarkedItems(fileList)
    }
  }

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
              onMarkItem={handleCheckItem}
              markedItems={markedItems.map(item => item.filename)}
              onDownloadFile={handleDownload}
              onBlock={onBlock}
            />
          ))}
        </List>
      }


      <Button
        className={classes.buttonLeft}
        variant='contained'
        color='primary'
        disabled={markedItems.length === 0 || wait}
        onClick={handleDownloadMarked}
        startIcon={<CloudDownloadIcon />}
      >
        Baixar marcados
      </Button>
      <Button
        className={classes.buttonRight}
        variant='outlined'
        color='primary'
        disabled={wait || fileList.length === 0}
        onClick={handleMarkUnmarkAll}
        startIcon={markedItems.length === fileList.length ? <ClearAllIcon /> : <DoneAllIcon />}
      >
        {markedItems.length === fileList.length ? 'Desmarcar todos' : 'Marcar todos'}
      </Button>

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
  buttonLeft: {
    width: '50%',
    marginBottom: '8px',
    borderRadius: '4px 0px 0px 4px'
  },
  buttonRight: {
    width: '50%',
    marginBottom: '8px',
    borderRadius: '0px 4px 4px 0px'
  }
}))