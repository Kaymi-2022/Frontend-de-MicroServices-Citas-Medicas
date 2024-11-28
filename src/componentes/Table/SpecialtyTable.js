import React, { useEffect, useRef, useCallback } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.print.min.js';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const SpecialtyTable = () => {
    const tableRef = useRef(null);
    const dataTableInstance = useRef(null);

    const fetchData = useCallback(async () => {
        try {
            const authToken = localStorage.getItem('token');
            if (!authToken) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de autenticación',
                    text: 'Por favor, inicia sesión nuevamente.',
                });
                return;
            }

            const response = await fetch(`http://localhost:2222/gateway/gestionUsuarios/listar`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                mode: 'cors',
            });

            if (!response.ok) {
                if (response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'No autorizado',
                        text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
                    });
                    return;
                }
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            const data = await response.json();
            if (data && Array.isArray(data.body)) {
                if (dataTableInstance.current) {
                    const dataTable = dataTableInstance.current;
                    console.log('Datos recibidos:', data.body);
                    dataTable.clear().rows.add(data.body).draw();
                }
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Sin datos',
                    text: 'No se encontraron usuarios para mostrar.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar los datos',
                text: error.message,
            });
            console.error(error);
        }
    }, []);

    useEffect(() => {
        const initializeDataTable = () => {
            if (tableRef.current && !dataTableInstance.current) {
                dataTableInstance.current = $(tableRef.current).DataTable({
                    dom: '<"d-flex justify-content-between mb-2"B>rt<"bottom"lip><"clear">',
                    buttons: [
                        { extend: 'copy', text: 'Copiar', className: 'btn-copy' },
                        { extend: 'csv', text: 'Exportar CSV', className: 'btn-csv' },
                        { extend: 'excel', text: 'Exportar Excel', className: 'btn-excel' },
                        { extend: 'pdf', text: 'Exportar PDF', className: 'btn-pdf' },
                        { extend: 'print', text: 'Imprimir', className: 'btn-print' },
                    ],
                    columns: [
                        { data: 'userId', title: 'ID' },
                        { data: 'username', title: 'Username' },
                        { data: 'nombre', title: 'Nombre' },
                        { data: 'apellido', title: 'Apellido' },
                        { data: 'telefono', title: 'Teléfono' },
                        { data: 'email', title: 'Correo Electrónico' },
                        { data: 'fechaCreacion', title: 'Fecha de Registro' },
                        { 
                            data: 'role', 
                            title: 'Rol',
                            render: function (data) {
                                return data || 'Sin rol';
                            }
                        },
                        { 
                            data: 'estado', 
                            title: 'Estado',
                            render: function (data) {
                                return data === 1 ? 'Activo' : 'Inactivo';
                            }
                        },
                        {
                            data: 'genero',
                            title: 'Género',
                            render: function (data) {
                                return data === 'M' ? 'Masculino' : data === 'F' ? 'Femenino' : 'No especificado';
                            },
                        },
                        {
                            data: null,
                            title: 'Editar',
                            render: function (data, type, row) {
                                return `<button class="btn btn-primary btn-edit" data-id="${row.userId}">
                                    <i class="fa-solid fa-pen-to-square"></i> Editar
                                </button>`;
                            },
                        },
                        {
                            data: null,
                            title: 'Eliminar',
                            render: function (data, type, row) {
                                return `<button class="btn btn-danger btn-delete" data-id="${row.userId}">
                                    <i class="fa-solid fa-trash-can"></i> Eliminar
                                </button>`;
                            },
                        },
                    ],
                });
            }
        };

        initializeDataTable();
        fetchData();

        return () => {
            if (dataTableInstance.current) {
                dataTableInstance.current.destroy();
                dataTableInstance.current = null;
            }
        };
    }, [fetchData]);

    return (
        <div className="container">
            <div className="tab-content">
                <table
                    ref={tableRef}
                    className="table table-striped table-bordered"
                    style={{ width: '100%' }}
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Teléfono</th>
                            <th>Correo Electrónico</th>
                            <th>Fecha de Registro</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Género</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
};

export default SpecialtyTable;
