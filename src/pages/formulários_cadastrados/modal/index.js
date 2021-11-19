import React from "react";

import { Toast } from "../../../components/toasty";

import { Button } from "react-materialize";

export default class Modalzinho extends React.Component {
  state = {
    form: {},
  };

  async componentDidMount() {
    //preencher vizualizado no sistema
    if(this.props.form){
      this.setState({ form: this.props.form });
    }
  }

  render() {
    return (
      <div className="YAlign">
        <div style={divAlinha}>
          <div style={divColuna}>
            <div style={divMetade}>
              <h5>Dados Pessoais</h5>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Nome Completo: {this.state.form.NomeCompleto}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Data de Nascimento: {this.state.form.DtNascimento}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>RG: {this.state.form.RG}</p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>CPF: {this.state.form.CPF}</p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Logradouro: {this.state.form.Logradouro}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>Número: {this.state.form.Número}</p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Complemento: {this.state.form.Complemento}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>Bairro: {this.state.form.Bairro}</p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>Município: {this.state.form.Municipio}</p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>Estado: {this.state.form.Estado}</p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>CEP: {this.state.form.CEP}</p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>Email: {this.state.form.Email}</p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Telefone Residencial: {this.state.form.TelResidencial}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>Celular: {this.state.form.Celular}</p>
              </div>
            </div>
            <div style={divMetade}>
              <h5>Rendimento e Experiencia</h5>
              <div style={divLinha}>
                <p style={pFontSize}>Vinculo CLT: {this.state.form.CLT}</p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Rendimento Mensal: {this.state.form.RendMensal}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Rec. de Imposto no Último ano: {this.state.form.PRecolhimento}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Valor do recolhimento: {this.state.form.QRecolhimento}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Origem do capital: {this.state.form.OrigemCapital}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Renda Familiar: {this.state.form.RendaFamiliar}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Composição da Renda Familiar: {this.state.form.CRendaFamiliar}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Total Disponivel para Investimento:{" "}
                  {this.state.form.DispInvest}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Tem/Teve empresa própria e experiência como autônomo:{" "}
                  {this.state.form.TEmpresaExp}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Detalhes da empresa: {this.state.form.EspcEmpresa}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Formação Escolar: {this.state.form.FormEscolar}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Últimas experiencias profissionais: {this.state.form.UltExp}
                </p>
              </div>
            </div>

            <div style={divMetade}>
              <h5>Franquia</h5>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Expectativa de retorno: {this.state.form.ExpectRetorno}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Existe disponibilidade de capital para um eventual
                  investimento parcial mensal que complemente as despesas da
                  franquia: {this.state.form.InvestMenInic}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Como conheceu a Pilão Professional:{" "}
                  {this.state.form.ConhecPilao}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Qual característica do negócio mais pesou na escolha da Pilão
                  Professional: {this.state.form.CaracEscolha}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Está disposto(a) a cumprir as regras estabelecidas pela
                  franqueadora: {this.state.form.ConcRegras}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Está preparado para os primeiros meses com baixa média de
                  retorno: {this.state.form.LucroMin}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Se compromete a informar a franqueadora sobre o que for
                  solicitado: {this.state.form.CompInformar}
                </p>
              </div>
            </div>
          </div>

          <div style={divColuna}>
            <div style={divMetade}>
              <h5>Estado civil e Familia</h5>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Estado Civil: {this.state.form.EstCivil}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Nome Conjuge: {this.state.form.NomeConj}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Data de Nascimento: {this.state.form.DtNascConj}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>CPF: {this.state.form.CPFConj}</p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>RG: {this.state.form.RGConj}</p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Tempo de União: {this.state.form.TempoUni}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Rendimento Mensal: {this.state.form.RendMenConj}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Possui Filhos: {this.state.form.PFilhos}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Número de Filhos: {this.state.form.QFilhos}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Idade(s) do(s) filho(s): {this.state.form.IFilhos}
                </p>
              </div>
            </div>
            <div style={divMetade}>
              <h5>Sócio</h5>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Haverá Sociedade: {this.state.form.HavSociedade}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Nome do Sócio: {this.state.form.NomeSocio}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Tipo de Vinculo com Sócio: {this.state.form.VincSocio}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  A quanto tempo se conhecem: {this.state.form.TempConhece}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  O que já realizaram juntos: {this.state.form.Realizacoes}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>Tipo de Sócio: {this.state.form.TSocio}</p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Sócio participará do investimento:{" "}
                  {this.state.form.SocioInvest}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Proporção de participação: {this.state.form.InvestProp}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Já teve empreendimento em sociedade:{" "}
                  {this.state.form.TeveSociedade}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Como foi a experiencia: {this.state.form.SociedadeExp}
                </p>
              </div>
            </div>
            <div style={divMetade}>
              <h5>Bens</h5>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Residencia: {this.state.form.TResidencia}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Custo mensal: {this.state.form.ValResidencia}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Possui Veículo: {this.state.form.PVeiculo}
                </p>
              </div>
              <div style={divLinha}>
                <p style={pFontSize}>
                  Possui Imóvel: {this.state.form.PImovel}
                </p>
              </div>
            </div>
            <div style={divMetade}>
              <h5>Arquivos</h5>
              <Button disabled>Baixar documentos</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const pFontSize = {
  fontSize: "1.20em",
  marginTop: "0px",
};

const divLinha = {
  display: "flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
};

const divAlinha = {
  display: "flex",
  flex: 1,
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const divMetade = {
  display: "flex",
  width: "100%",
  padding: "1vw",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  border: "1px solid #c1c1c1",
};

const divColuna = {
  display: "flex",
  width: "50%",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignContent: "flex-start",
};
