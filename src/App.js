import React from "react";

import Routes from "./routes";
import GlobalStyles from "./styles/global";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes />
    </>
  );
}

export default App;
