import React, { Component } from "react";
import { api } from "../../services/api";

export default class autoLogin extends Component {
  state = {
    user_code: null
  };

  async componentDidMount() {
    localStorage.clear();

    this.login(this.props.payload.code);
  }

  async login(code) {
    try {
      const response = await api.post("/checkAuth", {
        user_code: code,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("usuario", response.data.nome);
        window.location.assign("/clientes");
      } else {
        localStorage.clear();
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
