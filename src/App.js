// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import fotoLogin from './images/LOGO-LOGIN.jpeg';
import NavegacionTabs from './componentes/NavegacionTabs';
import FormularioIngreso from './componentes/FormularioIngreso';
import FormularioRegistro from './componentes/FormularioRegistro';
//import GestionUsuarios from './components/GestionUsuarios';
import Menuservicios from './componentes/Menuservicios';
import Dashboard from './componentes/Dashboard';
import Table from './componentes/Table';
import Servicio3 from './componentes/Servicio3';
import Servicio4 from './componentes/Servicio4';
import Servicio5 from './componentes/Servicio5';

import './index.css';

function App() {
  const [pestañaActiva, setPestañaActiva] = useState('ingreso');
  
  // Verificar si el usuario está autenticado
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  // Función para cambiar la pestaña activa
  const cambiarPestaña = (pestaña) => {
    setPestañaActiva(pestaña);
  };

  return (
    <Router>
      <div className="contenedor">
        {isAuthenticated ? (
          // Mostrar el Dashboard y las rutas de servicios si el usuario está autenticado
          <Routes>
            <Route path="/Menuservicios" element={<Menuservicios />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/servicio1" element={<Table />} />
            <Route path="/servicio3" element={<Servicio3 />} />
            <Route path="/servicio4" element={<Servicio4 />} />
            <Route path="/servicio5" element={<Servicio5 />} />
            <Route path="*" element={<Menuservicios />} /> {/* Redirigir a Dashboard por defecto */}
          </Routes>
        ) : (
          // Mostrar los formularios de ingreso/registro si el usuario no está autenticado
          <div className="hijo">
            <div className="contenedor-formulario">
              <NavegacionTabs pestañaActiva={pestañaActiva} onTabClick={cambiarPestaña} />
              <div className="contenido-pestaña">
                {pestañaActiva === 'registro' ? <FormularioRegistro /> : <FormularioIngreso />}
              </div>
            </div>
            <div className="info-login">
              <img
                src={fotoLogin}
                alt="UTP+Class"
                height="520px"
                width="380px"
              />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
