import React, { useState } from 'react';

import {
  TextField,
  makeStyles,
  Typography,
  Stepper,
  Step,
  StepLabel,
  MenuItem
} from '@material-ui/core'

import DatePicker from '../../components/materialComponents/datePicker';
import { InputTelCelular } from './components/inputTelCelular';
import { InputTelFixo } from './components/inputTelFixo';
import { InputRG } from './components/inputRG';
import { InputCPF } from './components/inputCPF';
import { InputCEP } from './components/inputCEP';
import Select from "../../components/materialComponents/Select";


import {
  Edit as EditIcon,
} from '@material-ui/icons'

import { QuestionBox } from './components/questionBox'
import { CircularStatic } from './components/progressCircle'
import { Toast } from "../../components/toasty";

export const Form = ({ Form, onChangeForm }) => {
  const classes = useStyles();

  const [section, setSection] = useState(0)
  const [question, setQuestion] = useState(0)
  const [loading, setLoading] = useState(false)
  const stepsName = [
    'Dados Pessoais',
    'Estado civil e Família',
    'Bens',
    'Rendimento e Experiência',
    'Franquia',
    'Sócio',
    'Prioridades',
    'Finalização'
  ]

  const handleRequestAdvance = () => {
    if (question === b.length) {
      Toast('Aguarde...', 'info')
    } else if ((question + 1) === b.length) {
      //salva parte do formulario(não esquecer do toast)
      //avança a section
      //volta o question para 0
      setLoading(true);
      setQuestion(oldState => oldState + 1)
      console.log(Form)
    } else {
      setQuestion(oldState => oldState + 1)
    }
  }

  const marcaCheckbox = (valueMarcado, value) => {
    console.log('aqui')
    console.log(valueMarcado)
    console.log(value)

    if (valueMarcado > 3 && value === true) {
      onChangeForm({
        ...Form,
        Est_Civil: valueMarcado,
        Conj_Nome: null,
        Conj_DtNascimento: null,
        Conj_CPF: null,
        Conj_RG: null,
        TUnião: null,
        Conj_RendMensal: null,
      })
    } else if (value === false) {
      onChangeForm({
        ...Form,
        Est_Civil: null,
        Conj_Nome: null,
        Conj_DtNascimento: null,
        Conj_CPF: null,
        Conj_RG: null,
        TUnião: null,
        Conj_RendMensal: null,
      })
    } else {
      onChangeForm({
        ...Form,
        Est_Civil: valueMarcado
      })
    }
  }

  const b = [
    {
      question: 'Estado Civil',
      answerComponent: <div>
        <div style={divStyle}>
          <input
            type="checkbox"
            onClick={(e) =>
              marcaCheckbox(e.target.value, e.target.checked)
            }
            value="1"
            checked={String(Form.Est_Civil) === '1'}
          />
          <Typography variant='subtitle1'>
            Casado(a) em regime de comunhão universal de bens
          </Typography>
        </div>
        <div style={divStyle}>
          <input
            type="checkbox"
            onClick={(e) =>
              marcaCheckbox(e.target.value, e.target.checked)
            }
            value="2"
            checked={String(Form.Est_Civil) === '2'}
          />
          <Typography variant='subtitle1'>
            Casado(a) em regime de comunhão parcial de bens
          </Typography>
        </div>
        <div style={divStyle}>
          <input
            type="checkbox"
            onClick={(e) =>
              marcaCheckbox(e.target.value, e.target.checked)
            }
            value="3"
            checked={String(Form.Est_Civil) === '3'}
          />
          <Typography variant='subtitle1'>
            Casado(a) em regime de separação de bens
          </Typography>
        </div>
        <div style={divStyle}>
          <input
            type="checkbox"
            onClick={(e) =>
              marcaCheckbox(e.target.value, e.target.checked)
            }
            value="4"
            checked={String(Form.Est_Civil) === '4'}
          />
          <Typography variant='subtitle1'>Solteiro (a)</Typography>
        </div>
        <div style={divStyle}>
          <input
            type="checkbox"
            onClick={(e) =>
              marcaCheckbox(e.target.value, e.target.checked)
            }
            value="5"
            checked={String(Form.Est_Civil) === '5'}
          />
          <Typography variant='subtitle1'>Divorciado(a)</Typography>
        </div>
        <div style={divStyle}>
          <input
            type="checkbox"
            onClick={(e) =>
              marcaCheckbox(e.target.value, e.target.checked)
            }
            value="6"
            checked={String(Form.Est_Civil) === '6'}
          />
          <Typography variant='subtitle1'>Separado(a) judicialmente</Typography>
        </div>
        <div style={divStyle}>
          <input
            type="checkbox"
            onClick={(e) =>
              marcaCheckbox(e.target.value, e.target.checked)
            }
            value="7"
            checked={String(Form.Est_Civil) === '7'}
          />
          <Typography variant='subtitle1'>Viúvo (a)</Typography>
        </div>
      </div>,
      validationTest: () => Form.Est_Civil !== '' && Form.Est_Civil !== null && typeof Form.Est_Civil !== 'undefined',
      validationErrorFunction: () => {
        Toast('Informe qual o seu estado civil', 'warn')
      },
      changeAnswerFunction: (e) => { },
      onRequestAdvanceStep: handleRequestAdvance
    },
    {
      question: 'Possui filhos?',
      answerComponent: <Select
        width="413px"
        label="Selecione..."
        value={Form.Tem_filhos}
      >
        <MenuItem value="Sim">Sim</MenuItem>
        <MenuItem value="Não">Não</MenuItem>
      </Select>,
      validationTest: () => Form.Tem_filhos !== null && String(Form.Tem_filhos).trim() !== '' && typeof Form.Tem_filhos != 'undefined',
      validationErrorFunction: () => {
        Toast('Informe se você possui filhos', 'warn')
      },
      changeAnswerFunction: (e) => {
        onChangeForm({
          ...Form,
          Tem_filhos: e.target.value
        })
      },
      onRequestAdvanceStep: handleRequestAdvance
    },
    Form.Est_Civil < 4 && Form.Est_Civil !== null ? (
      {
        question: 'Nome do(a) cônjuge',
        answerComponent: <TextField className={classes.TextInput} variant='outlined' label='nome do(a) cônjuge aqui' value={Form.Conj_Nome} />,
        validationTest: () => Form.Conj_Nome !== null && String(Form.Conj_Nome).trim() !== '' && typeof Form.Conj_Nome != 'undefined',
        validationErrorFunction: () => {
          Toast('Informe o nome do(a) cônjuge', 'warn')
        },
        changeAnswerFunction: (e) => {
          onChangeForm({
            ...Form,
            Conj_Nome: e.target.value
          })
        },
        onRequestAdvanceStep: handleRequestAdvance
      },
      {
        question: 'Data de nascimento do(a) cônjuge',
        answerComponent: <DatePicker min={false} label="Data de nascimento cônjuge" />,
        validationTest: () => Form.Conj_DtNascimento !== null && String(Form.Conj_DtNascimento).trim() !== '' && typeof Form.Conj_DtNascimento != 'undefined',
        validationErrorFunction: () => {
          Toast('Informe a data de nascimento do(a) cônjuge', 'warn')
        },
        changeAnswerFunction: (e) => {
          onChangeForm({
            ...Form,
            Conj_DtNascimento: e._d
          })
        },
        onRequestAdvanceStep: handleRequestAdvance
      },
      {
        question: 'RG do(a) cônjuge',
        answerComponent: <InputRG value={Form.Conj_RG} />,
        validationTest: () => Form.Conj_RG !== null && String(Form.Conj_RG).trim() !== '' && typeof Form.Conj_RG != 'undefined',
        validationErrorFunction: () => {
          Toast('Informe o RG do(a) cônjuge', 'warn')
        },
        changeAnswerFunction: (e) => {
          onChangeForm({
            ...Form,
            Conj_RG: e.target.value
          })
        },
        onRequestAdvanceStep: handleRequestAdvance
      },
      {
        question: 'CPF do(a) cônjuge',
        answerComponent: <InputCPF value={Form.Conj_CPF} />,
        validationTest: () => Form.Conj_CPF !== null && String(Form.Conj_CPF).trim() !== '' && typeof Form.Conj_CPF != 'undefined',
        validationErrorFunction: () => {
          Toast('Informe o CPF do(a) cônjuge', 'warn')
        },
        changeAnswerFunction: (e) => {
          onChangeForm({
            ...Form,
            Conj_CPF: e.target.value
          })
        },
        onRequestAdvanceStep: handleRequestAdvance
      },
      {
        question: 'Tempo de união',
        answerComponent: <TextField className={classes.TextInput} variant='outlined' label='tempo de união com o(a) cônjuge' value={Form.TUnião} />,
        validationTest: () => Form.TUnião !== null && String(Form.TUnião).trim() !== '' && typeof Form.TUnião != 'undefined',
        validationErrorFunction: () => {
          Toast('Informe o tempo de união com o(a) cônjuge', 'warn')
        },
        changeAnswerFunction: (e) => {
          onChangeForm({
            ...Form,
            TUnião: e.target.value
          })
        },
        onRequestAdvanceStep: handleRequestAdvance
      },
      {
        question: 'Redimento mensal do(a) cônjuge',
        answerComponent: <TextField className={classes.TextInput} variant='outlined' label='rendimento mensal do(a) cônjuge' value={Form.Conj_RendMensal} />,
        validationTest: () => Form.Conj_RendMensal !== null && String(Form.Conj_RendMensal).trim() !== '' && typeof Form.Conj_RendMensal != 'undefined',
        validationErrorFunction: () => {
          Toast('Informe o rendimento mensal do seu/sua cônjuge', 'warn')
        },
        changeAnswerFunction: (e) => {
          onChangeForm({
            ...Form,
            Conj_RendMensal: e.target.value
          })
        },
        onRequestAdvanceStep: handleRequestAdvance
      }
    ) : null,
    Form.Tem_filhos === "Sim" ? (
      {
        question: 'Quantos filhos?',
        answerComponent: <TextField className={classes.TextInput} variant='outlined' label='Quantos filhos possui' value={Form.Qtd_filhos} />,
        validationTest: () => Form.Qtd_filhos !== null && String(Form.Qtd_filhos).trim() !== '' && typeof Form.Qtd_filhos != 'undefined',
        validationErrorFunction: () => {
          Toast('Informe quantos filhos você possui', 'warn')
        },
        changeAnswerFunction: (e) => {
          onChangeForm({
            ...Form,
            Qtd_filhos: e.target.value
          })
        },
        onRequestAdvanceStep: handleRequestAdvance
      },
      {
        question: 'Idade dos filhos',
        answerComponent: <TextField className={classes.TextInput} variant='outlined' label='Idade dos filhos' value={Form.Idd_filhos} />,
        validationTest: () => Form.Idd_filhos !== null && String(Form.Idd_filhos).trim() !== '' && typeof Form.Idd_filhos != 'undefined',
        validationErrorFunction: () => {
          Toast('Informe a idade do(s) filho(s) que você possui', 'warn')
        },
        changeAnswerFunction: (e) => {
          onChangeForm({
            ...Form,
            Idd_filhos: e.target.value
          })
        },
        onRequestAdvanceStep: handleRequestAdvance
      }
    ) : null
  ]

  return (
    <div
      className="XAlign"
      style={{
        height: '100%'
      }}
    >

      <div
        className='YAlign'
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          height: '100%',
          maxHeight: '500px',
          padding: '16px 32px 0px 0px',
        }}
      >
        <div
          style={{
            padding: '8px 40px',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.2)'
          }}
        >
          <Typography variant='h6'>Progresso</Typography>
          <CircularStatic progress={(question / b.length) * 100} />
        </div>
      </div>

      {loading ? (
        <QuestionBox
          question='salvando...'
          answer={null}
          validation={() => true}
          validationErrorAction={() => Toast('Salvando etapa, aguarde...', 'info')}
          onChangeAnswer={() => { }}
          onAdvance={handleRequestAdvance}
        />
      ) : (

        <QuestionBox
          question={b[question].question}
          answer={b[question].answerComponent}
          validation={b[question].validationTest}
          validationErrorAction={b[question].validationErrorFunction}
          onChangeAnswer={b[question].changeAnswerFunction}
          onAdvance={b[question].onRequestAdvanceStep}
        />
      )}

      <div
        className='YAlign'
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100%',
          maxHeight: '500px',
        }}
      >
        <div
          className={classes.root}
        >
          <Stepper
            activeStep={section}
            orientation="vertical"
            style={{
              background: 'transparent'
            }}
          >
            {stepsName.map((label, index) => (
              <Step
                key={label}
              >
                <StepLabel
                  className={classes.StepLabelNumber}
                >
                  {label}
                  {section === index ?
                    <EditIcon
                      fontSize='small'
                      style={{
                        marginLeft: '8px'
                      }}
                    />
                    :
                    null
                  }
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>

    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  TextInput: {
    width: '100%',
    margin: '8px',
    paddingRight: '8px',
    '&:nth-child(1) > div > input': {
      marginLeft: '8px'
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    borderRadius: '4px',
    marginTop: '16px',
    background: 'rgba(255, 255, 255, 0.2)'
  },
  StepLabelNumber: {
    '& > span.MuiStepLabel-iconContainer > svg > circle': {
      color: '#0056C7',
      backgroundColor: '#0056C7'
    },
    '& > span.MuiStepLabel-iconContainer > svg > path': {
      color: '#65e305',
      backgroundColor: '#65e305'
    },
  }
}))

const divStyle = {
  display: "Flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignContent: "center",
  alignItems: "center",
  marginBottom: "2%",
};

const checkbox = {};

// const a = [
//   {
//     question: 'Para começar, por favor nos informe seu nome completo',
//     answerComponent: <TextField className={classes.TextInput} variant='outlined' label='Seu nome completo aqui' value={Form.Nome_Completo} />,
//     validationTest: () => Form.Nome_Completo !== null && String(Form.Nome_Completo).trim() !== '' && typeof Form.Nome_Completo != 'undefined',
//     validationErrorFunction: () => {
//       Toast('O campo do nome é obrigatório!', 'warn')
//     },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         Nome_Completo: e.currentTarget.value
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
//   {
//     question: 'Sua data de nascimento',
//     answerComponent: <DatePicker min={false} label="Data de nascimento" />,
//     validationTest: () => Form.DtNascimento !== null && String(Form.DtNascimento).trim() !== '' && typeof Form.DtNascimento != 'undefined',
//     validationErrorFunction: () => {
//       Toast('O campo da data de nascimento é obrigatório!', 'warn')
//     },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         DtNascimento: e._d
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
//   {
//     question: 'Seu número de RG',
//     answerComponent: <InputRG value={Form.RG} />,
//     validationTest: () => Form.RG !== null && String(Form.RG).trim() !== '' && typeof Form.RG != 'undefined',
//     validationErrorFunction: () => {
//       Toast('O campo do RG é obrigatório!', 'warn')
//     },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         RG: e.target.value
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
//   {
//     question: 'Seu número de CPF',
//     answerComponent: <InputCPF value={Form.CPF} />,
//     validationTest: () => Form.CPF !== null && String(Form.CPF).trim() !== '' && typeof Form.CPF != 'undefined',
//     validationErrorFunction: () => {
//       Toast('O campo do CPF é obrigatório!', 'warn')
//     },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         CPF: e.target.value
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
//   {
//     question: 'Informe seu email principal',
//     answerComponent: <TextField className={classes.TextInput} variant='outlined' label='Email' value={Form.Email} />,
//     validationTest: () => Form.Email !== null && String(Form.Email).trim() !== '' && typeof Form.Email != 'undefined',
//     validationErrorFunction: () => {
//       Toast('O campo do Email é obrigatório!', 'warn')
//     },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         Email: e.currentTarget.value
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
//   {
//     question: 'Telefone Celular(Opcional caso use telefone fixo)',
//     answerComponent: <InputTelCelular value={Form.Celular} disabled={false} />,
//     validationTest: () => true,
//     validationErrorFunction: () => { },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         Celular: e.target.value
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
//   {
//     question: 'Telefone Fixo(Obrigatório caso não tenha informado um número de celular)',
//     answerComponent: <InputTelFixo value={Form.Tel_Residencial} disabled={false} />,
//     validationTest: () => (Form.Celular !== null && String(Form.Celular).trim() !== '' && typeof Form.Celular != 'undefined') && (Form.Tel_Residencial !== null && String(Form.Tel_Residencial).trim() !== '' && typeof Form.Tel_Residencial != 'undefined'),
//     validationErrorFunction: () => {
//       Toast('Como você não informou um telefone celular, precisamos pelo menos de um número de telefone fixo.', 'warn')
//     },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         Tel_Residencial: e.target.value
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
//   {
//     question: 'Endereço: Logradouro',
//     answerComponent: <TextField className={classes.TextInput} variant='outlined' label='Logradouro' value={Form.Logradouro} />,
//     validationTest: () => Form.Logradouro !== null && String(Form.Logradouro).trim() !== '' && typeof Form.Logradouro != 'undefined',
//     validationErrorFunction: () => {
//       Toast('Informe o logradouro do seu endereço!', 'warn')
//     },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         Logradouro: e.currentTarget.value
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
//   {
//     question: 'Endereço: Número',
//     answerComponent: <TextField className={classes.TextInput} variant='outlined' label='Número' value={Form.Número} />,
//     validationTest: () => Form.Número !== null && String(Form.Número).trim() !== '' && typeof Form.Número != 'undefined',
//     validationErrorFunction: () => {
//       Toast('Informe o número do seu endereço!', 'warn')
//     },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         Número: e.currentTarget.value
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
//   {
//     question: 'Endereço: Complemento(Opcional)',
//     answerComponent: <TextField className={classes.TextInput} variant='outlined' label='Complemento' value={Form.Complemento} />,
//     validationTest: () => true,
//     validationErrorFunction: () => { },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         Complemento: e.currentTarget.value
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
//   {
//     question: 'Endereço: Bairro',
//     answerComponent: <TextField className={classes.TextInput} variant='outlined' label='Bairro' value={Form.Bairro} />,
//     validationTest: () => Form.Bairro !== null && String(Form.Bairro).trim() !== '' && typeof Form.Bairro != 'undefined',
//     validationErrorFunction: () => {
//       Toast('Informe o bairro do seu endereço!', 'warn')
//     },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         Bairro: e.currentTarget.value
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
//   {
//     question: 'Endereço: Município',
//     answerComponent: <TextField className={classes.TextInput} variant='outlined' label='Município' value={Form.Municipio} />,
//     validationTest: () => Form.Municipio !== null && String(Form.Municipio).trim() !== '' && typeof Form.Municipio != 'undefined',
//     validationErrorFunction: () => {
//       Toast('Informe o município do seu endereço!', 'warn')
//     },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         Municipio: e.currentTarget.value
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
//   {
//     question: 'Endereço: Estado',
//     answerComponent: <TextField className={classes.TextInput} variant='outlined' label='Estado' value={Form.Estado} />,
//     validationTest: () => Form.Estado !== null && String(Form.Estado).trim() !== '' && typeof Form.Estado != 'undefined',
//     validationErrorFunction: () => {
//       Toast('Informe o estado do seu endereço!', 'warn')
//     },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         Estado: e.currentTarget.value
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
//   {
//     question: 'Endereço: CEP',
//     answerComponent: <InputCEP value={Form.CEP} />,
//     validationTest: () => Form.CEP !== null && String(Form.CEP).trim() !== '' && typeof Form.CEP != 'undefined',
//     validationErrorFunction: () => {
//       Toast('Informe o CEP do seu endereço!', 'warn')
//     },
//     changeAnswerFunction: (e) => {
//       onChangeForm({
//         ...Form,
//         CEP: e.target.value
//       })
//     },
//     onRequestAdvanceStep: handleRequestAdvance
//   },
// ]