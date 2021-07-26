import React from "react";

import MenuAbas from "./PainelAbas";
import Logs from "./Logs";
import Segmentos from "./Solicitacao";
import Edit from "@material-ui/icons/Edit";

import Button from "../../components/materialComponents/Button";
import { Panel } from "../../components/commom_in";
import { roleLevel } from "../../misc/commom_functions";
import { REACT_APP_FRANQUEADO_ROLE_LEVEL } from "../../misc/role_levels";
import { GREY_SECONDARY } from "../../misc/colors";

class Solicitacao extends React.Component {
  render() {
    return (
      <Panel
        style={{
          overflow: "hidden",
          alignContent: "center",
          padding: "0px",
          justifyContent: "flex-start",
        }}
      >
        <MenuAbas titles={["Solicitar", "Solicitações"]}>
          <Segmentos />
          {/* <Cadastro /> */}
          <Logs />
        </MenuAbas>
      </Panel>
    );
  }
}

export default Solicitacao;
