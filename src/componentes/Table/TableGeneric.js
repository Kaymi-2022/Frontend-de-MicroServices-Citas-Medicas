import React, { useEffect, useRef, useCallback } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.print.min.js';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const DataTableComponent = ({ apiUrl, columns, buttons = [], title = '' }) => {
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

            const response = await fetch(apiUrl, {
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
                    text: 'No se encontraron registros para mostrar.',
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
    }, [apiUrl]);

    useEffect(() => {
        const initializeDataTable = () => {
            if (tableRef.current && !dataTableInstance.current) {
                dataTableInstance.current = $(tableRef.current).DataTable({
                    dom: '<"d-flex justify-content-between mb-2"B>rt<"bottom"lip><"clear">',
                    buttons: buttons.length > 0 ? buttons : [
                        { extend: 'copy', text: 'Copiar', className: 'btn-copy' },
                        { extend: 'csv', text: 'Exportar CSV', className: 'btn-csv' },
                        { extend: 'excel', text: 'Exportar Excel', className: 'btn-excel' },
                        { extend: 'pdf', text: 'Exportar PDF', className: 'btn-pdf' },
                        { extend: 'print', text: 'Imprimir', className: 'btn-print' },
                    ],
                    columns: columns,
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
    }, [fetchData, columns, buttons]);

    return (
        <div className="container">
            <h2>{title}</h2>
            <div className="tab-content">
                <table
                    ref={tableRef}
                    className="table table-striped table-bordered"
                    style={{ width: '100%' }}
                >
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index}>{col.title}</th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
};

export default DataTableComponent;
