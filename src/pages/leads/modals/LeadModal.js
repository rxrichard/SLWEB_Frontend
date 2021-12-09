import React, { useState, useEffect } from 'react';
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Draggable from 'react-draggable';
import { api } from "../../../services/api";

import { ContactPhone } from "@material-ui/icons";
import {
  Typography,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Button as DefaultButton
} from "@material-ui/core/";

import { Toast } from "../../../components/toasty";
import Button from "../../../components/materialComponents/Button";
import { RED_SECONDARY, GREY_SECONDARY } from "../../../misc/colors";
import Input from "../../../components/materialComponents/InputMultline";
import { AddLimite, MoveLinha } from "../../../global/actions/LeadAction";

const LeadModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  const [history, setHistory] = useState(null);
  const [motivo, setMotivo] = useState("");

  const { AddLimite, MoveLinha } = props;

  const handleClickOpenModal = () => {
    RequestHistory(props.lead.Id)
    setOpen(true);
  };

  const handleCloseModal = () => {
    setHistory(null)
    setOpen(false);
  };

  useEffect(() => {
    if (typeof props.lead.update !== "undefined" && props.lead.update === 'holded') {
      handleClickOpenModal()
    }

    if (typeof props.lead.update !== "undefined" && props.lead.update === 'released') {
      handleCloseModal()
    }
    // eslint-disable-next-line
  }, [])

  const RequestHistory = async (leadid) => {
    try {
      const response = await api.get(`/leads/${leadid}`);

      setHistory(response.data);
    } catch (err) {

    }
  };

  const handleManageLead = async (id, index, type) => {
    if (type === "release" && motivo.trim() === "") {
      Toast("Informe o motivo da desistência", 'warn');
      return;
    }

    let toastId = null

    try {
      toastId = Toast("Aguarde...", 'wait');
      setFetching(true);
      const response = await api
        .put("/leads", {
          ID: id,
          type: type,
          motivo: motivo,
        })

      let aux = props.lead;

      if (type === "release") {
        aux = Object.assign(aux, { update: 'released' });
        Toast('Voce desistiu do Lead com sucesso!', 'update', toastId, 'success');
      } else {
        //junto os dados do endereço que recebo após vincular o lead e incluo uma variavel "update" para controle
        aux = Object.assign(aux, response.data[0], { update: 'holded' });

        //disparo actions pra mover o lead de Geral para Franqueado e ajustar o total de leads que o cara já assumiu
        MoveLinha(aux);
        AddLimite();
        Toast('Voce reinvidicou o Lead com sucesso!', 'update', toastId, 'success');
      }

      setFetching(false);
      handleCloseModal();
    } catch (err) {
      Toast('Falha ao remanejar o Lead', 'update', toastId, 'error');
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

  return (
    <>
      <DefaultButton
        variant="outlined"
        color="primary"
        onClick={handleClickOpenModal}
        disabled={
          desistiu(props.lead)
        }
        startIcon={<ContactPhone />}
      >
        {
          desistiu(props.lead)
            ? "Desistiu"
            : shouldShowAdress(props.lead)
              ? "Contato Lead"
              : "Quero esse Lead"
        }
      </DefaultButton>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: 'move' }}
          id="draggable-dialog-title"
        >
          Contato Lead
        </DialogTitle>

        <DialogContent>
          {shouldShowAdress(props.lead) ? (
            <>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Nome Fantasia: </strong>
                {props.lead.Nome_Fantasia}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Razão Social: </strong>
                {props.lead.Razao_Social}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Contato: </strong>
                {props.lead.Contato}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>
                  {props.lead.Municipio} - {props.lead.Estado}
                </strong>
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <strong>Fone 1: </strong>
                {props.lead.Fone_1}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <strong>Fone 2: </strong>
                {props.lead.Fone_2}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <strong>Email: </strong>
                {props.lead.Email}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <strong>Atividade / Descrição: </strong>
                {props.lead.AtividadeDesc}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <strong>Mensagem do cliente: </strong>
                {props.lead.Mensagem}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <strong>Atividade/Ramo: </strong>
                {props.lead.AtividadeDesc}
              </Typography>

              <br />

              {/* <Typography variant="subtitle1" gutterBottom>
                Lead assumido{" "}
                <strong>
                  {returnTime(props.lead, false, Limites[0].MaxHoras)}
                </strong>
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                Você tem até{" "}
                <strong>{returnTime(props.lead, true, Limites[0].MaxHoras)}</strong>{" "}
                para fechar com o cliente ou desistir do Lead
              </Typography> */}

              {showHistory(history)}

              <Input
                style={{ width: "100%" }}
                label="Motivo da desistência"
                onChange={(e) => setMotivo(e.target.value)}
                value={motivo}
              />
            </>
          ) : (
            <>
              <Typography variant="body1" gutterBottom>
                Você ainda não tem acesso ao contato desse lead.
              </Typography>
              <div style={{ marginTop: "8px" }}>
                {props.lead.Mensagem !== null && String(props.lead.Mensagem).trim() !== '' ? (
                  <Typography variant="subtitle1" gutterBottom>
                    Mensagem do cliente: <strong>{props.lead.Mensagem}</strong>{" "}
                  </Typography>
                ) : (
                  null
                )}
                {showHistory(history)}
              </div>
            </>
          )}
        </DialogContent>

        <DialogActions style={{ padding: '8px 24px' }}>
          <>
            {/* {shouldShowAdress(props.lead) ? (
              <Button
                style={{
                  backgroundColor: RED_SECONDARY,
                  color: "#FFFFFF",
                }}
                onClick={(e) => {
                  handleConfirmDeal(e, props.lead.Id);
                }}
              >
                Negociando
              </Button>
            ) : (
              ""
            )} */}
            <Button
              style={{
                backgroundColor: shouldShowAdress(props.lead)
                  ? GREY_SECONDARY
                  : RED_SECONDARY,
                color: "#FFFFFF",
              }}
              onClick={(e) => {
                e.target.disabled = true;
                handleManageLead(
                  props.lead.Id,
                  props.index,
                  shouldShowAdress(props.lead) ? "release" : "hold"
                );
              }}
              disabled={fetching}
            >
              {shouldShowAdress(props.lead) ? "Desistir" : "Solicitar"}
            </Button>
            <DefaultButton
              onClick={handleCloseModal}
              color="primary"
            >
              Fechar
            </DefaultButton>
          </>
        </DialogActions>
      </Dialog>
    </>
  )
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      AddLimite,
      MoveLinha,
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(LeadModal);


const desistiu = (dados) => {
  if ((typeof dados.update !== "undefined" && dados.update === 'released') || (dados.Ativo === false && dados.DataFechamento !== null)) {
    return true;
  } else {
    return false
  }
};

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
        Desistências: <strong>Buscando...</strong>
      </Typography>
    </div>
  ) : (
    <div style={{ marginTop: "8px" }}>
      <Typography variant="subtitle1">
        Desistências: <strong>{history.length}</strong>
      </Typography>
      <Divider />

      {history.map((item, i) => (
        <div
          className="YAlign"
          style={{
            marginBottom: "8px",
            borderBottom: "1px dashed #CCC"
          }}
        >
          <Typography variant="subtitle1">
            <strong>{i + 1}ª desistência:</strong>
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ paddingLeft: "16px" }}
          >
            <strong>Data:</strong> {moment(item.DataFechamento).format("LL")}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ paddingLeft: "16px" }}
          >
            <strong>Motivo:</strong> "{item.Motivo}"
          </Typography>
        </div>
      ))}
    </div>
  );
};

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

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
