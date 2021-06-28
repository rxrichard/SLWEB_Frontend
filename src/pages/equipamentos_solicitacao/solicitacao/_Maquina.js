import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { api } from "../../../services/api";

import Settings from "@material-ui/icons/Settings";
import ThreeSixty from "@material-ui/icons/ThreeSixty";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import Bebidas from "./_Configuracao";
import Dialog from "../../../components/materialComponents/Dialog";
import Selecao from "../../../components/materialComponents/Select";
import OpenSelect from "./_AddBebida";
import Button from "../../../components/materialComponents/Button";
import Modal from "../../../components/modal";
import { Rotulo } from "../../../components/commom_in";
import PadraoMod from "./_Padrao";

import {
  ChangePagamento,
  ChangeValidador,
  LoadAtivos,
  LoadBebidas,
  LoadClientesEnderecos,
  LoadConfigPadrao,
  ChangeMaquina,
  ChangeValidadorFichas,
  LoadMinDDL,
  clearConfig,
} from "../../../global/actions/SolicitacaoAction";

function Requisicao(props) {
  const {
    Pagamento,
    Maquina,
    Configuracao,
    Capacidade,
    MaxContenedores,
    Contenedor,
    TipoValidador,
    Validador,
  } = props.State;

  const Ativos = props.State.AtivosDisponiveis;
  const Padrao = props.State.ConfiguracoesPadrao;

  const {
    ChangePagamento,
    ChangeValidador,
    LoadAtivos,
    ChangeMaquina,
    LoadClientesEnderecos,
    LoadBebidas,
    ChangeValidadorFichas,
    LoadConfigPadrao,
    LoadMinDDL,
    clearConfig,
  } = props;

  useEffect(() => {
    api.get("/equip/adresses").then((response) => {
      LoadAtivos(response.data.MaquinasDisponiveis);
      LoadBebidas(response.data.BebidasNovo);
      LoadClientesEnderecos(response.data.endereços);
      LoadMinDDL(response.data.MinDDL);
    });
  }, []);

  const chooseMaquina = (maq) => {
    if (maq === "") {
      ChangeMaquina("");
    } else {
      Ativos.map((ativo) => {
        if (ativo.MaqModelo === maq) {
          ChangeMaquina(ativo);
          api.get(`/equip/default/${ativo.MaqModId}`).then((response) => {
            LoadConfigPadrao(response.data);
          });
        }
        return null;
      });
    }
  };

  return (
    <div
      style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
      className="XAlign"
    >
      <Selecao
        width="200px"
        // condicao="*Limpe a configuração para alterar"
        label="Máquina"
        value={Maquina}
        disabled={Configuracao.length > 0 ? true : false}
        onChange={(e) => chooseMaquina(e.target.value)}
      >
        {Ativos.map((maquina) => (
          <MenuItem value={maquina.MaqModelo}>{maquina.MaqModelo}</MenuItem>
        ))}
      </Selecao>

      <Selecao
        width="200px"
        // condicao="*Limpe a configuração para alterar"
        label="Pagamento"
        value={Pagamento}
        disabled={Configuracao.length > 0 ? true : false}
        onChange={(e) => ChangePagamento(e.target.value)}
      >
        <MenuItem value="Livre">Livre</MenuItem>
        <MenuItem value="Cartão">Cartão</MenuItem>
        <MenuItem value="Validador">Validador</MenuItem>
        <MenuItem value="Cartão e Validador">Cartão e Validador</MenuItem>
      </Selecao>

      <div style={{ marginTop: "8px" }}>
        <Modal
          header="Detalhes do Validador"
          trigger={
            <Button
              style={{ marginLeft: "8px", height: "54px" }}
              icon={<Settings />}
              disabled={!shouldShowValidador(Pagamento, Configuracao)}
            >
              Validador
            </Button>
          }
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <FormControl component="fieldset">
              <RadioGroup
                value={TipoValidador}
                onChange={(e) => {
                  ChangeValidador(e.target.value);
                }}
              >
                <FormControlLabel
                  value="Moeda"
                  control={<Radio />}
                  label="Moeda"
                />
                <FormControlLabel
                  value="Ficha"
                  control={<Radio />}
                  label="Ficha"
                />
                <FormControlLabel
                  value="Moeda e Ficha"
                  control={<Radio />}
                  label="Moeda e Ficha"
                />
              </RadioGroup>
            </FormControl>

            <div className="YAlign">
              {returnValidadorOption(TipoValidador, Validador, ChangeValidadorFichas)}
            </div>
          </div>
        </Modal>
      </div>

      <PadraoMod
        disabled={!shouldShowInfo(Pagamento, Maquina)}
        Padrao={Padrao}
      />
      <OpenSelect
        disabled={
          !shouldShowAddBebida(Pagamento, Maquina, Configuracao, Capacidade)
        }
      />
      <Button
        style={{ margin: "8px 0px 0px 8px", height: "54px" }}
        onClick={() => clearConfig()}
        icon={<ThreeSixty />}
        disabled={Configuracao.length > 0 ? false : true}
      >
        Limpar config.
      </Button>
      <div
        className="YAlign"
        style={{
          margin: "8px 0px 0px 8px",
          height: "54px",
          justifyContent: "center",
          flex: "unset",
        }}
      >
        <p style={{ margin: "0px" }}>
          {Configuracao.length}/<strong>{Capacidade}</strong> Bebidas
          adicionadas
        </p>
        <p style={{ margin: "0px" }}>
          {Contenedor.length}/<strong>{MaxContenedores}</strong> Contenedores em
          uso
        </p>
      </div>

      <div style={{ margin: "8px 0px 0px 8px" }}>
        <Dialog botao="Contenedores" title="Contenedores em uso">
          {Contenedor.map((cont) => (
            <p>{defineContenedor(cont)}</p>
          ))}
        </Dialog>
      </div>
      {Configuracao.length > 0 ? <Bebidas /> : null}
    </div>
  );
}

const mapStateToProps = (store) => ({
  State: store.solicitacaoState,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ChangePagamento,
      ChangeValidador,
      LoadAtivos,
      ChangeMaquina,
      LoadClientesEnderecos,
      LoadBebidas,
      LoadConfigPadrao,
      ChangeValidadorFichas,
      LoadMinDDL,
      clearConfig,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Requisicao);

const defineContenedor = (cont) => {
  switch (cont) {
    case 1:
      return "Café";
    case 2:
      return "Leite";
    case 3:
      return "Cappuccino";
    case 4:
      return "Café c/ Leite";
    case 5:
      return "Achocolatado";
    case 6:
      return "Chá de Limão";
    default:
      return "Desconhecido";
  }
};

const opcoesValidador = [
  ["1", "2", "3", "4", "5"], //Fichas
  ["0.05", "0.10", "0.25", "0.50", "1.00"], //Moedas
  ["0.05", "0.10", "0.25", "0.50", "1.00", "1", "2", "3", "4", "5"], //Moeda e Ficha
];

const shouldShowAddBebida = (Pagamento, Maquina, Configuracao, Capacidade) => {
  if (Pagamento !== "" && Maquina !== "" && Configuracao.length < Capacidade) {
    return true;
  }
};

const shouldShowInfo = (Pagamento, Maquina) => {
  if (Pagamento !== "" && Maquina !== "") {
    return true;
  }
};

const shouldBeChecked = (item, Validador) => {
  if (Validador.indexOf(item) < 0) {
    return false;
  } else {
    return true;
  }
};

const shouldShowValidador = (Pagamento, Configuracao) => {
  if (
    (Pagamento === "Validador" || Pagamento === "Cartão e Validador") &&
    Configuracao.length < 1
  ) {
    return true;
  } else {
    return false;
  }
};

const returnValidadorOption = (tipo, Validador, ChangeValidadorFichas) => {
  switch(tipo){
    case 'Ficha':
      return (
        opcoesValidador[0].map((item) => (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', marginTop: '8px' }}>
            <input
              checked={shouldBeChecked(item, Validador)}
              onChange={(e) => {
                ChangeValidadorFichas(e.target.value);
              }}
              type="checkbox"
              value={item}
              key={item}
            />
            <Rotulo style={{ margin: '0px'}}>Ficha de {item}</Rotulo>
          </div>
        ))
      )
    case 'Moeda':
      return (
        opcoesValidador[1].map((item) => (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', marginTop: '8px' }}>
              <input
                checked={shouldBeChecked(item, Validador)}
                type="checkbox"
                value={item}
              />
              <Rotulo style={{ margin: '0px'}}>R$ {item}</Rotulo>
            </div>
          ))
      )
      case 'Moeda e Ficha':
      return (
        opcoesValidador[2].map((item) => (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', marginTop: '8px' }}>
              <input
                type="checkbox"
                value={item}
                checked={shouldBeChecked(item, Validador)}
                onChange={(e) => {
                  ChangeValidadorFichas(e.target.value);
                }}
                key={item}
              />
              <Rotulo style={{ margin: '0px'}}>R$ {item}</Rotulo>
            </div>
          ))
      )
      default:
      return null
  }
}