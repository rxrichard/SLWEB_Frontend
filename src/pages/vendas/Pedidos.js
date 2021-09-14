import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Panel } from '../../components/commom_in'

function Pedidos () {
    return(
        <Panel>A</Panel>
    )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

const mapStateToProps = (store) => ({
  State: store.VendaState,
});

export default connect(mapStateToProps, mapDispatchToProps)(Pedidos)