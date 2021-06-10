import React, { Component } from "react";
import { api } from "../../services/api";

export default class autoLogin extends Component {
  state = {
    user_code: null
  };

  async componentDidMount() {
    sessionStorage.clear();

    this.login(this.props.match.params.code);
  }

  async login(code) {
    try {
      const response = await api.post("/checkAuth", {
        code
      });

      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("usuario", response.data.nome);
        sessionStorage.setItem('role', response.data.role)
        window.location.assign("/equipamentos/solicitacao");
      } else {
        sessionStorage.clear();
        window.location.assign("/");
      }
    } catch (err) {
      window.location.assign("/");
    }
  }

  render() {
    return <div />;
  }
}
