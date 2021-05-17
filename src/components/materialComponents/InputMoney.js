import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

import { Toast } from '../toasty'

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
      '& #outlined-start-adornment': {
        border: "none",
        borderBottom: "none",
    },
    '& #outlined-start-adornment:focus': {
      border: "none !important",
      borderBottom: "none !important",
  },
  },
}));

export default function InputAdornments() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (event) => {
    const entrada = event.target.value

    if (
      Number.isSafeInteger(Number(entrada.replace(/,/g, ".")))
      ) {
      //Se o valor for valido, gravar no redux
    } else if (
      !Number.isSafeInteger(Number(entrada.replace(/,/g, ".")))
    ) {
      //se o valor for invalido, apagar caractére
      event.target.value = event.target.value.substring(0, event.target.value.length - 1)
    } else if (
      isNaN(Number(entrada.replace(/,/g, "."))) &&
      entrada.replace(/,/g, ".") !== ""
    ) {
      Toast("Use apenas caractéres numéricos");

      return;
    } else if (entrada.replace(/,/g, ".") === "") {
      
    } else {

    }
  };

  return (
    <div className={classes.root}>
      <div>
        <TextField
          label="Valor da Bebida"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          onChange={e => handleChange(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$/Ficha</InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </div>
    </div>
  );
}
