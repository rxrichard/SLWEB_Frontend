import React from 'react'

import Cadastro from './solicitacao'
import Logs from './logs'

import { Tabs, Tab, Button, Icon } from 'react-materialize'
import { Panel } from '../../components/commom_in'
import { GoBack } from '../../components/buttons'

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
            title='Solicitações'
          >
            <Logs />
          </Tab>
        </Tabs>
        <div style={{ width: '100vw', backgroundColor: '#000' }} />
        {/* Não sei porquê, mas se tirar essa div, as tabs param de mostrar o conteudo */}
        <div className='XAlign'>
          <GoBack />

          {sessionStorage.getItem('role') === 'Técnica Bianchi' ||
          sessionStorage.getItem('role') === 'Sistema' ? (
            <Button
              onClick={() => {
                this.props.history.push('/equipamentos/solicitacao/management')
              }}
              node='button'
              style={{
                marginRight: '5px'
              }}
              waves='light'
            >
              Gerenciar configurações
              <Icon left>edit</Icon>
            </Button>
          ) : null}
        </div>
      </Panel>
    )
  }
}

export default Solicitacao
