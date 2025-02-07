import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button style={{
    marginTop: "20px",
    padding: "10px 300px",
    border: "none",
    backgroundColor: "#90ee90",
    color: "#333",
    fontSize: "1rem",
    fontWeight: "900",
    cursor: "pointer",
    borderRadius: "5px",
    left:"20px"
}} onClick={() => loginWithRedirect()}>Login / SignUp</button>;
};

export default LoginButton;