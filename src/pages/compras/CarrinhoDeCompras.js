import React, { useState, useEffect } from "react";

//Meio de comunicação
import { api } from "../../services/api";
//"Placeholder" da página enquanto dados são carregados no
import Loading from "../../components/loading_screen";

//import de elementos visuais
import { Panel, Container } from "../../components/commom_in";
import { Toast } from "../../components/toasty";

import {
  BoxProduct,
  BoxCheckout,
  PanelCart,
  Title,
  Button,
  Text,
  Image,
  BoxDetailProduct,
  BoxQtd,
} from "./styles";
import DoneIcon from "@material-ui/icons/Done";
import { Select, MenuItem,InputLabel  } from "@material-ui/core";
function Exemplo() {
  const [loaded, setLoaded] = useState(false);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  //componentDidMount
  useEffect(() => {
    async function LoadData() {
      try {
        //requisição inicial para obter dados essenciais da pagina
        const response = await api.get("");

        setLoaded(true);
      } catch (err) {}
    }

    LoadData();
  }, []);

  //componentWillUnmount
  useEffect(() => {
    return () => {
      console.log("Resetar store");
    };
  }, []);

  return !loaded ? (
    <Loading />
  ) : (
    <Container>
      <Panel style={{ backgroundColor: "#f0f0f0", overflow: "hidden" }}>
        <PanelCart>
          <div
            style={{ width: "85vw", marginBottom: "50px", overflowY: "auto" }}
          >
            <BoxProduct>
              <img
                src="http://plone.ufpb.br/labeet/contents/paginas/acervo-brazinst/copy_of_cordofones/udecra/sem-imagem.jpg/@@images/a74f5e97-d7f8-434c-add1-2954494f51cd.jpeg"
                style={{
                  width: "180px",
                  height: "198px",
                  borderRight: "1px solid #000",
                  borderRadius: "15px 0 0 15px",
                }}
              />
              <BoxDetailProduct>
                <Title margin="20px auto 10px auto" fontSize="1.5rem">
                  ACHOCOLATADO PILAO PROFESSIONAL (PACOTE 1,05KG)
                </Title>
                <BoxQtd>
                  <div>Qtd: 1</div>
                  <Text>Preço: R$ 1,05</Text>
                  <Text>Total: R$ 1,05</Text>
                  <button>X</button>
                </BoxQtd>
              </BoxDetailProduct>
            </BoxProduct>
          </div>
          <BoxCheckout>
            <Title margin="10px auto">Total: R$ 0,00</Title>
            <Text>Subtotal: R$ 0,00</Text>
            <div style={{margin:'10px 1px',}}>
            <InputLabel id="demo-simple-select-error-label">Escolha o endereço</InputLabel>
            <Select value={age} onChange={handleChange} style={{width:'320px'}}>
            
              <MenuItem value={10}>Endereço 1</MenuItem>
              <MenuItem value={10}>Endereço 2</MenuItem>
              <MenuItem value={10}>Endereço 3</MenuItem>
   
            </Select>
            </div>
            <Button
              bgColor="#40C96E"
              borderRadius="10px"
              width="300px"
              margin="10px auto"
              bgColorH="#108625"
              height="56px"
            >
              <DoneIcon />
              Finalizar Compra
            </Button>
          </BoxCheckout>
        </PanelCart>
      </Panel>
    </Container>
  );
}

export default Exemplo;
