import React, { useEffect, useState } from 'react';
import { fetchEspecialidades, createEspecialidad, updateEspecialidad, deleteEspecialidad } from './Service';

function EspecialidadList({ token }) {
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null); // Para la vista previa de la foto
  const [photoFileName, setPhotoFileName] = useState(null); // Para almacenar solo el nombre del archivo

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEspecialidades(token);
        setEspecialidades(data);
      } catch (error) {
        console.error('Error al obtener las especialidades:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleCreate = async (newEspecialidad) => {
    try {
      const createdEspecialidad = await createEspecialidad(token, newEspecialidad);
      setEspecialidades([...especialidades, createdEspecialidad]);
    } catch (error) {
      console.error('Error al crear la especialidad:', error);
    }
  };

  const handleUpdate = async (updatedEspecialidad) => {
    try {
      const updated = await updateEspecialidad(token, updatedEspecialidad);
      setEspecialidades(
        especialidades.map((especialidad) =>
          especialidad.id === updated.id ? updated : especialidad
        )
      );
      setIsEditing(false);
      setPhotoPreview(null); // Resetear la vista previa de la foto
      setPhotoFileName(null); // Resetear el nombre del archivo
    } catch (error) {
      console.error('Error al actualizar la especialidad:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEspecialidad(token, id);
      setEspecialidades(especialidades.filter((especialidad) => especialidad.id !== id));
    } catch (error) {
      console.error('Error al eliminar la especialidad:', error);
    }
  };

  // Función para manejar el cambio del archivo de la foto
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoFileName(file.name); // Guardar solo el nombre del archivo
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result); // Establecer la vista previa de la imagen
      };
      reader.readAsDataURL(file); // Leer la imagen como URL
    }
  };

  return (
    <div className="especialidad-list">
      <h2>Especialidades</h2>
      <button onClick={() => setIsEditing(true)}>Nueva Especialidad</button>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map((especialidad) => (
            <tr key={especialidad.id}>
              <td>{especialidad.nombre}</td>
              <td>{especialidad.estado === 1 ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button onClick={() => { setSelectedEspecialidad(especialidad); setIsEditing(true); }}>Editar</button>
                <button onClick={() => handleDelete(especialidad.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="modal">
          <h3>{selectedEspecialidad ? 'Editar Especialidad' : 'Crear Especialidad'}</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const especialidadData = {
                ...selectedEspecialidad,
                nombre: e.target.nombre.value,
                estado: e.target.estado.checked ? 1 : 0,
                foto: photoFileName, // Solo se envía el nombre del archivo
              };
              if (selectedEspecialidad) {
                handleUpdate(especialidadData);
              } else {
                handleCreate(especialidadData);
              }
            }}
          >
            <input type="text" name="nombre" defaultValue={selectedEspecialidad?.nombre || ''} placeholder="Nombre" />
            <label>
              <input type="checkbox" name="estado" defaultChecked={selectedEspecialidad?.estado === 1} />
              Activo
            </label>
            
            {/* Campo para cargar la foto */}
            <input type="file" name="foto" onChange={handleFileChange} accept="image/*" />
            
            {/* Vista previa de la imagen cargada */}
            {photoPreview && <img src={photoPreview} alt="Vista previa" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />}
            
            <button type="submit">{selectedEspecialidad ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EspecialidadList;
