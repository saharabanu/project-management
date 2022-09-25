import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Login from './pages/Login/Login';


function App() {
  return (
   <>
    <Router>
  <Routes>
    <Route path="/" element={<Login/>}/>
    {/* <Route path="/nav" element={<Navigation/>}/>
    <Route path="/projects" element={<Projects/>}/>
    <Route path="/teamsHome" element={<TeamsHome/>}/> */}
    <Route path="*" element={<NotFound/>}/>


   
  </Routes>
</Router>
   </>
  );
}

export default App;
