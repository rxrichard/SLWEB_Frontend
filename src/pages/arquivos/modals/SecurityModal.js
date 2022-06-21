import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  useMediaQuery,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core/';
import { useTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Close as CloseIcon,
  FolderSpecial as FolderSpecialIcon,
  Folder as FolderIcon,
  Description as DescriptionIcon,
  Help as HelpIcon
} from '@material-ui/icons';

export const SecurityModal = ({ open, onClose }) => {
  const theme = useTheme();
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [indexedFolders, setIndexedFolders] = useState([])
  const [operType, setOperType] = useState([])
  const [wait, setWait] = useState(false)

  const LoadData = async () => {
    try {
      const response = await api.get('/files/permissions/')

      setIndexedFolders(response.data.indexedFolders)
      setOperType(response.data.tipoOperadores)
      console.log(response.data.indexedFolders)
      console.log(response.data.tipoOperadores)
    } catch (err) {

    }
  }

  useEffect(() => {
    if (open) LoadData()
  }, [open])

  const handleClose = () => {
    if (wait) return
    onClose();
    setWait(false)
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
      >
        Permissões
      </DialogTitle>

      <DialogContent dividers>
        <List dense={true}>
          {indexedFolders.map(item => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  {whichIconShow(item.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.path_alias}
                secondary={item.path}
              />
              <ListItemSecondaryAction>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Grupo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Number(item.AccessLevel)}
                    onChange={() => { }}
                  >
                    {operType.map(op => (
                      <MenuItem value={Number(op.AccessLevel)}>{op.TopeDes}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>

      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: 500
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const whichIconShow = (type) => {
  switch (type) {
    case 'root':
      return <FolderSpecialIcon />
    case 'file':
      return <DescriptionIcon />
    case 'folder':
      return <FolderIcon />
    case 'UPLOAD_DUMP':
      return <FolderSpecialIcon />
    default:
      return <HelpIcon />
  }
}