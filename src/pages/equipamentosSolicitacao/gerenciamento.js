import React from "react";
import { saveAs } from "file-saver";
import { api } from "../../services/api";

import FindInPage from "@material-ui/icons/FindInPage";
import Typography from "@material-ui/core/Typography";

import Loading from "../../components/loading_screen";
import { Toast } from "../../components/toasty";
import { Panel } from "../../components/commom_in";
import Button from "../../components/materialComponents/Button";
import { Table } from "../../components/table";
import { convertData, dateCheck } from "../../misc/commom_functions";
import AdmDialog from "./modals/admDialog";
import HistDialog from "./modals/historyDialog";
import { RED_SECONDARY } from "../../misc/colors";

export default class Management extends React.Component {
  state = {
    OSS: [],
    loaded: false,
    switch: false,
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
      Toast("Falha na comunicação", "error");
    }
  }

  async handleRetrivePDF(OSID) {
    let toastId = null

    try {
      toastId = Toast('Buscando...', 'wait')

      const response = await api.get("/equip/requests/retrive", {
        params: {
          token: sessionStorage.getItem("token"),
          OSID,
        },
        responseType: "arraybuffer",
      });

      Toast('Encontrado!', 'update', toastId, 'success')
      //Converto a String do PDF para BLOB (Necessario pra salvar em pdf)
      const blob = new Blob([response.data], { type: "application/pdf" });

      //Salvo em PDF junto com a data atual, só pra não sobreescrever nada
      saveAs(blob, `OS_${dateCheck()}.pdf`);
    } catch (err) {
      Toast('Falha ao recuperar PDF do servidor', 'update', toastId, 'error')
    }
  }

  showStatus(OS) {
    if (OS === null) return;

    if (OS.OSCComAceite === false || OS.OSCTecAceite === false) {
      return "Supervisão";
    } else if (OS.OSCComAceite === null && OS.OSCStatus === "Ativo") {
      return "Comercial";
    } else if (OS.OSCTecAceite === null && OS.OSCStatus === "Ativo") {
      return "Técnica";
    } else if (OS.OSCExpDtPrevisao === null && OS.OSCStatus === "Ativo") {
      return "Transporte";
    } else if (OS.OSCExpDtPrevisao !== null && OS.OSCStatus === "Ativo") {
      return "Entrega";
    } else if (OS.OSCStatus === "Cancelado") {
      return "Nenhuma";
    } else if (OS.OSCStatus === "Concluido") {
      return "Nenhuma";
    } else {
      return "Desconhecido";
    }
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Panel style={{ justifyContent: "flex-start", alignItems: "center" }}>
        <Typography variant="h5" gutterBottom>
          Solicitações
        </Typography>
        <Table width={100} height={100} hoverable={true} responsive={true} centered>
          <thead>
            <th>Solicitação</th>
            <th>Filial</th>
            <th>Status</th>
            <th>Pendência</th>
            <th>Data de solicitação</th>
            <th>Data pretendida</th>
            <th>Previsão Tec.</th>
            <th>Previsão Exp.</th>
            <th>Gerenciar</th>
            <th>Histórico</th>
            <th>PDF</th>
          </thead>
          <tbody>
            {this.state.OSS.filter((Sol) => Sol.OSCStatus !== null).map(
              (OS) => (
                <tr style={{ borderLeft: `10px solid ${borderColor(OS.OSCStatus)}` }}>
                  <td align="center">{OS.OSCId}</td>
                  <td align="center">{OS.M0_CODFIL}</td>
                  <td align="center">{OS.OSCStatus}</td>
                  <td align="center">{this.showStatus(OS)}</td>
                  <td align="center">{convertData(OS.OSCDtSolicita)}</td>
                  <td align="center">{convertData(OS.OSCDtPretendida)}</td>
                  <td align="center"> {OS.OSCTecDtPrevisao !== "" ? convertData(OS.OSCTecDtPrevisao) : "NA"} </td>
                  <td align="center"> {OS.OSCExpDtPrevisao !== "" ? convertData(OS.OSCExpDtPrevisao) : "NA"} </td>
                  <td align="center"> <AdmDialog Req={OS} /> </td>
                  <td> <HistDialog Req={OS} /> </td>
                  <td> <Button style={{ color: "#FFFFFF", backgroundColor: RED_SECONDARY, }} onClick={() => this.handleRetrivePDF(OS.OSCId)} > <FindInPage /> </Button> </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Panel>
    );
  }
}


const borderColor = (status) => {
  switch (status) {
    case 'Cancelado':
      return '#f5814c';

    case 'Ativo':
      return '#4f9eff';

    case 'Concluido':
      return '#29ff8d';
    default:
      return '#8403fc'
  }
}