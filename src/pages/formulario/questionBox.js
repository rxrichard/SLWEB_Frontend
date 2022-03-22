import React, { useState, useEffect } from 'react'

import { IconButton } from '@material-ui/core'
import { ArrowForwardIos as ArrowForwardIosIcon } from '@material-ui/icons'

import { Toast } from '../../components/toasty'

export const QuestionBox = ({ question, answer, validation, validationErrorMesssage, onChangeAnswer, onAdvance }) => {

  const onRequestAdvance = () => {
    if (validation()) {
      onAdvance()
    } else {
      Toast(validationErrorMesssage)
    }
  }

  return (
    <Box>
      <div className="YAlign">
        <Typography variant="">
          {question}
        </Typography>
        <div className='XAlign'>
          {answer}
          <IconButton
            color="primary"
            onClick={onRequestAdvance}
            size='medium'
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </div>
    </Box>
  )
}