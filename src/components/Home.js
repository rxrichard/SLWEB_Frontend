import React from "react";
import { Panel } from "./commom_in";
import { Slider, Slide, Caption } from "react-materialize";

import brown from "../assets/abstract_coffe_brown.png";
import red from "../assets/abstract_coffe_red.png";
import yellow from "../assets/abstract_coffe_yellow.png";
import slide1 from "../assets/slide_1.jpg";

class Home extends React.Component {
  render() {
    return (
      <Panel>
        <Slider
          fullscreen={false}
          options={{
            duration: 500,
            height: 400,
            indicators: true,
            interval: 6000,
          }}
        >
          <Slide image={<img alt="" src={red} />}>
            <Caption placement="center">
              <h3>SLAplic web chegou!</h3>
              <h5 className="light grey-text text-lighten-3">
                Início dos testes abertos ao público.
              </h5>
            </Caption>
          </Slide>
          <Slide image={<img alt="" src={yellow} />}>
            <Caption placement="left">
              <h3>Solicitação de máquinas</h3>
              <h5 className="light grey-text text-lighten-3">
                Faça diretamente por aqui a solicitação de uma nova máquina.
              </h5>
            </Caption>
          </Slide>
          <Slide image={<img alt="" src={brown} />}>
            <Caption placement="right">
              <h3>Acesse de qualquer computador</h3>
              <h5 className="light grey-text text-lighten-3">
                Um navegador e acesso à internet é tudo que você precisa!
              </h5>
            </Caption>
          </Slide>
          <Slide image={<img alt="" src={slide1} />}>
            <Caption placement="bottom">
              <h3>Quanto mais melhor!</h3>
              <h5 className="light grey-text text-lighten-3">
                Todas as funções do SLAplic que você já conhece e mais um
                pouco...
              </h5>
            </Caption>
          </Slide>
        </Slider>
      </Panel>
    );
  }
}

export default Home;
