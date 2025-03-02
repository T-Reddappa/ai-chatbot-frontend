import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <>
      {/* <h3>AI-chatbot</h3> */}
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
