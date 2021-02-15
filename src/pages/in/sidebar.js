import React from "react";
import { push as Menu } from "react-burger-menu";
import { Navbar, Icon, Dropdown,  } from "react-materialize";
import { Combobox, Exit } from "../../components/commom_in";
import "../../style/cad.css";

export default sidebar => {
  return (
    <Navbar
      className="Nav"
      alignLinks="left"
      brand={
        <a className="brand-logo right" href="/">
          Bem Vindo(a) {localStorage.getItem("usuario").split(" ", 1)}!
        </a>
      }
    >
      <Menu {...sidebar}>
        <Combobox>
          <Dropdown
            options={{
              alignment: "center",
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
              <a style={{ minWidth: "250px" }} href="#!">
                Usuário<Icon left>person_pin</Icon>
              </a>
            }
          >
            <a href="/">
              <Icon center>description</Icon>
              Dashboard
            </a>
            <a href="/profile">
              <Icon center>person</Icon>
              Perfil
            </a>
            <a href="/help">
              <Icon center>help_outline</Icon>
              Ajuda
            </a>
     
          </Dropdown>
        </Combobox>

        <Combobox>
          <Dropdown
            options={{
              alignment: "center",
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
              <a style={{ minWidth: "200px" }} href="#!">
                Grupo<Icon left>nature_people</Icon>
              </a>
            }
          >
            <a href="/clientes">
              <Icon center>people</Icon>
              Clientes
            </a>
            <a href="/contratos">
              <Icon center>description</Icon>
              Contratos
            </a>
            <a href="/anexos">
              <Icon center>attach_file</Icon>Anexos
            </a>
            <a href="/pontosdevenda">
              <Icon center>store</Icon>Pontos de Venda
            </a>
          </Dropdown>
        </Combobox>
        <Combobox>
          <Dropdown
            options={{
              alignment: "center",
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
              <a style={{ minWidth: "185px" }} href="#!">
                Equipamentos<Icon left>build</Icon>
              </a>
            }
          >
            <a href="/equipamentos">
              <Icon center>kitchen</Icon>Máquinas
            </a>
            <a href="/configuracoes">
              <Icon center>settings_applications</Icon>Configurações
            </a>
            <a href="/receitas">
              <Icon center>free_breakfast</Icon>Receitas
            </a>
          </Dropdown>
        </Combobox>
        <Combobox>
          <Dropdown
            options={{
              alignment: "center",
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
              <a style={{ minWidth: "160px" }} href="#!">
                Suprimentos<Icon left>business_center</Icon>
              </a>
            }
          >
            <a href="/product">
              <Icon center>shopping_cart</Icon>Produtos
            </a>
            <a href="/depo">
              <Icon center>inbox</Icon>Depósitos
            </a>
            <a href="/inventory">
              <Icon center>card_travel</Icon>Estoque
            </a>
          </Dropdown>
        </Combobox>
        <Combobox>
          <Dropdown
            options={{
              alignment: "center",
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
              <a style={{ minWidth: "200px" }} href="#!">
                Finanças<Icon left>monetization_on</Icon>
              </a>
            }
          >
            <a href="/precosdevenda">
              <Icon center>local_atm</Icon>Preços de Venda
            </a>
            <a href="/compra">
              <Icon center>add_shopping_cart</Icon>Compra
            </a>
            <a href="/venda">
              <Icon center>call_made</Icon>Venda
            </a>
            <a href="/dre">
              <Icon center>list</Icon>DRE
            </a>
          </Dropdown>
        </Combobox>
    
        <Exit 
          onClick={() => {
            localStorage.clear();
            window.location.assign("/");
          }}
          href="/"
        >
          <Icon left>exit_to_app</Icon>
          Sair
        </Exit>
      </Menu>
    </Navbar>
  );
};
