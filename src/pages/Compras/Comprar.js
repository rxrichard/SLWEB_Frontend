import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import { ChangeTab, SetCheckedProd } from "../../global/actions/ComprasAction";
import Loading from "../../components/loading_screen";

import {
  Title,
  Box,
  Image,
  Text,
  Container,
} from "./styles";

import ProdutoModal from "./modals/ProdutoModal";

function TransferList(props) {
  const classes = useStyles();

  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const { Produtos, Checked } = props.State;
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleOpenDialog = (props) => {
    setOpen(true);
    detailsModalOpen(props)
      };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (Produtos.length > 0) {
      setLoaded(true);
    }
    // eslint-disable-next-line
  });

  const customList = (items) => (
    <Card>
     
      <Container>
        {items.map((prod, i) => {
          let aux;
          try {
            aux = require(`../../assets/image_products/${prod.Cód}.png`);
          } catch (error) {
            aux = require(`../../assets/image_products/00000.png`);
          }
          return (
            
            <Box>
   
              <Image>
                <img src={aux} alt="produto" />
              </Image>
              <Text>{prod.Produto}</Text>
              <Title>
                R${" "}
                {String(Number.parseFloat(prod.Vlr).toFixed(2)).replace(
                  ".",
                  ","
                )}
              </Title>

              <ProdutoModal open={handleOpenDialog} onClose={handleCloseDialog} />
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
