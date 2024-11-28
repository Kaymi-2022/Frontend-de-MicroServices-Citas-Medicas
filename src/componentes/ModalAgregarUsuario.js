import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EditModal = ({ usuario, onSave }) => {
  const [formData, setFormData] = useState({
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
  });
  const [isSaving, setIsSaving] = useState(false); 

  // Sincronizar datos del usuario seleccionado con el formulario
  useEffect(() => {
    if (usuario) {
      setFormData({
        userId: usuario.userId || "",
        username: usuario.username || "",
        password: usuario.password || "",
        nombre: usuario.nombre || "",
        apellido: usuario.apellido || "",
        telefono: usuario.telefono || "",
        email: usuario.email || "",
        estado: usuario.estado ?? 1,
        genero: usuario.genero || "",
        role: usuario.role || "",
      });
    } else {
      // Restablecer el formulario al agregar un nuevo usuario
      setFormData({
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
      });
    }
  }, [usuario]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validar datos del formulario
  const validateForm = () => {
    const { username, nombre, apellido, role, email, telefono } = formData;

    if (!username.trim()) {
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
      Swal.fire(
        "Error",
        "El correo electrónico no tiene un formato válido.",
        "error"
      );
      return false;
    }

    if (telefono && isNaN(telefono)) {
      Swal.fire("Error", "El número de teléfono debe ser numérico.", "error");
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
      Swal.fire("Éxito", "Usuario guardado correctamente.", "success");

      // Cerrar el modal
      const modalElement = document.getElementById("editModal");
      if (modalElement) {
        const bootstrapModal = window.bootstrap.Modal.getInstance(modalElement);
        if (bootstrapModal) bootstrapModal.hide();
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar el usuario.", "error");
    } finally {
      setIsSaving(false); // Habilitar nuevamente el botón
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
          <div className="modal-header text-black">
            <h5 className="modal-title" id="editModalLabel">
              {formData.userId ? "Editar Usuario" : "Agregar Usuario"}
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
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="username" className="form-label text-black">
                    Username <span className="text-dark">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label text-black">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label text-black">
                    Nombre <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="apellido" className="form-label text-black">
                    Apellido <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label text-black">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label text-black">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="estado" className="form-label text-black">
                    Estado
                  </label>
                  <select
                    className="form-select text-black"
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                  >
                    <option value={1}>Activo</option>
                    <option value={0}>Inactivo</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="genero" className="form-label text-black">
                    Género
                  </label>
                  <select
                    className="form-select text-black"
                    id="genero"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                  >
                    <option value="">No especificado</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="role" className="form-label text-black">
                  Rol <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Seleccione un rol</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="USER">Usuario</option>
                  <option value="DOCTOR">Doctor</option>
                </select>
              </div>
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