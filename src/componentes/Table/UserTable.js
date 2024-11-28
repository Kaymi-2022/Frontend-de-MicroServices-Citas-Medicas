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
    { name: "ID", selector: (row) => row.userId, sortable: true },
    { name: "Username", selector: (row) => row.username, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Apellido", selector: (row) => row.apellido, sortable: true },
    { name: "Teléfono", selector: (row) => row.telefono, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    {
      name: "Estado",
      selector: (row) => (row.estado === 1 ? "Activo" : "Inactivo"),
      sortable: true,
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
    },
    { name: "Rol", selector: (row) => row.role, sortable: true },
    {
      name: "Editar",
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onEdit(row)}
        >
          Editar
        </button>
      ),
    },
    {
      name: "Eliminar",
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(row.userId)}
        >
          Eliminar
        </button>
      ),
    },
  ];

  return (
    <div className="container text-black">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar..."
          className="form-control"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: "300px" }}
        />
      </div>
      <DataTable
        title="Gestión de Usuarios"
        columns={columns}
        data={filteredUsuarios}
        pagination
        highlightOnHover
        responsive
        noDataComponent="No hay usuarios disponibles"
        customStyles={{
          header: {
            style: {
              fontSize: "30px",
              backgroundColor: "#f8f9fa", 
              fontWeight: "bold",
              textAlign: "center",
            },
          },
          headCells: {
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              textAlign: "center",
              padding: "10px", //
              borderBottom: "1px solid #dee2e6", 
            },
          },
          rows: {
            style: {
              fontSize: "14px", // Tamaño de fuente de las filas
            },
          },
        }}
      />
    </div>
  );
};

export default UsersTable;
