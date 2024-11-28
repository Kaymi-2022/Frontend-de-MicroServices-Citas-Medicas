import React, { useEffect, useState } from 'react';
import { fetchMedicos, createMedico, updateMedico, deleteMedico } from './Service';

function MedicosList({ token }) {
  const [medicos, setMedicos] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState(null);  // Para editar
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Obtener médicos desde la API
    const fetchData = async () => {
      try {
        const data = await fetchMedicos(token);
        setMedicos(data);
      } catch (error) {
        console.error('Error al obtener los médicos:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleCreate = async (newMedico) => {
    try {
      const createdMedico = await createMedico(token, newMedico);
      setMedicos([...medicos, createdMedico]);
    } catch (error) {
      console.error('Error al crear el médico:', error);
    }
  };

  const handleUpdate = async (updatedMedico) => {
    try {
      const updated = await updateMedico(token, updatedMedico);
      setMedicos(medicos.map((medico) => (medico.idMedico === updated.idMedico ? updated : medico)));
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar el médico:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedico(token, id);
      setMedicos(medicos.filter((medico) => medico.idMedico !== id));
    } catch (error) {
      console.error('Error al eliminar el médico:', error);
    }
  };

  return (
    <div className="medicos-list">
      <h2>Médicos</h2>
      <button onClick={() => setIsEditing(true)}>Nuevo Médico</button>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map((medico) => (
            <tr key={medico.idMedico}>
              <td>{medico.nombre}</td>
              <td>{medico.especialidad?.nombre || 'No asignada'}</td>
              <td>{medico.estado === 1 ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button onClick={() => { setSelectedMedico(medico); setIsEditing(true); }}>Editar</button>
                <button onClick={() => handleDelete(medico.idMedico)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="modal">
          <h3>{selectedMedico ? 'Editar Médico' : 'Crear Médico'}</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const medicoData = {
                ...selectedMedico,
                nombre: e.target.nombre.value,
                especialidad: { id: e.target.especialidad.value },
                estado: e.target.estado.checked ? 1 : 0,
              };
              if (selectedMedico) {
                handleUpdate(medicoData);
              } else {
                handleCreate(medicoData);
              }
            }}
          >
            <input type="text" name="nombre" defaultValue={selectedMedico?.nombre || ''} placeholder="Nombre" />
            <input type="text" name="especialidad" defaultValue={selectedMedico?.especialidad?.id || ''} placeholder="ID Especialidad" />
            <label>
              <input type="checkbox" name="estado" defaultChecked={selectedMedico?.estado === 1} />
              Activo
            </label>
            <button type="submit">{selectedMedico ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default MedicosList;
