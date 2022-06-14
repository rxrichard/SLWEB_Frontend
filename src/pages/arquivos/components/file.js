import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, Checkbox, Avatar, ListItemText, ListItemAvatar, IconButton, ListItemSecondaryAction } from "@material-ui/core";
import { GetApp as DownloadIcon, Work as WorkIcon } from "@material-ui/icons";

export const File = ({ file, onMarkItem, markedItems }) => {
  const classes = useStyles();

  const handleDownload = async () => {
    alert('baixar arquivo')
  }

  const handleDelete = async () => {
    alert('apagar arquivo')
  }

  const handleMark = () => {
    onMarkItem(file)
  }

  return (
    <ListItem button onClick={handleMark}>
      <ListItemIcon>
        <Checkbox
          className={classes.checkbox}
          edge="start"
          checked={markedItems.indexOf(file.filename) >= 0}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <ListItemAvatar>
        <Avatar>
          {whichAvatarDisplay()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={file.filename} />
      <ListItemSecondaryAction>
        <IconButton
          color='primary'
          onClick={handleDownload}
        >
          <DownloadIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const useStyles = makeStyles((theme) => ({
  content: {
    background: 'red',
    height: '100px',
    width: '100px',
    margin: '8px',
    padding: '8px'
  },
  checkbox: {
    transform: "scale(0.3)",
  }
}))

const whichAvatarDisplay = (filename) => {
  return <WorkIcon />
}