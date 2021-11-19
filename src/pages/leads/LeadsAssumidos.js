import React from 'react';

import { Close } from '@material-ui/icons'
import Typography from "@material-ui/core/Typography";

import List from "./List";

const Assumidos = (props) => {
    return (
        <div style={{ width: "100%" }}>
            <Typography variant="h5" gutterBottom>
                Leads Assumidos ({props.ContAssumidos}/{props.ContMax})
            </Typography>
            {props.Leads.length < 0 ?
                <Close />
                :
                <List Leads={props.Leads} />}
        </div>
    );
}

export default Assumidos;