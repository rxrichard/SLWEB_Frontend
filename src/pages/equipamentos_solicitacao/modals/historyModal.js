import React from "react";

import Loading from "../../../components/loading_screen";
import { Campo } from "../../../components/commom_in";
import { Toast } from "../../../components/toasty";
import { convertData } from "../../../components/commom_functions";

export default class AdmModal extends React.Component {
  state = {
    OS: null,
    loaded: false,
  };

  async componentDidMount() {
    //preencher vizualizado no sistema
    try {
      if (typeof this.props.LOGS == "undefined" || this.props.LOGS === null)
        throw Error;
      this.setState({ OS: this.props.LOGS, loaded: true });
    } catch (err) {
      Toast("Falha ao linkar dados da OS", "error");
    }
  }

  convertData(data) {
    if (data === "NA" || data === null || typeof data == "undefined") {
      return "NA";
    }

    let DtSolicita = String(data);

    const dataA = DtSolicita.split("T");
    const dataB = dataA[0].replace(/-/g, "/");
    return dataB
      .split("/")
      .reverse()
      .join("/")
      .concat(" ")
      .concat(DtSolicita.split("T")[1].split(".")[0])
      .concat(" ");
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <>
        <Campo>
          <label style={{ all: "unset" }}>
            {this.convertData(this.state.OS.OSCDtSolicita)}
            <strong>Solicitação feita pelo franqueado</strong>
          </label>

          {this.state.OS.OSCComDtValidação !== null ? (
            <label style={{ all: "unset" }}>
              {this.convertData(this.state.OS.OSCComDtValidação)}
              <strong>Validação pelo departamento comercial</strong>
            </label>
          ) : null}

          {this.state.OS.OSCComMotivo !== null ? (
            <label style={{ all: "unset" }}>
              <strong>
                Motivo da rejeição da Solicitação: {this.state.OS.OSCComMotivo}
              </strong>
            </label>
          ) : null}

          {this.state.OS.OSCTecDtValidação !== null ? (
            <label style={{ all: "unset" }}>
              {this.convertData(this.state.OS.OSCTecDtValidação)}
              <strong>Validação pela Técnica</strong>
            </label>
          ) : null}

          {this.state.OS.OSCTecDtPrevisao !== null ? (
            <label style={{ all: "unset" }}>
              <strong>
                Data estimada para finalizar montagem:{" "}
                {convertData(this.state.OS.OSCTecDtPrevisao)}
              </strong>
            </label>
          ) : null}

          {this.state.OS.OSCTecMotivo !== null ? (
            <label style={{ all: "unset" }}>
              <strong>
                Motivo da rejeição da Solicitação: {this.state.OS.OSCTecMotivo}
              </strong>
            </label>
          ) : null}

          {this.state.OS.OSCExpDtPrevisao !== null ? (
            <label style={{ all: "unset" }}>
              <strong>Data de entrega foi prevista para: </strong>
              {this.convertData(this.state.OS.OSCExpDtPrevisao)}
            </label>
          ) : null}

          {this.state.OS.OSCDtAceite !== null &&
          this.state.OS.OSCStatus === "Concluido" ? (
            <label style={{ all: "unset" }}>
              {this.convertData(this.state.OS.OSCDtAceite)}
              <strong>Franqueado confirmou ter recebido a máquina</strong>
            </label>
          ) : null}
          {this.state.OS.OSCDtAceite !== null &&
          this.state.OS.OSCStatus === "Cancelado" ? (
            <label style={{ all: "unset" }}>
              {this.convertData(this.state.OS.OSCDtAceite)}
              <strong>Franqueado cancelou a requisição</strong>
            </label>
          ) : null}
        </Campo>
      </>
    );
  }
}
