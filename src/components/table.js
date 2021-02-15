import React from 'react'
import { Table as Tabela } from 'react-materialize'

export const Table = props => (
  <div
    className='tableFixHead'
    style={{
      height: `${props.height}vh`,
      width: `${props.width}%`,
      maxHeight: '70vh',
      minWidth: '55%',
      overflow: 'auto'
    }}
  >
    <Tabela {...props}>
      {props.children}
    </Tabela>
  </div>
)
