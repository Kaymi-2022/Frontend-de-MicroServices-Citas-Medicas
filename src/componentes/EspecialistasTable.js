import React, { useEffect, useState } from 'react';
import { fetchEspecialistas, createEspecialista, updateEspecialista, deleteEspecialista } from './Service';

function EspecialistaList({ token }) {
  const [especialistas, setEspecialistas] = useState([]);
  const [selectedEspecialista, setSelectedEspecialista] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEspecialistas(token);
        setEspecialistas(data);
      } catch (error) {
        console.error('Error al obtener los especialistas:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleCreate = async (newEspecialista) => {
    try {
      const createdEspecialista = await createEspecialista(token, newEspecialista);
      setEspecialistas([...especialistas, createdEspecialista]);
    } catch (error) {
      console.error('Error al crear el especialista:', error);
    }
  };

  const handleUpdate = async (updatedEspecialista) => {
    try {
      const updated = await updateEspecialista(token, updatedEspecialista);
      setEspecialistas(
        especialistas.map((especialista) =>
          especialista.id === updated.id ? updated : especialista
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar el especialista:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEspecialista(token, id);
      setEspecialistas(especialistas.filter((especialista) => especialista.id !== id));
    } catch (error) {
      console.error('Error al eliminar el especialista:', error);
    }
  };

  return (
    <div className="especialista-list">
      <h2>Especialistas</h2>
      <button onClick={() => setIsEditing(true)}>Nuevo Especialista</button>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {especialistas.map((especialista) => (
            <tr key={especialista.id}>
              <td>{especialista.nombre}</td>
              <td>{especialista.estado ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button onClick={() => { setSelectedEspecialista(especialista); setIsEditing(true); }}>Editar</button>
                <button onClick={() => handleDelete(especialista.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="modal">
          <h3>{selectedEspecialista ? 'Editar Especialista' : 'Crear Especialista'}</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const especialistaData = {
                ...selectedEspecialista,
                nombre: e.target.nombre.value,
                estado: e.target.estado.checked ? 1 : 0,
              };
              if (selectedEspecialista) {
                handleUpdate(especialistaData);
              } else {
                handleCreate(especialistaData);
              }
            }}
          >
            <input type="text" name="nombre" defaultValue={selectedEspecialista?.nombre || ''} placeholder="Nombre" />
            <label>
              <input type="checkbox" name="estado" defaultChecked={selectedEspecialista?.estado === 1} />
              Activo
            </label>
            <button type="submit">{selectedEspecialista ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EspecialistaList;
