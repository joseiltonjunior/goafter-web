import { Header } from './components/Header'
import './globals.css'

import { Home } from './pages/Home'

function App() {
  return (
    <div className="h-[calc(100vh-70px)]">
      <Header />

      <Home />
    </div>
  )
}

export default App
