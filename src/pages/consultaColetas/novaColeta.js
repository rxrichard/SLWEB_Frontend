import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { api } from '../../services/api'

import { Add as AddIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  useMediaQuery,
  Button,
  MenuItem,
  Typography,
  Divider,
  Fab
} from '@material-ui/core';

import Select from '../../components/materialComponents/Select'

import { NovaColetaModal } from './modals/NovaColeta';

export const NovaColeta = (props) => {
  const classes = useStyles();
  const isMdUp = useMediaQuery('@media (min-width: 1500px)');
  const { handleCloseModal } =  props;

  const [leiturasDisponiveis, setLeiturasDisponiveis] = useState([]);
  const [leituraDoses, setLeituraDoses] = useState([]);
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
      setLeituraDoses([]);
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
    setLeituraDoses([])
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

  // const handleGravaColeta = async() => {
  //   try{
  //     const response = await api.post('', {
        
  //     })

  //     console.log(response.data)
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  useEffect(() => {
    handleCloseModal()
  }, [isMdUp, handleCloseModal])

  useEffect(() => {
    async function getQtd() {
      if (margemLeitura.de !== null && margemLeitura.ate !== null) {
        const response = await api.get(`/coletas/novacoleta/${margemLeitura.deID}/${margemLeitura.ateID}/${detalhes.AnxId}/${detalhes.PdvId}`)

        setLeituraDoses(response.data.Coleta)
      }
    }
    getQtd()
  }, [margemLeitura, detalhes.AnxId, detalhes.PdvId])

  return isMdUp ? (
    <Paper className={classes.root}>
      <div className={classes.container}>
        {WhichContentShow(props.Equipamentos, detalhes, classes, handleRequestDetails, leiturasDisponiveis, margemLeitura, setMargemLeitura, leituraDoses, setLeituraDoses)}
      </div>
    </Paper>
  ) : (
    <>
      <div
        style={{
          position: "absolute",
          right: "50px",
          bottom: "50px",
          alignItems: "unset",
        }}
      >
        <Fab
          color="primary"
          onClick={props.handleOpenModal}
          variant="extended"
        >
          <AddIcon className={classes.extendedIcon} />
          Nova Coleta
        </Fab>
      </div>
      <NovaColetaModal
        open={props.open}
        onClose={props.handleCloseModal}
        title='Nova Coleta'
      >
        {WhichContentShow(props.Equipamentos, detalhes, classes, handleRequestDetails, leiturasDisponiveis, margemLeitura, setMargemLeitura, leituraDoses, setLeituraDoses)}
      </NovaColetaModal>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '30%',
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
    minWidth: '430px'
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
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const WhichContentShow = (
  equipamentos,
  detalhes,
  classes,
  handleLookForPastData,
  leituras,
  margem,
  setMargem,
  leituraDoses,
  setLeituraDoses
) => {
  return (
    <>
      <Typography
        variant='h5'
        style={{ margin: '8px 0px 0px 8px' }}
      >
        Nova Coleta
      </Typography>
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
      {detalhes.EquiCod !== '' ? (
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
      ) : null}
      {detalhes.EquiCod !== '' ? (
        <section
          className={classes.sectionRow}
          style={{
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            alignItems: 'center',
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
            onChange={(e) => {
              setLeituraDoses([])
              setMargem({
                de: e.target.value !== '' ? e.target.value : null,
                deID: e.target.value !== '' ? leituras.filter(leit => leit.DataLeitura === e.target.value)[0].LeituraId : null,
                ate: e.target.value !== '' ? e.target.value : null,
                ateID: e.target.value !== '' ? leituras.filter(leit => leit.DataLeitura === e.target.value)[0].LeituraId : null,
                excluir: null
              })
            }}
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
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}>
            &#x2192;
          </Typography>
          <Select
            width="150px"
            MBottom="8px"
            MTop="8px"
            MRight="8px"
            MLeft="8px"
            label="Leitura até:"
            disabled={margem.de === null || margem.de === margem.ate ? true : false}
            value={margem.ate === null ? '' : margem.ate}
            onChange={(e) => {
              setLeituraDoses([])
              setMargem(oldObj => {
                return {
                  ...oldObj,
                  ate: e.target.value !== '' ? e.target.value : null,
                  ateID: e.target.value !== '' ? leituras.filter(leit => leit.DataLeitura === e.target.value)[0].LeituraId : null,
                }
              })
            }
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
      ) : null}
      {detalhes.EquiCod !== '' && margem.ate !== null && margem.de !== null ? (
        <section className={classes.sectionRow}>
          <div className={classes.infoBox}>
            <Typography
            >
              Consumo
            </Typography>
            <Typography
              style={{
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}
            >
              {
                (leituras.filter(leit => leit.DataLeitura === margem.ate)[0] && margem.ate !== null && margem.de !== null ?
                  leituras.filter(leit => leit.DataLeitura === margem.ate)[0].Contador
                  :
                  0)
                -
                (leituras.filter(leit => leit.DataLeitura === margem.de)[0] && margem.de !== null && margem.ate !== null ?
                  leituras.filter(leit => leit.DataLeitura === margem.de)[0].Contador
                  :
                  0)
              } DOSES
            </Typography>
          </div>
        </section>
      ) : null}
      <Divider />
      <section
        className='YAlign'
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'flex-start'
        }}
      >
        {leituraDoses.map(leit => (
          <div
            className='XAlign'
            style={{
              width: '100%',
              justifyContent: 'space-between',
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '0px 8px 1px 8px',
              borderBottom: '1px solid #CCC',
              flexWrap: 'nowrap'
            }}
          >
            <div
              className='YAlign'
            >
              <Typography variant='subtitle1'>
                <strong
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                  {leit.Produto}
                </strong>
              </Typography>
              <Typography variant='subtitle2'>(Seleção {leit.Selecao})</Typography>
            </div>
            <div
              className='YAlign'
              style={{
                alignItems: 'flex-end',
                flexWrap: 'nowrap',
              }}
            >
              <Typography variant='subtitle1'>
                Pagas: <strong>{leit.Consumo.Real}</strong>
              </Typography>
              <Typography variant='subtitle2'>
                Teste: <strong>{leit.Consumo.Teste}</strong>
              </Typography>
            </div>
          </div>
        ))}
      </section>
      <Divider />
      <Button
        variant='contained'
        color='primary'
        style={{
          width: '100%',
          borderRadius: '0px 0px 4px 4px',
        }}
        disabled={leituraDoses.length === 0}
        onClick={() => alert('Ainda não implementado')}
      >
        GRAVAR COLETA
      </Button>
    </>
  )
}