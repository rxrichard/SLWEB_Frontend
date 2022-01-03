import React from "react";
import moment from "moment";
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core/";

import LeadModal from './modals/LeadModal'

function LeadList(props) {
  const classes = useStyles();

  return (
    <div
      style={{
        width: "100%",
        maxHeight: '600px',
        overflow: 'auto',
        borderRadius: '0px 0px 4px 4px',
        borderBottom: `5px solid #000`,
        borderLeft: `1px solid #000`,
        borderTop: `1px solid #CCC`,
      }}
    >
      <List
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        {props.Leads.map((le, i) => (
          <ListItem
            button={false}
            onClick={() => { }}
            className={classes.lines}
          >
            <ListItemText
              primary={<strong>{moment(le.Insercao).fromNow(false)}</strong>}
              secondary={<div style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}>
                {mountString(le)}
              </div>}
            />
            <ListItemText
              style={{
                minWidth: '170px',
              }}
              primary={
                <div style={{
                  display: 'flex',
                  flex: '1',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                  <LeadModal
                    lead={le}
                    index={i}
                  />
                </div>
              }
            />
          </ListItem>
        ))}
      </List>
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  lines: {
    borderBottom: '1px solid #CCC',

    '&:last-child': {
      borderBottom: 'none'
    }
  }
}));