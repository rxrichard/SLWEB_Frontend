import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { api } from "../../services/api";

import {
  makeStyles,
  useTheme,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { DataGrid, ptBR } from "@material-ui/data-grid";
import Fab from "@material-ui/core/Fab";
import { ShoppingCart, Add } from "@material-ui/icons";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import {
  LoadInsumos,
  DestroyStore,
  SetCheckedProd,
  SetBuyQtt,
  UpdateCarrinho,
  UpdateProdutos,
  ClearCarrinho,
} from "../../global/actions/ComprasAction";
import MenuAbas from "../../components/materialComponents/PainelAbas";
import Button from "@material-ui/core/Button";
import { Panel } from "../../components/commom_in";
import Comprar from "./Comprar";
import Contas from "./Contas";
import Pedidos from "./Pedidos";
import { Toast } from "../../components/toasty";
import Input from "react-number-format";
import InputMultline from "../../components/materialComponents/InputMultline";

const Tema = createMuiTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ptBR
);

function Compras(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [obs, setObs] = useState("");
  const [retira, setRetira] = useState(false);

  const {
    LoadInsumos,
    DestroyStore,
    SetBuyQtt,
    UpdateCarrinho,
    UpdateProdutos,
    SetCheckedProd,
    ClearCarrinho,
  } = props;

  const { TabIndex, Carrinho, Checked, Produtos } = props.State;

  const CarrinhoFormatado = fromStore2Datagrid(Carrinho);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  //component did mount
  useEffect(() => {
    async function loadProdutos() {
      try {
        const response = await api.get("/compras/produtos");
        LoadInsumos(response.data);
      } catch (err) {
        Toast("Falha ao recuperar produtos", "error");
      }
    }
    loadProdutos();
  }, [LoadInsumos]);

  //component will unmount
  useEffect(() => {
    return () => DestroyStore();
  }, [DestroyStore]);

  const updateChecked = (SelectedIDs) => {
    let naoMarcados = [];

    CarrinhoFormatado.forEach((prod) => {
      if (SelectedIDs.indexOf(prod.id) === -1) naoMarcados.push(prod.id);
    });

    let CheckedSemNaoMarcados = Checked.filter(
      (check) => naoMarcados.indexOf(check) === -1
    );

    // Basicamente: Carrinho U Checked - CarrinhoNãoMarcados
    const newChecked = [...CheckedSemNaoMarcados, ...SelectedIDs];
    SetCheckedProd(newChecked);
  };

  const handleBuy = () => {
    console.log({ Carrinho, obs, retira });
    //Vejo se o franqueado está bloqueado
    //aviso se o frete gratis vai ser possivel ou não
    //Vejo se o cara tem limite
    //verifico se o pedido está vazio

    //faço um alert perguntando se o cara confirma o pedido
  };

  return (
    <Panel
      style={{
        overflow: "auto",
        alignContent: "center",
        padding: "0px",
        justifyContent: "flex-start",
      }}
    >
      <MenuAbas titles={["Contas à Pagar", "Comprar", "Pedidos"]}>
        <Contas />
        <Comprar />
        <Pedidos />
      </MenuAbas>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Carrinho
        </DialogTitle>
        <DialogContent>
          <div className="XAlign" style={{ justifyContent: "space-between" }}>
            <Typography gutterBottom variant="subtitle1">
              <strong>Total do Pedido:</strong> R${totalPedido(Carrinho)}
            </Typography>

            <div className="YAlign" style={{ flex: "unset" }}>
              <Typography gutterBottom variant="subtitle1">
                <strong>Valor mínimo p/ frete grátis:</strong> R${" "}
                {MinFrete(undefined, retira)}
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={retira}
                    onChange={(e) => setRetira(e.target.checked)}
                    name="gilad"
                  />
                }
                label="Franqueado Retira"
              />
            </div>
          </div>
          <div style={{ height: 400, width: "100%" }}>
            <ThemeProvider theme={Tema}>
              <DataGrid
                className={classes.dataGrid}
                rows={CarrinhoFormatado}
                columns={columns}
                autoPageSize={true}
                disableSelectionOnClick={true}
                disableColumnMenu={true}
                checkboxSelection={true}
                onCellEditCommit={(params, event) => {
                  SetBuyQtt(params);
                }}
                onSelectionModelChange={(SelectedIDs) => {
                  updateChecked(SelectedIDs);
                }}
              />
            </ThemeProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <InputMultline
            onChange={(e) => setObs(e.target.value)}
            value={obs}
            label="Obs."
          />

          <Button onClick={() => handleBuy()} color="primary">
            Comprar
          </Button>
          <Button
            disabled={CarrinhoMarcados(Carrinho, Checked) > 0 ? false : true}
            onClick={() => UpdateProdutos()}
            color="primary"
          >
            Remover
          </Button>
          <Button onClick={() => ClearCarrinho()} color="primary">
            Limpar
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <div
        className="YAlign"
        style={{
          position: "absolute",
          right: "16px",
          bottom: "16px",
          alignItems: "unset",
        }}
      >
        <Zoom
          in={TabIndex === 2 && ProdutosMarcados(Produtos, Checked) > 0}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              TabIndex === 2 ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Fab
            variant="extended"
            onClick={() => UpdateCarrinho()}
            color="primary"
          >
            <StyledBadge
              badgeContent={ProdutosMarcados(Produtos, Checked)}
              color="primary"
            >
              <Add className={classes.extendedIcon} />
              Adicionar
            </StyledBadge>
          </Fab>
        </Zoom>

        <Zoom
          in={Carrinho.length > 0}
          timeout={transitionDuration}
          style={{
            marginTop: "8px",
            transitionDelay: `${
              TabIndex === 2 ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Fab
            variant="extended"
            onClick={() => {
              setOpen(true);
            }}
            color="primary"
          >
            <StyledBadge badgeContent={Carrinho.length} color="primary">
              <ShoppingCart className={classes.extendedIcon} />
              Carrinho
            </StyledBadge>
          </Fab>
        </Zoom>
      </div>
    </Panel>
  );
}

const mapStateToProps = (store) => ({
  State: store.CompraState,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      LoadInsumos,
      DestroyStore,
      SetCheckedProd,
      SetBuyQtt,
      UpdateCarrinho,
      UpdateProdutos,
      ClearCarrinho,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Compras);

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  dataGrid: {
    '& input[type="checkbox"]': {
      transform: "scale(0.5)",
    },
  },
  checkbox: {
    transform: "scale(0.4)",
  },
}));

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} style={{ width: "100%", maxWidth: "900px" }} />
    </Draggable>
  );
}

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -4,
    top: -4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const ProdutosMarcados = (ProdList, Marcados) => {
  let count = 0;
  ProdList.forEach((prod) =>
    Marcados.indexOf(prod.Cód) !== -1 ? count++ : null
  );

  return count;
};

const CarrinhoMarcados = (CarrinhoList, Marcados) => {
  let count = 0;
  CarrinhoList.forEach((prod) =>
    Marcados.indexOf(prod.Cód) !== -1 ? count++ : null
  );

  return count;
};

const fromStore2Datagrid = (carrinho) => {
  const aux = [];

  carrinho.forEach((item) => {
    aux.push({
      id: item.Cód,
      Produto: item.Produto,
      Quantidade: item.QCompra,
      Vlr: item.VlrUn,
      Conversao: item.FatConversao,
    });
  });

  return aux;
};

const totalPedido = (carrinho) => {
  let aux = 0;

  carrinho.forEach((item) => {
    aux +=
      Number.parseFloat(item.VlrUn).toFixed(4) *
      (item.FatConversao * item.QCompra);
  });

  return Number.parseFloat(aux).toFixed(2);
};

const MinFrete = (min = "999", retira) => {
  return retira ? "0.00" : min;
};

const columns = [
  { field: "id", headerName: "Código", width: 100, editable: false },
  {
    field: "Produto",
    headerName: "Produto",
    flex: 1,
    editable: false,
  },
  {
    field: "Quantidade",
    headerName: "Quantidade",
    type: "number",
    hasFocus: true,
    width: 125,
    editable: true,
    renderEditCell: (params) => (
      <Input
        autoFocus={true}
        decimalScale={0}
        fixedDecimalScale={true}
        isNumericString
        prefix=""
        allowNegative={false}
        onChange={(e) => {
          params.api.setEditCellValue(
            {
              id: params.id,
              field: params.field,
              value: Number(e.target.value),
            },
            e
          );
        }}
        value={params.value}
      />
    ),
  },
  {
    field: "VlrUn",
    headerName: "Valor Unitário",
    type: "number",
    sortable: false,
    width: 130,
    valueGetter: (params) =>
      params.getValue(params.id, "Vlr") *
      params.getValue(params.id, "Conversao"),
  },
  {
    field: "VlrTotal",
    headerName: "Valor Total",
    type: "number",
    description: "Cálculo do Valor Unitário x Quantidade",
    width: 130,
    valueGetter: (params) =>
      params.getValue(params.id, "Quantidade") *
      params.getValue(params.id, "VlrUn"),
  },
];
