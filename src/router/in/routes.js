import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import NewSidebar from '../../components/newSidebar'

//import de telas
import notFound from "../../pages/1_NOT_FOUND/index";
import Perfil from "../../pages/perfil/index";
import Leads from "../../pages/leads/index";
import Ajuda from "../../pages/ajuda/index";
import Equipamentos from '../../pages/equipamentos/index';
import AddEquipamentos from "../../pages/equipamentosSolicitacao/index";
import GerenciarEquip from "../../pages/gerenciarSolicitacoes/index";
import AdmFranquia from "../../pages/administracao/index";
import Home from "../../pages/Dashboard/Index";
import FormsAcompanhamento from "../../pages/formulários_cadastrados";
import CentralEmails from "../../pages/emails/index";
import Compras from '../../pages/compras/index'
import Vendas from '../../pages/vendas/index'

function Dashboard(props) {
  return (
    <div
      id="outer"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignContent: "center",
        overflow: props.State.overflow
      }}
    >
      <Router id="Out">
        <NewSidebar />
        <div id="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/leads" component={Leads} />
            <Route exact path="/perfil" component={Perfil} />
            <Route exact path="/ajuda" component={Ajuda} />
            <Route exact path="/compras" component={Compras} />
            <Route exact path="/vendas" component={Vendas} />
            <Route exact path="/equipamentos/" component={Equipamentos} />
            <Route exact path="/equipamentos/solicitacao" component={AddEquipamentos} />
            <Route exact path="/equipamentos/solicitacao/management" component={GerenciarEquip} />
            <Route exact path="/administracao/franquia" component={AdmFranquia} />
            <Route exact path="/administracao/formularios" component={FormsAcompanhamento} />
            <Route exact path="/administracao/emails" component={CentralEmails} />
            <Route path="*" component={notFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = (store) => ({
  State: store.EtcState,
});

export default connect(mapStateToProps)(Dashboard);