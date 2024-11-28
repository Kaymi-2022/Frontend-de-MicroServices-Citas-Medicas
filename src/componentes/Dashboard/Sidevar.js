import React, { useState } from 'react';
import { SearchInput } from './SearchInput';
import MenuLink from './MenuLink';
import '../../styles/Dash.css';
import logo from '../../images/gestion-user.png';


function Sidebar() {
  // Estado para controlar si el menú está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Estado para almacenar el texto de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Elementos del menú
  const menuItems = [
    { icon: 'fa-person', label: 'Usuarios' },
    { icon: 'fa-hospital-user', label: 'Especialistas' },
    { icon: 'fa-user-doctor', label: 'Medicos' },
    { icon: 'fa-clock', label: 'Horarios' },
    { icon: 'fa-envelope', label: 'Emails' },
  ];

  // Filtrar los elementos del menú según el texto de búsqueda
  const filteredMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para abrir/cerrar el menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`menu-dashboard ${isOpen ? 'open' : ''}`}>
      {/* TOP MENU */}
      <div className="top-menu">
        <div className="logo">
          <img src={logo} alt="Logo" />
          {isOpen && <span>Sistema Citas</span>}
        </div>
        <div className="toggle" onClick={toggleMenu}>
          <i className={`bx ${isOpen ? 'bx-x' : 'bx-menu'}`}></i>
        </div>
      </div>
      <SearchInput isOpen={isOpen} onSearch={setSearchTerm} />
      {/* MENU LINKS */}
      <div className="menu">
        {filteredMenuItems.map((item, index) => (
          <MenuLink key={index} icon={item.icon} label={item.label} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
