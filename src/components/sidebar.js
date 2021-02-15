import React from 'react'
import { Link } from 'react-router-dom'
import { scaleDown as Menu } from 'react-burger-menu'
import { Icon, Dropdown } from 'react-materialize'

import { Combobox, Exit } from './commom_in'
import { Header } from './header'
import Logo from '../assets/logo_sl.PNG'

export default sidebar => {
  return (
    <Header>
      <Menu {...sidebar}>
        <Combobox>
          <Dropdown
            options={{
              alignment: 'center',
              autoTrigger: false,
              closeOnClick: true,
              constrainWidth: true,
              container: null,
              coverTrigger: false,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250
            }}
            trigger={
              <div className='Menu'>
                <a href='#!'>
                  <Icon left>person_pin</Icon>
                  Usuário
                </a>
              </div>
            }
          >
            <Link to='/'>
              <Icon center>description</Icon>
              Inicio
            </Link>
            <Link to='/perfil'>
              <Icon center>person</Icon>
              Perfil
            </Link>
            <Link to='/ajuda'>
              <Icon center>help_outline</Icon>
              Ajuda
            </Link>
          </Dropdown>
        </Combobox>

        <Combobox>
          <Dropdown
            options={{
              alignment: 'center',
              autoTrigger: false,
              closeOnClick: true,
              constrainWidth: true,
              container: null,
              coverTrigger: false,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250
            }}
            trigger={
              <div className='Menu'>
                <a href='#!'>
                  <Icon left>nature_people</Icon>Grupo
                </a>
              </div>
            }
          >
            <Link to='/clientes'>
              <Icon center>people</Icon>
              Clientes
            </Link>
            <Link to='/contratos'>
              <Icon center>description</Icon>
              Contratos
            </Link>
            <Link to='/anexos'>
              <Icon center>attach_file</Icon>Anexos
            </Link>
            <Link to='/pontosdevenda'>
              <Icon center>store</Icon>Pontos de Venda
            </Link>
          </Dropdown>
        </Combobox>
        <Combobox>
          <Dropdown
            options={{
              alignment: 'center',
              autoTrigger: false,
              closeOnClick: true,
              constrainWidth: true,
              container: null,
              coverTrigger: false,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250
            }}
            trigger={
              <div className='Menu'>
                <a href='#!'>
                  <Icon left>build</Icon>Equipamentos
                </a>
              </div>
            }
          >
            <Link to='/equipamentos'>
              <Icon center>kitchen</Icon>Máquinas
            </Link>
            <Link to='/configuracao'>
              <Icon center>settings_applications</Icon>Configurações
            </Link>
            <Link to='/receitas'>
              <Icon center>free_breakfast</Icon>Receitas
            </Link>
          </Dropdown>
        </Combobox>
        <Combobox>
          <Dropdown
            options={{
              alignment: 'center',
              autoTrigger: false,
              closeOnClick: true,
              constrainWidth: true,
              container: null,
              coverTrigger: false,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250
            }}
            trigger={
              <div className='Menu'>
                <a href='#!'>
                  <Icon left>business_center</Icon>Suprimentos
                </a>
              </div>
            }
          >
            <Link to='/product'>
              <Icon center>shopping_cart</Icon>Produtos
            </Link>
            <Link to='/deposito'>
              <Icon center>inbox</Icon>Depósitos
            </Link>
            <Link to='/inventory'>
              <Icon center>card_travel</Icon>Estoque
            </Link>
          </Dropdown>
        </Combobox>
        <Combobox>
          <Dropdown
            options={{
              alignment: 'center',
              autoTrigger: false,
              closeOnClick: true,
              constrainWidth: true,
              container: null,
              coverTrigger: false,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250
            }}
            trigger={
              <div className='Menu'>
                <a href='#!'>
                  <Icon left>monetization_on</Icon>Finanças
                </a>
              </div>
            }
          >
            <Link to='/compra'>
              <Icon center>add_shopping_cart</Icon>Compra
            </Link>
            <Link to='/venda'>
              <Icon center>call_made</Icon>Venda
            </Link>
            <Link to='/dre'>
              <Icon center>list</Icon>DRE
            </Link>
          </Dropdown>
        </Combobox>

        <Exit
          className='Menu'
          onClick={() => {
            sessionStorage.clear()
            window.location.assign('/')
          }}
          href='/'
        >
          <a href='/'>
            <Icon left>exit_to_app</Icon>
            Sair
          </a>
        </Exit>
      </Menu>

      <a href='/'>
        <img style={{ height: '64px' }} src={Logo} alt='Inicio' />
      </a>
    </Header>
  )
}
