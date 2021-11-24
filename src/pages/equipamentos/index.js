import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'

import { Panel } from '../../components/commom_in'
import Loading from '../../components/loading_screen'
import { Toast } from '../../components/toasty'

import Header from './Header'
import MainSection from './Main'
import MiFixModal from './MiFixModal'
import ReportModal from './ReportModal'
import LinkModal from './LinkModal'

const Equipamentos = () => {
  const [loaded, setLoaded] = useState(false);
  const [linkModalState, setLinkModalState] = useState(false);
  const [MiFixModalState, setMiFixModalState] = useState(false);
  const [reportModalState, setReportModalState] = useState(false);
  const [cooldownSync, setCooldownSync] = useState(false);

  const [equipamentos, setEquipamentos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [targetAtivo, setTargetAtivo] = useState('');



  useEffect(() => {
    async function LoadData() {
      try {
        const response = await api.get('/equip')

        setEquipamentos(response.data.Ativos)
        setClientes(response.data.Clientes)
        setLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }

    LoadData();
  }, [])

  const HandleOpenLinkModal = (ativo) => {
    setLinkModalState(true)
    setTargetAtivo(ativo)
  }

  const HandleOpenMiFixModal = () => {
    setMiFixModalState(true)
  }

  const HandleOpenReportModal = () => {
    setReportModalState(true)
  }

  const HandleCloseLinkModal = () => {
    setLinkModalState(false)
    setTargetAtivo('')
  }

  const HandleCloseMiFixModal = () => {
    setMiFixModalState(false)
  }

  const HandleCloseReportModal = () => {
    setReportModalState(false)
  }

  const HandleSyncTMT = (ativo) => {
    setCooldownSync(true)
    alert(`sincroniza o ${ativo} com a telemetria e ativa o cooldown`)
  }

  const HandleSwitchCliente = async (cliente) => {
    let toastId = null
    let oldPdv = equipamentos.filter(element => String(element.EquiCod) === String(targetAtivo))[0]

    if(oldPdv.CNPJss === cliente.CNPJss){
      Toast('Ativo já está vinculado ao cliente','warn')
      return
    }

    try{
      toastId = Toast('Aguarde...', 'wait')
      await api.put('/equip', {
        oldPdv: oldPdv,
        newCliente: cliente
      })

      Toast('Ativo vinculado com sucesso!', 'update', toastId, 'success')
      setLinkModalState(false)
      setTargetAtivo('')
    }catch(err){
      Toast('Falha ao vincular ativo', 'update', toastId, 'error')
      console.log(err)
    }
  }

  return !loaded ?
    <Loading />
    :
    <Panel style={{ justifyContent: 'space-between' }}>
      <Header
        EquipamentosTotal={equipamentos.length}
        EquipamentosStandyBy={equipamentos.filter(ativo => ativo.Nome_Fantasia === null).length}
        onOpenMiFixModal={HandleOpenMiFixModal}
        onOpenReportModal={HandleOpenReportModal}
      />

      <MainSection
        Ativos={equipamentos}
        onOpenModal={(ativo) => HandleOpenLinkModal(ativo)}
        isInCooldown={cooldownSync}
        onSync={HandleSyncTMT}
      />

      <LinkModal
        open={linkModalState}
        onClose={() => HandleCloseLinkModal()}
        onConfirm={(cliente) => HandleSwitchCliente(cliente)}
        title={`Vincular ${targetAtivo} ao Cliente`}
        Clientes={clientes}
      />

      <MiFixModal
        open={MiFixModalState}
        onClose={HandleCloseMiFixModal}
        />

      <ReportModal
        open={reportModalState}
        onClose={HandleCloseReportModal}
        Ativos={equipamentos}
        title='Reportar erro de cadastro'
      />
    </Panel>
}

export default Equipamentos

