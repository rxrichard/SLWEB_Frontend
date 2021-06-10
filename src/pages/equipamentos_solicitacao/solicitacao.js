import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

import Requisicao from "./solicitacao/_Maquina";
import Detalhes from "./solicitacao/_Detalhes";
import Entrega from "./solicitacao/_Entrega";
import { api } from "../../services/api";
import { Toast, ToastyContainer } from "../../components/toasty";

function VerticalLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [desativar, setDesativar] = React.useState(false);
  const steps = getSteps();

  const {
    MaquinaId,
    Maquina,
    Contenedor,
    Configuracao,
    Pagamento,
    Validador,
    TipoValidador,
    InibirCopos,
    Corporativa,
    Gabinete,
    Abastecimento,
    Chip,
    AntExt,
    Cliente_Destino,
    CNPJ_Destino,
    Endereço_Entrega,
    Data_Entrega_Desejada,
    Contato,
    Email_Acompanhamento,
    Telefone_Contato,
    Observacao,
  } = props.State;

  const Solicitacao = {
    MaquinaId,
    Maquina,
    Contenedor,
    Configuracao,
    Pagamento,
    Validador,
    TipoValidador,
    InibirCopos,
    Corporativa,
    Gabinete,
    Abastecimento,
    Chip,
    AntExt,
    Cliente_Destino,
    CNPJ_Destino,
    Endereço_Entrega,
    Data_Entrega_Desejada,
    Contato,
    Email_Acompanhamento,
    Telefone_Contato,
    Observacao,
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <ToastyContainer />
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Voltar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
                  </Button>
                </div>
              </div>
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
            className={classes.button}
          >
            Voltar
          </Button>
          <Button
            disabled={desativar}
            onClick={(e) => handleSubmit(Solicitacao, setDesativar)}
            className={classes.altButton}
            endIcon={<Icon>send</Icon>}
          >
            {desativar ? 'Validando...': 'Solicitar'}
          </Button>
        </Paper>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  altButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ["Máquina e Configuração", "Detalhes", "Entrega"];
}

function getStepContent(step, test, setTest) {
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
const mapStateToProps = (store) => ({
  State: store.solicitacaoState,
});

export default connect(mapStateToProps)(VerticalLinearStepper);

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

  if (Solicitacao.Chip === "") {
    Toast(
      "Informe qual chip de operadora deve acompanhar a telemetria da máquina"
    );
    setDesativar(false);
    return;
  }

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
