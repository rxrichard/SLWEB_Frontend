import React from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";

import Image from "../../assets/logo_sl.PNG";
import {
  Container,
  Box,
  Logo,
  LinkContainer,
} from "../../components/commom_out";
import { TextInput, Icon, Button } from "react-materialize";
import { Toast, ToastyContainer } from "../../components/toasty";

class Login extends React.Component {
  state = {
    user_code: "",
    password: "",
  };

  componentDidMount() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
  }

  async handleLogin() {
    Toast("...Autenticando");

    try {
      const response = await api.post("/auth/", {
        user_code: this.state.user_code,
        password: this.state.password,
      });

      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("usuario", response.data.nome);
        sessionStorage.setItem("role", response.data.role);
        window.location.assign("/");
      } else {
        Toast("Dados de login incorretos ou inexistentes", "error");
        sessionStorage.clear();
      }
    } catch (err) {
      Toast("Falha na conexão", "error");
    }
  }
  render() {
    return (
      <Container>
        <ToastyContainer />
        <Box>
          <Logo src={Image} alt="Pilão professional" />
          <div style={{ marginTop: "2vh" }}>
            <TextInput
              style={{ borderBottom: "1px solid #9e9e9e", margin: "0px" }}
              className="txt"
              label="Filial"
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                this.setState({ user_code: e.target.value });
              }}
            />
          </div>
          <div style={{ marginTop: "2vh" }}>
            <TextInput
              className="txt"
              password
              label="Senha"
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />
          </div>
          <Button
            type="submit"
            style={{
              background: "rgba(120,28,29,1)",
              marginTop: "2%",
              width: "200px",
            }}
            onClick={() => {
              this.handleLogin();
            }}
          >
            <Icon left>input</Icon>
            Acessar
          </Button>
          <Link to="/forgot">
            <Button
              type="submit"
              style={{
                background: "rgba(120,28,29,1)",
                marginTop: "2%",
                width: "200px",
              }}
            >
              <Icon left>lock_outline</Icon>
              Recuperar senha
            </Button>
          </Link>
        </Box>
        <Link to="/PILAO">
          <LinkContainer>
            <Icon left>work</Icon>Internos
          </LinkContainer>
        </Link>
      </Container>
    );
  }
}

export default Login;
