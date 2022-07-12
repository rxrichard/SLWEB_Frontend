import React, { useState, useEffect } from 'react';
import { api } from '../../services/api'
import { saveAs } from 'file-saver'

import { Grow, Fab } from '@material-ui/core'
import {
  Close as CloseIcon,
  Menu as MenuIcon,
  
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

import { useFiles } from '../../hooks/useFiles'

const Arquivos = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [securityModalOpen, setSecurityModalOpen] = useState(false)
  const [newFolderModalOpen, setNewFolderModalOpen] = useState(false)
  const [renameModalOpen, setRenameModalOpen] = useState(false)

  const {
    uiControl: { loaded },
    data: { markedItems }
  } = useFiles()

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
        />
        <RenameModal
          open={renameModalOpen}
          onClose={handleCloseRenameModal}
        />
        <Panel>
          <Options
            onOpenNewFolderModal={handleOpenNewFolderModal}
            onOpenRenameModal={handleOpenRenameModal}
            onOpenUploadModal={handleOpenUploadModal}
            onOpenSecurityModal={handleOpenSecurityModal}
          />
          <Explorer />
        </Panel>
      </>
    )
};

export default Arquivos;
