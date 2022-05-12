import * as React from "react";
import {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import {
  Title,
  Button as ButtonComprar,
  Flex,
  Image,
  Input,
  Text,

} from "./StyleProdutoModal";



let i = 0;
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
    <DialogTitle sx={{ m: 0, p: 2 }}  {...other}>
      {children}
      {onClose ? (
        <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
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

export default function CustomizedDialogs( props) {
  const [open, setOpen] = React.useState(false);
  const [changeInput, setChangeInput] = React.useState(0);
  


  const handleClickOpen = (props) => {
    setOpen(true);
    
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const addShoppingCartAction = () => {
    
    setOpen(false);
    console.log(i)
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
        sx={{justifyContent: "space-between"}}
      >
        <BootstrapDialogTitle 
          id="customized-dialog-title"
          onClose={handleClose}
          
        >
         {props.produto.Produto}
        </BootstrapDialogTitle>
       
        <DialogContent dividers>
          <Flex>
            <Image>{
              <img src={props.imagemModal.imagem} alt='' />
               
               }</Image>
            <Flex width="40%" direction="column">
              <Text>
              lorem descricao do produto aqui
              </Text>

              <Flex>
                <Flex direction='row'>
           
                  <Input id="qtd"type="number" placeholder="Digite a quantidade:" onChange={()=>{
                    
                  }} />
                  <Title id="preco">R${props.produto.Vlr.toFixed(2)}</Title>
                </Flex>
              </Flex>
              <Flex align="space-around">
                <Button variant="outlined" color="error" size="medium" onClick={handleClose}>
                  <DeleteIcon />
                  CANCELAR
                </Button>

                <Button variant="outlined" color="success" size="medium" onClick={addShoppingCartAction}>
                  <AddShoppingCartIcon />
                  ADICIONAR AO CARRINHO
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </DialogContent>
      </BootstrapDialog>
      
      
    </div>
  );
}
