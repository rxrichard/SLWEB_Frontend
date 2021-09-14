import React, { useEffect, useState } from "react";
import Input from "react-number-format";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { api } from "../../services/api";
import Draggable from "react-draggable";

import { DataGrid } from "@material-ui/data-grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { ShoppingCart, Add } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import MenuAbas from "../../components/materialComponents/PainelAbas";
import Loading from "../../components/loading_screen";
import { Panel } from "../../components/commom_in";

import {
  LoadInsumos,
  UpdateCarrinho,
  UpdateProdutos,
  SetBuyQtt,
  SetCheckedProd,
  ClearCarrinho,
  DestroyStore,
  LoadClientes,
  LoadPagamentos
} from "../../global/actions/VendasAction";
import Vender from "./Vender";
import Pedidos from "./Pedidos";

function Vendas(props) {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const {
    LoadInsumos,
    UpdateCarrinho,
    SetBuyQtt,
    SetCheckedProd,
    UpdateProdutos,
    ClearCarrinho,
    DestroyStore,
    LoadClientes,
    LoadPagamentos
  } = props;
  const { TabIndex, Produtos, Checked, Carrinho } = props.State;

  const CarrinhoFormatado = fromStore2Datagrid(Carrinho);

  //componentDidMount
  useEffect(() => {
    async function Load() {
      const response = await api.get("/vendas/produtos");

      LoadInsumos(response.data.Produtos);
      LoadClientes(response.data.Clientes);
      LoadPagamentos(response.data.CodPag)
      setLoaded(true);
    }
    Load();
  }, [LoadInsumos, LoadClientes, LoadPagamentos]);

  //componentWillUnmount
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

  const transitionDuration = {
    appear: 300,
    enter: 300,
    exit: 300,
  };

  return !loaded ? (
    <Loading />
  ) : (
    <Panel
      style={{
        overflow: "auto",
        alignContent: "center",
        padding: "0px",
        justifyContent: "flex-start",
      }}
    >
      <MenuAbas titles={["Vender", "Vendas"]}>
        <Vender />
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
              <strong>Total da Venda:</strong> R${totalPedido(Carrinho)}
            </Typography>
          </div>
          <div style={{ height: 400, width: "100%" }}>
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
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => alert("venda gravada")} color="primary">
            Gravar Venda
          </Button>
          <Button
            disabled={CarrinhoMarcados(Carrinho, Checked) > 0 ? false : true}
            onClick={() => UpdateProdutos()}
            color="primary"
          >
            Remover do Carrinho
          </Button>
          <Button onClick={() => ClearCarrinho()} color="primary">
            Limpar Carrinho
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
          in={TabIndex === 1 && ProdutosMarcados(Produtos, Checked) > 0}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              TabIndex === 1 ? transitionDuration.exit : 0
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
              TabIndex === 1 ? transitionDuration.exit : 0
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
  State: store.VendaState,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      LoadInsumos,
      UpdateCarrinho,
      SetBuyQtt,
      SetCheckedProd,
      UpdateProdutos,
      ClearCarrinho,
      DestroyStore,
      LoadClientes,
      LoadPagamentos
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Vendas);

const ProdutosMarcados = (ProdList, Marcados) => {
  let count = 0;
  ProdList.forEach((prod) =>
    Marcados.indexOf(prod.ProdId[0]) !== -1 ? count++ : null
  );

  return count;
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -4,
    top: -4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

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

const totalPedido = (carrinho) => {
  let aux = 0;

  carrinho.forEach((item) => {
    aux += Number.parseFloat(item.VVenda).toFixed(4) * item.QVenda;
  });

  return Number.parseFloat(aux).toFixed(2);
};

const fromStore2Datagrid = (carrinho) => {
  const aux = [];

  carrinho.forEach((item) => {
    aux.push({
      id: item.ProdId[0],
      Produto: item.Produto,
      Quantidade: item.QVenda,
      Vlr: item.VVenda,
      Conversao: item.FatConversao,
    });
  });

  return aux;
};

const columns = [
  { field: "id", headerName: "Cod", width: 80, editable: false },
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
        allowLeadingZeros={false}
        allowEmptyFormatting={false}
        allowNegative={false}
        fixedDecimalScale={true}
        isNumericString
        prefix=""
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
    field: "Vlr",
    headerName: "Valor Un.",
    type: "number",
    hasFocus: true,
    width: 110,
    editable: true,
    renderEditCell: (params) => (
      <Input
        autoFocus={true}
        decimalScale={4}
        fixedDecimalScale={false}
        isNumericString
        prefix=""
        allowLeadingZeros={false}
        allowEmptyFormatting={false}
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
    field: "VlrTotal",
    headerName: "Valor Total",
    type: "number",
    description: "Cálculo do Valor Unitário x Quantidade",
    width: 120,
    valueGetter: (params) =>
      params.getValue(params.id, "Quantidade") *
      params.getValue(params.id, "Vlr"),
  },
];

const CarrinhoMarcados = (CarrinhoList, Marcados) => {
  let count = 0;
  CarrinhoList.forEach((prod) =>
    Marcados.indexOf(prod.ProdId[0]) !== -1 ? count++ : null
  );

  return count;
};
