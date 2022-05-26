import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { api } from '../../../services/api'

import { Button } from '@material-ui/core'
import { ConfigListItem } from './configListItem'

export const Configuracao = forwardRef(({ PdvId, AnxId, allowEditing }, ref) => {
  const [configPDV, setConfigPDV] = useState([])
  const [backupConfigPDV, setBackupConfigPDV] = useState([])
  const [configPadrao, setConfigPadrao] = useState([])
  const [produtos, setProdutos] = useState([])
  const [tiposDeVenda, setTiposDeVenda] = useState([])
  const [receitas, setReceitas] = useState([])

  useEffect(() => {
    async function LoadData() {
      const response = await api.get(`/pontosdevenda/info/${PdvId}/${AnxId}/config`)

      setConfigPDV([...response.data.Dados.CfgPdv])
      setBackupConfigPDV([...response.data.Dados.CfgPdv])
      setConfigPadrao(response.data.Dados.CfgPadrao)

      setProdutos(response.data.Dados.Produtos)
      setTiposDeVenda(response.data.Dados.TiposVenda)
      setReceitas(response.data.Dados.Receitas)
    }
    LoadData()
  }, [])

  useImperativeHandle(ref, () => ({

    async handleSubmit() {
      if (validate(configPDV)) {
        try {
          await api.put(`/pontosdevenda/atualizar/${PdvId}/${AnxId}/config`, {
            UpdatedData: {
              CFG: configPDV
            }
          })

          setBackupConfigPDV(configPDV)
        } catch (err) { }
      }
    },

    undoChanges() {
      console.log(backupConfigPDV)
      console.log(configPDV)

      setConfigPDV(backupConfigPDV)
    }

  }));

  const updateConfigPDV = (field, value, index) => {
    setConfigPDV(oldState => {
      let aux = [...oldState]

      aux[index][field] = value

      return aux
    })
  }

  const handleAddConfig = () => {
    setConfigPDV(oldState => {
      let aux = [...oldState]
      let arrayOrganizadoPorSel = configPDV.sort((a, b) => a.Sel - b.Sel)

      aux.push({
        Sel: arrayOrganizadoPorSel[arrayOrganizadoPorSel.length - 1].Sel + 1,
        ProdId: null,
        TipoVenda: null,
        Valor_1: 0,
        Valor_2: 0,
        RecId: null
      })

      return aux
    })
  }

  const handleRemoveConfig = (index) => {
    setConfigPDV(oldState => {
      let aux = [...oldState]

      aux.splice(index, 1)

      return aux
    })
  }



  return (
    <>
      <div
        style={{
          overflowY: 'auto',
          maxHeight: '380px',
          borderBottom: '8px'
        }}
      >
        {configPDV.sort((a, b) => a.Sel - b.Sel).map((cfg, index) => (
          <ConfigListItem
            Editing={allowEditing}

            Sel={cfg.Sel}
            ProdCod={cfg.ProdId}
            TVendaId={cfg.TipoVenda}
            V1={cfg.Valor_1}
            V2={cfg.Valor_2}
            RecId={cfg.RecId}

            Produtos={produtos}
            TiposDeVenda={tiposDeVenda}
            Receitas={receitas}

            Linha={index}
            onUpdateConfig={updateConfigPDV}
            onRemoveConfig={handleRemoveConfig}
          />
        ))}
      </div>
      <Button
        onClick={handleAddConfig}
        disabled={allowEditing}
        variant='contained'
        color='primary'
        style={{
          width: '100%',
          borderRadius: '20px'
        }}>
        ADICIONAR BEBIDA
      </Button>
    </>
  )
})

const validate = (config) => {

  console.log(config)
  // for (let i = 0; i < configPDV.length; i++) {
  //   if () {
  //     return false
  //   }
  // }

  return false
}