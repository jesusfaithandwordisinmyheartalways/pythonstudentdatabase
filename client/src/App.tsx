

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import StudentProfiles from './components/StudentProfiles/StudentProfiles';
import Login from './components/Login/Login';



const App:React.FC = () => {

  return (
    <>

    <Router>

    <Routes>

       <Route path="/" element={<StudentProfiles />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>


    </Router>
    
    
    
    </>
  )
}

export default App;
