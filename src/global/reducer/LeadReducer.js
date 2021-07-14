import {
  LOAD_LEADS_FRANQUEADO,
  LOAD_LEADS_LIMITE,
  LOAD_LEADS_GERAL,
  ADD_LIMITE,
  SUB_LIMITE,
  MOVE_LEAD,
} from "../actions/LeadActionTypes";

const initialState = {
  LeadsFranqueado: [],
  LeadsGeral: [],
  Limites: [{ Tentativas: 0, MaxTentativas: 0, MaxHoras: 0 }],
};

export const LeadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LEADS_GERAL:
      return {
        ...state,
        LeadsGeral: action.leads,
      };

    case LOAD_LEADS_FRANQUEADO:
      return {
        ...state,
        LeadsFranqueado: action.leads,
      };

    case LOAD_LEADS_LIMITE:
      return {
        ...state,
        Limites: action.limites,
      };

    case ADD_LIMITE:
      return {
        ...state,
        Limites: [
          ...state.Limites,
          (state.Limites[0].Tentativas = state.Limites[0].Tentativas + 1),
        ],
      };

    case SUB_LIMITE:
      return {
        ...state,
        Limites: [
          ...state.Limites,
          (state.Limites[0].Tentativas = state.Limites[0].Tentativas - 1),
        ],
      };

    case MOVE_LEAD:
      return {
        ...state,
        LeadsFranqueado: [...state.LeadsFranqueado, action.Lead]
      };

    default:
      return state;
  }
};
