import {
  LOAD_ATIVOS_DISPONIVEIS,
  LOAD_BEBIDAS_DISPONIVEIS,
  LOAD_CLIENTES_ENDERECOS,
  LOAD_CONFIGURACOES_PADRAO,
  LOAD_MIN_DDL_PARA_ENVIO,
  CHANGE_MAQUINA,
  CHANGE_PAG_TIPO,
  CHANGE_VALIDADOR_TIPO,
  CHANGE_VALIDADOR_FICHAS,
  CLICK_ADD_BEBIDA,
  CLICK_REMOVE_BEBIDA,
  CLEAR_CONFIG,
  CHANGE_MAQUINA_CORPORATIVA,
  CHOOSE_INIBIR_COPOS,
  CHOOSE_ACOMPANHA_GABINETE,
  CHOOSE_ABASTECIMENTO_HIDRICO,
  CHOOSE_CHIP_TELEMETRIA,
  CHOOSE_ANTENA_EXTERNA,
  CHOOSE_CLIENTE,
  CHANGE_ENDERECO,
  DATA_ENTREGA_DESEJADA,
  CHOOSE_CONTATO,
  CHOOSE_TELEFONE_CONTATO,
  CHOOSE_EMAIL_ACOMPANHAMENTO,
  SET_OBSERVACAO,
} from "../actions/SolicitacaoActionTypes";

const initialState = {
  AtivosDisponiveis: [],
  BebidasDisponiveis: [],
  ClientesEnderecos: [],
  ConfiguracoesPadrao: [],
  MinDDLEnvio: 0,

  MaquinaId: "",
  Maquina: "",
  PermiteGab: false,
  Capacidade: 0,
  MaxContenedores: 0,

  Contenedor: [],
  Configuracao: [],
  Pagamento: "",
  Validador: [],
  TipoValidador: null,

  InibirCopos: "",
  Corporativa: "",
  Gabinete: "",
  Abastecimento: "",
  Chip: "",
  AntExt: "",

  Cliente_Destino: "",
  CNPJ_Destino: "",
  Endereço_Entrega: "",
  Data_Entrega_Desejada: "",
  Contato: "",
  Email_Acompanhamento: "",
  Telefone_Contato: "",
  Observacao: "",
};

export const SolicitacaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ATIVOS_DISPONIVEIS:
      return {
        ...state,
        AtivosDisponiveis: action.Ativos,
      };
    case LOAD_BEBIDAS_DISPONIVEIS:
      return {
        ...state,
        BebidasDisponiveis: action.Bebidas,
      };
    case LOAD_CLIENTES_ENDERECOS:
      return {
        ...state,
        ClientesEnderecos: action.CliEnd,
      };
    case LOAD_CONFIGURACOES_PADRAO:
      return {
        ...state,
        ConfiguracoesPadrao: action.ConfigPadrao,
      };
    case LOAD_MIN_DDL_PARA_ENVIO:
      return {
        ...state,
        MinDDLEnvio: action.DDL,
      };

    case CHANGE_MAQUINA:
      return {
        ...state,
        MaquinaId: action.MaquinaSelecionada.MaqModId,
        Maquina: action.MaquinaSelecionada.MaqModelo,
        PermiteGab: action.MaquinaSelecionada.PerGab,
        Capacidade: action.MaquinaSelecionada.MaqCapacidade,
        MaxContenedores: action.MaquinaSelecionada.Contenedores,
      };

    case CLICK_ADD_BEBIDA:
      let novoContenedor = null;
      if (action.Configuracao.bebida === "ÁGUA QUENTE") {
        novoContenedor = [...state.Contenedor];
      } else if (action.Configuracao.tipo === "Mistura") {
        novoContenedor = [...state.Contenedor].concat(
          JSON.parse(
            "[" +
              String(action.Configuracao.contenedor).replace(/0/g, ",") +
              "]"
          )
        );
        novoContenedor = [
          ...new Set([
            ...state.Contenedor,
            ...JSON.parse(
              "[" +
                String(action.Configuracao.contenedor).replace(/0/g, ",") +
                "]"
            ),
          ]),
        ];
      } else if (state.Contenedor.indexOf(action.Configuracao.contenedor) < 0) {
        novoContenedor = [...state.Contenedor];
        novoContenedor.push(action.Configuracao.contenedor);
      } else {
        novoContenedor = [...state.Contenedor];
      }
      return {
        ...state,
        Contenedor: novoContenedor,
        Configuracao: [...state.Configuracao, action.Configuracao],
      };
    case CLICK_REMOVE_BEBIDA:
      const removedBebida = state.Configuracao[action.index];
      const removedBebidaCont =
        removedBebida.tipo === "Mistura"
          ? JSON.parse(
              "[" + String(removedBebida.contenedor).replace(/0/g, ",") + "]"
            )
          : removedBebida.contenedor;
      let contenedoresNecessariosRestantes = [];
      // let state.Contenedor = [...state.Contenedor]

      state.Configuracao.splice(action.index, 1);

      state.Configuracao.map((config) => {
        if (config.tipo === null) {
          return null;
        } else if (config.tipo === "Mistura") {
          contenedoresNecessariosRestantes = [
            ...contenedoresNecessariosRestantes,
          ].concat(
            JSON.parse("[" + String(config.contenedor).replace(/0/g, ",") + "]")
          );
          contenedoresNecessariosRestantes = [
            ...new Set([
              ...contenedoresNecessariosRestantes,
              ...JSON.parse(
                "[" + String(config.contenedor).replace(/0/g, ",") + "]"
              ),
            ]),
          ];
          return null;
        } else if (
          contenedoresNecessariosRestantes.indexOf(config.contenedor) < 0
        ) {
          contenedoresNecessariosRestantes.push(config.contenedor);
          return null;
        } else {
          return null;
        }
      });

      if (Array.isArray(removedBebidaCont)) {
        removedBebidaCont.map((rem) => {
          if (contenedoresNecessariosRestantes.indexOf(rem) < 0) {
            state.Contenedor.splice(state.Contenedor.indexOf(rem), 1);
          }
          return null;
        });
      } else {
        if (
          contenedoresNecessariosRestantes.indexOf(removedBebidaCont) < 0 &&
          removedBebida.bebida !== "ÁGUA QUENTE"
        ) {
          state.Contenedor.splice(
            state.Contenedor.indexOf(removedBebidaCont),
            1
          );
        }
      }

      return {
        ...state,
        Contenedor: [...state.Contenedor],
        Configuracao: [...state.Configuracao],
      };

    case CHANGE_PAG_TIPO:
      return {
        ...state,
        Pagamento: action.PagType,
        TipoValidador:
          action.PagType === "Validador" ||
          action.PagType === "Cartão e Validador"
            ? "Moeda"
            : null,
        Validador: action.PagType === "Validador" ||
        action.PagType === "Cartão e Validador" ? ["0.05", "0.10", "0.25", "0.50", "1.00"] : []
      };

    case CHANGE_VALIDADOR_TIPO:
      return {
        ...state,
        TipoValidador: action.TipoValidador,
        Validador: action.TipoValidador === 'Ficha'
          ? []
          : ["0.05", "0.10", "0.25", "0.50", "1.00"],
      };

    case CHANGE_VALIDADOR_FICHAS:
      if (state.Validador.indexOf(action.Ficha) < 0) {
        state.Validador.push(action.Ficha);
      } else {
        state.Validador.splice(state.Validador.indexOf(action.Ficha), 1);
      }

      return {
        ...state,
        Validador: [...state.Validador],
      };

    case CHANGE_MAQUINA_CORPORATIVA:
      return {
        ...state,
        Corporativa: action.Corp,
      };
    case CHOOSE_INIBIR_COPOS:
      return {
        ...state,
        InibirCopos: action.Inib,
      };
    case CHOOSE_ACOMPANHA_GABINETE:
      return {
        ...state,
        Gabinete: action.Gab,
      };
    case CHOOSE_ABASTECIMENTO_HIDRICO:
      return {
        ...state,
        Abastecimento: action.Agua,
      };
    case CHOOSE_CHIP_TELEMETRIA:
      return {
        ...state,
        Chip: action.Chip,
      };
    case CHOOSE_ANTENA_EXTERNA:
      return {
        ...state,
        AntExt: action.Antena,
      };

    case CHOOSE_CLIENTE:
      return {
        ...state,
        Cliente_Destino: action.Cliente.Nome_Fantasia,
        CNPJ_Destino: action.Cliente.CNPJss,
      };
    case CHANGE_ENDERECO:
      return {
        ...state,
        Endereço_Entrega: action.Endereco,
      };
    case DATA_ENTREGA_DESEJADA:
      return {
        ...state,
        Data_Entrega_Desejada: action.Data,
      };
    case CHOOSE_CONTATO:
      return {
        ...state,
        Contato: action.Contato,
      };
    case CHOOSE_TELEFONE_CONTATO:
      return {
        ...state,
        Telefone_Contato: action.Telefone,
      };
    case CHOOSE_EMAIL_ACOMPANHAMENTO:
      return {
        ...state,
        Email_Acompanhamento: action.Email,
      };
    case SET_OBSERVACAO:
      return {
        ...state,
        Observacao: action.Obs,
      };
    case CLEAR_CONFIG:
      return {
        ...state,
        Configuracao: [],
        Contenedor: [],
      };

    default:
      return state;
  }
};
