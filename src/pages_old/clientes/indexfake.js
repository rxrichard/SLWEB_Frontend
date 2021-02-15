import React , { Component }from "react";
import {Datatable} from "@o2xp/react-datatable";
import { api } from "../../services/api";
import { Toast } from "../../components/toasty";
import Loading from "../../components/loading_screen";

import { Panel } from "../../components/commom_in";
import { ToastContainer } from "react-toastify";
import "../../style/cad.css";

let options  = {
  keyColumn: 'Nome',
  data: {
      columns: [ 
          {
              id: "id",
              label: "id",
              colSize: "80px"
          },
          {
              id: "name",
              label: "name",
              colSize: "150px"
          },
          {
              id: "age",
              label: "age",
              colSize: "50px"
          },
      ],
      rows: [
          {
              id: "50cf",
              age: 28,
              name: "Kerr Mayo"
          },
          {
              id: "209",
              age: 34,
              name: "Freda Bowman"
          },
          {
              id: "2dd81ef",
              age: 14,
              name: "Becky Lawrence"
          }
      ],
  }
}

class Cliente extends React.Component {
  state = {
    usuarios: [],
    headerInfo: {},
    displayed: 0,
    loaded: false,
    newUser: {},
    update: {
      Razão_Social: "",
      Nome_Fantasia: "",
      CNPJss: "",
      CNPJ: "",
      IE: "",
      Contato_Empresa: "",
      Email: "",
      TPessoa: "",
      DtSolicita: "",
      DtCadastro: "",
      Logradouro: "",
      Número: "",
      Complemento: "",
      CEP: "",
      Fone: "",
      Município: "",
      UF: "",
      Bairro: ""
    }
  };

  async componentDidMount() {
    try {
      const token = await localStorage.getItem("token");
      const clientes = await api.post("/client/", {
        token: token
      });
      this.setState({ usuarios: clientes.data });
      this.setState({ loaded: true });
      this.switchCliente(0);
    } catch (err) {
      localStorage.clear();
      window.location.assign("/");
    }
  }

  converterData(data) {
    if (data === "NA" || data === null) {
      return "NA";
    }

    let DtSolicita = String(data);

    const dataA = DtSolicita.split("T");
    const dataB = dataA[0].replace(/-/g, "/");
    return dataB
      .split("/")
      .reverse()
      .join("/");
  }

  async switchCliente(num) {
    this.setState({ displayed: num });
    this.setState({ update: this.state.usuarios[num] });

    const inputs = document.querySelectorAll("input");
    let i;
    for (i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }

    try {
      const response = await api.get("/client/", {
        params: {
          CNPJ: this.state.usuarios[num].CNPJ,
          token: localStorage.getItem("token")
        }
      });
      this.setState({ headerInfo: response.data });
    } catch (err) {
      Toast("Erro ao estabelecer conexão com o servidor", "error");
    }
  }

  async Update() {
    try {
      const token = localStorage.getItem("token");
      const cliente = this.state.update;

      await api.put("/client/update", {
        token,
        cliente
      });
      Toast("Dados do cliente atualizados com sucesso", "success");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (err) {
      Toast("Falha ao atualizar dados do cliente", "error");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }

  render() {
    return !this.state.loaded ? 
      <Loading />
    ) : (
      <>
      
        <ToastContainer />
        <Panel>
        <Datatable options={Cliente} />
        </Panel>
      </>
    );
  }
}

export default Cliente;
