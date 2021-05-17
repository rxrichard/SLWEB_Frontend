import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//import de componentes
import SideBar from "../../components/sidebar";

//import de telas
import notFound from "../../pages/NOT_FOUND/index";
import Perfil from "../../pages/perfil/index";
import Ajuda from "../../pages/ajuda/index";
import Equipamentos from "../../pages/equipamentos/index";
import AddEquipamentos from "../../pages/equipamentos_solicitacao/index";
import GerenciarEquip from "../../pages/equipamentos_solicitacao/gerenciamento";
import AdmFranquia from "../../pages/administracao/index";
import Home from "../../components/Home";
import FormsAcompanhamento from "../../pages/formulários_cadastrados";
import CentralEmails from "../../pages/Central_Emails/index";

export default function Dashboard() {
  return (
    <div
      id="outer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <Router id="Out">
        <SideBar width={250} pageWrapId="App" outerContainerId="outer" />
        <div id="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/perfil" component={Perfil} />
            <Route exact path="/ajuda" component={Ajuda} />
            <Route exact path="/equipamentos" component={Equipamentos} />
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
