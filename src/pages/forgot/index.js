import React, { useState } from "react";
import { api } from "../../services/api";
import { Toast } from "../../components/toasty";
import { Link } from "react-router-dom";

import { Container, Box, Logo } from "../../components/commom_out";
import { FAILED_REQUEST } from "../../misc/messages";
import Image from "../../assets/logo_sl.PNG";
import Button from "../../components/materialComponents/Button";
import InputUnderline from "../../components/materialComponents/InputUnderline";
import { LockOutlined, ArrowBack, Work } from "@material-ui/icons";
import { RED_PRIMARY } from '../../misc/colors'

export default function Forgot() {
  const [user_code, setUser] = useState("");

  const handleReset = async () => {
    if (user_code === "") {
      Toast("Informe o código da sua filial");
    } else {
      Toast("...Aguarde");
      try {
        const response = await api.post("/forgot", {
          user_code: user_code,
        });

        if (response.status === 200) {
          Toast(".Sua senha foi enviada para seu e-mail", "success");
          setTimeout(() => {
            window.location.assign("/");
          }, 3000);
        } else {
          throw Error;
        }
      } catch (err) {
        Toast(FAILED_REQUEST, "error");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }
  };

  return (
    <Container style={{ backgroundColor: RED_PRIMARY }}>
      <Box>
        <Logo src={Image} alt="SLAPLIC WEB" />
        <InputUnderline
          label="Código de acesso"
          onChange={(e) => {
            setUser(e);
          }}
        />

        <Button
          style={{ minWidth: "60%", marginBottom: "8px", backgroundColor: RED_PRIMARY, color: '#FFFFFF' }}
          icon={<LockOutlined />}
          onClick={() => {
            handleReset();
          }}
        >
          Recuperar senha
        </Button>

        <Link to="/">
          <Button
            style={{ minWidth: "60%", marginBottom: "8px", backgroundColor: '#FFFFFF', boxShadow: 'none' }}
            icon={<ArrowBack />}
          >
            Voltar
          </Button>
        </Link>
      </Box>
      <Link to="/">
        <Button
          icon={<Work />}
        >
          Colaboradores
        </Button>
      </Link>
    </Container>
  );
}
