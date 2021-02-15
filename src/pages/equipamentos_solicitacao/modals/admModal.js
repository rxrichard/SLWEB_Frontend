import React from "react";
import { saveAs } from "file-saver";
import { api } from "../../../services/api";

import { Toast } from "../../../components/toasty";
import {
  REQUISICAO_DE_MAQUINA_WARNING,
  FAILED_UPDATE,
} from "../../../components/messages";
import {
  Checkbox,
  Button,
  TextInput,
  Icon,
  DatePicker,
} from "react-materialize";
import { CancelButton, ConfirmButton } from "../../../components/buttons";
import { dateCheck, convertData } from "../../../components/commom_functions";

export default class AdmModal extends React.Component {
  state = {
    OS: null,
    readed: false,
    RejectReason: "",
    previsao: null,
    validacao: 0,
  };

  async componentDidMount() {
    //preencher vizualizado no sistema
    try {
      this.setState({ OS: this.props.LOGS });
      setTimeout(() => this.setValidState(this.state.OS), 1000);
    } catch (err) {
      Toast("Falha ao linkar dados da OS", "error");
    }
  }

  async handleSUDO(action, OSID) {
    try {
      api.put("/equip/requests/admin", {
        token: sessionStorage.getItem("token"),
        action,
        OSID,
      });
    } catch (err) {
      Toast(FAILED_UPDATE, "error");
    }
  }

  //Função que cancela a OS
  async handleCancel(OSID) {
    if (this.state.OS.OSCStatus === "Cancelado") {
      Toast(
        "A solicitação já foi fechada, não é possivel gerenciá-la",
        "error"
      );
      return;
    }

    if (this.state.OS.OSCStatus === "Concluido") {
      Toast("Não é possivel cancelar uma solicitação já concluída", "error");
      return;
    }

    try {
      const response = await api.delete("/equip", {
        params: {
          token: sessionStorage.getItem("token"),
          ID: OSID,
        },
      });

      if (response.status === 201) {
        Toast("Solicitação cancelada com sucesso", "success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        throw Error;
      }
    } catch (err) {
      Toast("Falha ao cancelar a solicitação", "error");
    }
  }

  //Função que envia as atualizações do Comercial, Tecnica e Expedição pro backend
  async handleUpdateOS(status) {
    if (this.state.OS.OSCStatus === "Cancelado") {
      Toast(
        "A solicitação já foi fechada, não é possivel gerenciá-la",
        "error"
      );
      return;
    }

    if (this.state.OS.OSCStatus === "Concluido") {
      Toast("Não é possivel cancelar uma solicitação já concluída", "error");
      return;
    }

    try {
      if (status === "OK") {
        const response = await api.put("/equip/requests/validate", {
          token: sessionStorage.getItem("token"),
          OSID: this.state.OS.OSCId,
          action: "accept",
          reject: this.state.RejectReason,
          prev: this.state.previsao,
        });

        if (response.data === 200) {
          Toast("Status atualizado com sucesso", "success");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          throw Error;
        }
      }
      if (status === "NOTOK") {
        const response = await api.put("/equip/requests/validate", {
          token: sessionStorage.getItem("token"),
          OSID: this.state.OS.OSCId,
          action: "reject",
          reject: this.state.RejectReason,
          prev: this.state.previsao,
        });

        if (response.data === 200) {
          Toast("Status atualizado com sucesso", "success");
        } else {
          throw Error;
        }
      }
    } catch (err) {
      Toast("Falha ao atualizar status da Ordem de serviço", "error");
    }
  }

  //Função que baixa o PDF da OS
  async handleRetrivePDF(OSID) {
    console.log(OSID)
    try {
      const response = await api.get("/equip/requests/retrive", {
        params: {
          OSID
        },
        responseType: "arraybuffer",
      });

      //Converto a String do PDF para BLOB (Necessario pra salvar em pdf)
      const blob = new Blob([response.data], { type: "application/pdf" });

      //Salvo em PDF junto com a data atual, só pra não sobreescrever nada
      saveAs(blob, `OS_${new Date().toLocaleString()}.pdf`);
    } catch (err) {
      Toast("Falha ao recuperar PDF do servidor", "error");
    }
  }

  //Função que verifica qual o status da OS
  showStatus() {
    if (this.state.OS === null) return;

    if (
      this.state.OS.OSCTecAceite === null &&
      this.state.OS.OSCStatus === "Ativo"
    ) {
      return "Aguardando validação Técnica";
    } else if (
      this.state.OS.OSCComAceite === null &&
      this.state.OS.OSCStatus === "Ativo"
    ) {
      return "Aguardando validação comercial";
    } else if (
      this.state.OS.OSCExpDtPrevisao === null &&
      this.state.OS.OSCStatus === "Ativo"
    ) {
      return "Aguardando previsão de transporte";
    } else if (this.state.OS.OSCStatus === "Cancelado") {
      return "Solicitação fechada.";
    } else if (this.state.OS.OSCStatus === "Concluido") {
      return "Solicitação entregue.";
    } else {
      return "Solicitação aprovada.";
    }
  }

  //Função que verifica qual estagio a OS está
  setValidState(OS) {
    if (OS === null) return;

    if (OS.OSCTecAceite === null) {
      this.setState({ validacao: 1 });
    } else if (OS.OSCComAceite === null) {
      this.setState({ validacao: 2 });
    } else if (OS.OSCExpDtPrevisao === null) {
      this.setState({ validacao: 3 });
    } else if (OS.OSCStatus !== "Ativo") {
      this.setState({ validacao: 0 });
    } else {
      this.setState({ validacao: 4 });
    }
  }

  //Tela do fraqueado
  Franqueado = (validacao) => {
    if (validacao <= 3) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
          }}
        >
          <p>Status: {this.showStatus()}</p>
          <div className="XAlign" style={{ justifyContent: "flex-start" }}>
            <Button
              tooltip="Baixar PDF"
              tooltipOptions={{
                position: "right",
              }}
              style={{ marginRight: "1%" }}
              onClick={() => this.handleRetrivePDF(this.state.OS.OSCId)}
            >
              Inspecionar OS
              <Icon left>find_in_page</Icon>
            </Button>

            <Checkbox
              id="checkbox"
              indeterminate
              label="Habilitar controle"
              onChange={(e) => {
                this.setState({ readed: e.target.checked });
              }}
            />
          </div>
          <div className="YAlign">
            <ConfirmButton
              onClick={(e) => {
                this.handleUpdateOS("OK");
                e.target.disabled = true;
              }}
              
              disabled={
                this.state.readed && this.state.OS.OSCStaus !== "Cancelado"
                  ? false
                  : true
              }
            >
              Confirmar Recebimento
            </ConfirmButton>

            <CancelButton
              tooltip={REQUISICAO_DE_MAQUINA_WARNING}
              className="col l2 offset-l1 offset-s4 s4"
              onClick={(e) => {
                this.handleCancel(this.state.OS.OSCId);
                e.target.disabled = true;
              }}
              disabled={
                this.state.readed && this.state.OS.OSCStaus !== "Cancelado"
                  ? false
                  : true
              }
            >
              Cancelar OS
            </CancelButton>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
          }}
        >
          <p>Status: {this.showStatus()}</p>

          <p>
            O dia previsto para entrega é:{" "}
            {convertData(this.state.OS.OSCExpDtPrevisao)}
          </p>

          <div className="XAlign" style={{ justifyContent: "flex-start" }}>
            <Button
              tooltip="Baixar PDF"
              style={{ marginRight: "1%" }}
              onClick={() => this.handleRetrivePDF(this.state.OS.OSCId)}
            >
              Inspecionar OS
              <Icon left>find_in_page</Icon>
            </Button>
          </div>
        </div>
      );
    }
  };

  //Tela dos administradores
  Sistema = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
      }}
    >
      <p>Status: {this.showStatus()}</p>
      <div className="XAlign" style={{ justifyContent: "flex-start" }}>
        <Button
          tooltip="Baixar PDF"
          tooltipOptions={{
            position: "top",
          }}
          style={{ marginRight: "1%" }}
          onClick={() => this.handleRetrivePDF(this.state.OS.OSCId)}
        >
          Inspecionar OS
          <Icon left>find_in_page</Icon>
        </Button>
        <Checkbox
          id="checkbox"
          indeterminate
          label="Confirmo ter ciência dos dados contidos na OS"
          onChange={(e) => {
            this.setState({ readed: e.target.checked });
          }}
        />
      </div>
      <div className="XAlign" style={{ justifyContent: "space-evenly" }}>
        <Button
          onClick={(e) => {
            this.handleSUDO("Cancelar", this.state.OS.OSCId);
            e.target.disabled = true;
          }}
          tooltip="Atribui status cancelado à OS"
          tooltipOptions={{
            position: "top",
          }}
          disabled={!this.state.readed}
        >
          Cancelar ordem
        </Button>

        <Button
          onClick={(e) => {
            this.handleSUDO("RT", this.state.OS.OSCId);
            e.target.disabled = true;
          }}
          tooltip="Remove a verificação e a previsão da Técnica da Bianchi"
          tooltipOptions={{
            position: "top",
          }}
          disabled={!this.state.readed}
        >
          Remover Técnica
        </Button>

        <Button
          onClick={(e) => {
            this.handleSUDO("RC", this.state.OS.OSCId);
            e.target.disabled = true;
          }}
          tooltip="Remove a verificação do Comercial"
          tooltipOptions={{
            position: "top",
          }}
          disabled={!this.state.readed}
        >
          Remover Comercial
        </Button>

        <Button
          onClick={(e) => {
            this.handleSUDO("RE", this.state.OS.OSCId);
            e.target.disabled = true;
          }}
          tooltip="Remove a verificação e a previsão da Expedição"
          tooltipOptions={{
            position: "top",
          }}
          disabled={!this.state.readed}
        >
          Remover Expedição
        </Button>
      </div>
    </div>
  );

  //Tela dos tecnicos de máquina
  TecBianchi = (validacao) => {
    if (validacao === 1) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
          }}
        >
          <p>Status: {this.showStatus()}</p>

          <div className="XAlign" style={{ justifyContent: "flex-start" }}>
            <Button
              style={{ marginRight: "1%" }}
              onClick={() => this.handleRetrivePDF(this.state.OS.OSCId)}
            >
              Inspecionar OS
            </Button>

            <Checkbox
              id="checkbox"
              indeterminate
              label="Confirmo ter ciência dos dados contidos na OS"
              onChange={(e) => {
                this.setState({ readed: e.target.checked });
              }}
            />
          </div>

          <div
            className="XAlign"
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-end",
            }}
          >
            <Button
              style={{ marginTop: "3%", marginRight: "1%" }}
              disabled={
                this.state.readed &&
                this.state.RejectReason.length < 1 &&
                this.state.previsao !== null &&
                this.state.previsao !== ""
                  ? false
                  : true
              }
              onClick={() => {
                this.handleUpdateOS("OK");
              }}
            >
              Aceitar OS
              <Icon left>check</Icon>
            </Button>

            <DatePicker
              disabled={!this.state.readed}
              placeholder="Data prevista"
              style={{
                all: "unset",
                borderBottom: "1px solid #CCCCCC",
                margin: "0px",
                padding: "0px",
              }}
              options={{
                autoClose: true,
                container: "body",
                defaultDate: null,
                disableDayFn: null,
                disableWeekends: true,
                events: [],
                firstDay: 0,
                format: "mmm dd, yyyy",
                i18n: {
                  cancel: "Cancelar",
                  clear: "Limpar",
                  done: "Confirmar",
                  months: [
                    "Janeiro",
                    "Fevereiro",
                    "Março",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Agosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro",
                  ],
                  monthsShort: [
                    "Jan",
                    "Fev",
                    "Mar",
                    "Abr",
                    "Mai",
                    "Jun",
                    "Jul",
                    "Ago",
                    "Set",
                    "Out",
                    "Nov",
                    "Dez",
                  ],
                  nextMonth: "›",
                  previousMonth: "‹",
                  weekdays: [
                    "Domingo",
                    "Segunda",
                    "Terça",
                    "Quarta",
                    "Quinta",
                    "Sexta",
                    "Sábado",
                  ],
                  weekdaysAbbrev: ["D", "S", "T", "Q", "Q", "S", "S"],
                  weekdaysShort: [
                    "Dom",
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "Sab",
                  ],
                },
                isRTL: false,
                maxDate: null,
                minDate: new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate() + 7
                ),
                onClose: null,
                onDraw: null,
                onOpen: null,
                onSelect: (data) => {
                  this.setState({
                    previsao: data,
                  });
                },
                parse: null,
                setDefaultDate: false,
                showClearBtn: false,
                showDaysInNextAndPreviousMonths: false,
                showMonthAfterYear: false,
                yearRange: 1,
              }}
            />

            <label>
              / Data esperada: {convertData(this.state.OS.OSCDtPretendida)}
            </label>
          </div>

          <div
            className="XAlign"
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-end",
            }}
          >
            <Button
              disabled={
                this.state.readed && this.state.RejectReason.length > 0
                  ? false
                  : true
              }
              onClick={() => {
                this.handleUpdateOS("NOTOK");
              }}
            >
              Rejeitar OS
              <Icon left>close</Icon>
            </Button>

            <TextInput
              disabled={this.state.readed ? false : true}
              onChange={(e) => {
                this.setState({ RejectReason: e.target.value });
              }}
              style={{ marginLeft: "5%" }}
              placeholder="Motivo"
            />
          </div>
        </div>
      );
    } else {
      return (
        <>
          <p>Status: {this.showStatus()}</p>
          <h5>Você não pode gerenciar essa ordem.</h5>
          <p>
            Ela pode estar no processo de aprovação de um departamento anterior
            ao seu, ou o seu departamento já fez a aprovação/rejeição desta
            ordem.
          </p>
        </>
      );
    }
  };

  //Tela do comercial
  Backoffice = (validacao) => {
    if (validacao === 2) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
          }}
        >
          <p>Status: {this.showStatus()}</p>
          <div className="XAlign" style={{ justifyContent: "flex-start" }}>
            <Button
              style={{ marginRight: "1%" }}
              onClick={() => this.handleRetrivePDF(this.state.OS.OSCId)}
            >
              Inspecionar OS
            </Button>

            <Checkbox
              id="checkbox"
              indeterminate
              label="Confirmo ter ciência dos dados contidos na OS"
              onChange={(e) => {
                this.setState({ readed: e.target.checked });
              }}
            />
          </div>

          <Button
            style={{ marginTop: "3%" }}
            disabled={
              this.state.readed && this.state.RejectReason.length < 1
                ? false
                : true
            }
            onClick={() => {
              this.handleUpdateOS("OK");
            }}
          >
            Aceitar OS
            <Icon left>check</Icon>
          </Button>

          <div
            style={{
              justifyContent: "flex-start",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <Button
              disabled={
                this.state.readed && this.state.RejectReason.length > 0
                  ? false
                  : true
              }
              onClick={() => {
                this.handleUpdateOS("NOTOK");
              }}
            >
              Rejeitar OS
              <Icon left>close</Icon>
            </Button>
            <TextInput
              disabled={this.state.readed ? false : true}
              onChange={(e) => {
                this.setState({ RejectReason: e.target.value });
              }}
              style={{ marginLeft: "5%" }}
              placeholder="Motivo"
            />
          </div>
        </div>
      );
    } else {
      return (
        <>
          <p>Status: {this.showStatus()}</p>
          <h5>Você não pode gerenciar essa ordem.</h5>
          <p>
            Ela pode estar no processo de aprovação de um departamento anterior
            ao seu, ou o seu departamento já fez a aprovação/rejeição desta
            ordem.
          </p>
        </>
      );
    }
  };

  //Tela da expedição
  TecPilao = (validacao) => {
    if (validacao === 3) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
          }}
        >
          <p>Status: {this.showStatus()}</p>

          <div className="XAlign" style={{ justifyContent: "flex-start" }}>
            <Button
              style={{ marginRight: "1%" }}
              onClick={() => this.handleRetrivePDF(this.state.OS.OSCId)}
            >
              Inspecionar OS
            </Button>

            <Checkbox
              id="checkbox"
              indeterminate
              label="Confirmo ter ciência dos dados contidos na OS"
              onChange={(e) => {
                this.setState({ readed: e.target.checked });
              }}
            />
          </div>

          <div
            className="XAlign"
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-end",
            }}
          >
            <Button
              style={{ marginTop: "3%", marginRight: "1%" }}
              disabled={
                this.state.readed && this.state.previsao !== null ? false : true
              }
              onClick={() => {
                this.handleUpdateOS("OK");
              }}
            >
              Confirmar prazo
              <Icon left>check</Icon>
            </Button>

            <DatePicker
              disabled={!this.state.readed}
              placeholder="Data prevista"
              style={{
                all: "unset",
                borderBottom: "1px solid #CCCCCC",
              }}
              options={{
                autoClose: true,
                container: "body",
                defaultDate: null,
                disableDayFn: null,
                disableWeekends: true,
                events: [],
                firstDay: 0,
                format: "mmm dd, yyyy",
                i18n: {
                  cancel: "Cancelar",
                  clear: "Limpar",
                  done: "Confirmar",
                  months: [
                    "Janeiro",
                    "Fevereiro",
                    "Março",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Agosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro",
                  ],
                  monthsShort: [
                    "Jan",
                    "Fev",
                    "Mar",
                    "Abr",
                    "Mai",
                    "Jun",
                    "Jul",
                    "Ago",
                    "Set",
                    "Out",
                    "Nov",
                    "Dez",
                  ],
                  nextMonth: "›",
                  previousMonth: "‹",
                  weekdays: [
                    "Domingo",
                    "Segunda",
                    "Terça",
                    "Quarta",
                    "Quinta",
                    "Sexta",
                    "Sábado",
                  ],
                  weekdaysAbbrev: ["D", "S", "T", "Q", "Q", "S", "S"],
                  weekdaysShort: [
                    "Dom",
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "Sab",
                  ],
                },
                isRTL: false,
                maxDate: null,
                minDate: new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate() + 7
                ),
                onClose: null,
                onDraw: null,
                onOpen: null,
                onSelect: (data) => {
                  this.setState({
                    previsao: data,
                  });
                },
                parse: null,
                setDefaultDate: false,
                showClearBtn: false,
                showDaysInNextAndPreviousMonths: false,
                showMonthAfterYear: false,
                yearRange: 1,
              }}
            />

            <label>
              {" "}
              / Data esperada: {convertData(this.state.OS.OSCDtPretendida)}
            </label>
            <label>
              {" "}
              / Data Bianchi: {convertData(this.state.OS.OSCTecDtPrevisao)}
            </label>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <p>Status: {this.showStatus()}</p>
          <h5>Você não pode gerenciar essa ordem.</h5>
          <p>
            Ela pode estar no processo de aprovação de um departamento anterior
            ao seu, ou o seu departamento já fez a aprovação/rejeição desta
            ordem.
          </p>
        </>
      );
    }
  };

  //Função que decide qual tela será mostrada
  showControlls(role) {
    switch (role) {
      case "Franquia":
        return this.Franqueado(this.state.validacao);
      case "Sistema":
        return this.Sistema(this.state.validacao);

      case "BackOffice":
        return this.Backoffice(this.state.validacao);

      case "Técnica Pilão":
        return this.TecPilao(this.state.validacao);

      case "Técnica Bianchi":
        return this.TecBianchi(this.state.validacao);

      default:
        return (
          <p>Não foi possivel definir qual tipo de administrador é você</p>
        );
    }
  }

  render() {
    return this.showControlls(sessionStorage.getItem("role"));
  }
}
