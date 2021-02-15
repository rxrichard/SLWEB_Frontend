import React from 'react'
import { useHistory } from 'react-router-dom'

//importação de icones
import logo_cliente from '../../assets/icon/clientes.png'
import logo_equipamentos from '../../assets/icon/equipamentos.png'
import logo_contratos from '../../assets/icon/contratos.png'
import logo_anexos from '../../assets/icon/anexos.png'
import logo_config from '../../assets/icon/configuracoes.png'
import logo_pvenda from '../../assets/icon/ponto-de-vendas.png'
import logo_receitas from '../../assets/icon/fechamento-bebidas-quentes.png'
import logo_produtos from '../../assets/icon/produtos.png'
import logo_precov from '../../assets/icon/precos-de-vendas.png'
import logo_dre from '../../assets/icon/DRE.png'
import logo_depositos from '../../assets/icon/depositos.png'
import logo_compraev from '../../assets/icon/pedidos-de-remessas.png'
import logo_inventario from '../../assets/icon/BQ-Remessa.png'

//css
import {
  Container,
  Subcontainer,
  Option,
  Header,
  Sidebar,
  Footer,
  Panel
} from '../../components/commom_in'
import { Box, Icon } from './styles'

function App() {
  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    window.location.assign('/')
  }

  const history = useHistory()

  return (
    <Container>
      <Header>
        <strong>Franqueado: {localStorage.getItem('usuario')}</strong>
      </Header>
      <Subcontainer>
        <Sidebar overflow={'auto'}>
          <Option
            onClick={() => {}}
            style={{ backgroundColor: '#e0dcdc', color: '#323835' }}
          >
            <label>Inicio</label>
          </Option>
          <Option onClick={() => {}}>
            <label>Perfil</label>
          </Option>
          <Option onClick={() => {}}>
            <label>Ajuda</label>
          </Option>
          <Option onClick={() => {}}>
            <label>Chat</label>
          </Option>
          <Option
            onClick={() => {
              logout()
            }}
          >
            <label>Sair</label>
          </Option>
        </Sidebar>
        <Panel>
          <Box
            onClick={() => {
              history.push('/dashboard/clientes')
            }}
          >
            <Icon src={logo_cliente} alt='Clientes logo' />
            <label>Clientes</label>
          </Box>
          <Box
            onClick={() => {
              history.push('/dashboard/contratos')
            }}
          >
            <Icon src={logo_contratos} />
            <label>Contratos</label>
          </Box>
          <Box
            onClick={() => {
              history.push('/dashboard/equipamentos')
            }}
          >
            <Icon src={logo_equipamentos} />
            <label>Equip.</label>
          </Box>
          <Box
            onClick={() => {
              history.push('/dashboard/anexos')
            }}
          >
            <Icon src={logo_anexos} alt='Clientes logo' />
            <label>Anexos</label>
          </Box>
          <Box>
            <Icon src={logo_config} alt='Clientes logo' />
            <label>Config.</label>
          </Box>
          <Box>
            <Icon src={logo_pvenda} alt='Clientes logo' />
            <label>Pontos de Venda</label>
          </Box>
          <Box>
            <Icon src={logo_receitas} alt='Clientes logo' />
            <label>Receitas</label>
          </Box>
          <Box>
            <Icon src={logo_produtos} alt='Clientes logo' />
            <label>Produtos</label>
          </Box>
          <Box>
            <Icon src={logo_precov} alt='Clientes logo' />
            <label>Preços de Venda</label>
          </Box>
          <Box>
            <Icon src={logo_dre} alt='Clientes logo' />
            <label>DRE</label>
          </Box>
          <Box>
            <Icon src={logo_depositos} alt='Clientes logo' />
            <label>Depósitos</label>
          </Box>
          <Box>
            <Icon src={logo_compraev} alt='Clientes logo' />
            <label>Compra e Venda</label>
          </Box>
          <Box>
            <Icon src={logo_inventario} alt='Clientes logo' />
            <label>Inventário</label>
          </Box>
        </Panel>
      </Subcontainer>
      <Footer>
        <label>Pilão Professional</label>
      </Footer>
    </Container>
  )
}

export default App
