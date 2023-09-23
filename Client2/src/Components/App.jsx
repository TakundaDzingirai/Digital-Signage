import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from '../React-Forms/Login'
import AutoSlider from '../SlidingComponents/AutoSlider'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCarousel from '../SlidingComponents/MyCarousel'


function App() {


  return (
    < div className='App'>
      <Router>
        <Routes>

          <Route
            path="/carousel/:screenId"
            element={<MyCarousel />} />
        </Routes>
      </Router>


    </div>

  )
}

export default App
