// import { Header } from './components/Header'
// import { Modal } from './components/Modal'
import { Outlet } from 'react-router-dom'
import './globals.css'
import { Layout } from './components/Layout'

// import { Home } from './pages/Home'

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
    // <div className="h-[calc(100vh-70px)]">
    //   <Modal />

    //   <Header />

    //   <Home />
    // </div>
  )
}

export default App
