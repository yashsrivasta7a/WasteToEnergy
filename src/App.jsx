import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Landing from "./Pages/Landing";
import Education from "./Pages/Education";
import Coins from "./Pages/Coins";
import Profile from "./Pages/Profile";
import Chatbot from "./components/Chatbot";
import VendorDashboard from "./Pages/VendorDashboard";


function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      <Router>
        <Routes>
          {isAuthenticated ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
          <Route path="/education" element={<Education />} />
          <Route path="/coins" element={<Coins />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/vendor" element={<VendorDashboard />} />
        </Routes>
      </Router>
      <Chatbot />
    </div>
  );
}

export default App;

