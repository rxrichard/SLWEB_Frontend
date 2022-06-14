import React from "react";

import { makeStyles } from "@material-ui/core/styles";

export const Folder = ({ folder }) => {
  const classes = useStyles();

  const handleOpen = async () => {
    alert('abrir pasta')
  }

  const handleDelete = async () => {
    alert('apagar pasta')
  }

  return (
    <div className={classes.content}>PASTA</div>
  )
}

const useStyles = makeStyles((theme) => ({
  content: {
    background: 'yellow',
    height: '100px',
    width: '100px',
    margin: '8px',
    padding: '8px'
  }
}))