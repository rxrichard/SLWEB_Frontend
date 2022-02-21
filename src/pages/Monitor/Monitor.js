import React, { useState, useEffect } from "react";
import moment from "moment";



import Cards from "../../components/Layout/Box/index";


import { api } from '../../services/api';


function Home(props) {


  const [loaded, setLoaded] = useState(false);
  const [telemetrias, setTelemetrias] = useState([]);
  const [expand, setExpand] = useState(false);
  const [target, setTarget] = useState({});
  const [modalChamadoOpen, setModalChamadoOpen] = useState(false);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const [modalDetailsDesc, setModalDetailsDesc] = useState('');
  // const [editableDetails, setEditableDetails] = useState(editableDetailsEmptyExample);

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

  // const handleOpenChamadoModal = (TMT) => {
  //   if (String(TMT.LeitOk).trim() !== 'KO') {
  //     return
  //   }

  //   setTarget(TMT)
  //   setModalChamadoOpen(true)
  //   setEditableDetails({
  //     Email: toValidString(TMT.Email),
  //     Telefone: "",
  //     Endereco: {
  //       Logradouro: toValidString(TMT.PdvLogradouroPV),
  //       Numero: toValidString(TMT.PdvNumeroPV),
  //       Bairro: toValidString(TMT.PdvBairroPV),
  //       Complemento: toValidString(TMT.PdvComplementoPV),
  //       Cidade: toValidString(TMT.PdvCidadePV),
  //       UF: toValidString(TMT.PdvUfPV),
  //       CEP: toValidString(TMT.PdvCEP),
  //     }
  //   })
  // }

  // const handleCloseChamadoModal = () => {
  //   setModalChamadoOpen(false)
  //   setTarget({})
  //   setEditableDetails(editableDetailsEmptyExample)
  // }

  // const handleOpenDetailsModal = (TMT, desc) => {
  //   setTarget(TMT)
  //   setModalDetailsDesc(desc)
  //   setModalDetailsOpen(true)
  // }

  // const handleCloseDetailsModal = () => {
  //   setTarget({})
  //   setModalDetailsDesc('')
  //   setModalDetailsOpen(false)
  // }

  // const handleAbrirChamado = async (TMT) => {
  //   if (
  //     (toValidString(editableDetails.Email) === '') ||
  //     (toValidString(editableDetails.Telefone) === '') ||
  //     (toValidString(editableDetails.Endereco.Logradouro) === '') ||
  //     (toValidString(editableDetails.Endereco.Numero) === '') ||
  //     (toValidString(editableDetails.Endereco.Cidade) === '') ||
  //     (toValidString(editableDetails.Endereco.UF) === '') ||
  //     (toValidString(editableDetails.Endereco.CEP) === '')
  //   ) {
  //     Toast('Preencha todos os campos', 'warn')
  //     return
  //   }

  //   const DTO = {
  //     Ativo: TMT.EquiCod,
  //     UltLeitura: TMT.MáxDeDataLeitura !== null ? moment(TMT.MáxDeDataLeitura).utc().format("DD/MM/YYYY HH:mm:ss") :  'Desconhecido',
  //     Franqueado: TMT.GrupoVenda,
  //     Email: toValidString(editableDetails.Email),
  //     Contato: toValidString(editableDetails.Telefone),
  //     Cliente: TMT.AnxDesc,
  //     Modelo: TMT.EquiDesc,
  //     Endereco: {
  //       Logradouro: toValidString(editableDetails.Endereco.Logradouro),
  //       Numero: toValidString(editableDetails.Endereco.Numero),
  //       Bairro: toValidString(editableDetails.Endereco.Bairro),
  //       Complemento: toValidString(editableDetails.Endereco.Complemento),
  //       Cidade: toValidString(editableDetails.Endereco.Cidade),
  //       UF: toValidString(editableDetails.Endereco.UF),
  //       CEP: toValidString(editableDetails.Endereco.CEP),
  //     },
  //   }
  // }


  return(
    <>
    
        {telemetrias.map(telemetria => (
          <Cards client={telemetria.AnxDesc} equipCod={telemetria.EquiCod}/>
        ))}
   
    </>
    )

}

export default Home;

