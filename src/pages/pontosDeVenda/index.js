import React, { useState, useEffect } from "react";

//Meio de comunicação
import { api } from "../../services/api";

//"Placeholder" da página enquanto dados são carregados no
import Loading from "../../components/loading_screen";

//import de elementos visuais
import { Panel } from "../../components/commom_in";
// import { Toast } from "../../components/toasty";

import { PdvList } from './pdvList'
import { PdvListOptions } from './options'
import { DetailsModal } from './modals/detailsModal'

function Exemplo() {
  const [loaded, setLoaded] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [PDVs, setPDVs] = useState([]);
  const [depositos, setDepositos] = useState([]);
  const [configuracoes, setConfiguracoes] = useState([]);
  const [eqps, setEqps] = useState([]);
  const [targetPDV, setTargetPDV] = useState({});
  const [filtro, setFiltro] = useState('');
  const [mostrarInativos, setMostrarInativos] = useState(false);

  //componentDidMount
  useEffect(() => {
    async function LoadData() {
      try {
        //requisição inicial para obter dados essenciais da pagina
        const response = await api.get("/pontosdevenda");

        setPDVs(response.data.PDVs);
        setDepositos(response.data.Depositos);
        setConfiguracoes(response.data.Configuracoes);
        setEqps(response.data.EqsDisp);

        setLoaded(true);
      } catch (err) { }
    }

    LoadData();
  }, []);

  const handleOpenDetailsModal = (index) => {
    setTargetPDV(returnPDVsFilter(PDVs, mostrarInativos, filtro)[index])
    setDetailsModalOpen(true)
  }

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false)
    setTargetPDV({})
  }

  return !loaded ? (
    <Loading />
  ) : (
    <Panel style={{ justifyContent: 'flex-start' }}>
      <DetailsModal
        open={detailsModalOpen}
        onClose={handleCloseDetailsModal}
        Details={targetPDV}
        Depositos={depositos}
        Configuracoes={configuracoes}
        Equipamentos={eqps}
        DetailsChangeHandler={setTargetPDV}
        updatePDVsArray={setPDVs}
        updateEqsArray={setEqps}
      />
      <PdvListOptions
        onChangeFiltro={setFiltro}
        mostrarInativos={mostrarInativos}
        switchInativos={setMostrarInativos}
      />
      <PdvList
        PDVs={returnPDVsFilter(PDVs, mostrarInativos, filtro)}
        onOpenModal={handleOpenDetailsModal}
      />
    </Panel>
  );
}

export default Exemplo;

const returnPDVsFilter = (pdvs, shouldShowInactive, filterString) => {
  var re = new RegExp(filterString.trim().toLowerCase())

  return pdvs.filter(pdv => {
    if (shouldShowInactive) {
      return true
    } else if (!shouldShowInactive && pdv.PdvStatus === 'A') {
      return true
    } else {
      return false
    }
  }).filter(pdv => {
    if (filterString.trim() === '') {
      return true
    } else if (filterString.trim() !== '' && (
      pdv.AnxDesc.trim().toLowerCase().match(re) || pdv.EquiCod.trim().toLowerCase().match(re)
    )) {
      return true
    } else {
      return false
    }
  })
}
