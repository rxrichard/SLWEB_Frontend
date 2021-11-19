import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { saveAs } from "file-saver";

//Meio de comunicação
import { api } from "../../services/api";

//"Placeholder" da página enquanto dados são carregados no
import Loading from "../../components/loading_screen";

//import de elementos visuais
import { Toast } from "../../components/toasty";
import {
  ChangeTab,
  SetMin,
  SetRetira,
} from "../../global/actions/ComprasAction";


import { withStyles } from "@material-ui/core/styles";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";



import { Table } from "../../components/table";
import Modal from './ContasModal'

const Contas = (props) => {
  const TabIndex = 1;

  const [open, setOpen] = useState(false);
  const [wait, setWait] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ResumoCompras, setResumo] = useState([]);
  const [Duplicatas, setDuplicatas] = useState([]);
  const [aFaturar, setAFaturar] = useState(null);
  const [TotalDuplicatas, setTotalDuplicatas] = useState([]);
  const [TotalAno, setTotalAno] = useState([]);
  const [pedidoDet, setPedidoDet] = useState({});

  const { ChangeTab, SetMin, SetRetira } = props;

  //component did mount
  useEffect(() => {
    async function loadProdutos() {
      try {
        ChangeTab(TabIndex);

        const response = await api.get("/compras/contas");
        setResumo(response.data.Geral);
        setDuplicatas(response.data.Duplicatas);
        setTotalDuplicatas(DefineTotalDuplicatas(response.data.Duplicatas));
        setTotalAno(response.data.ComprasAno[0]);
        setAFaturar(response.data.AFaturar[0].Total);
        setLoaded(true);
        SetMin(response.data.Geral.VlrMinCompra);
        SetRetira(response.data.Geral.Retira);
      } catch (err) {

      }
    }
    loadProdutos();
  }, [ChangeTab, SetMin, SetRetira]);

  const handleLoadDet = async (DOC) => {
    setOpen(true);
    try {
      const response = await api.get(`/compras/pedidos/detalhes/${DOC}/DOC`);
      setPedidoDet(response.data);
    } catch (err) {
      setPedidoDet({});
    }
  };

  const handleRetriveBoleto = async (DOC) => {
    setWait(true);
    let toastId = null

    try {
      toastId = Toast('Buscando...', 'wait')

      const response = await api.get(`/compras/retrivepdf/${DOC}`, {
        responseType: "arraybuffer",
      });

      //quando não encontra o documento retorna um arraybuffer de 5 bytes(false)
      if (response.data.byteLength > 28) {
        Toast('Encontrado!', 'update', toastId, 'success')
        //Converto a String do PDF para BLOB (Necessario pra salvar em pdf)
        const blob = new Blob([response.data], { type: "application/pdf" });

        //Salvo em PDF junto com a data atual, só pra não sobreescrever nada
        saveAs(blob, `BOLETO_NF_${DOC}.pdf`);
        setWait(false);
      } else {
        Toast('Documento não encontrado', 'update', toastId, 'error')
        setWait(false);
      }
    } catch (err) {

      setWait(false);
    }
  };

  const handleCloseDialog = () => {
    setPedidoDet({});
    setOpen(false);
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
      <Modal
        open={open}
        onClose={handleCloseDialog}
        Detalhes={pedidoDet}
        Cooldown={wait}
        onRequestBoleto={(DOC) => handleRetriveBoleto(DOC)}
      />
      <Typography variant="h5" gutterBottom>
        Total Mensal
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Jan</StyledTableCell>
              <StyledTableCell>Fev</StyledTableCell>
              <StyledTableCell>Mar</StyledTableCell>
              <StyledTableCell>Abr</StyledTableCell>
              <StyledTableCell>Mai</StyledTableCell>
              <StyledTableCell>Jun</StyledTableCell>
              <StyledTableCell>Jul</StyledTableCell>
              <StyledTableCell>Ago</StyledTableCell>
              <StyledTableCell>Set</StyledTableCell>
              <StyledTableCell>Out</StyledTableCell>
              <StyledTableCell>Nov</StyledTableCell>
              <StyledTableCell>Dez</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRowWithoutHighlight>
              <StyledTableCell
                style={{
                  "&:hover": {
                    transition: "150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    backgroundColor: "#CCC",
                    cursor: "default",
                  },
                }}
              >
                {TotalAno && currencyFormat(TotalAno["1"])}
              </StyledTableCell>
              <StyledTableCell>
                {TotalAno && currencyFormat(TotalAno["2"])}
              </StyledTableCell>
              <StyledTableCell>
                {TotalAno && currencyFormat(TotalAno["3"])}
              </StyledTableCell>
              <StyledTableCell>
                {TotalAno && currencyFormat(TotalAno["4"])}
              </StyledTableCell>
              <StyledTableCell>
                {TotalAno && currencyFormat(TotalAno["5"])}
              </StyledTableCell>
              <StyledTableCell>
                {TotalAno && currencyFormat(TotalAno["6"])}
              </StyledTableCell>
              <StyledTableCell>
                {TotalAno && currencyFormat(TotalAno["7"])}
              </StyledTableCell>
              <StyledTableCell>
                {TotalAno && currencyFormat(TotalAno["8"])}
              </StyledTableCell>
              <StyledTableCell>
                {TotalAno && currencyFormat(TotalAno["9"])}
              </StyledTableCell>
              <StyledTableCell>
                {TotalAno && currencyFormat(TotalAno["10"])}
              </StyledTableCell>
              <StyledTableCell>
                {TotalAno && currencyFormat(TotalAno["11"])}
              </StyledTableCell>
              <StyledTableCell>
                {TotalAno && currencyFormat(TotalAno["12"])}
              </StyledTableCell>
            </StyledTableRowWithoutHighlight>
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ marginTop: "16px" }}>
          <Typography variant="h5" gutterBottom>
            Duplicatas
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>NF</StyledTableCell>
                  <StyledTableCell>Parcela</StyledTableCell>
                  <StyledTableCell>Tipo</StyledTableCell>
                  <StyledTableCell>Descrição</StyledTableCell>
                  <StyledTableCell>Emissão</StyledTableCell>
                  <StyledTableCell>Vencimento</StyledTableCell>
                  <StyledTableCell>Valor</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Duplicatas.length > 0 ? (
                  Duplicatas.map((dup) => {
                    return (
                      <StyledTableRow
                        style={{
                          background:
                            !moment().utc().isSameOrBefore(moment(dup.DtVenc).utc(), 'day') ? "#ff4747" : null,
                        }}
                        key={dup.E1_NUM}
                        onClick={() => handleLoadDet(dup.E1_NUM)}
                      >
                        <StyledTableCell>{dup.E1_NUM}</StyledTableCell>
                        <StyledTableCell>
                          {String(dup.E1_PARCELA).trim() === ""
                            ? 1
                            : dup.E1_PARCELA}
                        </StyledTableCell>
                        <StyledTableCell>{dup.E1Desc}</StyledTableCell>
                        <StyledTableCell>{dup.E1_TIPO[0]}</StyledTableCell>
                        <StyledTableCell>
                          {moment(dup.DtEmissao).utc().format("L")}
                        </StyledTableCell>
                        <StyledTableCell>
                          {moment(dup.DtVenc).utc().format("L")}
                        </StyledTableCell>
                        <StyledTableCell>
                          {currencyFormat(dup.E1_VALOR)}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                ) : (
                  <StyledTableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ marginTop: "16px" }}>
          <Typography variant="h5" gutterBottom>
            Balanço
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Bloqueado</StyledTableCell>
                  <StyledTableCell>Limite</StyledTableCell>
                  <StyledTableCell>Limite Extra</StyledTableCell>
                  <StyledTableCell>Compras</StyledTableCell>
                  <StyledTableCell>Saldo</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRowWithoutHighlight>
                  <StyledTableCell
                    style={{
                      background:
                        ResumoCompras.Bloqueado === "S" ? "#ff4747" : null,
                    }}
                  >
                    {ResumoCompras.Bloqueado === "S" ? "SIM" : "NÃO"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {currencyFormat(ResumoCompras.LimiteCredito)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {currencyFormat(ResumoCompras.LimExtraCredito)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {currencyFormat(ResumoCompras.Compras)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {currencyFormat(ResumoCompras.LimiteAtual)}
                  </StyledTableCell>
                </StyledTableRowWithoutHighlight>
              </TableBody>
            </Table>
          </TableContainer>

          {TotalDuplicatas.length > 0 || aFaturar ? (
            <>
              <Typography variant="h5" gutterBottom>
                Resumo
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Tipo</StyledTableCell>
                      <StyledTableCell>Vencida</StyledTableCell>
                      <StyledTableCell>A Vencer</StyledTableCell>
                      <StyledTableCell>Total</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {TotalDuplicatas.map((total) => (
                      <StyledTableRowWithoutHighlight>
                        <StyledTableCell>{total.Desc}</StyledTableCell>
                        <StyledTableCell
                          style={{
                            background:
                              currencyFormat(total.Vencido) > 0
                                ? "#ff4747"
                                : null,
                          }}
                        >
                          {currencyFormat(total.Vencido)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {currencyFormat(total.Avencer)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {currencyFormat(Number.parseFloat(total.Vencido) + Number.parseFloat(total.Avencer))}
                        </StyledTableCell>
                      </StyledTableRowWithoutHighlight>
                    ))}
                    {aFaturar ? (
                      <StyledTableRowWithoutHighlight>
                        <StyledTableCell>A Faturar</StyledTableCell>
                        <StyledTableCell>0,00</StyledTableCell>
                        <StyledTableCell>
                          {currencyFormat(aFaturar)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {currencyFormat(aFaturar)}
                        </StyledTableCell>
                      </StyledTableRowWithoutHighlight>
                    ) : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => ({
  State: store.CompraState,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ChangeTab,
      SetMin,
      SetRetira,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Contas);

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
const StyledTableRowWithoutHighlight = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    "&:hover": {
      transition: "150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      backgroundColor: "#CCC",
    },
  },
}))(TableRow);

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

const DefineTotalDuplicatas = (duplicatas = []) => {
  let duplicatasTotal = [];
  let achou = false

  duplicatas.forEach((dup) => {
    if (duplicatasTotal.length === 0) {
      duplicatasTotal.push({
        Desc: dup.E1Desc,
        Avencer: dup.Status === "Avencer" ? Number(dup.E1_VALOR) : 0,
        Vencido: dup.Status === "Avencer" ? 0 : Number(dup.E1_VALOR),
        Total: Number(dup.E1_VALOR),
      });
      return;
    }

    for (let i = 0; i < duplicatasTotal.length; i++) {

      if (duplicatasTotal[i].Desc === dup.E1Desc) {
        duplicatasTotal[i] = {
          ...duplicatasTotal[i],
          Avencer: dup.Status === "Avencer" ? Number(duplicatasTotal[i].Avencer) + Number(dup.E1_VALOR) : Number(duplicatasTotal[i].Avencer),
          Vencido: dup.Status === "Avencer" ? Number(duplicatasTotal[i].Vencido) : Number(duplicatasTotal[i].Vencido) + Number(dup.E1_VALOR),
          Total: Number(duplicatasTotal[i].Total) + Number(dup.E1_VALOR)
        }
        achou = true
        break;
      }
    }

    if (!achou) {
      duplicatasTotal.push({
        Desc: dup.E1Desc,
        Avencer: dup.Status === "Avencer" ? Number(dup.E1_VALOR) : 0,
        Vencido: dup.Status === "Avencer" ? 0 : Number(dup.E1_VALOR),
        Total: Number(dup.E1_VALOR),
      })
    }
    achou = false
  });

  return duplicatasTotal;
};

const currencyFormat = (currency) => {
  if (
    currency !== null &&
    String(currency).trim() !== "" &&
    typeof currency != "undefined"
  ) {
    return String(Number.parseFloat(currency).toFixed(2)).replace(".", ",");
  } else {
    return "0,00";
  }
};







