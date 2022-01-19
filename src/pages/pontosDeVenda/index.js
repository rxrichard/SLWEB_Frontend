import React, { useState, useEffect } from "react";

//Meio de comunicação
import { api } from "../../services/api";

//"Placeholder" da página enquanto dados são carregados no
import Loading from "../../components/loading_screen";

//import de elementos visuais
import { Panel, Container } from "../../components/commom_in";
import { Toast } from "../../components/toasty";

import { PdvList } from './pdvList'
import { PdvListOptions } from './options'

function Exemplo() {
  const [loaded, setLoaded] = useState(false);
  const [PDVs, setPDVs] = useState([]);
  const [filtro, setFiltro] = useState();
  const [shouldShowInactivePDVs, setShouldShowInactivePDVs] = useState(false);

  //componentDidMount
  useEffect(() => {
    async function LoadData() {
      try {
        //requisição inicial para obter dados essenciais da pagina
        const response = await api.get("/pontosdevenda");

        setPDVs(response.data);
        setLoaded(true);
      } catch (err) {
      }
    }

    LoadData();
  }, []);

  return !loaded ? (
    <Loading />
  ) : (
    <Panel style={{ justifyContent: 'space-between' }}>
      <PdvListOptions
        onRequestInactivePdvs={setShouldShowInactivePDVs}
        showInactivePdvs={shouldShowInactivePDVs}
        filtro={filtro}
        onChangeFiltro={setFiltro}
      />
      <PdvList
        PDVs={PDVs.filter(pdv => {
          if ((pdv.PdvStatus === 'A' && !shouldShowInactivePDVs) || (pdv.PdvStatus === 'I' && shouldShowInactivePDVs)) {
            return true;
          } else {
            return false;
          }
        })}
      />
    </Panel>
  );
}

export default Exemplo;
