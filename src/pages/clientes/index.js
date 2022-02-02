import React, { useState, useEffect } from 'react';
import { api } from '../../services/api'

import { Panel } from '../../components/commom_in';
import Loading from '../../components/loading_screen'

import { ClientList } from './clientList'
import { DetailsModal } from './modals/detailsModal'
import { NewClientModal } from './modals/newCliente'
import { ClienteListOptions } from './options'

import { Toast } from '../../components/toasty'

function Clientes() {
  const [loaded, setLoaded] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [newClientModalOpen, setNewClientModalOpen] = useState(false);
  const [clientes, setClientes] = useState([])
  const [targetCliente, setTargetCliente] = useState({});

  //componentDidMount
  useEffect(() => {
    async function LoadData() {
      try {
        //requisição inicial para obter dados essenciais da pagina
        const response = await api.get("/client");

        setClientes(response.data);
        setLoaded(true);
      } catch (err) {
      }
    }

    LoadData();
  }, []);

  const handleOpenDetailsModal = (index) => {
    setTargetCliente(clientes[index])
    setDetailsModalOpen(true)
  }

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false)
    setTargetCliente({})
  }

  const handleOpenNewClientModal = () => {
    setNewClientModalOpen(true)
  }

  const handleCloseNewClientModal = () => {
    setNewClientModalOpen(false)
  }

  const handleUpdate = async (updatedClient) => {
    let toastId = null

    let indexCliente = null

    clientes.forEach((cliente, index) => {
      if (
        cliente.GrpVen === updatedClient.GrpVen &&
        cliente.A1_COD === updatedClient.A1_COD &&
        cliente.A1_LOJA === updatedClient.A1_LOJA &&
        cliente.CNPJ === updatedClient.CNPJ

      ) {
        indexCliente = index
      }
    })

    try {
      toastId = Toast('Atualizando...', 'wait')

      await api.put('/client', {
        cliente: updatedClient
      })

      Toast('Cliente atualizado', 'update', toastId, 'success')
      setClientes(oldArray => {
        let aux = [...oldArray]

        aux[indexCliente] = updatedClient

        return aux
      })
    } catch (err) {
      Toast('Falha ao atualizar cliente', 'update', toastId, 'error')
      setTargetCliente(clientes[indexCliente])
    }
  }

  const validNewClientCNPJ = async (Tipo, Chave) => {
    try {
      const response = await api.get(`/client/${Chave}/${Tipo}`)

      return response.data
    } catch (err) {
      return {
        ClienteValido: false,
        wsInfo: null
      }
    }
  }

  return !loaded ? (
    <Loading />
  ) : (
    <Panel>
      <ClienteListOptions
        filtro={filtro}
        onChangeFiltro={setFiltro}
        onOpenNewClientesModal={handleOpenNewClientModal}
      />
      <ClientList
        Clientes={clientes}
        onOpenModal={handleOpenDetailsModal}
      />
      <DetailsModal
        open={detailsModalOpen}
        onClose={handleCloseDetailsModal}
        title='Detalhes do Cliente'
        Details={targetCliente}
        DetailsChangeHandler={setTargetCliente}
        onUpdate={handleUpdate}
      />
      <NewClientModal
        open={newClientModalOpen}
        onClose={handleCloseNewClientModal}
        title='Cadastrar Cliente'
        handleValidNewClientCNPJ={validNewClientCNPJ}
        onUpdateClientesArray={setClientes}
      />
    </Panel>
  )
}

export default Clientes;