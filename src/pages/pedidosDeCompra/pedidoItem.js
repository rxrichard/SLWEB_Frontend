import React, { useState, useEffect } from 'react';
import { api } from '../../services/api'
import moment from 'moment';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import {
  TextField,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Typography,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

import PesoInput from './components/pesoInput'
import CaixaInput from './components/caixaInput'
import DatePicker from '../../components/materialComponents/datePicker'
import { Toast } from '../../components/toasty'

export const PedidoItem = ({ Pedido, ExpandedID, handleChangeExpandedAccordion }) => {
  const classes = useStyles();

  const [peso, setPeso] = useState(0)
  const [qtd, setQtd] = useState(0)
  const [emissao, setEmissao] = useState('00')
  const [msgNF, setMsgNF] = useState('')
  const [tipoVolume, setTipoVolume] = useState('CX')
  const [transp, setTransp] = useState(null)
  const [dtFaturamento, setDtFaturamento] = useState(null)

  useEffect(() => {
    if (Pedido.MsgNotaFiscal !== null) {
      setMsgNF(Pedido.MsgNotaFiscal)
    }

    if (Pedido.QtdVolumes !== null) {
      setQtd(Pedido.QtdVolumes)
    }

    if (Pedido.TipoVolume !== null) {
      setTipoVolume(Pedido.TipoVolume.trim())
    }

    if (Pedido.Peso !== null) {
      setPeso(Pedido.Peso)
    }

    if (Pedido.EMISS !== null) {
      setEmissao(Pedido.EMISS)
    }

  }, [Pedido])

  const handleSubmit = async () => {
    const payload = {
      ID: Pedido.PedidoID,
      Tipo: tipoVolume,
      Qtd: qtd,
      Peso: peso,
      MsgNFe: msgNF,
      Emissao: emissao,
      Transportadora: transp,
      Faturamento: dtFaturamento
    }

    let toastId = null
    toastId = Toast('Atualizando pedido...', 'wait')

    try {
      await api.put('/pedidos/compra/', {
        payload
      })

      Toast('Pedido atualizado', 'update', toastId, 'success')
    } catch (err) {
      Toast('Falha ao atualizar pedido', 'update', toastId, 'error')
    }
  }

  const handleDiscard = () => {
    if (Pedido.MsgNotaFiscal !== null) {
      setMsgNF(Pedido.MsgNotaFiscal)
    } else {
      setMsgNF('')
    }

    if (Pedido.QtdVolumes !== null) {
      setQtd(Pedido.QtdVolumes)
    } else {
      setQtd(0)
    }

    if (Pedido.TipoVolume !== null) {
      setTipoVolume(Pedido.TipoVolume.trim())
    } else {
      setTipoVolume(0)
    }

    if (Pedido.Peso !== null) {
      setPeso(Pedido.Peso)
    } else {
      setPeso(0)
    }

    if (Pedido.EMISS !== null) {
      setEmissao(Pedido.EMISS)
    } else {
      setEmissao('00')
    }
  }

  return (
    <Accordion
      expanded={ExpandedID === Pedido.PedidoID}
      style={{
        borderLeft: `4px solid ${Pedido.Status === 'Aguardando' ? '#4f9eff' : '#29ff8d'}`
      }}
      onChange={() => handleChangeExpandedAccordion(ExpandedID === Pedido.PedidoID ? null : Pedido.PedidoID)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <div className={classes.column}>
          <Typography className={classes.heading}>Pedido de compra <strong>{Pedido.PedidoID}</strong></Typography>
          <Typography className={classes.secondaryHeading}><strong>{moment(Pedido.DataCriacao).format('L')}</strong></Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.heading}>Valor do Pedido: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Pedido.SomaDePrecoTotal)}</strong></Typography>
          <Typography className={classes.secondaryHeading}>Items: <strong>{Pedido.ContarDePedidoItemID}</strong></Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.heading}>{Pedido.Razão_Social}</Typography>
          <Typography className={classes.secondaryHeading}>Código <strong>{Pedido.CodigoCliente}</strong></Typography>
        </div>
      </AccordionSummary>
      <Divider />
      <AccordionDetails className={classes.details}>
        <div className={clsx(classes.column_1, classes.helper)}>
          {Pedido.Detalhes.map(item => (
            <div
              key={item.PedidoItemID}
              className={classes.prodLine}
            >
              <div>
                <Typography className={classes.heading}><strong>{String(item.Produto).split('(')[0]}</strong></Typography>
                <Typography variant='caption'>(Cód <strong>{item.CodigoProduto}</strong>)</Typography>
              </div>
              <div>
                <Typography className={classes.heading}>Qtd: <strong>{item.QtdeVendida}</strong></Typography>
              </div>
              <div>
                <Typography className={classes.heading}>Total: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.PrecoTotal)}</strong></Typography>
                <Typography variant='caption'>(Un. <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.PrecoUnitarioLiquido)}</strong>)</Typography>
              </div>
            </div>
          ))}
        </div>
        <div className={clsx(classes.column_2, classes.helper)}>
          <div className={classes.align} style={{ alignItems: 'flex-end' }}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">Embalagem</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                value={tipoVolume}
                onChange={() => { }}
                label="Embalagem"
                disabled={true}
              >
                <MenuItem value='CX'>Caixa</MenuItem>
              </Select>
            </FormControl>
            <CaixaInput
              Qtd={qtd}
              onChangeQtd={value => setQtd(value)}
            />
          </div>
          <FormControl
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label-1">Emissão</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label-1"
              value={emissao}
              onChange={e => setEmissao(e.target.value)}
              label="Emissão"
              disabled={false}
            >
              <MenuItem value='01'>Carrega pedido, não transmite nota, gera boleto</MenuItem>
              <MenuItem value='11'>Carrega pedido, transmite nota, gera boleto</MenuItem>
              <MenuItem value='10'>Carrega pedido, transmite nota, não gera boleto</MenuItem>
              <MenuItem value='00'>Carrega pedido, não transmite nota, não gera boleto</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label-2">Transportadora</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label-2"
              value={transp}
              onChange={(e) => setTransp(e.target.value)}
              label="Transportadora"
              disabled={true}
            >
              <MenuItem value={null}>TRANSPORTADORA</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.align} style={{ alignItems: 'baseline' }}>
            <DatePicker
              min={new Date()}
              style={{
                marginTop: '0px'
              }}
              onChange={value => {
                if (value !== '') {
                  setDtFaturamento(value._d)
                }
              }}
              defaultValue={dtFaturamento}
              disabled={false}
              label='Faturamento'
            />
            <PesoInput
              Peso={peso}
              onChangePeso={setPeso}
            />
          </div>
          <TextField
            label="Mensagem Franqueado"
            style={{
              width: '100%',
              marginBottom: '8px'
            }}
            multiline
            maxRows={4}
            value={Pedido.MsgBO}
            variant="outlined"
            disabled={true}
          />
          <TextField
            label="Mensagem NFe"
            style={{ width: '100%' }}
            multiline
            maxRows={4}
            value={msgNF}
            onChange={e => setMsgNF(e.target.value)}
            variant="outlined"
            disabled={false}
          />
        </div>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button
          size="small"
          color='secondary'
          onClick={handleDiscard}
        >
          Discartar
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={handleSubmit}
        >
          Faturar
        </Button>
      </AccordionActions>
    </Accordion>
  )
}

const useStyles = makeStyles((theme) => ({
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
  formControl: {
    width: '100%',
    margin: '0px 8px 8px 0px'
  },
  details: {
    alignItems: 'flex-start',
    overflow: 'auto'
  },
  prodLine: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: '8px',

    '& div:nth-child(1) > p:nth-child(1)': {
      width: '350px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    '& div:nth-child(2) > p:nth-child(1)': {
      width: '100px',
    },
    '& div:nth-child(3) > p:nth-child(1)': {
      width: '110px',
    },
  },
  column: {
    flexBasis: '33%',
  },
  column_1: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexBasis: '66.66%',
  },
  column_2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexBasis: '33.33%',
  },
  align: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));