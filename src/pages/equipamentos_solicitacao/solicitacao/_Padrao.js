import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ImportExport from "@material-ui/icons/ImportExport";

import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Toast } from "../../../components/toasty";
import { clickButton, clearConfig } from "../../../global/actions/index";
import Selecao from "../../../components/materialComponents/Select";
import Input from "./_InputValor";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog({ Padrao, State, clickButton, clearConfig }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [PSelecionado, setPSelecionado] = React.useState([]);

  const { Pagamento } = State;

  const setValor = (Selecionado, indice, valor) => {
    let ConfigAux = [...Selecionado];

    ConfigAux[indice].Valor = Number(valor);
    setPSelecionado(ConfigAux);
    return;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPSelecionado([]);
  };

  const handleConfirm = () => {
    let valid = false;
    if (PSelecionado.length === 0) {
      Toast("Nenhuma configuração padrão selecionada");
      return;
    }
    PSelecionado.map((selec) => {
      if (typeof selec.Valor == "undefined" && Pagamento !== "Livre") {
        valid = true;
      }
      return null;
    });

    if (valid) {
      Toast("Configure o valor de todas as bebidas");
      return;
    }

    clearConfig();

    PSelecionado.map((confg) => {
      clickButton({
        id: confg.Cod,
        selecao: confg.Selecao,
        bebida: confg.Bebida,
        medida: confg.Qtd_Def,
        tipo: confg.TProd,
        contenedor: confg.Contenedor,
        configura: true,
        valor: Pagamento === "Livre" ? "0" : confg.Valor,
      });
      return null
    });

    setOpen(false);
    setPSelecionado([]);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<ImportExport />}
        onClick={handleClickOpen}
      >
        Carregar Padrão
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Configuração Padrão
            </Typography>
            <Button color="inherit" onClick={handleConfirm}>
              Carregar
            </Button>
          </Toolbar>
        </AppBar>
        <Selecao
          width="200px"
          label="Configuração"
          value=""
          onChange={(e) => setPSelecionado(e.target.value)}
        >
          {Padrao.map((config) => (
            <MenuItem value={config}>{config[0].MaqConfigNome}</MenuItem>
          ))}
        </Selecao>
        <List>
          <Divider />
          {PSelecionado.map((selecao, i) => (
            <>
              <ListItem>
                <ListItemText
                  primary={`${selecao.Selecao}. ${selecao.Bebida}`}
                  secondary={`${selecao.Qtd_Def}ML, ${selecao.TProd}`}
                />
                <ListItemSecondaryAction>
                  {Pagamento === "Livre" ? (
                    <h6>Livre</h6>
                  ) : (
                    <Input
                      onChange={(e) =>
                        setValor(PSelecionado, i, e.target.value)
                      }
                      label="Valor da Bebida"
                    />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ clickButton, clearConfig }, dispatch);

const mapStateToProps = (store) => ({
  State: store.solicitacaoState,
});

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenDialog);
