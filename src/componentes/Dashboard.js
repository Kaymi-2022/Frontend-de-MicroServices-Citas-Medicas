import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Sidebar from "./Dashboard/Sidevar";
import Header from "./Dashboard/Header";
import Footer from "./Dashboard/Footer";
import UsersTable from "./Table/UserTable";
import MedicosTable from "./MedicosTable";
import EspecialistasTable from "./EspecialistasTable";
import HorariosTable from "./HorariosTable";
import ModalAgregarUsuario from "./ModalAgregar"; // Modal de edición
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [activeEntity, setActiveEntity] = useState("usuarios"); // Estado para controlar qué tabla se muestra
  const [usuarios, setUsuarios] = useState([]); // Usuarios para mostrar
  const [medicos, setMedicos] = useState([]);
  const [especialistas, setEspecialistas] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Para mostrar el modal
  const [selectedEntity, setSelectedEntity] = useState(null); // Entidad seleccionada para editar

  // Función general para hacer fetch
  const fetchEntity = async (entity) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    let endpoint = "";

    // Definir la URL dependiendo de la entidad
    switch (entity.toLowerCase()) {
      case "usuarios":
        endpoint = "http://localhost:2222/gateway/gestionUsuarios/listar";
        break;
      case "medicos":
        endpoint = "http://localhost:2222/gateway/gestionMedicos/listar";
        break;
      case "especialistas":
        endpoint = "http://localhost:2222/gateway/gestionEspecialistas/listar";
        break;
      case "horarios":
        endpoint = "http://localhost:2222/gateway/gestionHorarios/listar";
        break;
      default:
        Swal.fire("Error", "Entidad no reconocida.", "error");
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener los ${entity}.`);
      }

      const data = await response.json();
      switch (entity) {
        case "usuarios":
          setUsuarios(data.body || []);
          break;
        case "medicos":
          setMedicos(data.body || []);
          break;
        case "especialistas":
          setEspecialistas(data.body || []);
          break;
        case "horarios":
          setHorarios(data.body || []);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error al cargar ${entity}:`, error);
      Swal.fire("Servicio en Mantenimiento", `No se pudo cargar la lista de ${entity}.`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar eliminación de un usuario
  const handleDeleteEntity = async (userId) => {
    const token = localStorage.getItem("token");

    // Confirmar eliminación con SweetAlert
    const confirmed = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Esta acción eliminará permanentemente al usuario!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmed.isConfirmed) {
      // Eliminar el usuario de la lista local
      const updatedUsuarios = usuarios.filter(
        (usuario) => usuario.userId !== userId
      );
      setUsuarios(updatedUsuarios); // Actualiza el estado para reflejar el cambio

      // Hacer la solicitud de eliminación al backend
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:2222/gateway/gestionUsuarios/eliminar/${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar el usuario.");
        }

        Swal.fire("Éxito", "Usuario eliminado correctamente", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
        // Revertir el cambio en caso de error
        fetchEntity("Usuarios");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Función para manejar la creación de una nueva entidad
  const handleAddEntity = () => {
    setSelectedEntity(null); // Establece selectedEntity como null, indicando que se está agregando un nuevo usuario
    setShowModal(true); // Muestra el modal
  };

  // Función para manejar la edición de la entidad
  const updateEntityInList = (newEntity) => {
    if (activeEntity === "usuarios") {
      if (newEntity.userId) {
        // Si el usuario tiene `userId`, significa que es una edición, por lo que reemplazamos el usuario
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.userId === newEntity.userId ? newEntity : usuario
          )
        );
      } else {
        // Si no tiene `userId`, es un nuevo usuario
        setUsuarios((prevUsuarios) => [...prevUsuarios, newEntity]);
      }
    } else if (activeEntity === "medicos") {
      setMedicos((prevMedicos) => [...prevMedicos, newEntity]);
    } else if (activeEntity === "especialistas") {
      setEspecialistas((prevEspecialistas) => [
        ...prevEspecialistas,
        newEntity,
      ]);
    } else if (activeEntity === "horarios") {
      setHorarios((prevHorarios) => [...prevHorarios, newEntity]);
    }
  };

  const handleEditEntity = (entityData) => {
    console.log("Dash Editando usuario:", entityData); // Verifica si los datos del usuario están llegando correctamente
    setSelectedEntity(entityData); // Establece el usuario seleccionado para editar
    setShowModal(true); // Muestra el modal para editar
  };

  // Efecto para cargar las entidades según el `activeEntity`
  useEffect(() => {
    fetchEntity(activeEntity);
  }, [activeEntity]);

  return (
    <div className="contenedor-Dashboard">
      <div className="sidebar">
        <Sidebar
          activeEntity={activeEntity}
          setActiveEntity={setActiveEntity}
        />
      </div>
      <div className="header">
        <Header />
      </div>
      <div className="contenedor d-flex flex-column mt-2">
        <div className="text-black">
          <h1 className="text-black">
            {activeEntity.charAt(0).toUpperCase() + activeEntity.slice(1)}
          </h1>
        </div>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div className="container">
            {/* Botón para agregar un usuario */}
            {activeEntity === "usuarios" && (
              <div className="d-flex justify-content-end">
                <button
                  onClick={handleAddEntity} // Abre el modal para agregar
                  className="btn btn-success me-md-2 justify-content-md-end"
                >
                  Agregar Usuario
                </button>
              </div>
            )}

            {/* Tabla de usuarios */}
            {activeEntity === "usuarios" && (
              <UsersTable
                usuarios={usuarios}
                onEdit={handleEditEntity}
                onDelete={handleDeleteEntity}
              />
            )}
            {/* Tabla de Medicos */}
            {activeEntity === "medicos" && (
              <MedicosTable
                medicos={medicos}
                onEdit={handleEditEntity}
                onDelete={handleDeleteEntity}
              />
            )}
            {/* Tabla de Especialidades */}
            {activeEntity === "especialistas" && (
              <EspecialistasTable
                especialistas={especialistas}
                onEdit={handleEditEntity}
                onDelete={handleDeleteEntity}
              />
            )}
            {/* Tabla de Horarios */}
            {activeEntity === "horarios" && (
              <HorariosTable
                horarios={horarios}
                onEdit={handleEditEntity}
                onDelete={handleDeleteEntity}
              />
            )}

            {/* Modal para editar o agregar usuario */}
            <ModalAgregarUsuario
              showModal={showModal}
              setShowModal={setShowModal}
              entity={selectedEntity}
              fetchEntity={fetchEntity} // Para refrescar la lista después de agregar o editar
              activeEntity={activeEntity}
              updateEntityInList={updateEntityInList} // Actualiza el usuario en la lista
            />
          </div>
        )}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
