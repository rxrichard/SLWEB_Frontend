import React from 'react'
import NumberFormat from 'react-number-format'

import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { RED_PRIMARY } from '../../../misc/colors'

export const LinhaEditavel = ({ linha, pRef, onUpdateLine, editavel = true }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography
        className={classes.desc}
        variant="subtitle1"
      >
        {linha.DreDesc}
      </Typography>
      <div className={classes.valuesDiv}>
        <NumberFormat
          className={classes.values}
          value={linha.DreVlr}
          placeholder='R$'
          type='text'
          allowNegative={false}
          allowLeadingZeros={false}
          allowedDecimalSeparators={false}
          decimalSeparator=','
          thousandSeparator='.'
          decimalScale={2}
          onBlur={e => console.log(e.value)}
          onValueChange={editavel
            ? (e) => onUpdateLine(linha.DreCod, e.value, (e.value / pRef))
            : () => { }
          }
          disabled={!editavel}
        />
        <Typography
          className={classes.percentages}
          variant="subtitle1"
        >
          <strong style={{ color: RED_PRIMARY }}>
            {calculatePercentage(linha.DreVlr, pRef)}
          </strong>
        </Typography>
      </div>
    </div>
  )
}

const calculatePercentage = (amount, refAmount) => {
  return String(Number((amount / refAmount) * 100).toFixed(2)).padStart(6, ' ') + '%'
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    width: '100%',
    height: '25px',
    padding: '0px 16px',
  },
  valuesDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    height: '25px',
  },
  desc: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  values: {
    padding: '0px 4px 0px 0px',
    width: '100px !important',
    background: 'rgba(204, 204, 204, 0.1)'
  },
  percentages: {
    padding: '0px 0px 0px 4px',
    width: '70px'
  }
}))