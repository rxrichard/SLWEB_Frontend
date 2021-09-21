import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { api } from "../../services/api";
import Draggable from "react-draggable";

import Grow from "@material-ui/core/Grow";
import {
  Close,
  InsertDriveFile,
  NoteAdd,
  Block,
  Edit,
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";

import { Table } from "../../components/table";
import Loading from "../../components/loading_screen";
import { Toast } from "../../components/toasty";

function Pedidos() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [pedidoDet, setPedidoDet] = useState([]);
  const [actualPedidoInfo, setActualPedidoInfo] = useState({});

  useEffect(() => {
    async function LoadData() {
      try {
        const response = await api.get("/vendas/pedidos");
        setPedidos(response.data.Pedidos);
        setLoaded(true);
      } catch (err) {
        Toast("Falha ao carregar histórico de pedidos", "error");
      }
    }
    LoadData();
  }, []);

  async function handleLoadDet(pedido) {
    setOpen(true);
    setActualPedidoInfo(pedido);
    try {
      const response = await api.get(
        `/vendas/pedidos/detalhes/${pedido.Serie_Pvc}/${pedido.Pvc_ID}`
      );

      setPedidoDet(response.data);
    } catch (err) {
      Toast("Não foi possivel recuperar informações do pedido", "error");
    }
  }

  const handleCloseDialog = () => {
    setActualPedidoInfo({});
    setPedidoDet([]);
    setOpen(false);
  };

  const handleCancel = () => {
    alert("cancelar NFe");
  };

  const handleRecoverNFE = () => {
    alert("recuperar NFe do nasajon");
  };

  const handleRequestNFE = () => {
    alert("solicitar NFe atravéz do Nasajonson");
  };

  const handleEditVenda = () => {
    alert("iniciar edição da venda(trocar colums do datagrid)");
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
              {PedidoDesc('V', 'F', 'Joãozinho', new Date())}
            </Typography>
            <div style={{ all: "unset" }}>
              <Tooltip title="Cancelar Pedido" placement="top">
                <IconButton onClick={(e) => handleCancel()} color="primary">
                  <Block />
                </IconButton>
              </Tooltip>
              <Tooltip title="Editar Venda" placement="top">
                <IconButton onClick={() => handleEditVenda()} color="secondary">
                  <Edit />
                </IconButton>
              </Tooltip>
              {actualPedidoInfo?.DOC ? (
                <Tooltip title="Baixar NFe" placement="top">
                  <IconButton
                    onClick={() => handleRecoverNFE()}
                    color="primary"
                  >
                    <InsertDriveFile />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Solicitar NFe" placement="top">
                  <IconButton
                    onClick={() => handleRequestNFE()}
                    color="primary"
                  >
                    <NoteAdd />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={PedidoDetToDatagrid(pedidoDet)}
              columns={columns}
              autoPageSize
              disableSelectionOnClick
              disableColumnMenu
              loading={pedidoDet.length === 0}
            />
          </div>
        </DialogContent>
        <DialogActions>
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
              <StyledTableCell>Emissão</StyledTableCell>
              <StyledTableCell>Cliente</StyledTableCell>
              <StyledTableCell>Série</StyledTableCell>
              <StyledTableCell>NF</StyledTableCell>
              <StyledTableCell>Tipo</StyledTableCell>
              <StyledTableCell>CNPJ</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((pedido) => (
              <StyledTableRow onClick={() => handleLoadDet(pedido)}>
                <StyledTableCell>{pedido.ST}</StyledTableCell>
                <StyledTableCell>
                  {moment(pedido.Emissao).format("l")}
                </StyledTableCell>
                <StyledTableCell>{pedido["Nome Fantasia"]}</StyledTableCell>
                <StyledTableCell>
                  {pedido.Serie_DOC ? pedido.Serie_DOC : pedido.Serie_Pvc}
                </StyledTableCell>
                <StyledTableCell>
                  {pedido.DOC ? pedido.DOC : pedido.Pvc_ID}
                </StyledTableCell>
                <StyledTableCell>{pedido.PVSDesc}</StyledTableCell>
                <StyledTableCell>{pedido.CNPJ}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

const mapStateToProps = (store) => ({
  State: store.VendaState,
});

export default connect(mapStateToProps, mapDispatchToProps)(Pedidos);

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

const PedidoDetToDatagrid = (pedidoDet) => {
  let aux = [];
  pedidoDet.map((det) =>
    aux.push({
      index: det.PvdID,
      id: det.ProdId,
      Produto: det.Produto,
      PvdQtd: det.PvdQtd,
      PvdVlrUnit: det.PvdVlrUnit,
      PvdVlrTotal: det.PvdVlrTotal,
    })
  );

  return aux;
};

const columns = [
  {
    field: "index",
    headerName: "Item",
    width: 90,
    editable: false,
    align: "center",
  },
  { field: "id", headerName: "Cód", width: 80, editable: false },
  {
    field: "Produto",
    headerName: "Produto",
    flex: 1,
    editable: false,
  },
  {
    field: "PvdQtd",
    headerName: "Qtd.",
    width: 60,
    editable: false,
    sortable: false,
    align: "right",
  },
  {
    field: "PvdVlrUnit",
    headerName: "Vlr. Un.",
    width: 90,
    editable: false,
    sortable: false,
    align: "right",
  },
  {
    field: "PvdVlrTotal",
    headerName: "Vlr. Total",
    width: 90,
    editable: false,
    sortable: false,
    align: "right",
  },
];

const PedidoDesc = (tipo, status, cliente, emissão) => {
  let Desc = "";

  switch (tipo) {
    case "V":
      Desc += "Venda ";
      break;
    case "R":
      Desc += "Remessa ";
      break;
    case "B":
      Desc += "Bonificação ";
      break;
    default:
      break;
  }

  switch (status) {
    case "F":
      Desc += "faturada para ";
      break;
    case "P":
      Desc += "gravada para ";
      break;
    case "S":
      Desc += "solicitada a nota para";
      break;
    default:
      break;
  }

  Desc += cliente.trim();
  Desc += ` em ${moment(emissão).format("LL")}`;

  return Desc;
};
