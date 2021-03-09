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
      gabinete: null,
      DtPretendida: null,
      Chip: null,
      ExtAnt: null,
      EmailA: null,
      CNPJ_Destino: null,
      Cliente_Destino: null,
      Tel_Contato: null,
      Contato: null,

      sisPagamento: null,
      TValidador: null,
      validador: [],
      observacoes: "",
    },
    config: [
      {
        Bebida: null,
        Un: "",
        Qtd: [],
        Qtd_Def: null,
        Medida: [],
        Medida_Def: null,
        configura: null,
        Selecao: 0,
        PrecoMaq: 0,
        TProd: null,
      },
    ],
    endereços_entrega: [],
    MaqsDisp: [],
    BebidasDisp: [],
    PadraoMaq: [],
    TotalBebidas: 0,
    ultimaSelecao: 0,
    a: false, //só um switch, pode dar um nome descente se quiser...
    b: true, //só um switch, pode dar um nome descente se quiser...
    c: false, //só um switch, pode dar um nome descente se quiser...
    loaded: false,
  };

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
      this.calcUltSelecao();
    } catch (err) {
      Toast("Falha ao buscar endereços para entrega", "error");
    }
  }

  async handleRequest(event) {
    event.target.disabled = true;

    if (this.state.requisicao.maquina === "") {
      Toast("Escolha um modelo de máquina");
      event.target.disabled = false;
      return false;
    }

    if (this.state.config.length <= 1) {
      Toast("Selecione pelo menos uma bebida para a máquina");
      event.target.disabled = false;
      return false;
    }

    if (this.state.requisicao.sisPagamento === null) {
      Toast("Selecione o meio de pagamento para a máquina");
      event.target.disabled = false;
      return false;
    }

    if (
      (this.state.requisicao.sisPagamento === "Validador" ||
        this.state.requisicao.sisPagamento === "Cartão e Validador") &&
      this.state.requisicao.TValidador === "Ficha" &&
      this.state.requisicao.validador.length === 0
    ) {
      Toast("Especifique que moedas ou fichas o validador deve aceitar");
      event.target.disabled = false;
      return false;
    }

    if (this.state.requisicao.gabinete === null) {
      Toast("Selecione se deseja um gabinete acompanhando a máquina ou não");
      event.target.disabled = false;
      return false;
    }

    if (this.state.requisicao.abastecimento === null) {
      Toast("Selecione o sistema de abastecimento da máquina");
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

    if (this.state.requisicao.ExtAnt === null) {
      Toast("Informe se o a máquina deve acompanhar uma antena externa");
      event.target.disabled = false;
      return false;
    }

    if (this.state.requisicao.destino === null) {
      Toast("Preencha um destino para a solicitação");
      event.target.disabled = false;
      return false;
    }

    if (this.state.requisicao.DtPretendida === null) {
      Toast("Preencha uma data conveniente para entrega");
      event.target.disabled = false;
      return false;
    }

    if (this.state.requisicao.Contato === null) {
      Toast("Informe o nome do contato para acompanhar a entrega da máquina");
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

    if (this.state.requisicao.Tel_Contato === null) {
      Toast(
        "Informe o número de telefone do contato que acompanhará a entrega da máquina"
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
        alert(
          'Solicitação registrada com sucesso, por favor verifique o PDF gerado que pode ser encontrado no seu email ou na aba "Solicitações" desta mesma tela. Se encontrar qualquer inconformidade no PDF do pedido, por favor entre em contato imediatamente com suporte3@slaplic.com.br'
        );
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

  async handleChangeTargetMaq(i) {
    let aux = [];
    aux = this.resetaLinha(aux, -1);

    try {
      const response = await api.get("/equip/default", {
        params: {
          MaqId: this.state.MaqsDisp[i].MaqModId,
        },
      });

      if (response.status === 200) {
        this.setState({
          requisicao: {
            ...this.state.requisicao,
            maquina: this.state.MaqsDisp[i].MaqModelo,
            maqid: this.state.MaqsDisp[i].MaqModId,
            capacidade: this.state.MaqsDisp[i].MaqCapacidade,
          },
          config: aux,
          PadraoMaq: response.data.configPadrao,
          a: true,
        });
        this.handleLimparTabela();
      } else {
        throw Error;
      }
    } catch (err) {
      this.setState({
        requisicao: {
          ...this.state.requisicao,
          maquina: this.state.MaqsDisp[i].MaqModelo,
          maqid: this.state.MaqsDisp[i].MaqModId,
          capacidade: this.state.MaqsDisp[i].MaqCapacidade,
        },
        config: aux,
        PadraoMaq: [],
        a: true,
      });
      Toast("Falha ao buscar configuração padrão da máquina", "error");
    }
  }

  handleSisPagChange(sispag) {
    const checks = document.querySelectorAll('input[type="checkbox"]');
    let achou = false;
    let aux = [];
    aux = [...this.state.config];

    checks[checks.length - 6].checked = false;
    for (let i = checks.length - 5; i < checks.length; i++) {
      checks[i].checked = true;
      checks[i].disabled = true;
    }

    if (sispag === "Validador" || sispag === "Cartão e Validador") {
      this.setState({
        b: false,
        requisicao: {
          ...this.state.requisicao,
          sisPagamento: sispag,
          TValidador: "Moeda",
          validador: ["0.05", "0.10", "0.25", "0.50", "1.00"],
        },
      });
      return;
    } else if (sispag === "Livre") {
      for (let i = 0; i < aux.length; i++) {
        if (Number(aux[i].PrecoMaq) > 0) {
          achou = true;
        }
      }

      if (achou === true) {
        alert(
          "AVISO: Você definiu o sistema de pagamento como livre mas algumas seleções possuem preços configurados."
        );
      }
    }

    this.setState({
      b: true,
      requisicao: {
        ...this.state.requisicao,
        sisPagamento: sispag,
        TValidador: null,
        validador: [],
      },
    });
  }

  handleActivateSwitch(value) {
    const checks = document.querySelectorAll('input[type="checkbox"]');

    //redefino todos os check box para false
    for (let i = checks.length - 5; i < checks.length; i++) {
      if (value === false) {
        checks[i].checked = true;
      } else {
        checks[i].checked = false;
        checks[i].disabled = false;
      }
    }

    this.setState({
      c: value,
      requisicao: {
        ...this.state.requisicao,
        TValidador: value ? "Ficha" : "Moeda",
        validador: value ? [] : ["0.05", "0.10", "0.25", "0.50", "1.00"],
      },
    });

    //busco algum valor de configuração que não seja compativel com o tipo de pagamento
    for (let j = 0; j < this.state.config.length; j++) {
      if (
        value === true &&
        !Number.isSafeInteger(Number(this.state.config[j].PrecoMaq))
      ) {
        Toast(
          "Um ou mais preços de bebida não são compativeis com o pagamento por ficha"
        );
        return;
      }
    }
  }

  handleMantValidador(valor) {
    let aux = this.state.requisicao.validador;

    if (aux.indexOf(Number(valor)) >= 0) {
      aux.splice(aux.indexOf(Number(valor)), 1);
    } else {
      aux.push(Number(valor));
    }

    this.setState({
      requisicao: { ...this.state.requisicao, validador: aux.sort() },
    });
  }

  handleAdicionaBebida(linha, arrayBebidas, tr) {
    let aux = [];
    aux = [...this.state.config];

    if (aux[linha].Bebida !== null) {
      //redefino os campos da linha
      tr.children[1].children[0].selectedIndex = 0;
      tr.children[2].children[0].checked = false;
      tr.children[3].children[1].value = "";
      tr.children[4].children[1].value = "";
      tr.children[5].children[0].selectedIndex = 0;
      this.calcUltSelecao();
    } else {
      this.calcUltSelecao();
    }

    aux[linha] = {
      ...this.state.BebidasDisp[arrayBebidas],
      Selecao: Number(this.state.ultimaSelecao),
    };

    this.setState({ config: aux });
    this.checaBebida(linha);
  }

  handleSelectMedida(linha, config, valor) {
    let aux = [];
    aux = [...this.state.config];

    aux[linha].Qtd_Def = config.Qtd[valor];
    aux[linha].Medida_Def = config.Medida[valor];

    this.setState({ config: aux });
    this.checaBebida(linha);
  }

  handleAtivaConfig(linha, ativa) {
    let aux = [];
    aux = [...this.state.config];

    aux[linha].configura = ativa;

    this.setState({ config: aux });
    this.checaBebida(linha);
  }

  handleSelectSelecao(linha, valor, event) {
    let aux = [];
    aux = [...this.state.config];
    let existe = false;

    if (isNaN(Number(valor))) {
      Toast("Insira número entre 1 e 99");
      event.target.value = aux[linha].Selecao;
      return;
    } else if (!Number.isSafeInteger(Number(valor))) {
      Toast("Insira um número inteiro para a seleção");
      event.target.value = aux[linha].Selecao;
      return;
    }

    if (valor > this.state.requisicao.capacidade) {
      event.target.value = this.state.ultimaSelecao;
      Toast(`Insira um número entre 1 e ${this.state.requisicao.capacidade}`);
      return;
    }

    if (valor === "") return;

    aux.map((bebida) => {
      if (bebida.Selecao === Number(valor)) existe = true;
      return null;
    });

    if (existe === false) {
      aux[linha].Selecao = valor;
    } else {
      Toast("Esse numero já foi usado para seleção");
      event.target.value = "";
    }

    this.setState({ config: aux });
    this.checaBebida(linha);
  }

  handleDefineTipo(linha, tipo) {
    let aux = [];
    aux = [...this.state.config];

    aux[linha].TProd = tipo;

    this.setState({ config: aux });
    this.checaBebida(linha);
  }

  handleDefinePreço(linha, valor, event) {
    let aux = [];
    aux = [...this.state.config];

    if (
      this.state.requisicao.sisPagamento === "Livre" &&
      !isNaN(Number(valor.replace(/,/g, "."))) &&
      Number(valor.replace(/,/g, ".")) !== 0 &&
      Number(valor.replace(/,/g, ".")) !== ""
    ) {
      Toast("Você definiu o sistema de pagamento como Livre");
    }

    if (this.state.requisicao.sisPagamento === null) {
      Toast("Você ainda não escolheu um sistema de pegamento");
    }

    //testes do validador
    if (
      this.state.requisicao.sisPagamento === "Validador" &&
      this.state.requisicao.TValidador === "Ficha" &&
      Number.isSafeInteger(Number(valor.replace(/,/g, ".")))
    ) {
      aux[linha].PrecoMaq = valor;

      this.setState({ config: aux });
      this.checaBebida(linha);
    } else if (
      this.state.requisicao.sisPagamento === "Validador" &&
      this.state.requisicao.TValidador === "Ficha" &&
      !Number.isSafeInteger(Number(valor.replace(/,/g, ".")))
    ) {
      Toast(
        "O pagamento por fichas no validador só trabalha com numeros inteiros"
      );
      event.target.value = aux[linha].PrecoMaq;
    } else if (
      isNaN(Number(valor.replace(/,/g, "."))) &&
      valor.replace(/,/g, ".") !== ""
    ) {
      Toast("Use apenas caractéres numéricos");
      event.target.value = aux[linha].PrecoMaq;
      return;
    } else if (valor.replace(/,/g, ".") === "") {
      event.target.value = aux[linha].PrecoMaq;
    } else {
      aux[linha].PrecoMaq = valor.replace(/,/g, ".");
      event.target.value = valor.replace(/,/g, ".");
    }

    this.setState({ config: aux });
    this.checaBebida(linha);
  }

  handleApagaLinha(linha, tr) {
    let aux = [];
    aux = [...this.state.config];
    let sub = 0;

    const TLinha = tr;
    const TBodyLinha = tr.children[0];

    // DAQUI PRA BAIXO É UMA MANIPULAÇÃO F*DIDA DAS LINHAS DA TABELA, CUIDADO

    if (aux.length <= 1 && aux[linha].Bebida === null) {
      //Se tentar retirar uma linha ainda não completa
      aux = this.resetaLinha(aux, -1, true);

      Toast("Esta seleção não está salva, não é possivel apagar");
      if (TLinha.tagName.toLowerCase() === "tr") {
        TLinha.children[0].children[0].selectedIndex = 0;
        TLinha.children[1].children[0].selectedIndex = 0;
        TLinha.children[2].children[0].checked = false;
        TLinha.children[3].children[1].value = "";
        TLinha.children[4].children[1].value = "";
        TLinha.children[5].children[0].selectedIndex = 0;
      } else {
        TBodyLinha.children[0].children[0].selectedIndex = 0;
        TBodyLinha.children[1].children[0].selectedIndex = 0;
        TBodyLinha.children[2].children[0].checked = false;
        TBodyLinha.children[3].children[1].value = "";
        TBodyLinha.children[4].children[1].value = "";
        TBodyLinha.children[5].children[0].selectedIndex = 0;
      }
    } else if (linha === aux.length - 1) {
      //Se tentar retirar a última linha
      sub = aux[linha].Selecao;
      aux = this.resetaLinha(aux, linha);

      if (TLinha.tagName.toLowerCase() === "tr") {
        TLinha.children[0].children[0].selectedIndex = 0;
        TLinha.children[1].children[0].selectedIndex = 0;
        TLinha.children[2].children[0].checked = false;
        TLinha.children[3].children[1].value = "";
        TLinha.children[3].children[1].placeholder = 0;
        TLinha.children[4].children[1].value = "";
        TLinha.children[5].children[0].selectedIndex = 0;
      } else {
        TLinha.children[linha].children[0].children[0].selectedIndex = 0;
        TLinha.children[linha].children[1].children[0].selectedIndex = 0;
        TLinha.children[linha].children[2].children[0].checked = false;
        TLinha.children[linha].children[3].children[1].value = "";
        TLinha.children[linha].children[3].children[1].placeholder = 0;
        TLinha.children[linha].children[4].children[1].value = "";
        TLinha.children[linha].children[5].children[0].selectedIndex = 0;
      }
    } else if (aux.length <= 2 && aux[linha].Bebida !== null) {
      //Se tentar retirar a unica linha salva e deixar a não salva
      sub = aux[linha].Selecao;
      aux = this.resetaLinha(aux, linha, true);

      if (TLinha.tagName.toLowerCase() === "tr") {
        TLinha.children[0].children[0].selectedIndex = 0;
        TLinha.children[1].children[0].selectedIndex = 0;
        TLinha.children[2].children[0].checked = false;
        TLinha.children[3].children[1].value = "";
        TLinha.children[4].children[1].value = "";
        TLinha.children[5].children[0].selectedIndex = 0;
      } else {
        TBodyLinha.children[0].children[0].selectedIndex = 0;
        TBodyLinha.children[1].children[0].selectedIndex = 0;
        TBodyLinha.children[2].children[0].checked = false;
        TBodyLinha.children[3].children[1].value = "";
        TBodyLinha.children[4].children[1].value = "";
        TBodyLinha.children[5].children[0].selectedIndex = 0;
      }
    } else {
      //Se tentar retirar um item da lista qualquer

      sub = aux[linha].Selecao;

      aux.splice(linha, 1);
      let tabela = null;

      if (aux[aux.length - 1].Bebida !== null) {
        aux.push({
          Bebida: null,
          Un: "",
          Qtd: [],
          Medida: [],
          configura: null,
          Selecao: 0,
          PrecoMaq: 0,
          TProd: null,
        });
      }

      if (TLinha.tagName.toLowerCase() === "tr") {
        tabela = TLinha.parentElement;
      } else {
        //passo os valores da linha seguinte para a atual
        tabela = TLinha;
      }

      for (let i = linha; i < tabela.children.length; i++) {
        if (typeof tabela.children[i + 1] != "undefined") {
          tabela.children[i].children[0].children[0].selectedIndex =
            tabela.children[i + 1].children[0].children[0].selectedIndex;
          tabela.children[i].children[1].children[0].selectedIndex =
            tabela.children[i + 1].children[1].children[0].selectedIndex;
          tabela.children[i].children[2].children[0].checked =
            tabela.children[i + 1].children[2].children[0].checked;
          tabela.children[i].children[3].children[1].value =
            tabela.children[i + 1].children[3].children[1].value;
          tabela.children[i].children[4].children[1].value =
            tabela.children[i + 1].children[4].children[1].value;
          tabela.children[i].children[5].children[0].value =
            tabela.children[i + 1].children[5].children[0].value;
        } else {
          tabela.children[i].children[0].children[0].selectedIndex = 0;
          tabela.children[i].children[1].children[0].selectedIndex = 0;
          tabela.children[i].children[2].children[0].checked = false;
          tabela.children[i].children[3].children[1].value = "";
          tabela.children[i].children[4].children[1].value = "";
          tabela.children[i].children[5].children[0].selectedIndex = 0;
        }
      }
    }

    this.setState({
      config: aux,
      TotalBebidas: aux.length - 1,
      ultimaSelecao: sub,
    });
  }

  handleDefineDestino(e) {
    let endereco = `${
      this.state.endereços_entrega[e.target.value].Logradouro === null
        ? "NA"
        : this.state.endereços_entrega[e.target.value].Logradouro.trim()
    }, número: ${
      this.state.endereços_entrega[e.target.value].Número === null
        ? "NA"
        : this.state.endereços_entrega[e.target.value].Número.trim()
    }, complemento: ${
      this.state.endereços_entrega[e.target.value].Complemento === null
        ? "NA"
        : this.state.endereços_entrega[e.target.value].Complemento.trim()
    }, bairro: ${
      this.state.endereços_entrega[e.target.value].Bairro === null
        ? "NA"
        : this.state.endereços_entrega[e.target.value].Bairro.trim()
    }, CEP: ${
      this.state.endereços_entrega[e.target.value].CEP === null
        ? "NA"
        : this.state.endereços_entrega[e.target.value].CEP.trim()
    }, ${
      this.state.endereços_entrega[e.target.value].Município === null
        ? "NA"
        : this.state.endereços_entrega[e.target.value].Município.trim()
    }, ${
      this.state.endereços_entrega[e.target.value].UF === null
        ? "NA"
        : this.state.endereços_entrega[e.target.value].UF.trim()
    }`;
    this.setState({
      requisicao: {
        ...this.state.requisicao,
        destino: endereco,
        CNPJ_Destino: this.state.endereços_entrega[e.target.value].CNPJss,
        Cliente_Destino: this.state.endereços_entrega[e.target.value]
          .Nome_Fantasia,
      },
    });
    const inputs = document.getElementById("enderecoEdit");
    inputs.value = endereco;
    inputs.disabled = false;
  }

  handleAplicaPadrao() {
    let aux = [];
    let Nomes = [];
    let Bebidas = [];
    let Medidas = [];

    let tbody = document.querySelectorAll("table")[1]
      ? document.querySelectorAll("table")[1].children[1]
      : document.querySelectorAll("table")[0].children[1];

    if (this.state.PadraoMaq.length === 0) {
      return true;
    }

    this.setState({
      config: [...this.state.PadraoMaq],
      TotalBebidas: this.state.PadraoMaq.length,
    });

    aux = [...this.state.PadraoMaq];

    //crio um array só com o nome das bebidas para buscar a posição delas com mais facilidade
    this.state.BebidasDisp.map((bebida) => {
      Nomes.push(bebida.Bebida);
      return null;
    });

    //busco a posição das bebidas
    for (let i = 0; i < aux.length; i++) {
      Bebidas.push(Nomes.indexOf(aux[i].Bebida));
    }

    //busco as posições da Qtd e medida
    for (let i = 0; i < aux.length; i++) {
      for (let j = 1; j < this.state.BebidasDisp.length; j++) {
        for (let k = 0; k < this.state.BebidasDisp[j].Medida.length; k++) {
          if (
            this.state.BebidasDisp[j].Bebida === aux[i].Bebida &&
            this.state.BebidasDisp[j].Medida[k] === aux[i].Medida_Def
          ) {
            Medidas.push(this.state.BebidasDisp[j].Qtd.indexOf(aux[i].Qtd_Def));
            k = this.state.BebidasDisp[j].Medida.length - 1;
          }
        }
      }
    }

    setTimeout(() => this.acertaSelect(tbody, aux, Bebidas, Medidas), 100);
  }

  acertaSelect(table, aux, Bebidas, Medidas) {
    //defino o index dos select e valores de outros campos
    for (let i = 0; i < aux.length; i++) {
      if (typeof table.children[i] != "undefined") {
        table.children[i].children[0].children[0].selectedIndex =
          Bebidas[i] + 1;
        table.children[i].children[1].children[0].selectedIndex =
          Medidas[i] + 1;
        table.children[i].children[2].children[0].checked = true;
        table.children[i].children[3].children[1].value = aux[i].Selecao;
        table.children[i].children[3].children[1].placeholder = 0;
        table.children[i].children[4].children[1].value = 0;
        table.children[i].children[4].children[1].placeholder = 0;
        table.children[i].children[5].children[0].value = aux[i].TProd;
      }
    }
  }

  handleLimparTabela() {
    let tbody = document.querySelectorAll("table")[1]
      ? document.querySelectorAll("table")[1].children[1]
      : document.querySelectorAll("table")[0].children[1];

    tbody.children[0].children[0].children[0].selectedIndex = 0;
    tbody.children[0].children[1].children[0].selectedIndex = 0;
    tbody.children[0].children[2].children[0].checked = false;
    tbody.children[0].children[3].children[1].value = "";
    tbody.children[0].children[3].children[1].placeholder = this.state.ultimaSelecao;
    tbody.children[0].children[4].children[1].value = "";
    tbody.children[0].children[4].children[1].placeholder = 0;
    tbody.children[0].children[5].children[0].selectedIndex = 0;

    this.setState({
      config: [
        {
          Bebida: null,
          Un: "",
          Qtd: [],
          Medida: [],
          configura: null,
          Selecao: 0,
          PrecoMaq: 0,
          TProd: null,
        },
      ],
      TotalBebidas: 0,
      ultimaSelecao: 1,
    });
  }

  calcUltSelecao() {
    let aux = [];
    aux = [...this.state.config];

    let arrayDeSeleções = [];
    let SeleçõesRestantes = [];

    //faço um array com todas as seleções já escolhidas
    for (let j = 0; j < aux.length; j++) {
      arrayDeSeleções.push(Number(aux[j].Selecao));
    }

    if (SeleçõesRestantes.length === 0 && arrayDeSeleções[0] === 0) {
      //se a seleção for 0(inicio da tela) redefine para 1
      this.setState({ ultimaSelecao: 1 });
    } else if (
      //se só tiver uma seleção e ela for 1 define a proxima para 2
      SeleçõesRestantes.length === 0 &&
      arrayDeSeleções.length === 1 &&
      arrayDeSeleções[0] === 1
    ) {
      this.setState({ ultimaSelecao: 2 });
    } else {
      //calcula a proxima seleção com base nas que ainda não foram escolhidas
      for (let i = 1; i <= arrayDeSeleções.length + 1; i++) {
        if (arrayDeSeleções.indexOf(i) === -1) {
          SeleçõesRestantes.push(i);
        }
      }
      this.setState({ ultimaSelecao: SeleçõesRestantes[0] });
    }
  }

  checaBebida(linha) {
    let aux = [...this.state.config];
    let b = 0;

    //Primeiramente testo se não tem nada faltando na linha atual
    if (!aux[linha]) return;
    if (aux[linha].Bebida === null) return;
    if (
      !aux[linha].Qtd_Def ||
      aux[linha].Qtd_Def === "" ||
      aux[linha].Qtd_Def === null
    )
      return;
    if (
      aux[linha].Selecao === 0 ||
      aux[linha].Selecao === "" ||
      aux[linha].Selecao === null
    )
      return;
    if (aux[linha].TProd === null) return;

    //Limpo qualquer indice null do array(acredite, acontecia)
    for (let i = 0; i < aux.length; i++) {
      if (aux[i].Bebida === null) aux.splice(i, 1);
    }

    //Se uma linha nova tentar ser criada sem outra finalizar o preenchimento(acredite, acontecia tambem)
    for (let i = 0; i < aux.length; i++) {
      if (!aux[i]) return;
      if (aux[i].Bebida === null) return;
      if (!aux[i].Qtd_Def || aux[i].Qtd_Def === "" || aux[i].Qtd_Def === null)
        return;
      if (
        aux[i].Selecao === 0 ||
        aux[i].Selecao === "" ||
        aux[i].Selecao === null
      )
        return;
      if (aux[i].TProd === null) return;
    }

    //conto quantas bebidas já estão na máquina
    this.state.config.map((beb) => {
      if (beb.Bebida !== null) b++;
      return null;
    });

    //se já tiver atingido a capacidade maxima
    if (b >= this.state.requisicao.capacidade) {
      Toast("Capacidade máxima da máquina atingida");
      this.setState({ config: aux, TotalBebidas: aux.length });
      return;
    }

    this.calcUltSelecao();
    this.setState({
      config: this.resetaLinha(aux, -1),
      TotalBebidas: aux.length - 1,
    });
  }

  resetaLinha(aux, linha, sobrescreve = false) {
    if (linha >= 0) {
      aux.splice(linha, 1);
    }

    if (sobrescreve) {
      return (aux = [
        {
          Bebida: null,
          Un: "",
          Qtd: [],
          Medida: [],
          configura: null,
          Selecao: this.state.ultimaSelecao,
          PrecoMaq: 0,
          TProd: null,
        },
      ]);
    } else {
      aux.push({
        Bebida: null,
        Un: "",
        Qtd: [],
        Medida: [],
        configura: null,
        Selecao: 0,
        PrecoMaq: 0,
        TProd: null,
      });
      return aux;
    }
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
                    actions={[
                      <div
                        className="XAlign"
                        style={{
                          justifyContent: "flex-end",
                          width: "100%",
                        }}
                      >
                        <Button
                          style={{ marginRight: "10px", marginLeft: "10px" }}
                          onClick={() => {
                            if (this.handleAplicaPadrao()) {
                              Toast(
                                "Essa máquina ainda não possui nenhuma configuração padrão registrada"
                              );
                            }
                          }}
                        >
                          <Icon left>art_track</Icon>
                          PADRÃO
                        </Button>
                        <Button
                          style={{ marginRight: "10px" }}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Limpar toda a configuração atual? "
                              )
                            ) {
                              this.handleLimparTabela();
                            }
                          }}
                        >
                          <Icon left>clear</Icon>
                          Limpar
                        </Button>

                        <Rotulo style={{ marginTop: "0px" }}>
                          Sistema de Pagamento:
                        </Rotulo>
                        <select
                          style={{ maxWidth: "20vw", marginRight: "10px" }}
                          className="DefaultSelect"
                          required
                          onChange={(e) =>
                            this.handleSisPagChange(e.target.value)
                          }
                        >
                          <option selected hidden disabled value={null}>
                            Selecione...
                          </option>
                          <option value="Livre">Livre</option>
                          <option value="Cartão">Cartão</option>
                          <option value="Validador">Validador</option>
                          <option value="Cartão e Validador">
                            Cartão e Validador
                          </option>
                        </select>
                        <Button
                          className="modal-trigger"
                          href="#valida"
                          node="button"
                          disabled={this.state.b}
                          style={{ marginRight: "10px" }}
                        >
                          Det. Validador<Icon left>settings</Icon>
                        </Button>
                        <CloseButton />
                      </div>,
                    ]}
                    bottomSheet={false}
                    fixedFooter={true}
                    header={`Bebidas (${this.state.TotalBebidas} Selecionadas)`}
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
                            <th>Produto Tipo</th>
                            <th>Excluir</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.config.map((config, i) => (
                            <tr>
                              <td>
                                <select
                                  className="DefaultSelect"
                                  onChange={(e) => {
                                    e.persist();
                                    this.handleAdicionaBebida(
                                      i,
                                      e.target.value,
                                      e.target.parentElement.parentElement
                                    );
                                  }}
                                >
                                  <option selected hidden disabled value={null}>
                                    Selecione...
                                  </option>
                                  {this.state.BebidasDisp.map((bebida, i) => (
                                    <option value={i}>{bebida.Bebida}</option>
                                  ))}
                                  ))
                                </select>
                              </td>
                              <td>
                                <select
                                  defaultValue={this.state.config[i].Qtd_Def}
                                  style={{ width: "20vw" }}
                                  disabled={
                                    this.state.config[i].Bebida === null
                                      ? true
                                      : false
                                  }
                                  className="DefaultSelect"
                                  onChange={(e) =>
                                    this.handleSelectMedida(
                                      i,
                                      config,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option selected hidden disabled value={null}>
                                    Selecione...
                                  </option>
                                  {this.state.config[i].Qtd.map(
                                    (quantidade, j) => (
                                      <option value={j}>
                                        {`${quantidade} ${config.Un} ${
                                          config.Medida[j]
                                            ? config.Medida[j]
                                            : ""
                                        }`}
                                      </option>
                                    )
                                  )}
                                  ))
                                </select>
                              </td>
                              <td>
                                <input
                                  checked={config.configura}
                                  disabled={
                                    this.state.config[i].Bebida === null
                                      ? true
                                      : false
                                  }
                                  style={{ position: "relative", zIndex: "0" }}
                                  type="checkbox"
                                  onChange={(e) =>
                                    this.handleAtivaConfig(i, e.target.checked)
                                  }
                                />
                              </td>
                              <td>
                                <Icon small left>
                                  dialpad
                                </Icon>
                                <input
                                  disabled={
                                    this.state.config[i].Bebida === null
                                      ? true
                                      : false
                                  }
                                  type="text"
                                  placeholder={this.state.config[i].Selecao}
                                  style={{ width: "20px", textAlign: "center" }}
                                  onBlur={(e) => {
                                    e.persist();
                                    this.handleSelectSelecao(
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
                                  disabled={
                                    this.state.config[i].Bebida === null
                                      ? true
                                      : false
                                  }
                                  type="text"
                                  placeholder={this.state.config[i].PrecoMaq}
                                  style={{ width: "40px", textAlign: "center" }}
                                  onBlur={(e) => {
                                    e.persist();
                                    this.handleDefinePreço(
                                      i,
                                      e.target.value,
                                      e
                                    );
                                  }}
                                />
                              </td>
                              <td>
                                <select
                                  disabled={
                                    this.state.config[i].Bebida === null
                                      ? true
                                      : false
                                  }
                                  className="DefaultSelect"
                                  onChange={(e) =>
                                    this.handleDefineTipo(i, e.target.value)
                                  }
                                >
                                  <option selected hidden disabled value={null}>
                                    Selecione...
                                  </option>
                                  {config.Mistura ? (
                                    <option>Mistura</option>
                                  ) : null}
                                  {config.Pronto ? (
                                    <option>Pronto</option>
                                  ) : null}
                                  {config.Bebida === "DESATIVADO" ? (
                                    <option>DESATIVADO</option>
                                  ) : null}
                                  ))
                                </select>
                              </td>
                              <td>
                                <Button
                                  onClick={(e) => {
                                    this.handleApagaLinha(
                                      i,
                                      e.target.parentElement.parentElement
                                        .parentElement
                                    );
                                  }}
                                >
                                  <Icon center small>
                                    cancel
                                  </Icon>
                                </Button>
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
                </select>

                <Rotulo>Antena externa: </Rotulo>
                <select
                  className="DefaultSelect"
                  onChange={(e) =>
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        ExtAnt: e.target.value,
                      },
                    })
                  }
                >
                  <option selected hidden disabled value={null}>
                    Selecione...
                  </option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
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
                  onChange={(e) => this.handleDefineDestino(e)}
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
                <input
                  id="enderecoEdit"
                  disabled={true}
                  type="text"
                  onChange={(e) => {
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        destino: e.target.value,
                      },
                    });
                  }}
                  style={{ width: "20vw" }}
                />
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
                <Rotulo>Contato para entrega: </Rotulo>
                <TextInput
                  icon={<Icon>person</Icon>}
                  placeholder="Informe um contato..."
                  onChange={(e) =>
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        Contato: e.target.value,
                      },
                    })
                  }
                />
                <Rotulo style={{ marginTop: "0px" }}>
                  Email para acompanhamento:{" "}
                </Rotulo>
                <TextInput
                  email
                  error="email inválido"
                  icon={<Icon>email</Icon>}
                  success="OK!"
                  placeholder="Informe um email válido..."
                  onChange={(e) =>
                    this.setState({
                      requisicao: {
                        ...this.state.requisicao,
                        EmailA: e.target.value,
                      },
                    })
                  }
                />
                <Rotulo style={{ marginTop: "0px" }}>
                  Telefone para Contato:{" "}
                </Rotulo>
                <TextInput
                  icon={<Icon>contact_phone</Icon>}
                  placeholder="(12) 34567-8910"
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
                  placeholder="Deixe uma observação..."
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
          <Modal
            actions={[<CloseButton />]}
            bottomSheet={false}
            fixedFooter={false}
            header="Detalhes do Sistema de Pagamento"
            id="valida"
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
                  onChange={(e) => this.handleMantValidador(e.target.value)}
                  type="checkbox"
                  value="1"
                />
                <Rotulo>Ficha de 1</Rotulo>
                <br />
                <input
                  onChange={(e) => this.handleMantValidador(e.target.value)}
                  type="checkbox"
                  value="2"
                />
                <Rotulo>Ficha de 2</Rotulo>
                <br />
                <input
                  onChange={(e) => this.handleMantValidador(e.target.value)}
                  type="checkbox"
                  value="3"
                />
                <Rotulo>Ficha de 3</Rotulo>
                <br />
                <input
                  onChange={(e) => this.handleMantValidador(e.target.value)}
                  type="checkbox"
                  value="5"
                />
                <Rotulo>Ficha de 5</Rotulo>
                <br />
                <input
                  onChange={(e) => this.handleMantValidador(e.target.value)}
                  type="checkbox"
                  value="7"
                />
                <Rotulo>Ficha de 7</Rotulo>
              </>
            ) : (
              <>
                <br />
                <input disabled={true} type="checkbox" value="0.05" />
                <Rotulo>R$ 0,05</Rotulo>
                <br />
                <input disabled={true} type="checkbox" value="0.10" />
                <Rotulo>R$ 0,10</Rotulo>
                <br />
                <input disabled={true} type="checkbox" value="0.25" />
                <Rotulo>R$ 0,25</Rotulo>
                <br />
                <input disabled={true} type="checkbox" value="0.50" />
                <Rotulo>R$ 0,50</Rotulo>
                <br />
                <input disabled={true} type="checkbox" value="1.00" />
                <Rotulo>R$ 1,00</Rotulo>
              </>
            )}
          </Modal>
        </div>
      </>
    );
  }
}
