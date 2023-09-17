import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from '../React-Forms/Login'
import AutoSlider from '../SlidingComponents/AutoSlider'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    < div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/content"
            element={<AutoSlider />} />
        </Routes>
      </Router>
    </div>

  )
}

export default App
