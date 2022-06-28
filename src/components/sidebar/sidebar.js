import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

import {
  makeStyles,
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
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
  AssignmentInd,
  CompassCalibration,
  MailOutline,
  StoreMallDirectory,
  SupervisedUserCircle,
} from "@material-ui/icons/";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";

import { roleLevel } from "../../misc/commom_functions";
import { REACT_APP_FRANQUEADO_ROLE_LEVEL } from "../../misc/role_levels";
import { RED_PRIMARY, GREY_LIGHT, GREY_SECONDARY } from "../../misc/colors";

import { FilialSelectionModal } from './filiaisModal'
import { SidebarLinks } from './links'

const drawerWidthFull = 240;
const drawerWidthCell = 200;

export default function MiniDrawer() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const stylePC = useStyles_FULL();
  const styleCELL = useStyles_CELL();

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [classes, setClasses] = useState(stylePC);

  useEffect(() => {
    setClasses(isMdUp ? stylePC : styleCELL);
  }, [isMdUp, stylePC, styleCELL]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenModal = async () => {
    setOpenModal(true);
    setOpen(false); 
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  return (
    <div className={classes.root}>
      <FilialSelectionModal
        open={openModal}
        onClose={handleCloseModal}
      />
      <CssBaseline />
      <AppBar
        position="fixed"
        className={isMdUp ? clsx(classes.appBar, { [classes.appBarShift]: open, }) : classes.appBar}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            className={isMdUp ? clsx(classes.menuButton, { [classes.hide]: open, }) : classes.menuButton}
          >
            <Menu fontSize="large" />
          </IconButton>
          <div />
        
          <Link
            to="/"
            style={{ color: roleLevel() > REACT_APP_FRANQUEADO_ROLE_LEVEL ? GREY_SECONDARY : "#FFF", }}
          >
              <div style={{ display: "flex" }}>
              <MenuItem style={{ margin: "0 10px" }}>
                <Link
                  to="/compras/carrinho"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                  title="Carrinho"
                >
                  <IconButton color="inherit">
                    <Badge badgeContent={10} color="primary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                  <p>Carrinho</p>
                </Link>
              </MenuItem>
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-end'}}>
            <Typography
              color={
                roleLevel() > REACT_APP_FRANQUEADO_ROLE_LEVEL
                  ? "primary"
                  : "default"
              }
              variant="subtitle2"
            >
              {sessionStorage.getItem("usuário")}
            </Typography>
            <Typography variant="h6">SLAPLIC</Typography>
            </div>
            </div>
            {/* <img style={{ height: "64px" }} src={Logo} alt="Inicio" /> */}
          </Link>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMdUp ? "permanent" : "temporary"}
        className={clsx(classes.drawer, { [classes.drawerOpen]: open, [classes.drawerClose]: !open, })}
        classes={isMdUp ? { paper: clsx({ [classes.drawerOpen]: open, [classes.drawerClose]: !open, }), } : { paper: classes.drawerPaper }}
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
        <SidebarLinks
          onCloseDrawer={handleDrawerClose}
          onOpenFiliaisModal={handleOpenModal}
        />
      </Drawer>
    </div>
  );
}

const useStyles_CELL = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background:
      roleLevel() <= REACT_APP_FRANQUEADO_ROLE_LEVEL ? RED_PRIMARY : GREY_LIGHT,
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidthCell,
  },
  drawerPaper: {
    width: drawerWidthCell,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
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
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
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
