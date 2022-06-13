import React, { useState, useEffect } from 'react';
import { api } from '../../services/api'

import { Panel } from '../../components/commom_in'

import { Options } from './options'
import { DirList } from './dirList'

const Arquivos = () => {
  const [arquivos, setArquivos] = useState([])
  const [pastas, setPastas] = useState([])
  const [folderPath, setFolderPath] = useState([])

  useEffect(() => {
    async function LoadData() {
      try {
        const response = await api.get('/files/all')

        setArquivos(response.data.arquivos)
        setPastas(response.data.pastas)
        setFolderPath(response.data.pathSegments)
      } catch (err) {

      }
    }

    LoadData()
  }, [])

  const handleClickPath = (event) => {
    event.preventDefault();
    alert('You clicked a breadcrumb.');
  }

  return (
    <Panel>
      <Options
        folders={folderPath}
        onClickFolder={handleClickPath}
      />
      <DirList 
        Arquivos={arquivos}
        Pastas={pastas}
      />
    </Panel>
  )
};

export default Arquivos;