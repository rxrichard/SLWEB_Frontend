import React from "react";

import Cadastro from "./solicitacao";
import Logs from "./logs";

import MenuAbas from "../../components/materialComponents/PainelAbas";
import Segmentos from "../../components/materialComponents/PainelSegmentado";
import { Button, Icon } from "react-materialize";
import { Panel } from "../../components/commom_in";
import { GoBack } from "../../components/buttons";

class Solicitacao extends React.Component {
  render() {
    return (
      <Panel style={{ overflow: "hidden", alignContent: "center", padding: '0px' }}>
        <MenuAbas titles={['Solicitar', 'Solicitações']}>
          <Segmentos />
          <Logs />
        </MenuAbas>
        <GoBack />

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
      </Panel>
    );
  }
}

export default Solicitacao;
