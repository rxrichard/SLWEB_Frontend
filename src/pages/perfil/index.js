import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

import { Panel } from "../../components/commom_in";
import { maskCNPJ, maskCEP } from "../../misc/commom_functions";
import { Toast } from "../../components/toasty";
import Loading from "../../components/loading_screen";

import InputNumber from '../../components/materialComponents/inputMoney'
import Card from "../../components/materialComponents/Card";
import Dialog from "../../components/materialComponents/Dialog";
import Select from "../../components/materialComponents/Select";
import InputUnderline from "../../components/materialComponents/InputUnderline";
import Button from "../../components/materialComponents/Button";

import {Settings,VpnKey,Check, AccountCircle } from "@material-ui/icons/";
import {MenuItem, Typography, TextField, Input, InputAdornment,  }from "@material-ui/core/";

import { RED_SECONDARY, GREY_LIGHT } from "../../misc/colors";

function Perfil() {
  const [info, setInfo] = useState({});
  const [password, setPassword] = useState({});
  const [newEmail, setNewEmail] = useState(null);
  const [newTaxa, setNewTaxa] = useState({
    tipo: '',
    valor: 0
  });
  const [loaded, setLoaded] = useState(false);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get("/profile", {
          params: {
            token: sessionStorage.getItem("token"),
          },
        });

        if (
          response.data === {} ||
          response.data === null ||
          typeof response.data == "undefined" ||
          !response.data
        )
          throw Error;

        setInfo(response.data);
        setLoaded(true);
        setNewTaxa({
          tipo: response.data.ParamTxt,
          valor: response.data.ParamVlr * 100,
        });
      } catch (err) {
        Toast('Falha na comunicação', "error");
      }
    }
    loadData();
  }, []);

  const handleChangePassword = async () => {
    setWait(true);
    let toastId = null

    try {
      toastId = Toast('Aguarde...', 'wait')
      await api
        .put("/profile/password", {
          token: sessionStorage.getItem("token"),
          password: password,
        })
        .catch((error) => {
          throw new Error(error.response.status);
        });

      Toast('Senha atualizada com sucesso!', 'update', toastId, 'success')
      setWait(false);
      setPassword({
        atual: "",
        nova: "",
        confirmacao: "",
      });
    } catch (err) {
      switch (Number(err.message)) {
        case 409:
          Toast('A nova senha diverge da confirmação', 'update', toastId, 'error')
          setWait(false);
          break;
        case 406:
          Toast('A senha deve possuir no máximo seis caractéres', 'update', toastId, 'error')
          setWait(false);
          break;
        case 405:
          Toast('A senha atual não está correta', 'update', toastId, 'error')
          setWait(false);
          break;
        case 304:
          Toast('Nova senha e atual são identicas', 'update', toastId, 'error')
          setWait(false);
          break;
        default:
          Toast('Não foi possivel alterar sua senha, contate o suporte', 'update', toastId, 'error')
          setWait(false);
          break;
      }
    }
  };

  const handleChangeEmail = async () => {
    if (
      newEmail === "" ||
      newEmail === null ||
      typeof newEmail == "undefined"
    ) {
      Toast("Preencha um email valido", 'warn');
      return;
    }

    setWait(true);
    let toastId = null

    try {
      toastId = Toast('Aguarde...', 'wait')
      const response = await api.put("/profile/email", {
        email: newEmail,
      });

      if (response.status === 400) throw Error;

      Toast('Email atualizado com sucesso!', 'update', toastId, 'success')
      setWait(false);
      setInfo({ ...info, Email: newEmail });
    } catch (err) {
      Toast('Falha na comunicação', 'update', toastId, 'error')
      setWait(false);
    }
  };

  const handleChangeTax = async () => {
    if (newTaxa.valor === '' || newTaxa.valor === null) {
      Toast('Preencha algum valor para a taxa', 'warn')
      return
    }

    let toastId = null

    try {
      toastId = Toast('Aguarde...', 'wait')
      const response = await api.put("/profile/tax", {
        token: sessionStorage.getItem("token"),
        newTax: newTaxa,
      });

      if (response.status === 400) throw Error;

      Toast('Taxa atualizada!', 'update', toastId, 'success')
    } catch (err) {
      Toast('Falha na comunicação', 'update', toastId, 'error')
    }
  };

  return !loaded ? (
    <Loading />
  ) : (
    <Panel>
      <div
        className="XAlign"
        style={{
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >

        {/* DADOS CADASTRAIS */}
        <Card
            className="mb8 df df-aling-end  w90 h40 w100m bl-3red bt-3red h-auto"
          
          action={
            <Dialog
              title="Alterar Senha"
              botao="Alterar Senha"
              icone={<VpnKey />}
              action={
                <Button
                  style={{
                    backgroundColor: wait ? GREY_LIGHT : RED_SECONDARY,
                    color: "#FFFFFF",
                  }}
                  icon={<Check />}
                  disabled={wait}
                  onClick={() => handleChangePassword()}
                >
                  Salvar
                </Button>
              }
            >

              
              
              <InputUnderline
                value={password.atual}
                type="password"
                label="Senha atual"
                onChange={(e) => setPassword({ ...password, atual: e })}
              />

              <InputUnderline
                value={password.nova}
                type="password"
                label="Nova senha"
                onChange={(e) => setPassword({ ...password, nova: e })}
              />

              <InputUnderline
                value={password.confirmacao}
                type="password"
                label="Confirmar nova senha"
                onChange={(e) => setPassword({ ...password, confirmacao: e })}
              />
            </Dialog>
          }
        >

        

        <Input disabled value={info.M0_FILIAL[0]}
          className="w45"
          id="input-with-icon-adornment"
          
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />

          <Typography variant="body2" color="textSecondary" component="p">
            CNPJ: {maskCNPJ(info.M0_CGC[0])}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            FILIAL: {info.M0_CODFIL[0]}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            IE: {info.M0_INSC}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            NIRE: {info.M0_NIRE}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            CNAE: {info.M0_CNAE}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            FPAS: {info.M0_FPAS}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Consultor: {info.Consultor}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Natureza Jurídica: {info.M0_NATJUR}
          </Typography>
        </Card>



        {/* DADOS DE CONTATO */}
        <Card
          className="mb8 df df-aling-end w45 w100m  h30 h-auto bl-3red bt-3red"
          action={
            <Dialog
              title="Alterar Email Principal"
              botao="Alterar Email"
              icone={<Settings />}
              action={
                <Button
                  style={{
                    backgroundColor: wait ? GREY_LIGHT : RED_SECONDARY,
                    color: "#FFFFFF",
                  }}
                  icon={<Check />}
                  disabled={wait}
                  onClick={() => handleChangeEmail()}
                >
                  Salvar
                </Button>
              }
            >
              <InputUnderline
                value={newEmail}
                disabled={wait}
                type="text"
                label={`Atual: ${info.Email.trim()}`}
                onChange={(e) => setNewEmail(e)}
              />
            </Dialog>
          }
        >

          <Typography variant="h5" component="h2">
            CONTATO
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Email: {info.Email.trim()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Endereço: {info.M0_ENDCOB}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Bairro: {info.M0_BAIRCOB}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            CEP: {maskCEP(info.M0_CEPCOB)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Estado: {info.M0_ESTCOB}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Município: {info.M0_CIDCOB}
          </Typography>
        </Card>


          {/* DADOS DE IMPOSTO/TAXA */}
        <Card
          className="mb8 df df-aling-end  w45 h30  w100m bl-3red bt-3red"
          action={
            <Button
              style={{ backgroundColor: RED_SECONDARY, color: "#FFFFFF" }}
              icon={<Check />}
              disabled={false}
              onClick={() => handleChangeTax()}
            >
              Salvar
            </Button>
          }
        >
          <Typography variant="h5" component="h2">
            TAXAS
          </Typography>
          <Select
            label="Tipo"
            value={newTaxa.tipo}
            onChange={(e) => {
              setNewTaxa({ tipo: e.target.value, valor: 0 });
              const i = document.querySelectorAll("input");
              
              i[0].value = "";
            }}
            >
            <div className='df-pure'>
            <MenuItem value="PERCENTUAL" className='df-pure'>Percentual</MenuItem>
            <MenuItem value="VALOR FIXO" >Valor fixo</MenuItem>
            </div>
          </Select>

          <InputNumber
            style={{ marginTop: '8px', maxWidth: '100px'}}
            decimais={newTaxa.tipo === "PERCENTUAL" ? 0 : 2}
            onChange={(e) => setNewTaxa({ ...newTaxa, valor: e.target.value })}
            label={newTaxa.tipo === "PERCENTUAL" ? "Porcentagem(%)" : "Valor(R$)"}
            disabled={false}
            value={newTaxa.valor}
          />
        </Card>
      </div>
    </Panel>
  );
}

export default Perfil;
