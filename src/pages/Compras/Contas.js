import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

//Meio de comunicação
import { api } from "../../services/api";
//"Placeholder" da página enquanto dados são carregados no
import Loading from "../../components/loading_screen";

//import de elementos visuais
import { Toast } from "../../components/toasty";
import { ChangeTab, SetMin, SetRetira } from "../../global/actions/ComprasAction";

import { withStyles } from "@material-ui/core/styles";
import { Table } from "../../components/table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

function Contas(props) {
  const TabIndex = 1;

  const [loaded, setLoaded] = useState(false);
  const [ResumoCompras, setResumo] = useState([]);
  const [Duplicatas, setDuplicatas] = useState([]);
  const [TotalDuplicatas, setTotalDuplicatas] = useState([]);
  const [TotalAno, setTotalAno] = useState([]);

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
        setLoaded(true);
        SetMin(response.data.Geral.VlrMinCompra)
        SetRetira(response.data.Geral.Retira)
      } catch (err) {
        Toast("Falha ao recuperar dados", "error");
      }
    }
    loadProdutos();
  }, [ChangeTab, SetMin, SetRetira]);

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
      <Typography variant="h6">Total Mensal</Typography>
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
            <StyledTableRow>
              <StyledTableCell>{currencyFormat(TotalAno["1"])}</StyledTableCell>
              <StyledTableCell>{currencyFormat(TotalAno["2"])}</StyledTableCell>
              <StyledTableCell>{currencyFormat(TotalAno["3"])}</StyledTableCell>
              <StyledTableCell>{currencyFormat(TotalAno["4"])}</StyledTableCell>
              <StyledTableCell>{currencyFormat(TotalAno["5"])}</StyledTableCell>
              <StyledTableCell>{currencyFormat(TotalAno["6"])}</StyledTableCell>
              <StyledTableCell>{currencyFormat(TotalAno["7"])}</StyledTableCell>
              <StyledTableCell>{currencyFormat(TotalAno["8"])}</StyledTableCell>
              <StyledTableCell>{currencyFormat(TotalAno["9"])}</StyledTableCell>
              <StyledTableCell>
                {currencyFormat(TotalAno["10"])}
              </StyledTableCell>
              <StyledTableCell>
                {currencyFormat(TotalAno["11"])}
              </StyledTableCell>
              <StyledTableCell>
                {currencyFormat(TotalAno["12"])}
              </StyledTableCell>
            </StyledTableRow>
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
        <div>
          <Typography variant="h6">Duplicatas</Typography>
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
                {Duplicatas.map((dup) => {
                  return (
                    <StyledTableRow
                      style={{
                        background:
                          moment(dup.DtVenc) < moment() ? "#ff4747" : null,
                      }}
                      key={dup.E1_NUM}
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
                        {moment(dup.DtEmissao).format("L")}
                      </StyledTableCell>
                      <StyledTableCell>
                        {moment(dup.DtVenc).format("L")}
                      </StyledTableCell>
                      <StyledTableCell>
                        {currencyFormat(dup.E1_VALOR)}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <Typography variant="h6">Balanço</Typography>
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
                <StyledTableRow>
                  <StyledTableCell
                    style={{
                      background:
                        ResumoCompras.Bloqueado === "S" ? "#ff4747" : null,
                    }}
                  >
                    {ResumoCompras.Bloqueado}
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
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>

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
                  <StyledTableRow>
                    <StyledTableCell>{total.E1_TIPO}</StyledTableCell>
                    <StyledTableCell
                      style={{
                        background:
                          currencyFormat(total.vencido) > 0 ? "#ff4747" : null,
                      }}
                    >
                      {currencyFormat(total.vencido)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {currencyFormat(total.avencer)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {currencyFormat(total.vencido + total.avencer)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
      SetRetira
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
  let aux = [];
  let cont = true;
  const hoje = moment();

  duplicatas.forEach((dup) => {
    for (let i = 0; i < aux.length; i++) {
      if (dup.E1_TIPO[0] === aux[i].E1_TIPO) {
        if (moment(dup.DtVenc) >= hoje) {
          aux[i].avencer += dup.E1_VALOR;
        } else {
          aux[i].vencido += dup.E1_VALOR;
        }
        cont = false;
        break;
      }
    }

    if (cont) {
      aux.push({
        E1_TIPO: dup.E1_TIPO[0],
        avencer: moment(dup.DtVenc) >= hoje ? dup.E1_VALOR : 0,
        vencido: moment(dup.DtVenc) < hoje ? dup.E1_VALOR : 0,
      });
    }
    cont = true;
  });

  return aux;
};

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
