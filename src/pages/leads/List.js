import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/pt-br";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  AddLimite,
  SubLimite,
  MoveLinha,
} from "../../global/actions/LeadAction";
import { api } from "../../services/api";

import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ContactPhone from "@material-ui/icons/ContactPhone";

import Dialog from "../../components/materialComponents/Dialog";
import Button from "../../components/materialComponents/Button";
import { RED_SECONDARY, GREY_SECONDARY } from "../../components/colors";
import { Toast } from "../../components/toasty";
import Input from '../../components/materialComponents/InputMultline'

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

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    flexDirection: "row",
  },
}))(MuiAccordionDetails);

function CustomizedAccordions(props) {
  const [leads, setLeads] = useState([]);
  const [motivo, setMotivo] = useState('');

  const { AddLimite, SubLimite, MoveLinha } = props;
  const { Limites } = props.State;

  useEffect(() => {
    if (typeof props.Leads != "undefined") {
      setLeads(props.Leads);
    }
  }, [props.Leads]);

  const handleRequestAdress = async (id, index, type) => {

    if(type === 'release' && motivo.trim() === ''){

      Toast("Informe o motivo da desistencia");
      return
    }
    
    try {
      const response = await api
      .put("/leads", {
        ID: id,
        type: type,
        motivo: motivo
        })
        .catch((err) => {
          if (err.response.status === 401) {
            throw new Error(401);
          } else if (err.response.status === 409) {
            throw new Error(409);
          }
          throw err;
        });

      const aux = [...leads];

      if (type === "release") {
        aux[index] = Object.assign(aux[index], { close: true });
        SubLimite();
      } else {
        aux[index] = Object.assign(aux[index], response.data[0]);
        aux[index] = Object.assign(aux[index], { close: false });
        MoveLinha(aux[index]);
        aux.splice(index, 1);
        AddLimite();
      }

      setLeads(aux);
    } catch (err) {
      if (err.message == 401) {
        Toast("Limite de leads atingido", "error");
      } else if (err.message == 409) {
        Toast("Lead assumido por outro franqueado", "error");
      } else {
        Toast("Não foi possivel recuperar o endereço do lead", "error");
      }
      return;
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {leads.map((le, i) => (
        <Accordion square key={le.Id} id={le.Id}>
          <div className="XAlign" style={{ justifyContent: "space-between" }}>
            <Typography variant="subtitle1" gutterBottom>
              {mountString(le)}
            </Typography>
            <Dialog
              disabled={le.close}
              shoulClose={le.close}
              icone={<ContactPhone />}
              botao={
                le.close
                  ? "Desistiu"
                  : shouldShowAdress(le)
                  ? "Contato Lead"
                  : "Quero esse Lead"
              }
              title="Contato Lead"
              action={
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
              }
            >
              {shouldShowAdress(le) ? (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Contato: </strong>
                    {le.Contato}
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

                  <br />

                  <Typography variant="subtitle1" gutterBottom>
                    Lead assumido{" "}
                    <strong>
                      {returnTime(le, false, Limites[0].MaxHoras)}
                    </strong>
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>
                    Você tem até{" "}
                    <strong>{returnTime(le, true, Limites[0].MaxHoras)}</strong>{" "}
                    para fechar com o cliente ou desistir do Lead
                  </Typography>

                  <Input style={{ width: '100%' }} label='Motivo da desistência' onChange={e => setMotivo(e.target.value)}/>
                </>
              ) : (
                "Você ainda não tem acesso ao contato desse lead"
              )}
            </Dialog>
          </div>

          <AccordionDetails>
            <div className="YAlign">
              <Typography>{le.Razao_Social.trim()}</Typography>
              <Typography>
                Atividade/Descrição: {` ${le.AtividadeDesc}`.trim()}
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      AddLimite,
      SubLimite,
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

const mountString = (dados) => {
  let variavel = "";

  if (dados.Nome_Fantasia !== "") {
    variavel += dados.Nome_Fantasia;
  }
  if (dados.Estado !== "") {
    variavel += `, ${dados.Municipio}`;
  }
  if (dados.Municipio !== "") {
    variavel += ` - ${dados.Estado}`;
  }
  if (dados.AtividadeDesc !== "") {
    variavel += `, ${dados.AtividadeDesc}`;
  }

  return variavel;
};

const returnTime = (dados, addtime, max) => {
  moment.locale("pt-br");
  let final = null;

  if (typeof dados.DataHora == "undefined" && !addtime) {
    return moment().format("LLLL");
  } else if (typeof dados.DataHora == "undefined" && addtime) {
    return moment().add(max, "hours").format("LLLL");
  }

  if (addtime) {
    final = moment(dados.DataHora).add(max, "hours").utc().format("LLLL");
    return final;
  } else {
    final = moment(dados.DataHora).utc().format("LLLL");
    return final;
  }
};
