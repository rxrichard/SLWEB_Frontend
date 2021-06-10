import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

import { Toast } from "../../../components/toasty";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
    "& #outlined-start-adornment": {
      border: "none",
      borderBottom: "none",
    },
    "& #outlined-start-adornment:focus": {
      border: "none !important",
      borderBottom: "none !important",
    },
  },
}));

function InputAdornments(props) {
  const classes = useStyles();

  const { TipoValidador, Pagamento } = props.State;

  const handleChange = (event) => {
    const entrada = event.target.value;

    if(TipoValidador === 'Ficha' && Number.isSafeInteger(Number(entrada.replace(/,/g, ".")))){
      //testa se o pagamento é por validador ficha e o valor inserido é inteiro
      props.onChange(event);
      return;
    }else if(TipoValidador === 'Moeda' && (!isNaN(Number(entrada.replace(/,/g, "."))) &&
    entrada.replace(/,/g, ".") !== "")){
      //testa se o pagamento é validador moeda e se apenas foram inseridos números
      props.onChange(event);
      return;
    } else if(TipoValidador === null && (!isNaN(Number(entrada.replace(/,/g, "."))) &&
    entrada.replace(/,/g, ".") !== "")){
      //testa se apenas foram inseridos números
      props.onChange(event);
      return;
    }else if (entrada.replace(/,/g, ".") === "") {
      //se o campo for limpo
      props.onChange(event);
    }else{
      //se o valor for invalido, apagar caractére
      event.target.value = event.target.value.substring(0, event.target.value.length - 1);
      Toast("Valor inválido");
      return;
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <TextField
          label={props.label}
          disabled={props.disabled}
          helperText={Pagamento === 'Livre' ? '*Pagamento Livre' : null}
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {`${defineDecorator(TipoValidador)}:`}
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </div>
    </div>
  );
}

const mapStateToProps = (store) => ({
  State: store.solicitacaoState,
});

export default connect(mapStateToProps)(InputAdornments);

const defineDecorator = (TipoValidador) => {
  if (TipoValidador === "Ficha") {
    return "Ficha";
  } else {
    return "R$";
  }
};