import {
  LOAD_PRODUTOS_DISPONIVEIS,
  CLEAR_CART,
  DESTROY_STORE,
  CHANGE_TAB_INDEX,
  CHECKED_PROD,
  CHANGE_BUY_QTT,
  MOVE_CARRINHO_2_PRODUTOS,
  MOVE_PRODUTOS_2_CARRINHO,
  SET_MIN_COMPRA,
  SET_RETIRA
} from "../actions/ComprasActionTypes";

const initialState = {
  InitProdutos: [],
  Produtos: [],
  Carrinho: [],
  MinCompra: undefined,
  Retira: false,


  Checked: [],
  TabIndex: 1,
};

export const ComprasReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUTOS_DISPONIVEIS:
      let _newProdutos = [];
      action.Produtos.forEach((produto) =>
        _newProdutos.push({ ...produto, QCompra: 0 })
      );

      return {
        ...state,
        Produtos: _newProdutos,
        InitProdutos: _newProdutos,
      };

    case SET_MIN_COMPRA:
      return {
        ...state,
        MinCompra: action.min,
      };

    case SET_RETIRA:
      return {
        ...state,
        Retira: action.retira,
      };

    

    case MOVE_PRODUTOS_2_CARRINHO:
      let newCarrinho = [...state.Carrinho];
      let newProdutos = [];
      let newChecked = [];
      let FoundID = [];

      //Adiciono produto ao carrinho
      state.Produtos.forEach((Prod) => {
        if (state.Checked.indexOf(Prod.Cód) !== -1) {
          newCarrinho.push(Prod);
          FoundID.push(Prod.Cód);
        }
      });

      //Remove os produtos adicionados ao carrinho da lista de produtos
      newProdutos = state.Produtos.filter(
        (prod) => FoundID.indexOf(prod.Cód) === -1
      );

      //removo da lista de marcados os que eu acabei de adicionar ao carrinho
      newChecked = state.Checked.filter((id) => FoundID.indexOf(id) === -1);

      return {
        ...state,
        Produtos: newProdutos,
        Carrinho: newCarrinho,
        Checked: newChecked,
      };

    case MOVE_CARRINHO_2_PRODUTOS:
      let newCarrinho_ = [];
      let newProdutos_ = [...state.Produtos];
      let newChecked_ = [];
      let FoundID_ = [];

      //Adiciono aos produtos itens removidos do carrinho apos zerar a Qtd. Compra
      state.Carrinho.forEach((Prod) => {
        if (state.Checked.indexOf(Prod.Cód) !== -1) {
          newProdutos_.push({...Prod, QCompra: 0 });
          FoundID_.push(Prod.Cód);
        }
      });

      //Removo os itens do carrinho
      newCarrinho_ = state.Carrinho.filter(
        (prod) => FoundID_.indexOf(prod.Cód) === -1
      );

      //removo da lista de marcados os que eu acabei de voltar pra produtos
      newChecked_ = state.Checked.filter((id) => FoundID_.indexOf(id) === -1);

      return {
        ...state,
        Produtos: newProdutos_,
        Carrinho: newCarrinho_,
        Checked: newChecked_,
      };

    case CLEAR_CART:
      return {
        ...state,
        Produtos: [...state.InitProdutos],
        Carrinho: [],
        Checked: [],
      };

    case CHANGE_TAB_INDEX:
      return {
        ...state,
        TabIndex: action.Tab,
      };

    case CHECKED_PROD:
      /*precisei por esse teste aqui porque a seleção de produtos mandar ID por ID 
      quando selecionado, já o carrinho(administrado pelo datagrid) manda logo o Array 
      todo de ID's selecionados, mas no caso de um ID ser deselecionado, ele não vai 
      ser informado e não tem como remover ele do array de forma segura*/
      if(typeof action.value == 'object') {
        return {
          ...state,
          Checked: action.value,
        }
      }else{
        let _newChecked = [...state.Checked];
        let indexOfProd = _newChecked.indexOf(action.value);
  
        indexOfProd < 0
          ? _newChecked.push(action.value)
          : _newChecked.splice(indexOfProd, 1);
  
        return {
          ...state,
          Checked: _newChecked,
        }
      };
      

    case CHANGE_BUY_QTT:
      let _newCarrinho = [...state.Carrinho];

      _newCarrinho.forEach((item) => {
        if (String(item.Cód) === String(action.ProdId)) {
          item.QCompra = action.Qtd;
        }
      });

      return {
        ...state,
        Carrinho: _newCarrinho,
      };

    case DESTROY_STORE:
      return initialState;

    default:
      return state;
  }
};

// function intersection(a, b) {
//   return a.filter((value) => b.indexOf(value) !== -1);
// }
