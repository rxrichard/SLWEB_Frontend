import React from "react";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";

//import de componentes
import SideBar from "../../components/sidebar";
import { Panel } from "../../components/commom_in";

//import de telas
import Perfil from "../../pages/perfil/index";
import Equipamentos from "../../pages/equipamentos/index";
import AddEquipamentos from "../../pages/equipamentos_solicitacao/index";
import graficos from "../../components/graficos";

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
            <Route exact path="/" component={graficos} />
            <Route exact path="/perfil" component={Perfil} />
            <Route exact path="/equipamentos" component={Equipamentos} />
            <Route
              exact
              path="/equipamentos/solicitacao"
              component={AddEquipamentos}
            />
            <Route
              exact
              path="/ajuda"
              component={() => (
                <Panel>
                  <h5>No momento, ainda não possuimos suporte online</h5>
                  <p>
                    Para receber assistencia, entre em contato com:{" "}
                    <strong style={{ fontWeight: "bold" }}>
                      (11) 99794-3788
                    </strong>
                    .
                  </p>
                  <p>
                    Ou por email com:{" "}
                    <strong style={{ fontWeight: "bold" }}>
                      helpdesk@slaplic.com.br
                    </strong>
                  </p>
                </Panel>
              )}
            />
            <Route
              path="*"
              component={() => (
                <Panel>
                  <h5>
                    Desculpe, não foi possivel te levar até a pagina desejada...
                  </h5>
                  <p>
                    Clique <Link to="/">Aqui</Link> para retornar à aplicação
                  </p>
                </Panel>
              )}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
