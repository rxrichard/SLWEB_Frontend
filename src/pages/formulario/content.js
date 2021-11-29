import React from 'react'

export const content = () => {
  return (
    <div className="YAlign">
      <p>
        Agradecemos o preenchimento do questionário e ressaltamos que as
        informações serão tratadas com a devida discrição.
      </p>
      <p>
        Trata-se de um questionário abrangente. A coleta de todas as
        informações tem como objetivo avaliar se o que temos para
        oferecer está dentro da expectativa e vice-versa, visando com
        isso promover o sucesso do empreendimento. Estamos também à
        disposição caso se deseje qualquer informação sobre a Pilão
        Professional ou sobre o nosso sistema de franquia.
      </p>
      <p style={{ marginBottom: "10px" }}>
        Caso exista mais de uma pessoa na condução do negócio, que irá
        participar do dia a dia da operação, participando ou não
        formalmente no contrato social, é imprescindível que seja
        enviado um questionário para cada pessoa envolvida
      </p>
      

      {/* INICIO DO FORMULARIO */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            ...divAlinha,
            borderRight: "1px solid #c1c1c1",
            borderBottom: "1px solid #c1c1c1",
            paddingRight: "calc(1vw - 1px)",
          }}
        >
          
          

          
          

          
        </div>
        <div
          style={{
            ...divAlinha,
            borderLeft: "1px solid #c1c1c1",
            borderBottom: "1px solid #c1c1c1",
            paddingLeft: "calc(1vw - 1px)",
          }}
        >
          

          
        </div>
      </div>
    </div>
  )
}