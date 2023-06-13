import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainIntro from './MainIntro.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainIntro/>
    </>
  )
}

export default App
