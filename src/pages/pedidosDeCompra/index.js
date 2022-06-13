import React, { useState, useEffect } from 'react';
import { api } from '../../services/api'

import { Panel } from '../../components/commom_in'
import Loading from '../../components/loading_screen'

import { PedidoList } from './pedidoList'
import { PedidosListOptions } from './options'

const PedidosDeCompra = () => {
  const timeFilter = 'week'

  const [pedidos, setPedidos] = useState([])
  const [loaded, setLoaded] = useState(false)
  // const [timeFilter, setTimeFilter] = useState('week')
  const [filtro, setFiltro] = useState('');
  const [mostrarProcessados, setMostrarProcessados] = useState(false);

  async function LoadData() {
    try {
      const response = await api.get(`/pedidos/compra/${timeFilter}`)

      setPedidos(response.data.Pedidos)
      setLoaded(true)
    } catch (err) {

    }
  }

  useEffect(() => {
    LoadData()
  }, [])

  return !loaded ?
    <Loading />
    :
    (
      <Panel>
        <PedidosListOptions
          onChangeFiltro={setFiltro}
          mostrarProcessados={mostrarProcessados}
          switchProcessados={setMostrarProcessados}
        />
        <PedidoList
          Pedidos={returnPedidosFiltrados(pedidos, mostrarProcessados, filtro)}
          onUpdatePedido={setPedidos}
        />
      </Panel>
    )
}

export default PedidosDeCompra

const returnPedidosFiltrados = (pedidos, shouldShowBilled, filterString) => {
  var re = new RegExp(filterString.trim().toLowerCase())

  return pedidos.filter(ped => {
    if (shouldShowBilled) {
      return true
    } else if (!shouldShowBilled && ped.Status === 'Aguardando') {
      return true
    } else {
      return false
    }
  }).filter(ped => {
    if (filterString.trim() === '') {
      return true
    } else if (filterString.trim() !== '' && (
      String(ped.PedidoID).trim().toLowerCase().match(re) || String(ped.CodigoCliente).trim().toLowerCase().match(re)
    )) {
      return true
    } else {
      return false
    }
  })
}