import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { api } from '../../services/api'

import {
  makeStyles,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@material-ui/core/";

import {
  ChevronLeft,
  Menu,
  CollectionsBookmark,
  Assignment,
  Person,
  PersonPinCircle,
  ExitToApp,
  ShoppingCart,
  Help,
  AddShoppingCart,
  Kitchen,
  PermContactCalendar,
  SyncAlt as SyncAltIcon,
  EmojiFoodBeverage,
  // AssignmentInd,
  CompassCalibration
} from "@material-ui/icons/";

import { roleLevel } from "../../misc/commom_functions";
import { REACT_APP_FRANQUEADO_ROLE_LEVEL } from "../../misc/role_levels";
import { RED_PRIMARY, GREY_LIGHT, GREY_SECONDARY } from "../../misc/colors";
import { Toast } from "../toasty";
import FiliaisModal from './filiaisModal'

const drawerWidthFull = 240;
const drawerWidthCell = 200;

export default function MiniDrawer() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const stylePC = useStyles_FULL()
  const styleCELL = useStyles_CELL()

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [classes, setClasses] = useState(stylePC);
  const [usersList, setUserList] = useState([]);
  const [usersListFiltered, setUserFiltered] = useState([]);

  useEffect(() => {
    setClasses(isMdUp ? stylePC : styleCELL);
  }, [isMdUp, stylePC, styleCELL])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenModal = async () => {
    setOpenModal(true);
    setOpen(false);

    try {
      const response = await api.get('/dashboard/filiais')

      setUserList(response.data)
      setUserFiltered(response.data)
    } catch (err) {

    }
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setUserList([])
    setUserFiltered([])
  }

  const handleLogout = () => {
    window.sessionStorage.clear();
    window.location.assign("/");
  };

  const handleSwitchFilial = async (filial) => {
    let toastId = null

    try {
      toastId = Toast('Aguarde...', 'wait')

      const response = await api.post("/admAuth/full", {
        user_code: filial,
      });

      Toast('Conectado!', 'update', toastId, 'success')
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", response.data.role);

      window.location.reload();
    } catch (err) {
      Toast('Falha ao logar na filial', 'update', toastId, 'error')
    }
  }

  const Filter = (value, event) => {
    setUserFiltered(usersList);
    event.target.value = value.toUpperCase();
    value = value.toUpperCase();

    if (value === "") {
      setUserFiltered(usersList);
      return;
    }

    if (value.length > 4) {
      event.target.value = value.slice(0, 4);
      value = value.slice(0, 4);
    }

    setUserFiltered(usersList);
    let aux = [];
    let newArray = [];
    aux = [...usersList];

    for (let i = 0; i < aux.length; i++) {
      if (aux[i].M0_CODFIL.slice(0, value.length) === value) {
        newArray.push(aux[i]);
      }
    }

    setUserFiltered(newArray);
  };

  return (
    <div className={classes.root}>
      <FiliaisModal
        open={openModal}
        onClose={handleCloseModal}
        Filiais={usersListFiltered}
        onSelect={filial => handleSwitchFilial(filial)}
        onFilter={(v, e) => Filter(v, e)}
      />
      <CssBaseline />
      <AppBar
        position="fixed"
        className={isMdUp ? clsx(classes.appBar, {
          [classes.appBarShift]: open,
        }) : classes.appBar}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            className={isMdUp ? clsx(classes.menuButton, {
              [classes.hide]: open,
            }) : classes.menuButton}
          >
            <Menu fontSize="large" />
          </IconButton>
          <div />
          <Link
            to="/"
            style={{
              color:
                roleLevel() > REACT_APP_FRANQUEADO_ROLE_LEVEL
                  ? GREY_SECONDARY
                  : "#FFF",
            }}
          >
            <Typography variant="h6">SLAPLIC</Typography>
            {/* <img style={{ height: "64px" }} src={Logo} alt="Inicio" /> */}
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMdUp ? "permanent" : "temporary"}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={isMdUp ? {
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        } : {
          paper: classes.drawerPaper
        }}
        anchor='left'
        open={open}
        onClose={handleDrawerClose}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
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
            {roleLevel() > REACT_APP_FRANQUEADO_ROLE_LEVEL ? (
              <>
                <List>
                  <ListItem
                    button
                    onClick={handleOpenModal}
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
            <List>
              <Link to="/perfil" style={{ color: GREY_SECONDARY }} title="Perfil">
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>

                  <ListItemText primary="Perfil" />
                </ListItem>
              </Link>
              <Link to="/leads" style={{ color: GREY_SECONDARY }} title="Leads">
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <PersonPinCircle />
                  </ListItemIcon>

                  <ListItemText primary="Leads" />
                </ListItem>
              </Link>
            </List>
            <Divider />
            {/* <List>
              <Link to="/clientes" style={{ color: GREY_SECONDARY }} title="Clientes">
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <AssignmentInd />
                  </ListItemIcon>

                  <ListItemText primary="Clientes" />
                </ListItem>
              </Link>
              <Link to="/pontodevenda" style={{ color: GREY_SECONDARY }} title="Pontos de Venda">
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <StoreMallDirectory />
                  </ListItemIcon>

                  <ListItemText primary="Pontos de Venda" />
                </ListItem>
              </Link>
            </List>
            <Divider /> */}
            <List>
              <Link to="/compras" style={{ color: GREY_SECONDARY }} title="Compras">
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <AddShoppingCart />
                  </ListItemIcon>

                  <ListItemText primary="Compras" />
                </ListItem>
              </Link>
              <Link to="/vendas" style={{ color: GREY_SECONDARY }} title="Vendas">
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <ShoppingCart />
                  </ListItemIcon>

                  <ListItemText primary="Vendas" />
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <Link
                to="/equipamentos"
                style={{ color: GREY_SECONDARY }}
                title="Equipamentos"
              >
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <Kitchen />
                  </ListItemIcon>

                  <ListItemText primary="Equipamentos" />
                </ListItem>
              </Link>
              <Link
                to="/equipamentos/solicitacao"
                style={{ color: GREY_SECONDARY }}
                title="Solicitação de Equipamentos"
              >
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <Assignment />
                  </ListItemIcon>

                  <ListItemText primary="Solicitação" />
                </ListItem>
              </Link>
            </List>
            <Divider />
            {roleLevel() > REACT_APP_FRANQUEADO_ROLE_LEVEL ? (
              <>
                <List>
                  <Link
                    to="/equipamentos/solicitacao/management"
                    style={{ color: GREY_SECONDARY }}
                    title="Gestao de solicitacoes de equipamentos"
                  >
                    <ListItem button onClick={handleDrawerClose}>
                      <ListItemIcon>
                        <CollectionsBookmark />
                      </ListItemIcon>

                      <ListItemText primary="Solicitações" />
                    </ListItem>
                  </Link>
                  <Link
                    to="/administracao/formularios"
                    style={{ color: GREY_SECONDARY }}
                    title="Formularios de interesses"
                  >
                    <ListItem button onClick={handleDrawerClose}>
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
            <List>
              <Link to="/monitor" style={{ color: GREY_SECONDARY }}>
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <CompassCalibration />
                  </ListItemIcon>

                  <ListItemText primary="Telemetria" />
                </ListItem>
              </Link>
            </List>
            <List>
              <Link to="/leituras" style={{ color: GREY_SECONDARY }}>
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <EmojiFoodBeverage />
                  </ListItemIcon>

                  <ListItemText primary="Coletas" />
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <Link to="/ajuda" style={{ color: GREY_SECONDARY }} title="Ajuda">
                <ListItem button onClick={handleDrawerClose}>
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
          <div style={{
            display: "flex",
            flex: '1',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

const useStyles_CELL = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background:
      roleLevel() <= REACT_APP_FRANQUEADO_ROLE_LEVEL ? RED_PRIMARY : GREY_LIGHT,
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidthCell
  },
  drawerPaper: {
    width: drawerWidthCell
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

const useStyles_FULL = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background:
      roleLevel() <= REACT_APP_FRANQUEADO_ROLE_LEVEL ? RED_PRIMARY : GREY_LIGHT,
  },
  appBarShift: {
    marginLeft: drawerWidthFull,
    width: `calc(100% - ${drawerWidthFull}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {},
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidthFull,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidthFull,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
