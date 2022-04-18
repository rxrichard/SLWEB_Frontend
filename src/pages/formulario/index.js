import React, { useState } from "react";
import Loading from "../../components/loading_screen";

//Meio de comunicação
import { api } from "../../services/api";

import { Toast } from "../../components/toasty";

// import Stepper from './stepper'
import CodeView from './codeInsertView'
import Intro from './modals/Intro'
import { HelperModal } from './modals/helperModal'
import { toValidString } from '../../misc/commom_functions'


import { Form } from './Form'

import {
  Zoom,
  Fab,
  useMediaQuery,
  useTheme
} from '@material-ui/core'

import { FormContainer } from "./styles";

import {
  ContactSupport as ContactSupportIcons
} from '@material-ui/icons'

export const Formulario = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [codCandidato, setCodCandidato] = useState(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [validado, setValidado] = useState(false)
  const [formSection, setFormSection] = useState(0)
  const [form, setForm] = useState(INITIAL_STATE)
  const [wait, setWait] = useState(false)
  const [helperModalOpen, setHelperModalOpen] = useState(false);

  const handleInsereCodigo = async (codigo, event) => {
    if (!Number.isSafeInteger(Number(codigo))) {
      event.target.value = codigo.slice(0, codigo.length - 1);
      return;
    }

    if (codigo.length === 6) {
      setCodCandidato(codigo)
      setLoading(true)
    } else {
      setCodCandidato(null)
      return;
    }

    try {
      const response = await api.get(`/form/check/${codigo}`);
      setLoading(false)
      setValidado(true)
      setWait(false)
      setFormSection(response.data.SECAO)

      delete response.data.FORM.SECAO
      delete response.data.FORM.PREENCHIDO
      response.data.FORM.Nome_Completo = toValidString(response.data.FORM.Nome_Completo, '')
      response.data.FORM.Email = toValidString(response.data.FORM.Email, '')
      response.data.FORM.Logradouro = toValidString(response.data.FORM.Logradouro, '')
      response.data.FORM.Número = toValidString(response.data.FORM.Número, '')
      response.data.FORM.Complemento = toValidString(response.data.FORM.Complemento, '')
      response.data.FORM.Bairro = toValidString(response.data.FORM.Bairro, '')
      response.data.FORM.Municipio = toValidString(response.data.FORM.Municipio, '')
      response.data.FORM.Estado = toValidString(response.data.FORM.Estado, '')
      response.data.FORM.Conj_Nome = toValidString(response.data.FORM.Conj_Nome, '')
      response.data.FORM.TUnião = toValidString(response.data.FORM.TUnião, '')
      response.data.FORM.Conj_RendMensal = toValidString(response.data.FORM.Conj_RendMensal, '')
      response.data.FORM.Qtd_filhos = toValidString(response.data.FORM.Qtd_filhos, '')
      response.data.FORM.Idd_filhos = toValidString(response.data.FORM.Idd_filhos, '')
      response.data.FORM.Residencia_Mensal = toValidString(response.data.FORM.Residencia_Mensal, '')
      response.data.FORM.Profissao = toValidString(response.data.FORM.Profissao, '')
      response.data.FORM.Rend_Mensal = toValidString(response.data.FORM.Rend_Mensal, '')
      response.data.FORM.Recolhimento_QTD = toValidString(response.data.FORM.Recolhimento_QTD, '')
      response.data.FORM.Renda_Familiar = toValidString(response.data.FORM.Renda_Familiar, '')
      response.data.FORM.Renda_Composta = toValidString(response.data.FORM.Renda_Composta, '')
      response.data.FORM.Origem_Capital = toValidString(response.data.FORM.Origem_Capital, '')
      response.data.FORM.Disp_Invest = toValidString(response.data.FORM.Disp_Invest, '')
      response.data.FORM.Detalhes_Atividade = toValidString(response.data.FORM.Detalhes_Atividade, '')
      response.data.FORM.Form_Escolar = toValidString(response.data.FORM.Form_Escolar, '')
      response.data.FORM.Ult_exp = toValidString(response.data.FORM.Ult_exp, '')
      response.data.FORM.Nome_Socio = toValidString(response.data.FORM.Nome_Socio, '')
      response.data.FORM.Socio_Vinculo = toValidString(response.data.FORM.Socio_Vinculo, '')
      response.data.FORM.Tempo_ConheceSocio = toValidString(response.data.FORM.Tempo_ConheceSocio, '')
      response.data.FORM.Realizou_Socio = toValidString(response.data.FORM.Realizou_Socio, '')
      response.data.FORM.Cond_Socio = toValidString(response.data.FORM.Cond_Socio, '')
      response.data.FORM.Prop_Invest = toValidString(response.data.FORM.Prop_Invest, '')
      response.data.FORM.Exp_Sociedade = toValidString(response.data.FORM.Exp_Sociedade, '')
      response.data.FORM.Conhece_Pilao = toValidString(response.data.FORM.Conhece_Pilao, '')
      response.data.FORM.Caracteristica_Peso = toValidString(response.data.FORM.Caracteristica_Peso, '')

      // response.data.FORM.TelResidencial = toValidString(response.data.FORM.TelResidencial, '')
      response.data.FORM.CPFConj = toValidString(response.data.FORM.CPFConj, '')
      response.data.FORM.RGConj = toValidString(response.data.FORM.RGConj, '')
      response.data.FORM.PFilhos = toValidString(response.data.FORM.PFilhos, '')

      setForm(response.data.FORM)
    } catch (err) {
      Toast('Código inválido', 'info')
      setLoading(false)
      setValidado(false)
      setWait(false)
      setCodCandidato(null)
    }
  }

  const handleChangeEmail = (value) => {
    setEmail(value)
  }

  const handleSolicitaCodigo = async () => {
    if (email === "" || email === null) {
      Toast('Informe um email', 'warn')
      return
    }

    let toastId = null

    toastId = Toast('Aguarde...', 'wait')

    setWait(true)
    try {

      await api.post("/form/solicitacao", {
        email: email,
      });

      setEmail('')
      setWait(false)
      Toast('Um código foi enviado para o seu email!', 'update', toastId, 'success')
    } catch (err) {
      Toast('Falha ao enviar email com código', 'update', toastId, 'error')
      setWait(false)
    }
  }

  const handleOpenHelperModal = () => {
    setHelperModalOpen(true)
  }

  const handleCloseHelperModal = () => {
    setHelperModalOpen(false)
  }

  const whichContentDisplay = () => {
    if (codCandidato === null) {
      return (
        <CodeView
          onCodeInsertion={(value, e) => handleInsereCodigo(value, e)}
          onCodeRequest={(e) => handleSolicitaCodigo(e)}
          onEmailChange={(e) => handleChangeEmail(e)}
          email={email}
          fetching={wait}
        />
      )
    } else if (loading) {
      return (
        <Loading
          type="spinningBubbles"
          color="#000000"
          height="3%"
          width="3%"
        />
      )
    } else if (validado) {
      return (
        <FormContainer
          fullscreen={fullScreen}
        >
          <Intro />
          <Form
            Form={form}
            onChangeForm={setForm}
            COD={codCandidato}
            lastFormSection={formSection}
          />
        </FormContainer>
      )
    } else {
      return null
    }
  }

  return (
    <>
      {/* <HelperModal
        open={helperModalOpen}
        onClose={handleCloseHelperModal}
        title='Ajuda com o Formulário'
      /> */}

      {whichContentDisplay()}

      {/* <div
        style={{
          position: "fixed",
          right: "16px",
          bottom: "16px",
        }}
      >
        <Zoom
          in={!helperModalOpen}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${!helperModalOpen ? transitionDuration.exit : 0
              }ms`,
          }}
          unmountOnExit
        >
          <Fab
            onClick={handleOpenHelperModal}
            color="primary"
            style={{
              boxShadow: '2px 2px 3px #999',
              backgroundColor: '#0056C7'
            }}
          >
            <ContactSupportIcons fontSize="large" />
          </Fab>
        </Zoom>
      </div> */}
    </>
  );
}

export default Formulario

const INITIAL_STATE = {
  Nome_Completo: '',
  DtNascimento: null,
  RG: '',
  CPF: '',
  Logradouro: '',
  Número: '',
  Complemento: '',
  Bairro: '',
  Municipio: '',
  Estado: '',
  CEP: '',
  Email: '',
  Tel_Residencial: '',
  Celular: '',
  Est_Civil: null,
  Conj_Nome: '',
  Conj_DtNascimento: null,
  Conj_CPF: null,
  Conj_RG: null,
  TUnião: '',
  Conj_RendMensal: '',
  Profissao: '',
  CLT: null,
  Tem_filhos: null,
  Qtd_filhos: '',
  Idd_filhos: '',
  T_Residencia: null,
  P_Veiculo: null,
  P_Imovel: null,
  Expect: null,
  Recolhimento: null,
  T_Empresa: null,
  Sociedade: null,
  Part_invest: null,
  T_Empreendimento: null,
  Cob_Desp: null,
  Prioridade: new Array(11),
  Com_Regra: null,
  Com_Med: null,
  Com_Inf: null,
  Rend_Mensal: null,
  Residencia_Mensal: null,
  Recolhimento_QTD: null,
  Origem_Capital: '',
  Renda_Familiar: '',
  Renda_Composta: '',
  Disp_Invest: '',
  Detalhes_Atividade: '',
  Form_Escolar: '',
  Ult_exp: '',
  Nome_Socio: null,
  Socio_Vinculo: '',
  Tempo_ConheceSocio: '',
  Realizou_Socio: '',
  Cond_Socio: '',
  Prop_Invest: null,
  Exp_Sociedade: null,
  Conhece_Pilao: '',
  Caracteristica_Peso: '',
  Consultor: ''
}

const transitionDuration = {
  appear: 300,
  enter: 300,
  exit: 300,
};