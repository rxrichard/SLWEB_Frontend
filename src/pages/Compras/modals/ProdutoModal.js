import * as React from "react";
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
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Badge from "@material-ui/core/Badge";
import { ShoppingCart, Add } from "@material-ui/icons";

import Typography from "@mui/material/Typography";
import {
  Title,
  Button as ButtonComprar,
  Buttons,
  Box,
  Flex,
  Image,
  Input,
  Text,
  ChamadoButton,
  Container,
  Price,
} from "./StyleProdutoModal";

let i = 0;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton aria-label="close" onClick={onClose}>
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

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const addShoppingCartAction = () => {
    i++;
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
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          ACHOCOLATADO PILAO PROFESSIONAL 1,05K
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Flex>
            <Image />
            <Flex width="40%" direction="column">
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </Text>

              <Flex>
                <Flex align="left">
                  <label>Qtd:</label>
                  <Input type="number" />
                  <Title>R$ 99,99</Title>
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
