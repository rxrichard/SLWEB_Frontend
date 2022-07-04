import React, { useState, useEffect } from 'react'
import { api } from '../../services/api'

import { Panel } from '../../components/commom_in'
import Loading from '../../components/loading_screen'

import { Main } from './main'
import { Options } from './options'

const Franqueados = () => {
  const [loaded, setLoaded] = useState(false)
  const [franqueados, setFranqueados] = useState([])
  const [filtro, setFiltro] = useState('');
  const [mostrarInativos, setMostrarInativos] = useState(false);

  useEffect(() => {
    LoadData()
  }, [])

  const LoadData = async () => {
    try {
      // const response = await api.get('')

      // setLoaded(true)
      // setFranqueados(response.data)
      setLoaded(true)
    } catch (err) {

    }
  }

  return !loaded ?
    <Loading />
    :
    (
      <Panel>
        <Options
          onChangeFiltro={setFiltro}
          mostrarInativos={mostrarInativos}
          switchInativos={setMostrarInativos}
        />
        <Main
          franquias={[]}
          onOpenDetailsModal={()=>{}}
        />
      </Panel>
    )
}

export default Franqueados