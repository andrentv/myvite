import React from "react";
import { Routers } from "./routes";
import { Header } from "./pages/components/Header";

function App() {
  return (
    <>
      <Header />
      <Routers />
    </>
  );
}

export default App;
