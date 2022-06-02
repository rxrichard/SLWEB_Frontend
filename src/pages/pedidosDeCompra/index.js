import React, { useState, useEffect } from 'react';
import { api } from '../../services/api'

import { makeStyles } from '@material-ui/core';

import { Panel } from '../../components/commom_in'
import Loading from '../../components/loading_screen'
import { PedidoItem } from './pedidoItem'

const PedidosDeCompra = () => {
  const classes = useStyles();

  const [pedidos, setPedidos] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function LoadData() {
      try {
        const response = await api.get('/pedidos/compra')

        setPedidos(response.data.Pedidos)
        setLoaded(true)
      } catch (err) {

      }
    }

    LoadData()
  }, [])

  return !loaded ?
    <Loading />
    :
    (
      <Panel>
        {/* <Typography variant='h5' gutterBottom>Pedidos aguardando faturamento</Typography> */}
        <div className={classes.root}>
          {pedidos.map(p => (
            <PedidoItem
              Pedido={p}
              ExpandedID={expanded}
              handleChangeExpandedAccordion={setExpanded}
              key={p.PedidoID}
            />
          ))}
        </div>
      </Panel>
    )
}

export default PedidosDeCompra

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '1000px',
    overflowY: 'auto',
    border: '1px solid #CCC',
    padding: '8px',
    borderRadius: '4px'
  },
}));