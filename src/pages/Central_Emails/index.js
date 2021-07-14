import React from "react";

//Meio de comunicação
import { api } from "../../services/api";
//"Placeholder" da página enquanto dados são carregados no
import Loading from "../../components/loading_screen";

import { convertData } from "../../components/commom_functions";

import Emissao from './modal/index'

//import de elementos visuais
import { TextInput, Button } from "react-materialize";
import { Panel, Container } from "../../components/commom_in";
import { Toast } from "../../components/toasty";
import { Table } from "../../components/table";
import Modal from "../../components/modal";

export default class CentralEmails extends React.Component {
  state = {
    loaded: false,
    EmailHistory: [],
    EmailHistoryFiltered: [],
    Modelos: [],
  };

  async componentDidMount() {
    try {
      //requisição inicial para obter dados essenciais da pagina
      const response = await api.get("/emails/history");

      if (response.status === 200) {
        this.setState({
          loaded: true,
          EmailHistory: response.data.log,
          EmailHistoryFiltered: response.data.log,
          Modelos: response.data.Modelos
        });
      } else {
        throw Error;
      }
    } catch (err) {
      Toast("Falha", "error");
    }
  }

  Filter(value, event) {
    this.setState({ EmailHistoryFiltered: [...this.state.EmailHistory] });
    event.target.value = value.toUpperCase();
    value = value.toUpperCase();

    if (value === "") {
      this.setState({ EmailHistoryFiltered: [...this.state.EmailHistory] });
      return;
    }

    if (value.length > 4) {
      event.target.value = value.slice(0, 4);
      value = value.slice(0, 4);
    }

    this.setState({ EmailHistoryFiltered: [...this.state.EmailHistory] });
    let aux = [];
    let newArray = [];
    aux = [...this.state.EmailHistory];

    for (let i = 0; i < aux.length; i++) {
      if (aux[i].M0_CODFIL.slice(0, value.length) === value) {
        newArray.push(aux[i]);
      }
    }

    this.setState({ EmailHistoryFiltered: newArray });
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <Container>
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
                {this.state.EmailHistoryFiltered.map((reg) => (
                  <tr>
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
              <TextInput
                onChange={(e) => this.Filter(e.target.value, e)}
                placeholder="Filtrar por filial"
              />
              <Modal
                actions={<Button>Enviar</Button>}
                header="Disparar Email"
                trigger={
                  <Button style={{ marginTop: "10px" }} node="button">
                    Disparar emails
                  </Button>
                }
              >
                  <Emissao modelos={this.state.Modelos} />
              </Modal>
            </div>
          </div>
        </Panel>
      </Container>
    );
  }
}
