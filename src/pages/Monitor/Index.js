import React from 'react';

import { Panel } from "../../components/commom_in";
import Monitor from './Monitor'

const Dashboard = () => {
    if (window.innerWidth < 768) {
        return (
            <Monitor />
        )
    } else {
        return (
            <Panel>
                <Monitor />
                {/* <News /> */}
            </Panel>
        )
    }
}
export default Dashboard