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
  Typography,
  Divider
} from '@material-ui/core';

import Select from '../../components/materialComponents/Select'

import { NovaColetaModal } from './modals/NovaColeta';

export const NovaColeta = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [leiturasDisponiveis, setLeiturasDisponiveis] = useState([]);
  const [margemLeitura, setMargemLeitura] = useState({
    de: null,
    deID: null,
    ate: null,
    ateID: null,
    excluir: null
  });
  const [detalhes, setDetalhes] = useState({
    EquiCod: '',
    Cliente: null,
    CNPJ: null,
    AnxId: null,
    PdvId: null,
    UltimaColeta: null,
    ProximaColeta: null,
    ContadorAnterior: null,
    ProximaColetaMes: null,
    Zerou: null,
  })

  const handleRequestDetails = async (eqdata) => {
    if (typeof eqdata == 'undefined') {
      handleClearNovaLeituraStates()
      return;
    }

    try {
      const response = await api.get(`/coletas/historico/${eqdata.EquiCod}/${eqdata.AnxId}`)

      setLeiturasDisponiveis(response.data.LeiturasDisponiveis)

      setMargemLeitura({
        de: response.data.UltColeta[0] ? response.data.UltColeta[0].UltimaColeta : null,
        deID: response.data.UltColeta[0] ? response.data.LeiturasDisponiveis.filter(leit => leit.DataLeitura === response.data.UltColeta[0].UltimaColeta)[0].LeituraId : null,
        ate: null,
        ateID: null,
        excluir: response.data.UltColeta[0] ? response.data.UltColeta[0].UltimaColeta : null
      })

      setDetalhes({
        EquiCod: eqdata.EquiCod,
        Cliente: String(eqdata.AnxDesc).trim(),
        CNPJ: eqdata.CNPJss,
        AnxId: eqdata.AnxId,
        PdvId: eqdata.PdvId,
        UltimaColeta: response.data.UltColeta[0] ? response.data.UltColeta[0].UltimaColeta : null,
        ProximaColeta: response.data.UltColeta[0] ? response.data.UltColeta[0].ProximaColeta : null,
        ContadorAnterior: response.data.UltColeta[0] ? response.data.UltColeta[0].ContadorAnterior : null,
        ProximaColetaMes: response.data.UltColeta[0] ? response.data.UltColeta[0].ProximaColetaMes : null,
        Zerou: response.data.UltColeta[0] ? response.data.UltColeta[0].Zerou : null,
      })

    } catch (err) {
      console.log(err)
    }
  }

  const handleClearNovaLeituraStates = () => {
    setLeiturasDisponiveis([])
    setMargemLeitura({
      de: null,
      deID: null,
      ate: null,
      ateID: null,
      excluir: null
    })
    setDetalhes({
      EquiCod: '',
      Cliente: null,
      CNPJ: null,
      AnxId: null,
      PdvId: null,
      UltimaColeta: null,
      ProximaColeta: null,
      ContadorAnterior: null,
      ProximaColetaMes: null,
      Zerou: null,
    })
  }

  useEffect(() => {
    props.handleCloseModal()
  }, [isMdUp])

  useEffect(() => {
    if (margemLeitura.de !== null && margemLeitura.ate !== null) {
      alert('buscar leitura')
      console.log(margemLeitura)
    }
  }, [margemLeitura])

  return isMdUp ? (
    <Paper className={classes.root}>
      <div className={classes.container}>
        {WhichContentShow(props.Equipamentos, detalhes, classes, handleRequestDetails, leiturasDisponiveis, margemLeitura, setMargemLeitura)}
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
        {WhichContentShow(props.Equipamentos, detalhes, classes, handleRequestDetails, leiturasDisponiveis, margemLeitura, setMargemLeitura)}
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
  handleLookForPastData,
  leituras,
  margem,
  setMargem
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
          value={detalhes.EquiCod}
          onChange={(e) => handleLookForPastData(equipamentos.filter(eq => eq.EquiCod === e.target.value)[0])}
        >
          {equipamentos.map((eq) => (
            <MenuItem
              value={eq.EquiCod}
              key={eq.EquiCod}
            >
              {eq.EquiCod}
            </MenuItem>
          ))}
        </Select>
        <div
          className={classes.infoBox}
        >
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
      <Divider />
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
            {detalhes.Zerou === null ? '-' : detalhes.Zerou === 'N' ? 'Não' : 'Sim'}
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
            {detalhes.ProximaColeta === null ? '-' : Number(detalhes.ProximaColeta) - 1}
          </Typography>
        </div>
      </section>
      <Divider />
      <section
        className={classes.sectionRow}
        style={{
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Select
          width="150px"
          MBottom="8px"
          MTop="8px"
          MRight="8px"
          MLeft="8px"
          label="Leitura de:"
          disabled={margem.de === null || margem.de === margem.ate ? false : true}
          value={margem.de === null ? '' : margem.de}
          onChange={(e) => setMargem({
            de: e.target.value,
            deID: leituras.filter(leit => leit.DataLeitura === e.target.value)[0].LeituraId,
            ate: e.target.value,
            ateID: leituras.filter(leit => leit.DataLeitura === e.target.value)[0].LeituraId,
            excluir: null
          })
          }
        >
          {
            leituras.map((leitura) =>
              <MenuItem
                value={leitura.DataLeitura}
              >
                {moment(leitura.DataLeitura).utc().format("DD/MM/YYYY HH:mm:ss")}
              </MenuItem>
            )
          }
        </Select>
        <Select
          width="150px"
          MBottom="8px"
          MTop="8px"
          MRight="8px"
          MLeft="8px"
          label="Leitura até:"
          disabled={margem.de === null || margem.de === margem.ate ? true : false}
          value={margem.ate === null ? '' : margem.ate}
          onChange={(e) => setMargem(oldObj => {
            return {
              ...oldObj,
              ate: e.target.value,
              ateID: leituras.filter(leit => leit.DataLeitura === e.target.value)[0].LeituraId,
            }
          })
          }
        >
          {leituras.filter(leit => leit.DataLeitura !== margem.excluir).reverse().map((leitura) =>
            <MenuItem
              value={leitura.DataLeitura}
            >
              {moment(leitura.DataLeitura).utc().format("DD/MM/YYYY HH:mm:ss")}
            </MenuItem>
          )}
        </Select>
      </section>
      <section className={classes.sectionRow}>
        <div className={classes.infoBox}>
          <Typography
          >
            Zerar máquina
          </Typography>
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            Sim / Não
          </Typography>
        </div>
        <div className={classes.infoBox}>
          <Typography
          >
            Referencia
          </Typography>
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            Selecionar mes
          </Typography>
        </div>
      </section>
      <Divider />
    </>
  )
}