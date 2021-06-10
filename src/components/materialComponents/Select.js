import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [variable, setVariable] = useState("");

  const handleChange = (event) => {
    setVariable(event.target.value);
    props.onChange(event);
  };

  useEffect(() => {
    setVariable(props.value);
  }, [props.value]);

  return (
    <div>
      <FormControl
        style={{ minWidth: props.width ? props.width : "120px" }}
        variant="outlined"
        className={classes.formControl}
        disabled={props.disabled}
      >
        <InputLabel id="demo-simple-select-outlined-label">
          {props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={variable}
          onChange={handleChange}
          label={props.label}
        >
          <MenuItem value="">
            <em>Nenhuma</em>
          </MenuItem>
          {props.children}
        </Select>
        {props.condicao && props.disabled ? (
          <FormHelperText>{props.condicao}</FormHelperText>
        ) : (
          ""
        )}
      </FormControl>
    </div>
  );
}
