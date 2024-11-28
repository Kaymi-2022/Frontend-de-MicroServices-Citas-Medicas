// components/FormularioRegistro.js
import React, { useState } from "react";
import Swal from "sweetalert2";

function FormularioRegistro() {
  const valoresIniciales = {
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    username: "",
    password: "",
    genero: "",
  };

  const [formulario, setFormulario] = useState(valoresIniciales);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formulario);
    try {
      const respuesta = await fetch(
        "http://localhost:2222/api/authentication/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formulario),
        }
      );
      const data = await respuesta.json();
      console.log("Ete es el error  " + data);
      if (respuesta.ok) {
        Swal.fire({
          title: "¡Registro Exitoso!",
          text: "Te has registrado correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setFormulario(valoresIniciales); // Limpiar los campos
        // Redirigir o realizar más acciones al tener éxito
      } else if (respuesta.status === 409) {
        Swal.fire({
          title: "Error en el registro",
          text: data.message || "No se pudo completar el registro.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al intentar registrarse. Por favor, inténtelo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error:", error);
    }
  };

  return (
    <div id="registro">
      <h1>Crear Cuenta</h1>
      <form onSubmit={manejarEnvio}>
        <div className="fila-superior">
          <div className="campo">
            <label>
              Nombre<span className="req">*</span>
            </label>
            <input
              type="text"
              name="nombre"
              required
              autoComplete="off"
              value={formulario.nombre}
              onChange={manejarCambio}
            />
          </div>
          <div className="campo">
            <label>
              Apellido<span className="req">*</span>
            </label>
            <input
              type="text"
              name="apellido"
              required
              autoComplete="off"
              value={formulario.apellido}
              onChange={manejarCambio}
            />
          </div>
        </div>

        <div className="fila-superior">
          <div className="campo">
            <label>
              Género<span className="req">*</span>
            </label>
            <select
              style={{ height: "38px", background: "#333", color: "white" }}
              name="genero"
              required
              value={formulario.genero}
              onChange={manejarCambio}
            >
              <option Value="" disabled>
                Selecciona una opción
              </option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>

          <div className="campo">
            <label>
              Celular<span className="req">*</span>
            </label>
            <input
              type="tel"
              name="telefono"
              required
              autoComplete="off"
              value={formulario.telefono}
              onChange={manejarCambio}
              pattern="[0-9]*" // Solo números
              inputMode="numeric" // Muestra teclado numérico en dispositivos móviles
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              } // Restringe a solo números
            />
          </div>
        </div>

        <div className="campo">
          <label>
            Correo Electrónico<span className="req">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="off"
            value={formulario.email}
            onChange={manejarCambio}
          />
        </div>

        <div className="campo">
          <label>
            Nombre de Usuario<span className="req">*</span>
          </label>
          <input
            type="text"
            name="username"
            required
            autoComplete="off"
            value={formulario.username}
            onChange={manejarCambio}
          />
        </div>

        <div className="campo">
          <label>
            Contraseña<span className="req">*</span>
          </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="off"
            value={formulario.password}
            onChange={manejarCambio}
          />
        </div>

        <button type="submit" className="boton boton-bloque">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default FormularioRegistro;
