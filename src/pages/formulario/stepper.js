import React from 'react';

import { Send } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Toast } from '../../components/toasty'

import { BasicInfo } from './sections/BasicInfo'
import { Partner } from './sections/Partner'
import { Goods } from './sections/GoodsAndProfits'
import { Profile } from './sections/ExpAndSoc'
import { Expect } from './sections/Expec'
import { End } from './sections/FinalScreen'

function getStepContent(stepIndex, formulario, FormHandler) {
  switch (stepIndex) {
    case 0:
      return <BasicInfo Form={formulario} FormHandler={FormHandler} />;
    case 1:
      return <Partner Form={formulario} FormHandler={FormHandler} />;
    case 2:
      return <Goods Form={formulario} FormHandler={FormHandler} />;
    case 3:
      return <Profile Form={formulario} FormHandler={FormHandler} />;
    case 4:
      return <Expect Form={formulario} FormHandler={FormHandler} />;
    default:
      break
  }
}

export default function HorizontalLabelPositionBelowStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (verify(props.Form, activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleFinish = async (e) => {
    e.persist()
    const shouldFinishForm = await props.onSubmit(e)
    if (shouldFinishForm) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ textAlign: 'start' }}>
        {getContent(activeStep, props.Form, props.onRequestWord, handleFinish, props.onFormChange, handleNext, handleBack, classes, props.fetching)}
      </div>
    </div >
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const getSteps = () => {
  return ['Dados Básicos', 'Conjugê & Dependentes', 'Bens & Renda', 'Experiência & Sociedade', 'Expectativas'];
}

const getContent = (
  activeStep,
  Form,
  WordRequest,
  FinishForm,
  ChangeForm,
  Next,
  Back,
  classes,
  shouldWait
) => {
  switch (activeStep) {
    case 6:
      return (
        <div className='YAlign' style={{ alignItems: "center" }}>
          <Typography variant="h4">Tudo certo!</Typography>
        </div>
      )
    case 5:
      return (
        <div>
          <End
            Form={Form}
            onRequestWord={(e) => WordRequest(e)}
            FormHandler={ChangeForm}
          />
          <Button onClick={Back}>Voltar</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => FinishForm(e)}
            startIcon={<Send />}
            disabled={shouldWait}
          >
            Enviar
          </Button>
        </div>
      )
    default:
      return (
        <div>
          {getStepContent(activeStep, Form, ChangeForm)}
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={Back}
              className={classes.backButton}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={Next}
            >
              Próximo
            </Button>
          </div>
        </div>
      )
  }
}

const verify = (Form, step) => {
  switch (step) {
    case 0:
      if (Form.Nome_Completo === null || Form.Nome_Completo === "") {
        Toast("Preencha seu nome completo", 'warn');
        return false;
      }
      if (Form.DtNascimento === null || Form.DtNascimento === "") {
        Toast("Preencha sua data de nascimento", 'warn');
        return false;
      }
      if (Form.RG === null || Form.RG === "") {
        Toast("Preencha seu RG", 'warn');
        return false;
      }
      if (Form.CPF === null || Form.CPF === "") {
        Toast("Preencha seu CPF", 'warn');
        return false;
      }
      if (Form.Logradouro === null || Form.Logradouro === "") {
        Toast("Preencha seu endereço", 'warn');
        return false;
      }
      if (Form.Número === null || Form.Número === "") {
        Toast("Preencha o número do seu endereço", 'warn');
        return false;
      }
      if (Form.Bairro === null || Form.Bairro === "") {
        Toast("Preencha o bairro", 'warn');
        return false;
      }
      if (Form.Municipio === null || Form.Municipio === "") {
        Toast("Preencha o município", 'warn');
        return false;
      }
      if (Form.Estado === null || Form.Estado === "") {
        Toast("(Preencha seu estado", 'warn');
        return false;
      }
      if (Form.CEP === null || Form.CEP === "") {
        Toast("(Preencha seu CEP", 'warn');
        return false;
      }
      if (Form.Email === null || Form.Email === "") {
        Toast("(Preencha seu email", 'warn');
        return false;
      }
      if (
        (Form.Tel_Residencial === null || Form.Tel_Residencial === "") &&
        (Form.Celular === null || Form.Celular === "")
      ) {
        Toast("Informe pelo menos um número de Telefone ou Celular", 'warn');
        return false;
      }
      return true
    case 1:
      if (Form.Est_Civil === null) {
        Toast("Informe seu estado civil", 'warn');
        return false;
      }

      if (Form.Tem_filhos === null || Form.Tem_filhos === "") {
        Toast("Informe se possui filhos", 'warn');
        return false;
      }

      if (
        Number(Form.Est_Civil) <= 3 &&
        (Form.Conj_Nome === null ||
          Form.Conj_Nome === "" ||
          Form.Conj_RG === null ||
          Form.Conj_RG === "" ||
          Form.Conj_CPF === null ||
          Form.Conj_CPF === "" ||
          Form.Conj_DtNascimento === null ||
          Form.Conj_DtNascimento === "" ||
          Form.Conj_RendMensal === null ||
          Form.Conj_RendMensal === "" ||
          Form.TUnião === null ||
          Form.TUnião === "")
      ) {
        Toast("Revise os dados do seu conjuge", 'warn');
        return false;
      }

      if (
        Form.Tem_filhos === "Sim" &&
        (Form.Qtd_filhos === null ||
          Form.Qtd_filhos === "" ||
          Form.Idd_filhos === null ||
          Form.Idd_filhos === "")
      ) {
        Toast("Preencha corretamente quantos filhos e suas idades", 'warn');
        return false;
      }

      return true
    case 2:
      if (Form.CLT === null || Form.CLT === "") {
        Toast("Informe se é CLT ou não", 'warn');
        return false;
      }

      if (
        Form.CLT === "Sim" &&
        (Form.Rend_Mensal === null || Form.Rend_Mensal === "")
      ) {
        Toast("Informe seu rendimento mensal como CLT", 'warn');
        return false;
      }

      if (Form.T_Residencia === null || Form.T_Residencia === "") {
        Toast("Informe qual o tipo da sua residência atual", 'warn');
        return false;
      }

      if (
        (Form.T_Residencia === "Alugada" || Form.T_Residencia === "Financiada") &&
        (Form.Residencia_Mensal === null || Form.Residencia_Mensal === "")
      ) {
        Toast("Informe a quantia gasta por mês com sua residência", 'warn');
        return false;
      }


      if (Form.P_Veiculo === null || Form.P_Veiculo === "") {
        Toast("Informe se possui veículo", 'warn');
        return false;
      }

      if (Form.P_Imovel === null || Form.P_Imovel === "") {
        Toast("Informe se possui imóvel", 'warn');
        return false;
      }

      if (Form.Recolhimento === null || Form.Recolhimento === "") {
        Toast(
          "Informe se houve recolhimento de imposto de renda no último ano", 'warn'
        );
        return false;
      }

      if (
        Form.Recolhimento === "Sim" &&
        (Form.Recolhimento_QTD === null || Form.Recolhimento_QTD === "")
      ) {
        Toast("Informe a quantia recolhida pelo imposto de renda", 'warn');
        return false;
      }

      if (Form.Renda_Familiar === null || Form.Renda_Familiar === "") {
        Toast("Informe sua renda familiar", 'warn');
        return false;
      }


      if (Form.Renda_Composta === null || Form.Renda_Composta === "") {
        Toast("Especifique como sua renda familiar é composta", 'warn');
        return false;
      }

      if (Form.Expect === null || Form.Expect === "") {
        Toast(
          "Informe a margem de tempo em que deseja receber o retorno para seu investimento", 'warn'
        );
        return false;
      }

      if (Form.Origem_Capital === null || Form.Origem_Capital === "") {
        Toast(
          "Informe a origem do capital destinado à abertura do negócio junto à Pilão", 'warn'
        );
        return false;
      }

      if (Form.Disp_Invest === null || Form.Disp_Invest === "") {
        Toast("Informe a quantia disponivel para investimento no negócio", 'warn');
        return false;
      }

      return true
    case 3:
      if (Form.T_Empresa === null || Form.T_Empresa === "") {
        Toast("Informe se já teve uma empresa própria", 'warn');
        return false;
      }

      if (Form.Form_Escolar === null || Form.Form_Escolar === "") {
        Toast("Informe sua formação escolar", 'warn');
        return false;
      }

      if (Form.Ult_exp === null || Form.Ult_exp === "") {
        Toast("Conte sobre suas últimas experiencias profissionais", 'warn');
        return false;
      }

      if (Form.Sociedade === null || Form.Sociedade === "") {
        Toast("Informe se haverá um sócio na franquia", 'warn');
        return false;
      }

      if (Form.T_Empreendimento === null || Form.T_Empreendimento === "") {
        Toast("Informe se já teve um empreendimento em sociedade antes", 'warn');
        return false;
      }

      if (
        Form.T_Empreendimento === "Sim" &&
        (Form.Exp_Sociedade === null || Form.Exp_Sociedade === "")
      ) {
        Toast("Conte sobre sua experiencia em sociedade", 'warn');
        return false;
      }

      if (
        Form.T_Empresa === "Sim" &&
        (Form.Detalhes_Atividade === null || Form.Detalhes_Atividade === "")
      ) {
        Toast("Detalhe as atividades da sua empresa", 'warn');
        return false;
      }

      if (
        Form.Sociedade === "Sim" &&
        (Form.Nome_Socio === null ||
          Form.Nome_Socio === "" ||
          Form.Socio_Vinculo === null ||
          Form.Socio_Vinculo === "" ||
          Form.Tempo_ConheceSocio === null ||
          Form.Tempo_ConheceSocio === "" ||
          Form.Realizou_Socio === null ||
          Form.Realizou_Socio === "" ||
          Form.Cond_Socio === null ||
          Form.Cond_Socio === "" ||
          Form.Part_invest === null ||
          Form.Part_invest === "" ||
          (Form.Part_invest === "Sim" &&
            (Form.Prop_Invest === null || Form.Prop_Invest === "")))
      ) {
        Toast(
          "Verifique se todas as questões relacionadas ao sócio da franquia foram devidamente respondidas", 'warn'
        );
        return false;
      }

      return true
    case 4:
      if (Form.Cob_Desp === null || Form.Cob_Desp === "") {
        Toast(
          "Informe se possui disponibilidade de capital para eventual investimento que complete despesas da franquia", 'warn'
        );
        return false;
      }

      if (Form.Conhece_Pilao === null || Form.Conhece_Pilao === "") {
        Toast("Nos conte como conheceu a Pilão Professional", 'warn');
        return false;
      }

      if (Form.Caracteristica_Peso === null || Form.Caracteristica_Peso === "") {
        Toast(
          "Nos conte qual foi a caracteristica de negócio que mais lhe atraiu na Pilão Professional", 'warn'
        );
        return false;
      }

      if (Form.Com_Regra === null || Form.Com_Regra === "") {
        Toast(
          "Informe se está disposto à cumprir as regras da franqueadora", 'warn'
        );
        return false;
      }

      if (Form.Com_Med === null || Form.Com_Med === "") {
        Toast("Informe se está ciente da média mensal inicial", 'warn');
        return false;
      }

      if (Form.Com_Inf === null || Form.Com_Inf === "") {
        Toast("Informe se concorda em fornecer informações à franqueadora", 'warn');
        return false;
      }

      for (let i = 0; i < Form.Prioridade.length; i++) {
        if (typeof Form.Prioridade[i] == "undefined") {
          Toast("Avalie cada uma das afirmações de preferencia", 'warn');
          return false;
        }
      }

      return true
    default:

      return false
  }
}