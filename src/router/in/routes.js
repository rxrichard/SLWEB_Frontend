import React from 'react'
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'

//import de componentes
import SideBar from '../../components/sidebar'
import { Panel } from '../../components/commom_in'

//import de telas
import Perfil from '../../pages/perfil/index'
import Clientes from '../../pages/clientes/index_lista'
import Contratos from '../../pages/contratos/index'
import Anexos from '../../pages/anexos/index'
import PontoVenda from '../../pages/pontoDeVenda/index'
import Equipamentos from '../../pages/equipamentos/index'
import Compra from '../../pages/compra/index'
import Venda from '../../pages/venda/index'
import AddClientes from '../../pages/clientes_novo/index'
import AddContratos from '../../pages/contratos_novo/index'
import AddAnexos from '../../pages/anexos_novo/index'
import AddPontoVenda from '../../pages/pontoDeVenda_novo/index'
import AddEquipamentos from '../../pages/equipamentos_solicitacao/index'
import MaqManagement from '../../pages/equipamentos_solicitacao/editConfigs'
import DRE from '../../pages/DRE'
import Configuracao from '../../pages/configuracoes/index'
import graficos from '../../components/graficos'
import Depositos from '../../pages/depositos/index'

export default function Dashboard() {
  return (
    <div
      id='outer'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
      }}
    >
      <Router id='Out'>
        <SideBar width={250} pageWrapId='App' outerContainerId='outer' />
        <div id='App'>
          <Switch>
            <Route exact path='/' component={graficos} />
            <Route exact path='/perfil' component={Perfil} />
            <Route exact path='/clientes' component={Clientes} />
            <Route exact path='/clientes/novo' component={AddClientes} />
            <Route exact path='/anexos' component={Anexos} />
            <Route exact path='/anexos/novo' component={AddAnexos} />
            <Route exact path='/contratos' component={Contratos} />
            <Route exact path='/contratos/novo' component={AddContratos} />
            <Route exact path='/pontosdevenda' component={PontoVenda} />
            <Route exact path='/pontosdevenda/novo' component={AddPontoVenda} />
            <Route exact path='/equipamentos' component={Equipamentos} />
            <Route
              exact
              path='/equipamentos/solicitacao'
              component={AddEquipamentos}
            />
            <Route
              exact
              path='/equipamentos/solicitacao/management'
              component={MaqManagement}
            />
            <Route exact path='/compra' component={Compra} />
            <Route exact path='/venda' component={Venda} />
            <Route exact path='/dre' component={DRE} />
            <Route exact path='/configuracao' component={Configuracao} />
            <Route exact path='/deposito' component={Depositos} />
            <Route
              exact
              path='/ajuda'
              component={() => (
                <Panel>
                  <h5>No momento, ainda não possuimos suporte online</h5>
                  <p>
                    Para receber assistencia, entre em contato com:{' '}
                    <strong style={{ fontWeight: 'bold' }}>
                      (11) 97179-9810
                    </strong>
                    .
                  </p>
                  <p>
                    Ou por email com:{' '}
                    <strong style={{ fontWeight: 'bold' }}>
                      suporte1@slaplic.com.br
                    </strong>
                  </p>
                </Panel>
              )}
            />
            <Route
              path='*'
              component={() => (
                <Panel>
                  <h5>
                    Desculpe, não foi possivel te levar até a pagina desejada...
                  </h5>
                  <p>
                    Clique <Link to='/'>Aqui</Link> para retornar à aplicação
                  </p>
                </Panel>
              )}
            />
          </Switch>
        </div>
      </Router>
    </div>
  )
}
