import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { api } from "../../services/api";
import Typography from "@material-ui/core/Typography";
import Add from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import {
  LoadLeadsFranqueado,
  LoadLeadsGeral,
  LoadLeadsLimite,
} from "../../global/actions/LeadAction";

import { Panel } from "../../components/commom_in";
import List from "./List";
import Loading from "../../components/loading_screen";
import Dialog from "../../components/materialComponents/Dialog";
import Button from "../../components/materialComponents/Button";
import Select from "../../components/materialComponents/Select";
import InputMultline from "../../components/materialComponents/InputMultline";
import { RED_SECONDARY } from "../../components/colors";
import { Toast } from "../../components/toasty";

function LeadsList(props) {
  const [Loaded, setLoaded] = useState(false);
  const [NomeFantasia, setNomeFantasia] = useState("");
  const [RazaoSocial, setRazaoSocial] = useState("");
  const [Estado, setEstado] = useState("");
  const [Municipio, setMunicipio] = useState("");
  const [Contato, setContato] = useState("");
  const [Fone1, setFone1] = useState("");
  const [Fone2, setFone2] = useState("");
  const [Email, setEmail] = useState("");
  const [Desc, setDesc] = useState("");

  const { LoadLeadsFranqueado, LoadLeadsGeral, LoadLeadsLimite } = props;
  const { LeadsFranqueado, LeadsGeral, Limites } = props.State;

  useEffect(() => {
    async function load() {
      try {
        const response = await api.get("/leads");

        LoadLeadsFranqueado(response.data.LeadsFranqueado);
        LoadLeadsGeral(response.data.LeadsGeral);
        LoadLeadsLimite(response.data.Limites);
        setLoaded(true);
      } catch (err) {
        sessionStorage.clear();
        window.location.assign("/");
      }
    }
    load();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await api.post("/leads", {
        lead: {
          NomeFantasia,
          RazaoSocial,
          Estado,
          Municipio,
          Contato,
          Fone1,
          Fone2,
          Email,
          Desc,
        },
      });

      if (response.status === 201) {
        Toast("Lead Cadastrado", "success");
      } else {
        throw Error;
      }
    } catch (err) {
      Toast("Falha ao cadastrar lead", "error");
    }
  };

  return !Loaded ? (
    <Loading />
  ) : (
    <Panel style={{ alignItems: "flex-start" }}>
      {sessionStorage.getItem("role") === "Franquia" ? null : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Dialog
            icone={<Add />}
            botao="Adicionar"
            title="Adicionar Lead"
            action={
              <Button
                style={{ backgroundColor: RED_SECONDARY, color: "#FFFFFF" }}
                onClick={() => handleSubmit()}
                icon={<Add />}
              >
                Cadastrar
              </Button>
            }
          >
            <div
              className="XAlign"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <TextField
                style={{ margin: "0px 8px 8px 0px" }}
                id="outlined-basic"
                label="Nome Fantasia"
                variant="outlined"
                onChange={(e) => setNomeFantasia(e.target.value)}
              />
              <TextField
                style={{ margin: "0px 0px 8px 8px" }}
                id="outlined-basic"
                label="Razão Social"
                variant="outlined"
                onChange={(e) => setRazaoSocial(e.target.value)}
              />
            </div>
            <Select
              width="100%"
              MBottom="8px"
              label="Estado"
              value=""
              onChange={(e) => setEstado(e.target.value)}
            >
              {estados.map((estado) => (
                <MenuItem value={estado.UF}>{estado.estado}</MenuItem>
              ))}
            </Select>

            <div
              className="XAlign"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <TextField
                style={{ margin: "0px 8px 8px 0px" }}
                id="outlined-basic"
                label="Município"
                variant="outlined"
                onChange={(e) => setMunicipio(e.target.value)}
              />
              <TextField
                style={{ margin: "0px 0px 8px 8px" }}
                id="outlined-basic"
                label="Contato"
                variant="outlined"
                onChange={(e) => setContato(e.target.value)}
              />
            </div>
            <div
              className="XAlign"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <TextField
                style={{ margin: "0px 8px 8px 0px" }}
                id="outlined-basic"
                label="Fone 1"
                variant="outlined"
                onChange={(e) => setFone1(e.target.value)}
              />
              <TextField
                style={{ margin: "0px 0px 8px 8px" }}
                id="outlined-basic"
                label="Fone 2"
                variant="outlined"
                onChange={(e) => setFone2(e.target.value)}
              />
            </div>
            <TextField
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputMultline
              style={{ width: "100%", marginTop: "8px" }}
              onChange={(e) => setDesc(e.target.value)}
              label="Atividade/Descrição"
            />
          </Dialog>
        </div>
      )}

      <Typography variant="h6" gutterBottom>
        Leads Assumidos ({Limites[0].Tentativas}/{Limites[0].MaxTentativas})
      </Typography>
      <List Leads={LeadsFranqueado} />

      <Typography variant="h6" gutterBottom>
        Leads Disponiveis
      </Typography>
      <List Leads={LeadsGeral} />
    </Panel>
  );
}

const mapStateToProps = (store) => ({
  State: store.leadsState,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      LoadLeadsFranqueado,
      LoadLeadsGeral,
      LoadLeadsLimite,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsList);

const estados = [
  { estado: "Acre", UF: "AC" },
  { estado: "Alagoas", UF: "AL" },
  { estado: "Amapá", UF: "AP" },
  { estado: "Amazonas", UF: "AM" },
  { estado: "Bahia", UF: "BA" },
  { estado: "Ceará", UF: "CE" },
  { estado: "Distrito Federal", UF: "DF" },
  { estado: "Espírito Santo", UF: "ES" },
  { estado: "Goiás", UF: "GO" },
  { estado: "Maranhão", UF: "MA" },
  { estado: "Mato Grosso", UF: "MT" },
  { estado: "Mato Grosso do Sul", UF: "MS" },
  { estado: "Minas Gerais", UF: "MG" },
  { estado: "Pará", UF: "PA" },
  { estado: "Paraíba", UF: "PB" },
  { estado: "Paraná", UF: "PR" },
  { estado: "Pernambuco", UF: "PE" },
  { estado: "Piauí", UF: "PI" },
  { estado: "Rio de Janeiro", UF: "RJ" },
  { estado: "Rio Grande do Norte", UF: "RN" },
  { estado: "Rio Grande do Sul", UF: "RS" },
  { estado: "Rondônia", UF: "RO" },
  { estado: "Roraima", UF: "RR" },
  { estado: "Santa Catarina", UF: "SC" },
  { estado: "São Paulo", UF: "SP" },
  { estado: "Sergipe", UF: "SE" },
  { estado: "Tocantins", UF: "TO" },
];
