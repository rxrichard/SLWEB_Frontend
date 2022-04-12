import React, { useState, useEffect } from 'react'

import { api } from '../../services/api'

import { Panel } from '../../components/commom_in'
import { DetalhesModal } from './modals/DetalhesModal'
import { Consultas } from './consultas'
import { NovaColeta } from './novaColeta'
import Loading from '../../components/loading_screen'

const ConsultaColetas = ({ match }) => {
  const [forceUpdate, setForceUpdate] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [coletas, setColetas] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [coletaDetalhesModalOpen, setColetaDetalhesModalOpen] = useState(false)
  const [coletaDetalhes, setColetaDetalhes] = useState({})
  const [novaColetaDetalhesModalOpen, setNovaColetaDetalhesModalOpen] = useState(false)

  useEffect(() => {
    async function LoadData() {
      try {
        const response = await api.get('/coletas')

        setColetas(response.data.Coletas)
        setEquipamentos(response.data.Equipamentos)
        setLoaded(true)
      } catch (err) {
        setLoaded(false)
      }
    }
    LoadData()
  }, [forceUpdate])

  const handleForceUpdate = () => {
    setForceUpdate(value => value + 1)
  }

  const handleOpenColetaDetailsModal = async (anxid, pdvid, fseq, coleta) => {
    setColetaDetalhesModalOpen(true)

    try {
      const response = await api.get(`/coletas/detalhes/${anxid}/${pdvid}/${fseq}`)

      setColetaDetalhes({ ...coleta, Detalhes: response.data.Detalhes })
    } catch (err) {
    }
  }

  const handleCloseColetaDetailsModal = () => {
    setColetaDetalhesModalOpen(false)
    setColetaDetalhes({})
  }

  const handleOpenNovaColetaModal = () => {
    setNovaColetaDetalhesModalOpen(true)
  }

  const handleCloseNovaColetaModal = () => {
    setNovaColetaDetalhesModalOpen(false)
  }

  return !loaded ? (
    <Loading />
  ) : (
    <Panel
      style={{
        minHeight: '600px',
      }}
    >
      <DetalhesModal
        open={coletaDetalhesModalOpen}
        onClose={handleCloseColetaDetailsModal}
        title='Detalhes da Coleta'
        detalhes={coletaDetalhes}
        coletasHandler={setColetas}
      />
      <Consultas
        Coletas={coletas}
        onOpenColetaDetails={(a, p, f, c) => handleOpenColetaDetailsModal(a, p, f, c)}
      />
      <NovaColeta
        Equipamentos={equipamentos}
        open={novaColetaDetalhesModalOpen}
        handleOpenModal={handleOpenNovaColetaModal}
        handleCloseModal={handleCloseNovaColetaModal}
        onUpdate={handleForceUpdate}
        selectedEquip={match.params.ativo}
      />
    </Panel>
  )
}

export default ConsultaColetas


