import React from 'react'

import { FranquiaItem } from './franquiaItem'

export const FranquiaList = ({ Franquias }) => {
  return (
    <>
      {Franquias.map(fr => (
        <FranquiaItem
          Franquia={fr}
        />
      ))}
    </>
  )
}