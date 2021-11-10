import React, { useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";

import Image from "../../assets/logo_sl.PNG";
import { Toast } from "../../components/toasty";
import { Container, Box, Logo } from "../../components/commom_out";
import { Bright } from "../../misc/commom_functions";
import Modal from "../../components/modal";
import Button from "../../components/materialComponents/Button";
import Input from "../../components/materialComponents/InputUnderline";
import { Cast, LockOutlined, Person, TagFaces } from "@material-ui/icons";
import {
  GREY_PRIMARY,
  RED_PRIMARY,
  GREY_SECONDARY,
} from "../../misc/colors";

export default function LoginADM() {
  const [adm_code, setAdmCode] = useState(null);
  const [adm_password, setAdmPassword] = useState(null);
  const [validADM, setValidAdm] = useState(false);
  const [usersList, setUserList] = useState([]);
  const [usersListFiltered, setUserFiltered] = useState([]);
  const [user_code, setUserCode] = useState(null);
  const [user_name, setUserName] = useState(null);

  const handleAttempt = async () => {

    if ((adm_code === null || adm_code === '') && (adm_password === null || adm_password === '')) {
      Toast('Código ou Senha não informados', 'warn')
      return
    }

    let toastId = null

    try {
      toastId = Toast('Aguarde...', 'wait')

      const response = await api.get("/admAuth", {
        params: {
          admin_code: adm_code,
          admin_password: adm_password,
        },
      });

      Toast('Autenticado!', 'update', toastId, 'success')

      setUserList(response.data);
      setUserFiltered(response.data);
      setValidAdm(true);
    } catch (err) {
      Toast('Falha na autenticação', 'update', toastId, 'error')
      setValidAdm(false);
    }

  };

  const handleLogin = async () => {
    let toastId = null

    try {
      toastId = Toast('Aguarde...', 'wait')
      const response = await api.post("/admAuth", {
        admin_code: adm_code,
        admin_password: adm_password,
        user_code: user_code,
      });

      if (typeof response.data != "object") throw Error;

      Toast('Conectado!', 'update', toastId, 'success')
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", response.data.role);
      sessionStorage.setItem("usuario", response.data.nome);

      window.location.assign("/");
    } catch (err) {
      Toast('Falha ao realizar o login', 'update', toastId, 'error')
    }
  };

  const Filter = (value, event) => {
    setUserFiltered(usersList);
    event.target.value = value.toUpperCase();
    value = value.toUpperCase();

    if (value === "") {
      setUserFiltered(usersList);
      return;
    }

    if (value.length > 4) {
      event.target.value = value.slice(0, 4);
      value = value.slice(0, 4);
    }

    setUserFiltered(usersList);
    let aux = [];
    let newArray = [];
    aux = [...usersList];

    for (let i = 0; i < aux.length; i++) {
      if (aux[i].M0_CODFIL.slice(0, value.length) === value) {
        newArray.push(aux[i]);
      }
    }

    setUserFiltered(newArray);
  };

  return (
    <Container style={{ backgroundColor: GREY_PRIMARY }}>
      <Box>
        <Logo src={Image} alt="Pilão professional" />
        <Input
          onChange={(e) => {
            setAdmCode(e);
            setValidAdm(false);
          }}
          label="Código ADM"
        />
        <Input
          type="password"
          onChange={(e) => {
            setAdmPassword(e);
            setValidAdm(false);
          }}
          label="Senha ADM"
        />

        <Button
          style={{
            minWidth: "60%",
            marginBottom: "8px",
            backgroundColor: RED_PRIMARY,
            color: "#FFFFFF",
          }}
          icon={<Cast />}
          onClick={() => handleAttempt()}
        >
          Validar Credenciais
        </Button>

        <Modal
          actions={
            <>
              <input
                onChange={(e) => Filter(e.target.value, e)}
                type="text"
                style={{ width: "70px", borderBottom: '1px solid #555555' }}
                placeholder="Filial..."
              />
              <Button
                style={{
                  marginRight: "8px",
                  backgroundColor: RED_PRIMARY,
                  color: "#FFFFFF",
                }}
                icon={<LockOutlined />}
                disabled={user_code === null ? true : false}
                onClick={() => handleLogin()}
              >
                Acessar
              </Button>
            </>
          }
          header={
            user_name !== null ? `Franqueado: ${user_name}` : "Escolher Filial"
          }
          trigger={
            <Button
              style={{
                minWidth: "60%",
                marginBottom: "8px",
                backgroundColor: GREY_SECONDARY,
                color: "#FFFFFF",
              }}
              icon={<Person />}
              disabled={!validADM}
            >
              Selecionar Filial
            </Button>
          }
        >
          <div
            className="tableFixHead"
            style={{
              height: "50vh",
              width: "100%",
            }}
          >
            <table>
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Filial</th>
                  <th>Franqueado</th>
                </tr>
              </thead>
              <tbody>
                {usersListFiltered.map((user, i) => (
                  <tr
                    className="Item"
                    onClick={(e) => {
                      setUserCode(user.M0_CODFIL);
                      setUserName(user.GrupoVenda);
                      Bright(e);
                    }}
                    key={user.M0_CODFIL}
                    value={i}
                  >
                    <td>{i + 1}</td>
                    <td>{user.M0_CODFIL}</td>
                    <td>{user.GrupoVenda}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      </Box>
      <Link to="/">
        <Button icon={<TagFaces />}>Franqueados</Button>
      </Link>
    </Container>
  );
}
