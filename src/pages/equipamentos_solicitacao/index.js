import React from "react";

import MenuAbas from "./PainelAbas";
import Logs from "./Logs";
import Segmentos from "./Solicitacao";

import { Button, Icon } from "react-materialize";
import { Panel } from "../../components/commom_in";
import { GoBack } from "../../components/buttons";

class Solicitacao extends React.Component {
  componentDidMount(){
    alert('Em Desenvolvimento!')
  }
  render() {
    return (
      <Panel
        style={{ overflow: "hidden", alignContent: "center", padding: "0px", justifyContent: 'flex-start' }}
      >
        <MenuAbas titles={["Solicitar", "Solicitações"]}>
          <Segmentos />
          {/* <Cadastro /> */}
          <Logs />
        </MenuAbas>
        <div className="XAlign">
          {sessionStorage.getItem("role") !== "Franquia" ? (
            <Button
              onClick={() => {
                this.props.history.push("/equipamentos/solicitacao/management");
              }}
              style={{
                marginRight: "5px",
              }}
            >
              Gerenciar configurações
              <Icon left>edit</Icon>
            </Button>
          ) : null}
        </div>
      </Panel>
    );
  }
}

export default Solicitacao;
