import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./styleClass.css";
import {
  Title,
  Button as ButtonComprar,
  Flex,
  Image,
  Input,
  Text,
} from "./StyleProdutoModal";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const [open, setOpen] = useState(false);
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    console.log(props.cart);
  }, [props.cart]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAdd = () => {
    if (props.cart.Cod === props.produto.Cód) {
      props.onChangeCart([
        ...props.cart,
        { quantidade: props.cart.cod + quantidade, Cod: props.produto.Cód },
      ])
     
    }else {
      props.onChangeCart([
        ...props.cart,
        { quantidade, Cod: props.produto.Cód },
      ]);
    }
    let qtdCart = props.cart;
    console.log(props.cart);
    console.log(` Quantidade de itens: ${qtdCart.length}`)
  
    setOpen(false);
    
  };

  const imagem = () => {
    try {
      return require(`../../../assets/image_products/${props.produto.Cód}.png`);
    } catch (err) {
      return require(`../../../assets/image_products/00000.png`);
    }
  };

  return (
    <div>
      <ButtonComprar
        width="13vw"
        margin="1rem"
        borderRadius="1rem"
        onClick={handleClickOpen}
      >
        COMPRAR
      </ButtonComprar>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ justifyContent: "space-between" }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {props.produto.Produto}
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Flex>
            <Image>
              <img src={imagem()} alt={props.produto.Produto} />
            </Image>

            <Flex width="40%" direction="column">
              <Text>Contem:{props.produto.Produto}</Text>

              <Flex>
                <Flex direction="row">
                  <Input
                    id="qtd"
                    type="number"
                    placeholder="Quantidade:"
                    onChange={(e) => {
                      setQuantidade(e.target.value);
                    }}
                  />
                  <Title id="preco">R${props.produto.Vlr.toFixed(2)}</Title>
                </Flex>
              </Flex>
              <Flex align="space-around">
                <Button
                  variant="outlined"
                  color="success"
                  size="medium"
                  className="button"
                  onClick={handleClickAdd}
                >
                  <AddShoppingCartIcon />
                  ADICIONAR AO CARRINHO
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="medium"
                  className="button"
                  onClick={handleClose}
                >
                  <DeleteIcon />
                  CANCELAR
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
