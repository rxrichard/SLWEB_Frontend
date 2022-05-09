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
} from "./styles";
import { Input } from "@material-ui/core";
import ProdutoModal from "./modals/ProdutoModal";



function TransferList(props) {
  const classes = useStyles();

  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const { Produtos, Checked } = props.State;
  const { ChangeTab, SetCheckedProd } = props;
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  }
  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (Produtos.length > 0) {
      setLoaded(true);
    }
    // eslint-disable-next-line
  });

  const customList = (title, items) => (
    <Card >
      <Container>
        {items.map((prod, i) => {
          return (
            <Box >
              < Image src={prod.Imagem} /> 
              <Text>{prod.Produto}</Text> 
              <Title>R$ {String(
                        Number.parseFloat(prod.Vlr).toFixed(2)
                      ).replace(".", ",")}
              </Title>

              <ProdutoModal
                open={open}
                onClose={handleCloseDialog}
              />                 
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
