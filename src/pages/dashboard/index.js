import React, { useEffect } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

//import de componentes

import SideBar from './sidebar'

//import de telas
import Clientes from '../../pages_old/clientes/index'
import Contratos from '../../pages_old/contratos/index'
import Anexos from '../../pages_old/anexos/index'
import PontoVenda from '../../pages_old/pontoDeVenda/index'
import Equipamentos from '../../pages_old/equipamentos'
import Compra from '../../pages_old/compra/index'
import AddClientes from '../../pages_old/clientes_novo/index'
import AddContratos from '../../pages_old/contratos_novo/index'
import AddAnexos from '../../pages_old/anexos_novo/index'
import AddPontoVenda from '../../pages_old/pontoDeVenda_novo/index'
import AddEquipamentos from '../../pages_old/equipamentos_solicitacao/index'
import graficos from './graficos'

//import de css
import '../../../node_modules/materialize-css/dist/js/materialize'
import '../../../node_modules/materialize-css/dist/css/materialize.css'
import '../../../node_modules/materialize-css/dist/css/materialize.min.css'
import '../../globalStyle.css'

export default function Dashboard() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
      
      }}
    >
      <div id='App'>
        <SideBar pageWrapId={'page-wrap'} outerContainerId={'App'} />
        
        <Router>
          <Switch>
            <Route exact path='/' component={graficos} />
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
            <Route exact path='/compra' component={Compra} />
          </Switch>
        </Router>
      </div>
    </div>
  )
}
