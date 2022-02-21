import React, { useState, useEffect } from "react";
import moment from "moment";
import { Title, Button,Buttons,Box,Image, Text,Card } from "./Box/style";


import Loading from '../../components/loading_screen'
import { toValidString } from '../../misc/commom_functions'
import { Toast } from '../../components/toasty'
import Modal from "../../components/Layout/Modal/index";


import { api } from '../../services/api';


function Home() {


  const [loaded, setLoaded] = useState(false);
  const [telemetrias, setTelemetrias] = useState([]);
  const [target, setTarget] = useState({});
  const [modalChamadoOpen, setModalChamadoOpen] = useState(false);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const [modalDetailsDesc, setModalDetailsDesc] = useState('');
  const [editableDetails, setEditableDetails] = useState(editableDetailsEmptyExample);


  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    async function LoadData() {
      try {
        const response = await api.get('/dashboard/telemetrias');

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

  const handleOpenModal =() => {
    
    {setIsModalVisible(true)}
    
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
      UltLeitura: TMT.MáxDeDataLeitura !== null ? moment(TMT.MáxDeDataLeitura).utc().format("DD/MM/YYYY HH:mm:ss") :  'Desconhecido',
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
  }




  return !loaded ? <Loading /> : (
    <>
    
        {telemetrias.map(telemetria => (
          
          <Card>
          <Box>
            <Text>Sua telemetria está: {}</Text>
            <Image />
            <Text >Cod. Equip: {telemetria.EquiCod}</Text>
            <Title>{telemetria.AnxDesc}</Title>
            <Buttons>
              <Button borderRadius= {'1rem 0 0  1rem'} onClick={handleOpenModal }>Leitura {isModalVisible ?<Modal/>:null}</Button>
              <Button>Contador</Button>
              <Button borderRadius={'0 1rem 1rem 0'}>Doses</Button>
            </Buttons>
         
        </Box>
      </Card>
         
        ))}
   
    </>
    )

}

export default Home;

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