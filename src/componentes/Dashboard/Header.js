import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../styles/Header.css';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import logo from '../../images/gestion-user.png';

function Header() {
  const [menuDesplegable, setMenuDesplegable] = useState(false);

  const manejarLogout = () => {
    // Eliminar datos del usuario en localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Vas a cerrar sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/login';
      }
    });

  };

  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} alt="Logo" className="header-logo-image" />
        <span className="header-title">Hospital Luis Negreiros</span>
      </div>

      <div className="header-icons">
        <FaBell className="header-icon" title="Notificaciones" />
        <div className="header-profile">
          <FaUserCircle
            className="header-icon"
            title="Perfil"
            onClick={() => setMenuDesplegable(!menuDesplegable)}
          />
          {menuDesplegable && (
            <div className="header-dropdown">
              <button className="header-dropdown-item" onClick={manejarLogout}>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

