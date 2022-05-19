import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { api } from '../../../services/api'

import {
  Typography,
  TextField,
  FormControl,
  Divider,
  makeStyles,
  MenuItem,
  Select,
  InputLabel
} from '@material-ui/core'

import DatePicker from '../../../components/materialComponents/datePicker'
import { toValidString } from '../../../misc/commom_functions'

export const Dados = forwardRef(({ PdvId, AnxId, allowEditing, onAllowEditingChange }, ref) => {
  const classes = useStyles()

  const [details, setDetails] = useState(INITIAL_STATE)
  const [backupDetails, setBackupDetails] = useState(INITIAL_STATE)
  const [depositos, setDepositos] = useState([])
  const [configuracoes, setConfiguracoes] = useState([])

  useEffect(() => {
    async function LoadData() {
      const response = await api.get(`/pontosdevenda/info/${PdvId}/${AnxId}/basic`)

      setDetails(response.data.Dados.cadastro)
      setBackupDetails(response.data.Dados.cadastro)
      setDepositos(response.data.Dados.depositos)
      setConfiguracoes(response.data.Dados.configuracoes)
    }
    LoadData()
  }, [])

  useImperativeHandle(ref, () => ({

    handleSubmit() {
      console.log(details);

      //depois que o put der certo
      //setBackupDetails(details)
    },

    undoChanges() {
      setDetails(backupDetails)
    }

  }));

  return (
    <>
      <Divider variant="inset" />
      <li
        style={{
          listStyleType: 'none'
        }}
      >
        <Typography
          className={classes.dividerInset}
          color="primary"
          display="block"
          variant="caption"
        >
          Dados Básicos
        </Typography>
      </li>

      <section className={classes.line}>
        <TextField
          variant='standard'
          label="Cliente"
          value={toValidString(details.AnxDesc)}
          disabled={true}
          onChange={(e) => {
            e.persist()
            setDetails(oldState => ({
              ...oldState,
              AnxDesc: e.target.value
            }))
          }}
          style={{ width: '100%' }}
        />
      </section>
      <section className={classes.line}>
        <FormControl className={classes.formControl}>
          <InputLabel>Depósito</InputLabel>
          <Select
            value={details.DepId}
            onChange={(e) => {
              setDetails(oldState => ({
                ...oldState,
                DepId: e.target.value
              }))
            }}
            disabled={allowEditing}
          >
            {depositos.map(dep => (
              <MenuItem value={dep.DepId} key={dep.DepId}>{dep.DepNome}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Configuracao</InputLabel>
          <Select
            value={details.CfgId}
            onChange={(e) => {
              setDetails(oldState => ({
                ...oldState,
                CfgId: e.target.value
              }))
            }}
            disabled={allowEditing}
          >
            {configuracoes.map(cfg => (
              <MenuItem value={cfg.CfgId} key={cfg.CfgId}>{cfg.CfgDesc}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </section>
      <section className={classes.lineStart}>
        <TextField
          variant='standard'
          label="Modelo"
          value={details.EQUIPMOD_Desc}
          disabled={true}
          style={{ width: '50px', marginRight: '8px' }}
        />
        <TextField
          variant='standard'
          label="Ativo"
          value={details.EquiCod}
          disabled={true}
          style={{ width: '100px', marginRight: '8px' }}
        />
        <TextField
          variant='standard'
          label="IMEI"
          value={details.IMEI}
          disabled={true}
        />
      </section>
      <section className={classes.line}>
        <TextField
          variant='standard'
          label="Logradouro"
          value={toValidString(details.PdvLogradouroPV)}
          disabled={allowEditing}
          onChange={(e) => {
            e.persist()
            setDetails(oldState => ({
              ...oldState,
              PdvLogradouroPV: e.target.value
            }))
          }}
          style={{ width: '250px', marginRight: '8px' }}
        />
        <TextField
          variant='standard'
          label="Número"
          value={toValidString(details.PdvNumeroPV)}
          disabled={allowEditing}
          onChange={(e) => {
            e.persist()
            setDetails(oldState => ({
              ...oldState,
              PdvNumeroPV: e.target.value
            }))
          }}
          style={{ width: '70px', marginRight: '8px' }}
        />
      </section>
      <section className={classes.line}>
        <TextField
          variant='standard'
          label="Complemento"
          value={toValidString(details.PdvComplementoPV)}
          disabled={allowEditing}
          onChange={(e) => {
            e.persist()
            setDetails(oldState => ({
              ...oldState,
              PdvComplementoPV: e.target.value
            }))
          }}
          style={{ width: '100%' }}
        />
      </section>
      <section className={classes.line}>
        <TextField
          variant='standard'
          label="Bairro"
          value={toValidString(details.PdvBairroPV)}
          disabled={allowEditing}
          onChange={(e) => {
            e.persist()
            setDetails(oldState => ({
              ...oldState,
              PdvBairroPV: e.target.value
            }))
          }}
          style={{ width: '100%', marginRight: '8px' }}
        />
        <TextField
          variant='standard'
          label="Município"
          value={toValidString(details.PdvCidadePV)}
          disabled={allowEditing}
          onChange={(e) => {
            e.persist()
            setDetails(oldState => ({
              ...oldState,
              PdvCidadePV: e.target.value
            }))
          }}
          style={{ width: '200px' }}
        />
      </section>
      <section className={classes.lineStart}>
        <TextField
          variant='standard'
          label="UF"
          value={toValidString(details.PdvUfPV)}
          disabled={allowEditing}
          onChange={(e) => {
            e.persist()
            setDetails(oldState => ({
              ...oldState,
              PdvUfPV: e.target.value
            }))
          }}
          style={{ width: '50px', marginRight: '8px' }}
        />
        <TextField
          variant='standard'
          label="CEP"
          value={toValidString(details.PdvCEP)}
          disabled={allowEditing}
          onChange={(e) => {
            e.persist()
            setDetails(oldState => ({
              ...oldState,
              PdvCEP: e.target.value
            }))
          }}
          style={{ width: '100px' }}
        />
      </section>
      <section className={classes.lineStart}>
        <TextField
          variant='standard'
          label="Departamento"
          value={toValidString(details.PdvDepartamento)}
          disabled={allowEditing}
          onChange={(e) => {
            e.persist()
            setDetails(oldState => ({
              ...oldState,
              PdvDepartamento: e.target.value
            }))
          }}
          style={{ width: '100%', marginRight: '8px' }}
        />
        <TextField
          variant='standard'
          label="Anotações"
          value={toValidString(details.PdvObs)}
          disabled={allowEditing}
          onChange={(e) => {
            e.persist()
            setDetails(oldState => ({
              ...oldState,
              PdvObs: e.target.value
            }))
          }}
          style={{ width: '100%' }}
        />
      </section>

      <Divider variant="inset" />
      <li
        style={{
          listStyleType: 'none'
        }}
      >
        <Typography
          className={classes.dividerInset}
          color="primary"
          display="block"
          variant="caption"
        >
          Alterações
        </Typography>
      </li>

      <section className={classes.line}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DatePicker
            label='Data Ativação'
            disabled={true}
            defaultValue={details.PdvDataAtivacao}
            onChange={() => { }}
          />
          <DatePicker
            label='Data Encerramento'
            disabled={true}
            defaultValue={details.PdvDataEncerramento}
            onChange={() => { }}
          />

        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DatePicker
            label='Data Alteração'
            disabled={true}
            defaultValue={details.PdvDataAlteracao}
            onChange={() => { }}
          />
          <TextField
            variant='standard'
            label="Motivo do encerramento"
            value={details.PdvMotivoEncerramento}
            disabled={allowEditing}
            onChange={(e) => {
              e.persist()
              setDetails(oldState => ({
                ...oldState,
                PdvMotivoEncerramento: e.target.value
              }))
            }}
            style={{ width: '170px', margin: '16px 0px 8px 0px' }}
          />
        </div>
      </section>

      <Divider variant="inset" />
      <li
        style={{
          listStyleType: 'none'
        }}
      >
        <Typography
          className={classes.dividerInset}
          color="primary"
          display="block"
          variant="caption"
        >
          Faturamento
        </Typography>
      </li>

      <section className={classes.line}>
        <FormControl
          className={classes.formControl}
          style={{
            minWidth: '120px'
          }}
        >
          <InputLabel>Anexo tem mín.</InputLabel>
          <Select
            value={details.AnxFatMinimo}
            onChange={(e) => {
              setDetails(oldState => ({
                ...oldState,
                AnxFatMinimo: e.target.value
              }))
            }}
            disabled={allowEditing}
          >
            <MenuItem value='S'>Sim</MenuItem>
            <MenuItem value='N'>Não</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          className={classes.formControl}
          style={{
            minWidth: '120px'
          }}
        >
          <InputLabel>Mínimo por</InputLabel>
          <Select
            value={details.AnxCalcMinPor}
            onChange={(e) => {
              setDetails(oldState => ({
                ...oldState,
                AnxCalcMinPor: e.target.value
              }))
            }}
            disabled={allowEditing}
          >
            <MenuItem value='A'>Anexo</MenuItem>
            <MenuItem value='P'>Ponto de Venda</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          className={classes.formControl}
          style={{
            minWidth: '120px'
          }}
        >
          <InputLabel>Tipo de mín.</InputLabel>
          <Select
            value={details.AnxTipMin}
            onChange={(e) => {
              setDetails(oldState => ({
                ...oldState,
                AnxTipMin: e.target.value
              }))
            }}
            disabled={allowEditing}
          >
            <MenuItem value='R'>Reais</MenuItem>
            <MenuItem value='D'>Doses</MenuItem>
          </Select>
        </FormControl>
      </section>
      <section
        className={classes.line}
        style={{
          alignItems: 'flex-end',
        }}
      >
        <FormControl
          className={classes.formControl}
          style={{
            minWidth: '120px',
            marginRight: '8px'
          }}
        >
          <InputLabel>Consumo mín.</InputLabel>
          <Select
            value={details.PdvConsMin}
            onChange={(e) => {
              setDetails(oldState => ({
                ...oldState,
                PdvConsMin: e.target.value
              }))
            }}
            disabled={allowEditing}
          >
            <MenuItem value='S'>Sim</MenuItem>
            <MenuItem value='N'>Não</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant='standard'
          label="Consumo mín. em R$"
          value={details.PdvConsValor}
          disabled={allowEditing}
          onChange={(e) => {
            e.persist()
            setDetails(oldState => ({
              ...oldState,
              PdvConsValor: e.target.value
            }))
          }}
          style={{ width: '120px', marginRight: '8px' }}
        />
        <TextField
          variant='standard'
          label="Consumo mín. em doses"
          value={details.PdvConsDose}
          disabled={allowEditing}
          onChange={(e) => {
            e.persist()
            setDetails(oldState => ({
              ...oldState,
              PdvConsDose: e.target.value
            }))
          }}
          style={{ width: '120px' }}
        />
      </section>
      <section className={classes.line}>
        <FormControl
          className={classes.formControl}
          style={{
            width: '100%',
          }}
        >
          <InputLabel>Considerar valor pago no cálculo de mínimo?</InputLabel>
          <Select
            value={details.PdvSomaCompartilhado}
            onChange={(e) => {
              setDetails(oldState => ({
                ...oldState,
                PdvSomaCompartilhado: e.target.value
              }))
            }}
            disabled={allowEditing}
          >
            <MenuItem value='S'>Sim</MenuItem>
            <MenuItem value='N'>Não</MenuItem>
          </Select>
        </FormControl>
      </section>
    </>
  )
})

const useStyles = makeStyles(theme => ({
  line: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    minWidth: '400px',
    marginBottom: '8px'
  },
  lineStart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'nowrap',
    minWidth: '400px',
    marginBottom: '8px'
  },
  infoBox: {
    padding: '4px',
    border: '1px solid #ccc',
  }
}))

const INITIAL_STATE = {
  DepId: 1,
  CfgId: 1,

  EQUIPMOD_Desc: '',
  EquiCod: '',
  IMEI: '',

  AnxDesc: '',
  PdvLogradouroPV: '',
  PdvNumeroPV: '',
  PdvComplementoPV: '',
  PdvCidadePV: '',
  PdvCEP: '',
  PdvObs: '',
  PdvDataAtivacao: null,
  PdvDataEncerramento: null,
  PdvDataAlteracao: null,
  PdvMotivoEncerramento: '',

  AnxFatMinimo: 'N',
  AnxCalcMinPor: 'A',
  AnxTipMin: 'R',

  PdvConsMin: 'N',
  PdvConsValor: '',
  PdvConsDose: '',
  PdvSomaCompartilhado: 'N',
}