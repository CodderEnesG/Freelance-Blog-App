import React, { useState, useContext, useEffect } from "react";
import "./Navbar.css";
import { FiPhone } from "react-icons/fi";
import {
  AiOutlineInstagram,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import Sidebar from "../sidebar";
import DarkModeToggle from "react-dark-mode-toggle";
import axios from "axios";
import { DarkModeContext } from "../../context/DarkModeContext";

const Navbar = () => {
  const [footer, setFooter] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const handleClickDark = () => {
    toggleDarkMode();
  };
  const { darkMode, toggleDarkMode, DarkModeColor, DarkModeWhite } =
    useContext(DarkModeContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/footer?populate=*`
        );

        setFooter(data?.data?.data);
      } catch (error) {
        setFooter("error");
      }
    }

    fetchData();
  }, []);

  return (
    <div className="navbar-container">
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

      <div className="navbar_upper">
        <a href="tel:05300000000" className="navbar_upper_tel">
          <FiPhone className="navbar_upper_tel_icon" />{" "}
          {footer?.attributes?.telefon}
        </a>
        <div className="navbar_upper_links">

          <a href="/" className="navbar_upper_link">
            <AiOutlineInstagram />
          </a>

        </div>
      </div>
      <div
        style={{ backgroundColor: darkMode ? DarkModeColor : "white" }}
        className="custom_navbar"
      >
        <button
          onClick={(e) => navigate("/")}
          style={{ color: darkMode ? DarkModeWhite : "black" }}
          className="navbar_name"
        >
          Şüheda Şen
        </button>
        <div className="navbar_links">
          <button className="navbar_link"></button>
          <button
            style={{ color: darkMode ? DarkModeWhite : "black" }}
            onClick={(e) => navigate("/")}
            className="navbar_link"
          >
            Anasayfa
          </button>
          <button
            style={{ color: darkMode ? DarkModeWhite : "black" }}
            onClick={(e) => navigate("/articles")}
            className="navbar_link"
          >
            Yazılarım
          </button>
          <button
            style={{ color: darkMode ? DarkModeWhite : "black" }}
            onClick={(e) => navigate("/testimonials")}
            className="navbar_link"
          >
            Yorumlar
          </button>
          <a
            style={{ color: darkMode ? DarkModeWhite : "black" }}
            onClick={(e) => navigate("/")}
            href="#about"
            className="navbar_link"
          >
            Hakkımda
          </a>
          <a
            style={{ color: darkMode ? DarkModeWhite : "black" }}
            onClick={(e) => navigate("/")}
            href="#address"
            className="navbar_link"
          >
            Adres
          </a>
        </div>
        <div className="navbar_theme_buttons">
          <DarkModeToggle
            onChange={handleClickDark}
            checked={darkMode ? true : false}
            size={50}
          />
        </div>

        <div
          style={{ color: darkMode ? "white" : DarkModeColor }}
          onClick={(e) => setSidebar((prevState) => !prevState)}
          className="sidebar_bars"
        >
          <AiOutlineBars />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
