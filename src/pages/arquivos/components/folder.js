import React from "react";

import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { FolderOpen as FolderOpenIcon, KeyboardReturn as KeyboardReturnIcon } from '@material-ui/icons'

export const Folder = ({ folder, onOpenFolder, type, goBack }) => {
  const classes = useStyles();

  const handleOpen = async () => {
    if (type === 'folder') {
      onOpenFolder(encodeURI(folder.path))
    } else {
      goBack()
    }
  }

  const handleDelete = async () => {
    alert('apagar pasta')
  }

  return (
    <div className={classes.content} onClick={handleOpen}>
      {type === 'folder' ?
        <FolderOpenIcon style={{ fontSize: 40 }} />
        :
        <KeyboardReturnIcon style={{ fontSize: 40 }} />
      }
      <Typography
        className={classes.label}
        variant='caption'>
        {folder.folder}
      </Typography>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    background: '#ccc',
    height: '100px',
    width: '200px',
    margin: '8px',
    padding: '8px',
    flexShrink: 0,
    borderRadius: '4px',
    border: '1px solid #333',
    transition: "150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

    '&:hover': {
      transition: "150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      cursor: 'pointer',
      background: '#333',
      color: '#ccc'
    }
  },
  label: {
    textAlign: 'center',
  }
}))