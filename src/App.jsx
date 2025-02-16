import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient.jsx";

import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Match from "./pages/Match.jsx";
import Chat from "./pages/Chat.jsx";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/match" element={<Match />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
