import React, { useState } from 'react';
import DataTable from './Datatable';
import Add from './Add';
import { GridColDef } from '@mui/x-data-grid';
import data from '../Data';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'image',
    headerName: 'Image',
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.image || '/noavatar.png'} alt="" style={{ width: '50px', height: '50px' }} />;
    },
  },
  
  {
    field: 'title',
    type: 'string',
    headerName: 'Title',
    width: 250,
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Price',
    width: 200,
  },
  
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(data.items);

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Productos</h1>
        <button onClick={() => setOpen(true)}>Add New Product</button>
      </div>
      <DataTable slug="products" columns={columns} rows={products} />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} addProduct={addProduct} />}
    </div>
  );
};

export default Products;
