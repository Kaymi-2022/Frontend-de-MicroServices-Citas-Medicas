// api.js

// Funciones para gestionar Usuarios
export const fetchUsuarios = async (token) => {
  const response = await fetch("http://localhost:2222/gateway/gestionUsuarios/listar", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al obtener los usuarios.");
  const data = await response.json();
  console.log(data);
  return data.body || [];
};

export const createUsuario = async (token, usuario) => {
  const response = await fetch("http://localhost:2222/gateway/gestionUsuarios/listar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) throw new Error("Error al crear el usuario.");
  const data = await response.json();
  return data.body.data;
};

export const updateUsuario = async (token, usuario) => {
  const response = await fetch(`http://localhost:2222/gateway/gestionUsuarios/listar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) throw new Error("Error al actualizar el usuario.");
  const data = await response.json();
  return data.body.data;
};

export const deleteUsuario = async (token, userId) => {
  const response = await fetch(`http://localhost:2222/gateway/gestionUsuarios/listar`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al eliminar el usuario.");
  return response.json();
};

// Funciones para gestionar Especialistas
export const fetchEspecialistas = async (token) => {
  const response = await fetch("http://localhost:2222/gateway/gestionUsuarios/listar", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al obtener los especialistas.");
  const data = await response.json();
  return data.body || [];
};

export const createEspecialista = async (token, especialista) => {
  const response = await fetch("http://localhost:2222/gateway/gestionEspecialistas/guardar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(especialista),
  });
  if (!response.ok) throw new Error("Error al crear el especialista.");
  const data = await response.json();
  return data.body.data;
};

export const updateEspecialista = async (token, especialista) => {
  const response = await fetch(`http://localhost:2222/gateway/gestionEspecialistas/change/${especialista.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(especialista),
  });
  if (!response.ok) throw new Error("Error al actualizar el especialista.");
  const data = await response.json();
  return data.body.data;
};

export const deleteEspecialista = async (token, id) => {
  const response = await fetch(`http://localhost:2222/gateway/gestionEspecialistas/eliminar/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al eliminar el especialista.");
  return response.json();
};

// Funciones para gestionar Médicos
export const fetchMedicos = async (token) => {
  const response = await fetch("http://localhost:2222/gateway/gestionMedicos/listar", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al obtener los médicos.");
  const data = await response.json();
  return data.body || [];
};

export const createMedico = async (token, medico) => {
  const response = await fetch("http://localhost:2222/gateway/gestionMedicos/guardar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(medico),
  });
  if (!response.ok) throw new Error("Error al crear el médico.");
  const data = await response.json();
  return data.body.data;
};

export const updateMedico = async (token, medico) => {
  const response = await fetch(`http://localhost:2222/gateway/gestionMedicos/change/${medico.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(medico),
  });
  if (!response.ok) throw new Error("Error al actualizar el médico.");
  const data = await response.json();
  return data.body.data;
};

export const deleteMedico = async (token, id) => {
  const response = await fetch(`http://localhost:2222/gateway/gestionMedicos/eliminar/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al eliminar el médico.");
  return response.json();
};

// Funciones para gestionar Horarios
export const fetchHorarios = async (token) => {
  const response = await fetch("http://localhost:2222/gateway/gestionHorarios/listar", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al obtener los horarios.");
  const data = await response.json();
  return data.body || [];
};

export const createHorario = async (token, horario) => {
  const response = await fetch("http://localhost:2222/gateway/gestionHorarios/guardar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(horario),
  });
  if (!response.ok) throw new Error("Error al crear el horario.");
  const data = await response.json();
  return data.body.data;
};

export const updateHorario = async (token, horario) => {
  const response = await fetch(`http://localhost:2222/gateway/gestionHorarios/change/${horario.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(horario),
  });
  if (!response.ok) throw new Error("Error al actualizar el horario.");
  const data = await response.json();
  return data.body.data;
};

export const deleteHorario = async (token, id) => {
  const response = await fetch(`http://localhost:2222/gateway/gestionHorarios/eliminar/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al eliminar el horario.");
  return response.json();
};
