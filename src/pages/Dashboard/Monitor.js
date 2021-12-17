import React, { useState, useEffect } from "react";
import moment from "moment";

import { api } from '../../services/api';

import { makeStyles } from '@material-ui/core/styles';
import {
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button,
  Typography,
} from '@material-ui/core/';
import {
  ExpandLess,
  ExpandMore,
  CheckCircle,
  Cancel,
  Email
} from '@material-ui/icons/';

import MiFixModal from './modals/AbrirChamado'
import Loading from '../../components/loading_screen'
import { toValidString } from '../../misc/commom_functions'
import { Toast } from '../../components/toasty'

function Home() {
  const classes = useStyles();

  const [loaded, setLoaded] = useState(false);
  const [telemetrias, setTelemetrias] = useState([]);
  const [expand, setExpand] = useState(false);
  const [target, setTarget] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editableDetails, setEditableDetails] = useState(editableDetailsEmptyExample);

  useEffect(() => {
    async function LoadData() {
      try {
        const response = await api.get('/dashboard/telemetrias');

        setLoaded(true)
        setTelemetrias(response.data);
      } catch (err) {

      }
    }
    LoadData()
  }, [])

  const handleOpenModal = (TMT) => {
    if (String(TMT.LeitOk).trim() !== 'KO') {
      return
    }

    setTarget(TMT)
    setModalOpen(true)
    setEditableDetails({
      Email: TMT.Email,
      Telefone: "",
      Endereco: {
        Logradouro: TMT.PdvLogradouroPV,
        Numero: TMT.PdvNumeroPV,
        Bairro: TMT.PdvBairroPV,
        Complemento: TMT.PdvComplementoPV,
        Cidade: TMT.PdvCidadePV,
        UF: TMT.PdvUfPV,
        CEP: TMT.PdvCEP,
      }
    })
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditableDetails(editableDetailsEmptyExample)
  }

  const handleAbrirChamado = async (TMT) => {
    if (
      (toValidString(editableDetails.Email) === '') ||
      (toValidString(editableDetails.Telefone) === '') ||
      (toValidString(editableDetails.Endereco.Logradouro) === '') ||
      (toValidString(editableDetails.Endereco.Numero) === '') ||
      (toValidString(editableDetails.Endereco.Cidade) === '') ||
      (toValidString(editableDetails.Endereco.UF) === '') ||
      (toValidString(editableDetails.Endereco.CEP) === '')
    ) {
      Toast('Preencha todos os campos', 'warn')
      return
    }

    const DTO = {
      Ativo: TMT.EquiCod,
      UltLeitura: moment(TMT.MáxDeDataLeitura).utc().format("DD/MM/YYYY HH:mm:ss"),
      Franqueado: TMT.GrupoVenda,
      Email: toValidString(editableDetails.Email),
      Contato: toValidString(editableDetails.Telefone),
      Cliente: TMT.AnxDesc,
      Modelo: TMT.EquiDesc,
      Endereco: {
        Logradouro: toValidString(editableDetails.Endereco.Logradouro),
        Numero: toValidString(editableDetails.Endereco.Numero),
        Bairro: toValidString(editableDetails.Endereco.Bairro),
        Complemento: toValidString(editableDetails.Endereco.Complemento),
        Cidade: toValidString(editableDetails.Endereco.Cidade),
        UF: toValidString(editableDetails.Endereco.UF),
        CEP: toValidString(editableDetails.Endereco.CEP),
      },
    }

    let toastId = null

    try {
      toastId = Toast('Abrindo chamado...', 'wait')

      await api.post('/dashboard/telemetrias/chamado', {
        DTO,
      })

      setModalOpen(false)
      Toast('Chamado aberto!', 'update', toastId, 'success')
    } catch (err) {
      Toast('Falha ao abrir chamado, tente novamente', 'update', toastId, 'error')
    }
  }

  const handleShowDetails = (equicod) => {
    setExpand((expand) => {
      if (String(expand) === String(equicod)) {
        return false
      } else {
        return equicod
      }
    });
  };

  return !loaded ? <Loading /> : (
    <div
      style={{
        width: "100%",
        borderRadius: '0px 0px 4px 4px',
        borderBottom: `5px solid #000`,
        borderLeft: `1px solid #CCC`,
        borderRight: `1px solid #CCC`,
        borderTop: `1px solid #CCC`
      }}
    >
      <MiFixModal
        open={modalOpen}
        onClose={handleCloseModal}
        title='Abrir chamado MiFix'
        onChangeDetails={setEditableDetails}
        Details={editableDetails}
        action={
          <Button
            onClick={() => handleAbrirChamado(target)}
            color="primary"
            variant="contained"
            startIcon={<Email />}
          >
            Abrir chamado
          </Button>
        }
      />
      <List
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
          >
            Monitoramento
          </ListSubheader>
        }
        className={classes.root}
      >

        {telemetrias.map(telemetria => (
          <>
            <ListItem
              button
              onClick={() => handleShowDetails(telemetria.EquiCod)}
              className={classes.lines}
            >
              <ListItemIcon>
                {String(telemetria.LeitOk).trim() === 'KO' ?
                  <Cancel
                    style={{
                      color: 'red'
                    }}
                  /> :
                  <CheckCircle
                    style={{
                      color: 'green'
                    }}
                  />
                }
              </ListItemIcon>
              <ListItemText primary={telemetria.EquiCod} secondary={`Última leitura: ${moment(telemetria.MáxDeDataLeitura).utc().format('DD/MM/YYY')}`} />

              <ListItemText primary={
                <div style={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }}>
                  {telemetria.AnxDesc}
                </div>
              } />

              {telemetria.EquiCod === expand ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={telemetria.EquiCod === expand}
              timeout="auto"
              unmountOnExit
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <div
                  className="XAlign"
                  style={{ justifyContent: 'flex-start' }}
                >
                  <div
                    className={classes.infoContainer}
                  >
                    <Typography>Leituras (semana)</Typography>
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                      }}
                    >{toValidString(telemetria.Ql0, 0)}</Typography>
                  </div>
                  <div
                    className={classes.infoContainer}
                  >
                    <Typography>Contador (Geral)</Typography>
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                      }}
                    >{toValidString(telemetria.Con0, 0)}</Typography>
                  </div>
                  <div
                    className={classes.infoContainer}
                  >
                    <Typography>Doses (semana)</Typography>
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                      }}
                    >{toValidString(telemetria.Prd, 0)}</Typography>
                  </div>
                </div>
                <Button
                  style={{ margin: '10px 8px' }}
                  disabled={String(telemetria.LeitOk).trim() !== 'KO'}
                  onClick={() => handleOpenModal(telemetria)}
                  color="primary"
                  variant="contained"
                  startIcon={<Email />}
                >
                  Abrir chamado
                </Button>
              </div>
            </Collapse>
          </>
        ))}
      </List>
    </div>
  )
}

export default Home;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #18a0fb',
    borderRadius: '5px',
    color: '#18a0fb',
    backgroundColor: '#fff',
    padding: '10px 20px',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 8px',
    minWidth: '200px',

    '&:hover': {
      transition: "200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      cursor: 'pointer',
      backgroundColor: '#18a0fb',
      color: '#fff',
    }
  },
  lines: {
    borderBottom: '1px solid #CCC',

    '&:last-child': {
      borderBottom: 'none'
    }
  }
}));

const editableDetailsEmptyExample = {
  Email: "",
  Telefone: "",
  Endereco: {
    Logradouro: '',
    Numero: '',
    Bairro: '',
    Complemento: '',
    Cidade: '',
    UF: '',
    CEP: '',
  }
}
