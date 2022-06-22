import React from 'react'

import { makeStyles } from '@material-ui/styles';
import { Typography, Breadcrumbs, Link } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';

export const Options = ({ folders, onClickFolder }) => {
  const classes = useStyles();

  const handleNavigate = (event, index) => {
    event.preventDefault();

    let targetFolder = encodeURI(folders.slice(0, folders.indexOf(folders[index]) + 1).toString().replace(/,/g, '\\'))

    onClickFolder(targetFolder)
  }

  return (
      <Breadcrumbs aria-label="breadcrumb" className={classes.bread}>
        {folders.map((folder, i) => {
          if (folders.length - 1 > i) {
            return (
              <Link
                key={folder}
                color="inherit"
                href="/arquivos"
                onClick={(e) => handleNavigate(e, i)}
                className={classes.link}
              >
                {i === 0 ?
                  <HomeIcon
                    className={classes.icon}
                  />
                  :
                  null
                }
                {folder}
              </Link>
            )
          } else {
            return (
              <Typography
                key={folder}
                color="textPrimary"
                className={classes.link}
              >
                {i === 0 ?
                  <HomeIcon className={classes.icon} />
                  :
                  null
                }
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
  bread: {
    display: 'flex',
    paddingLeft: '8px'
  }
}));