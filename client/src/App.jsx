
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './home';
import Transcript from './transcript';

function App() {
  return (
    <Router> 
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/transcript" element={<Transcript />} />
      </Routes>
    </Router>
  );
}

export default App;
