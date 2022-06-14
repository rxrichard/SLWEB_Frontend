import React, { useState, useEffect } from 'react';
import { api } from '../../services/api'

import Loading from '../../components/loading_screen'
import { Panel } from '../../components/commom_in'
import { Toast } from '../../components/toasty'

import { Options } from './options'
import { Explorer } from './explorer'

const Arquivos = () => {
  const [loaded, setLoaded] = useState(false)
  const [arquivos, setArquivos] = useState([])
  const [pastas, setPastas] = useState([])
  const [folderPath, setFolderPath] = useState([])

  async function LoadData(folder) {
    if (folder !== 'all') {
      setLoaded(false)
    }

    try {
      const response = await api.get(`/files/${folder}`)

      setArquivos(response.data.arquivos)
      setPastas(response.data.pastas)
      setFolderPath(response.data.pathSegments)
      setLoaded(true)
    } catch (err) {
      if (folder !== 'all') {
        Toast('Não foi possível acessar a pasta', 'error')
      }
      setLoaded(true)
    }
  }

  useEffect(() => {
    LoadData('all')
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
        return `${path}_`
      }
    })

    LoadData(actualFolder.toString().replace(/,/g, ''))
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
          navigateToTargetFolder={LoadData}
          goBack={handleGoBack}
          depthLevel={folderPath.length}
        />
      </Panel>
    )
};

export default Arquivos;