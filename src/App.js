import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Alteração na importação
import Singup from './components/singup';
import Login from './components/login';
import PasswordRecovery from './components/forgotPassword';
import Dashboard from './components/dashboard';
import DashboardOrientador from './components/dashboardorientador';
import AdminDashboard from './components/dashboardadm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route path="/signup" element={<Singup />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/forgotPassword" element={<PasswordRecovery />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardOrientador" element={<DashboardOrientador />} />
          <Route path="/dashboardadm" element={<AdminDashboard />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;