import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsCoin } from "react-icons/bs";
import { SiConvertio } from "react-icons/si";
import { FaBook } from "react-icons/fa";
import LogoutButton from "./Logout";

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState("Dashboard");

  return (
    <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="navbar">
      <motion.div/>
      <NavLink to="/dashboard" onClick={() => setSelectedTab("Dashboard")}>
        <motion.div whileHover={{ backgroundColor: "#8CD381", borderRadius: "15px", padding: "3px" }} whileTap={{ scale: 0.9 }}>
          <SiConvertio size={45} fill="#414141" />
        </motion.div>
      </NavLink>
      <NavLink to="/dashboard" onClick={() => setSelectedTab("Dashboard")}>
        <motion.div whileHover={{ backgroundColor: "#8CD381", borderRadius: "15px", padding: "3px" }} whileTap={{ scale: 0.9 }}>
          <FaChartLine size={45} fill="#414141" />
        </motion.div>
      </NavLink>
      <NavLink to="/Education" onClick={() => setSelectedTab("Education")}>
        <motion.div whileHover={{ backgroundColor: "#8CD381", borderRadius: "15px", padding: "3px" }} whileTap={{ scale: 0.9 }}>
          <FaBook size={45} fill="#414141" />
        </motion.div>
      </NavLink>
      <NavLink to="/coins" onClick={() => setSelectedTab("Coins")}>
        <motion.div whileHover={{ backgroundColor: "#8CD381", borderRadius: "15px", padding: "3px" }} whileTap={{ scale: 0.9 }}>
          <BsCoin size={45} fill="#414141" />
        </motion.div>
      </NavLink>
      <NavLink to="/profile" onClick={() => setSelectedTab("Profile")}>
        <motion.div whileHover={{ backgroundColor: "#8CD381", borderRadius: "15px", padding: "3px" }} whileTap={{ scale: 0.9 }}>
          <CgProfile className="profile-icon" size={45} fill="#414141" stroke="#414141" />
        </motion.div>
      </NavLink>
      <LogoutButton />
    </motion.nav>
  );
};

export default Navbar;
