import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import Draggable from "react-draggable";

//Meio de comunicação
import { api } from "../../services/api";
//"Placeholder" da página enquanto dados são carregados no
import Loading from "../../components/loading_screen";

//import de elementos visuais
import { Toast } from "../../components/toasty";
import { ChangeTab } from "../../global/actions/ComprasAction";
import { Table } from "../../components/table";

import { Close, Block } from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";

function Pedidos(props) {
  const TabIndex = 3;

  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [pedidosAberto, setPedidosAberto] = useState([]);
  const [pedidosAtendidos, setPedidosAtendidos] = useState([]);
  const [pedidoDet, setPedidoDet] = useState({});

  const { ChangeTab } = props;

  //componentDidMount
  useEffect(() => {
    async function LoadData() {
      try {
        ChangeTab(TabIndex);

        const response = await api.get("/compras/pedidos");
        setPedidosAberto(response.data.PedidosAbertos);
        setPedidosAtendidos(response.data.PedidosFaturados);
        setLoaded(true);
      } catch (err) {
        Toast("Falha ao carregar pedidos", "error");
      }
    }
    LoadData();
  }, [ChangeTab]);

  const handleLoadDet = async (pedido) => {
    setOpen(true);
    try {
      const response = await api.get(
        `/compras/pedidos/detalhes/${pedido.Pedido}/${pedido.Status}`
      );
      setPedidoDet(response.data);
    } catch (err) {
      setPedidoDet({});
      Toast("Não foi possivel recuperar os detalhes desse pedido", "error");
    }
  };

  const handleCloseDialog = () => {
    setPedidoDet({});
    setOpen(false);
  };

  const handleCancel = async (ID, event) => {
    event.persist()
    event.target.disable = true;
    try {
      await api.delete(`/compras/pedidos/cancelar/${ID}`);

      Toast("Pedido cancelado", "success");
    } catch (err) {
      event.target.disable = false;
      Toast("Falha ao cancelar pedido", "error");
    }
  };

  return !loaded ? (
    <Loading />
  ) : (
    <div
      className="XAlign"
      style={{
        width: "100%",
        height: "100%",
        flexWrap: "wrap !important",
        alignItems: "flex-start",
      }}
    >
      <Dialog
        open={open}
        onClose={() => handleCloseDialog()}
        PaperComponent={PaperComponent}
        TransitionComponent={Transition}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Detalhes do Pedido
        </DialogTitle>
        <DialogContent>
          <div className="XAlign" style={{ justifyContent: "space-between" }}>
            <Typography gutterBottom variant="subtitle1">
              <strong>
                {pedidoDet.Status === "Faturado" ? "Emissão" : "Solicitação"}
              </strong>
              :{" "}
              {typeof pedidoDet.Data != "undefined"
                ? moment(pedidoDet.Data).format("L")
                : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              <strong>Transportadora:</strong>{" "}
              {pedidoDet.Transportadora === null
                ? "?"
                : pedidoDet.Transportadora}
            </Typography>
          </div>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={
                typeof pedidoDet.Detalhes != "undefined"
                  ? pedidoDet.Detalhes
                  : []
              }
              columns={columns}
              autoPageSize
              disableSelectionOnClick
              disableColumnMenu
              loading={typeof pedidoDet.Detalhes == "undefined"}
            />
          </div>
        </DialogContent>
        <DialogActions>
          {pedidoDet.Status === "Processando" ? (
            <Button
              color="primary"
              onClick={(e) => handleCancel(pedidoDet.PedidoId, e)}
              startIcon={<Block />}
            >
              Cancelar Pedido
            </Button>
          ) : null}

          <Button
            color="primary"
            onClick={handleCloseDialog}
            startIcon={<Close />}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Solicitado | Faturado</StyledTableCell>
              <StyledTableCell>Nº Pedido</StyledTableCell>
              <StyledTableCell>NF</StyledTableCell>
              <StyledTableCell>Série</StyledTableCell>
              <StyledTableCell>Qtd. Items</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidosAberto.map((pedido) => (
              <StyledTableRow onClick={() => handleLoadDet(pedido)}>
                <StyledTableCell>{pedido.Status}</StyledTableCell>
                <StyledTableCell>
                  {moment(pedido.Solicitacao).format("L")}
                </StyledTableCell>
                <StyledTableCell>{pedido.Pedido}</StyledTableCell>
                <StyledTableCell>{pedido.NF}</StyledTableCell>
                <StyledTableCell>{pedido.Serie}</StyledTableCell>
                <StyledTableCell>{pedido.QtItems}</StyledTableCell>
                <StyledTableCell>
                  {currencyFormat(pedido.Total)}
                </StyledTableCell>
              </StyledTableRow>
            ))}

            {pedidosAtendidos.map((pedido) => (
              <StyledTableRow onClick={() => handleLoadDet(pedido)}>
                <StyledTableCell>{pedido.Status}</StyledTableCell>
                <StyledTableCell>
                  {moment(pedido.Faturado).format("L")}
                </StyledTableCell>
                <StyledTableCell>{pedido.Pedido}</StyledTableCell>
                <StyledTableCell>{pedido.NF}</StyledTableCell>
                <StyledTableCell>{pedido.Serie}</StyledTableCell>
                <StyledTableCell>{pedido.QtItems}</StyledTableCell>
                <StyledTableCell>
                  {currencyFormat(pedido.Total)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const mapStateToProps = (store) => ({
  State: store.CompraReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ChangeTab,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Pedidos);
//estilo célula
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

//estilo linha
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    "&:hover": {
      transition: "150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      backgroundColor: "#CCC",
      cursor: "pointer",
    },
  },
}))(TableRow);

const currencyFormat = (currency) => {
  if (
    currency !== null &&
    String(currency).trim() !== "" &&
    typeof currency != "undefined"
  ) {
    return Number.parseFloat(currency).toFixed(2);
  } else {
    return "0.00";
  }
};

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow {...props} />;
});

const columns = [
  { field: "id", headerName: "Código", width: 100, editable: false },
  {
    field: "Produto",
    headerName: "Produto",
    flex: 1,
    editable: false,
  },
  {
    field: "UN",
    headerName: "Un",
    width: 50,
    editable: false,
    sortable: false,
  },
  {
    field: "Quantidade",
    headerName: "Quantidade",
    type: "number",
    width: 125,
    editable: false,
  },
  {
    field: "VlrUn",
    headerName: "Valor Unitário",
    type: "number",
    sortable: false,
    width: 130,
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
