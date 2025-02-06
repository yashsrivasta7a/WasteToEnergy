import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./Pages/Dashboard";
import Landing from "./Pages/Landing";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      {isAuthenticated ? <Dashboard /> : <Landing />}
    </>
  );
}

export default App;
