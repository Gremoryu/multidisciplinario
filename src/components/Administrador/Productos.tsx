import React, { useState, useEffect } from "react";
import DataTable from "./Datatable";
import Add from "./Add";
import { GridColDef } from "@mui/x-data-grid";
import Header from "./Header";
import axios from "axios";

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <img
        src={params.row.image || "../components/img/mochilacafe_vistafrente.png"}
        alt=""
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 200,
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/producto");
        const fetchedProducts: Product[] = response.data.data;

        const mappedProducts = fetchedProducts.map((product, index) => ({
          ...product,
          id: index + 1,
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error al obtener productos:", error.response);
      }
    };

    fetchData();
  }, []);


  const addProduct = async (newProduct: Product) => {
    try {
      const response = await axios.post("http://localhost:3001/producto", newProduct);
      console.log("Respuesta del servidor al agregar producto:", response.data);
      setProducts((prevProducts) => [...prevProducts, response.data.producto]);
      setOpen(false); // Cerrar el modal después de agregar el producto
    } catch (error) {
      console.error("Error al agregar producto:", error.response);
      // Aquí puedes manejar el error de manera apropiada, por ejemplo, mostrando un mensaje al usuario.
    }
  };
  
  const handleEliminar = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:3001/producto/${productId}`);
      console.log("Producto eliminado correctamente");
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };


  const handleModificar = (product: Product) => {
    setEditedProduct(product);
    setOpen(true); 
  };

 

  const OpenSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="products">
      <Header OpenSidebar={OpenSidebar} />
      <div className="info">
        <h1>Productos</h1>
        <button onClick={() => setOpen(true)}>Agregar nuevo producto</button>
      </div>
      <DataTable
        columns={columns}
        rows={products}
        handleEliminar={handleEliminar}
        handleModificar={handleModificar}
      />
      {open && (
        <Add
          setOpen={setOpen}
          addProduct={addProduct}
          editProduct={handleModificar}
          editedProduct={editedProduct} slug={undefined} columns={undefined}        />
      )}
    </div>
  );
};

export default Products;
