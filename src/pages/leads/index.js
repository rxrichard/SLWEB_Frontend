import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import xlsx from 'xlsx'

import { api } from "../../services/api";
import Typography from "@material-ui/core/Typography";
import { Add, Search, FindReplace } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import {
  LoadLeadsFranqueado,
  LoadLeadsGeral,
  LoadLeadsLimite,
} from "../../global/actions/LeadAction";

import { Panel } from "../../components/commom_in";
import { roleLevel } from "../../misc/commom_functions";
import { REACT_APP_FRANQUEADO_ROLE_LEVEL } from "../../misc/role_levels";
import List from "./List";
import Loading from "../../components/loading_screen";
import Dialog from "../../components/materialComponents/Dialog";
import Button from "../../components/materialComponents/Button";
import Select from "../../components/materialComponents/Select";
import InputMultline from "../../components/materialComponents/InputMultline";
import { RED_SECONDARY } from "../../misc/colors";
import { Toast } from "../../components/toasty";

function LeadsList(props) {
  const [Loaded, setLoaded] = useState(false);
  const [Filtro, setFiltro] = useState("");
  const [LeadsFiltrado, setLeadsFiltrado] = useState([]);
  const [NomeFantasia, setNomeFantasia] = useState("");
  const [RazaoSocial, setRazaoSocial] = useState("");
  const [Estado, setEstado] = useState("");
  const [Municipio, setMunicipio] = useState("");
  const [Contato, setContato] = useState("");
  const [Fone1, setFone1] = useState("");
  const [Fone2, setFone2] = useState("");
  const [Email, setEmail] = useState("");
  const [Desc, setDesc] = useState("");
  const [Msg, setMsg] = useState("");

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
        setLeadsFiltrado(response.data.LeadsGeral);
      } catch (err) {
        sessionStorage.clear();
        window.location.assign("/");
      }
    }
    load();
  }, [LoadLeadsFranqueado, LoadLeadsGeral, LoadLeadsLimite]);

  const resetField = () => {
    setNomeFantasia("");
    setRazaoSocial("");
    setEstado("");
    setMunicipio("");
    setContato("");
    setFone1("");
    setFone2("");
    setEmail("");
    setDesc("");
    setMsg("");
  };

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
          Msg,
        },
      });

      if (response.status === 201) {
        Toast("Lead Cadastrado", "success");
        resetField();
      } else {
        throw Error;
      }
    } catch (err) {
      Toast("Falha ao cadastrar lead", "error");
    }
  };

  const handleFilter = () => {
    if (Filtro.trim() === "") {
      setLeadsFiltrado(LeadsGeral);
    } else {
      setLeadsFiltrado(
        LeadsGeral.filter(
          (lead) =>
            lead.Municipio &&
            lead.Municipio.toUpperCase() === Filtro.toUpperCase()
        )
      );
    }
  };

  // const CargaPlanilha = () => {
  //   //Pega todos inputs do tipo arquivos
  //   const arquivos = document.getElementsByClassName("files")[0].files[0];
  //   const reader = new FileReader();
  //   let result

  //   reader.onload = (evt) => {
  //     // evt = on_file_select event
  //     /* Parse data */
  //     const bstr = evt.target.result;
  //     const wb = xlsx.read(bstr, { type: "binary" });
  //     /* Get first worksheet */
  //     const wsname = wb.SheetNames[0];
  //     const ws = wb.Sheets[wsname];
  //     /* Convert array of arrays */
  //     const data = xlsx.utils.sheet_to_csv(ws, { header: 1 });
  //     /* Update state */
  //     result = convertToJson(data); // shows data in obj format
  //     console.log(result)
  //   };

  //   if(typeof arquivos != 'undefined'){
  //     reader.readAsBinaryString(arquivos);
  //   }else{
  //     Toast('Planilha não fornecida', 'error')
  //   }
  // }

  // const convertToJson = (csv) => {
  //   var lines = csv.split("\n");

  //   var result = [];

  //   var headers = lines[0].split(",");

  //   for (var i = 1; i < lines.length; i++) {
  //     var obj = {};
  //     var currentline = lines[i].split(",");

  //     for (var j = 0; j < headers.length; j++) {
  //       obj[headers[j]] = currentline[j];
  //     }

  //     result.push(obj);
  //   }

  //   return result; //JavaScript object
  //   // return JSON.stringify(result); //JSON
  // }

  return !Loaded ? (
    <Loading />
  ) : (
    <Panel style={{ alignItems: "flex-start" }}>
      {roleLevel() <= REACT_APP_FRANQUEADO_ROLE_LEVEL ? null : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          {/* <Dialog
            icone={<Add />}
            botao="Carregar Vários"
            title="Carga de Leads"
            action={
              <Button
                style={{ backgroundColor: RED_SECONDARY, color: "#FFFFFF" }}
                onClick={() => CargaPlanilha()}
                icon={<Add />}
              >
                Carregar
              </Button>
            }
            buttonStyle={{ marginRight: '8px' }}
          >
            <input
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              className="files"
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span">
                Carregar Planilha
              </Button>
            </label>
          </Dialog> */}
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
                style={{ margin: "0px 0px 8px 0px" }}
                value={NomeFantasia}
                id="outlined-basic"
                label="Nome Fantasia"
                variant="outlined"
                onChange={(e) => setNomeFantasia(e.target.value)}
              />
              <TextField
                style={{ margin: "0px 0px 8px 0px" }}
                value={RazaoSocial}
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
              value={Estado}
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
                style={{ margin: "0px 16px 0px 0px" }}
                value={Municipio}
                id="outlined-basic"
                label="Município"
                variant="outlined"
                onChange={(e) => setMunicipio(e.target.value)}
              />
              <TextField
                style={{ margin: "8px 0px 8px 0px" }}
                value={Contato}
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
                style={{ margin: "0px 16px 0px 0px" }}
                value={Fone1}
                id="outlined-basic"
                label="Fone 1"
                variant="outlined"
                onChange={(e) => setFone1(e.target.value)}
              />
              <TextField
                style={{ margin: "8px 0px 8px 0px" }}
                value={Fone2}
                id="outlined-basic"
                label="Fone 2"
                variant="outlined"
                onChange={(e) => setFone2(e.target.value)}
              />
            </div>
            <TextField
              style={{ width: "100%" }}
              value={Email}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputMultline
              style={{
                width: "100%",
                marginTop: "8px",
                backgroundColor:
                  charCount(Desc, 250) < 0 ? "rgb(255, 0, 0, 0.5)" : "inherit",
              }}
              value={Desc}
              onChange={(e) => setDesc(e.target.value)}
              label={`Atividade/Descrição(${charCount(Desc, 250)})`}
            />
            <InputMultline
              style={{
                width: "100%",
                marginTop: "8px",
                backgroundColor:
                  charCount(Msg, 250) < 0 ? "rgb(255, 0, 0, 0.5)" : "inherit",
              }}
              value={Msg}
              onChange={(e) => setMsg(e.target.value)}
              label={`Recado Lead (${charCount(Msg, 250)})`}
            />
          </Dialog>
        </div>
      )}

      <Typography variant="h6" gutterBottom>
        Leads Assumidos ({Limites[0].Tentativas}/{Limites[0].MaxTentativas})
      </Typography>
      <List Leads={LeadsFranqueado} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
          margin: "8px 0px 8px 0px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Leads Disponiveis({LeadsFiltrado.length})
        </Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <InputMultline
            style={{ margin: "0px 8px 0px 0px" }}
            value={Filtro}
            onChange={(e) => setFiltro(e.target.value)}
            label="Filtrar Município"
          />
          <Button onClick={() => handleFilter()}>
            {Filtro === "" ? <FindReplace /> : <Search />}
          </Button>
        </div>
      </div>

      <List Leads={LeadsFiltrado} />
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

const charCount = (field, maxChar) => {
  return maxChar - field.length;
};
