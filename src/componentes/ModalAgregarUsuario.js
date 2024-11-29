import React from "react";

const ModalAgregarUsuario = ({
  formData,
  handleSubmit,
  setFormData,
  isSaving,
  setIsSaving,
  showModal,
  setShowModal,
  fetchUsuarios,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    // Usar el método de Bootstrap para cerrar el modal
    const modalElement = document.getElementById('editModal');
    const modal = new window.bootstrap.Modal(modalElement);
    modal.hide();
  };
  

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          name="username"
          value={formData.username || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          value={formData.nombre || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">
          Rol <span className="text-danger">*</span>
        </label>
        <select
          className="form-select"
          name="role"
          value={formData.role || ""}
          onChange={handleChange}
        >
          <option value="ADMIN">Administrador</option>
          <option value="USER">Usuario</option>
          <option value="DOCTOR">Doctor</option>
        </select>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClose} // Cierra el modal desde React
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
    </form>
  );
};

export default ModalAgregarUsuario;
