import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Add from "@material-ui/icons/Add";

import Input from "./_InputValor";
import { Toast, ToastyContainer } from "../../../components/toasty";
import { clickButton } from "../../../global/actions/SolicitacaoAction";
import Select from "../../../components/materialComponents/Select";
import { RED_PRIMARY } from '../../../components/colors'

function DialogSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [id, setId] = useState("");
  const [selecao, setSelecao] = useState("");
  const [bebida, setBebida] = useState("");
  const [medida, setMedida] = useState("");
  const [tipo, setTipo] = useState("");
  const [contenedor, setContenedor] = useState("");
  const [configura, setconfigura] = useState("");
  const [valor, setValor] = useState("");
  const [valor2, setValor2] = useState("");

  const [bebidaSelecionada, setBebidaSelecionada] = useState(null);
  const [BebidasDisponiveisFiltradas, setBebidasDisponiveisFiltradas] =
    useState([]);

  const { clickButton } = props;

  const {
    Pagamento,
    Capacidade,
    Configuracao,
    BebidasDisponiveis,
    MaxContenedores,
    Contenedor,
  } = props.State;

  const handleClickOpen = () => {
    setOpen(true);
    setBebidasDisponiveisFiltradas(
      showBebidaDisponivel(BebidasDisponiveis, MaxContenedores, Contenedor)
    );
  };

  const handleClose = () => {
    setOpen(false);
    setId("");
    setSelecao("");
    setBebida("");
    setMedida("");
    setTipo("");
    setconfigura("");
    setValor("");
    setValor2("");
  };

  const chooseBebida = (e) => {
    let cont = e.target.value;

    if (typeof cont != "undefined" && cont !== "") {
      setBebidaSelecionada(BebidasDisponiveisFiltradas[cont]);
      setBebida(BebidasDisponiveisFiltradas[cont].Bebida);
      setId(String(BebidasDisponiveisFiltradas[cont].Cod).trim());
      setMedida("");
      setTipo("");
      setconfigura("");
    } else {
      setBebidaSelecionada(null);
      setId("");
      setBebida("");
      setMedida("");
      setTipo("");
      setconfigura("");
    }
  };

  const handleConfirm = () => {
    if (
      id === "" ||
      selecao === "" ||
      bebida === "" ||
      medida === "" ||
      tipo === "" ||
      configura === "" ||
      (Pagamento !== "Livre" && (valor === "" || String(valor) === String(0) || typeof valor == 'undefined'))
    ) {
      Toast("Selecione todos os campos");
      return;
    }
    const linha = {
      id,
      selecao,
      bebida,
      medida,
      tipo,
      contenedor,
      configura,
      valor: Number(valor.replace(/,/g, ".")),
      valor2: Number(valor2.replace(/,/g, ".")),
    };
    clickButton(linha);
    handleClose();
  };

  return (
    <div>
      <ToastyContainer />
      <Button
        variant="contained"
        disabled={props.disabled}
        color="secondary"
        size="large"
        className={classes.button}
        startIcon={<Add />}
        onClick={handleClickOpen}
      >
        Adicionar Bebida
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Configurar bebida</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <Select
              onChange={(e) => setSelecao(e.target.value)}
              label="Seleção"
            >
              {createSelecoes(Capacidade, Configuracao)}
            </Select>

            <Select onChange={(e) => chooseBebida(e)} label="Bebida">
              {BebidasDisponiveisFiltradas.map((bebida, i) => (
                <MenuItem value={i}>{bebida.Bebida}</MenuItem>
              ))}
            </Select>

            <Select
              value={medida}
              disabled={bebida === "" ? true : false}
              onChange={(e) => setMedida(e.target.value)}
              label="Medida"
            >
              {bebidaSelecionada
                ? bebidaSelecionada.Qtd.map((Qtd, i) => (
                    <MenuItem value={Qtd}>{`${Qtd}ML`}</MenuItem>
                  ))
                : null}
            </Select>
            <Select
              value={tipo}
              disabled={bebida === "" ? true : false}
              onChange={(e) => {
                setTipo(e.target.value);
                setContenedor(
                  e.target.value === "Mistura"
                    ? bebidaSelecionada.ContMist
                    : bebidaSelecionada.ContPronto
                );
              }}
              label="Tipo"
            >
              {bebidaSelecionada ? (
                bebidaSelecionada.Mistura ? (
                  <MenuItem value="Mistura">Mistura</MenuItem>
                ) : null
              ) : null}
              {bebidaSelecionada ? (
                bebidaSelecionada.Pronto ? (
                  <MenuItem value="Pronto">Pronto</MenuItem>
                ) : null
              ) : null}
            </Select>

            <Select
              label="Ativa?"
              value={configura}
              onChange={(e) => setconfigura(e.target.value)}
            >
              <MenuItem value={true}>Sim</MenuItem>
              <MenuItem value={false}>Não</MenuItem>
            </Select>

            <Input
              onChange={(e) => setValor(e.target.value)}
              label="Valor Real"
              value={valor}
              />

            <Input
              onChange={(e) => setValor2(e.target.value)}
              label="Valor Repasse"
              value={valor2}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ clickButton }, dispatch);

const mapStateToProps = (store) => ({
  State: store.solicitacaoState,
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogSelect);

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: RED_PRIMARY,
    height: '54px'
  },
}));

const createSelecoes = (Capacidade, Configuracao) => {
  const array = [];
  const selecoes = [];

  Configuracao.map((bebida) => array.push(bebida.selecao));

  for (let i = 1; i <= Capacidade; i++) {
    if (array.indexOf(i) < 0) {
      selecoes.push(<MenuItem value={i}>{i}</MenuItem>);
    }
  }
  return selecoes;
};

const showBebidaDisponivel = (
  BebidasDisponiveis,
  MaxContenedores,
  Contenedor
) => {
  const ContenedoresDisponiveis = MaxContenedores - Contenedor.length;
  let BebidasFiltradas = [];
  let contenedoresNecessários = [];
  let requisitos = true;
  let contador = 0;

  if (ContenedoresDisponiveis === 0) {
    //retornar uma lista das bebidas e medidas q podem ser feitas com todos contenedores já em uso
    BebidasDisponiveis.map((bebida) => {
      if (bebida.Bebida === "ÁGUA QUENTE") {
        BebidasFiltradas.push(bebida);
        return null;
      }

      if (Contenedor.indexOf(bebida.ContPronto) < 0) {
        bebida.Pronto = false;
      }else{
        bebida.Pronto = true;
      }
      contenedoresNecessários = JSON.parse(
        "[" + String(bebida.ContMist).replace(/0/g, ",") + "]"
      );

      contenedoresNecessários.map((req) => {
        if (req !== null && Contenedor.indexOf(req) < 0) {
          requisitos = false;
        }
        return null;
      });
      if (!requisitos) {
        bebida.Mistura = false;
      }

      requisitos = true;

      if (!bebida.Mistura && !bebida.Pronto) {
        return null;
      } else {
        BebidasFiltradas.push(bebida);
        return null;
      }
    });
  } else {
    //retorna a lista de bebidas e medidas que podem ser feitas adicionando ou não mais contenedores
    BebidasDisponiveis.map((bebida) => {
      if (bebida.Bebida === "ÁGUA QUENTE") {
        BebidasFiltradas.push(bebida);
        return null;
      }
      contenedoresNecessários = JSON.parse(
        "[" + String(bebida.ContMist).replace(/0/g, ",") + "]"
      );

      contenedoresNecessários.map((req) => {
        if (req !== null && Contenedor.indexOf(req) < 0) {
          contador++;
          requisitos = false;
        } else if (req === null) {
          contador = 100;
          requisitos = false;
        }
        return null;
      });

      if (requisitos) {
        bebida.Mistura = true;
      } else if (contador <= ContenedoresDisponiveis) {
        bebida.Mistura = true;
      } else {
        bebida.Mistura = false;
      }

      contador = 0;
      requisitos = true;

      if (!bebida.Mistura && !bebida.Pronto) {
        return null;
      } else {
        BebidasFiltradas.push(bebida);
        return null;
      }
    });
  }

  return BebidasFiltradas;
};
