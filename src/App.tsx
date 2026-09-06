import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Result from "./components/Result.js"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import NegotiationCard from './components/NegotiationCard.js'

function App() {

  return (


      <Routes>
        <Route path="/" element={<Result />} />
        <Route path="/negotiationcard" element={<NegotiationCard />} />
      </Routes>
  )
}

export default App