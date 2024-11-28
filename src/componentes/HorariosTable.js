import React, { useEffect, useState } from 'react';
import { fetchHorarios, createHorario, updateHorario, deleteHorario } from './Service';

function HorariosList({ token }) {
  const [horarios, setHorarios] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Obtener horarios desde la API
    const fetchData = async () => {
      try {
        const data = await fetchHorarios(token);
        setHorarios(data);
      } catch (error) {
        console.error('Error al obtener los horarios:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleCreate = async (newHorario) => {
    try {
      const createdHorario = await createHorario(token, newHorario);
      setHorarios([...horarios, createdHorario]);
    } catch (error) {
      console.error('Error al crear el horario:', error);
    }
  };

  const handleUpdate = async (updatedHorario) => {
    try {
      const updated = await updateHorario(token, updatedHorario);
      setHorarios(horarios.map((horario) => (horario.id === updated.id ? updated : horario)));
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar el horario:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHorario(token, id);
      setHorarios(horarios.filter((horario) => horario.id !== id));
    } catch (error) {
      console.error('Error al eliminar el horario:', error);
    }
  };

  return (
    <div className="horarios-list">
      <h2>Horarios</h2>
      <button onClick={() => setIsEditing(true)}>Nuevo Horario</button>

      <table>
        <thead>
          <tr>
            <th>Día</th>
            <th>Hora</th>
            <th>Estado Cita</th>
            <th>Médico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.id}>
              <td>{horario.dia}</td>
              <td>{horario.time}</td>
              <td>{horario.idestadoCita.descripcion}</td>
              <td>{horario.medicos.nombre}</td>
              <td>
                <button onClick={() => { setSelectedHorario(horario); setIsEditing(true); }}>Editar</button>
                <button onClick={() => handleDelete(horario.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="modal">
          <h3>{selectedHorario ? 'Editar Horario' : 'Crear Horario'}</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const horarioData = {
                ...selectedHorario,
                dia: e.target.dia.value,
                time: e.target.time.value,
                idestadoCita: { idestadoCita: e.target.estadoCita.value },
                medicos: { idMedico: e.target.medico.value },
              };
              if (selectedHorario) {
                handleUpdate(horarioData);
              } else {
                handleCreate(horarioData);
              }
            }}
          >
            <input type="date" name="dia" defaultValue={selectedHorario?.dia || ''} placeholder="Día" />
            <input type="time" name="time" defaultValue={selectedHorario?.time || ''} placeholder="Hora" />
            <input type="text" name="estadoCita" defaultValue={selectedHorario?.idestadoCita?.idestadoCita || ''} placeholder="Estado Cita" />
            <input type="text" name="medico" defaultValue={selectedHorario?.medicos?.idMedico || ''} placeholder="ID Médico" />
            <button type="submit">{selectedHorario ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HorariosList;
