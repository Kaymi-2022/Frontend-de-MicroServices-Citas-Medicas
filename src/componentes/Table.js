import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Para mostrar alertas
import { fetchUsuarios } from "./Service"; // Asegúrate de tener estos métodos en el api.js

const Table = ({ activeEntity }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar el loading

  useEffect(() => {
    // Limpiar el estado de los datos cuando cambia la entidad activa
    setData([]);
    setLoading(true);

    // Cargar los datos según la entidad activa
    const loadData = async () => {
      try {
        let response;
        switch (activeEntity) {
          case "usuarios":
            response = await fetchUsuarios(); // Llama la API para usuarios
            break;
          case "medicos":
            //response = await fetchMedicos(); // Llama la API para médicos
            break;
          case "especialistas":
            //response = await fetchEspecialistas(); // Llama la API para especialistas
            break;
          case "horarios":
            //response = await fetchHorarios(); // Llama la API para horarios
            break;
          default:
            setLoading(false);
            return;
        }

        setData(response);
        setLoading(false);
      } catch (error) {
        Swal.fire("Error", `No se pudo cargar los datos de ${activeEntity}`, "error");
        setLoading(false);
      }
    };

    loadData();
  }, [activeEntity]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  // Renderiza la tabla según la entidad activa
  const renderTable = () => {
    switch (activeEntity) {
      case "usuarios":
        return renderUsuarios();
      case "medicos":
        return renderMedicos();
      case "especialistas":
        return renderEspecialistas();
      case "horarios":
        return renderHorarios();
      default:
        return <div>No se ha seleccionado una entidad válida.</div>;
    }
  };

  const renderUsuarios = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.nombre}</td>
            <td>{usuario.email}</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderMedicos = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Especialidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((medico) => (
          <tr key={medico.id}>
            <td>{medico.nombre}</td>
            <td>{medico.especialidad}</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderEspecialistas = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Área de Especialización</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((especialista) => (
          <tr key={especialista.id}>
            <td>{especialista.nombre}</td>
            <td>{especialista.area}</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderHorarios = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Día</th>
          <th>Hora de Inicio</th>
          <th>Hora de Fin</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((horario) => (
          <tr key={horario.id}>
            <td>{horario.dia}</td>
            <td>{horario.horaInicio}</td>
            <td>{horario.horaFin}</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return <div>{renderTable()}</div>;
};

export default Table;
