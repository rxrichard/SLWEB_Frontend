import React from "react";
import { Link } from "react-router-dom";

import { Panel } from "../../components/commom_in";

export default class PAGE_404 extends React.Component {
  render() {
    return (
      <Panel>
        <h5>Desculpe, não foi possivel te levar até a pagina desejada...</h5>
        <p>
          Clique <Link to="/">Aqui</Link> para retornar à aplicação
        </p>
      </Panel>
    );
  }
}
