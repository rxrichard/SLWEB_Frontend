import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import { ChangeTab, SetCheckedProd } from "../../global/actions/ComprasAction";
import Loading from "../../components/loading_screen";

import {
  Title,
  Button,
  Buttons,
  Box,
  Image,
  Text,
  ChamadoButton,
  Container,
  Price,
  Flex,
} from "../Monitor/Box/style";

function TransferList(props) {
  const classes = useStyles();

  const [loaded, setLoaded] = useState(false);

  const { Produtos, Checked } = props.State;
  const { ChangeTab, SetCheckedProd } = props;

  useEffect(() => {
    if (Produtos.length > 0) {
      setLoaded(true);
    }
    // eslint-disable-next-line
  });

  const customList = (title, items) => (
    <Card style={{ width: "100%" }}>
      <Container>
        {items.map((prod, i) => {
          return (
            <Box boxShadow='none'> 
              <Text>{prod.Produto}</Text>
              <Image src={prod.Imagem} />

              <Flex>
                <Text>{prod.Produto}</Text>
                <Price color="#000">
                  <Text color="#fff" fontSize='.8rem'>
                    R${" "}
                    {String(Number.parseFloat(prod.VlrUn).toFixed(2)).replace(
                      ".",
                      ","
                    )}
                  </Text>
                </Price>
              </Flex>
            </Box>
          );
        })}
      </Container>
    </Card>
  );

  return !loaded ? <Loading /> : <div>{customList("Produtos", Produtos)}</div>;
}

const mapStateToProps = (store) => ({
  State: store.CompraState,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ChangeTab, SetCheckedProd }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransferList);

/*estilo célula
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
*/
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
