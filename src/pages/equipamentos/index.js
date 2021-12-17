import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import moment from 'moment'

import { Button } from '@material-ui/core';

import { Panel } from '../../components/commom_in'
import Loading from '../../components/loading_screen'
import { Toast } from '../../components/toasty'

import Header from './Header'
import MainSection from './Main'
import MiFixModal from './modals/MiFixModal'
import ReportModal from './modals/ReportModal'
import LinkModal from './modals/LinkModal'
import ConfirmModal from './modals/ConfirmModal'

const Equipamentos = () => {
  const [loaded, setLoaded] = useState(false);
  const [linkModalState, setLinkModalState] = useState(false);
  const [MiFixModalState, setMiFixModalState] = useState(false);
  const [reportModalState, setReportModalState] = useState(false);
  const [confirmModalState, setConfirmModalState] = useState(false);
  const [cooldownSync, setCooldownSync] = useState(false);
  const [alreadyReported, setAlreadyReported] = useState(true);

  const [equipamentos, setEquipamentos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [confirmPeriod, setConfirmPeriod] = useState([]);
  const [targetAtivo, setTargetAtivo] = useState('');

  useEffect(() => {
    async function LoadData() {
      try {
        const response = await api.get('/equip')

        setEquipamentos(response.data.Ativos)
        setClientes(response.data.Clientes)
        setConfirmPeriod(response.data.ConfirmEqPeriod)
        setAlreadyReported(response.data.JaReportou)

        setLoaded(true)
      } catch (error) {
      }
    }

    LoadData();
  }, [])

  const HandleOpenLinkModal = (ativo) => {
    setLinkModalState(true)
    setTargetAtivo(ativo)
  }

  const HandleOpenConfirmModal = async () => {
    if (alreadyReported) {
      Toast('Localização das máquinas já foi reportada este mes', 'warn')
      return
    }

    setConfirmModalState(true)

    try {
      const response = await api.get('/equip/confirm')


      setEnderecos(response.data.Enderecos)
    } catch (error) {

    }
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

  const HandleCloseConfirmModal = () => {
    setConfirmModalState(false)
    setEnderecos([])
  }

  const HandleSyncTMT = async (ativo) => {
    //horário inicial e limite em MS(60 segundos de diferença)
    const eventTime = 1366547460;
    const currentTime = 1366547400;
    const diffTime = eventTime - currentTime;
    let duration = moment.duration(diffTime * 1000, 'milliseconds');
    const interval = 1000;

    let IntervalId
    IntervalId = setInterval(() => {
      duration = moment.duration(duration - interval, 'milliseconds');
      if (duration.asSeconds() <= 0) {
        setCooldownSync(false)
        clearInterval(IntervalId)
      } else {
        setCooldownSync(duration.minutes() + ":" + duration.seconds())
      }
    }, interval);

    try {
      Toast('Atualização enviada ao TMT', 'info')
      await api.get(`/tel/update/WYSI/${ativo}`)
      
    } catch (err) {
    }
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
    }
  }

  const handleConfirmAddresses = async () => {
    let toastId = null

    try {
      toastId = Toast('Aguarde...', 'wait')

      await api.post('/equip/confirm', {
        Addresses: enderecos
      })

      setConfirmModalState(false)
      setAlreadyReported(true)
      Toast('Confirmação registrada com sucesso!', 'update', toastId, 'success')
    } catch (err) {
      Toast('Falha ao confirmar localizações', 'update', toastId, 'error')
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
        confirmPeriodRef={confirmPeriod}
        onOpenConfirmModal={HandleOpenConfirmModal}
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

      <ConfirmModal
        open={confirmModalState}
        onClose={HandleCloseConfirmModal}
        title='Confirmar localização das máquinas'
        enderecos={enderecos}
        action={
          <Button
            color="primary"
            variant="contained"
            disabled={false}
            onClick={() => handleConfirmAddresses()}
          >
            Confirmar
          </Button>
        }
      />
    </Panel>
}

export default Equipamentos

