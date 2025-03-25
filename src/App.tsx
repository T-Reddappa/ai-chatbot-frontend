import { Routes, Route } from "react-router-dom";

import { CharacterSelection } from "./components/characters/CharacterSelection";
import "./App.css";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Home from "./components/Layout/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadAuthFromStorage } from "./store/slices/authSlice";
import PrivateRoute from "./components/privateRoute";
import Nudge from "./components/Layout/Nudge";
import CombinedWebSocketChat from "./components/chat/combinedChat";
import { toast } from "sonner";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAuthFromStorage());
    toast("hey welocme");
  }, []);

  return (
    <div className="max-h-[90vh]">
      <div>
        <Header />
      </div>
      <div className="bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 border border-white">
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/characters" element={<CharacterSelection />} />
          <Route
            path="/chat/:characterId"
            element={
              <PrivateRoute>
                <CombinedWebSocketChat />
              </PrivateRoute>
            }
          />
          <Route path="/nudge" element={<Nudge />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
export default App;
