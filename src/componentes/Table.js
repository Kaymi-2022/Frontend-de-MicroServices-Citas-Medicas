import React, { useState, useEffect } from "react";
import UsersTable from "./Table/UserTable";
import EditModal from "./Table/EditModal";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsuarios = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true); // Mostrar estado de carga
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
      setIsLoading(false); // Ocultar estado de carga
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSaveUsuario = async (usuario) => {
    const url = usuario.userId
      ? `http://localhost:2222/gateway/gestionUsuarios/change/${usuario.userId}`
      : "http://localhost:2222/gateway/gestionUsuarios/guardar";

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(url, {
        method: usuario.userId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      Swal.fire(
        "Éxito",
        result.body?.mensaje || "Operación realizada correctamente.",
        "success"
      );

      // Actualizar lista de usuarios
      setUsuarios((prev) =>
        usuario.userId
          ? prev.map((u) =>
              u.userId === usuario.userId ? result.body.data : u
            )
          : [...prev, result.body.data]
      );
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      Swal.fire(
        "Error",
        "No se pudo completar la operación. Inténtalo nuevamente.",
        "error"
      );
    }
  };

  const handleDeleteUsuario = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminarlo",
      });

      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:2222/gateway/gestionUsuarios/eliminar/${id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar el usuario.");
        }

        setUsuarios((prev) => prev.filter((usuario) => usuario.userId !== id));
        Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      Swal.fire(
        "Error",
        "Hubo un problema al eliminar el usuario tiene citas asociadas.",
        "error"
      );
    }
  };

  const handleEditUsuario = (usuario) => {
    setSelectedUsuario(usuario);
    showModal();
  };

  const handleAddUsuario = () => {
    setSelectedUsuario(null);
    showModal();
  };

  const showModal = () => {
    const modalElement = document.getElementById("editModal");
    if (modalElement) {
      // Elimina aria-hidden cuando el modal se muestra
      modalElement.removeAttribute("aria-hidden");

      // Usa Bootstrap para mostrar el modal
      const bootstrapModal = new window.bootstrap.Modal(modalElement);
      bootstrapModal.show();
    } else {
      console.error("Modal no encontrado: 'EditModal' está montado.");
    }
  };

  return (
    <div>
      <div className="container">
        <h1 className="text-black">Gestión de Usuarios</h1>
        <div className="d-flex flex-row-reverse me-3">
          <button onClick={handleAddUsuario} className="btn btn-primary mb-3">
            Agregar Usuario
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="container fs-6">
          <UsersTable
            usuarios={usuarios}
            onEdit={handleEditUsuario}
            onDelete={handleDeleteUsuario}
          />
          <EditModal usuario={selectedUsuario} onSave={handleSaveUsuario} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
