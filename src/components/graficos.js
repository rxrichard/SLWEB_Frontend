import React from 'react'
import { Icon } from 'react-materialize'
import { Panel } from './commom_in'


class graficos extends React.Component {
  componentDidMount() {
    alert('Essa aplicação ainda está sendo desenvolvida, por isso não deve ser usada para operar efetivamente uma franquia.')
  }
  render() {
    return (
      <Panel>
        <p>Em Obras<Icon>pan_tool</Icon></p>
      </Panel>
    )
  }
}

export default graficos
