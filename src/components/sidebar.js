import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Link } from "react-router-dom";
import { scaleDown as Menu } from "react-burger-menu";
import { Icon, Dropdown } from "react-materialize";

import { Combobox, Exit } from "./commom_in";
import { Header } from "./header";
import Logo from "../assets/logo_sl.PNG";
import { OverflowOn, OverflowOff } from "../global/actions/EtcAction";
import { RED_SECONDARY, GREY_LIGHT } from './colors'

function Sidebar(props) {
  const { OverflowOn, OverflowOff } = props;

  const handleChange = (open) => {
    if (open) {
      OverflowOff();
    } else {
      OverflowOn();
    }
  };

  return (
    <Header>
      <Menu
        width={250}
        pageWrapId="App"
        outerContainerId="outer"
        onStateChange={(e) => handleChange(e.isOpen)}
        styles={styles}
      >
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

        {window.sessionStorage.getItem("role") === "Sistema" ||
        window.sessionStorage.getItem("role") === "BackOffice" ||
        window.sessionStorage.getItem("role") === "Técnica Bianchi" ||
        window.sessionStorage.getItem("role") === "Técnica Pilão" ||
        window.sessionStorage.getItem("role") === "Jurídico" ? (
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
              <Link to="/administracao/emails">
                <Icon center>email</Icon>Emails
              </Link>
            </Dropdown>
          </Combobox>
        ) : null}

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
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      OverflowOn,
      OverflowOff,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Sidebar);

var styles = {
  bmBurgerButton: {
    position: "sticky",
    width: "36px",
    height: "30px",
    marginLeft: "25px",
    marginTop: "18px",
  },

  bmBurgerBars: {
    background: "#ffffff",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#555",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: sessionStorage.getItem('role') === 'Franquia' ? RED_SECONDARY : GREY_LIGHT,
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#4fe613",
  },
  bmItemList: {
    color: "#b8b7ad",
  },
  bmItem: {
    display: "inline-block",
    textDecoration: "none",
    marginBottom: "10px",
    color: "#d1d1d1",
    transition: "color 0.2s",
    width: "100%",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};
