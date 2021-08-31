import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { ToastyContainer } from "./components/toasty";
import { PALETTE_RED_PRIMARY, PALETTE_GREY_PRIMARY } from "./misc/colors";
import { ptBR } from "@material-ui/data-grid";

import Main from "./router/main";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastyContainer />
      <Main />
    </ThemeProvider>
  );
};

export default App;

const theme = createMuiTheme(
  {
    palette: {
      primary: PALETTE_RED_PRIMARY,
      secondary: PALETTE_GREY_PRIMARY,
    },
  },
  ptBR
);