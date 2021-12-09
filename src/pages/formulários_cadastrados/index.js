import React, { useState, useEffect } from "react";
import moment from 'moment'
import { api } from "../../services/api";

import {
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  withStyles
} from '@material-ui/core'

import Loading from "../../components/loading_screen";
import { Panel } from "../../components/commom_in";
import { Table } from "../../components/table";

import Modal from "./modal/details";

const FormsAcompanhamento = () => {
  const [formularios, setFormularios] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get("/form/all");

        setLoaded(true)
        setFormularios(response.data);
      } catch (err) {

      }
    }
    loadData()
  }, [])

  return !loaded ? (
    <Loading />
  ) : (
    <Panel style={{ justifyContent: "flex-start", alignItems: "center" }}>
      <Typography variant="h5" gutterBottom>
        Formulários de interesse
      </Typography>
      <TableContainer component={Paper}>
        <Table
          hoverable={true}
          responsive={false}
          centered
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Código</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Preenchimento</StyledTableCell>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Inspecionar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formularios.map((form) => (
              <StyledTableRow key={form.CodCandidato}>
                <StyledTableCell align="center">{form.CodCandidato}</StyledTableCell>
                <StyledTableCell align="center">{form.PREENCHIDO ? "Preenchido" : "Não preenchido"}</StyledTableCell>
                <StyledTableCell align="center">
                  {form.DtPreenchimento === null ? '' : moment(form.DtPreenchimento).format('DD/MM/YYYY')}
                </StyledTableCell>
                <StyledTableCell align="center">{form.NomeCompleto}</StyledTableCell>
                <StyledTableCell align="center">
                  <Modal
                    form={form}
                    title={`Formulário ${form.CodCandidato}`}
                    preenchido={form.PREENCHIDO}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Panel>
  );
}

export default FormsAcompanhamento;

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
      cursor: "auto",
    },
  },
}))(TableRow);