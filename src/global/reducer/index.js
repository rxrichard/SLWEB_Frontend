import { SolicitacaoReducer } from './SolicitacaoReducer'
import { LeadsReducer } from './LeadReducer'
import { EtcReducer } from './EtcReducer'

import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  solicitacaoState: SolicitacaoReducer,
  leadsState: LeadsReducer,
  EtcState: EtcReducer
});