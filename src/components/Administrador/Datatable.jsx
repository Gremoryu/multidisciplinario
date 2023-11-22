import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({ columns, rows, handleEliminar, handleModificar }) => {
  const columnsWithActions = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <button onClick={() => handleModificar(params.row)}>
            Edit
          </button>
          <button onClick={() => handleEliminar(params.row.id)}>
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columnsWithActions} pageSize={5} checkboxSelection />
    </div>
  );
};

export default DataTable;
