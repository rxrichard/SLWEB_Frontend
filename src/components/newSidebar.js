import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
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
} from "@material-ui/icons/";

import { roleLevel } from "../misc/commom_functions";
import { REACT_APP_FRANQUEADO_ROLE_LEVEL } from "../misc/role_levels";
import { RED_PRIMARY, GREY_LIGHT, GREY_SECONDARY } from "../misc/colors";

const drawerWidth = 240;

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    window.sessionStorage.clear();
    window.location.assign("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
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
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/perfil" style={{ color: GREY_SECONDARY }}>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>

              <ListItemText primary="Perfil" />
            </ListItem>
          </Link>
          <Link to="/leads" style={{ color: GREY_SECONDARY }}>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <PersonPinCircle />
              </ListItemIcon>

              <ListItemText primary="Leads" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link to="/compras" style={{ color: GREY_SECONDARY }}>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>

              <ListItemText primary="Compras" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link
            to="/equipamentos/solicitacao"
            style={{ color: GREY_SECONDARY }}
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
              >
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <CollectionsBookmark />
                  </ListItemIcon>

                  <ListItemText primary="Solicitações" />
                </ListItem>
              </Link>
            </List>
            <Divider />
          </>
        ) : null}
        <List>
          <Link to="/ajuda" style={{ color: GREY_SECONDARY }}>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <Help />
              </ListItemIcon>

              <ListItemText primary="Ajuda" />
            </ListItem>
          </Link>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>

            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
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
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
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
