import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function BasicTextFields(props) {

  const handleChange = (event) => {
    props.onChange(event.target.value, event)
  }

  return (
    <form noValidate autoComplete="off">
      <TextField 
      disabled={props.disabled} 
      style={props.style} 
      value={props.value} 
      type={props.type} 
      label={props.label} 
      onChange={e => handleChange(e)}/>
    </form>
  );
}