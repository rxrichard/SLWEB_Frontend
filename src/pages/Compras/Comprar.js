import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Table } from "../../components/table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ViewList } from "@material-ui/icons";

import { ChangeTab, SetCheckedProd } from "../../global/actions/ComprasAction";
import Loading from "../../components/loading_screen";

function TransferList(props) {
  const classes = useStyles();
  const TabIndex = 2;
  const [loaded, setLoaded] = useState(false);

  const { Produtos, Checked } = props.State;
  const { ChangeTab, SetCheckedProd } = props;

  const handleToggle = (value) => () => {
    SetCheckedProd(value.Cód);
  };

  useEffect(() => {
    ChangeTab(TabIndex);
    if (Produtos.length > 0) {
      setLoaded(true);
    }
    // eslint-disable-next-line
  }, [ChangeTab]);

  const customList = (title, items) => (
    <Card style={{ width: "100%" }}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<ViewList />}
        title={title}
        subheader={`${ProdutosMarcados(Produtos, Checked)}/${
          items.length
        } selecionados`}
      />
      <Divider />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Código</StyledTableCell>
              <StyledTableCell>Produto</StyledTableCell>
              <StyledTableCell>Mínimo Kg/Un</StyledTableCell>
              <StyledTableCell>Valor Kg/Un</StyledTableCell>
              <StyledTableCell>Valor</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((prod, i) => {
              const labelId = `transfer-list-all-item-${prod.Cód}-label`;

              return (
                <StyledTableRow key={prod.Cód} onClick={handleToggle(prod)}>
                  <StyledTableCell style={{ textAlign: "center" }}>
                    <input
                      style={{ margin: "0px" }}
                      checked={Checked.indexOf(prod.Cód) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      type="checkbox"
                      value={prod.Cód}
                    />
                  </StyledTableCell>

                  <StyledTableCell>{prod.Cód}</StyledTableCell>

                  <StyledTableCell>
                    <ListItemText primary={String(prod.Produto).trim()} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <ListItemText primary={prod.QtMin} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <ListItemText
                      primary={String(
                        Number.parseFloat(prod.VlrUn).toFixed(4)
                      ).replace(".", ",")}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <ListItemText
                      primary={String(
                        Number.parseFloat(prod.Vlr).toFixed(4)
                      ).replace(".", ",")}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );

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
      {customList("Produtos", Produtos)}
    </div>
  );
}

const mapStateToProps = (store) => ({
  State: store.CompraState,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ChangeTab, SetCheckedProd }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransferList);

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

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "100%",
    height: "100%",
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

const ProdutosMarcados = (ProdList, Marcados) => {
  let count = 0;
  ProdList.forEach((prod) =>
    Marcados.indexOf(prod.Cód) !== -1 ? count++ : null
  );

  return count;
};
