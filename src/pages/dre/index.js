import React, { useState, useEffect } from 'react';
import moment from 'moment'
import { api } from '../../services/api'

import { makeStyles } from '@material-ui/styles'

import { Resumo } from './components/resumo'
import { Despesas } from './components/despesas'
import { DespesasVariaveis } from './components/despesasVariaveis'
import { Options } from './components/options'

import { Panel } from '../../components/commom_in'

const DRE = () => {
  const classes = useStyles()

  const [selRef, setSelRef] = useState('')
  const [refs, setRefs] = useState([])
  const [dre, setDre] = useState([])
  const [dov, setDov] = useState([])

  const handleUpdateSelectedRef = (selref) => {
    setSelRef(selref)
  }

  const loadRefs = async () => {
    try {
      const response = await api.get(`/dre/referencia`)

      setRefs(response.data.Referencias)
    } catch (err) {
      setRefs([])
    }
  }

  const loadData = async (ano, mes) => {
    try {
      const response = await api.get(`/dre/${ano}/${mes}`)

      setDre(response.data.DRE)
      setDov(response.data.DOV)
    } catch (err) {
      setDre([])
      setDov([])
      setSelRef('')
    }
  }

  useEffect(() => {
    loadRefs()
  }, [])

  useEffect(() => {
    if (selRef !== '') {
        loadData(moment(selRef).get('year'), moment(selRef).add(3, 'hours').get('month') + 1)
    }
  }, [selRef])

  return (
    <Panel>
      <div className='YAlign' style={{ height: '100%', width: '100%', flexWrap: 'nowrap' }}>
        <div className='XAlign' style={{ height: 'calc(100% - 70.91px)', width: '100%' }}>
          <section className={classes.metadinha}>
            <Resumo 
              Res={dre.filter(d => d.DreCod < 23)}
            />
          </section>
          <section className={classes.metadinha}>
            <Despesas 
              Des={dre.filter(d => d.DreCod > 22)}
            />
            <DespesasVariaveis 
              DesV={dov}
            />
          </section>
        </div>
        <section className={classes.barraDeBotoes}>
          <Options
            onChange={handleUpdateSelectedRef}
            selectedRef={selRef}
            refList={refs}
          />
        </section>
      </div>
    </Panel>
  )
}

export default DRE

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  metadinha: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50%',
    minWidth: '300px',
    height: '100%',
  },
  barraDeBotoes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
}))