import React, { useState } from "react";
import DataTable from "react-data-table-component";

const UsersTable = ({ usuarios, onEdit, onDelete }) => {
  const [searchText, setSearchText] = useState("");

  // Filtrar usuarios según la búsqueda
  const filteredUsuarios = usuarios.filter((usuario) =>
    Object.values(usuario)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const columns = [
    {
      name: "ID",
      selector: (row) => row.userId,
      sortable: true,
      width: "80px", // Ajuste manual, puedes calcular o estimar un ancho fijo
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
      width: "100px", // Ajuste manual según el contenido esperado
    },
    {
      name: "Password",
      selector: (row) => row.password,
      sortable: true,
      width: "100px",
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
      width: "100px",
    },
    {
      name: "Apellido",
      selector: (row) => row.apellido,
      sortable: true,
      width: "100px",
    },
    {
      name: "Teléfono",
      selector: (row) => row.telefono,
      sortable: true,
      width: "100px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "100px",
    },
    {
      name: "Estado",
      selector: (row) => (row.estado === 1 ? "Activo" : "Inactivo"),
      sortable: true,
      width: "100px",
    },
    {
      name: "Género",
      selector: (row) =>
        row.genero === "M"
          ? "Masculino"
          : row.genero === "F"
          ? "Femenino"
          : "No especificado",
      sortable: true,
      width: "100px",
    },
    {
      name: "Rol",
      selector: (row) => row.role,
      sortable: true,
      width: "100px",
    },
    {
      name: "Editar",
      cell: (row) => (
        <button
        className="btn btn-primary btn-sm"
        onClick={() => {
          console.log("Editando usuario:", row); // Verifica si se llama con los datos correctos
          onEdit(row); // Llamar a onEdit con los datos del usuario
        }}
      >
        Editar
      </button>
      ),
      width: "100px", // Ajuste manual
    },
    {
      name: "Eliminar",
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(row.userId)} // Llamar a onDelete con el ID del usuario
        >
          Eliminar
        </button>
      ),
      width: "120px", // Ajuste manual
    },  ];

  return (
    <div className="text-black">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar..."
          className="form-control"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: "200px" }}
        />
      </div>
      <div className="table-responsive">
        <DataTable
          title="Gestión de Usuarios"
          columns={columns}
          data={filteredUsuarios}
          pagination
          highlightOnHover
          responsive
          noDataComponent="No hay usuarios disponibles"
        />
      </div>
    </div>
  );
};

export default UsersTable;
