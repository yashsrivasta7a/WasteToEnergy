import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { IoMdLogOut } from "react-icons/io";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <span style={{ cursor: 'pointer', marginTop:'2rem' }} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <IoMdLogOut size={45} fill="#414141" />
    </span>
  );
};

export default LogoutButton;