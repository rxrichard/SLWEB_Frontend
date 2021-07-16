import React from "react";
import { connect } from "react-redux";
import { api } from "../../services/api";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";

import Requisicao from "./solicitacao/_Maquina";
import Detalhes from "./solicitacao/_Detalhes";
import Entrega from "./solicitacao/_Entrega";
import { Toast } from "../../components/toasty";
import { RED_SECONDARY } from "../../components/colors";

function VerticalLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [desativar, setDesativar] = React.useState(false);
  const steps = getSteps();
  const [open, setOpen] = React.useState(false);

  const { Maquina } = props.State;

  const Solicitacao = {
    MaquinaId: props.State.MaquinaId,
    Maquina: props.State.Maquina,
    Contenedor: props.State.Contenedor,
    Configuracao: props.State.Configuracao,
    Pagamento: props.State.Pagamento,
    Validador: props.State.Validador,
    TipoValidador: props.State.TipoValidador,
    InibirCopos: props.State.InibirCopos,
    Corporativa: props.State.Corporativa,
    Gabinete: props.State.Gabinete,
    Abastecimento: props.State.Abastecimento,
    Chip: props.State.Chip,
    AntExt: props.State.AntExt,
    Cliente_Destino: props.State.Cliente_Destino,
    CNPJ_Destino: props.State.CNPJ_Destino,
    Endereço_Entrega: props.State.Endereço_Entrega,
    Data_Entrega_Desejada: props.State.Data_Entrega_Desejada,
    Contato: props.State.Contato,
    Email_Acompanhamento: props.State.Email_Acompanhamento,
    Telefone_Contato: props.State.Telefone_Contato,
    Observacao: props.State.Observacao,
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel className={classes.Circle}>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.buttonWhite}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.buttonTheme}
                  >
                    {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
                  </Button>
                </div>
              </div>
              <Fab
                className={classes.fab}
                color="primary"
                onClick={handleClickOpen}
              >
                ?
              </Fab>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle
                  style={{ cursor: "move" }}
                  id="draggable-dialog-title"
                >
                  Ajuda
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {wichHelpShow(activeStep, Maquina)}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Fechar
                  </Button>
                </DialogActions>
              </Dialog>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Pronto para validar e enviar a solicitação!</Typography>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.buttonWhite}
          >
            Anterior
          </Button>
          <Button
            disabled={desativar}
            onClick={(e) => handleSubmit(Solicitacao, setDesativar)}
            className={classes.altButton}
            endIcon={<Icon>send</Icon>}
          >
            {desativar ? "Validando..." : "Solicitar"}
          </Button>
        </Paper>
      )}
    </div>
  );
}

const mapStateToProps = (store) => ({
  State: store.solicitacaoState,
});

export default connect(mapStateToProps)(VerticalLinearStepper);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  buttonTheme: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: RED_SECONDARY,

    "&:hover": {
      backgroundColor: RED_SECONDARY,
    },
  },
  buttonWhite: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: "#FFFFFF",
  },
  altButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: "#FFFFFF",
    backgroundColor: RED_SECONDARY,
    "&:hover": {
      backgroundColor: RED_SECONDARY,
    },
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  Circle: {
    "& > span svg circle": {
      color: RED_SECONDARY,
    },
    "& > span svg path": {
      color: RED_SECONDARY,
    },
  },
}));

function getSteps() {
  return ["Máquina e Configuração", "Detalhes", "Entrega"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Requisicao />;
    case 1:
      return <Detalhes />;
    case 2:
      return <Entrega />;
    default:
      return "Unknown step";
  }
}

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const wichHelpShow = (step, Maquina) => {
  switch (step) {
    case 0:
      return (
        <ul>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Máquina:</strong> Cada modelo de máquina possui uma
              capacidade de bebidas, copos e contenedores para guardar os
              insumos.
            </div>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Sem Pagamento:</strong> A máquina não acompanhará nenhum sistema de pagamento.
              <br />
              <strong>Pagamento por cartão:</strong> Esse sistema de pagamento
              acompanha uma máquina de cartões digital.
              <br />
              <strong>Pagamento por validador:</strong> O validador pode ser
              configurado para aceitar moedas, fichas ou ambos simultaneamente.
            </div>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Valor Real:</strong> Preço que deve ser cobrado pela dose
              na máquina, definir esse valor como R$ 0 torna a bebida livre.
              <br />
              <strong>Valor Complementar(Não obrigatório):</strong> Preço que deve
              ser pago pelo cliente ao franqueado por dose.
            </div>
          </li>
        </ul>
      );
    case 1:
      return (
        <ul>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Máquina Corporativa:</strong> A máquina corporativa usa
              menos insumo na composição da dose.
            </div>
          </li>
          {Maquina !== "LEI SA" && Maquina !== "" ? (
            <li style={{ marginBottom: "10px" }}>
              <div>
                <strong>Inibir copos:</strong> Algumas máquinas podem inibir o
                copo durante a produção da dose, um recepiente deve ser
                fornecido externamente pelo consumidor.
              </div>
            </li>
          ) : (
            ""
          )}

          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Acompanha gabinete:</strong> Marque se a máquina vai
              precisar de um gabinete para ser instalada no cliente.
            </div>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Abastecimento hídrico:</strong> Por qual fonte a máquina
              deve receber água.
            </div>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Chip de telemetria:</strong> Qual Chip seria conveniente
              acompanhar o aparelho de telemetria(baseado na intencidade do
              sinal de operadoras no local de instalação da máquina).
            </div>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Antena externa:</strong> Caso o sinal das operadoras de
              Chip seja muito fraco na região você pode solicitar uma antena
              exterior à máquina para ajudar na comunicação com a internet.
            </div>
          </li>
        </ul>
      );
    case 2:
      return (
        <ul>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Cliente:</strong> Informe qual cliente receberá a máquina,
              caso ele não esteja cadastrado ainda no SLAplic você pode
              selecionar à sí proprio e alterar o endereço de entrega.
            </div>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Endereço:</strong> Preenchido automaticamente baseado no
              cliente selecionado mas pode ser alterado, a máquina será enviada
              para esse endereço.
            </div>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Data de entrega desejada:</strong> À partir da data
              mínima, selecione uma data conveniente para a entrega.
            </div>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Contato:</strong> Com quem se deve entrar em contato para
              fazer a entrega no cliente.
            </div>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Email:</strong> Email para acompanhamento da produção e
              entrega da máquina.
            </div>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Telefone:</strong> Telefone para entrar em contato durante
              a entrega da máquina.
            </div>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <div>
              <strong>Observações:</strong> Qualquer detalher adicional à ser
              informado para a equipe técnica ou transporte.
            </div>
          </li>
        </ul>
      );
    default:
      return "Ajuda não encontrada para esse passo";
  }
};

const handleSubmit = async (Solicitacao, setDesativar) => {
  setDesativar(true);

  if (Solicitacao.Maquina === "") {
    Toast("Escolha um modelo de máquina");
    setDesativar(false);
    return;
  }

  if (Solicitacao.Pagamento === "") {
    Toast("Selecione o meio de pagamento para a máquina");
    setDesativar(false);
    return;
  }

  if (
    (Solicitacao.Pagamento === "Validador" ||
      Solicitacao.Pagamento === "Cartão e Validador") &&
    Solicitacao.TipoValidador === "Ficha" &&
    Solicitacao.Validador.length === 0
  ) {
    Toast("Especifique que fichas o validador deve acompanhar");
    setDesativar(false);
    return;
  }

  if (Solicitacao.Configuracao.length < 1) {
    Toast("Selecione pelo menos uma bebida para a máquina");
    setDesativar(false);
    return;
  }

  if (Solicitacao.Corporativa === "") {
    Toast("Especifique se a máquina é corporativa");
    setDesativar(false);
    return;
  }

  if (Solicitacao.Gabinete === "") {
    Toast("Selecione se deseja um gabinete acompanhando a máquina");
    setDesativar(false);
    return;
  }

  if (Solicitacao.Abastecimento === "") {
    Toast("Selecione o sistema de abastecimento hídrico");
    setDesativar(false);
    return;
  }

  // Verificação desativada por solicitação do Alberto
  // if (Solicitacao.Chip === "") {
  //   Toast(
  //     "Informe qual chip de operadora deve acompanhar a telemetria da máquina"
  //   );
  //   setDesativar(false);
  //   return;
  // }

  if (Solicitacao.AntExt === "") {
    Toast("Informe se o a máquina deve acompanhar uma antena externa");
    setDesativar(false);
    return;
  }

  if (Solicitacao.Cliente_Destino === "") {
    Toast("Informe qual cliente receberá a máquina");
    setDesativar(false);
    return;
  }

  if (Solicitacao.Endereço_Entrega === "") {
    Toast("O endereço de entrega não pode estar vazio");
    setDesativar(false);
    return;
  }

  if (Solicitacao.Data_Entrega_Desejada === "") {
    Toast("Preencha uma data conveniente para entrega");
    setDesativar(false);
    return;
  }

  if (Solicitacao.Contato === "") {
    Toast("Informe o nome do contato para acompanhar a entrega da máquina");
    setDesativar(false);
    return false;
  }

  if (Solicitacao.Email_Acompanhamento === "") {
    Toast("Preencha um email para receber atualizações sobre o pedido");
    setDesativar(false);
    return;
  }

  if (Solicitacao.Telefone_Contato === "") {
    Toast(
      "Informe o número de telefone do contato que acompanhará a entrega da máquina"
    );
    setDesativar(false);
    return;
  }

  try {
    Toast("...Aguarde");
    const response = await api.post("/equip", {
      Solicitacao,
    });

    if (response.status === 201) {
      Toast("Solicitação registrada com sucesso", "success");
      alert(
        'Solicitação registrada com sucesso, por favor verifique o PDF gerado que pode ser encontrado no seu email ou na aba "Solicitações" desta mesma tela. Se encontrar qualquer inconformidade no PDF do pedido, por favor entre em contato imediatamente com helpdesk@slaplic.com.br'
      );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      return;
    } else {
      throw Error;
    }
  } catch (err) {
    Toast("Falha ao concluir solicitação, por favor tente novamente", "error");
    setDesativar(false);
    return;
  }
};
