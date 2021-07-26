import React from "react";

//Meio de comunicação
import { api } from "../../services/api";

//"Placeholder" da página enquanto dados são carregados no
import Loading from "../../components/loading_screen";

import { convertData } from "../../misc/commom_functions";

//import de elementos visuais
import { Panel, Container } from "../../components/commom_in";
import { Toast } from "../../components/toasty";
import { Icon, Button } from "react-materialize";
import { Table } from "../../components/table";
import Modal from "../../components/modal";

import Modalzinho from "./modal/index";

export default class FormsAcompanhamento extends React.Component {
  state = {
    formularios: [],
    loaded: false,
  };

  async componentDidMount() {
    try {
      //requisição inicial para obter dados essenciais da pagina
      const response = await api.get("/form/all");

      if (response.status === 200) {
        this.setState({ loaded: true, formularios: response.data });
      } else {
        throw Error;
      }
    } catch (err) {
      Toast("Falha", "error");
    }
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Container>
        <Panel>
          <Table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Status</th>
                <th>Preenchimento</th>
                <th>Nome</th>
                <th>Inspecionar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.formularios.map((form) => (
                <tr>
                  <td>{form.CodCandidato}</td>
                  <td>{form.PREENCHIDO ? "Preenchido" : "Não preenchido"}</td>
                  <td>
                    {form.DtPreenchimento
                      ? convertData(form.DtPreenchimento)
                      : ""}
                  </td>
                  <td>{form.NomeCompleto}</td>
                  <td>
                    <Modal
                      header={`Formulário ${form.CodCandidato}`}
                      trigger={<Button
                      >
                        <Icon center>visibility</Icon>
                      </Button>}
                    >
                      <Modalzinho form={form} />
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      </Container>
    );
  }
}
