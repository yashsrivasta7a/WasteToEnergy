// src/components/Navbar.jsx
import { NavLink } from "react-router-dom"; // Import NavLink for routing
import { FaChartLine, FaHome, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsCoin } from "react-icons/bs";
import { SiConvertio } from "react-icons/si";
import LogoutButton from "./LogoutButton";



const Navbar = () => {
    return (
        <nav>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 36 34" fill="none">
                {/* Your SVG paths */}
            </svg>
            <NavLink activeClassName="active">
                <SiConvertio size={45} fill="#414141" />
            </NavLink>
            <NavLink onClick={() => handleNavClick("charts")} activeClassName="active">
                <FaChartLine size={45} fill="#414141" />
            </NavLink>
            <NavLink to={"/Education"} activeClassName="active">
                <FaBook size={45} fill="#414141" />
            </NavLink>
            <NavLink activeClassName="active">
                <BsCoin size={45} fill="#414141" />
            </NavLink>
            <NavLink activeClassName="active">
                <CgProfile className="profile-icon" size={45} fill="#414141" stroke="#414141" />
            </NavLink>
            <LogoutButton />
        </nav>
    );
};

export default Navbar;