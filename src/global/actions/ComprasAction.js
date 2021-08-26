import {
  LOAD_PRODUTOS_DISPONIVEIS,
  CLEAR_CART,
  DESTROY_STORE,
  CHANGE_TAB_INDEX,
  CHECKED_PROD,
  CHANGE_BUY_QTT,
  MOVE_CARRINHO_2_PRODUTOS,
  MOVE_PRODUTOS_2_CARRINHO,
} from "./ComprasActionTypes";

export const LoadInsumos = (value) => ({
  type: LOAD_PRODUTOS_DISPONIVEIS,
  Produtos: value,
});

export const ClearCarrinho = () => ({
  type: CLEAR_CART,
});

export const DestroyStore = () => ({
  type: DESTROY_STORE,
});

export const ChangeTab = (value) => ({
  type: CHANGE_TAB_INDEX,
  Tab: value,
});

export const SetCheckedProd = (value) => ({
  type: CHECKED_PROD,
  value: value,
});

export const SetBuyQtt = (value) => ({
  type: CHANGE_BUY_QTT,
  ProdId: value.id,
  Qtd: value.value,
});

export const UpdateProdutos = () => ({
  type: MOVE_CARRINHO_2_PRODUTOS,
});

export const UpdateCarrinho = () => ({
  type: MOVE_PRODUTOS_2_CARRINHO,
});
