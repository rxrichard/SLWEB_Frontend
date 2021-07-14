import React from "react";
import { saveAs } from "file-saver";
import { api } from "../../services/api";

import Loading from "../../components/loading_screen";
import { Toast } from "../../components/toasty";
import { Panel, Container } from "../../components/commom_in";
import { Button, Icon } from "react-materialize";
import { Table } from "../../components/table";
import { GoBack } from "../../components/buttons";
import { convertData, dateCheck } from "../../components/commom_functions";
import AdmModal from "./modals/admModal";
import HistModal from "./modals/historyModal";
import Modal from "../../components/modal";

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
        window.location.assign("/");
      }, 3000);
    }
  }

  async checkView(ID) {
    try {
      //Insere a data de vizualização da ordem por X departamento
      await api.put("/equip/requests/check", {
        ID,
      });
    } catch (err) {}
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
          <Table hoverable={true} responsive={true} centered>
            <thead>
              <th>Solicitação Nº</th>
              <th>GrpVen</th>
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
                  <td align="center">{OS.GrpVen}</td>
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
                    <Modal
                      header="Gerenciamento de solicitação"
                      trigger={
                        <Button style={{ marginBottom: "0px" }}>
                          <Icon>settings</Icon>
                        </Button>
                      }
                    >
                      <AdmModal LOGS={OS} />
                    </Modal>
                  </td>
                  <td>
                    <Modal
                      header="Histórico de gerenciamento"
                      trigger={
                        <Button style={{ marginBottom: "0px" }}>
                          <Icon>history</Icon>
                        </Button>
                      }
                    >
                      <HistModal LOGS={OS} />
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
