import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Worksheet from './Worksheet/WsIndex';

function App() {



  return (
    <Routes>
      <Route path="/" element={<Worksheet />} />
    </Routes>
  );
}

export default App;
