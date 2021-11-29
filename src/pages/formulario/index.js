import React, { useState } from "react";
import Loading from "react-loading";

//Meio de comunicação
import { api } from "../../services/api";
import { saveAs } from "file-saver";

//"Placeholder" da página enquanto dados são carregados no
import { Button, Icon } from "react-materialize";
import Input from "../../components/materialComponents/InputUnderline";
import InputMultline from "../../components/materialComponents/InputMultline";

//import de elementos visuais
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";

import { Panel, Container } from "../../components/commom_in";
import { Toast } from "../../components/toasty";
import Modal from "../../components/modal";

import Stepper from './stepper'

export const Formulario = () => {
  const [codCandidato, setCodCandidato] = useState(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [validado, setValidado] = useState(false)
  const [form, setForm] = useState(initialState)

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

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
      await api.get("/form", {
        params: {
          cod: codigo,
        },
      });
      setLoading(false)
      setValidado(true)
    } catch (err) {
      event.target.value = "";
      setLoading(false)
      setValidado(false)
      setCodCandidato(null)
    }
  }

  const handleChangeEmail = (value) => {
    setEmail(value)
  }

  const handleSolicitaCodigo = async (event) => {
    event.target.disabled = true;

    if (email === "" || email === null) {
      Toast('Informe um email', 'warn')
      return
    }

    let toastId = null

    try {
      toastId = Toast('Aguarde...', 'wait')

      await api.post("/form/solicitacao", {
        email: email,
      });

      Toast('Um código foi enviado para o seu email!', 'update', toastId, 'success')
    } catch (err) {
      Toast('Falha ao enviar email com código', 'update', toastId, 'error')
      event.target.disabled = false;
    }
  }

  const handleSubmit = async (event) => {
    if (verificaCampos()) {
      return;
    }

    event.target.disabled = true;

    //Pega todos inputs do tipo arquivos
    const arquivos = document.getElementsByClassName("files");

    //cria um objeto do tipo formulario
    const formData = new FormData();

    //poe o conteudo de todos os inputs do tipo arquivo dentro do mesmo formulario
    for (let j = 0; j < arquivos.length; j++) {
      for (let i = 0; i < arquivos[j].files.length; i++) {
        formData.append(`formData`, arquivos[j].files[i]);
      }
    }

    let toastId = null

    //faz upload do formulario
    try {
      toastId = Toast('Enviando dados...', 'wait')
      await api.post(
        "/form",
        {
          form: form,
        },
        {
          headers: {
            "proto-cod": codCandidato,
          },
        }
      );

      Toast('Dados salvos!', 'update', toastId, 'success')
    } catch (err) {
      Toast('Falha ao salvar os dados', 'update', toastId, 'error')
      return;
    }

    //faz o upload das fotos
    try {
      toastId = Toast('Enviando arquivos...', 'wait')
      await api.post("/form/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "proto-cod": codCandidato,
        },
      });

      Toast('Arquivos enviados!', 'update', toastId, 'success')
    } catch (err) {
      Toast('Falha ao enviar arquivos', 'update', toastId, 'error')
      return;
    }

    setTimeout(() => window.location.reload(), 3000);
  }

  //essa função ta gigante, por em outro lugar
  const verificaCampos = () => {
    // INICIO DA VALIDAÇÃO DE DADOS BÁSICOS
    if (form.Nome_Completo === null || form.Nome_Completo === "") {
      Toast("(1).Preencha seu nome completo", 'warn');
      return true;
    }
    if (form.DtNascimento === null || form.DtNascimento === "") {
      Toast("(2).Preencha sua data de nascimento", 'warn');
      return true;
    }
    if (form.RG === null || form.RG === "") {
      Toast("(3).Preencha seu RG", 'warn');
      return true;
    }
    if (form.CPF === null || form.CPF === "") {
      Toast("(4).Preencha seu CPF", 'warn');
      return true;
    }
    if (form.Logradouro === null || form.Logradouro === "") {
      Toast("(5).Preencha seu endereço", 'warn');
      return true;
    }
    if (form.Número === null || form.Número === "") {
      Toast("(6).Preencha o número do seu endereço", 'warn');
      return true;
    }
    if (form.Bairro === null || form.Bairro === "") {
      Toast("(8).Preencha o bairro", 'warn');
      return true;
    }
    if (form.Municipio === null || form.Municipio === "") {
      Toast("(9).Preencha o município", 'warn');
      return true;
    }
    if (form.Estado === null || form.Estado === "") {
      Toast("(10).Preencha seu estado", 'warn');
      return true;
    }
    if (form.CEP === null || form.CEP === "") {
      Toast("(11).Preencha seu CEP", 'warn');
      return true;
    }
    if (form.Email === null || form.Email === "") {
      Toast("(12).Preencha seu email", 'warn');
      return true;
    }
    if (
      (form.Tel_Residencial === null || form.Tel_Residencial === "") &&
      (form.Celular === null || form.Celular === "")
    ) {
      Toast("(13/14).Informe pelo menos um número de Telefone ou Celular", 'warn');
      return true;
    }

    // FIM DA VALIDAÇÃO DE DADOS BÁSICOS

    // VALIDAÇÃO DO LADO ESQUERDO
    //verificar se o estado civil foi marcado ou se foi marcado como casado sem os dados do conjuge
    if (form.Est_Civil === null) {
      Toast("(15).Informe seu estado civil", 'warn');
      return true;
    }
    if (
      Number(form.Est_Civil) <= 3 &&
      (form.Conj_Nome === null ||
        form.Conj_Nome === "" ||
        form.Conj_RG === null ||
        form.Conj_RG === "" ||
        form.Conj_CPF === null ||
        form.Conj_CPF === "" ||
        form.Conj_DtNascimento === null ||
        form.Conj_DtNascimento === "" ||
        form.Conj_RendMensal === null ||
        form.Conj_RendMensal === "" ||
        form.TUnião === null ||
        form.TUnião === "")
    ) {
      Toast("(16 a 21).Revise os dados do seu conjuge", 'warn');
      return true;
    }

    if (form.CLT === null) {
      Toast("(22).Informe se é CLT ou não", 'warn');
      return true;
    }

    if (
      form.CLT === "Sim" &&
      (form.Rend_Mensal === null || form.Rend_Mensal === "")
    ) {
      Toast("(23).Você não informou seu rendimento mensal como CLT", 'warn');
      return true;
    }

    if (form.Tem_filhos === null) {
      Toast("(24).Informe se possui filhos", 'warn');
      return true;
    }

    if (
      form.Tem_filhos === "Sim" &&
      (form.Qtd_filhos === null ||
        form.Qtd_filhos === "" ||
        form.Idd_filhos === null ||
        form.Idd_filhos === "")
    ) {
      Toast("(25 e 26).Preencha corretamente quantos filhos e suas idades", 'warn');
      return true;
    }

    if (form.T_Residencia === null) {
      Toast("(27).Informe qual o tipo da sua residência atual", 'warn');
      return true;
    }

    if (
      (form.T_Residencia === "Alugada" || form.T_Residencia === "Financiada") &&
      (form.Residencia_Mensal === null || form.Residencia_Mensal === "")
    ) {
      Toast("(28).Informe a quantia gasta por mês com sua residência", 'warn');
      return true;
    }

    if (form.P_Veiculo === null || form.P_Veiculo === "") {
      Toast("(29).Informe se possui veículo", 'warn');
      return true;
    }

    if (form.P_Imovel === null || form.P_Imovel === "") {
      Toast("(30).Informe se possui imóvel", 'warn');
      return true;
    }

    if (form.Expect === null) {
      Toast(
        "(31).Informe a margem de tempo em que deseja receber o retorno para seu investimento", 'warn'
      );
      return true;
    }

    if (form.Recolhimento === null) {
      Toast(
        "(32).Informe se houve recolhimento de imposto de renda no último ano", 'warn'
      );
      return true;
    }

    if (
      form.Recolhimento === "Sim" &&
      (form.Recolhimento_QTD === null || form.Recolhimento_QTD === "")
    ) {
      Toast("(33).Informe a quantia recolhida pelo imposto de renda", 'warn');
      return true;
    }

    if (form.Origem_Capital === null || form.Origem_Capital === "") {
      Toast(
        "(34).Informe a origem do capital destinado à abertura do negócio junto à Pilão", 'warn'
      );
      return true;
    }

    if (form.Renda_Familiar === null || form.Renda_Familiar === "") {
      Toast("(35).Informe sua renda familiar", 'warn');
      return true;
    }

    if (form.Renda_Composta === null || form.Renda_Composta === "") {
      Toast("(36).Especifique como sua renda familiar é composta", 'warn');
      return true;
    }
    if (form.Disp_Invest === null || form.Disp_Invest === "") {
      Toast("(37).Informe a quantia disponivel para investimento no negócio", 'warn');
      return true;
    }
    if (form.T_Empresa === null) {
      Toast("(38).Informe se já teve uma empresa própria", 'warn');
      return true;
    }
    if (
      form.T_Empresa === "Sim" &&
      (form.Detalhes_Atividade === null || form.Detalhes_Atividade === "")
    ) {
      Toast("(39).Detalhe as atividades da sua empresa", 'warn');
      return true;
    }
    if (form.Form_Escolar === null || form.Form_Escolar === "") {
      Toast("(40).Informe sua formação escolar", 'warn');
      return true;
    }
    if (form.Ult_exp === null || form.Ult_exp === "") {
      Toast("(41).Conte sobre suas últimas experiencias profissionais", 'warn');
      return true;
    }
    //FIM DA VALIDAÇÃO DO PRIMEIRO LADO

    //INICIO DA VALIDAÇÃO DO SEGUNDO LADO
    if (form.Sociedade === null) {
      Toast("(42).Informe se haverá um sócio na franquia", 'warn');
      return true;
    }
    if (
      form.Sociedade === "Sim" &&
      (form.Nome_Socio === null ||
        form.Nome_Socio === "" ||
        form.Socio_Vinculo === null ||
        form.Socio_Vinculo === "" ||
        form.Tempo_ConheceSocio === null ||
        form.Tempo_ConheceSocio === "" ||
        form.Realizou_Socio === null ||
        form.Realizou_Socio === "" ||
        form.Cond_Socio === null ||
        form.Cond_Socio === "" ||
        form.Part_invest === null ||
        (form.Part_invest === "Sim" &&
          (form.Prop_Invest === null || form.Prop_Invest === "")))
    ) {
      Toast(
        "(43 a 49).Verifique se todas as questões relacionadas ao sócio da franquia foram devidamente respondidas", 'warn'
      );
      return true;
    }

    if (form.T_Empreendimento === null) {
      Toast("(50).Informe se já teve um empreendimento em sociedade antes", 'warn');
      return true;
    }

    if (
      form.T_Empreendimento === "Sim" &&
      (form.Exp_Sociedade === null || form.Exp_Sociedade === "")
    ) {
      Toast("(51).Conte sobre sua experiencia em sociedade", 'warn');
      return true;
    }

    if (form.Cob_Desp === null) {
      Toast(
        "(52).Informe a disponibilidade de capital para eventual investimento que complete despesas da franquia", 'warn'
      );
      return true;
    }

    if (form.Conhece_Pilao === null || form.Conhece_Pilao === "") {
      Toast("(53).Nos conte como conheceu a Pilão", 'warn');
      return true;
    }

    for (let i = 0; i < form.Prioridade.length; i++) {
      if (typeof form.Prioridade[i] == "undefined") {
        Toast("(54).Avalie cada uma das afirmações da questão .42", 'warn');
        return true;
      }
    }

    if (form.Caracteristica_Peso === null || form.Caracteristica_Peso === "") {
      Toast(
        "(55).Nos conte qual foi a caracteristica de negócio que mais lhe atraiu na Pilão Professional", 'warn'
      );
      return true;
    }

    if (form.Com_Regra === null) {
      Toast(
        "(56).Informe se está disposto à cumprir as regras da franqueadora", 'warn'
      );
      return true;
    }

    if (form.Com_Med === null) {
      Toast("(57).Informe se está ciente da média mensal inicial", 'warn');
      return true;
    }

    if (form.Com_Inf === null) {
      Toast("(58).Informe se concorda em fornecer informações à franqueadora", 'warn');
      return true;
    }

    return false;
  }

  

  

  //baixa form word da rede
  const handleRetriveWORD = async (event) => {
    event.target.disabled = true;
    let toastId = null

    try {
      toastId = Toast('Buscando formulário...', 'wait')
      const response = await api.get("/form/original", {
        responseType: "arraybuffer",
      });

      Toast('Formulário encontrado!', 'update', toastId, 'success')
      const blob = new Blob([response.data], { type: "application/msword" });

      saveAs(blob, `Questionário de Perfil.doc`);
      event.target.disabled = false;
    } catch (err) {
      Toast('Falha ao recuperar formulário do servidor', 'update', toastId, 'error')
      event.target.disabled = false;
    }
  }

  return (
    <Container
      style={{
        justifyContent: "center",
        alignContent: "center",
        height: "unset",
      }}
    >
      <h4>Questionário para Análise de Perfil</h4>
      <Panel
        style={isMdUp ? {
          justifyContent: "flex-start",
          marginTop: "10vh",
          maxWidth: "90vw",
          minHeight: "65vh",
          flexDirection: "column",
          fontSize: "1.50vw",
        } : {
          justifyContent: "center",
          marginTop: "10%",
          maxWidth: "100vw",
          minHeight: "80vh",
          flexDirection: "column",
          fontSize: "1.50vw",
          alignItems: "center",
        }}
      >
        {codCandidato === null ? (
          <div style={divAlinha2}>
            <input
              onChange={(e) => {
                e.persist();
                handleInsereCodigo(e.target.value, e);
              }}
              autoFocus={true}
              disabled={false}
              style={{
                all: "unset",
                textAlign: "center",
                border: "1px solid #000",
                borderRadius: "5px",
                padding: "10px",
                fontSize: "2vw",
              }}
              type="text"
              placeholder="Código de acesso"
            />
            <div className="YAlign" style={{ justifyContent: "center", alignItems: "center"}}>
              <Typography variant='h5' >Não possui um código?</Typography>

              <Modal
                actions={
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={(e) => handleSolicitaCodigo(e)}
                  >
                    <Icon left>send</Icon>Solicitar
                  </Button>
                }
                header="Solicitar código de acesso"
                trigger={
                  <Button>
                    Clique aqui
                    <Icon right small>
                      contact_mail
                    </Icon>
                  </Button>
                }
              >
                <Input
                  style={{ width: '100%' }}
                  onChange={(e) => handleChangeEmail(e)}
                  label="Email"
                />
              </Modal>
            </div>
          </div>
        ) : null}

        {loading ? (
          <Loading
            type="spinningBubbles"
            color="#000000"
            height="3%"
            width="3%"
          />
        ) : null}

        {validado ? (
          <Stepper Form={form} onFormChange={setForm}/>
        ) : null}
      </Panel>
    </Container>
  );
}

export default Formulario

const divStyle = {
  display: "Flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignContent: "center",
  alignItems: "center",
  marginBottom: "2%",
};

const divStyle2 = {
  display: "Flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "center",
  alignItems: "center",
  marginBottom: "2%",
};

const inputStyle = {
  width: "20px",
  textAlign: "center",
  height: "unset",
  border: "1px solid #9e9e9e",
  marginRight: "10px",
};

const labels = {
  all: "unset",
  fontSize: "1.20rem",
};

const divAlinha = {
  display: "flex",
  flex: "1",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const divAlinha2 = {
  display: "flex",
  flex: "1",
  flexDirection: "column",
  justifyContent: "space-between",
  alignContent: "center",
  alignItems: "center",
};

const divBorder = {
  display: "flex",
  padding: "10px 10px 0px 10px",
  width: "100%",
  flexDirection: "column",
  border: "1px solid #c1c1c1",
  borderRadius: "1vw",
};

const checkbox = {};

const initialState = {
  Nome_Completo: null,
  DtNascimento: null,
  RG: null,
  CPF: null,
  Logradouro: null,
  Número: null,
  Complemento: null,
  Bairro: null,
  Municipio: null,
  Estado: null,
  CEP: null,
  Email: null,
  Tel_Residencial: null,
  Celular: null,
  Est_Civil: null,
  Conj_Nome: null,
  Conj_DtNascimento: null,
  Conj_CPF: null,
  Conj_RG: null,
  TUnião: null,
  Conj_RendMensal: null,
  CLT: null,
  Tem_filhos: null,
  Qtd_filhos: null,
  Idd_filhos: null,
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
  Origem_Capital: null,
  Renda_Familiar: null,
  Renda_Composta: null,
  Disp_Invest: null,
  Detalhes_Atividade: null,
  Form_Escolar: null,
  Ult_exp: null,
  Nome_Socio: null,
  Socio_Vinculo: null,
  Tempo_ConheceSocio: null,
  Realizou_Socio: null,
  Cond_Socio: null,
  Prop_Invest: null,
  Exp_Sociedade: null,
  Conhece_Pilao: null,
  Caracteristica_Peso: null,
}