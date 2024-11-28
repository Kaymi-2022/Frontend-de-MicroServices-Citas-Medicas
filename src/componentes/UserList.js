import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Usamos useNavigate

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();  // Usamos useNavigate

  useEffect(() => {
    // Aquí podrías cargar los usuarios desde una API, por ejemplo
  }, []);

  const handleClick = (userId) => {
    navigate(`/user/${userId}`);  // Usamos navigate() para redirigir
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map(user => (
          <li key={user.userId} onClick={() => handleClick(user.userId)}>
            {user.nombre} {user.apellido}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
