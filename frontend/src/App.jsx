import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Footer from "./components/Footer"
import Header from "./components/Header"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      <Footer />
    </Router>

  )
}

export default App
