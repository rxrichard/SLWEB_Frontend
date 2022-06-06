import React from "react";

import { Panel } from "../../components/commom_in";
import { Title, Box } from "./styles.js";

function Ajuda() {
  return (
    <Panel>
      <Box>
        <Title>Formulários</Title>

        <iframe
          src="https://drive.google.com/embeddedfolderview?id=1ZmENwZF06DF4SbA77Xoum6qTbEGEhXtL#list"
          width="100%"
          height="100%"
          frameborder="0"
        ></iframe>
      </Box>
      <Box>
        <Title>Treinamentos</Title>

        <iframe
          src="https://drive.google.com/embeddedfolderview?id=1DsYDFYasyP8vkf2fQRxaugPNC4FTRdQd#list"
          width="100%"
          height="100%"
          frameborder="0"
        ></iframe>
      </Box>
      <Box>
        <Title>Simuladores</Title>

        <iframe
          src="https://drive.google.com/embeddedfolderview?id=1HXFN_0ALK6QVhggerXoP5El4fkuS3Diy#list"
          width="100%"
          height="100%"
          frameborder="0"
        ></iframe>
      </Box>
      <Box>
        <Title>Marketing</Title>

        <iframe
          src="https://drive.google.com/embeddedfolderview?id=16VogTpAM61p4qlMYkbqPs9CszQ4J8YEQ#list"
          width="100%"
          height="100%"
          frameborder="0"
        ></iframe>
      </Box>
    </Panel>
  );
}

export default Ajuda;
