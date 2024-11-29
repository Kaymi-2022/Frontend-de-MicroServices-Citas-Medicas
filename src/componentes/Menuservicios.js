// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Menuservicios.css';

function Menuservicios() {
  const nombreUsuario = localStorage.getItem('nombre') || 'Invitado';
  const rolUsuario = localStorage.getItem('rol') || 'GUEST';
  const navigate = useNavigate();

  const servicios = serviciosPorRol[rolUsuario] || [];

  const handleLogout = () => {
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
        window.location.reload();
      }
    });
  };

  const handleCardClick = (ruta) => {
    navigate(ruta);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h2>Bienvenido, {nombreUsuario}</h2>
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </header>

      {/* Body */}
      <div className="dashboard-body">
        <h3>Accesos Rápidos</h3>
        <div className="card-container">
          {servicios.map((servicio, index) => (
            <div
              className="card"
              key={index}
              onClick={() => handleCardClick(servicio.ruta)}
            >
              <h4>{servicio.titulo}</h4>
              <p>{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2024 UTP. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

// Servicios permitidos por rol con sus rutas
const serviciosPorRol = {
  ADMIN: [
    { titulo: "Gestion de Personal", descripcion: "Administracion: usuarios especialidades doctores horarios", ruta: "/servicio4" },
    { titulo: "Configuración", descripcion: "Configura los parámetros del sistema", ruta: "/servicio3" },
  ],
  USER: [
    { titulo: "Perfil", descripcion: "Edita tu información personal", ruta: "/servicio4" },
    { titulo: "Historial", descripcion: "Consulta tu historial de actividades", ruta: "/servicio5" },
  ],
  GUEST: [
    { titulo: "Información Pública", descripcion: "Consulta información pública de la plataforma", ruta: "/servicio5" },
  ],
};

export default Menuservicios;
