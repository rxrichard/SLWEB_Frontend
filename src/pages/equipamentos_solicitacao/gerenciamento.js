import React from "react";
import { saveAs } from "file-saver";
import { api } from "../../services/api";

import Loading from "../../components/loading_screen";
import { Toast, ToastyContainer } from "../../components/toasty";
import { Panel, Container } from "../../components/commom_in";
import { Modal, Button, Icon } from "react-materialize";
import { Table } from "../../components/table";
import { CloseButton, GoBack } from "../../components/buttons";
import { convertData, dateCheck } from "../../components/commom_functions";
import AdmModal from "./modals/admModal";
import HistModal from "./modals/historyModal";

export default class Management extends React.Component {
  state = {
    OSS: [],
    loaded: false,
  };

  async componentDidMount() {
    try {
      const response = await api.get("/equip/requests/all");

      if (response.status === 200) {
        this.setState({ OSS: response.data, loaded: true });
      } else {
        throw Error;
      }
    } catch (err) {
      Toast("Falha trazer todas as Requisições", "error");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  async handleRetrivePDF(OSID) {
    try {
      const response = await api.get("/equip/requests/retrive", {
        params: {
          token: sessionStorage.getItem("token"),
          OSID,
        },
        responseType: "arraybuffer",
      });

      //Converto a String do PDF para BLOB (Necessario pra salvar em pdf)
      const blob = new Blob([response.data], { type: "application/pdf" });

      //Salvo em PDF junto com a data atual, só pra não sobreescrever nada
      saveAs(blob, `OS_${dateCheck()}.pdf`);
    } catch (err) {
      Toast("Falha ao recuperar PDF do servidor", "error");
    }
  }

  showStatus(OS) {
    if (OS === null) return;

    if (OS.OSCComAceite === null && OS.OSCStatus === "Ativo") {
      return "Comercial";
    } else if (OS.OSCTecAceite === null && OS.OSCStatus === "Ativo") {
      return "Técnica";
    } else if (OS.OSCExpDtPrevisao === null && OS.OSCStatus === "Ativo") {
      return "Transporte";
    } else if (OS.OSCStatus === "Cancelado") {
      return "Nenhuma";
    }
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Container>
        <Panel style={{ justifyContent: "flex-start" }}>
          <ToastyContainer />
          <Table hoverable={true} responsive={true}>
            <thead>
              <th>Solicitação Nº</th>
              <th>Status</th>
              <th>Pendencia</th>
              <th>Data de solicitação</th>
              <th>Data pretendida</th>
              <th>Data estimada</th>
              <th>Gerenciar</th>
              <th>Histórico</th>
              <th>PDF</th>
            </thead>
            <tbody>
              {this.state.OSS.map((OS, i) => (
                <tr>
                  <td align="center">{OS.OSCId}</td>
                  <td align="center">{OS.OSCStatus}</td>
                  <td align="center">{this.showStatus(OS)}</td>
                  <td align="center">{convertData(OS.OSCDtSolicita)}</td>
                  <td align="center">{convertData(OS.OSCDtPretendida)}</td>
                  <td align="center">
                    {OS.OSCExpDtPrevisao !== ""
                      ? convertData(OS.OSCExpDtPrevisao)
                      : "NA"}
                  </td>
                  <td align="center">
                    <Button
                      style={{ marginBottom: "0px" }}
                      className="modal-trigger"
                      href={`#modal${i}`}
                      node="button"
                    >
                      <Icon>settings</Icon>
                    </Button>
                    <Modal
                      actions={[<CloseButton />]}
                      bottomSheet={false}
                      fixedFooter={false}
                      header="Gerenciamento de solicitação"
                      id={`modal${i}`}
                      open={false}
                      options={{
                        dismissible: true,
                        endingTop: "10%",
                        inDuration: 250,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        opacity: 0.5,
                        outDuration: 250,
                        preventScrolling: true,
                        startingTop: "4%",
                      }}
                    >
                      <AdmModal LOGS={OS} />
                    </Modal>
                  </td>
                  <td>
                    <Button
                      style={{ marginBottom: "0px" }}
                      className="modal-trigger"
                      href={`#modal-hist${i}`}
                      node="button"
                    >
                      <Icon>history</Icon>
                    </Button>
                    <Modal
                      actions={[<CloseButton />]}
                      bottomSheet={false}
                      fixedFooter={false}
                      header="Histórico de gerenciamento"
                      id={`modal-hist${i}`}
                      open={false}
                      options={{
                        dismissible: true,
                        endingTop: "10%",
                        inDuration: 250,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        opacity: 0.5,
                        outDuration: 250,
                        preventScrolling: true,
                        startingTop: "4%",
                      }}
                    >
                      <HistModal />
                    </Modal>
                  </td>
                  <td>
                    <Button
                      tooltip="Baixar PDF"
                      tooltipOptions={{
                        position: "right",
                      }}
                      onClick={() => this.handleRetrivePDF(OS.OSCId)}
                    >
                      <Icon>find_in_page</Icon>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>
        <GoBack />
      </Container>
    );
  }
}
