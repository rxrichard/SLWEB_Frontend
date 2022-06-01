import React, { Component } from "react";
import { api } from "../../services/api";

export default class autoLogin extends Component {
  async componentDidMount() {
    sessionStorage.clear();

    const code = this.props.match.params.code
    const target = this.props.match.params.target

    this.login(code, target);
  }

  async login(code, targetWindow) {
    try {
      const response = await api.post("/checkAuth", {
        code
      });

      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem('role', response.data.role);
        sessionStorage.setItem("filial_logada", response.data.nome !== '');
        sessionStorage.setItem("usuário", response.data.nome);

        this.redirectWindow(targetWindow);
      } else {
        sessionStorage.clear();
        window.location.assign("/");
      }
    } catch (err) {
      window.location.assign("/");
    }
  }

  async redirectWindow(target) {
    switch (target) {
      case 'solicitacao':
        window.location.assign("/equipamentos/solicitacao");
        break;

      case 'compras':
        window.location.assign("/compras");
        break;

      case 'vendas':
        window.location.assign("/vendas");
        break;

      case 'equipamentos':
        window.location.assign("/equipamentos");
        break;

      case 'perfil':
        window.location.assign("/perfil");
        break;

      case 'clientes':
        window.location.assign("/clientes");
        break;
        
      default:
        window.location.assign("/");
    }

  }

  render() {
    return <div />;
  }
}
