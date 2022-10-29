import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Set from './Set';
import Voice from './Voice';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Set />}></Route>
        <Route path="/voice" element={<Voice />}></Route>
      </Routes>
    </>
  );
}

export default App;
