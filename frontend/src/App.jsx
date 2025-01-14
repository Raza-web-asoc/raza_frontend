import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Footer from "./components/Footer"
import Header from "./components/Header"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Match from "./pages/Match"
import Chat from "./pages/Chat"

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="profile" element={<Profile/>} />
          <Route path="/match" element={<Match/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
      <Footer />
    </Router>

  )
}

export default App
