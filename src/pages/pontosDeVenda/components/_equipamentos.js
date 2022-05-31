import React, { useState, useEffect } from 'react'
import { api } from '../../../services/api'

import { Typography } from '@material-ui/core'

export const Equipamento = ({ PdvId, AnxId }) => {
  const [equipamentosDisponiveis, setEquipamentosDisponiveis] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function LoadData() {
      const response = await api.get(`/pontosdevenda/info/${PdvId}/${AnxId}/equip`)

      setEquipamentosDisponiveis(response.data.Dados.EqsDisp)
      setLoaded(true)
    }
    LoadData()
  }, [])

  const handleSwitchEqOnPdv = async (eqcod) => {
    alert('Novo EQ do PDV: ' + eqcod)
  }

  return !loaded ?
    (
      <Typography variant='subtitle1'>
        Carregando...
      </Typography>
    )
    :
    (
      <>
        {equipamentosDisponiveis.length > 0 ?
          equipamentosDisponiveis.map(eqs => (
            <p>{eqs.EquiCod}</p>
          ))
          :
          <Typography variant='subtitle2'>Todas suas máquinas já estão atreladas a outros clientes ;)</Typography>
        }
      </>
    )
}
