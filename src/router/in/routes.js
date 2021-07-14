import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

//import de componentes
import SideBar from "../../components/sidebar";

//import de telas
import notFound from "../../pages/1_NOT_FOUND/index";
import Perfil from "../../pages/perfil/index";
import Leads from "../../pages/leads/index";
import Ajuda from "../../pages/ajuda/index";
import AddEquipamentos from "../../pages/equipamentos_solicitacao/index";
import GerenciarEquip from "../../pages/equipamentos_solicitacao/gerenciamento";
import AdmFranquia from "../../pages/administracao/index";
import Home from "../../components/Home";
import FormsAcompanhamento from "../../pages/formulários_cadastrados";
import CentralEmails from "../../pages/Central_Emails/index";

function Dashboard(props) {
  return (
    <div
      id="outer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        overflow: props.State.overflow
      }}
    >
      <Router id="Out">
        <SideBar />
        <div id="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/leads" component={Leads} />
            <Route exact path="/perfil" component={Perfil} />
            <Route exact path="/ajuda" component={Ajuda} />
            <Route exact path="/equipamentos/solicitacao" component={AddEquipamentos} />
            <Route exact path="/equipamentos/solicitacao/management" component={GerenciarEquip} /> <Route exact path="/administracao/franquia" component={AdmFranquia} />
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