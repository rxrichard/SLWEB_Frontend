import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import moment from 'moment'

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
    //horário inicial e limite em MS(60 segundos de diferença)
    const eventTime = 1366547460;
    const currentTime = 1366547400;
    const diffTime = eventTime - currentTime;
    let duration = moment.duration(diffTime * 1000, 'milliseconds');
    const interval = 1000;

    setInterval(() => {
      duration = moment.duration(duration - interval, 'milliseconds');
      if (duration.asSeconds() <= 0) {
        setCooldownSync(false)
      }else{
        setCooldownSync(duration.minutes() + ":" + duration.seconds())
      }
    }, interval);
    // const aguardeAte = moment().add('1', 'minute')
    // setCooldownSync(aguardeAte)
    // alert(`sincroniza o ${ativo} com a telemetria e ativa o cooldown`)
  }

  const HandleSwitchCliente = async (cliente) => {
    let toastId = null
    let oldPdv = equipamentos.filter(element => String(element.EquiCod) === String(targetAtivo))[0]

    if (oldPdv.CNPJss === cliente.CNPJss) {
      Toast('Ativo já está vinculado ao cliente', 'warn')
      return
    }

    try {
      toastId = Toast('Aguarde...', 'wait')
      const response = await api.put('/equip', {
        oldPdv: oldPdv,
        newCliente: cliente
      })

      Toast('Ativo vinculado com sucesso!', 'update', toastId, 'success')
      setEquipamentos((equipamentos) => {
        let aux = [...equipamentos];

        aux.forEach(element => {
          if (String(element.EquiCod) === String(oldPdv.EquiCod)) {
            element.CNPJss = cliente.CNPJss
            element.Nome_Fantasia = cliente.Nome_Fantasia
            element.AnxId = response.data.NewAnxId
            element.PdvId = response.data.NewPdvId
          }
        })

        return aux
      })
      setLinkModalState(false)
      setTargetAtivo('')
    } catch (err) {
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

