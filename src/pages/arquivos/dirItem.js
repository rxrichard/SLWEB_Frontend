import React from "react";

import { makeStyles } from "@material-ui/core/styles";

export const DirItem = ({ filename, type }) => {
  const classes = useStyles();

  const whichComponentShow = () => {
    switch (type) {
      case 'file':
        return (
          <section className={classes.content}>{filename}</section>
        )
      case 'folder':
        return (
          <section className={classes.content}>{filename}</section>
        )
      default:
        return null
    }
  }

  return (
    <>
      {whichComponentShow()}
    </>
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