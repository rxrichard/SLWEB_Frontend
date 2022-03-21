import React, { useState } from 'react'
import Input from "react-number-format";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { api } from "../../../services/api";

import { DataGrid } from "@material-ui/data-grid";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Tooltip,
  Paper,
  makeStyles
} from "@material-ui/core/";
import { ShoppingCart } from "@material-ui/icons";

import InputMultline from "../../../components/materialComponents/InputMultline";
import { Toast } from "../../../components/toasty";
import { RED_PRIMARY } from "../../../misc/colors";
import {
  SetCheckedProd,
  SetBuyQtt,
  UpdateProdutos,
  ClearCarrinho
} from "../../../global/actions/ComprasAction";


const ProdutoModal = ({ open, onClose, qtd,...props }) => {
  const classes = useStyles()
  const [qtdProd, setQtdProd] = useState(1)
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)

 

return (
  <Dialog   open={open}
    onClose={() => onClose(false)}
    PaperComponent={PaperComponent}
    aria-labelledby="draggable-dialog-title"
  >
    <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
      <div className="XAlign" style={{ justifyContent: "flex-start" }}>
        <ShoppingCart className={classes.extendedIcon} />
        Carrinho
      </div>
    </DialogTitle>
    </Dialog>
)
}
export default CarrinhoModal