import React from 'react'

import { Container } from '../../components/commom_out'
import { Flex } from './styles'

function ZRoute (){
    return (
      <Container>
        <Flex>
          <h1>Ops!</h1>
          <h3>Parece que você está tentando acessar uma rota restrita.</h3>
          <p>
            Clique <a href='/'>aqui</a> para voltar à tela de login.
          </p>
        </Flex>
      </Container>
    )
}

export default ZRoute