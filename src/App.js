import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Alteração na importação
import Singup from './components/singup';
import Login from './components/login';
import PasswordRecovery from './components/forgotPassword';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route path="/singup" element={<Singup />} /> 
          <Route path="/" element={<Login />} /> 
          <Route path="/forgotPassword" element={<PasswordRecovery />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
