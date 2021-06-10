import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Close from "@material-ui/icons/Close";

import { clickRemove } from '../../../global/actions/index'

//estilo
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

//component
function CustomizedTable(props) {
  const classes = useStyles();

  const { Configuracao, TipoValidador, Pagamento } = props.State

  const { clickRemove } = props;

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        aria-label="customized table"
        size="small"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Seleção</StyledTableCell>
            <StyledTableCell>Bebida</StyledTableCell>
            <StyledTableCell>Medida</StyledTableCell>
            <StyledTableCell>Preço</StyledTableCell>
            <StyledTableCell>Tipo</StyledTableCell>
            <StyledTableCell>Ativa</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Configuracao.map((row, i) => (
            <StyledTableRow key={row.selecao}>
              <StyledTableCell>{row.selecao}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.bebida}
              </StyledTableCell>

              <StyledTableCell>{`${row.medida}ML`}</StyledTableCell>
              <StyledTableCell>{formataPreço(row.valor, TipoValidador, Pagamento)}</StyledTableCell>
              <StyledTableCell>{row.tipo}</StyledTableCell>
              <StyledTableCell>{row.configura ? "Sim":"Não"}</StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="outlined"
                  color="default"
                  size="large"
                  className={classes.button}
                  startIcon={<Close />}
                  onClick={() => clickRemove(i)}
                >
                  Remover
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (store) => ({
  State: store.solicitacaoState
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ clickRemove }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedTable);

//estilo celula
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
  },
}))(TableRow);

const formataPreço = (valor, TipoValidador, Pagamento) => {
  if(Pagamento === 'Livre'){
    return 'LIVRE'
  }else if(TipoValidador === 'Ficha'){
    return `${valor} Ficha`
  }else{
    return `R$ ${valor}`
  }
}