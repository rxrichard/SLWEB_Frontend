import React from 'react';
import moment from 'moment'


import { ExpandLess as ExpandLessIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
  ListItemText,
  Paper
} from '@material-ui/core/';

import { capitalizeMonthFirstLetter } from '../../misc/commom_functions'

export const Consultas = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Accordion
        expanded
      >
        <AccordionSummary
          expandIcon={<ExpandLessIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography
              variant='h5'
            >
              Coletas gravadas
            </Typography>
          </div>
        </AccordionSummary>
        <section
          style={{
            height: '100%',
            overflowY: 'auto'
          }}
        >
          {props.Coletas.length === 0 ?
            <div className='XAlign'>
              <Typography>
                Nenhuma coleta gravada
              </Typography>
            </div>
            :
            props.Coletas.map(coleta =>
              <>
                <AccordionDetails
                  onClick={() => props.onOpenColetaDetails(coleta.AnxId, coleta.PdvId, coleta.FfmSeq, coleta)}
                  button
                  className={classes.details}
                >
                  <div
                    style={{
                      background: 'red',
                      height: '124px',
                      width: '40px',
                      marginRight: '8px',
                      borderRadius: '8px 0px 0px 8px'
                    }}>
                    excluir
                  </div>
                  <ListItemText primary={coleta.Anexo} secondary={coleta.EquiCod} />
                  <div className={classes.helper}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Referencia</strong>
                      <br />
                      {capitalizeMonthFirstLetter(moment(coleta.Ref).utc().format('MMMM YYYY'))}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Sequencia</strong>
                      <br />
                      {coleta.FfmSeq}
                    </Typography>
                  </div>
                </AccordionDetails>
                <Divider />
              </>
            )}
        </section>
      </Accordion>
    </Paper>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '70%',
    height: '100%',

    '&:first-child> div': {
      height: '100%',
    },

    '&:first-child> div > div:last-child': {
      overflowY: 'auto',
      height: 'calc(100% - 70px)',
      minHeight: 'unset !important',

      '@media (max-width: 800px)': {
        height: 'calc(100% - 100px)',
      }
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    '&:hover': {
      transition: "150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      backgroundColor: "#CCC",
      cursor: "pointer",
    }
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
    minWidth: '160px',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));