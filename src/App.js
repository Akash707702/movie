import React from 'react'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Newmovie from './Components/Newmovie';
const App = () => {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
           <Route path="/movie" element={<Newmovie></Newmovie>}></Route>
        </Routes>
      </BrowserRouter>

     
  
  );
}

export default App

