import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();

  const handleChange = (e) => {
    props.onChange(e.target.value)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField type={props.type} id="standard-basic" label={props.label} onChange={e => handleChange(e)}/>
    </form>
  );
}