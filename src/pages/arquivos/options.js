import React from 'react'

import { makeStyles, withStyles } from '@material-ui/styles';
import { Typography, Button, Menu, ListItemText, ListItemIcon, MenuItem, Breadcrumbs, Link } from '@material-ui/core';
import { Home as HomeIcon, GetApp as Download, MoreVert as MoreVertIcon, Folder as FolderIcon, CreateNewFolder as CreateNewFolderIcon, Edit as EditIcon, MoveToInbox as MoveToInboxIcon, Lock as LockIcon, Delete as DeleteIcon, InsertDriveFile as InsertDriveFileIcon } from '@material-ui/icons';

export const Options = ({ folders, onClickFolder, selectedItems, onDownloadMarked, onOpenNewFolderModal, onOpenRenameModal }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (event, index) => {
    event.preventDefault();

    let targetFolder = encodeURI(folders.slice(0, folders.indexOf(folders[index]) + 1).toString().replace(/,/g, '\\'))

    onClickFolder(targetFolder)
  }

  return (
    <div className='XAlign' style={{ flexWrap: 'nowrap' }}>
      <Breadcrumbs
        maxItems={2}
        aria-label="breadcrumb"
        className={classes.bread}
      >
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
      <div style={{ height: '100%' }} >
        <Button
          onClick={handleClick}
          style={{ height: '100%', borderRadius: '0px' }}
          startIcon={<MoreVertIcon />}
          variant='contained'
          color='primary'
        >
          Opções
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {returnOpcoes(selectedItems, onDownloadMarked, onOpenNewFolderModal, onOpenRenameModal)}
        </StyledMenu>
      </div>
    </div>
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

const StyledMenu = withStyles({ paper: { border: '1px solid #d3d4d5', }, })((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const returnOpcoes = (selectedItems, onDownloadMarked, onOpenNewFolderModal, onOpenRenameModal) => {
  return (
    [
      <StyledMenuItem disabled={true} onClick={() => { }} style={{ borderBottom: '3px dashed #d3d4d5' }}>
        <ListItemIcon>
          {selectedItems.length > 0 ? <FolderIcon fontSize="small" color='primary' /> : <InsertDriveFileIcon fontSize="small" color='primary' />}
        </ListItemIcon>
        <ListItemText style={{ color: 'red' }} primary={selectedItems.length > 0 ? `${selectedItems.length} ARQUIVO${selectedItems.length > 1 ? 'S' : ''} SELECIONADO${selectedItems.length > 1 ? 'S' : ''}` : 'ESTA PASTA'} />
      </StyledMenuItem>,
      <StyledMenuItem onClick={onOpenNewFolderModal}>
        <ListItemIcon>
          <CreateNewFolderIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary='Criar pasta aqui' />
      </StyledMenuItem>,
      <StyledMenuItem onClick={onDownloadMarked} disabled={selectedItems.length === 0}>
        <ListItemIcon>
          <Download fontSize="small" />
        </ListItemIcon>
        <ListItemText primary='Fazer download' />
      </StyledMenuItem>,
      <StyledMenuItem onClick={onOpenRenameModal}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={selectedItems.length > 0 ? `Renomear arquivo${selectedItems.length > 1 ? 's' : ''}` : 'Renomear esta pasta'} />
      </StyledMenuItem>,
      <StyledMenuItem onClick={() => { }}>
        <ListItemIcon>
          <MoveToInboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={selectedItems.length > 0 ? `Mover arquivo${selectedItems.length > 1 ? 's' : ''}` : 'Mover esta pasta'} />
      </StyledMenuItem>,
      <StyledMenuItem onClick={() => { }}>
        <ListItemIcon>
          <LockIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={selectedItems.length > 0 ? `Bloquear arquivo${selectedItems.length > 1 ? 's' : ''}` : 'Bloquear esta pasta'} />
      </StyledMenuItem>,
      <StyledMenuItem onClick={() => { }}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={selectedItems.length > 0 ? `Apagar arquivo${selectedItems.length > 1 ? 's' : ''}` : 'Apagar esta pasta'} />
      </StyledMenuItem>
    ]
  )
}
