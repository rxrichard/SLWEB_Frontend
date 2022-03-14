import React, { useState } from 'react';
import { api } from '../../../services/api'

import { withStyles, useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Close as CloseIcon,
  Add as AddIcon
} from '@material-ui/icons';
import {
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  IconButton,
  Typography,
  useMediaQuery,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox
} from '@material-ui/core'

import PainelComAbas from '../../../components/materialComponents/PainelAbas'
import { Toast } from '../../../components/toasty'

export const DispatchEmailsModal = ({ open, onClose, availableRecipients, onUpdateAvailableRecipients }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({
    fullScreen
  });

  const [mailData, setMailData] = useState(INITIAL_MAIL_DATA)
  const [customEmail, setCustomEmail] = useState({
    Email: '',
    id: 1
  })


  const handleCloseModal = () => {
    onClose()
  }

  const handleDisparaEmails = async () => {
    const confirmou = window.confirm('Deseja realmente disparar os emails?')

    console.log(mailData)

    // if (confirmou) {
    //   try {
    //     await api.post('/emails/dispatch/', {
    //       ...mailData
    //     })
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  }

  const handleSelectTemplate = (value) => {
    setMailData({
      ...mailData,
      template: value
    })
  }

  const handleMarkRecipient = (value) => {
    setMailData(oldState => {
      let index = null

      oldState.recipients.forEach((recipient, i) => {
        if (recipient.M0_CODFIL === value.M0_CODFIL) {
          index = i
        }
      })

      if (index === null) {
        return {
          ...oldState,
          recipients: [
            ...oldState.recipients,
            value
          ]
        }
      } else {
        return {
          ...oldState,
          recipients: [
            ...oldState.recipients
          ].filter(
            recipient => recipient.M0_CODFIL !== value.M0_CODFIL
          )
        }
      }
    })
  }

  const handleAddCustomEmail = () => {
    if (customEmail.Email === '') {
      Toast('Preencha um email', 'warn')
    }

    const newCustomRecipientToDisplay = {
      A1_GRPVEN: String(customEmail.id).padStart(6, 'X'),
      M0_CODFIL: `Extra ${customEmail.id}`,
      Email: customEmail.Email,
    }

    //add na lista geral
    onUpdateAvailableRecipients(oldState => {
      let aux = [...oldState]
      aux.unshift(newCustomRecipientToDisplay)

      return aux
    })

    //add na lista de recipients
    handleMarkRecipient(newCustomRecipientToDisplay)

    setCustomEmail(oldState => ({
      Email: '',
      id: oldState.id + 1
    }))
  }

  const handleMarkAll = () => {

  }

  const handleUnmarkAll = () => {
    
  }

  return (
    <div>
      <Dialog
        onClose={handleCloseModal}
        fullScreen={fullScreen}
        open={open}
      >
        <DialogTitle
          onClose={handleCloseModal}
        >
          Envio em massa de emails
        </DialogTitle>
        <DialogContent dividers>
          <PainelComAbas
            titles={['Email', 'Destinatários']}
          >
            <div className="YAlign">
              <FormControl
                variant="filled"
                className={classes.formControl}
              >
                <InputLabel>
                  Moldes salvos
                </InputLabel>
                <Select
                  className={classes.Select}
                  value={mailData.template}
                  onChange={e => handleSelectTemplate(e.target.value)}
                >
                  <MenuItem value={null}>
                    Selecione...
                  </MenuItem>
                  <MenuItem value='MOLDE 1'>MOLDE 1</MenuItem>
                  <MenuItem value='MOLDE 2'>MOLDE 2</MenuItem>
                  <MenuItem value='MOLDE 3'>MOLDE 3</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.SubjectInput}
                label="Assunto"
                variant="outlined"
                onChange={(e) => setMailData({
                  ...mailData,
                  subject: e.target.value
                })}
                value={mailData.subject}
              />
              <TextField
                className={classes.BodyInput}
                label="Corpo do Email"
                variant="outlined"
                multiline
                rows={4}
                value={mailData.body}
                onChange={(e) =>
                  setMailData({
                    ...mailData,
                    body: e.target.value
                  })}
              />
            </div>
            <div className='YAlign'>
              <div
                className='XAlign'
                style={{
                  borderBottom: '1px dashed #ccc',
                  padding: '0px 0px 8px 0px'
                }}
              >
                <TextField
                  className={classes.InputWithButton}
                  label="Inserir email extra"
                  variant="outlined"
                  value={customEmail.Email}
                  onChange={e => setCustomEmail({
                    ...customEmail,
                    Email: e.target.value
                  })}
                />
                <IconButton
                  className={classes.closeButton}
                  onClick={handleAddCustomEmail}
                >
                  <AddIcon
                    fontSize='medium'
                  />
                </IconButton>
              </div>
              <List
                dense
                className={classes.root}
              >
                {availableRecipients.map(recipient => (
                  <ListItem
                    key={recipient.M0_CODFIL}
                    button
                    onClick={() => handleMarkRecipient(recipient)}
                  >
                    <ListItemText
                      primary={`Filial ${recipient.M0_CODFIL}`}
                      secondary={recipient.Email}
                    />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        className={classes.checkbox}
                        onChange={() => handleMarkRecipient(recipient)}
                        checked={mailData.recipients.filter(recip => recip.M0_CODFIL === recipient.M0_CODFIL).length > 0}
                        inputProps={{ 'aria-labelledby': `checkbox-list-secondary-label-${recipient.M0_CODFIL}` }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          </PainelComAbas>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDisparaEmails}
            color="primary"
          >
            Confirmar e Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const INITIAL_MAIL_DATA = {
  template: null,
  subject: '',
  body: '',
  recipients: [],
  salvarNovoTemplate: false,
  nomeNovoTemplate: ''
}

const useStyles = makeStyles((theme) => ({
  SubjectInput: {
    margin: '0px 0px 8px 0px',
    width: '100%',
    '&:nth-child(2) > div > input': {
      marginLeft: '8px'
    },
  },
  InputWithButton: {
    width: 'calc(100% - 54.5px)',
    margin: '0px 8px 0px 0px',
    '&:nth-child(1) > div > input': {
      marginLeft: '8px'
    },
  },
  BodyInput: {
    width: '100%',
  },
  formControl: {
    margin: '0px 0px 8px 0px',
    minWidth: 120,
    width: '100%',
  },
  Select: {
    width: '100%'
  },
  root: props => ({
    width: '100%',
    maxWidth: props.fullscreen ? '100%' : '360px',
    backgroundColor: theme.palette.background.paper,
    overflowX: 'hidden',
    overflowY: 'auto',
    maxHeight: props.fullscreen ? '100%' : '400px',
    margin: '8px 0px 0px 0px'
  }),
  checkbox: {
    transform: "scale(0.3)",
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: '380px'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: '0px',
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
