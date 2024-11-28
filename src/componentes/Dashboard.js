import React, { useState, useEffect } from "react";
import Sidebar from "./Dashboard/Sidevar";
import Header from "./Dashboard/Header";
import Footer from "./Dashboard/Footer";
import UsersTable from "./Table/UserTable"; // Tabla de Usuarios
import MedicosTable from "./MedicosTable"; 
import EspecialistasTable from "./EspecialistasTable"; 
import HorariosTable from "./HorariosTable"; 
import Swal from "sweetalert2";
import ModalAgregarUsuario from "./ModalAgregarUsuario"; // Importar el Modal
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [activeEntity, setActiveEntity] = useState("usuarios"); // Estado para controlar qué tabla se muestra
  const [usuarios, setUsuarios] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [especialistas, setEspecialistas] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  const fetchUsuarios = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:2222/gateway/gestionUsuarios/listar",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los usuarios.");
      }

      const data = await response.json();
      setUsuarios(data.body || []);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      Swal.fire("Error", "No se pudo cargar la lista de usuarios.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (newUser) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:2222/gateway/gestionUsuarios/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el usuario.");
      }

      Swal.fire("Éxito", "Usuario agregado correctamente", "success");
      fetchUsuarios(); // Refresca la lista de usuarios
    } catch (error) {
      Swal.fire("Error", "No se pudo agregar el usuario.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    switch (activeEntity) {
      case "usuarios":
        fetchUsuarios();
        break;
      case "medicos":
        // Llama a fetchMedicos aquí
        break;
      case "especialistas":
        // Llama a fetchEspecialistas aquí
        break;
      case "horarios":
        // Llama a fetchHorarios aquí
        break;
      default:
        break;
    }
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
      <div className="contenedor">
        <div className="content">
          <h1 className="text-black">
            {activeEntity.charAt(0).toUpperCase() + activeEntity.slice(1)}
          </h1>

          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <div className="container fs-6">
              {/* Botón para abrir el modal */}
              {activeEntity === "usuarios" && (
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-primary mb-3"
                >
                  Agregar Usuario
                </button>
              )}

              {/* Renderiza la tabla correspondiente a la entidad seleccionada */}
              {activeEntity === "usuarios" && (
                <UsersTable usuarios={usuarios} />
              )}
              {activeEntity === "medicos" && <MedicosTable medicos={medicos} />}
              {activeEntity === "especialistas" && (
                <EspecialistasTable especialistas={especialistas} />
              )}
              {activeEntity === "horarios" && (
                <HorariosTable horarios={horarios} />
              )}

              {/* Modal para agregar usuario */}
              <ModalAgregarUsuario
                showModal={showModal}
                setShowModal={setShowModal}
                handleAddUser={handleAddUser}
              />
            </div>
          )}
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
