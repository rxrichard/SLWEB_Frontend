import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Card from "@material-ui/core/Card";

import { ChangeTab, SetCheckedProd } from "../../global/actions/ComprasAction";
import Loading from "../../components/loading_screen";

import { Title, Box, Image, Text, Container, Codigo } from "./styles";

import ProdutoModal from "./modals/ProdutoModal";

function TransferList(props) {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const { Produtos, Checked } = props.State;

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (Produtos.length > 0) {
      setLoaded(true);
    }
    // eslint-disable-next-line
  }, []);

  const customList = (title, items) => (
    <Card>
      <Container>
        {items.map((prod, i) => {
          const imagem = () => {
            try {
              return require(`../../assets/image_products/${prod.Cód}.png`);
            } catch (err) {
              return require(`../../assets/image_products/00000.png`);
            }
          }
          return (
            <Box key={i} >
              <Codigo>Código: {prod.Cód}</Codigo>
              <Image >
                {/* // eslint-disable-next-line jsx-a11y/alt-text */}
                <img
                  src={imagem()}
                  alt="1"
                />
               
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
                imagemModal={imagem}
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
