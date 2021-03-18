import React from "react";
import Loading from "react-loading";

//Meio de comunicação
import { api } from "../../services/api";
//"Placeholder" da página enquanto dados são carregados no
import { Button, TextInput, Textarea, Select } from "react-materialize";

//import de elementos visuais
import { Panel, Container } from "../../components/commom_in";
import { Toast, ToastyContainer } from "../../components/toasty";

export default class Formulario extends React.Component {
  state = {
    cod_candidato: null,
    loading: false, //switch pra ativar a animação de loading
    vadidado: false, //se o candidato já foi reconhecido
    form: {
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
    },
  };

  async handleInsereCodigo(codigo, event) {
    if (!Number.isSafeInteger(Number(codigo))) {
      event.target.value = codigo.slice(0, codigo.length - 1);
      return;
    }

    if (codigo.length === 6) {
      this.setState({ cod_candidato: codigo, loading: true });
    } else {
      this.setState({ cod_candidato: null });
      return;
    }

    try {
      await api.get("/form", {
        params: {
          cod: codigo,
        },
      });
      this.setState({ loading: false, validado: true });
    } catch (err) {
      event.target.value = "";
      Toast("Código inválido, tente novamente", "error");
      this.setState({ loading: false, validado: false, cod_candidato: null });
    }
  }

  async handleSubmit(event) {
    if (this.verificaCampos()) {
      return;
    }
    event.target.disabled = true;
    console.log(this.state.form);

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

    //faz upload do formulario
    try {
      await api.post(
        "/form",
        {
          form: this.state.form,
        },
        {
          headers: {
            "proto-cod": this.state.cod_candidato,
          },
        }
      );
    } catch (err) {
      Toast("Falha ao salvar os dados do seu formulário", "error");
      console.log(err);
    }

    //faz o upload das fotos
    try {
      await api.post("/form/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "proto-cod": this.state.cod_candidato,
        },
      });
    } catch (err) {
      Toast("Erro ao fazer o upload dos seus arquivos", "error");
      console.log(err);
    }

    // setTimeout(() => window.location.reload(), 3000);
  }

  verificaCampos() {
    let aux = { ...this.state.form };

    // INICIO DA VALIDAÇÃO DE DADOS BÁSICOS
    if (aux.Nome_Completo === null || aux.Nome_Completo === "") {
      Toast("Preencha seu nome completo");
      return true;
    }
    if (aux.DtNascimento === null || aux.DtNascimento === "") {
      Toast("Preencha sua data de nascimento");
      return true;
    }
    if (aux.RG === null || aux.RG === "") {
      Toast("Preencha seu RG");
      return true;
    }
    if (aux.CPF === null || aux.CPF === "") {
      Toast("Preencha seu CPF");
      return true;
    }
    if (aux.Logradouro === null || aux.Logradouro === "") {
      Toast("Preencha seu endereço");
      return true;
    }
    if (aux.Número === null || aux.Número === "") {
      Toast("Preencha o número do seu endereço");
      return true;
    }
    if (aux.Bairro === null || aux.Bairro === "") {
      Toast("Preencha o bairro");
      return true;
    }
    if (aux.Municipio === null || aux.Municipio === "") {
      Toast("Preencha o município");
      return true;
    }
    if (aux.Estado === null || aux.Estado === "") {
      Toast("Preencha seu estado");
      return true;
    }
    if (aux.CEP === null || aux.CEP === "") {
      Toast("Preencha seu CEP");
      return true;
    }
    if (aux.Email === null || aux.Email === "") {
      Toast("Preencha seu email");
      return true;
    }
    if (
      aux.Tel_Residencial === null ||
      aux.Tel_Residencial === "" ||
      aux.Celular === null ||
      aux.Celular === ""
    ) {
      Toast("Informe pelo menos um número de Telefone ou Celular");
      return true;
    }

    // FIM DA VALIDAÇÃO DE DADOS BÁSICOS

    // VALIDAÇÃO DO PRIMEIRO LADO
    //verificar se o estado civil foi marcado ou se foi marcado como casado sem os dados do conjuge
    if (aux.Est_Civil === null) {
      Toast("Informe seu estado civil");
      return true;
    }
    if (
      Number(aux.Est_Civil) <= 3 &&
      (aux.Conj_Nome === null ||
        aux.Conj_Nome === "" ||
        aux.Conj_RG === null ||
        aux.Conj_RG === "" ||
        aux.Conj_CPF === null ||
        aux.Conj_CPF === "" ||
        aux.Conj_DtNascimento === null ||
        aux.Conj_DtNascimento === "" ||
        aux.Conj_RendMensal === null ||
        aux.Conj_RendMensal === "" ||
        aux.TUnião === null ||
        aux.TUnião === "")
    ) {
      Toast("Revise os dados do seu conjuge");
      return true;
    }

    if (aux.CLT === null) {
      Toast("Informe se é CLT ou não");
      return true;
    }

    if (
      aux.CLT === "Sim" &&
      (aux.Rend_Mensal === null || aux.Rend_Mensal === "")
    ) {
      Toast("Você não informou seu rendimento mensal como CLT");
      return true;
    }

    if (aux.Tem_filhos === null) {
      Toast("Informe se possui filhos");
      return true;
    }

    if (
      aux.Tem_filhos === "Sim" &&
      (aux.Qtd_filhos === null ||
        aux.Qtd_filhos === "" ||
        aux.Idd_filhos === null ||
        aux.Idd_filhos === "")
    ) {
      Toast("Preencha corretamente quantos filhos e suas idades");
      return true;
    }

    if (aux.T_Residencia === null) {
      Toast("Informe qual o tipo da sua residência atual");
      return true;
    }

    if (
      (aux.T_Residencia === "Alugada" || aux.T_Residencia === "Financiada") &&
      (aux.Residencia_Mensal === null || aux.Residencia_Mensal === "")
    ) {
      Toast("Informe a quantia gasta por mês com sua residência");
      return true;
    }

    if (aux.P_Veiculo === null || aux.P_Veiculo === "") {
      Toast("Informe se possui veículo");
      return true;
    }

    if (aux.P_Imovel === null || aux.P_Imovel === "") {
      Toast("Informe se possui imóvel");
      return true;
    }

    if (aux.Expect === null) {
      Toast(
        "Informe a margem de tempo em que deseja receber o retorno para seu investimento"
      );
      return true;
    }

    if (aux.Recolhimento === null) {
      Toast("Informe se houve recolhimento de imposto de renda no último ano");
      return true;
    }

    if (
      aux.Recolhimento === "Sim" &&
      (aux.Recolhimento_QTD === null || aux.Recolhimento_QTD === "")
    ) {
      Toast("Informe a quantia recolhida pelo imposto de renda");
      return true;
    }

    if (aux.Origem_Capital === null || aux.Origem_Capital === "") {
      Toast(
        "Informe a origem do capital destinado à abertura do negócio junto à Pilão"
      );
      return true;
    }

    if (aux.Renda_Familiar === null || aux.Renda_Familiar === "") {
      Toast("Informe sua renda familiar");
      return true;
    }

    if (aux.Renda_Composta === null || aux.Renda_Composta === "") {
      Toast("Especifique como sua renda familiar é composta");
      return true;
    }
    if (aux.Disp_Invest === null || aux.Disp_Invest === "") {
      Toast("Informe a quantia disponivel para investimento no negócio");
      return true;
    }
    if (aux.T_Empresa === null) {
      Toast("Informe se já teve uma empresa própria");
      return true;
    }
    if (
      aux.T_Empresa === "Sim" &&
      (aux.Detalhes_Atividade === null || aux.Detalhes_Atividade === "")
    ) {
      Toast("Detalhe as atividades da sua empresa");
      return true;
    }
    if (aux.Form_Escolar === null || aux.Form_Escolar === "") {
      Toast("Informe sua formação escolar");
      return true;
    }
    if (aux.Ult_exp === null || aux.Ult_exp === "") {
      Toast("Conte sobre suas últimas experiencias profissionais");
      return true;
    }
    //FIM DA VALIDAÇÃO DO PRIMEIRO LADO

    //INICIO DA VALIDAÇÃO DO SEGUNDO LADO
    if (aux.Sociedade === null) {
      Toast("Informe se haverá um sócio na franquia");
      return true;
    }
    if (
      aux.Sociedade === "Sim" &&
      (aux.Nome_Socio === null ||
        aux.Nome_Socio === "" ||
        aux.Socio_Vinculo === null ||
        aux.Socio_Vinculo === "" ||
        aux.Tempo_ConheceSocio === null ||
        aux.Tempo_ConheceSocio === "" ||
        aux.Realizou_Socio === null ||
        aux.Realizou_Socio === "" ||
        aux.Cond_Socio === null ||
        aux.Cond_Socio === "" ||
        aux.Part_invest === null ||
        (aux.Part_invest === "Sim" &&
          (aux.Prop_Invest === null || aux.Prop_Invest === "")))
    ) {
      Toast(
        "Verifique se todas as questões relacionadas ao sócio da franquia foram devidamente respondidas"
      );
      return true;
    }

    if (aux.T_Empreendimento === null) {
      Toast("Informe se já teve um empreendimento em sociedade antes");
      return true;
    }

    if (
      aux.T_Empreendimento === "Sim" &&
      (aux.Exp_Sociedade === null || aux.Exp_Sociedade === "")
    ) {
      Toast("Conte sobre sua experiencia em sociedade");
      return true;
    }

    if (aux.Cob_Desp === null) {
      Toast(
        "Informe a disponibilidade de capital para eventual investimento que complete despesas da franquia"
      );
      return true;
    }

    if (aux.Conhece_Pilao === null || aux.Conhece_Pilao === "") {
      Toast("Nos conte como conheceu a Pilão");
      return true;
    }

    for (let i = 0; i < aux.Prioridade.length; i++) {
      if (typeof aux.Prioridade[i] == "undefined") {
        Toast("Avalie cada uma das afirmações da questão .42");
        return true;
      }
    }

    if (aux.Caracteristica_Peso === null || aux.Caracteristica_Peso === "") {
      Toast(
        "Nos conte qual foi a caracteristica de negócio que mais lhe atraiu na Pilão Professional"
      );
      return true;
    }

    if (aux.Com_Regra === null) {
      Toast("Informe se está disposto à cumprir as regras da franqueadora");
      return true;
    }

    if (aux.Com_Med === null) {
      Toast("Informe se está ciente da média mensal inicial");
      return true;
    }

    if (aux.Com_Inf === null) {
      Toast("Informe se concorda em fornecer informações à franqueadora");
      return true;
    }

    return false;
  }

  marcaCheckbox(valueMarcado, value) {
    const checkbox = document.querySelectorAll('input[type="checkbox"]');

    if (valueMarcado > 3 && value === true) {
      this.setState({
        form: {
          ...this.state.form,
          Est_Civil: valueMarcado,
          Conj_Nome: null,
          Conj_DtNascimento: null,
          Conj_CPF: null,
          Conj_RG: null,
          TUnião: null,
          Conj_RendMensal: null,
        },
      });
    } else if (value === false) {
      this.setState({
        form: {
          ...this.state.form,
          Est_Civil: null,
          Conj_Nome: null,
          Conj_DtNascimento: null,
          Conj_CPF: null,
          Conj_RG: null,
          TUnião: null,
          Conj_RendMensal: null,
        },
      });
    } else {
      this.setState({
        form: { ...this.state.form, Est_Civil: valueMarcado },
      });
    }

    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].value !== valueMarcado) {
        checkbox[i].checked = false;
      }
    }
  }

  handleDefinePrioidade(opcao, prioridade, event) {
    let aux = [];

    if (!Number.isSafeInteger(Number(prioridade)) || Number(prioridade) > 11) {
      event.target.value = prioridade.slice(0, prioridade.length - 1);
      return;
    }

    aux = [...this.state.form.Prioridade];

    aux[opcao] = prioridade;

    this.setState({ form: { ...this.state.form, Prioridade: aux } });
  }

  render() {
    return (
      <Container
        style={{
          justifyContent: "center",
          alignContent: "center",
          height: "unset",
        }}
      >
        <h4>Questionário para Análise de Perfil</h4>
        <ToastyContainer />
        <Panel
          style={{
            justifyContent: "flex-start",
            marginTop: "10%",
            maxWidth: "90vw",
            minHeight: "65vh",
            flexDirection: "column",
            fontSize: "1.50vw",
          }}
        >
          {this.state.cod_candidato === null ? (
            <div style={divAlinha2}>
              <input
                onChange={(e) => {
                  e.persist();
                  this.handleInsereCodigo(e.target.value, e);
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
                placeholder="Código de cadastro"
              />
              <p>
                *Esse código será fornecido por um de nossos consultores para
                que você possa preencher o formulário à seguir.
              </p>
            </div>
          ) : null}

          {this.state.loading ? (
            <Loading
              type="spinningBubbles"
              color="#000000"
              height="3%"
              width="3%"
            />
          ) : null}

          {this.state.validado ? (
            <div className="YAlign">
              <p>
                Agradecemos o preenchimento do questionário e ressaltamos que as
                informações serão tratadas com a devida discrição.
              </p>
              <p>
                Trata-se de um questionário abrangente. A coleta de todas as
                informações tem como objetivo avaliar se o que temos para
                oferecer está dentro da expectativa e vice-versa, visando com
                isso promover o sucesso do empreendimento. Estamos também à
                disposição caso se deseje qualquer informação sobre a Pilão
                Professional ou sobre o nosso sistema de franquia.
              </p>
              <p style={{ marginBottom: "10px" }}>
                Caso exista mais de uma pessoa na condução do negócio, que irá
                participar do dia a dia da operação, participando ou não
                formalmente no contrato social, é imprescindível que seja
                enviado um questionário para cada pessoa envolvida
              </p>
              <div style={divBorder}>
                <div style={divStyle2}>
                  <TextInput
                    validate
                    style={{ fontSize: "1.20rem" }}
                    data-length={120}
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Nome_Completo: e.target.value,
                        },
                      })
                    }
                    label="Nome completo"
                  />
                  <TextInput
                    validate
                    data-length={10}
                    style={{ fontSize: "1.20rem" }}
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          DtNascimento: e.target.value,
                        },
                      })
                    }
                    label="Dt. de nascimento"
                  />
                  <TextInput
                    validate
                    style={{ fontSize: "1.20rem" }}
                    data-length={20}
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, RG: e.target.value },
                      })
                    }
                    label="RG"
                  />
                  <TextInput
                    validate
                    style={{ fontSize: "1.20rem" }}
                    data-length={20}
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, CPF: e.target.value },
                      })
                    }
                    label="CPF"
                  />
                </div>

                <div style={divStyle}>
                  <TextInput
                    validate
                    style={{ fontSize: "1.20rem" }}
                    data-length={100}
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Logradouro: e.target.value,
                        },
                      })
                    }
                    label="Logradouro"
                  />

                  <TextInput
                    data-length={4}
                    validate
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, Número: e.target.value },
                      })
                    }
                    style={{ fontSize: "1.20rem" }}
                    label="Número"
                  />
                  <TextInput
                    validate
                    style={{ fontSize: "1.20rem" }}
                    data-length={100}
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Complemento: e.target.value,
                        },
                      })
                    }
                    label="Complemento"
                  />
                </div>

                <div style={divStyle2}>
                  <TextInput
                    validate
                    style={{ fontSize: "1.20rem" }}
                    data-length={50}
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, Bairro: e.target.value },
                      })
                    }
                    label="Bairro"
                  />
                  <TextInput
                    validate
                    style={{ fontSize: "1.20rem" }}
                    data-length={50}
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, Municipio: e.target.value },
                      })
                    }
                    label="Município"
                  />
                  <TextInput
                    validate
                    style={{ fontSize: "1.20rem" }}
                    data-length={50}
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, Estado: e.target.value },
                      })
                    }
                    label="Estado"
                  />
                  <TextInput
                    validate
                    style={{ fontSize: "1.20rem" }}
                    data-length={20}
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, CEP: e.target.value },
                      })
                    }
                    label="CEP"
                  />
                </div>

                <div style={divStyle2}>
                  <TextInput
                    validate
                    email
                    style={{ fontSize: "1.20rem" }}
                    data-length={100}
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, Email: e.target.value },
                      })
                    }
                    label="Email"
                  />
                  <TextInput
                    validate
                    data-length={20}
                    style={{ fontSize: "1.20rem" }}
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Tel_Residencial: e.target.value,
                        },
                      })
                    }
                    label="Telefone residencial"
                  />
                  <TextInput
                    validate
                    data-length={20}
                    style={{ fontSize: "1.20rem" }}
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, Celular: e.target.value },
                      })
                    }
                    label="Celular"
                  />
                </div>
              </div>

              {/* INICIO DO FORMULARIO */}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={divAlinha}>
                  <p>Estado Civil:</p>
                  <div style={divStyle}>
                    <input
                      type="checkbox"
                      style={checkbox}
                      onClick={(e) =>
                        this.marcaCheckbox(e.target.value, e.target.checked)
                      }
                      value="1"
                    />
                    <p style={{ margin: "0px" }}>
                      Casado(a) em regime de comunhão universal de bens
                    </p>
                  </div>
                  <div style={divStyle}>
                    <input
                      type="checkbox"
                      onClick={(e) =>
                        this.marcaCheckbox(e.target.value, e.target.checked)
                      }
                      value="2"
                    />
                    <p style={{ margin: "0px" }}>
                      Casado(a) em regime de comunhão parcial de bens
                    </p>
                  </div>
                  <div style={divStyle}>
                    <input
                      type="checkbox"
                      onClick={(e) =>
                        this.marcaCheckbox(e.target.value, e.target.checked)
                      }
                      value="3"
                    />
                    <p style={{ margin: "0px" }}>
                      Casado(a) em regime de separação de bens
                    </p>
                  </div>
                  <div style={divStyle}>
                    <input
                      type="checkbox"
                      onClick={(e) =>
                        this.marcaCheckbox(e.target.value, e.target.checked)
                      }
                      value="4"
                    />
                    <p style={{ margin: "0px" }}>Solteiro (a)</p>
                  </div>
                  <div style={divStyle}>
                    <input
                      type="checkbox"
                      onClick={(e) =>
                        this.marcaCheckbox(e.target.value, e.target.checked)
                      }
                      value="5"
                    />
                    <p style={{ margin: "0px" }}>Divorciado(a)</p>
                  </div>
                  <div style={divStyle}>
                    <input
                      type="checkbox"
                      onClick={(e) =>
                        this.marcaCheckbox(e.target.value, e.target.checked)
                      }
                      value="6"
                    />
                    <p style={{ margin: "0px" }}>Separado(a) judicialmente</p>
                  </div>
                  <div style={divStyle}>
                    <input
                      type="checkbox"
                      onClick={(e) =>
                        this.marcaCheckbox(e.target.value, e.target.checked)
                      }
                      value="7"
                    />
                    <p style={{ margin: "0px" }}>Viúvo (a)</p>
                  </div>

                  {this.state.form.Est_Civil < 4 &&
                  this.state.form.Est_Civil !== null ? (
                    <>
                      <div style={divStyle}>
                        <TextInput
                          validate
                          style={{ fontSize: "1.20rem" }}
                          data-length={120}
                          onChange={(e) =>
                            this.setState({
                              form: {
                                ...this.state.form,
                                Conj_Nome: e.target.value,
                              },
                            })
                          }
                          label="Nome do(a) cônjuge"
                        />
                        <TextInput
                          validate
                          data-length={10}
                          style={{ fontSize: "1.20rem" }}
                          onChange={(e) =>
                            this.setState({
                              form: {
                                ...this.state.form,
                                Conj_DtNascimento: e.target.value,
                              },
                            })
                          }
                          label="Data de Nascimento"
                        />
                      </div>
                      <div style={divStyle}>
                        <TextInput
                          validate
                          style={{ fontSize: "1.20rem" }}
                          data-length={20}
                          onChange={(e) =>
                            this.setState({
                              form: {
                                ...this.state.form,
                                Conj_CPF: e.target.value,
                              },
                            })
                          }
                          label="CPF"
                        />
                        <TextInput
                          validate
                          style={{ fontSize: "1.20rem" }}
                          data-length={20}
                          onChange={(e) =>
                            this.setState({
                              form: {
                                ...this.state.form,
                                Conj_RG: e.target.value,
                              },
                            })
                          }
                          label="RG"
                        />
                      </div>
                      <div style={divStyle}>
                        <TextInput
                          validate
                          style={{ fontSize: "1.20rem" }}
                          data-length={50}
                          onChange={(e) =>
                            this.setState({
                              form: {
                                ...this.state.form,
                                TUnião: e.target.value,
                              },
                            })
                          }
                          label="Tempo de união"
                        />
                        <TextInput
                          validate
                          style={{ fontSize: "1.20rem" }}
                          data-length={50}
                          onChange={(e) =>
                            this.setState({
                              form: {
                                ...this.state.form,
                                Conj_RendMensal: e.target.value,
                              },
                            })
                          }
                          label="Rendimento mensal"
                        />
                      </div>
                    </>
                  ) : null}
                  <p>CLT?</p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, CLT: e.target.value },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Select>
                  {this.state.form.CLT === "Sim" ? (
                    <TextInput
                      validate
                      style={{ fontSize: "1.20rem" }}
                      data-length={50}
                      onChange={(e) =>
                        this.setState({
                          form: {
                            ...this.state.form,
                            Rend_Mensal: e.target.value,
                          },
                        })
                      }
                      label="Rendimento mensal"
                    />
                  ) : null}
                  <p>Possui filhos?</p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Tem_filhos: e.target.value,
                        },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Select>
                  {this.state.form.Tem_filhos === "Sim" ? (
                    <div style={divStyle}>
                      <TextInput
                        validate
                        data-length={20}
                        style={{ fontSize: "1.20rem" }}
                        onChange={(e) =>
                          this.setState({
                            form: {
                              ...this.state.form,
                              Qtd_filhos: e.target.value,
                            },
                          })
                        }
                        label="Quantos:"
                      />
                      <TextInput
                        validate
                        data-length={50}
                        style={{ fontSize: "1.20rem" }}
                        onChange={(e) =>
                          this.setState({
                            form: {
                              ...this.state.form,
                              Idd_filhos: e.target.value,
                            },
                          })
                        }
                        label="Idades:"
                      />
                    </div>
                  ) : null}

                  <p>Residencia:</p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          T_Residencia: e.target.value,
                        },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Própria">Própria</option>
                    <option value="Alugada">Alugada</option>
                    <option value="Financiada">Financiada</option>
                    <option value="Emprestada">Emprestada</option>
                    <option value="Outros">Outros</option>
                  </Select>

                  {this.state.form.T_Residencia === "Alugada" ||
                  this.state.form.T_Residencia === "Financiada" ? (
                    <TextInput
                      validate
                      style={{ fontSize: "1.20rem" }}
                      onChange={(e) =>
                        this.setState({
                          form: {
                            ...this.state.form,
                            Residencia_Mensal: e.target.value,
                          },
                        })
                      }
                      label="Valor mensal"
                    />
                  ) : null}

                  <p>Possui veículo?</p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, P_Veiculo: e.target.value },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Select>
                  <p>Possui Imóvel?</p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, P_Imovel: e.target.value },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Select>

                  <p>Qual sua expectativa de retorno para esse investimento?</p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, Expect: e.target.value },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="10/20">10 a 20 meses</option>
                    <option value="20/30">20 a 30 meses</option>
                    <option value="30+">30+ meses</option>
                  </Select>

                  <p>Teve recolhimento de imposto de renda no ultimo ano?</p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Recolhimento: e.target.value,
                        },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Select>

                  {this.state.form.Recolhimento === "Sim" ? (
                    <div style={divStyle}>
                      <TextInput
                        validate
                        style={{ fontSize: "1.20rem" }}
                        onChange={(e) =>
                          this.setState({
                            form: {
                              ...this.state.form,
                              Recolhimento_QTD: e.target.value,
                            },
                          })
                        }
                        placeholder="Quantia:"
                      />
                      <p>*Sem considerar eventual valor restituído</p>
                    </div>
                  ) : null}

                  <p>
                    Qual a origem do capital disponível para a abertura do
                    negócio com a Pilão Professional?
                  </p>
                  <Textarea
                    style={{ fontSize: "1.20rem" }}
                    data-length={250}
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Origem_Capital: e.target.value,
                        },
                      })
                    }
                    placeholder="Especifique..."
                  />
                  <p>Qual sua renda familiar?</p>
                  <TextInput
                    validate
                    style={{ fontSize: "1.20rem" }}
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Renda_Familiar: e.target.value,
                        },
                      })
                    }
                    placeholder="Especifique..."
                  />

                  <p>Como é composta sua renda familiar?</p>
                  <Textarea
                    style={{ fontSize: "1.20rem" }}
                    data-length={250}
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Renda_Composta: e.target.value,
                        },
                      })
                    }
                    placeholder="Especifique..."
                  />

                  <p>
                    Qual a disponibilidade para investimento na franquia, em
                    dinheiro, sem considerar empréstimos ou linhas de crédito?
                  </p>
                  <TextInput
                    validate
                    style={{ fontSize: "1.20rem" }}
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Disp_Invest: e.target.value,
                        },
                      })
                    }
                    placeholder="Especifique..."
                  />

                  <p>
                    Tem/Teve empresa própria e/ou tem experiencia como
                    profissional autônomo?
                  </p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, T_Empresa: e.target.value },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Select>
                  {this.state.form.T_Empresa === "Sim" ? (
                    <>
                      <p>
                        Especifique detalhadamente qual a atividade, se existiam
                        sócios, quais os rendimentos mensais, qual a quantidade
                        de horas de trabalho por dia em média e qual o capital
                        social: No caso do negócio não mais existir, especificar
                        detalhadamente quais os motivos que ocasionaram o
                        encerramento, se na ocasião houve prejuízo ou lucro e se
                        houve a ocorrência de dívidas pendentes
                      </p>
                      <Textarea
                        style={{ fontSize: "1.20rem" }}
                        data-length={250}
                        onChange={(e) =>
                          this.setState({
                            form: {
                              ...this.state.form,
                              Detalhes_Atividade: e.target.value,
                            },
                          })
                        }
                        placeholder="Especifique..."
                      />
                    </>
                  ) : null}

                  <p>
                    Qual a sua formação escolar/acadêmica (especificar grau e
                    área se houver)?
                  </p>
                  <Textarea
                    style={{ fontSize: "1.20rem" }}
                    data-length={50}
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Form_Escolar: e.target.value,
                        },
                      })
                    }
                    placeholder="Especifique..."
                  />

                  <p>
                    De forma simplificada, nos conte sobre suas últimas
                    experiências profissionais.
                  </p>
                  <Textarea
                    style={{ fontSize: "1.20rem" }}
                    data-length={250}
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, Ult_exp: e.target.value },
                      })
                    }
                    placeholder="Especifique..."
                  />
                </div>
                <div style={divAlinha}>
                  <p>Haverá sociedade neste negócio?</p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: { ...this.state.form, Sociedade: e.target.value },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Select>

                  {this.state.form.Sociedade === "Sim" ? (
                    <>
                      <div style={divStyle}>
                        <TextInput
                          validate
                          style={{ fontSize: "1.20rem" }}
                          data-length={120}
                          onChange={(e) =>
                            this.setState({
                              form: {
                                ...this.state.form,
                                Nome_Socio: e.target.value,
                              },
                            })
                          }
                          label="Nome do sócio"
                        />
                        <TextInput
                          validate
                          style={{ fontSize: "1.20rem" }}
                          data-length={50}
                          onChange={(e) =>
                            this.setState({
                              form: {
                                ...this.state.form,
                                Socio_Vinculo: e.target.value,
                              },
                            })
                          }
                          label="Grau de parentesco ou vínculo"
                        />
                      </div>
                      <p>Há quanto tempo se conhecem?</p>
                      <TextInput
                        validate
                        style={{ fontSize: "1.20rem" }}
                        data-length={50}
                        onChange={(e) =>
                          this.setState({
                            form: {
                              ...this.state.form,
                              Tempo_ConheceSocio: e.target.value,
                            },
                          })
                        }
                        placeholder="Especifique..."
                      />
                      <p>O que já realizaram juntos?</p>
                      <Textarea
                        style={{ fontSize: "1.20rem" }}
                        data-length={250}
                        onChange={(e) =>
                          this.setState({
                            form: {
                              ...this.state.form,
                              Realizou_Socio: e.target.value,
                            },
                          })
                        }
                        placeholder="Especifique..."
                      />

                      <p>
                        Essa pessoa vai ser sócia no contrato de concessão da
                        franquia ou apenas vai participar no contrato da empresa
                        (pessoa jurídica) que vai operar a franquia? Especificar
                        em que condições e em qual proporção
                      </p>
                      <Textarea
                        style={{ fontSize: "1.20rem" }}
                        data-length={250}
                        onChange={(e) =>
                          this.setState({
                            form: {
                              ...this.state.form,
                              Cond_Socio: e.target.value,
                            },
                          })
                        }
                        placeholder="Especifique...   "
                      />
                      <p>
                        Havendo sociedada, essa pessoa participará do
                        investimento?
                      </p>
                      <Select
                        onChange={(e) =>
                          this.setState({
                            form: {
                              ...this.state.form,
                              Part_invest: e.target.value,
                            },
                          })
                        }
                      >
                        <option selected hidden disabled value={null}>
                          Selecione...
                        </option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                      </Select>
                      {this.state.form.Part_invest === "Sim" ? (
                        <>
                          <p>Em qual proporção?</p>
                          <TextInput
                            validate
                            style={{ fontSize: "1.20rem" }}
                            data-length={50}
                            onChange={(e) =>
                              this.setState({
                                form: {
                                  ...this.state.form,
                                  Prop_Invest: e.target.value,
                                },
                              })
                            }
                            placeholder="Especifique...   "
                          />
                        </>
                      ) : null}
                    </>
                  ) : null}

                  <p>
                    Você já teve algum empreendimento em sociedade com alguém?
                  </p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          T_Empreendimento: e.target.value,
                        },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Select>

                  {this.state.form.T_Empreendimento === "Sim" ? (
                    <>
                      <p>Como foi a experiência?</p>
                      <Textarea
                        style={{ fontSize: "1.20rem" }}
                        data-length={250}
                        onChange={(e) =>
                          this.setState({
                            form: {
                              ...this.state.form,
                              Exp_Sociedade: e.target.value,
                            },
                          })
                        }
                        placeholder="Especifique...   "
                      />
                    </>
                  ) : null}

                  <p>
                    Na fase inicial, eventualmente, faz-se necessária uma
                    cobertura dos custos fixos da franquia, por motivo do
                    negócio ainda não atingir uma maturidade suficiente. Nesse
                    caso, existe disponibilidade de capital para um eventual
                    investimento parcial mensal que complemente as despesas da
                    franquia?
                  </p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Cob_Desp: e.target.value,
                        },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Select>

                  <p>Como você conheceu a Pilão Professional?</p>
                  <Textarea
                    style={{ fontSize: "1.20rem" }}
                    data-length={250}
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Conhece_Pilao: e.target.value,
                        },
                      })
                    }
                    placeholder="Especifique..."
                  />

                  <p>
                    Seguindo a sua opinião pessoal, por favor, numere por ordem
                    de sua preferência, os motivos que o fizeram decidir pela
                    franquia Pilão Professional (colocando o número 01 para o
                    mais importante – primeiro - e respectivamente numerando até
                    o 11 para o menos importante - último). Leia todas as
                    alternativas antes de começar a responder
                  </p>
                  <div style={divStyle}>
                    <input
                      onChange={(e) => {
                        e.persist();
                        this.handleDefinePrioidade(
                          e.target.id,
                          e.target.value,
                          e
                        );
                      }}
                      id={0}
                      style={inputStyle}
                      placeholder={0}
                      maxLength={2}
                      type="text"
                    />
                    <label style={labels}>
                      Serviço de apoio prestado da franqueadora.
                    </label>
                  </div>
                  <div style={divStyle}>
                    <input
                      onChange={(e) => {
                        e.persist();
                        this.handleDefinePrioidade(
                          e.target.id,
                          e.target.value,
                          e
                        );
                      }}
                      id={1}
                      style={inputStyle}
                      placeholder={0}
                      maxLength={2}
                      type="text"
                    />
                    <label style={labels}>
                      Investimento. A equação financeira entre o quanto é
                      investido e o tempo que demora e haver o retorno desse
                      valor.
                    </label>
                  </div>
                  <div style={divStyle}>
                    <input
                      onChange={(e) => {
                        e.persist();
                        this.handleDefinePrioidade(
                          e.target.id,
                          e.target.value,
                          e
                        );
                      }}
                      id={2}
                      style={inputStyle}
                      placeholder={0}
                      maxLength={2}
                      type="text"
                    />
                    <label style={labels}>
                      Status. Reconhecimento social que ganhará tornando-se um
                      franqueado Pilão Professional.
                    </label>
                  </div>
                  <div style={divStyle}>
                    <input
                      onChange={(e) => {
                        e.persist();
                        this.handleDefinePrioidade(
                          e.target.id,
                          e.target.value,
                          e
                        );
                      }}
                      id={3}
                      style={inputStyle}
                      placeholder={0}
                      maxLength={2}
                      type="text"
                    />
                    <label style={labels}>Afinidade com a marca Pilão</label>
                  </div>
                  <div style={divStyle}>
                    <input
                      onChange={(e) => {
                        e.persist();
                        this.handleDefinePrioidade(
                          e.target.id,
                          e.target.value,
                          e
                        );
                      }}
                      id={4}
                      style={inputStyle}
                      placeholder={0}
                      maxLength={2}
                      type="text"
                    />
                    <label style={labels}>
                      Lucratividade. Quanto é o potencial de lucro mensal.
                    </label>
                  </div>
                  <div style={divStyle}>
                    <input
                      onChange={(e) => {
                        e.persist();
                        this.handleDefinePrioidade(
                          e.target.id,
                          e.target.value,
                          e
                        );
                      }}
                      id={5}
                      style={inputStyle}
                      placeholder={0}
                      maxLength={2}
                      type="text"
                    />
                    <label style={labels}>
                      Segurança e solidez. Garantidas pelos fatos de ser uma
                      empresa líder no segmento.
                    </label>
                  </div>
                  <div style={divStyle}>
                    <input
                      onChange={(e) => {
                        e.persist();
                        this.handleDefinePrioidade(
                          e.target.id,
                          e.target.value,
                          e
                        );
                      }}
                      id={6}
                      style={inputStyle}
                      placeholder={0}
                      maxLength={2}
                      type="text"
                    />
                    <label style={labels}>Afinidade com o produto café</label>
                  </div>
                  <div style={divStyle}>
                    <input
                      onChange={(e) => {
                        e.persist();
                        this.handleDefinePrioidade(
                          e.target.id,
                          e.target.value,
                          e
                        );
                      }}
                      id={7}
                      style={inputStyle}
                      placeholder={0}
                      maxLength={2}
                      type="text"
                    />
                    <label style={labels}>
                      Pelos conceitos, valores e cultura (transparência,
                      afetividade, seriedade, etc); percebidos durante o
                      processo de conhecimento da franquia.
                    </label>
                  </div>
                  <div style={divStyle}>
                    <input
                      onChange={(e) => {
                        e.persist();
                        this.handleDefinePrioidade(
                          e.target.id,
                          e.target.value,
                          e
                        );
                      }}
                      id={8}
                      style={inputStyle}
                      placeholder={0}
                      maxLength={2}
                      type="text"
                    />
                    <label style={labels}>
                      Força comercial da marca. Pelo tanto que a marca é
                      conhecida pelo consumidor, faz propagandas e terá
                      capacidade de gerar vendas nas unidades franqueadas.
                    </label>
                  </div>
                  <div style={divStyle}>
                    <input
                      onChange={(e) => {
                        e.persist();
                        this.handleDefinePrioidade(
                          e.target.id,
                          e.target.value,
                          e
                        );
                      }}
                      id={9}
                      style={inputStyle}
                      placeholder={0}
                      maxLength={2}
                      type="text"
                    />
                    <label style={labels}>
                      Indicação de um amigo ou conhecido.
                    </label>
                  </div>
                  <div style={divStyle}>
                    <input
                      onChange={(e) => {
                        e.persist();
                        this.handleDefinePrioidade(
                          e.target.id,
                          e.target.value,
                          e
                        );
                      }}
                      id={10}
                      style={inputStyle}
                      placeholder={0}
                      maxLength={2}
                      type="text"
                    />
                    <label style={labels}>
                      Referências positivas de franqueado(s) da rede Pilão
                      Professional
                    </label>
                  </div>

                  <p>
                    Qual foi a característica do negócio que mais pesou na
                    escolha da Pilão Professional?
                  </p>
                  <Textarea
                    style={{ fontSize: "1.20rem" }}
                    data-length={250}
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Caracteristica_Peso: e.target.value,
                        },
                      })
                    }
                    placeholder="Especifique...   "
                  />

                  <p>
                    Numa franquia, a padronização é algo muito importante.
                    Acrescenta-se ainda que a franqueadora tem sob sua
                    responsabilidade a organização da rede em geral, bem como o
                    cuidado com a manutenção da competitividade do negócio. Por
                    esse motivo, trata-se de uma relação pautada por muitas
                    regras, estabelecidas no dia a dia pela franqueadora, com
                    base nos objetivos descritos. Você está ciente disso e
                    disposto(a) a cumprir as regras estabelecidas pela
                    franqueadora.
                  </p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Com_Regra: e.target.value,
                        },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Select>

                  <p>
                    No que se refere ao lucro líquido que uma franquia pode
                    oferecer, por mês em média (ao final de um ano, o lucro
                    médio por mês), no total (no caso de existirem sócios, o
                    lucro total, não a parte de cada sócio), existem alguns
                    casos em que nos primeiros meses a média mensal fica sendo
                    inferior a R$500,00. Caso na sua franquia exista esse nível
                    de lucro, assim mesmo é possível para você iniciar o
                    negócio?
                  </p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Com_Med: e.target.value,
                        },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Select>

                  <p>
                    Devido à natureza da relação, rotineiramente a franquia deve
                    fornecer as mais diversas informações para a franqueadora.
                    Por exemplo, no que se refere aos resultados financeiros,
                    existe o acompanhamento do desempenho de todas as máquinas,
                    isso com o objetivo de planejar as políticas estratégicas da
                    rede como um todo, e também para detectar eventuais
                    problemas de gestão e potencial na unidade. São diversas
                    informações, sobre diversos campos do negócio. Você se
                    compromete a informar a franqueadora sobre o que for
                    solicitado, desde que pertinente ao negócio?
                  </p>
                  <Select
                    onChange={(e) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          Com_Inf: e.target.value,
                        },
                      })
                    }
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Select>
                </div>
              </div>

              {/* FIM DO FORMULÁRIO */}
              <div style={divAlinha}>
                <div style={divStyle}>
                  <p>Comprovante de disponibilidade do capital declarado</p>
                  <input
                    className="files"
                    type="file"
                    name="upload"
                    accept="application/pdf,image/png, image/jpeg"
                  />
                </div>
                <div style={divStyle}>
                  <p>
                    Cópias do CPF e RG de quem está apresentando o questionário
                  </p>
                  <input
                    className="files"
                    multiple
                    type="file"
                    name="upload"
                    accept="application/pdf,image/png, image/jpeg"
                  />
                </div>
                {this.state.form.Est_Civil < 4 &&
                this.state.form.Est_Civil !== null ? (
                  <div style={divStyle}>
                    <p>Cópias do CPF e RG do(a) cônjuge ou semelhante</p>
                    <input
                      className="files"
                      multiple
                      type="file"
                      name="upload"
                      accept="application/pdf,image/png, image/jpeg"
                    />
                  </div>
                ) : null}

                <div style={divStyle}>
                  <p>Cópia e da última declaração de imposto de renda</p>
                  <input
                    className="files"
                    type="file"
                    name="upload"
                    accept="application/pdf,image/png, image/jpeg"
                  />
                </div>
              </div>
              <Button
                onClick={(e) => {
                  e.persist();
                  this.handleSubmit(e);
                }}
              >
                enviar
              </Button>
            </div>
          ) : null}
        </Panel>
      </Container>
    );
  }
}

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
