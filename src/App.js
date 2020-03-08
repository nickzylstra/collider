import React from 'react';
import NumberShifter from './components/NumberShifter';
import Collider from './components/collider/Collider';
import './App.css';



function App() {

  return (
    <div className="App">
      <Collider />
      <NumberShifter />
    </div>
  );
}

export default App;
