import React from 'react';
import Button from '@material-ui/core/Button';
import Settings from '@material-ui/icons/Settings';

  export default function IconLabelButtons(props) {
  
    return (
        <Button
        variant="contained"
        color="default"
        size="large"
        startIcon={<Settings />}

        className={props.className}
        href={props.href}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    );
  }
