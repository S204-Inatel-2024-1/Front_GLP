import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import PasswordRecovery from './components/forgotPassword'; // Corrigido o nome do componente
import Dashboard from './components/dashboard';
import DashboardOrientador from './components/dashboardorientador';
import AdminDashboard from './components/dashboardadm';
import ProjectCardsPage from './components/projects';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/passwordRecovery" element={<PasswordRecovery />} /> {/* Corrigido o path */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboardOrientador" element={<DashboardOrientador />} />
                    <Route path="/dashboardadm" element={<AdminDashboard />} />
                    <Route path="/projects" element={<ProjectCardsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
