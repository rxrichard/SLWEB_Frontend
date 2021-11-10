import React from 'react'
import Image from '../../assets/svg/undraw_Current_location.svg'
  
import './style.css'
function ZRoute() {
  return (
    <div className="error_page">
      
      <img src={Image} alt="Pagina de erro - Perdido"/>
      <div className='lost'>
        <h1>Ops!</h1>
        <h3>Parece que você se perdeu! Clique no botão abaixo para voltar a tela inicial.</h3>
          <a href='/'>
          <p className='button'>
            Clique aqui para voltar à tela inicial.
          </p>
          </a>
      </div>
    </div>
  )
}

export default ZRoute