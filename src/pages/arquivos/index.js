import React, { useState, useEffect } from 'react';
import { api } from '../../services/api'

import { Grow, Fab } from '@material-ui/core'
import {
  Close as CloseIcon,
  Menu as MenuIcon,
  Backup as BackupIcon,
  Security as SecurityIcon,
  Lock as LockIcon
} from '@material-ui/icons'

import Loading from '../../components/loading_screen'
import { Panel } from '../../components/commom_in'
import { Toast } from '../../components/toasty'

import { Options } from './options'
import { Explorer } from './explorer'
import { UploadModal } from './modals/UploadModal'
import { SecurityModal } from './modals/SecurityModal'

const Arquivos = () => {
  const [loaded, setLoaded] = useState(false)
  const [moreOptions, setMoreOptions] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [securityModalOpen, setSecurityModalOpen] = useState(false)

  const [arquivos, setArquivos] = useState([])
  const [pastas, setPastas] = useState([])
  const [folderPath, setFolderPath] = useState([])
  const [shouldShowModals, setShouldShowModals] = useState({ security: false, upload: false })

  async function LoadData(folder) {
    if (folder !== 'root') {
      setLoaded(false)
    }

    try {
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
        <Panel>
          <Options
            folders={folderPath}
            onClickFolder={handleClickPath}
          />
          <Explorer
            Arquivos={arquivos}
            Pastas={pastas}
            navigateToTargetFolder={LoadData}
            goBack={handleGoBack}
            depthLevel={folderPath.length}
            onBlock={handleBlockPath}
            onDelete={handleDelete}
          />
          {whichModalsShow(
            shouldShowModals,
            handleOpenUploadModal,
            handleOpenSecurityModal,
            handleBlockPath,
            setMoreOptions,
            moreOptions
          )}
        </Panel>
      </>
    )
};

export default Arquivos;

const whichModalsShow = (controls, onOpenOplModal, onOpenSecModal, onBlock, onExpand, Expanded) => {
  if (controls.upload === false && controls.security === false) {
    return null
  } else if (controls.upload === true && controls.security === true) {
    return <div
      className="YAlign"
      style={{
        position: "absolute",
        right: "16px",
        bottom: "16px",
        alignItems: "flex-end",
        zIndex: "999"
      }}
    >
      {Expanded ? (
        <>
          <Grow
            in={Expanded}
            style={{ transformOrigin: '0 0 0' }}
            {...(Expanded ? { timeout: 500 } : {})}
          >
            <Fab
              onClick={() => onBlock('folder')}
              variant="extended"
              style={{
                backgroundColor: '#FFF',
                margin: '0px 0px 8px 0px',
                color: '#cc1029',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <LockIcon style={{ marginRight: '4px' }} />
              Bloquear Pasta
            </Fab>
          </Grow>
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
        </>
      ) : null}
      <Fab
        color={Expanded ? "primary" : "secondary"}
        onClick={() => onExpand(oldState => !oldState)}
      >
        {Expanded ? <CloseIcon /> : <MenuIcon />}
      </Fab>
    </div>
  } else if (controls.upload === true) {
    return <div
      className="YAlign"
      style={{
        position: "absolute",
        right: "16px",
        bottom: "16px",
        alignItems: "flex-end",
        zIndex: "999"
      }}
    >
      {Expanded ? (
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
      ) : null}
      <Fab
        color={Expanded ? "primary" : "secondary"}
        onClick={() => onExpand(oldState => !oldState)}
      >
        {Expanded ? <CloseIcon /> : <MenuIcon />}
      </Fab>
    </div>
  }
}