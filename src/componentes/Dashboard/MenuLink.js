import React from 'react';

function MenuLink({ icon, label }) {
  return (
    <div className="enlace">
      <i className={`fa-solid ${icon}`}></i>
      <span>{label}</span>
    </div>
  );
}

export default MenuLink;
