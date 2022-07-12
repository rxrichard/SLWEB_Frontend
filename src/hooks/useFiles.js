import React, { createContext, useState, useEffect, useContext } from 'react'
import { saveAs } from 'file-saver'
import { api } from '../services/api'

import { Toast } from '../components/toasty'

const FilesContext = createContext()

export const FilesProvider = ({ children }) => {
  const [loaded, setLoaded] = useState(false)
  const [wait, setWait] = useState(false)

  const [arquivos, setArquivos] = useState([])
  const [pastas, setPastas] = useState([])
  const [folderPath, setFolderPath] = useState([])
  const [markedItems, setMarkedItems] = useState([])

  const [shouldShowModals, setShouldShowModals] = useState({
    shouldEnableNewFolderButton: false,
    shouldEnableDownloadButton: false,
    shouldEnableRenameButton: false,
    shouldEnableMoveButton: false,
    shouldEnableBlockButton: false,
    shouldEnableDeleteButton: false,
    shouldEnableUploadButton: false,
    shouldEnableSecurityButton: false
  })

  const LoadData = async (folder) => {
    if (folder !== 'root') {
      setLoaded(false)
    }

    try {
      setMarkedItems([])
      const response = await api.get(`/files/lookup/${folder}`)

      setArquivos(response.data.arquivos)
      setPastas(response.data.pastas)
      setFolderPath(response.data.pathSegments)
      setShouldShowModals({
        shouldEnableNewFolderButton: response.data.controlModals.createFolder,
        shouldEnableDownloadButton: response.data.controlModals.downloadContent,
        shouldEnableRenameButton: response.data.controlModals.renameContent,
        shouldEnableMoveButton: response.data.controlModals.moveContent,
        shouldEnableBlockButton: response.data.controlModals.blockContent,
        shouldEnableDeleteButton: response.data.controlModals.deleteContent,
        shouldEnableUploadButton: response.data.controlModals.upload,
        shouldEnableSecurityButton: response.data.controlModals.security
      })

      setLoaded(true)
    } catch (err) {
      if (folder !== 'root') {
        Toast('Não foi possível acessar a pasta', 'error')
      }
    }
  }

  useEffect(() => {
    LoadData('root')
  }, [])

  const handleClickPath = (folder) => {
    LoadData(folder)
  }

  const handleGoBack = () => {
    let actualFolder = folderPath.map((path, i) => {
      if (folderPath.length - 2 === i) {
        return `${path}`
      } else if (folderPath.length - 1 === i) {
        return ``
      } else {
        return `${path}\\`
      }
    })

    LoadData(encodeURI(actualFolder.toString().replace(/,/g, '')))
  }

  const handleBlockPath = async (type, ifFile = null) => {
    const proceed = window.confirm(`Deseja bloquear ${type === 'folder' ? 'a pasta:' : 'o arquivo:'}  ${type === 'folder' ? folderPath.toString().replace(/,/g, '\\') : ifFile}`)

    if (proceed) {
      let toastId = null
      toastId = Toast('Bloqueando...', 'wait')

      try {
        await api.post('/files/permissions/', {
          path: type === 'folder' ? folderPath.toString().replace(/,/g, '\\') : ifFile,
          type: type,
        })

        Toast('Recurso bloqueado', 'update', toastId, 'success')
        return true
      } catch (err) {
        Toast('Recurso já bloqueado ou você não tem permissão para executar a ação', 'update', toastId, 'error')
        return false
      }
    }
  }

  const handleDelete = async (filepath) => {
    const proceed = window.confirm(`Deseja apagar o arquivo ${filepath}?`)

    if (proceed) {
      let toastId = null
      toastId = Toast('Excluindo...', 'wait')

      try {
        await api.get(`/files/delete/${encodeURI(filepath)}`)

        Toast('Recurso excluído', 'update', toastId, 'success')
        return true
      } catch (err) {
        Toast('Recurso já excluído ou você não tem permissão para executar a ação', 'update', toastId, 'error')
        return false
      }
    }
  }

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

  const handleMarkUnmarkAll = () => {
    if (markedItems.length === arquivos.length) {
      setMarkedItems([])
    } else {
      setMarkedItems(arquivos)
    }
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

  const handleDownloadMarked = async () => {
    if(markedItems.length === 0){
      Toast('Selecione pelo menos um arquivo para ser baixado', 'warn')
      return
    }

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

  return (
    <FilesContext.Provider value={
      {
        uiControl: {
          loaded,
          wait
        },
        data: {
          files: arquivos,
          folders: pastas,
          folderPath,
          markedItems,
        },
        uiPermissions: shouldShowModals,
        actions: {
          onDownload: handleDownload,
          onDownloadMarkedItems: handleDownloadMarked,
          onMarkItem: handleCheckItem,
          onMarkAllItems: handleMarkUnmarkAll,
          onDelete: handleDelete,
          onBlock: handleBlockPath,
          onNavigateBackwards: handleGoBack,
          onNavigate: handleClickPath,
        }
      }
    }>
      {children}
    </FilesContext.Provider>
  )
}

export const useFiles = () => {
  const context = useContext(FilesContext)

  return context
}