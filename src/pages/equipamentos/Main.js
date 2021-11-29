import React from 'react';
import moment from 'moment'

import { Build, Sync } from '@material-ui/icons'
import { Typography, Tooltip, Button, makeStyles } from '@material-ui/core';

import { GREY_PRIMARY } from '../../misc/colors'

function MainSection(props) {
  const classes = useStyles();

  return (
    <div
      className="XAlign"
      style={{
        flex: '1',
        border: `1px solid ${GREY_PRIMARY}`,
        maxHeight: '600px',
        overflow: 'auto',
        borderRadius: '0px 0px 8px 8px',
        alignItems: 'flex-start'
      }}>
      {props.Ativos.map(item => (
        <div className={classes.root}>
          <div className="YAlign">
            <Typography variant="h6">
              {item.Nome_Fantasia}
            </Typography>
            <Typography variant='subtitle1'>
              Modelo: {item.EquiDesc}
            </Typography>
            <Typography variant='subtitle1'>
              Matrícula: {item.EquiCod}
            </Typography>
          </div>

          <div className="YAlign" style={{ alignItems: 'flex-end' }}>
            <Tooltip
              title={
                <label style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }} >
                  Remanejar Ativo
                </label>
              }
              placement="left"
              arrow
              followCursor
            >
              <Button
                style={{ marginBottom: '8px' }}
                color="primary"
                variant="contained"
                disabled={false}
                onClick={() => props.onOpenModal(item.EquiCod)}
              >
                <Build />
              </Button>
            </Tooltip>

            <Tooltip
              title={
                <label style={{ fontSize: "14px", color: "#FFF", lineHeight: "20px" }} >
                  Sincronizar TMT
                </label>
              }
              placement="left"
              arrow
              followCursor
            >
              <Button
                color={props.isInCooldown ? "secondary" : "primary"}
                variant="outlined"
                disabled={props.isInCooldown}
                onClick={() => props.onSync(item.EquiCod)}
              >
                {props.isInCooldown !== false ? props.isInCooldown : <Sync />}
                
              </Button>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainSection;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '8px 16px',
    margin: '8px 16px',
    borderBottom: '1px solid #ccc',

    '&:last-child': {
      borderBottom: 'none',
    }
  },
}));
