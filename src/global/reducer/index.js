import { SolicitacaoReducer } from './SolicitacaoReducer'
import { EtcReducer } from './EtcReducer'

import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  solicitacaoState: SolicitacaoReducer,
  EtcState: EtcReducer
});