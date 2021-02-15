import React from "react";
import { api } from "../../services/api";
import { Toast } from "../../components/toasty";
import Loading from "../../components/loading_screen";

import { TextInput, Select, Button, Icon, Modal } from "react-materialize";
import {
  Combobox,
  Titulo,
  Contagem,
  Panel,
  Campo,
  Rotulo
} from "../../components/commom_in";
import { ToastContainer } from "react-toastify";
import "../../style/cad.css";

class Cliente extends React.Component {
  state = {
    usuarios: [],
    headerInfo: {},
    displayed: 0,
    loaded: false,
    newUser: {},
    update: {
      Razão_Social: "",
      Nome_Fantasia: "",
      CNPJss: "",
      CNPJ: "",
      IE: "",
      Contato_Empresa: "",
      Email: "",
      TPessoa: "",
      DtSolicita: "",
      DtCadastro: "",
      Logradouro: "",
      Número: "",
      Complemento: "",
      CEP: "",
      Fone: "",
      Município: "",
      UF: "",
      Bairro: ""
    }
  };

  async componentDidMount() {
    try {
      const token = await localStorage.getItem("token");
      const clientes = await api.post("/client/", {
        token: token
      });
      this.setState({ usuarios: clientes.data });
      this.setState({ loaded: true });
      this.switchCliente(0);
    } catch (err) {
      localStorage.clear();
      window.location.assign("/");
    }
  }

  converterData(data) {
    if (data === "NA" || data === null) {
      return "NA";
    }

    let DtSolicita = String(data);

    const dataA = DtSolicita.split("T");
    const dataB = dataA[0].replace(/-/g, "/");
    return dataB
      .split("/")
      .reverse()
      .join("/");
  }

  async switchCliente(num) {
    this.setState({ displayed: num });
    this.setState({ update: this.state.usuarios[num] });

    const inputs = document.querySelectorAll("input");
    let i;
    for (i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }

    try {
      const response = await api.get("/client/", {
        params: {
          CNPJ: this.state.usuarios[num].CNPJ,
          token: localStorage.getItem("token")
        }
      });

      this.setState({ headerInfo: response.data });

    } catch (err) {
      Toast("Falha ao buscar detalhes do cliente no servidor", "error");
    }
  }

  async Update() {
    try {
      const token = localStorage.getItem("token");
      const cliente = this.state.update;

      await api.put("/client/update", {
        token,
        cliente
      });
      Toast("Dados do cliente atualizados com sucesso", "success");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (err) {
      Toast("Falha ao atualizar dados do cliente", "error");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <>
        <ToastContainer />
        <Panel>
          <Titulo>
            <Campo
              style={{ border: "1px dashed #000", margin: "10px", span: 4 }}
            >
              <Rotulo>Cliente: </Rotulo>
              <Select
                icon={<Icon center>people_outline</Icon>}
                onChange={e => {
                  this.switchCliente(e.target.value);
                }}
              >
                {this.state.usuarios.map((usuario, i) => (
                  <option key={usuario.CNPJn} value={i}>
                    {usuario.Nome_Fantasia + ", CNPJ: " + usuario.CNPJss}
                  </option>
                ))}
              </Select>
            </Campo>
            <label>Contratos: </label>
            <Contagem>{this.state.headerInfo.Contratos}</Contagem>

            <label>Anexos: </label>
            <Contagem>{this.state.headerInfo.Anexos}</Contagem>

            <label>Máquinas: </label>
            <Contagem>{this.state.headerInfo.Anexos}</Contagem>
          </Titulo>

          <>
            <Combobox className="double">
              <Campo>
                <Rotulo>Razão Social: </Rotulo>
                <TextInput
                  placeholder={
                    this.state.usuarios[this.state.displayed].Razão_Social ||
                    "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: {
                        ...this.state.update,
                        Razão_Social: e.target.value
                      }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Nome Fantasia: </Rotulo>
                <TextInput
                  placeholder={
                    this.state.usuarios[this.state.displayed].Nome_Fantasia ||
                    "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: {
                        ...this.state.update,
                        Nome_Fantasia: e.target.value
                      }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>CNPJ / CPF: </Rotulo>
                <TextInput
                  disabled
                  placeholder={
                    this.state.usuarios[this.state.displayed].CNPJss || "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, CNPJ: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>IE: </Rotulo>
                <TextInput
                type='number'
                  placeholder={
                    this.state.usuarios[this.state.displayed].IE || "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, IE: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Pessoa: </Rotulo>
                <Select
                  disabled
                  onChange={e => {
                    this.setState({
                      update: {
                        ...this.state.update,
                        TPessoa: e.target.value
                      }
                    });
                  }}
                >
                  {this.state.usuarios[this.state.displayed].TPessoa === "J" ? (
                    <>
                      <option defaultValue value="J">
                        Jurídica
                      </option>
                      <option value="F">Física</option>
                    </>
                  ) : (
                    <>
                      <option defaultValue value="F">
                        Física
                      </option>
                      <option value="J">Jurídica</option>
                    </>
                  )}
                </Select>
              </Campo>
            </Combobox>

            <Combobox>
              <Campo>
                <Rotulo>Logradouro: </Rotulo>
                <TextInput
                  placeholder={
                    this.state.usuarios[this.state.displayed].Logradouro || "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: {
                        ...this.state.update,
                        Logradouro: e.target.value
                      }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Número: </Rotulo>
                <TextInput
                type="number"
                  placeholder={
                    this.state.usuarios[this.state.displayed].Número || "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, Número: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Complemento: </Rotulo>
                <TextInput
                  placeholder={
                    this.state.usuarios[this.state.displayed].Complemento ||
                    "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: {
                        ...this.state.update,
                        Complemento: e.target.value
                      }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>CEP: </Rotulo>
                <TextInput
                type='number'
                  placeholder={
                    this.state.usuarios[this.state.displayed].CEP || "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, CEP: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Bairro: </Rotulo>
                <TextInput
                  placeholder={
                    this.state.usuarios[this.state.displayed].Bairro || "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, Bairro: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Município: </Rotulo>
                <TextInput
                  placeholder={
                    this.state.usuarios[this.state.displayed].Município || "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: {
                        ...this.state.update,
                        Município: e.target.value
                      }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>UF: </Rotulo>
                <TextInput
                  placeholder={
                    this.state.usuarios[this.state.displayed].UF || "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, UF: e.target.value }
                    })
                  }
                />
              </Campo>
            </Combobox>
            <Combobox>
              <Campo>
                <Rotulo>Contato: </Rotulo>
                <TextInput
                  placeholder={
                    this.state.usuarios[this.state.displayed].Contato_Empresa ||
                    "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: {
                        ...this.state.update,
                        Contato_Empresa: e.target.value
                      }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Email: </Rotulo>
                <TextInput
                  placeholder={
                    this.state.usuarios[this.state.displayed].Email || "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, Email: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>DDD: </Rotulo>
                <TextInput
                type='number'
                  placeholder={
                    this.state.usuarios[this.state.displayed].DDD || "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, DDD: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Fone: </Rotulo>
                <TextInput
                type='number'
                  placeholder={
                    this.state.usuarios[this.state.displayed].Fone || "NA"
                  }
                  onChange={e =>
                    this.setState({
                      update: { ...this.state.update, Fone: e.target.value }
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>DtSolicita: </Rotulo>
                <TextInput
                  value={this.converterData(
                    this.state.usuarios[this.state.displayed].DtSolicita || "NA"
                  )}
                  readOnly
                />
              </Campo>
              <Campo>
                <Rotulo>DtCadastro: </Rotulo>
                <TextInput
                  value={this.converterData(
                    this.state.usuarios[this.state.displayed].DtCadastro || "NA"
                  )}
                  readOnly
                />
              </Campo>
            </Combobox>
          </>
          <buttonFooter>
            <Modal
              actions={[
                <Button
                  node="button"
                  style={{
                    marginLeft: "5px"
                  }}
                  waves="light"
                  onClick={() => {
                    this.Update();
                  }}
                >
                  Confirmar
                  <Icon left>check</Icon>
                </Button>,
                <Button flat modal="close" node="button" waves="green">
                  Fechar
                </Button>
              ]}
              bottomSheet={false}
              fixedFooter={false}
              header="Confirmação"
              id="modal-0"
              options={{
                dismissible: true,
                endingTop: "10%",
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: "4%"
              }}
              trigger={
                <Button>
                  Atualizar Cliente
                  <Icon left>cloud_upload</Icon>
                </Button>
              }
            >
              <p>Confirmar dados e atualizar cliente?</p>
            </Modal>
            <Button
              node="button"
              style={{
                marginLeft: "5px"
              }}
              waves="light"
              onClick={() => {
                window.location.assign("/clientes/novo");
              }}
            >
              Adicionar Cliente
              <Icon left>add</Icon>
            </Button>
          </buttonFooter>
        </Panel>
      </>
    );
  }
}

export default Cliente;
