import React from 'react'

import Cadastro from './cadastro'
import Logs from './logs'

import { Tabs, Tab, Button, Icon } from 'react-materialize'
import { Panel } from '../../components/commom_in'

class Solicitacao extends React.Component {
  render() {
    return (
      <Panel style={{ overflow: 'hidden' }}>
        <Tabs
          className='tab-demo z-depth-1'
          options={{
            swipeable: false
          }}
        >
          <Tab
            active
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false
            }}
            title='Solicitação'
          >
            <Cadastro />
          </Tab>

          <Tab
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false
            }}
            title='Registros'
          >
            <Logs />
          </Tab>
        </Tabs>
        <div style={{ width: '100vw', backgroundColor: '#000' }} />
        {/* Não sei porquê, mas se tirar essa div, as tabs param de mostrar o conteudo */}

        <Button
          onClick={() => {
            window.location.assign('/equipamentos')
          }}
          node='button'
          style={{
            marginRight: '5px'
          }}
          waves='light'
        >
          Voltar
          <Icon left>arrow_back</Icon>
        </Button>
      </Panel>
    )
  }
}

export default Solicitacao
