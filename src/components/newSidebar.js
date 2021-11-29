import React, { useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

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
  useMediaQuery
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
  Kitchen
} from "@material-ui/icons/";

import { roleLevel } from "../misc/commom_functions";
import { REACT_APP_FRANQUEADO_ROLE_LEVEL } from "../misc/role_levels";
import { RED_PRIMARY, GREY_LIGHT, GREY_SECONDARY } from "../misc/colors";

const drawerWidthFull = 240;
const drawerWidthCell = 200;

export default function MiniDrawer() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const stylePC = useStyles_FULL()
  const styleCELL = useStyles_CELL()

  const [open, setOpen] = React.useState(false);
  const [classes, setClasses] = React.useState(stylePC);

  useEffect(() => {
    setClasses(isMdUp ? stylePC : styleCELL);
  }, [isMdUp])

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
                <AddShoppingCart />
              </ListItemIcon>

              <ListItemText primary="Compras" />
            </ListItem>
          </Link>
          <Link to="/vendas" style={{ color: GREY_SECONDARY }}>
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
