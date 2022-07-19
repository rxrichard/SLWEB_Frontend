import React, { useState } from 'react';

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

  const handleUpdateSelectedRef = (selref) => {
    setSelRef(selref)
  }

  return (
    <Panel>
      <div className='YAlign' style={{ height: '100%', width: '100%', flexWrap: 'nowrap' }}>
        <div className='XAlign' style={{ height: '100%', width: '100%' }}>
          <section className={classes.metadinha}>
            <Resumo />
          </section>
          <section className={classes.metadinha}>
            <Despesas />
            <DespesasVariaveis />
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
    justifyContent: 'center',
    width: '50%',
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