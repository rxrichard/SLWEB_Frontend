import React, { useState, useEffect } from "react";
import { api } from '../../services/api';
import moment from "moment";

import { Email } from '@material-ui/icons'
import { Button as MaterialButton } from '@material-ui/core'

import Loading from '../../components/loading_screen'
import { toValidString } from '../../misc/commom_functions'
import { Toast } from '../../components/toasty'
// import Modal from "../../components/Layout/Modal/index";
import { Title, Button, Buttons, Box, Image, Text, ChamadoButton, Container } from "./Box/style";

import DetalhesDialog from "./modals/Detalhes";
import AbrirChamadoDialog from "./modals/AbrirChamado";

<<<<<<< HEAD

=======
>>>>>>> 21a52fad083ace668ec4836c97f3f027c5a62f1b
const Monitor = () => {
  const [loaded, setLoaded] = useState(false);
  const [telemetrias, setTelemetrias] = useState([]);
  const [target, setTarget] = useState({});
  const [modalChamadoOpen, setModalChamadoOpen] = useState(false);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const [modalDetailsDesc, setModalDetailsDesc] = useState('');
  const [editableDetails, setEditableDetails] = useState(editableDetailsEmptyExample);
  // const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    async function LoadData() {
      try {
        const response = await api.get('/monitor/telemetrias');

        setLoaded(true)
        setTelemetrias(response.data);
      } catch (err) {

      }
    }
    LoadData()
  }, [])

  const handleOpenChamadoModal = (TMT) => {
    if (String(TMT.LeitOk).trim() !== 'KO') {
      return
    }

    setTarget(TMT)
    setModalChamadoOpen(true)
    setEditableDetails({
      Email: toValidString(TMT.Email),
      Telefone: "",
      Endereco: {
        Logradouro: toValidString(TMT.PdvLogradouroPV),
        Numero: toValidString(TMT.PdvNumeroPV),
        Bairro: toValidString(TMT.PdvBairroPV),
        Complemento: toValidString(TMT.PdvComplementoPV),
        Cidade: toValidString(TMT.PdvCidadePV),
        UF: toValidString(TMT.PdvUfPV),
        CEP: toValidString(TMT.PdvCEP),
      }
    })
  }

  const handleCloseChamadoModal = () => {
    setModalChamadoOpen(false)
    setTarget({})
    setEditableDetails(editableDetailsEmptyExample)
  }

  const handleOpenDetailsModal = (TMT, desc) => {
    setTarget(TMT)
    setModalDetailsDesc(desc)
    setModalDetailsOpen(true)
  }

  const handleCloseDetailsModal = () => {
    setTarget({})
    setModalDetailsDesc('')
    setModalDetailsOpen(false)
  }

  const handleAbrirChamado = async (TMT) => {
    if (
      (toValidString(editableDetails.Email) === '') ||
      (toValidString(editableDetails.Telefone) === '') ||
      (toValidString(editableDetails.Endereco.Logradouro) === '') ||
      (toValidString(editableDetails.Endereco.Numero) === '') ||
      (toValidString(editableDetails.Endereco.Cidade) === '') ||
      (toValidString(editableDetails.Endereco.UF) === '') ||
      (toValidString(editableDetails.Endereco.CEP) === '')
    ) {
      Toast('Preencha todos os campos', 'warn')
      return
    }

    const DTO = {
      Ativo: TMT.EquiCod,
      UltLeitura: TMT.MáxDeDataLeitura !== null ? moment(TMT.MáxDeDataLeitura).utc().format("DD/MM/YYYY HH:mm:ss") : 'Desconhecido',
      Franqueado: TMT.GrupoVenda,
      Email: toValidString(editableDetails.Email),
      Contato: toValidString(editableDetails.Telefone),
      Cliente: TMT.AnxDesc,
      Modelo: TMT.EquiDesc,
      Endereco: {
        Logradouro: toValidString(editableDetails.Endereco.Logradouro),
        Numero: toValidString(editableDetails.Endereco.Numero),
        Bairro: toValidString(editableDetails.Endereco.Bairro),
        Complemento: toValidString(editableDetails.Endereco.Complemento),
        Cidade: toValidString(editableDetails.Endereco.Cidade),
        UF: toValidString(editableDetails.Endereco.UF),
        CEP: toValidString(editableDetails.Endereco.CEP),
      },
    }

    let toastId = null

    try {
      toastId = Toast('Abrindo chamado...', 'wait')

      await api.post('/monitor/telemetrias/chamado', {
        DTO,
      })

      setModalChamadoOpen(false)
      Toast('Chamado aberto!', 'update', toastId, 'success')

      setTarget({
        ...target,
        UltChamado: moment().subtract(3, 'hours').toDate(),
      })
      
      setTelemetrias(oldState => {
        let aux = [...oldState]

        aux.forEach(tel => {
          if (tel.EquiCod === target.EquiCod) {
            tel.UltChamado = moment().subtract(3, 'hours').toDate()
          }
        })

        return aux
      })
    } catch (err) {
      Toast('Falha ao abrir chamado, tente novamente', 'update', toastId, 'error')
    }
  }

  return !loaded ? <Loading /> : (
    <>
      <DetalhesDialog
        open={modalDetailsOpen}
        onClose={handleCloseDetailsModal}
        title={`${modalDetailsDesc} da máquina ${target.EquiCod}`}
        TMT={target}
        tipo={modalDetailsDesc}
      />

      <AbrirChamadoDialog
        open={modalChamadoOpen}
        onClose={handleCloseChamadoModal}
        title='Abrir chamado MiFix'
        onChangeDetails={setEditableDetails}
        Details={editableDetails}
        UltChamado={target.UltChamado}
        action={
          <MaterialButton
            color="primary"
            onClick={() => handleAbrirChamado(target)}
            variant="contained"
            startIcon={<Email />}
            disabled={target.UltChamado !== null}
          >
            Abrir chamado
          </MaterialButton>
        }
      />
      
      <Container>
        {telemetrias.map(telemetria => (
          <Box>
            <Text>Sua telemetria está: { }</Text>
            <Text
              color={String(telemetria.LeitOk).trim() !== 'KO' ? 'green' : 'red'}
            >
              {String(telemetria.LeitOk).trim() !== 'KO' ? 'ONLINE' : 'OFFLINE'}
            </Text>
            <Text>Ativo: {telemetria.EquiCod}</Text>
            <Image />
            <Title>{telemetria.AnxDesc}</Title>
            <Text>Última Leitura: {telemetria.MáxDeDataLeitura !== null ? moment(telemetria.MáxDeDataLeitura).format('DD/MM/YYYY HH:mm') : "Desconhecida"}</Text>
            <ChamadoButton
              Online={String(telemetria.LeitOk).trim() !== 'KO'}
              onClick={() => handleOpenChamadoModal(telemetria)}
            >
              <Email />
              ABRIR CHAMADO
            </ChamadoButton>
            <Buttons>
              <Button
                borderRadius={'0px 0px 0px  1rem'}
                onClick={() => handleOpenDetailsModal(telemetria, 'Leituras')}>
                Leitura
              </Button>
              <Button
                onClick={() => handleOpenDetailsModal(telemetria, 'Contador')}
              >
                Contador
              </Button>
              <Button
                onClick={() => handleOpenDetailsModal(telemetria, 'Produção de doses')}
                borderRadius={'0px 0px 1rem  0px'}>
                Doses
              </Button>
            </Buttons>
          </Box>
        ))}
      </Container>
    </>
  )
<<<<<<< HEAD

=======
>>>>>>> 21a52fad083ace668ec4836c97f3f027c5a62f1b
}

export default Monitor;

const editableDetailsEmptyExample = {
  Email: "",
  Telefone: "",
  Endereco: {
    Logradouro: '',
    Numero: '',
    Bairro: '',
    Complemento: '',
    Cidade: '',
    UF: '',
    CEP: '',
  }
}