import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom"; // If using React Router

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate(); // Get navigation function

  const handleLogin = (path) => {
    loginWithRedirect({
      redirectUri: `${window.location.origin}${path}`,
    });
  };

  return (
    <div style={{
      display: "flex",
    }}>
      <button style={{
        margin: '1rem auto',
        padding: '20px',
        width: '40%',
        textAlign: 'center'
      }}
        onClick={() => handleLogin("/dashboard")}
      >
        Login / SignUp
      </button>
      <button style={{
        margin: '1rem auto',
        padding: '20px',
        width: '40%',
        textAlign: 'center'
      }}
        onClick={() => handleLogin("/vendor")}
      >
        Login/SignUp for Vendors
      </button>
    </div>
  );
};

export default LoginButton;
