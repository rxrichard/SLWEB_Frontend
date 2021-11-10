import React from "react";

import { api } from "../../../services/api";

import { Textarea } from "react-materialize";

export default class ConfigEmissao extends React.Component {
  state = {
    Destinatarios: "",
  };

  handleChooseModel(value) {
    const Dest = document.getElementById("Destinatários");
    const Switch = document.getElementById("chave");
    Switch.checked = false;
    Dest.disabled = true;
    Dest.value = "";

    try {
      const response = api.get(`/emails/recipients/${value}`);

    
    } catch (err) {
      
    }
  }

  handleEnableCustomRecipients(value) {
    const Dest = document.getElementById("Destinatários");

    Dest.disabled = !value;
    Dest.placeholder = "ex1@gmail.com; ex2@gmail.com;...";
    Dest.value = "";
  }

  render() {
    return (
      <div className="YAlign">
        <div style={divAlinha}>
          <div style={divColuna}>
            <div style={divMetade}>
              <h5>Modelo de email</h5>
              <select
                className="DefaultSelect"
                onChange={(e) => this.handleChooseModel(e.target.value)}
              >
                <option selected disabled hidden value={null}>
                  Selecione...
                </option>
                {this.props.modelos.map((modelo) => (
                  <option key={modelo.id} value={modelo.id}>
                    {modelo.model}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={divColuna}>
            <div style={divMetade}>
              <div style={divLinha}>
                <Textarea
                  id="Destinatários"
                  disabled
                  defaultValue={this.state.Destinatarios}
                />
                <input
                  id="chave"
                  type="checkbox"
                  onChange={(e) =>
                    this.handleEnableCustomRecipients(e.target.checked)
                  }
                />
                Destinatário manual
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const divAlinha = {
  display: "flex",
  flex: 1,
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const divMetade = {
  display: "flex",
  width: "100%",
  padding: "1vw",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  border: "1px solid #c1c1c1",
};

const divColuna = {
  display: "flex",
  width: "50%",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignContent: "flex-start",
};

const divLinha = {
  display: "flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
};
