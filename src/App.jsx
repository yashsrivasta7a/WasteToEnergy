import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Landing from "./Pages/Landing";
import Education from "./Pages/Education";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<Landing />} />
        )}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
        <Route path="/education" element={<Education/>}/>
      </Routes>
    </Router>
  );
}

export default App;
