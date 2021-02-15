import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

//import de componentes

import SideBar from './sidebar'
import "../../style/cad.css";

//import de telas
import Clientes from '../../pages_old/clientes/index_lista'
import Contratos from '../../pages_old/contratos/index'
import Anexos from '../../pages_old/anexos/index'
import PontoVenda from '../../pages_old/pontoDeVenda/index'
import Equipamentos from '../../pages_old/equipamentos/index'
import Compra from '../../pages_old/compra/index'
import Venda from '../../pages_old/venda/index'
import AddClientes from '../../pages_old/clientes_novo/index'
import AddContratos from '../../pages_old/contratos_novo/index'
import AddAnexos from '../../pages_old/anexos_novo/index'
import AddPontoVenda from '../../pages_old/pontoDeVenda_novo/index'
import AddEquipamentos from '../../pages_old/equipamentos_solicitacao/index'
import DRE from '../../pages_old/DRE'
import graficos from './graficos'

//import de css
import '../../../node_modules/materialize-css/dist/js/materialize'
import '../../style/materialize.css'
import '../../style/globalStyle.css'

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
            <Route exact path='/venda' component={Venda} />
            <Route exact path='/dre' component={DRE} />
          
         
            <Route path="*" component={() => (
            <>
            
            <h5>Desculpe, não foi possivel te levar até a pagina desejada...</h5>
            <p className='paginadesenvolvimento'>OPS !!! PAGINA EM DESENVOLVIMENTO!</p>
            <p className='paginadesenvolvimentob'><a href='/'>CLIQUE AQUI </a></p>
            <p className='paginadesenvolvimento'>para voltar para a aplicação</p>
            </>
            )} />
          </Switch>
        </Router>
      </div>
    </div>
  )
}
