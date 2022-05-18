import React, { useState } from 'react'

export const Equipamento = ({ PdvId, allowEditing, onAllowEditingChange }) => {
  const [equipamentos, setEquipamentos] = useState([])
  return (
    <>
      <h6>Equipamento</h6>

      {equipamentos.map(eqs => (
        <p>{eqs.EquiCod}</p>
      ))}
    </>
  )
}