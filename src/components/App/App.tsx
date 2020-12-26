import React from "react";
import Header from "./Header/Header";
import "./App.css";
import VariantSelector from "../variant/VariantSelector/VariantSelector";
import Network from "./Network/Network";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <VariantSelector />
        <Network />
      </main>
    </div>
  );
}

export default App;
