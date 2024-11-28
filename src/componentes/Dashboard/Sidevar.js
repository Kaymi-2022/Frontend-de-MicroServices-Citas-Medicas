import React, { useState } from "react";
import { FaUsers, FaStethoscope, FaUserMd, FaClock } from "react-icons/fa";
import "../../styles/Dash.css";
import logo from "../../images/gestion-user.png";

const Sidebar = ({ activeEntity, setActiveEntity }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Función para abrir/cerrar el menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`menu-dashboard ${isOpen ? "open" : ""}`}>
      <div className="top-menu">
        <div className="logo">
          <img src={logo} alt="Logo" />
          {isOpen && <span>Sistema Citas</span>}
        </div>
        <div className="toggle" onClick={toggleMenu}>
          <i className={`bx ${isOpen ? "bx-x" : "bx-menu"}`}></i>
        </div>
      </div>
      <div className="menu">
        <li
          onClick={() => setActiveEntity("usuarios")}
          className={activeEntity === "usuarios" ? "active" : ""}
        >
          <div className="icono">
            <FaUsers />
          </div>
          <span>Usuarios</span>
        </li>

        <li
          onClick={() => setActiveEntity("medicos")}
          className={activeEntity === "medicos" ? "active" : ""}
        >
          <div className="icono">
            <FaUserMd />
          </div>
          <span>Médicos</span>
        </li>

        <li
          onClick={() => setActiveEntity("especialistas")}
          className={activeEntity === "especialistas" ? "active" : ""}
        >
          <div className="icono">
            <FaStethoscope />
          </div>
          <span>Especialistas</span>
        </li>

        <li
          onClick={() => setActiveEntity("horarios")}
          className={activeEntity === "horarios" ? "active" : ""}
        >
          <div className="icono">
            <FaClock />
          </div>
          <span>Horarios</span>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
