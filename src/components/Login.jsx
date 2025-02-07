import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div style={{
      display:"flex",
    }} >
      <button style={{
        margin:'1rem auto',
        padding:'20px',
        width:'40%',
        textAlign:'center'
      }}
        onClick={() => loginWithRedirect({ redirectUri: "https://organic-waste-to-energy.vercel.app/dashboard" })}
      >
        Login / SignUp
      </button>
      <button style={{
        margin:'1rem auto',
        padding:'20px',
        width:'40%',
        textAlign:'center'
      }}
        onClick={() => loginWithRedirect({ redirectUri: "https://organic-waste-to-energy.vercel.app/vendor" })}
      >
        Login/SignUp for Vendors
      </button>
    </div>
  );
};

export default LoginButton;
