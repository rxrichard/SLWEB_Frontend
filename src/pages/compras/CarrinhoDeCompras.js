import React, { useState, useEffect } from "react";

//Meio de comunicação
import { api } from "../../services/api";
//"Placeholder" da página enquanto dados são carregados no
import Loading from "../../components/loading_screen";

//import de elementos visuais
import { Panel, Container } from "../../components/commom_in";
import { Toast } from "../../components/toasty";
import CancelIcon from '@material-ui/icons/Cancel';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import {
  BoxCheckout,
  PanelCart,
  Title,
  Text,
} from "./styles";

import DoneIcon from "@material-ui/icons/Done";
import { Select, MenuItem,InputLabel  } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '85vw',
    display:'flex',
    marginBottom: '10px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
  },
});

function CarrinhoCompras() {
  const [loaded, setLoaded] = useState(false);

  const [address, setAddress] = React.useState("");

  const handleChange = (event) => {
    setAddress(event.target.value);
  
  };
  //get delivery address
  useEffect(() => {
    console.log(address)
  }, [address]);
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


  const classes = useStyles();
  return !loaded ? (
    <Loading />
  ) : (
    
    <Container>
      
      <Panel style={{ backgroundColor: "#f0f0f0", overflow: "hidden" }}>
        <PanelCart>
        
          <div
            style={{ width: "85vw", marginBottom: "50px", overflowY: "auto" }}
          >
            {/* <BoxProduct>
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
              
              </BoxDetailProduct>
            </BoxProduct> */}



    <Card className={classes.root}>
      <CardActionArea style={{display:'flex'}}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="180"
         
          image="http://plone.ufpb.br/labeet/contents/paginas/acervo-brazinst/copy_of_cordofones/udecra/sem-imagem.jpg/@@images/a74f5e97-d7f8-434c-add1-2954494f51cd.jpeg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="medium" color="primary">
           <CancelIcon/>
        </Button>
      </CardActions>
    </Card>

     <Card className={classes.root}>
      <CardActionArea style={{display:'flex'}}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="180"
         
          image="http://plone.ufpb.br/labeet/contents/paginas/acervo-brazinst/copy_of_cordofones/udecra/sem-imagem.jpg/@@images/a74f5e97-d7f8-434c-add1-2954494f51cd.jpeg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="medium" color="primary">
           <CancelIcon/>
        </Button>
      </CardActions>
    </Card>


          </div>
          <BoxCheckout>
            <Title margin="10px auto">Total: R$ 0,00</Title>
            <Text>Subtotal: R$ 0,00</Text>
            <div style={{margin:'10px 1px',}}>
            <InputLabel id="demo-simple-select-error-label">Escolha o endereço</InputLabel>
            <Select value={address} onChange={handleChange} style={{width:'320px'}}>
            
              <MenuItem value={1} >Endereço 1</MenuItem>
              <MenuItem value={2}>Endereço 2</MenuItem>
              <MenuItem value={3}>Endereço 3</MenuItem>
   
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
              <DoneIcon style={{padding:'10px'}}/>
              Finalizar Compra
            </Button>
          </BoxCheckout>
        </PanelCart>
      </Panel>
    </Container>
  );
}

export default CarrinhoCompras;
