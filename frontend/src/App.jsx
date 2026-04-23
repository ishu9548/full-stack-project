import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Signup from "./component/Signup";
import OtpVerify from "./component/otp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/otp" element={<OtpVerify />} />
      </Routes>
    </Router>
  );
}

export default App;