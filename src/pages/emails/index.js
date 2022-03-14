import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

import { TextField, Button } from '@material-ui/core'
import { MarkunreadMailbox as MarkunreadMailboxIcon } from '@material-ui/icons'

//import de elementos visuais
import { convertData } from "../../misc/commom_functions";
import { Panel } from "../../components/commom_in";
import { Table } from "../../components/table";
import Loading from "../../components/loading_screen";

import { DispatchEmailsModal } from './modals/DispararEmailsModal'

const CentralEmails = () => {
  const [emailHistory, setEmailHistory] = useState([]);
  const [mailAdressess, setMailAdressess] = useState([])
  const [filtro, setFiltro] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [dispararEmailsModalOpen, setDispararEmailsModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get("/emails/history");

        setLoaded(true);
        setEmailHistory(response.data.History)
        setMailAdressess(response.data.AvailableRecipients)
      } catch (err) {
        console.log(err)
      }

    }
    loadData();
  }, [])

  const handleOpenDispararEmailsModal = () => {
    setDispararEmailsModalOpen(true)
  }

  const handleCloseDispararEmailsModal = () => {
    setDispararEmailsModalOpen(false)
  }

  return !loaded ? (
    <Loading />
  ) : (
    <>
      <DispatchEmailsModal
        open={dispararEmailsModalOpen}
        onClose={handleCloseDispararEmailsModal}
        availableRecipients={mailAdressess}
        onUpdateAvailableRecipients={setMailAdressess}
      />

      <Panel>
        <div
          className="XAlign"
          style={{ height: "100%", alignItems: "flex-start" }}
        >
          <Table width="80">
            <thead>
              <tr>
                <th>Data de Envio</th>
                <th>Filial</th>
                <th>Email</th>
                <th>Modelo</th>
                <th>Origem</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory(emailHistory, filtro).map((reg) => (
                <tr key={`${reg.DataOcor}${reg.A1_GRPVEN}`}>
                  <td>{convertData(reg.DataOcor)}</td>
                  <td>{reg.M0_CODFIL}</td>
                  <td>{reg.Email}</td>
                  <td>{reg.msg}</td>
                  <td>{reg.origem}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div
            className="YAlign"
            style={{
              height: "100%",
              justifyContent: "flex-start",
              marginLeft: "1%",
              marginRight: "1%",
            }}
          >
            <TextField
              id="standard-basic"
              label="Filtrar por filial"
              onChange={(e) => setFiltro(e.target.value)}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleOpenDispararEmailsModal}
              startIcon={<MarkunreadMailboxIcon />}
            >
              Disparar emails
            </Button>
          </div>
        </div>
      </Panel>
    </>
  );
}

export default CentralEmails

const filteredHistory = (history, filterString) => {
  return history
}