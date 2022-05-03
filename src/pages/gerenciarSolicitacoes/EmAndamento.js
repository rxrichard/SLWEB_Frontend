import React from 'react';

import FindInPage from "@material-ui/icons/FindInPage";

import { Table } from "../../components/table";
import Button from "../../components/materialComponents/Button";
import { convertData } from "../../misc/commom_functions";
import { RED_SECONDARY } from "../../misc/colors";

import AdmDialog from "./modals/admDialog";
import HistDialog from "./modals/historyDialog";

const emAndamento = (props) => {
  return (
    <Table
      width={100}
      height={50}
      hoverable={true}
      responsive={false}
      centered
    >
      <thead>
        <tr>
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
        </tr>
      </thead>
      
      <tbody>
        {props.OS.map(
          (OS) => (
            <tr style={{ borderLeft: `10px solid ${borderColor(OS.OSCStatus)}` }}>
              <td align="center">{OS.OSCId}</td>
              <td align="center">{OS.M0_CODFIL}</td>
              <td align="center">{OS.OSCStatus}</td>
              <td align="center"><strong>{showStatus(OS)}</strong></td>
              <td align="center">{convertData(OS.OSCDtSolicita)}</td>
              <td align="center">{convertData(OS.OSCDtPretendida)}</td>
              <td align="center"> {OS.OSCTecDtPrevisao !== "" ? convertData(OS.OSCTecDtPrevisao) : "NA"} </td>
              <td align="center"> {OS.OSCExpDtPrevisao !== "" ? convertData(OS.OSCExpDtPrevisao) : "NA"} </td>
              <td align="center"> <AdmDialog Req={OS} /> </td>
              <td> <HistDialog Req={OS} /> </td>
              <td> <Button style={{ color: "#FFFFFF", backgroundColor: RED_SECONDARY, }} onClick={() => props.onRequestPDF(OS.OSCId)} > <FindInPage /> </Button> </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  )
}

export default emAndamento;

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

const showStatus = (OS) => {
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