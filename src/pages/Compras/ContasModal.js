import React from 'react';
import Draggable from "react-draggable";
import moment from "moment";

import { Close, InsertDriveFile, Block, ListAlt } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Loading from "../../components/loading_screen";

function ContasModal(props) {
  const whichContentShow = () => {
    if (!props.Detalhes.PedidoId) {
      return (
        <Loading />
      )
    } else if (props.Detalhes.Detalhes?.length > 0) {
      return (
        <>
          <div className="XAlign" style={{ justifyContent: "space-between" }}>
            <div className="YAlign">
              <Typography gutterBottom variant="subtitle1">
                <strong>
                  {props.Detalhes.Status === "Faturado" ? "Emissão" : "Solicitação"}
                </strong>
                :{" "}
                {typeof props.Detalhes.Data != "undefined" && props.Detalhes.Data != null
                  ? moment(props.Detalhes.Data).utc().format("L")
                  : "Desconhecido"}
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                <strong>Transportadora:</strong>{" "}
                {props.Detalhes.Transportadora === null
                  ? "?"
                  : props.Detalhes.Transportadora}
              </Typography>
            </div>
            <Tooltip
              title={
                <label style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }} >
                  Baixar Boleto
                </label>
              }
              placement="top"
              arrow
              followCursor
            >
              <IconButton
                disabled={props.Cooldown}
                onClick={() => props.onRequestBoleto(props.Detalhes.PedidoId)}
                color="primary"
              >
                <InsertDriveFile />
              </IconButton>
            </Tooltip>
          </div>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={
                typeof props.Detalhes.Detalhes != "undefined"
                  ? props.Detalhes.Detalhes
                  : []
              }
              columns={columns}
              pageSize={5}
              hideFooter={props.Detalhes.Detalhes?.length > 5 ? false : true}
              disableSelectionOnClick={true}
              disableColumnMenu={true}
              loading={typeof props.Detalhes.Detalhes == "undefined"}
            />
          </div>
        </>
      )
    } else {
      return (<>
        <div className="XAlign" style={{ justifyContent: "flex-end" }}>
          <Tooltip
            title={
              <label style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }} >
                Baixar Boleto
              </label>
            }
            placement="top"
            arrow
            followCursor
          >
            <IconButton
              disabled={props.Cooldown}
              onClick={() => props.onRequestBoleto(props.Detalhes.PedidoId)}
              color="primary"
            >
              <InsertDriveFile />
            </IconButton>
          </Tooltip>
        </div>
        <div className="YAlign" style={{ height: 200, width: "100%", alignItems: 'center' }}>
          <Typography variant="h4">
            Cobrança de Royalties
          </Typography>
          <Typography variant="subtitle1">
            (15% sobre vendas anteriores ao mês referente)
          </Typography>
        </div>
      </>)
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      PaperComponent={PaperComponent}
      TransitionComponent={Transition}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        <div className='XAlign' style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
          <ListAlt />
          Detalhes do Pedido
        </div>
      </DialogTitle>
      <DialogContent>
        {whichContentShow()}
      </DialogContent>
      <DialogActions style={{ padding: '8px 24px' }}>
        <Button
          color="primary"
          onClick={() => props.onClose()}
          startIcon={<Close />}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContasModal;

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

export const capitalizeMonthFirstLetter = (month) => {
  return month.charAt(0).toUpperCase() + month.slice(1)
}

