import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Input from './InputMoney'
import Selecao from './OpenSelect'

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("1", 159, 6.0, 24, 4.0),
];

//estilo
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

//component
export default function CustomizedTable() {
  const classes = useStyles();

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
            <StyledTableCell>Preço de máquina</StyledTableCell>
            <StyledTableCell>Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>

            <StyledTableRow key={0}>

              <StyledTableCell component="th" scope="row">
                <Selecao />
              </StyledTableCell>

              <StyledTableCell>
                <Input />
              </StyledTableCell>

              <StyledTableCell>
                
              </StyledTableCell>
            </StyledTableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}
