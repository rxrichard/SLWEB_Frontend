import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function MultilineTextFields(props) {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label={props.label}
          multiline
          rowsMax={4}
          value={value}
          onChange={handleChange}
          variant="outlined"
        />
      </div>
    </form>
  );
}