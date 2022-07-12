import React from 'react'

import { makeStyles, withStyles } from '@material-ui/styles';
import { Typography, Button, Menu, ListItemText, ListItemIcon, MenuItem, Breadcrumbs, Link } from '@material-ui/core';
import { Home as HomeIcon, GetApp as Download, MoreVert as MoreVertIcon, Folder as FolderIcon, CreateNewFolder as CreateNewFolderIcon, Edit as EditIcon, MoveToInbox as MoveToInboxIcon, Lock as LockIcon, Delete as DeleteIcon, InsertDriveFile as InsertDriveFileIcon, Backup as BackupIcon, Security as SecurityIcon } from '@material-ui/icons';

import { useFiles } from '../../hooks/useFiles'

export const Options = ({ onOpenNewFolderModal, onOpenRenameModal, onOpenUploadModal, onOpenSecurityModal }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    data: { folderPath, markedItems },
    actions: { onNavigate, onDownloadMarkedItems },
    uiPermissions: {
      shouldEnableNewFolderButton,
      shouldEnableDownloadButton,
      shouldEnableRenameButton,
      shouldEnableMoveButton,
      shouldEnableBlockButton,
      shouldEnableDeleteButton,
      shouldEnableUploadButton,
      shouldEnableSecurityButton
    }
  } = useFiles()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (event, index) => {
    event.preventDefault();

    let targetFolder = encodeURI(folderPath.slice(0, folderPath.indexOf(folderPath[index]) + 1).toString().replace(/,/g, '\\'))

    onNavigate(targetFolder)
  }

  return (
    <div className='XAlign' style={{ flexWrap: 'nowrap' }}>
      <Breadcrumbs
        maxItems={2}
        aria-label="breadcrumb"
        className={classes.bread}
      >
        {folderPath.map((folder, i) => {
          if (folderPath.length - 1 > i) {
            return (
              <Link
                key={folder}
                color="inherit"
                href="/arquivos"
                onClick={(e) => handleNavigate(e, i)}
                className={classes.link}
              >
                {i === 0 ?
                  <HomeIcon className={classes.icon} />
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

          <StyledMenuItem disabled={true} onClick={() => { }} style={{ borderBottom: '3px dashed #d3d4d5' }}>
            <ListItemIcon>
              {markedItems.length > 0 ? <FolderIcon fontSize="small" color='primary' /> : <InsertDriveFileIcon fontSize="small" color='primary' />}
            </ListItemIcon>
            <ListItemText style={{ color: 'red' }} primary={markedItems.length > 0 ? `${markedItems.length} ARQUIVO${markedItems.length > 1 ? 'S' : ''} SELECIONADO${markedItems.length > 1 ? 'S' : ''}` : 'ESTA PASTA'} />
          </StyledMenuItem>

          {shouldEnableSecurityButton ?
            <StyledMenuItem onClick={onOpenSecurityModal} disabled={false} >
              <ListItemIcon>
                <SecurityIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary='Permissões' />
            </StyledMenuItem>
            :
            null
          }

          {shouldEnableUploadButton ?
            <StyledMenuItem onClick={onOpenUploadModal} disabled={false} >
              <ListItemIcon>
                <BackupIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary='Upload' />
            </StyledMenuItem>
            :
            null
          }

          {shouldEnableNewFolderButton ?
            <StyledMenuItem onClick={onOpenNewFolderModal} disabled={false}>
              <ListItemIcon>
                <CreateNewFolderIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary='Criar pasta aqui' />
            </StyledMenuItem>
            :
            null
          }

          {shouldEnableDownloadButton ?
            <StyledMenuItem onClick={onDownloadMarkedItems} disabled={false}>
              <ListItemIcon>
                <Download fontSize="small" />
              </ListItemIcon>
              <ListItemText primary='Fazer download' />
            </StyledMenuItem>
            :
            null
          }

          {shouldEnableRenameButton ?
            <StyledMenuItem onClick={onOpenRenameModal} disabled={false}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={markedItems.length > 0 ? `Renomear arquivo${markedItems.length > 1 ? 's' : ''}` : 'Renomear esta pasta'} />
            </StyledMenuItem>
            :
            null
          }

          {shouldEnableMoveButton ?
            <StyledMenuItem onClick={() => { }} disabled={false} >
              <ListItemIcon>
                <MoveToInboxIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={markedItems.length > 0 ? `Mover arquivo${markedItems.length > 1 ? 's' : ''}` : 'Mover esta pasta'} />
            </StyledMenuItem>
            :
            null
          }

          {shouldEnableBlockButton ?
            <StyledMenuItem onClick={() => { }} disabled={false} >
              <ListItemIcon>
                <LockIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={markedItems.length > 0 ? `Bloquear arquivo${markedItems.length > 1 ? 's' : ''}` : 'Bloquear esta pasta'} />
            </StyledMenuItem>
            :
            null
          }

          {shouldEnableDeleteButton ?
            <StyledMenuItem onClick={() => { }} disabled={false} >
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={markedItems.length > 0 ? `Apagar arquivo${markedItems.length > 1 ? 's' : ''}` : 'Apagar esta pasta'} />
            </StyledMenuItem>
            :
            null
          }

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
