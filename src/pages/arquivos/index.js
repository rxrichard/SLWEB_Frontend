import React, { useState, useEffect } from 'react';
import { api } from '../../services/api'

import { Grow, Fab } from '@material-ui/core'
import { Close as CloseIcon, Menu as MenuIcon, Backup as BackupIcon, Security as SecurityIcon } from '@material-ui/icons'

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

  async function LoadData(folder) {
    if (folder !== 'root') {
      setLoaded(false)
    }

    try {
      const response = await api.get(`/files/lookup/${folder}`)

      setArquivos(response.data.arquivos)
      setPastas(response.data.pastas)
      setFolderPath(response.data.pathSegments)
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
            <Grow
              in={moreOptions}
              style={{ transformOrigin: '0 0 0' }}
              {...(moreOptions ? { timeout: 500 } : {})}
            >
              <Fab
                onClick={handleOpenSecurityModal}
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
              in={moreOptions}
              style={{ transformOrigin: '0 0 0' }}
              {...(moreOptions ? { timeout: 500 } : {})}
            >
              <Fab
                onClick={handleOpenUploadModal}
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
