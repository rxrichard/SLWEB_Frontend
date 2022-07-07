import React, { useState, useEffect } from 'react';
import { api } from '../../services/api'
import { saveAs } from 'file-saver'

import { Grow, Fab } from '@material-ui/core'
import {
  Close as CloseIcon,
  Menu as MenuIcon,
  Backup as BackupIcon,
  Security as SecurityIcon
} from '@material-ui/icons'

import Loading from '../../components/loading_screen'
import { Panel } from '../../components/commom_in'
import { Toast } from '../../components/toasty'

import { Options } from './options'
import { Explorer } from './explorer'
import { UploadModal } from './modals/UploadModal'
import { SecurityModal } from './modals/SecurityModal'
import { NewFolderModal } from './modals/newFolderModal'
import { RenameModal } from './modals/renameModal'

const Arquivos = () => {
  const [loaded, setLoaded] = useState(false)
  const [moreOptions, setMoreOptions] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [securityModalOpen, setSecurityModalOpen] = useState(false)
  const [newFolderModalOpen, setNewFolderModalOpen] = useState(false)
  const [renameModalOpen, setRenameModalOpen] = useState(false)
  const [wait, setWait] = useState(false)

  const [markedItems, setMarkedItems] = useState([])
  const [arquivos, setArquivos] = useState([])
  const [pastas, setPastas] = useState([])
  const [folderPath, setFolderPath] = useState([])
  const [shouldShowModals, setShouldShowModals] = useState({ security: false, upload: false })

  async function LoadData(folder) {
    if (folder !== 'root') {
      setLoaded(false)
    }

    try {
      setMarkedItems([])
      const response = await api.get(`/files/lookup/${folder}`)

      setArquivos(response.data.arquivos)
      setPastas(response.data.pastas)
      setFolderPath(response.data.pathSegments)
      setShouldShowModals(response.data.controlModals)

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
    if (markedItems.length === arquivos.length) {
      setMarkedItems([])
    } else {
      setMarkedItems(arquivos)
    }
  }

  /* DAQUI ATÉ O RETURN É SÓ SETTER DE STATE DE CONTROLE */

  const handleOpenSecurityModal = () => {
    setSecurityModalOpen(true)
  }

  const handleCloseSecurityModal = () => {
    setSecurityModalOpen(false)
  }

  const handleOpenUploadModal = () => {
    setUploadModalOpen(true)
  }

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false)
  }

  const handleOpenNewFolderModal = () => {
    setNewFolderModalOpen(true)
  }

  const handleCloseNewFolderModal = () => {
    setNewFolderModalOpen(false)
  }

  const handleOpenRenameModal = () => {
    setRenameModalOpen(true)
  }

  const handleCloseRenameModal = () => {
    setRenameModalOpen(false)
  }

  return !loaded ?
    <Loading />
    :
    (
      <>
        <UploadModal
          open={uploadModalOpen}
          onClose={handleCloseUploadModal}
        />
        <SecurityModal
          open={securityModalOpen}
          onClose={handleCloseSecurityModal}
        />
        <NewFolderModal
          open={newFolderModalOpen}
          onClose={handleCloseNewFolderModal}
          actualFolder={folderPath.toString().replace(/,/g, '\\')}
        />
        <RenameModal
          open={renameModalOpen}
          onClose={handleCloseRenameModal}
          itemsSelecionados={markedItems} 
          folderPath={folderPath.toString().replace(/,/g, '\\')}
        />
        <Panel>
          <Options
            folders={folderPath}
            onClickFolder={handleClickPath}
            selectedItems={markedItems}
            onDownloadMarked={handleDownloadMarked}
            onOpenNewFolderModal={handleOpenNewFolderModal}
            onOpenRenameModal={handleOpenRenameModal}
          />
          <Explorer
            Arquivos={arquivos}
            Pastas={pastas}
            navigateToTargetFolder={LoadData}
            goBack={handleGoBack}
            depthLevel={folderPath.length}
            onBlock={handleBlockPath}
            onDelete={handleDelete}
            markedItems={markedItems}
            onMarkUnmarkAll={handleMarkUnmarkAll}
            onCheckItem={handleCheckItem}
          />
          <div
            className="YAlign"
            style={{
              position: "absolute",
              right: "16px",
              bottom: "16px",
              alignItems: "flex-end",
              zIndex: "999"
            }}
          >
            {whichModalsShow(
              shouldShowModals,
              handleOpenUploadModal,
              handleOpenSecurityModal,
              moreOptions
            )}
            <Fab
              color={moreOptions ? "primary" : "secondary"}
              onClick={() => setMoreOptions(oldState => !oldState)}
            >
              {moreOptions ? <CloseIcon /> : <MenuIcon />}
            </Fab>
          </div>
        </Panel>
      </>
    )
};

export default Arquivos;

const whichModalsShow = (controls, onOpenOplModal, onOpenSecModal, Expanded) => {
  let returnableComponents = []

  if (controls.upload === true) {
    returnableComponents.push(
      <Grow
        in={Expanded}
        style={{ transformOrigin: '0 0 0' }}
        {...(Expanded ? { timeout: 500 } : {})}
      >
        <Fab
          onClick={onOpenOplModal}
          variant="extended"
          style={{
            backgroundColor: '#FFF',
            margin: '0px 0px 8px 0px',
            color: '#0062ff',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <BackupIcon style={{ marginRight: '4px' }} />
          Upload
        </Fab>
      </Grow>
    )
  }

  if (controls.security === true) {
    returnableComponents.push(
      <Grow
        in={Expanded}
        style={{ transformOrigin: '0 0 0' }}
        {...(Expanded ? { timeout: 500 } : {})}
      >
        <Fab
          onClick={onOpenSecModal}
          variant="extended"
          style={{
            backgroundColor: '#FFF',
            margin: '0px 0px 8px 0px',
            color: '#a84702',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <SecurityIcon style={{ marginRight: '4px' }} />
          Permissões
        </Fab>
      </Grow>
    )
  }

  return Expanded ? returnableComponents : null
}