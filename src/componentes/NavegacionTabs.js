// components/NavegacionTabs.js
import React from 'react';

function NavegacionTabs({ pestañaActiva, onTabClick }) {
  return (
    <ul className="grupo-pestañas">
      <li className={`pestaña ${pestañaActiva === 'registro' ? 'activa' : ''}`}>
        <button onClick={() => onTabClick('registro')}>Registrarse</button>
      </li>
      <li className={`pestaña ${pestañaActiva === 'ingreso' ? 'activa' : ''}`}>
        <button onClick={() => onTabClick('ingreso')}>Ingresar</button>
      </li>
    </ul>
  );
}

export default NavegacionTabs;
