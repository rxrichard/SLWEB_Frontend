import React from "react";
import { Title, Button,Buttons,Box,Image, EquipCod,Card } from "./style";




function Cards(props) {
  
  return (

    <Card>
      <Box>
        <Image />
        <EquipCod>Cod. Equip: {props.equipCod}</EquipCod>
        <Title>{props.client}</Title>
        <Buttons>
          <Button borderRadius= {'1rem 0 0  1rem'}>Leitura</Button>
          <Button>Contador</Button>
          <Button borderRadius={'0 1rem 1rem 0'}>Doses</Button>
        </Buttons>
       
      </Box>
    </Card>

  )
}

export default Cards;