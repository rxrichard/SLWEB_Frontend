import React, { useState, useEffect } from 'react';
import moment from 'moment'
import { api } from '../../services/api'

import { makeStyles } from '@material-ui/styles'

import { Resumo } from './components/resumo'
import { Despesas } from './components/despesas'
import { DespesasVariaveis } from './components/despesasVariaveis'
import { Options } from './components/options'

import { Panel } from '../../components/commom_in'
import Loading from '../../components/loading_screen'
import { Toast } from '../../components/toasty'

const DRE = () => {
  const classes = useStyles()

  const [loaded, setLoaded] = useState(true)
  const [selRef, setSelRef] = useState('')
  const [refs, setRefs] = useState([])
  const [dre, setDre] = useState([])
  const [dov, setDov] = useState([])

  const handleUpdateSelectedRef = (selref) => {
    setSelRef(selref)
  }

  const handleUpdateLine = (lineID, lineValue, linePercentage) => {
    let oldLine = null

    setDre(oldState => {
      let aux = [...oldState]

      aux.forEach((l, i) => {
        if (l.DreCod === lineID) {
          oldLine = aux[i]

          aux[i] = {
            ...aux[i],
            DreVlr: Number(lineValue),
            DrePorc: linePercentage
          }
        }
      })

      return aux
    })

    api.put('/dre', {
      ano: moment(selRef).get('year'),
      mes: moment(selRef).add(3, 'hours').get('month') + 1,
      cod: lineID,
      vlr: Number(lineValue),
      porc: linePercentage
    }).then(response => {
      setDre(response.data.DRE)
      setDov(response.data.DOV)
    }).catch(err => {
      setDre(oldState => {
        let aux = [...oldState]

        aux.forEach((l, i) => {
          if (l.DreCod === lineID) {
            oldLine = aux[i]

            aux[i] = oldLine
          }
        })

        return aux
      })
    })

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
    setLoaded(false)
    try {
      const response = await api.get(`/dre/${ano}/${mes}`)

      setDre(response.data.DRE)
      setDov(response.data.DOV)
      setLoaded(true)
    } catch (err) {
      setLoaded(true)
      setDre([])
      setDov([])
      setSelRef('')
    }
  }

  const handleSubmit = async () => {
    //   let toastId = null

    //   try {
    //     toastId = Toast('Aguarde...', 'wait')

    //     await api.post('/dre', {
    //       ano: moment(selRef).get('year'),
    //       mes: moment(selRef).add(3, 'hours').get('month') + 1,
    //       DRE: dre,
    //       DOV: dov,
    //     })

    //     Toast('DRE gravado', 'update', toastId, 'success')
    //   } catch (err) {
    //     Toast('Falha ao gravar DRE', 'update', toastId, 'error')
    //   }
  }

  useEffect(() => {
    loadRefs()
  }, [])

  useEffect(() => {
    if (selRef !== '') {
      loadData(moment(selRef).get('year'), moment(selRef).add(3, 'hours').get('month') + 1)
    }
  }, [selRef])

  return !loaded
    ? <Loading />
    : (
      <Panel>
        <div className='YAlign' style={{ height: '100%', width: '100%', flexWrap: 'nowrap' }}>
          <div className='XAlign' style={{ height: 'calc(100% - 70.91px)', width: '100%' }}>
            <section className={classes.metadinha}>
              <Resumo
                Res={dre.filter(d => d.DreCod < 23 || d.DreCod === 35)}
              />
            </section>
            <section className={classes.metadinha}>
              <Despesas
                Des={dre.filter(d => d.DreCod > 22 && d.DreCod !== 35)}
                onUpdateLine={handleUpdateLine}
                pRef={dre.filter(d => d.DreCod === 1)[0]?.DreVlr}
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
              onReload={loadData}
              onSave={handleSubmit}
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

    '@media (max-width: 900px)': {
      width: '100%',
    }
  },
  barraDeBotoes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
}))