import React, { useState } from 'react';
import Swal from 'sweetalert2';

function FormularioIngreso() {
  const [username, setNombreUsuario] = useState('');
  const [password, setContraseña] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:2222/api/authentication/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Verificar si la respuesta tiene contenido antes de llamar a .json()
      let data;
      const contentType = respuesta.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await respuesta.json();
      } else {
        data = {}; // Respuesta sin cuerpo JSON
      }

      if (respuesta.ok) {

        // Almacenar el token en localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('rol', data.role);
          localStorage.setItem('nombre', data.nombre+' '+data.apellido);
          console.log(localStorage.getItem(data));


        }

        window.location.href = "/dashboard";
      } else if(respuesta.status === 403) {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }else {
        Swal.fire({
          title: 'Error en el ingreso',
          text: data.message || 'No se pudo iniciar sesión.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
        });
        setNombreUsuario(username);
        setContraseña(password);
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al intentar ingresar. Por favor, inténtelo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      console.error('Error de ingreso:', error);
    }
    setNombreUsuario('');
    setContraseña('');
  };

  return (
    <div id="ingreso">
      <h1>¡Bienvenido!</h1>
      <form onSubmit={manejarEnvio}>
        <div className="campo">
          <label>
            Nombre de usuario<span className="req">*</span>
          </label>
          <input
            type="text"
            required
            autoComplete="off"
            value={username}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>
            Contraseña<span className="req">*</span>
          </label>
          <input
            type="password"
            required
            autoComplete="off"
            value={password}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>

        <button type="submit" className="boton boton-bloque">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default FormularioIngreso;
