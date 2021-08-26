import React, { useState, useEffect } from "react";

//Meio de comunicação
import { api } from "../../services/api";
//"Placeholder" da página enquanto dados são carregados no
import Loading from "../../components/loading_screen";

//import de elementos visuais
import { Panel, Container } from "../../components/commom_in";
import { Table } from "../../components/table";
import { Toast } from "../../components/toasty";
import Input from '../../components/materialComponents/InputUnderline'

function Franquia() {
  const [loaded, setLoaded] = useState(false);
  const [franqueados, setFranqueados] = useState([]);
  const [usersListFiltered, setUsersListFiltered] = useState([]);

  useEffect(() => {
    async function LoadData() {
      try {
        //requisição inicial para obter dados essenciais da pagina
        const response = await api.get("/administrar/franquia");

        if (response.status === 200) {
          setLoaded(true);
          setFranqueados(response.data);
          setUsersListFiltered(response.data);
        } else {
          throw Error;
        }
      } catch (err) {
        Toast("Falha ao trazer as informações das franquias", "error");
      }
    }
    LoadData();
  }, []);

  const Filter = (value, event) => {
    setUsersListFiltered(franqueados);
    event.target.value = value.toUpperCase();
    value = value.toUpperCase();

    if (value === "") {
      setUsersListFiltered(franqueados);
      return;
    }

    if (value.length > 4) {
      event.target.value = value.slice(0, 4);
      value = value.slice(0, 4);
    }

    setUsersListFiltered(franqueados);
    let aux = [];
    let newArray = [];
    aux = [...franqueados];

    for (let i = 0; i < aux.length; i++) {
      if (aux[i].M0_CODFIL.slice(0, value.length) === value) {
        newArray.push(aux[i]);
      }
    }

    setUsersListFiltered(newArray);
  };

  return !loaded ? (
    <Loading />
  ) : (
    <Container>
      <Panel>
        <Table>
          <thead>
            <th>Situação</th>
            <th>Emite NF.</th>
            <th>UF</th>
            <th>Consultor</th>
            <th>Filial</th>
            <th>Min. Compra</th>
            <th>Franqueado</th>
            <th>CodCli</th>
            <th>Loja</th>
            <th>Email</th>
          </thead>
          <tbody>
            {usersListFiltered.map((franq) => (
              <tr>
                <td>{franq.STATUS}</td>
                <td>{franq.EmiteNF}</td>
                <td>{franq.UF}</td>
                <td>{franq.Consultor}</td>
                <td>{franq.M0_CODFIL}</td>
                <td>R$ {franq.VlrMinCompra}</td>
                <td>{franq.GrupoVenda}</td>
                <td>{franq.A1_COD}</td>
                <td>{franq.A1_LOJA}</td>
                <td>{franq.Email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Panel>
        <Input onChange={Filter} type="text" label="Filial..." />
    </Container>
  );
}

export default Franquia;
