import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { BasicInfo } from './sections/BasicInfo'
import { Partner } from './sections/Partner'
import { Goods } from './sections/GoodsAndProfits'
import { Profile } from './sections/ExpAndSoc'
import { Expect } from './sections/Expec'
import { End } from './sections/FinalScreen'

function getStepContent(stepIndex, formulario, FormHandler) {
  switch (stepIndex) {
    case 0:
      return <BasicInfo Form={formulario} FormHandler={FormHandler}/>;
    case 1:
      return <Partner Form={formulario} FormHandler={FormHandler} />;
    case 2:
      return <Goods Form={formulario} FormHandler={FormHandler} />;
    case 3:
      return <Profile Form={formulario} FormHandler={FormHandler} />;
    case 4:
      return <Expect Form={formulario} FormHandler={FormHandler} />;
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
        {activeStep === steps.length ? (
          <div>
            <End Form={props.Form} />
            <Button onClick={handleBack}>Voltar</Button>
            <Button variant="contained" color="primary" onClick={() => {}}>
                Enviar
              </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep, props.Form, props.onFormChange)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Voltar
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Próximo
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
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

function getSteps() {
  return ['Dados Básicos', 'Conjugê & Dependentes', 'Bens & Renda', 'Experiência & Sociedade', 'Expectativas'];
}