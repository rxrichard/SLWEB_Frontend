import React from "react";
import { Link } from "react-router-dom";
import { scaleDown as Menu } from "react-burger-menu";
import { Icon, Dropdown } from "react-materialize";

import { Combobox, Exit } from "./commom_in";
import { Header } from "./header";
import Logo from "../assets/logo_sl.PNG";

export default (sidebar) => {
  return (
    <Header>
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
              outDuration: 250,
            }}
            trigger={
              <div className="Menu">
                <a href="#!">
                  <Icon left>person_pin</Icon>
                  Usuário
                </a>
              </div>
            }
          >
            <Link to="/">
              <Icon center>description</Icon>
              Inicio
            </Link>
            <Link to="/perfil">
              <Icon center>person</Icon>
              Perfil
            </Link>
            <Link to="/ajuda">
              <Icon center>help_outline</Icon>
              Ajuda
            </Link>
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
              outDuration: 250,
            }}
            trigger={
              <div className="Menu">
                <a href="#!">
                  <Icon left>build</Icon>Equipamentos
                </a>
              </div>
            }
          >
            <Link to="/equipamentos/solicitacao">
              <Icon center>assignment</Icon>Solicitação
            </Link>
          </Dropdown>
        </Combobox>

        {window.sessionStorage.getItem('role') === 'Sistema' || window.sessionStorage.getItem('role') === 'BackOffice' || window.sessionStorage.getItem('role') === 'Técnica Bianchi' || window.sessionStorage.getItem('role') === 'Técnica Pilão' || window.sessionStorage.getItem('role') === 'Jurídico'? (<Combobox>
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
              outDuration: 250,
            }}
            trigger={
              <div className="Menu">
                <a href="#!">
                  <Icon left>supervisor_account</Icon>Administração
                </a>
              </div>
            }
          >
            <Link to="/administracao/franquia">
              <Icon center>recent_actors</Icon>Franquias
            </Link>
            <Link to="/equipamentos/solicitacao/management">
              <Icon center>collections_bookmark</Icon>Solicitações
            </Link>
            <Link to="/administracao/formularios">
              <Icon center>import_contacts</Icon>Formulários
            </Link>
          </Dropdown>
        </Combobox>) : null}
        
        <Exit
          className="Menu"
          onClick={() => {
            sessionStorage.clear();
            window.location.assign("/");
          }}
          href="/"
        >
          <a href="/">
            <Icon left>exit_to_app</Icon>
            Sair
          </a>
        </Exit>
      </Menu>

      <a href="/">
        <img style={{ height: "64px" }} src={Logo} alt="Inicio" />
      </a>
    </Header>
  );
};
