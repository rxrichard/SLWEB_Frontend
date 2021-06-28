import React from "react";
import { api } from "../../services/api";
import { saveAs } from "file-saver";

import Loading from "../../components/loading_screen";
import { Button, Icon } from "react-materialize";
import { Table } from "../../components/table";
import { ToastyContainer, Toast } from "../../components/toasty";
import { dateCheck, convertData } from "../../components/commom_functions";
import AdmModal from "./modals/admModal";
import Modal from "../../components/modal";
import TextField from "@material-ui/core/TextField";

export default class Logs extends React.Component {
  state = {
    logs: [],
    loaded: false,
  };

  async componentDidMount() {
    try {
      const response = await api.get("/equip/requests");

      this.setState({ logs: response.data, loaded: true });
    } catch (err) {
      // window.location.assign('/')
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

  async checkView(ID) {
    try {
      //Insere a data de vizualização da ordem por X departamento
      await api.put("/equip/requests/check", {
        ID,
      });
    } catch (err) {
      Toast("Falha ao linkar dados da OS", "error");
    }
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : this.state.logs.length > 0 ? ( //Se nao tiver nenhum log, nem mostra a estrutura da tabela
      <Table centered hoverable>
        <ToastyContainer />
        <thead>
          <tr>
            <th>Solicitação Nº</th>
            <th>Status</th>
            <th>Data de solicitação</th>
            <th>Data pretendida</th>
            <th>Data estimada</th>
            <th>Destino</th>
            <th>Gerenciar</th>
            <th>PDF</th>
          </tr>
        </thead>
        {this.state.logs.map((log, i) => (
          <tr>
            <td align="center">{log.OSCId}</td>
            <td align="center">{log.OSCStatus}</td>
            <td align="center">{convertData(log.OSCDtSolicita)}</td>
            <td align="center">{convertData(log.OSCDtPretendida)}</td>
            <td align="center">
              {log.OSCExpDtPrevisao !== ""
                ? convertData(log.OSCExpDtPrevisao)
                : ""}
            </td>
            <td align="center" style={{ padding: "0" }}>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                rowsMax={1}
                value={log.OSCDestino}
                onChange={(e) => (e.target.value = log.OSCDestino)}
                variant="standard"
              />
            </td>
            <td align="center" style={{ padding: "0", textAlign: "center" }}>
              {this.state.loaded ? (
                <>
                  
                  <Modal
                    header="Gerenciamento de solicitação"
                    onOpenStart={() => this.checkView(this.state.logs[i].OSCId)}
                    trigger={<Button
                      style={{ margin: "0", textAlign: "center" }}
                      tooltip="Gerenciamento da Requisição"
                      tooltipOptions={{
                        position: "top",
                      }}
                    >
                      <Icon>settings</Icon>
                    </Button>}
                  >
                    <AdmModal LOGS={this.state.logs[i]} />
                  </Modal>
                </>
              ) : null}
            </td>
            <td align="center" style={{ padding: "0", textAlign: "center" }}>
              <Button
                style={{ margin: "0" }}
                tooltip="Baixar PDF"
                tooltipOptions={{
                  position: "right",
                }}
                onClick={() => this.handleRetrivePDF(this.state.logs[i].OSCId)}
              >
                <Icon>find_in_page</Icon>
              </Button>
            </td>
          </tr>
        ))}
      </Table>
    ) : (
      <div style={{ display: 'flex',  justifyContent: 'center', alignContent: 'center'}}>

        <h5>Você ainda não fez nenhuma solicitação!</h5>
      </div>
    );
  }
}
