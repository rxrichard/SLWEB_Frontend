import React from 'react'
import { Link } from "react-router-dom";

import { List, Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core/";
import Icon from '@material-ui/core/Icon';
import { CollectionsBookmark, Assignment, Person, PersonPinCircle, ExitToApp, ShoppingCart, Help, AddShoppingCart, Kitchen, PermContactCalendar, SyncAlt as SyncAltIcon, EmojiFoodBeverage, AssignmentInd, CompassCalibration, MailOutline, SupervisedUserCircle, StoreMallDirectory, Shop, Folder } from "@material-ui/icons/";

import { GREY_SECONDARY } from "../../misc/colors";
import { REACT_APP_FRANQUEADO_ROLE_LEVEL } from "../../misc/role_levels";
import { roleLevel, navigateTo } from "../../misc/commom_functions";

export const SidebarLinks = ({ onCloseDrawer, onOpenFiliaisModal }) => {

  const Links = JSON.parse(window.sessionStorage.getItem('links'))

  const handleLogout = () => {
    window.sessionStorage.clear();
    navigateTo('move', "/")
  };

  return (
    <div style={{
      display: "flex",
      flex: '1',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      <div style={{
        display: "flex",
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}>
        <List>

          {Links.map(lnk => (
            <Link
              onClick={() => navigateTo('link', lnk.Link)}
              to={lnk.Link}
              style={{ color: GREY_SECONDARY }}
              title={lnk.Descricao}
            >
              <ListItem button onClick={onCloseDrawer}>
                <ListItemIcon>
                  <Icon>{lnk.Icon}</Icon>
                  {/* <PersonPinCircle /> */}
                </ListItemIcon>

                <ListItemText primary={lnk.Descricao} />
              </ListItem>
            </Link>
          ))}
        </List>
        {/* {roleLevel() > REACT_APP_FRANQUEADO_ROLE_LEVEL ? (
          <>
            <List>
              <ListItem
                button
                onClick={onOpenFiliaisModal}
              >
                <ListItemIcon>
                  <SyncAltIcon />
                </ListItemIcon>
                <ListItemText primary="Filiais" />
              </ListItem>
            </List>
            <Divider />
          </>
        ) : null}
        {sessionStorage.getItem("filial_logada") === 'true' ? <List>
          <Link
            onClick={() => navigateTo('link', "/perfil")}
            to="/perfil"
            style={{ color: GREY_SECONDARY }}
            title="Perfil"
          >
            <ListItem button onClick={onCloseDrawer}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>

              <ListItemText primary="Perfil" />
            </ListItem>
          </Link>
          <Link
            onClick={() => navigateTo('link', "/leads")}
            to="/leads"
            style={{ color: GREY_SECONDARY }}
            title="Leads"
          >
            <ListItem button onClick={onCloseDrawer}>
              <ListItemIcon>
                <PersonPinCircle />
              </ListItemIcon>

              <ListItemText primary="Leads" />
            </ListItem>
          </Link>
        </List> : null}
        <Divider />
        {sessionStorage.getItem("filial_logada") === 'true' ? <List>
          <Link
            onClick={() => navigateTo('link', "/clientes")}
            to="/clientes"
            style={{ color: GREY_SECONDARY }}
            title="Clientes"
          >
            <ListItem button onClick={onCloseDrawer}>
              <ListItemIcon>
                <AssignmentInd />
              </ListItemIcon>

              <ListItemText primary="Clientes" />
            </ListItem>
          </Link>
          <Link
            onClick={() => navigateTo('link', "/pontodevenda")}
            to="/pontodevenda"
            style={{ color: GREY_SECONDARY }}
            title="Pontos de Venda"
          >
            <ListItem button onClick={onCloseDrawer}>
              <ListItemIcon>
                <StoreMallDirectory />
              </ListItemIcon>

              <ListItemText primary="Pontos de Venda" />
            </ListItem>
          </Link>
        </List> : null}
        <Divider />
        {sessionStorage.getItem("filial_logada") === 'true' ? <List>
          <Link
            onClick={() => navigateTo('link', "/compras")}
            to="/compras"
            style={{ color: GREY_SECONDARY }}
            title="Compras"
          >
            <ListItem button onClick={onCloseDrawer}>
              <ListItemIcon>
                <AddShoppingCart />
              </ListItemIcon>

              <ListItemText primary="Compras" />
            </ListItem>
          </Link>
          <Link
            onClick={() => navigateTo('link', "/vendas")}
            to="/vendas"
            style={{ color: GREY_SECONDARY }}
            title="Vendas"
          >
            <ListItem button onClick={onCloseDrawer}>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>

              <ListItemText primary="Vendas" />
            </ListItem>
          </Link>
        </List> : null}
        <Divider />
        {sessionStorage.getItem("filial_logada") === 'true' ? <List>
          <Link
            onClick={() => navigateTo('link', "/equipamentos")}
            to="/equipamentos"
            style={{ color: GREY_SECONDARY }}
            title="Equipamentos"
          >
            <ListItem button onClick={onCloseDrawer}>
              <ListItemIcon>
                <Kitchen />
              </ListItemIcon>

              <ListItemText primary="Equipamentos" />
            </ListItem>
          </Link>
          <Link
            onClick={() => navigateTo('link', "/equipamentos/solicitacao")}
            to="/equipamentos/solicitacao"
            style={{ color: GREY_SECONDARY }}
            title="Solicitação de Equipamentos"
          >
            <ListItem button onClick={onCloseDrawer}>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>

              <ListItemText primary="Solicitação" />
            </ListItem>
          </Link>
        </List> : null}
        <Divider />
        {roleLevel() > REACT_APP_FRANQUEADO_ROLE_LEVEL ? (
          <>
            <List>
              <Link
                onClick={() => navigateTo('link', "/equipamentos/solicitacao/management")}
                to="/equipamentos/solicitacao/management"
                style={{ color: GREY_SECONDARY }}
                title="Gestao de solicitacoes de equipamentos"
              >
                <ListItem button onClick={onCloseDrawer}>
                  <ListItemIcon>
                    <CollectionsBookmark />
                  </ListItemIcon>

                  <ListItemText primary="Solicitações" />
                </ListItem>
              </Link>
              <Link
                onClick={() => navigateTo('link', "/administracao/leads")}
                to="/administracao/leads"
                style={{ color: GREY_SECONDARY }}
                title="Gestão de Leads"
              >
                <ListItem button onClick={onCloseDrawer}>
                  <ListItemIcon>
                    <SupervisedUserCircle />
                  </ListItemIcon>

                  <ListItemText primary="Gestão de Leads" />
                </ListItem>
              </Link>
              <Link
                onClick={() => navigateTo('link', "/administracao/pedidos/compra")}
                to="/administracao/pedidos/compra"
                style={{ color: GREY_SECONDARY }}
                title="Pedidos de Compra"
              >
                <ListItem button onClick={onCloseDrawer}>
                  <ListItemIcon>
                    <Shop />
                  </ListItemIcon>

                  <ListItemText primary="Pedidos de Compra" />
                </ListItem>
              </Link>
              <Link
                onClick={() => navigateTo('link', "/administracao/emails")}
                to="/administracao/emails"
                style={{ color: GREY_SECONDARY }}
                title="Central de Emails"
              >
                <ListItem button onClick={onCloseDrawer}>
                  <ListItemIcon>
                    <MailOutline />
                  </ListItemIcon>

                  <ListItemText primary="Emails" />
                </ListItem>
              </Link>
              <Link
                onClick={() => navigateTo('link', "/administracao/formularios")}
                to="/administracao/formularios"
                style={{ color: GREY_SECONDARY }}
                title="Formularios de interesses"
              >
                <ListItem button onClick={onCloseDrawer}>
                  <ListItemIcon>
                    <PermContactCalendar />
                  </ListItemIcon>

                  <ListItemText primary="Formulários" />
                </ListItem>
              </Link>
            </List>
            <Divider />
          </>
        ) : null}
        {sessionStorage.getItem("filial_logada") === 'true' ? <List>
          <Link
            onClick={() => navigateTo('link', "/monitor")}
            to="/monitor"
            style={{ color: GREY_SECONDARY }}
            title="Telemetria"
          >
            <ListItem button onClick={onCloseDrawer}>
              <ListItemIcon>
                <CompassCalibration />
              </ListItemIcon>

              <ListItemText primary="Telemetria" />
            </ListItem>
          </Link>
          <Link
            onClick={() => navigateTo('link', "/leituras")}
            to="/leituras"
            style={{ color: GREY_SECONDARY }}
            title="Coletas"
          >
            <ListItem button onClick={onCloseDrawer}>
              <ListItemIcon>
                <EmojiFoodBeverage />
              </ListItemIcon>

              <ListItemText primary="Coletas" />
            </ListItem>
          </Link>
        </List> : null}
        <Divider /> */}
        <List>
          {/* <Link
            onClick={() => navigateTo('link', "/arquivos")}
            to="/arquivos"
            style={{ color: GREY_SECONDARY }}
            title="Arquivos"
          >
            <ListItem button onClick={onCloseDrawer}>
              <ListItemIcon>
                <Folder />
              </ListItemIcon>

              <ListItemText primary="Arquivos " />
            </ListItem>
          </Link> */}
          <Link
            onClick={() => navigateTo('link', "/ajuda")}
            to="/ajuda"
            style={{ color: GREY_SECONDARY }}
            title="Ajuda"
          >
            <ListItem button onClick={onCloseDrawer}>
              <ListItemIcon>
                <Help />
              </ListItemIcon>

              <ListItemText primary="Ajuda" />
            </ListItem>
          </Link>
          <ListItem button onClick={handleLogout} title="Sair">
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>

            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </div>
      {/* <div style={{
        display: "flex",
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}>
      </div> */}
    </div>
  )
}