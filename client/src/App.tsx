

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import StudentProfiles from './components/StudentProfiles/StudentProfiles';




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
