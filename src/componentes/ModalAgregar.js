import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ModalAgregar = ({
  showModal,
  setShowModal,
  entity,
  fetchEntity,
  activeEntity,
  updateEntityInList, // Función para actualizar el usuario en la lista
}) => {
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    genero: "",
    role: "",
    estado: 1,
  });
  // Inicializa el formulario dependiendo de si estamos editando o agregando
  useEffect(() => {
    if (entity) {
      // Si estamos editando, cargamos los datos de la entidad (usuario)
      setFormData({
        ...entity, // Carga los datos de la entidad para editar
      });
    } else {
      // Si no hay entidad, se resetean los valores del formulario a su estado inicial
      setFormData({
        userId: "",
        username: "",
        password: "",
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        genero: "",
        role: "",
        estado: "",
      });
    }
  }, [entity]); // Se ejecuta cada vez que cambia la prop `entity`

  // Manejo del cambio de campos
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const apiUrl = entity // Si hay una entidad, editamos, si no, agregamos
      ? `http://localhost:2222/gateway/gestionUsuarios/change/${entity.userId}`
      : `http://localhost:2222/gateway/gestionUsuarios/guardar`;

    try {
      const response = await fetch(apiUrl, {
        method: entity ? "PUT" : "POST", // Si existe entidad, es edición (PUT), sino es creación (POST)
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar los datos ya se cuenta con un username con ese acceso");
      }

      if (entity) {
        // Si estamos editando, actualizamos la entidad en la lista
        updateEntityInList(formData); // Actualiza la entidad editada en la lista local
      } else {
        // Si estamos agregando un nuevo usuario, lo agregamos a la lista
        updateEntityInList(formData); // Agrega el nuevo usuario a la lista local
      }

      // Llamar a `fetchEntity` para actualizar la lista desde el servidor
      fetchEntity(activeEntity.charAt(0).toUpperCase() + activeEntity.slice(1)); // Esto recargará los datos del backend

      Swal.fire("Éxito", `${activeEntity} guardado correctamente`, "success");
      setShowModal(false); // Cierra el modal
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  // Función para cerrar el modal sin guardar
  const handleClose = () => {
    setShowModal(false);
  };

  // Aquí vamos a definir los campos del formulario según la entidad activa
  const renderFormFields = () => {
    switch (activeEntity) {
      case "usuarios":
        return (
          <>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input type="hidden" name="userId" value={formData.userId} />
                <label htmlFor="username" className="form-label text-dark">
                  Username
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
              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label text-dark">
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

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="nombre" className="form-label text-dark">
                  Nombre
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
              <div className="col-md-6 mb-3">
                <label htmlFor="apellido" className="form-label text-dark">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="telefono" className="form-label text-dark">
                  Telefono
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="role" className="form-label text-dark">
                  Genero
                </label>
                <select
                  className="form-select"
                  id="genero"
                  name="genero"
                  value={formData.genero || ""}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="F">Femenino</option>
                  <option value="M">Masculino</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label text-dark">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="role" className="form-label text-dark">
                  Rol
                </label>
                <select
                  className="form-select"
                  id="role"
                  name="role"
                  value={formData.role || ""}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="USER">Usuario</option>
                  <option value="DOCTOR">Doctor</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="estado" className="form-label text-dark">
                  Estado
                </label>
                <select
                  className="form-select"
                  id="estado"
                  name="estado"
                  value={formData.estado || ""}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </select>
              </div>
            </div>
          </>
        );

      case "medicos":
        return (
          <>
            <label>Especialidad</label>
            <input
              type="text"
              name="especialidad"
              value={formData.especialidad || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </>
        );

      case "especialistas":
        return (
          <>
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
            <label>Especialidad</label>
            <input
              type="text"
              name="especialidad"
              value={formData.especialidad || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </>
        );

      case "horarios":
        return (
          <>
            <label>Hora</label>
            <input
              type="time"
              name="hora"
              value={formData.hora || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
            <label>Día</label>
            <input
              type="text"
              name="dia"
              value={formData.dia || ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalLabel"
      aria-hidden={!showModal}
      style={{ display: showModal ? "block" : "none" }} // Asegura que se muestre si showModal es true
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">
              {entity ? `Editar ${activeEntity}` : `Agregar ${activeEntity}`}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">{renderFormFields()}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {entity ? "Guardar Cambios" : "Agregar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregar;
