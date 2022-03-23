import React, { useState, useEffect } from 'react'

import { IconButton, Typography, Slide } from '@material-ui/core'
import { ArrowForwardIos as ArrowForwardIosIcon } from '@material-ui/icons'

import { Toast } from '../../../components/toasty'
import { FormBox } from '../styles'

export const QuestionBox = ({ question, answer, validation, validationErrorAction, onChangeAnswer, onAdvance }) => {

  const onRequestAdvance = () => {
    if (validation()) {
      onAdvance()
    } else {
      validationErrorAction()
    }
  }

  return (
    <Slide
      direction="up"
      in={true}
      mountOnEnter
      unmountOnExit
    >
      <FormBox>
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1">
            {question}
          </Typography>
        </div>
        <div
          className='XAlign'
          style={{
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
          }}
        >
          {React.cloneElement(answer, {
            onChange: onChangeAnswer
          })}
          <IconButton
            color="primary"
            onClick={onRequestAdvance}
            size='medium'
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </FormBox >
    </Slide>
  )
}