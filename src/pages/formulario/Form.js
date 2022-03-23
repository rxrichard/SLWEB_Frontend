import React, { useState } from 'react';

import {
  TextField,
  makeStyles
} from '@material-ui/core'

import { QuestionBox } from './components/questionBox'
import { Toast } from "../../components/toasty";

export const Form = () => {
  const classes = useStyles();
  const [section, setSection] = useState(0)
  const [question, setQuestion] = useState(0)

  return (
    <QuestionBox
      question='Isso está Funcionando?'
      answer={
        <TextField
          className={classes.TextInput}
          variant='outlined'
          label='Resposta'
        />
      }
      validation={() => false}
      validationErrorAction={
        () => Toast('Resposta inválida', 'warn')
      }
      onChangeAnswer={(e) => console.log(e.currentTarget.value)}
      onAdvance={() => console.log('avançar para proxima pergunta')}
    />
  )
}

const useStyles = makeStyles(() => ({
  TextInput: {
    width: '100%',
    margin: '8px',
    '&:nth-child(1) > div > input': {
      marginLeft: '8px'
    },
  },
}))

const a = [
  {
    
  }
]