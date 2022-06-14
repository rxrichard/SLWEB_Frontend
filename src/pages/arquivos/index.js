import React, { useState, useEffect } from 'react';
import { api } from '../../services/api'

import Loading from '../../components/loading_screen'
import { Panel } from '../../components/commom_in'

import { Options } from './options'
import { Explorer } from './explorer'

const Arquivos = () => {
  const [loaded, setLoaded] = useState(false)
  const [arquivos, setArquivos] = useState([])
  const [pastas, setPastas] = useState([])
  const [folderPath, setFolderPath] = useState([])

  async function LoadData(folder) {
    try {
      const response = await api.get(`/files/${folder}`)

      setArquivos(response.data.arquivos)
      setPastas(response.data.pastas)
      setFolderPath(response.data.pathSegments)
      setLoaded(true)
    } catch (err) {

    }
  }

  useEffect(() => {
    LoadData('all')
  }, [])

  const handleClickPath = (event) => {
    event.preventDefault();
    alert('You clicked a breadcrumb.');
  }

  return !loaded ?
    <Loading />
    :
    (
      <Panel>
        <Options
          folders={folderPath}
          onClickFolder={handleClickPath}
        />
        <Explorer
          Arquivos={arquivos}
          Pastas={pastas}
        />
      </Panel>
    )
};

export default Arquivos;