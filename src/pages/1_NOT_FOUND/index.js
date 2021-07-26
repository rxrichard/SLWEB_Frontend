import React from "react";
import { Link } from "react-router-dom";

import { Panel } from "../../components/commom_in";

function PAGE_404 () {
    return (
      <Panel>
        <h5>Desculpe, não foi possivel te levar até a pagina desejada...</h5>
        <p>
          Clique <Link to="/">Aqui</Link> para retornar à aplicação
        </p>
      </Panel>
    );
}

export default PAGE_404