import React from "react";

import { Panel } from "../../components/commom_in";

export default class Ajuda extends React.Component {
  render() {
    return (
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
    );
  }
}