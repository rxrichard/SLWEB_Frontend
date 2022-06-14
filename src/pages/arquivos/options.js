import React from 'react'

import {Typography, Breadcrumbs, Link, makeStyles } from '@material-ui/core';
import { Home as HomeIcon} from '@material-ui/icons';

export const Options = ({ folders, onClickFolder }) => {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.link}>
      {folders.map((folder, i) => {
        if (folders.length - 1 > i) {
          return (
            <Link color="inherit" href="/arquivos" onClick={onClickFolder} key={folder}>
              {folder}
            </Link>
          )
        } else {
          return (
            <Typography color="textPrimary" key={folder}>
              {i === 0 ? <HomeIcon className={classes.icon} /> : null}
              {folder}
            </Typography>
          )
        }
      })}
    </Breadcrumbs>
  )
}

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));