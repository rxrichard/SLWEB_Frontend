import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import { GREY_SECONDARY } from "../../misc/colors";
import Loading from "../../components/loading_screen";

const FullScreenDialog = (props) => {
  const classes = useStyles();

  return (
      <Dialog
        fullScreen
        open={props.open}
        onClose={() => props.onClose()}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => props.onClose()}
              aria-label="close"
              >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Chamados MiFix
            </Typography>
          </Toolbar>
        </AppBar>
        <Loading />
      </Dialog>
  );
}

export default FullScreenDialog;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
      backgroundColor: GREY_SECONDARY,
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    button: {
      marginLeft: "8px",
      marginBottom: "8px",
      color: GREY_SECONDARY,
      height: "54px",
      border: `1px solid ${GREY_SECONDARY}`,
      "&:hover": {
        border: `1px solid ${GREY_SECONDARY}`,
      },
    },
  }));
