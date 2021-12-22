import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { api } from "../../services/api";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import Fab from "@material-ui/core/Fab";
import { ShoppingCart, Add } from "@material-ui/icons";
import {
  Zoom,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Badge,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Tooltip,
} from "@material-ui/core/";

import Draggable from "react-draggable";

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
import { Panel } from "../../components/commom_in";
import Comprar from "./Comprar";
import Contas from "./Contas";
import Pedidos from "./Pedidos";
import { Toast } from "../../components/toasty";
import Input from "react-number-format";
import InputMultline from "../../components/materialComponents/InputMultline";
import { RED_PRIMARY } from "../../misc/colors";

function Compras(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [wait, setWait] = useState(false);
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

  const { TabIndex, Carrinho, Checked, Produtos, MinCompra, Retira } =
    props.State;

  const CarrinhoFormatado = fromStore2Datagrid(Carrinho);

  //component did mount
  useEffect(() => {
    async function loadProdutos() {
      try {
        const response = await api.get("/compras/produtos");
        LoadInsumos(response.data);
      } catch (err) {
        
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

  const handleBuy = async (event) => {
    const LoadDTO = {
      Items: Carrinho,
      Obs: obs,
      Retira: retira,
    };

    setWait(true);

    if (!verifyPedido(LoadDTO, retira, MinCompra)) {
      setWait(false);
      return;
    }

    let toastId = null;

    try {
      toastId = Toast("Aguarde...", "wait");

      await api.post("/compras/comprar", LoadDTO);

      Toast("Pedido incluído com sucesso!", "update", toastId, "success");
      ClearCarrinho();
      setObs("");
      setRetira(false);
      setWait(false);
    } catch (err) {
      Toast(
        'Falha ao incluir o pedido de compra, verifique a tela "Contas à Pagar"',
        "update",
        toastId,
        "error"
      );
      setWait(false);
    }
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
      <MenuAbas titles={["Contas a Pagar", "Comprar", "Pedidos realizados"]}>
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
          <div className="XAlign" style={{ justifyContent: "flex-start" }}>
            <ShoppingCart className={classes.extendedIcon} />
            Carrinho
          </div>
        </DialogTitle>

        <DialogContent>
          <div className="XAlign" style={{ justifyContent: "space-between" }}>
            {Retira ? (
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
            ) : null}

            <div className="YAlign" style={{ flex: "unset" }}>
              <Typography gutterBottom variant="subtitle1">
                <strong>Valor mínimo:</strong> R$ {MinFrete(MinCompra, retira)}
                <Typography gutterBottom variant="subtitle1">
                  <strong>Total do Pedido:</strong> R${totalPedido(Carrinho)}
                </Typography>
              </Typography>
            </div>
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
              pageSize={5}
              hideFooter={CarrinhoFormatado?.length > 5 ? false : true}
              onCellEditCommit={(params, event) => {
                SetBuyQtt(params);
              }}
              onSelectionModelChange={(SelectedIDs) => {
                updateChecked(SelectedIDs);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions style={{ padding: "8px 24px" }}>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <InputMultline
              style={{
                width: "100%",
                backgroundColor:
                  200 - obs.length < 0 ? "rgb(255, 0, 0, 0.5)" : "inherit",
              }}
              onChange={(e) => setObs(e.target.value)}
              value={obs}
              label={`Obs.(${200 - obs.length})`}
              fullWidth={true}
            />
          </Box>

          <Tooltip
            title={
              <label
                style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }}
              >
                Gravar pedido de compra
              </label>
            }
            placement="top"
            arrow
             
          >
            <Button
              disabled={wait}
              onClick={(e) => handleBuy(e)}
              color="primary"
            >
              Comprar
            </Button>
          </Tooltip>
          <Tooltip
            title={
              <label
                style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }}
              >
                Remove itens selecionados
              </label>
            }
            placement="top"
            arrow
             
          >
            <Button
              disabled={
                CarrinhoMarcados(Carrinho, Checked) > 0 && !wait ? false : true
              }
              onClick={() => UpdateProdutos()}
              color="primary"
            >
              Remover
            </Button>
          </Tooltip>
          <Tooltip
            title={
              <label
                style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }}
              >
                Remove todos os produtos do carrinho
              </label>
            }
            placement="top"
            arrow
             
          >
            <Button
              disabled={wait}
              onClick={() => ClearCarrinho()}
              color="primary"
            >
              Limpar
            </Button>
          </Tooltip>
          <Tooltip
            title={
              <label
                style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }}
              >
                Fechar carrinho
              </label>
            }
            placement="right"
            arrow
             
          >
            <Button
              disabled={wait}
              onClick={() => setOpen(false)}
              color="primary"
            >
              Fechar
            </Button>
          </Tooltip>
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
    marginLeft: "8px",
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
      Conversao: item.QtMin,
    });
  });

  return aux;
};

const totalPedido = (carrinho) => {
  let aux = 0;

  carrinho.forEach((item) => {
    aux +=
      Number.parseFloat(item.VlrUn).toFixed(4) * (item.QtMin * item.QCompra);
  });

  return String(Number.parseFloat(aux).toFixed(2)).replace('.', ',');
};

const MinFrete = (min, retira) => {
  return retira ? "0,00" : String(Number(min).toFixed(2)).replace('.', ',');
};

const verifyPedido = (pedido, retira, MinCompra) => {
  if (pedido.Items.length === 0) {
    Toast("Nenhum item no carrinho", "warn");
    return false;
  }

  for (let i = 0; i < pedido.Items.length; i++) {
    if (pedido.Items[i].QCompra === 0) {
      Toast(
        "Um ou mais produtos do carrinho não tem uma quantidade definida",
        "warn"
      );
      return false;
    }
  }

  if (pedido.Obs.length > 200) {
    Toast("Tamanho do campo Observações excede o limite", "warn");
    return false;
  }

  if (!retira && totalPedido(pedido.Items) < MinCompra) {
    Toast("Valor total do pedido é menor que o mínimo", "warn");
    return false;
  }

  return true;
};

const transitionDuration = {
  appear: 300,
  enter: 300,
  exit: 300,
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
    headerName: "Qtd",
    type: "number",
    hasFocus: true,
    width: 90,
    sortable: false,
    editable: true,
    renderCell: (params) => (
      <div
        style={{
          fontWeight: "bold",
          color: RED_PRIMARY,
        }}
      >
        {params.value}
      </div>
    ),
    renderEditCell: (params) => (
      <Input
        style={{
          fontWeight: "bold",
          color: RED_PRIMARY,
        }}
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
    headerName: "Valor Un.",
    type: "number",
    sortable: false,
    width: 90,
    valueGetter: (params) =>
      params.getValue(params.id, "Vlr") *
      params.getValue(params.id, "Conversao"),
  },
  {
    field: "VlrTotal",
    headerName: "Total",
    type: "number",
    sortable: false,
    description: "Cálculo do Valor Unitário x Quantidade",
    width: 90,
    valueGetter: (params) =>
      String(Number.parseFloat(
        params.getValue(params.id, "Quantidade") *
        params.getValue(params.id, "VlrUn"),
      ).toFixed(2)).replace('.', ',')
  },
];
