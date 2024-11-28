import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EditModal = ({ entity, itemToEdit, onSave }) => {
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Sincronizar datos del item seleccionado con el formulario
  useEffect(() => {
    if (itemToEdit) {
      setFormData({ ...itemToEdit });
    } else {
      // Si no hay item seleccionado, restablecer el formulario
      setFormData(getInitialFormData(entity));
    }
  }, [itemToEdit, entity]);

  // Inicializar el formulario con datos vacíos dependiendo de la entidad
  const getInitialFormData = (entity) => {
    switch (entity) {
      case "usuarios":
        return {
          userId: "",
          username: "",
          password: "",
          nombre: "",
          apellido: "",
          telefono: "",
          email: "",
          estado: 1,
          genero: "",
          role: "",
        };
      case "medicos":
        return {
          medicoId: "",
          nombre: "",
          especialidad: "",
          email: "",
        };
      case "especialistas":
        return {
          especialistaId: "",
          nombre: "",
          especialidad: "",
          email: "",
        };
      case "horarios":
        return {
          horarioId: "",
          medicoId: "", // Asegurándonos de que 'medicoId' esté presente
          especialidad: "",
          hora: "",
        };
      default:
        return {};
    }
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validar los datos del formulario
  const validateForm = () => {
    const { nombre, apellido, especialidad, email, role, hora, telefono, medicoId } = formData;
    switch (entity) {
      case "usuarios":
        if (!formData.username.trim()) {
          Swal.fire("Error", "El campo 'Username' es obligatorio.", "error");
          return false;
        }
        if (!nombre.trim()) {
          Swal.fire("Error", "El campo 'Nombre' es obligatorio.", "error");
          return false;
        }
        if (!apellido.trim()) {
          Swal.fire("Error", "El campo 'Apellido' es obligatorio.", "error");
          return false;
        }
        if (!role.trim()) {
          Swal.fire("Error", "El campo 'Rol' es obligatorio.", "error");
          return false;
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          Swal.fire("Error", "El correo electrónico no tiene un formato válido.", "error");
          return false;
        }
        if (telefono && isNaN(telefono)) {
          Swal.fire("Error", "El número de teléfono debe ser numérico.", "error");
          return false;
        }
        break;
      case "medicos":
      case "especialistas":
        if (!nombre.trim()) {
          Swal.fire("Error", "El campo 'Nombre' es obligatorio.", "error");
          return false;
        }
        if (!especialidad.trim()) {
          Swal.fire("Error", "El campo 'Especialidad' es obligatorio.", "error");
          return false;
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          Swal.fire("Error", "El correo electrónico no tiene un formato válido.", "error");
          return false;
        }
        break;
      case "horarios":
        if (!hora.trim()) {
          Swal.fire("Error", "El campo 'Hora' es obligatorio.", "error");
          return false;
        }
        if (!medicoId.trim()) { // Validación para el campo 'medicoId'
          Swal.fire("Error", "El campo 'Médico' es obligatorio.", "error");
          return false;
        }
        break;
      default:
        return false;
    }
    return true;
  };

  // Manejar el envío del formulario
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSaving(true); // Bloquear el botón de guardar mientras se guarda

    try {
      await onSave(formData); // Llamar a la función proporcionada por el padre
      Swal.fire("Éxito", `${entity.charAt(0).toUpperCase() + entity.slice(1)} guardado correctamente.`, "success");

      // Cerrar el modal
      const modalElement = document.getElementById("editModal");
      if (modalElement) {
        const bootstrapModal = window.bootstrap.Modal.getInstance(modalElement);
        if (bootstrapModal) bootstrapModal.hide();
      }
    } catch (error) {
      Swal.fire("Error", `No se pudo guardar el ${entity}.`, "error");
    } finally {
      setIsSaving(false); // Habilitar nuevamente el botón
    }
  };

  // Renderizar el formulario según la entidad
  const renderFormFields = () => {
    switch (entity) {
      case "usuarios":
        return (
          <>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                name="apellido"
                value={formData.apellido || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Rol</label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={formData.role || ""}
                onChange={handleChange}
              >
                <option value="ADMIN">Administrador</option>
                <option value="USER">Usuario</option>
                <option value="DOCTOR">Doctor</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="estado" className="form-label">Estado</label>
              <select
                className="form-select"
                id="estado"
                name="estado"
                value={formData.estado || 1}
                onChange={handleChange}
              >
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
              </select>
            </div>
          </>
        );
      case "medicos":
      case "especialistas":
        return (
          <>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="especialidad" className="form-label">Especialidad</label>
              <input
                type="text"
                className="form-control"
                id="especialidad"
                name="especialidad"
                value={formData.especialidad || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );
      case "horarios":
        return (
          <>
            <div className="mb-3">
              <label htmlFor="medicoId" className="form-label">Médico</label>
              <input
                type="text"
                className="form-control"
                id="medicoId"
                name="medicoId"
                value={formData.medicoId || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hora" className="form-label">Hora</label>
              <input
                type="text"
                className="form-control"
                id="hora"
                name="hora"
                value={formData.hora || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">
              {itemToEdit ? `${entity.charAt(0).toUpperCase() + entity.slice(1)} - Editar` : `${entity.charAt(0).toUpperCase() + entity.slice(1)} - Agregar`}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              {renderFormFields()}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
