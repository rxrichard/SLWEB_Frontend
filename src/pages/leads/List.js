import React, { useState, useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { AddLimite, MoveLinha } from "../../global/actions/LeadAction";
import { api } from "../../services/api";

import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import Typography from "@material-ui/core/Typography";
import ContactPhone from "@material-ui/icons/ContactPhone";
import Divider from "@material-ui/core/Divider";

import Dialog from "../../components/materialComponents/Dialog";
import Button from "../../components/materialComponents/Button";
import { RED_SECONDARY, GREY_SECONDARY } from "../../misc/colors";
import { Toast } from "../../components/toasty";
import Input from "../../components/materialComponents/InputMultline";

function CustomizedAccordions(props) {
  const [leads, setLeads] = useState([]);
  const [motivo, setMotivo] = useState("");
  const [history, setHistory] = useState(null);

  const { AddLimite, MoveLinha } = props;
  // const { Limites } = props.State;

  useEffect(() => {
    if (typeof props.Leads != "undefined") {
      setLeads(props.Leads);
    }
  }, [props.Leads]);

  const handleRequestAdress = async (id, index, type) => {
    if (type === "release" && motivo.trim() === "") {
      Toast("Informe o motivo da desistencia", 'warn');
      return;
    }

    try {
      const response = await api
        .put("/leads", {
          ID: id,
          type: type,
          motivo: motivo,
        })

      const aux = [...leads];

      if (type === "release") {
        aux[index] = Object.assign(aux[index], { close: true });
      } else {
        aux[index] = Object.assign(aux[index], response.data[0]);
        aux[index] = Object.assign(aux[index], { close: false });
        MoveLinha(aux[index]);
        aux.splice(index, 1);
        AddLimite();
      }

      setLeads(aux);
    } catch (err) {
    }
  };

  // const handleConfirmDeal = async (err, leadId) => {
  //   try {
  //     const response = await api
  //       .put("/leads", {
  //         ID: leadId,
  //         type: "confirm",
  //         motivo: motivo,
  //       })
  //       .catch ((err) => {
  //         throw new Error(err.response.status);
  //       });
  //   } catch (err) {
  //     Toast("Falha ao confirmar negociação", "error");
  //   }
  // };

  const handleRequestHistory = async (leadid) => {
    try {
      const response = await api.get(`/leads/${leadid}`);

      setHistory(response.data);
    } catch (err) {

    }
  };

  return (
    <div style={{ width: "100%" }}>
      {leads.map((le, i) => (
        <Accordion
          square
          key={le.Id}
          style={{ borderBottom: "1px solid #CCCCCC" }}
        >
          <div
            className="XAlign"
            style={{
              justifyContent: "space-between",
              padding: "8px 0px 8px 0px",
            }}
          >
            <div>
              <Typography variant="subtitle2" gutterBottom>
                <strong>{moment(le.Insercao).fromNow(false)}</strong>
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {mountString(le)}
              </Typography>
            </div>
            <Dialog
              disabled={shouldClose(le)}
              shouldClose={shouldClose(le)}
              onOpen={() => handleRequestHistory(le.Id)}
              onClose={() => setHistory(null)}
              icone={<ContactPhone />}
              botao={
                shouldClose(le)
                  ? "Desistiu"
                  : shouldShowAdress(le)
                    ? "Contato Lead"
                    : "Quero esse Lead"
              }
              title="Contato Lead"
              action={
                <>
                  {/* {shouldShowAdress(le) ? (
                    <Button
                      style={{
                        backgroundColor: RED_SECONDARY,
                        color: "#FFFFFF",
                      }}
                      onClick={(e) => {
                        handleConfirmDeal(e, le.Id);
                      }}
                    >
                      Negociando
                    </Button>
                  ) : (
                    ""
                  )} */}
                  <Button
                    style={{
                      backgroundColor: shouldShowAdress(le)
                        ? GREY_SECONDARY
                        : RED_SECONDARY,
                      color: "#FFFFFF",
                    }}
                    onClick={(e) => {
                      e.target.disabled = true;
                      handleRequestAdress(
                        le.Id,
                        i,
                        shouldShowAdress(le) ? "release" : "hold"
                      );
                    }}
                  >
                    {shouldShowAdress(le) ? "Desistir" : "Solicitar"}
                  </Button>
                </>
              }
            >
              {shouldShowAdress(le) ? (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Nome Fantasia: </strong>
                    {le.Nome_Fantasia}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Razão Social: </strong>
                    {le.Razao_Social}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Contato: </strong>
                    {le.Contato}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>
                      {le.Municipio} - {le.Estado}
                    </strong>
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Fone 1: </strong>
                    {le.Fone_1}
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Fone 2: </strong>
                    {le.Fone_2}
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Email: </strong>
                    {le.Email}
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Atividade / Descrição: </strong>
                    {le.AtividadeDesc}
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Mensagem do cliente: </strong>
                    {le.Mensagem}
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Atividade/Ramo: </strong>
                    {le.AtividadeDesc}
                  </Typography>

                  <br />

                  {/* <Typography variant="subtitle1" gutterBottom>
                    Lead assumido{" "}
                    <strong>
                      {returnTime(le, false, Limites[0].MaxHoras)}
                    </strong>
                  </Typography>

                  {/* <Typography variant="subtitle1" gutterBottom>
                    Você tem até{" "}
                    <strong>{returnTime(le, true, Limites[0].MaxHoras)}</strong>{" "}
                    para fechar com o cliente ou desistir do Lead
                  </Typography> */}

                  <Input
                    style={{ width: "100%" }}
                    label="Motivo da desistência"
                    onChange={(e) => setMotivo(e.target.value)}
                    value={motivo}
                  />
                  {showHistory(history)}
                </>
              ) : (
                <>
                  Você ainda não tem acesso ao contato desse lead.
                  <div style={{ marginTop: "8px" }}>
                    {le.Mensagem !== null ? (
                      <Typography variant="subtitle1" gutterBottom>
                        Mensagem do cliente:
                        <strong>{le.Mensagem}</strong>{" "}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {showHistory(history)}
                  </div>
                </>
              )}
            </Dialog>
          </div>

          {/* <AccordionDetails>
            <div className="YAlign">
              <Typography>
                Razão Social: <strong>{le.Razao_Social.trim()}</strong>
              </Typography>
              <Typography>
                Atividade/Descrição:{" "}
                <strong>
                  {`${
                    le.AtividadeDesc !== null
                      ? le.AtividadeDesc
                      : "Não Informado"
                  }`.trim()}
                </strong>
              </Typography>
            </div>
          </AccordionDetails> */}
        </Accordion>
      ))}
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      AddLimite,
      MoveLinha,
    },
    dispatch
  );

const mapStateToProps = (store) => ({
  State: store.leadsState,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizedAccordions);

const shouldShowAdress = (lead) => {
  if (
    typeof lead.Contato != "undefined" &&
    typeof lead.Fone_1 != "undefined" &&
    typeof lead.Fone_2 != "undefined" &&
    typeof lead.Email != "undefined"
  ) {
    return true;
  } else {
    return false;
  }
};

const showHistory = (history) => {
  return history === null ? (
    <div style={{ marginTop: "8px" }}>
      <Typography variant="subtitle1">
        Desistencias: <strong>-</strong>
      </Typography>
    </div>
  ) : (
    <div style={{ marginTop: "8px" }}>
      <Typography variant="subtitle1">
        Desistencias: <strong>{history.length}</strong>
      </Typography>

      {history.map((item, i) => (
        <div className="YAlign" style={{ marginBottom: "8px" }}>
          <Typography variant="subtitle1">
            <strong>{i + 1}ª</strong> Desistencia:{" "}
            <strong>{moment(item.DataFechamento).format("LL")}</strong>
          </Typography>
          <Typography variant="subtitle1">
            Motivo: "<strong>{item.Motivo}</strong>"
          </Typography>
          <Divider />
        </div>
      ))}
    </div>
  );
};

const mountString = (dados) => {
  let variavel = ``;

  if (dados.Nome_Fantasia !== "") {
    variavel += dados.Nome_Fantasia;
  } else {
    variavel += "???";
  }

  if (dados.Municipio !== "") {
    variavel += `, ${dados.Municipio}`;
  } else {
    variavel += ", ???";
  }

  if (dados.Estado !== "") {
    variavel += ` - ${dados.Estado}`;
  } else {
    variavel += " - ???";
  }

  if (dados.AtividadeDesc !== "" && dados.AtividadeDesc !== null) {
    variavel += `, ${dados.AtividadeDesc}`;
  }

  return variavel;
};

/*Essa previsao ta pulando dias caso caia em um sabado ou domingo 
mas se "passar por cima" de um ele não considera, 
como o Alberto pediu pra desativar os vencimentos, 
vou parar de mecher nisso por agora(03/09)*/
// const returnTime = (dados, addtime, max) => {
//   moment.locale("pt-br");
//   let inicial = null;
//   let final = null;

//   //Esse trecho vai ativar quando a o lead tiver sido assumido pelo site e eu for mostrar uma data pro cara sem precisar do retorno da API
//   if (typeof dados.DataHora == "undefined" && !addtime) {
//     inicial = moment();
//   } else if (typeof dados.DataHora == "undefined" && addtime) {
//     final = moment().add(max, "hours");
//     if (final.isoWeekday() === 6) {
//       final.add(2, 'days')
//     } else if (final.isoWeekday() === 7) {
//       final.add(1, 'days')
//     }
//   }

//   //Esse trecho vai executar quando o lead assumido veio do backend, junto com uma data de inclusão
//   if (typeof dados.DataHora != "undefined" && !addtime) {
//     inicial = moment(dados.DataHora).utc();
//   } else if (typeof dados.DataHora != "undefined" && addtime) {
//     final = moment(dados.DataHora).add(max, "hours").utc();
//     if (final.isoWeekday() === 6) {
//       final.add(2, 'days')
//     } else if (final.isoWeekday() === 7) {
//       final.add(1, 'days')
//     }
//   }

//   return addtime ? final.format("LLLL") : inicial.format("LLLL")
// };

const shouldClose = (dados) => {
  if (typeof dados.close != "undefined") {
    return dados.close;
  }

  if (dados.Ativo === false && dados.DataFechamento !== null) {
    return true;
  }
};

const Accordion = withStyles({
  root: {
    paddingBottom: "8px",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);
