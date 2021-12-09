import React from "react";
import moment from "moment";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";

import LeadModal from './modals/LeadModal'

function LeadList(props) {
  

  return (
    <div style={{ width: "100%" }}>
      {props.Leads.map((le, i) => (
        <div
          className="XAlign df-mobile"
          style={{
            justifyContent: "space-between",
            padding: "8px 0px 8px 0px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div>
            <Typography variant="subtitle2" gutterBottom>
              <strong>{moment(le.Insercao).fromNow(false)}</strong>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {mountString(le)}
            </Typography>
          </div>
          <LeadModal
            lead={le}
            index={i}
            
          />
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (store) => ({
  State: store.leadsState,
});

export default connect(mapStateToProps)(LeadList);

const mountString = (dados) => {
  let variavel = ``;

  if (dados.Nome_Fantasia !== "") {
    variavel += dados.Nome_Fantasia;
  } else {
    variavel += "???";
  }

  if (dados.Municipio !== "") {
    variavel += `, ${dados.Municipio}`;
  } else {
    variavel += ", ???";
  }

  if (dados.Estado !== "") {
    variavel += ` - ${dados.Estado}`;
  } else {
    variavel += " - ???";
  }

  if (dados.AtividadeDesc !== "" && dados.AtividadeDesc !== null) {
    variavel += `, ${dados.AtividadeDesc}`;
  }

  return variavel;
};
