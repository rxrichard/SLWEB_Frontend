import React from 'react';

import { Typography, Button } from '@material-ui/core';

import { GREY_SECONDARY } from '../../misc/colors'

const Header = (props) => {
  return (
    <div
      className="XAlign"
      style={{
        width: '100%',
        minHeight: '200px',
        backgroundColor: GREY_SECONDARY,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '8px 16px',
        borderRadius: '8px 8px 0 0',
      }}>

      <div className="YAlign" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Button
          style={{ marginBottom: '8px', width: '230px' }}
          color="primary"
          variant="contained"
          disabled={false}
          onClick={() => props.onOpenReportModal()}
        >
          Reportar problema
        </Button>
        <Button
          style={{ marginBottom: '8px', width: '230px' }}
          color="primary"
          variant="contained"
          disabled={false}
          onClick={() => props.onOpenMiFixModal()}
        >
          Chamados MiFix
        </Button>
        <Button
          style={{ marginBottom: '8px', width: '230px' }}
          color="primary"
          variant="contained"
          disabled={true}
          onClick={() => {}}
        >
          Confirmar instalações
        </Button>
      </div>

      <div className="YAlign" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Typography variant="h4" style={{ color: '#fff' }}>
          Equipamentos: {props.EquipamentosTotal}
        </Typography>
        <Typography variant="h4" style={{ color: '#fff' }}>
          Aguardando instalação: {props.EquipamentosStandyBy}
        </Typography>
      </div>

    </div>
  );
}

export default Header;