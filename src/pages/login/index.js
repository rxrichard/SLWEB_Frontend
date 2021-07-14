import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";

import Image from "../../assets/logo_sl.PNG";
import {
  Container,
  Box,
  Logo,
} from "../../components/commom_out";
import { Input, LockOutlined, Work } from "@material-ui/icons/";
import { Toast } from "../../components/toasty";
import Button from "../../components/materialComponents/Button";
import InputUnderline from "../../components/materialComponents/InputUnderline";
import { RED_PRIMARY } from '../../components/colors'

function Login() {
  const [user_code, setUser] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
  }, []);

  const handleLogin = async () => {
    Toast("...Autenticando");

    try {
      const response = await api.post("/auth/", {
        user_code: user_code,
        password: password,
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
  };
  return (
    <Container style={{ backgroundColor: RED_PRIMARY }}>
      <Box>
        <Logo src={Image} alt="Pilão professional" />
        <InputUnderline
          label="Filial"
          onChange={(e) => {
            e = e.toUpperCase();
            setUser(e);
          }}
        />
        <InputUnderline
          type="password"
          label="Senha"
          onChange={(e) => {
            setPassword(e);
          }}
        />
        <Button
          style={{ minWidth: "60%", marginBottom: "8px", backgroundColor: RED_PRIMARY, color: '#FFFFFF' }}
          icon={<Input />}
          onClick={() => {
            handleLogin();
          }}
        >
          Acessar
        </Button>
        <Link to="/forgot">
          <Button
            style={{ minWidth: "60%", marginBottom: "8px",  backgroundColor: '#FFFFFF', boxShadow: 'none' }}
            icon={<LockOutlined />}
          >
            Recuperar senha
          </Button>
        </Link>
      </Box>
      <Link to="/PILAO">
        <Button icon={<Work />}>Colaboradores</Button>
      </Link>
    </Container>
  );
}

export default Login;
