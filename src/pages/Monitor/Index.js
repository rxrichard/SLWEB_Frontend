import React from 'react';

import { Panel } from "../../components/commom_in";
import Monitor from './Monitor'

const Dashboard = () => {
  return (
    <Panel
      boxShadow='none'
      border={'none'}
      flexDirection='row'
      jContent='space-around'
    >
      <Monitor />
    </Panel>
  )
}
export default Dashboard