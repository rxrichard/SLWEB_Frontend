import React, { useState, useEffect } from 'react'
import { api } from '../../../services/api'

import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

import { Toast } from '../../../components/toasty'

export const Equipamento = ({ PdvId, AnxId }) => {
  const classes = useStyles();

  const [equipamentosDisponiveis, setEquipamentosDisponiveis] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [wait, setWait] = useState(false)

  useEffect(() => {
    async function LoadData() {
      const response = await api.get(`/pontosdevenda/info/${PdvId}/${AnxId}/equip`)

      setEquipamentosDisponiveis(response.data.Dados.EqsDisp)
      setLoaded(true)
    }
    LoadData()
  }, [])

  const handleSwitchEqOnPdv = async (eqcod) => {
    if (wait) return
    
    let toastId = null

    toastId = Toast('Trocando equipamento no ponto de venda...', 'wait')
    setWait(true)

    try {
      //faz o put
      await api.put(`/pontosdevenda/atualizar/${PdvId}/${AnxId}/equip`, {
        UpdatedData: {
          NewEquip: eqcod
        }
      })

      Toast('Ponto de venda atualizado com sucesso', 'update', toastId, 'success')
      setWait(false)
      //remove o EQ da lista
      //atuliza a pagina? troca os dados do PDV aberto pelo novo(pdvId)? fecha o modal, inativa o pdv e cria o novo?
    } catch (err) {
      Toast('Falha ao atualizar ponto de venda', 'update', toastId, 'error')
      setWait(false)
    }
  }

  return !loaded ?
    (
      <Typography variant='subtitle1'>
        Carregando...
      </Typography>
    )
    :
    (
      <>
        {equipamentosDisponiveis.length > 0 ?
          equipamentosDisponiveis.map(eqs => (
            <Typography
              className={classes.line}
              onClick={() => handleSwitchEqOnPdv(eqs.EquiCod)}
            >
              {eqs.EquiDesc} (Ativo {eqs.EquiCod})
            </Typography>
          ))
          :
          <Typography variant='subtitle2'>Todas suas máquinas já estão vinculadas a outros clientes ;)</Typography>
        }
      </>
    )
}

const useStyles = makeStyles((theme) => ({
  line: {
    width: '100%',
    padding: '10px 0px',
    textAlign: 'center',
    transition: "150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    backgroundColor: "unset",
    fontWeight: 'normal',
    borderRadius: '4px',

    '&:hover': {
      transition: "150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      backgroundColor: "#CCC",
      cursor: "pointer",
      fontWeight: 'bold'
    }
  }
}))