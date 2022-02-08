import React from 'react';

import { Slider, Slide, Caption } from "react-materialize";
import { Button } from '@material-ui/core'

import brown from "../../assets/abstract_coffe_brown.png";
// import red from "../../assets/abstract_coffe_red.png";
// import yellow from "../../assets/abstract_coffe_yellow.png";
// import slide1 from "../../assets/slide_1.jpg";

function News({ onOpen }) {
  return (
    <Slider
      fullscreen={false}
      options={{
        duration: 500,
        height: 400,
        indicators: true,
        interval: 6000,
      }}
    >
      <Slide image={<img alt="" src={brown} />}>
        <Caption
          placement="right"
        >
          <h3>Acesse de qualquer computador</h3>
          <h5 className="light grey-text text-lighten-3">
            Um navegador e acesso à internet é tudo que você precisa!
          </h5>
          <Button
            style={{
              margin: '100px 0px 0px 0px'
            }}
            onClick={onOpen}
            variant='contained'
            color='secondary'
          >
            Acordo
          </Button>
        </Caption>
      </Slide>
    </Slider>
  );
}

export default News;