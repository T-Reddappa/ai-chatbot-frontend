import { Routes, Route } from "react-router-dom";

import { CharacterSelection } from "./components/characters/CharacterSelection";
import "./App.css";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";

function App() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/characters" element={<CharacterSelection />} />
          {/* <Route path="/chat/:characterId" element={<ChatInterface />} /> */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
export default App;
