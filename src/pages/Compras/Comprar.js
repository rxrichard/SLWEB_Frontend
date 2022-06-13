import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Card from "@material-ui/core/Card";
import { Toolbar } from "@material-ui/core";

import { ChangeTab, SetCheckedProd } from "../../global/actions/ComprasAction";
import Loading from "../../components/loading_screen";

import { Title, Box, Image, Text, Container, Codigo } from "./styles";

import ProdutoModal from "./modals/ProdutoModal";
import { Button, SwipeableDrawer } from "@mui/material";

function TransferList(props) {
  const [loaded, setLoaded] = useState(false);
  const [itemsCart, setItemsCart] = useState([]);
  const [open, setOpen] = useState(false);


  const { Produtos } = props.State;


  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (Produtos.length > 0) {
      setLoaded(true);
    }
    // eslint-disable-next-line
  }, []);




  const customList = (items) => (
    <>
    
      <Card>
        <Container>
          {items.map((prod, i) => {
            const imagem = () => {
              try {
                return require(`../../assets/image_products/${prod.Cód}.png`);
              } catch (err) {
                return require(`../../assets/image_products/00000.png`);
              }
            };
            return (
              <>
                <Box key={i}>
                  <Codigo>Código: {prod.Cód}</Codigo>
                  <Image>
                    <img src={imagem()} alt="teste" />
                  </Image>
                  <Text>{prod.Produto}</Text>
                  <Title>
                    R${" "}
                    {String(Number.parseFloat(prod.Vlr).toFixed(2)).replace(
                      ".",
                      ","
                    )}
                  </Title>
                  <ProdutoModal
                    open={open}
                    onClose={handleCloseDialog}
                    produto={prod}
                    cart={itemsCart}
                    onChangeCart={setItemsCart}
                  />
                </Box>
              </>
            );
          })}
        </Container>
      </Card>
    </>
  );

  return !loaded ? <Loading /> : <div>{customList(Produtos)}</div>;
}

const mapStateToProps = (store) => ({
  State: store.CompraState,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ChangeTab, SetCheckedProd }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransferList);
