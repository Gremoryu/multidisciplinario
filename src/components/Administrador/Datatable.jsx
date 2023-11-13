import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({ slug, columns, rows }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default DataTable;
