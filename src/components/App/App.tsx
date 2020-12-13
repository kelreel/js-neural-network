import React from 'react';
import Header from './Header/Header';
import './App.css';
import VariantSelector from '../Variant/VariantSelector/VariantSelector';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <VariantSelector />
      </main>
    </div>
  );
}

export default App;
