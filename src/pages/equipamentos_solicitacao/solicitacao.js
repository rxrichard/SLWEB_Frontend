import React from "react";
import Loading from "../../components/loading_screen";

import Imagem from "../../assets/Capturar.JPG";
import {
  Button,
  Icon,
  Modal,
  DatePicker,
  Card,
  CardTitle,
  Textarea,
  TextInput,
  Switch,
} from "react-materialize";
import { Table } from "../../components/table";
import { Campo, Rotulo } from "../../components/commom_in";
import { Toast, ToastyContainer } from "../../components/toasty";
import { api } from "../../services/api";
import { CloseButton } from "../../components/buttons";

export default class Cadastro extends React.Component {
  state = {
    requisicao: {
      maquina: "",
      maqid: null,
      capacidade: 0,
      destino: null,
      abastecimento: null,
      inibCopos: null,
      // idVisual: null,
      gabinete: null,
      DtPretendida: null,
      Tproduto: null,
      Chip: null,
      EmailA: null,
      CNPJ_Destino: null,
      Cliente_Destino: null,
      Tel_Contato: null,

      // estabilizador: false,
      // transformador: false,
      // telemetria: false,

      // validador: false,
      // moedeiro: false,
      sisPagamento: null,
      TValidador: null,
      validador: {},
      filtro: false,
      observacoes: "",
    },
    config: [],
    endereços_entrega: [],
    MaqsDisp: [], //Maquinas que ja possuem pelo menos uma configuração disponivel
    BebidasDisp: [],
    TotalBebidas: 0,
    // ConfigMaquina: undefined,
    // valorConfig: [],
    a: false, //só um switch, pode dar um nome descente se quiser...
    b: true, //só um switch, pode dar um nome descente se quiser...
    c: false, //só um switch, pode dar um nome descente se quiser...
    loaded: false,
  };

  //reformulado
  async componentDidMount() {
    try {
      //busca os endereços e modelos de maquina disponiveis
      const response = await api.get("/equip/adresses");

      this.setState({
        endereços_entrega: response.data.endereços,
        MaqsDisp: response.data.MaquinasDisponiveis,
        BebidasDisp: response.data.BebidasNovo,
        loaded: true,
      });
    } catch (err) {
      Toast("Falha ao buscar endereços para entrega", "error");
    }
  }

  //reformulado
  async handleRequest(event) {
    event.target.disabled = true;
    if (this.state.requisicao.destino === null) {
      Toast("Preencha um destino para a solicitação");
      event.target.disabled = false;
      return false;
    }

    if (this.state.requisicao.maquina === "") {
      Toast("Escolha um modelo de máquina");
      event.target.disabled = false;
      return false;
    }

    if (this.state.config.length === 0) {
      Toast("Selecione pelo menos uma bebida para a máquina");
      event.target.disabled = false;
      return false;
    }

    if (
      this.state.requisicao.maquina !== "" &&
      this.state.requisicao.abastecimento === null
    ) {
      Toast("Selecione o sistema de abastecimento da máquina");
      event.target.disabled = false;
      return false;
    }

    if (
      this.state.requisicao.EmailA === null ||
      this.state.requisicao.EmailA === ""
    ) {
      Toast("Preencha um email para receber atualizações sobre o pedido");
      event.target.disabled = false;
      return false;
    }

    if (
      this.state.requisicao.maquina !== "" &&
      this.state.requisicao.sisPagamento === null
    ) {
      Toast("Selecione o meio de pagamento para a máquina");
      event.target.disabled = false;
      return false;
    }

    if (this.state.requisicao.DtPretendida === null) {
      Toast("Preencha uma data conveniente para entrega");
      event.target.disabled = false;
      return false;
    }

    if (this.state.requisicao.gabinete === null) {
      Toast("Especifique sua opção de gabinete");
      event.target.disabled = false;
      return false;
    }

    if (this.state.requisicao.Tproduto === null) {
      Toast("Selecione o tipo de produto da máquina");
      event.target.disabled = false;
      return false;
    }

    if (this.state.requisicao.Chip === null) {
      Toast(
        "Informe qual chip de operadora deve acompanhar a telemetria da máquina"
      );
      event.target.disabled = false;
      return false;
    }

    // envia a solicitação
    try {
      const response = await api.post("/equip", {
        Maq: this.state.requisicao,
        config: this.state.config,
      });

      if (response.status === 201) {
        Toast("Solicitação registrada com sucesso", "success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        return true;
      } else {
        throw Error;
      }
    } catch (err) {
      Toast(
        "Falha ao concluir solicitação, por favor tente novamente",
        "error"
      );
      event.target.disabled = false;
      return false;
    }
  }

  //reformulado
  async handleChangeTargetMaq(i) {
    this.setState({
      requisicao: {
        ...this.state.requisicao,
        maquina: this.state.MaqsDisp[i].MaqModelo,
        maqid: this.state.MaqsDisp[i].MaqModId,
        capacidade: this.state.MaqsDisp[i].MaqCapacidade,
      },
      a: true,
    });
  }

  async handleAtivarBebida2(bebida, activate, event) {
    let aux = [];
    aux = this.state.config;
    let pointer = null;
    let b = 0;

    this.state.config.map((beb) => {
      if (beb.acompanha) b++
    });

    if (b >= this.state.requisicao.capacidade && activate) {
      Toast("Capacidade máxima da máquina já atingida");
      event.target.checked = false;
      return;
    }

    if (aux.length === 0) {
      aux.push({ ...bebida, acompanha: activate });
    }

    for (let i = 0; i < aux.length; i++) {
      if (aux[i].Cod === bebida.Cod) {
        pointer = i;
      }
    }

    if (pointer !== null) {
      aux[pointer] = { ...bebida, acompanha: activate };
    }

    if (pointer === null) {
      aux.push({ ...bebida, acompanha: activate });
    }

    b = 0;

    this.state.config.map((beb) => {
      if (beb.acompanha) b++;
    });

    this.setState({ config: aux, TotalBebidas: b });
  }

  //reformulado
  // handleAtivarBebida(bebida, activate) {
  //   let aux = [];
  //   aux = this.state.config;
  //   let a = 0;
  //   let b = 0;

  //   if (aux.length === 0) {
  //     aux.push({
  //       ...bebida,
  //       acompanha: activate,
  //       Selecao: this.state.TotalBebidas + 1,
  //     });
  //   }

  //   for (let i = 0; i < aux.length; i++) {
  //     if (aux[i].Cod === bebida.Cod && activate === true) {
  //       //Se ele achar a bebida no array, vai atualizar o status
  //       aux[i] = {
  //         ...aux[i],
  //         acompanha: activate,
  //         Selecao: this.state.TotalBebidas + 1,
  //       };
  //       a++;
  //     } else if (aux[i].Cod === bebida.Cod && activate === false) {
  //       aux[i] = {
  //         ...aux[i],
  //         acompanha: activate,
  //         Selecao: this.state.TotalBebidas - 1,
  //       };
  //       a++;
  //     }
  //   }

  //   if (a === 0) {
  //     aux.push({
  //       ...bebida,
  //       acompanha: activate,
  //       Selecao: this.state.TotalBebidas + 1,
  //     });
  //   }

  //   this.setState({ config: aux });

  //   this.state.config.map((beb) => {
  //     beb.acompanha ? b++ : (b = b);
  //   });

  //   this.setState({ TotalBebidas: b });

  //   return;
  // }

  handleSisPagChange(sispag) {
    const checks = document.querySelectorAll('input[type="checkbox"]');

    for (let i = checks.length - 5; i < checks.length; i++) {
      checks[i].checked = false;
    }

    if (sispag === "Validador") {
      this.setState({ b: false });
    } else {
      this.setState({
        b: true,
        requisicao: { ...this.state.requisicao, validador: {} },
      });
    }
    this.setState({
      requisicao: {
        ...this.state.requisicao,
        sisPagamento: sispag,
      },
    });
  }

  handleActivateSwitch(value) {
    const checks = document.querySelectorAll('input[type="checkbox"]');

    for (let i = checks.length - 5; i < checks.length; i++) {
      checks[i].checked = false;
    }
    this.setState({
      c: value,
      requisicao: {
        ...this.state.requisicao,
        TValidador: value ? "Ficha" : "Moeda",
        validador: {},
      },
    });
  }

  handleMantValidador(valor, acao) {
    let aux = this.state.requisicao.validador;
    let valid = {};

    if (this.state.c && acao) {
      switch (valor) {
        case "1":
          valid = { ...aux, val1: valor };
          break;
        case "2":
          valid = { ...aux, val2: valor };
          break;
        case "4":
          valid = { ...aux, val3: valor };
          break;
        case "8":
          valid = { ...aux, val4: valor };
          break;
        case "16":
          valid = { ...aux, val5: valor };
          break;
        default:
          valid = {};
      }
    } else if (!this.state.c && acao) {
      switch (valor) {
        case "0.05":
          valid = { ...aux, val1: valor };
          break;
        case "0.10":
          valid = { ...aux, val2: valor };
          break;
        case "0.25":
          valid = { ...aux, val3: valor };
          break;
        case "0.50":
          valid = { ...aux, val4: valor };
          break;
        case "1.00":
          valid = { ...aux, val5: valor };
          break;
        default:
          valid = {};
      }
    } else if (this.state.c && !acao) {
      switch (valor) {
        case "1":
          valid = aux;
          delete valid.val1;
          break;
        case "2":
          valid = aux;
          delete valid.val2;
          break;
        case "4":
          valid = aux;
          delete valid.val3;
          break;
        case "8":
          valid = aux;
          delete valid.val4;
          break;
        case "16":
          valid = aux;
          delete valid.val5;
          break;
        default:
          valid = {};
      }
    } else {
      switch (valor) {
        case "0.05":
          valid = aux;
          delete valid.val1;
          break;
        case "0.10":
          valid = aux;
          delete valid.val2;
          break;
        case "0.25":
          valid = aux;
          delete valid.val3;
          break;
        case "0.50":
          valid = aux;
          delete valid.val4;
          break;
        case "1.00":
          valid = aux;
          delete valid.val5;
          break;
        default:
          valid = {};
      }
    }

    this.setState({
      requisicao: { ...this.state.requisicao, validador: valid },
    });
  }

  handleDefinirSelecao(z, selecao, event) {
    let aux = [];
    aux = this.state.config;
    let pointer = null;

    for (let j = 0; j < aux.length; j++) {
      if (aux[j].Cod === this.state.BebidasDisp[z].Cod) {
        pointer = j;
      }
    }

    if (
      typeof this.state.config[pointer] == "undefined" ||
      this.state.config[pointer].acompanha === false
    ) {
      Toast("Ative a bebida antes de modificar o número da seleção");
      event.target.value = "";
      return;
    }

    if (aux.length === 0) {
      Toast("Ative a bebida antes de modificar o número da seleção");
      event.target.value = "";
      return;
    }

    if (isNaN(Number(selecao))) {
      Toast("Insira número entre 1 e 99");
      event.target.value = this.state.config[z].Selecao;
      return;
    }

    if (aux.length > 0 && selecao.length > 2) {
      event.target.value = selecao.slice(0, 2);
      Toast("Insira número entre 1 e 99");
      return;
    }

    if (selecao === "") {
      return;
    }

    for (let i = 0; i < aux.length; i++) {
      if (aux[i].Cod === this.state.config[pointer].Cod) {
        //Se ele achar a bebida no array, vai atualizar o status
        aux[i] = { ...aux[i], Selecao: selecao };
      }
    }

    this.setState({ config: aux });

    console.log(this.state.config);
    return;
  }

  handleChangeCost(z, cost, event) {
    let aux = [];
    aux = this.state.config;
    let pointer = null;

    for (let j = 0; j < aux.length; j++) {
      if (aux[j].Cod === this.state.BebidasDisp[z].Cod) {
        pointer = j;
      }
    }

    if (aux.length === 0) {
      Toast("Ative a bebida antes de modificar seu preço");
      event.target.value = "";
      return;
    }

    if (
      typeof this.state.config[pointer] == "undefined" ||
      this.state.config[pointer].acompanha === false
    ) {
      Toast("Ative a bebida antes de modificar seu preço");
      event.target.value = "";
      return;
    }

    if (isNaN(Number(cost))) {
      Toast("Insira apenas números");
      event.target.value = this.state.config[z].PrecoMaq;
      return;
    }

    if (Number(cost) === "") {
      Toast("Aviso: você definiu o preço da bebida como R$ 0,00");
    }

    if (cost === "") {
      return;
    }

    for (let i = 0; i < aux.length; i++) {
      if (aux[i].Cod === this.state.config[pointer].Cod) {
        //Se ele achar a bebida no array, vai atualizar o status
        aux[i] = { ...aux[i], PrecoMaq: cost };
      }
    }

    this.setState({ config: aux });
    console.log(this.state.config);
  }

  render() {
    return !this.state.loaded ? (
      <Loading />
    ) : (
      <>
        <ToastyContainer />
        <div
          style={{
            width: "80vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ maxWidth: "20vw", minWidth: "300px" }}>
            <Card
              header={
                <CardTitle image={Imagem}>Solicitação de máquina</CardTitle>
              }
              className="blue-grey darken-1"
              textClassName="white-text"
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                  }}
                >
                  <Campo>
                    <Rotulo>Máquina:</Rotulo>
                    <select
                      className="DefaultSelect"
                      onChange={(e) =>
                        this.handleChangeTargetMaq(e.target.value)
                      }
                    >
                      <option selected hidden disabled value={null}>
                        Selecione...
                      </option>
                      {this.state.MaqsDisp.map((maq, i) => (
                        <option key={i} value={i}>
                          {maq.MaqModelo}
                        </option>
                      ))}
                    </select>
                  </Campo>
                  <Modal
                    actions={[<CloseButton />]}
                    bottomSheet={false}
                    fixedFooter={true}
                    header={`Bebidas (${this.state.TotalBebidas})`}
                    trigger={
                      <Button
                        disabled={
                          this.state.requisicao.maquina === "" ? true : false
                        }
                        style={{ marginLeft: "10px" }}
                      >
                        <Icon center>settings</Icon>
                      </Button>
                    }
                  >
                    {this.state.a === true ? (
                      <Table height={50} centered>
                        <thead>
                          <tr>
                            <th>Bebida</th>
                            <th>Medida</th>
                            <th>Configura?</th>
                            <th>Seleção</th>
                            <th>Preço de máquina</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.BebidasDisp.map((bebida, i) => (
                            <tr>
                              <td>
                                {`${bebida.Bebida}${
                                  bebida.Complemento !== null
                                    ? ` com ${bebida.Complemento}`
                                    : ""
                                }${
                                  bebida.Medida !== null
                                    ? ` ${bebida.Medida}`
                                    : ""
                                }`}
                              </td>
                              <td>
                                {bebida.Qtd} {bebida.Un}
                              </td>
                              <td>
                                <input
                                  style={{ position: "relative", zIndex: "0" }}
                                  type="checkbox"
                                  onChange={(e) => {
                                    e.persist();
                                    this.handleAtivarBebida2(
                                      bebida,
                                      e.target.checked,
                                      e
                                    );
                                  }}
                                />
                              </td>
                              <td>
                                <Icon small left>
                                  dialpad
                                </Icon>
                                <input
                                  type="text"
                                  placeholder={
                                    this.state.config[i] &&
                                    this.state.config[i].Selecao !== "0"
                                      ? this.state.config[i].Selecao
                                      : 0
                                  }
                                  style={{ width: "20px", textAlign: "center" }}
                                  onChange={(e) => {
                                    e.persist();
                                    this.handleDefinirSelecao(
                                      i,
                                      e.target.value,
                                      e
                                    );
                                  }}
                                />
                              </td>

                              <td>
                                <Icon small left>
                                  attach_money
                                </Icon>
                                <input
                                  type="text"
                                  placeholder={
                                    this.state.config[i] &&
                                    this.state.config[i].PrecoMaq !== "0"
                                      ? this.state.config[i].PrecoMaq
                                      : 0
                                  }
                                  style={{ width: "40px", textAlign: "center" }}
                                  onChange={(e) => {
                                    e.persist();
                                    this.handleChangeCost(i, e.target.value, e);
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p>Nenhuma configuração padrãp disponivel.</p>
                    )}
                  </Modal>
                </div>
                {this.state.requisicao.maquina !== "LEI SA" &&
                this.state.requisicao.maquina !== "" ? (
                  <Campo>
                    <Rotulo>Inibir Copos?</Rotulo>
                    <select
                      className="DefaultSelect"
                      onChange={(e) =>
                        this.setState({
                          requisicao: {
                            ...this.state.requisicao,
                            inibCopos: e.target.value,
                          },
                        })
                      }
                    >
                      <option selected hidden disabled value={null}>
                        Selecione...
                      </option>
                      <option value={true}>Sim</option>
                      <option value={false}>Não</option>
                    </select>
                  </Campo>
                ) : (
                  <></>
                )}

                <Campo>
                  <Rotulo>Acompanha Gabinete?</Rotulo>
                  <select
                    className="DefaultSelect"
                    onChange={(e) => {
                      this.setState({
                        requisicao: {
                          ...this.state.requisicao,
                          gabinete: e.target.value,
                        },
                      });
                    }}
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value={true}>Sim</option>
                    <option value={false}>Não</option>
                  </select>
                </Campo>
              </div>
            </Card>
          </div>
          <div>
            <Card
              className="blue-grey darken-1"
              textClassName="white-text"
              title="Detalhes da máquina"
            >
              <Campo>
                <Rotulo>Sistema de pagamento: </Rotulo>
                <select
                  className="DefaultSelect"
                  onChange={(e) => this.handleSisPagChange(e.target.value)}
                >
                  <option selected hidden disabled value={null}>
                    Selecione...
                  </option>
                  <option value="Livre">Livre</option>
                  <option value="Cartão">Cartão</option>
                  <option value="Validador">Validador</option>
                </select>

                <Modal
                  actions={[<CloseButton />]}
                  bottomSheet={false}
                  fixedFooter={false}
                  header="Detalhes do Sistema de Pagamento"
                  id="pag"
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
                    startingTop: "4%",
                  }}
                  trigger={
                    <Button
                      disabled={this.state.b}
                      style={{ marginTop: "10px" }}
                    >
                      Det. Validador<Icon left>settings</Icon>
                    </Button>
                  }
                >
                  <Switch
                    id="Switch-11"
                    offLabel="Moeda"
                    onChange={(e) => {
                      this.handleActivateSwitch(e.target.checked);
                    }}
                    onLabel="Ficha"
                  />
                  {this.state.c ? (
                    <>
                      <br />
                      <input
                        onChange={(e) =>
                          this.handleMantValidador(
                            e.target.value,
                            e.target.checked
                          )
                        }
                        type="checkbox"
                        value="1"
                      />
                      <Rotulo>1</Rotulo>
                      <br />
                      <input
                        onChange={(e) =>
                          this.handleMantValidador(
                            e.target.value,
                            e.target.checked
                          )
                        }
                        type="checkbox"
                        value="2"
                      />
                      <Rotulo>2</Rotulo>
                      <br />
                      <input
                        onChange={(e) =>
                          this.handleMantValidador(
                            e.target.value,
                            e.target.checked
                          )
                        }
                        type="checkbox"
                        value="4"
                      />
                      <Rotulo>4</Rotulo>
                      <br />
                      <input
                        onChange={(e) =>
                          this.handleMantValidador(
                            e.target.value,
                            e.target.checked
                          )
                        }
                        type="checkbox"
                        value="8"
                      />
                      <Rotulo>8</Rotulo>
                      <br />
                      <input
                        onChange={(e) =>
                          this.handleMantValidador(
                            e.target.value,
                            e.target.checked
                          )
                        }
                        type="checkbox"
                        value="16"
                      />
                      <Rotulo>16</Rotulo>
                    </>
                  ) : (
                    <>
                      <br />
                      <input
                        onChange={(e) =>
                          this.handleMantValidador(
                            e.target.value,
                            e.target.checked
                          )
                        }
                        type="checkbox"
                        value="0.05"
                      />
                      <Rotulo>R$ 0,05</Rotulo>
                      <br />
                      <input
                        onChange={(e) =>
                          this.handleMantValidador(
                            e.target.value,
                            e.target.checked
                          )
                        }
                        type="checkbox"
                        value="0.10"
                      />
                      <Rotulo>R$ 0,10</Rotulo>
                      <br />
                      <input
                        onChange={(e) =>
                          this.handleMantValidador(
                            e.target.value,
                            e.target.checked
                          )
                        }
                        type="checkbox"
                        value="0.25"
                      />
                      <Rotulo>R$ 0,25</Rotulo>
                      <br />
                      <input
                        onChange={(e) =>
                          this.handleMantValidador(
                            e.target.value,
                            e.target.checked
                          )
                        }
                        type="checkbox"
                        value="0.50"
                      />
                      <Rotulo>R$ 0,50</Rotulo>
                      <br />
                      <input
                        onChange={(e) =>
                          this.handleMantValidador(
                            e.target.value,
                            e.target.checked
                          )
                        }
                        type="checkbox"
                        value="1.00"
                      />
                      <Rotulo>R$ 1,00</Rotulo>
                    </>
                  )}
                </Modal>

                <Rotulo>Tipo de Produto: </Rotulo>
                <select
                  className="DefaultSelect"
                  onChange={(e) => {
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        Tproduto: e.target.value,
                      },
                    });
                  }}
                >
                  <option selected hidden disabled value={null}>
                    Selecione...
                  </option>
                  <option value="Mistura">Mistura</option>
                  <option value="Pronto">Pronto</option>
                </select>

                <Rotulo>Abastecimento de Água:</Rotulo>
                <select
                  className="DefaultSelect"
                  onChange={(e) => {
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        abastecimento: e.target.value,
                      },
                    });
                  }}
                >
                  <option selected hidden disabled value={null}>
                    Selecione...
                  </option>
                  <option value="Galão">Galão</option>
                  <option value="Ponto Hidrico">Ponto Hídrico</option>
                </select>

                <Rotulo>Operadora do Chip de Telemetria: </Rotulo>
                <select
                  className="DefaultSelect"
                  onChange={(e) => {
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        Chip: e.target.value,
                      },
                    });
                  }}
                >
                  <option selected hidden disabled value={null}>
                    Selecione...
                  </option>
                  <option value="Vivo">Vivo</option>
                  <option value="Tim">Tim</option>
                  <option value="Claro">Claro</option>
                  <option value="Vodafone">Vodafone</option>
                  <option value="WiFi">WiFi</option>
                  <option value="Antena Externa">Antena Externa</option>
                </select>
              </Campo>
            </Card>
          </div>
          <div>
            <Card
              actions={[
                <Button className="modal-trigger" href="#confirm" waves="light">
                  Solicitar
                  <Icon left>add</Icon>
                </Button>,
              ]}
              className="blue-grey darken-1"
              textClassName="white-text"
              title="Detalhes da entrega"
            >
              <Campo>
                <Rotulo>Local de entrega:</Rotulo>
                <select
                  className="DefaultSelect"
                  onChange={(e) => {
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        destino: `${
                          this.state.endereços_entrega[e.target.value]
                            .Logradouro === null
                            ? "NA"
                            : this.state.endereços_entrega[
                                e.target.value
                              ].Logradouro.trim()
                        }, número: ${
                          this.state.endereços_entrega[e.target.value]
                            .Número === null
                            ? "NA"
                            : this.state.endereços_entrega[
                                e.target.value
                              ].Número.trim()
                        }, complemento: ${
                          this.state.endereços_entrega[e.target.value]
                            .Complemento === null
                            ? "NA"
                            : this.state.endereços_entrega[
                                e.target.value
                              ].Complemento.trim()
                        }, bairro: ${
                          this.state.endereços_entrega[e.target.value]
                            .Bairro === null
                            ? "NA"
                            : this.state.endereços_entrega[
                                e.target.value
                              ].Bairro.trim()
                        }, CEP: ${
                          this.state.endereços_entrega[e.target.value].CEP ===
                          null
                            ? "NA"
                            : this.state.endereços_entrega[
                                e.target.value
                              ].CEP.trim()
                        }, ${
                          this.state.endereços_entrega[e.target.value]
                            .Município === null
                            ? "NA"
                            : this.state.endereços_entrega[
                                e.target.value
                              ].Município.trim()
                        }, ${
                          this.state.endereços_entrega[e.target.value].UF ===
                          null
                            ? "NA"
                            : this.state.endereços_entrega[
                                e.target.value
                              ].UF.trim()
                        }`,
                        CNPJ_Destino: this.state.endereços_entrega[
                          e.target.value
                        ].CNPJss,
                        Cliente_Destino: this.state.endereços_entrega[
                          e.target.value
                        ].Nome_Fantasia,
                      },
                    });
                  }}
                >
                  <option selected hidden disabled value={null}>
                    Selecione...
                  </option>
                  {this.state.endereços_entrega.map((cliente, i) => (
                    <option key={cliente.CNPJ} value={i}>
                      {cliente.Nome_Fantasia}
                    </option>
                  ))}
                </select>
              </Campo>
              <Campo>
                <label style={{ width: "20vw" }}>
                  {this.state.requisicao.destino}
                </label>
              </Campo>
              <div className="XAlign">
                <Campo>
                  <Rotulo>Data mínima prevista(20D)</Rotulo>
                  {
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate() + 20
                    )
                      .toLocaleString()
                      .split(" ")[0]
                  }
                </Campo>
                <Campo>
                  <Rotulo>Dt. Entrega Desejada</Rotulo>
                  <DatePicker
                    placeholder="Data desejada"
                    style={{
                      all: "unset",
                      borderBottom: "1px solid #ccc",
                    }}
                    onChange={(e) => {
                      this.setState({
                        requisicao: {
                          ...this.state.requisicao,
                          DtPretendida: e,
                        },
                      });
                    }}
                    options={{
                      autoClose: true,
                      container: null,
                      defaultDate: null,
                      disableDayFn: null,
                      disableWeekends: true,
                      events: [],
                      firstDay: 0,
                      format: "mmm dd, yyyy",
                      i18n: {
                        cancel: "Cancelar",
                        clear: "Limpar",
                        done: "Confirmar",
                        months: [
                          "Janeiro",
                          "Fevereiro",
                          "Março",
                          "Abril",
                          "Maio",
                          "Junho",
                          "Julho",
                          "Agosto",
                          "Setembro",
                          "Outubro",
                          "Novembro",
                          "Dezembro",
                        ],
                        monthsShort: [
                          "Jan",
                          "Fev",
                          "Mar",
                          "Abr",
                          "Mai",
                          "Jun",
                          "Jul",
                          "Ago",
                          "Set",
                          "Out",
                          "Nov",
                          "Dez",
                        ],
                        nextMonth: "›",
                        previousMonth: "‹",
                        weekdays: [
                          "Domingo",
                          "Segunda",
                          "Terça",
                          "Quarta",
                          "Quinta",
                          "Sexta",
                          "Sábado",
                        ],
                        weekdaysAbbrev: ["D", "S", "T", "Q", "Q", "S", "S"],
                        weekdaysShort: [
                          "Dom",
                          "Seg",
                          "Ter",
                          "Qua",
                          "Qui",
                          "Sex",
                          "Sab",
                        ],
                      },
                      isRTL: false,
                      maxDate: null,
                      minDate: new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        new Date().getDate() + 20
                      ),
                      onClose: null,
                      onDraw: null,
                      onOpen: null,
                      onSelect: null,
                      parse: null,
                      setDefaultDate: false,
                      showClearBtn: true,
                      showDaysInNextAndPreviousMonths: false,
                      showMonthAfterYear: false,
                      yearRange: 1,
                    }}
                  />
                </Campo>
              </div>
              <Campo>
                <Rotulo>Email para acompanhamento: </Rotulo>
                <TextInput
                  email
                  error="email inválido"
                  icon={<Icon>email</Icon>}
                  success="OK!"
                  placeholder="joao123@email.com.br"
                  data-length={40}
                  onChange={(e) =>
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        EmailA: e.target.value,
                      },
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Telefone para Contato: </Rotulo>
                <TextInput
                  icon={<Icon>contact_phone</Icon>}
                  placeholder="(11) 12345-6789"
                  onChange={(e) =>
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        Tel_Contato: e.target.value,
                      },
                    })
                  }
                />
              </Campo>
              <Campo>
                <Rotulo>Observações:</Rotulo>
                <Textarea
                  icon={<Icon>arrow_forward</Icon>}
                  onChange={(e) =>
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        observacoes: e.target.value,
                      },
                    })
                  }
                ></Textarea>
              </Campo>
            </Card>
          </div>
          <Modal
            actions={[
              <Button
                disabled={false}
                onClick={(e) => {
                  e.persist();
                  this.handleRequest(e);
                }}
              >
                <Icon left>check</Icon>
                Confirmar
              </Button>,
              <CloseButton />,
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header="Confirmar solicitação?"
            id="confirm"
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
              startingTop: "4%",
            }}
          >
            <label>
              Após confirmar, custos poderão ser aplicados mesmo com o
              cancelamento da solicitação na tela de Solicitações
            </label>
          </Modal>
        </div>
      </>
    );
  }
}
