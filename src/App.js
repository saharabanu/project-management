import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import useAuthCheck from './hooks/useAuthCheck';
import Login from './pages/Login/Login';
import Teams from './pages/Teams/Teams';



function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
		<div>Checking authentication....</div>
	) :(
   
    <Router>
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/teams" element={<PrivateRoute><Teams/></PrivateRoute>}/>

    
    <Route path="*" element={<NotFound/>}/>


   
  </Routes>
</Router>
   
  );
}

export default App;
