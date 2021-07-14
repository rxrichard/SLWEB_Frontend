import React from "react";
import { ToastyContainer } from "./components/toasty";

import Main from "./router/main";

class App extends React.Component {
  render() {
    return (
      <>
        <ToastyContainer />
        <Main />
      </>
    );
  }
}

export default App;
