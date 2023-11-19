import React, { useState,useEffect } from 'react';
import DataTable from './Datatable';
import Add from './Add';
import { GridColDef } from '@mui/x-data-grid';
import data from '../Data';
import Header from './Header';
import axios from 'axios';



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
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <>
      
      </>
    ),
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(data.items);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/productos');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchData();
  }, []); 

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const editProduct = (editedProduct) => {
    setProducts((prevProducts) => {
      
      const index = prevProducts.findIndex((product) => product.id === editedProduct.id);
    
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = editedProduct;
      return updatedProducts;
    });

    setEditedProduct(null); 
  };
  const handleModificar = (product) => {
    setEditedProduct(product);
    setOpen(true);
  };
  
  const handleEliminar = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="products">
      <Header OpenSidebar={OpenSidebar} />
      <div className="info">
        <h1>Productos</h1>
        <button onClick={() => setOpen(true)}>Add New Product</button>
      </div>
      <DataTable
        slug="products"
        columns={columns}
        rows={products}
       handleEliminar={handleEliminar}
       handleModificar={handleModificar}
      />
      {open && (
        <Add
          slug="product"
          columns={columns}
          setOpen={setOpen}
          addProduct={addProduct}
          editProduct={editProduct}
          editedProduct={editedProduct}
        />
      )}
    </div>
  );
};

export default Products;