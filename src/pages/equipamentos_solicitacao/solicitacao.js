import React from "react";
import Loading from "../../components/loading_screen";

import Imagem from "../../assets/Capturar.JPG";
import {
  Button,
  Icon,
  Modal,
  DatePicker,
  Table,
  Card,
  CardTitle,
  Textarea,
  TextInput,
} from "react-materialize";
import { Campo, Rotulo } from "../../components/commom_in";
import { Toast, ToastyContainer } from "../../components/toasty";
import { api } from "../../services/api";
import { CloseButton } from "../../components/buttons";

export default class Cadastro extends React.Component {
  state = {
    requisicao: {
      maquina: "",
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

      // estabilizador: false,
      // transformador: false,
      // telemetria: false,

      // validador: false,
      // moedeiro: false,
      sisPagamento: null,
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
    solicitado: false,
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
        BebidasDisp: response.data.Bebidas,
        loaded: true,
      });
    } catch (err) {
      Toast("Falha ao buscar endereços para entrega", "error");
    }
  }

  //reformulado
  async handleRequest() {
    if (this.state.requisicao.destino === null) {
      Toast("Preencha um destino para a solicitação");
      return false;
    }

    if (this.state.requisicao.maquina === "") {
      Toast("Escolha um modelo de máquina");
      return false;
    }

    if (this.state.config.length === 0) {
      Toast("Selecione pelo menos uma bebida para a máquina");
      return false;
    }

    if (
      this.state.requisicao.maquina !== "" &&
      this.state.requisicao.abastecimento === null
    ) {
      Toast("Selecione o sistema de abastecimento da máquina");
      return false;
    }

    if (
      this.state.requisicao.EmailA === null ||
      this.state.requisicao.EmailA === ""
    ) {
      Toast("Preencha um email para receber atualizações sobre o pedido");
      return false;
    }

    if (
      this.state.requisicao.maquina !== "" &&
      this.state.requisicao.sisPagamento === null
    ) {
      Toast("Selecione o meio de pagamento para a máquina");
      return false;
    }

    if (this.state.requisicao.DtPretendida === null) {
      Toast("Preencha uma data conveniente para entrega");
      return false;
    }

    if (this.state.requisicao.gabinete === null) {
      Toast("Especifique sua opção de gabinete");
      return false;
    }

    if (this.state.requisicao.Tproduto === null) {
      Toast("Selecione o tipo de produto da máquina");
      return false;
    }

    if (this.state.requisicao.Chip === null) {
      Toast(
        "Informe qual chip de operadora deve acompanhar a telemetria da máquina"
      );
      return false;
    }

    //envia a solicitação
    try {
      const response = await api.post("/equip", {
        Maq: this.state.requisicao,
        config: this.state.config,
      });

      if (response.status === 201) {
        this.setState({ solicitado: true });
        Toast("Solicitação registrada com sucesso", "success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        return true;
      } else {
        throw Error;
      }
    } catch (err) {
      Toast("Falha ao realizar solicitação", "error");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      return false;
    }
  }

  //reformulado
  async handleChangeTargetMaq(i) {
    this.setState({
      requisicao: {
        ...this.state.requisicao,
        maquina: this.state.MaqsDisp[i].MaqModelo,
        capacidade: this.state.MaqsDisp[i].MaqCapacidade,
      },
      a: true,
    });
  }

  //reformulado
  handleAtivarBebida(bebida, activate) {
    let aux = [];
    aux = this.state.config;
    let a = 0;
    let b = 0;

    if (aux.length === 0) {
      aux[0] = { ...bebida, acompanha: activate };
    }

    for (let i = 0; i < aux.length; i++) {
      if (aux[i].Cod === bebida.Cod) {
        //Se ele achar a bebida no array, vai atualizar o status
        aux[i] = { ...aux[i], acompanha: activate };
        a++;
      }
    }

    if (a === 0) {
      aux.push({ ...bebida, acompanha: activate });
    }

    this.setState({ config: aux });
    this.state.config.map((beb) => {
      beb.acompanha ? b++ : (b = b);
    });
    this.setState({ TotalBebidas: b });

    return;
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
              actions={[]}
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
                      <Table>
                        <thead>
                          <tr>
                            <th>Bebida</th>
                            <th>Medida</th>
                            <th>Acompanha?</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.BebidasDisp.map((bebida, i) => (
                            <tr>
                              <td>
                                {`${bebida.Bebida}${
                                  bebida.Complemento !== null
                                    ? ` com ${bebida.Complemento}`
                                    : " "
                                }${
                                  bebida.Medida !== null ? bebida.Medida : ""
                                }`}
                              </td>
                              <td>
                                {bebida.Qtd} {bebida.Un}
                              </td>
                              <td>
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    this.handleAtivarBebida(
                                      bebida,
                                      e.target.checked
                                    )
                                  }
                                ></input>
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
                </Campo>
                {/* <Campo>
                  <Rotulo>Imagem:</Rotulo>
                  <select
                    className="DefaultSelect"
                    onChange={(e) => {
                      this.setState({
                        requisicao: {
                          ...this.state.requisicao,
                          idVisual: e.target.value,
                        },
                      });
                    }}
                  >
                    <option selected hidden disabled value={null}>
                      Selecione...
                    </option>
                    <option value="Sem Imagem">Sem Imagem</option>
                    <option value="Pilão">Pilão</option>
                    <option value="Café do Ponto">Café do Ponto</option>
                    <option value="Damasco">Damasco</option>
                  </select>
                </Campo> */}
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
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </select>
                </Campo>
              </div>
            </Card>
          </div>
          <div>
            <Card
              actions={[]}
              className="blue-grey darken-1"
              textClassName="white-text"
              title="Detalhes da máquina"
            >
              <Campo>
                {/* <Checkbox
                  filledIn
                  onChange={(e) => {
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        estabilizador: e.target.checked,
                      },
                    });
                  }}
                  label="Estabilizador de Tensão"
                />
                <Checkbox
                  filledIn
                  onChange={(e) => {
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        transformador: e.target.checked,
                      },
                    });
                  }}
                  label="Transformador (110v / 220v)"
                />
                <Checkbox
                  filledIn
                  onChange={(e) => {
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        telemetria: e.target.checked,
                      },
                    });
                  }}
                  label="Telemetria"
                />
                <Checkbox
                  filledIn
                  onChange={(e) => {
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        validador: e.target.checked,
                      },
                    });
                  }}
                  label="Validador"
                />
                <Checkbox
                  filledIn
                  onChange={(e) => {
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        moedeiro: e.target.checked,
                      },
                    });
                  }}
                  label="Moedeiro"
                />
                <Checkbox
                  filledIn
                  onChange={(e) => {
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        filtro: e.target.checked,
                      },
                    });
                  }}
                  label="Kit de filtro"
                /> */}
                <label>Sistema de pagamento: </label>
                <select
                  className="DefaultSelect"
                  onChange={(e) => {
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        sisPagamento: e.target.value,
                      },
                    });
                  }}
                >
                  <option selected hidden disabled value={null}>
                    Selecione...
                  </option>
                  <option value="Livre">Livre</option>
                  <option value="Pin Pad - AMlabs">Pin Pad - AMlabs</option>
                  <option value="Validador">Validador</option>
                </select>

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
                        }, numero: ${
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
                        ].CNPJss
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
                <Rotulo>Data para entrega</Rotulo>
                <DatePicker
                  placeholder="Data desejada"
                  style={{
                    all: "unset",
                    borderBottom: "1px solid #ccc",
                  }}
                  onChange={(e) => {
                    this.setState({
                      requisicao: { ...this.state.requisicao, DtPretendida: e },
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
                      new Date().getDate() + 7
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
                <label>Observações:</label>
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
                disabled={this.state.solicitado}
                onClick={(e) => {
                  e.persist();
                  this.handleRequest();
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
