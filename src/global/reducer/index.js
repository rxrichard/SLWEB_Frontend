import { otherReducer } from './SolicitacaoReducer'

import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  solicitacaoState: otherReducer
});