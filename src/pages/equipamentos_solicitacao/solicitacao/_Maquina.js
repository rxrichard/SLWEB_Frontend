import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal, Switch } from "react-materialize";
import { api } from "../../../services/api";

import MenuItem from "@material-ui/core/MenuItem";

import Bebidas from "./_Configuracao";
import Dialog from "../../../components/materialComponents/Dialog";
import Selecao from "../../../components/materialComponents/Select";
import OpenSelect from "./_AddBebida";
import Button from "../../../components/materialComponents/Button";
import { CloseButton } from "../../../components/buttons";
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
} from "../../../global/actions/index";

function Requisicao(props) {
  const [ativar, setAtivar] = useState(false);

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
  } = props;

  useEffect(() => {
    Pagamento === "Validador" || Pagamento === "Cartão e Validador"
      ? setAtivar(false)
      : setAtivar(true);
  }, [Pagamento]);

  useEffect(() => {
    Configuracao.length > 0 ? setAtivar(true) : setAtivar(false);
  }, [Configuracao]);

  useEffect(() => {
    api.get("/equip/adresses").then((response) => {
      LoadAtivos(response.data.MaquinasDisponiveis);
      LoadBebidas(response.data.BebidasNovo);
      LoadClientesEnderecos(response.data.endereços);
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
        condicao="*Limpe a configuração para alterar"
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
        condicao="*Limpe a configuração para alterar"
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

      {Pagamento === "Validador" || Pagamento === "Cartão e Validador" ? (
        <Button
          style={{ margin: "8px !important" }}
          className="modal-trigger"
          href="#valida"
          node="button"
          disabled={ativar}
        >
          Validador
        </Button>
      ) : null}

      {shouldShowAddBebida(Pagamento, Maquina, Configuracao, Capacidade) ? (
        <OpenSelect />
      ) : null}
      {shouldShowInfo(Pagamento, Maquina) ? (
        <>
          <PadraoMod Padrao={Padrao} />
          <div className="YAlign">
            <p style={{ margin: "8px 0px 0px 8px" }}>
              {Configuracao.length}/<strong>{Capacidade}</strong> Bebidas
              adicionadas
            </p>
            <p style={{ margin: "8px 0px 0px 8px" }}>
              {Contenedor.length}/<strong>{MaxContenedores}</strong>{" "}
              Contenedores em uso
            </p>
          </div>
          <Dialog botao="?" title="Contenedores em uso">
            {Contenedor.map((cont) => (
              <p>{defineContenedor(cont)}</p>
            ))}
          </Dialog>
        </>
      ) : null}

      {/* Modal de detalhes do validador */}
      <Modal
        actions={[<CloseButton />]}
        bottomSheet={false}
        fixedFooter={false}
        header="Detalhes do Validador"
        id="valida"
        options={{
          dismissible: false,
          endingTop: "10%",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          opacity: 0.5,
          outDuration: 250,
          preventScrolling: true,
          startingTop: "4%",
        }}
      >
        <Switch
          checked={TipoValidador === "Ficha" ? true : false}
          id="Switch-11"
          offLabel="Moeda"
          onChange={(e) => {
            ChangeValidador(e.target.checked);
          }}
          onLabel="Ficha"
        />

        {TipoValidador === "Ficha"
          ? opcoesValidador[0].map((item) => (
              <>
                <br />
                <input
                  checked={shouldBeChecked(item, Validador)}
                  onChange={(e) => {
                    ChangeValidadorFichas(e.target.value);
                  }}
                  type="checkbox"
                  value={item}
                  key={item}
                />
                <Rotulo>Ficha de {item}</Rotulo>
              </>
            ))
          : opcoesValidador[1].map((item) => (
              <>
                <br />
                <input disabled={true} type="checkbox" value={item} checked />
                <Rotulo>R$ {item}</Rotulo>
              </>
            ))}
      </Modal>
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
