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
        sessionStorage.setItem("usuario", response.data.nome);
        sessionStorage.setItem('role', response.data.role);

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
        
      default:
        window.location.assign("/");
    }

  }

  render() {
    return <div />;
  }
}
