import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { api } from '../../services/api'

import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  useTheme,
  useMediaQuery,
  Button,
  MenuItem,
  Typography
} from '@material-ui/core';

import Select from '../../components/materialComponents/Select'

import { NovaColetaModal } from './modals/NovaColeta';

export const NovaColeta = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [detalhes, setDetalhes] = useState({
    Cliente: null,
    CNPJ: null,
    AnxId: null,
    PdvId: null,
    UltimaColeta: null,
    ProximaColeta: null,
    ContadorAnterior: null,
    ProximaColetaMes: null,
  })

  const handleRequestDetails = async (eqdata) => {
    try {
      const response = await api.get(`/coletas/historico/${eqdata.EquiCod}`)
      setDetalhes({
        Cliente: String(eqdata.AnxDesc).trim(),
        CNPJ: eqdata.CNPJss,
        AnxId: eqdata.AnxId,
        PdvId: eqdata.PdvId,
        UltimaColeta: response.data.UltColeta[0] ? response.data.UltColeta[0].UltimaColeta : null,
        ProximaColeta: response.data.UltColeta[0] ? response.data.UltColeta[0].ProximaColeta : null,
        ContadorAnterior: response.data.UltColeta[0] ? response.data.UltColeta[0].ContadorAnterior : null,
        ProximaColetaMes: response.data.UltColeta[0] ? response.data.UltColeta[0].ProximaColetaMes : null,
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    props.handleCloseModal()
  }, [isMdUp])

  return isMdUp ? (
    <Paper className={classes.root}>
      <div className={classes.container}>
        {WhichContentShow(props.Equipamentos, detalhes, classes, handleRequestDetails)}
      </div>
    </Paper>
  ) : (
    <>
      <Button
        onClick={props.handleOpenModal}
        variant="contained"
        color="primary"
      >
        Nova Coleta
      </Button>
      <NovaColetaModal
        open={props.open}
        onClose={props.handleCloseModal}
        title='Nova Coleta'
      >
        {WhichContentShow(props.Equipamentos, detalhes, classes, handleRequestDetails)}
      </NovaColetaModal>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    height: '100%',
    overflowY: 'auto',
    marginLeft: '8px',
  },
  container: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: '100%',
    width: '100%',
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #18a0fb',
    borderRadius: '5px',
    color: '#18a0fb',
    backgroundColor: '#fff',
    padding: '0px 20px',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '8px 8px',
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  sectionRow: {
    display: "flex",
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-around",
  },
}));

const WhichContentShow = (
  equipamentos,
  detalhes,
  classes,
  handleLookForPastData
) => {
  return (
    <>
      <section className={classes.sectionRow}>
        <Select
          width="150px"
          MBottom="8px"
          MTop="8px"
          MLeft="8px"
          label="Equipamento"
          disabled={false}
          value=''
          onChange={(e) => handleLookForPastData(e.target.value)}
        >
          {equipamentos.map((eq) => (
            <MenuItem
              value={eq}
              key={eq.EquiCod}
            >
              {eq.EquiCod}
            </MenuItem>
          ))}
        </Select>
        <div className={classes.infoBox}>
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            {detalhes.Cliente === null ? 'Cliente' : detalhes.Cliente}
          </Typography>
          <Typography>
            {detalhes.CNPJ === null ? 'CNPJ / CPF' : detalhes.CNPJ}
          </Typography>
        </div>
      </section>
      <section className={classes.sectionRow}>
        <div className={classes.infoBox}>
          <Typography
          >
            Última Coleta
          </Typography>
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            {detalhes.UltimaColeta === null ? '-' : moment(detalhes.UltimaColeta).format('DD/MM/YYYY')}
          </Typography>
        </div>
        <div className={classes.infoBox}>
          <Typography
          >
            Contador
          </Typography>
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            {detalhes.ContadorAnterior === null ? '-' : detalhes.ContadorAnterior}
          </Typography>
        </div>
      </section>
      <section className={classes.sectionRow}>
        <div className={classes.infoBox}>
          <Typography
          >
            Zerou
          </Typography>
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            Não
          </Typography>
        </div>
        <div className={classes.infoBox}>
          <Typography
          >
            Coletas Realizadas
          </Typography>
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            9
          </Typography>
        </div>
      </section>
    </>
  )
}