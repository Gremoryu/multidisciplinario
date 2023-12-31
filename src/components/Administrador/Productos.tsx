import React, { useState, useEffect } from "react";
import DataTable from "./Datatable";
import Add from "./Add";
import { GridColDef } from "@mui/x-data-grid";
import Header from "./Header";
import axios from "axios";
import ProductoItems from "../Productos/ProductoItems";

interface Product {
  url_img: string;
  nombre: string;
  descripcion: string;
  id_categoria: number;
  precio: number;
  cantidad_disponible: number;
  rating: number;
  id_color: number;
  talla: string | null;
  created_at: string;
  deleted: string;
  deleted_at: string | null;
  updated_at: string | null;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "url_img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <img
        src={params.row.url_img || "../components/img/mochilacafe_vistafrente.png"}
        alt=""
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
  {
    field: "nombre",
    type: "string",
    headerName: "Nombre",
    width: 200,
  },
  {
    field: "descripcion",
    type: "string",
    headerName: "Descripción",
    width: 300,
  },
  {
    field: "id_categoria",
    type: "number",
    headerName: "Categoría ID",
    width: 150,
  },
  {
    field: "precio",
    type: "number",
    headerName: "Precio",
    width: 200,
  },
  {
    field: "cantidad_disponible",
    type: "number",
    headerName: "Cantidad Disponible",
    width: 200,
  },
  {
    field: "rating",
    type: "number",
    headerName: "Rating",
    width: 150,
  },
  {
    field: "id_color",
    type: "number",
    headerName: "Color ID",
    width: 150,
  },
  {
    field: "talla",
    type: "string",
    headerName: "Talla",
    width: 100,
  },
  {
    field: "created_at",
    type: "string",
    headerName: "Fecha de Creación",
    width: 200,
  },
  {
    field: "deleted",
    type: "string",
    headerName: "Eliminado",
    width: 120,
  },
  {
    field: "deleted_at",
    type: "string",
    headerName: "Fecha de Eliminación",
    width: 200,
  },
  {
    field: "updated_at",
    type: "string",
    headerName: "Fecha de Actualización",
    width: 200,
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/producto");
      const fetchedProducts: Product[] = response.data.data;
  
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error al obtener productos:", error.response);
    }
  };
  

  const addProduct = async (newProduct: Product) => {
    try {
      const response = await axios.post("http://localhost:3001/producto", newProduct);
      
      console.log("Respuesta del servidor al agregar producto:", response.data);
  
      const addedProduct = response.data.producto;  
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      setOpen(false);
    } catch (error) {
      console.error("Error al agregar producto:", error.response);
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

  const editProduct = async (updatedProduct: Product) => {
    try {
      if (!updatedProduct) {
        console.error("El producto a editar es inválido:", updatedProduct);
        return;
      }
  
      const response = await axios.patch(`http://localhost:3001/producto/${updatedProduct.id}`, updatedProduct);
  
      console.log("Respuesta del servidor al actualizar producto:", response.data);
  
      const updatedProductFromServer = response.data.producto;
  
      setProducts((prevProducts) => {
        return prevProducts.map((product) => (product.id === updatedProductFromServer.id ? updatedProductFromServer : product));
      });
  
      setOpen(false);
    } catch (error) {
      console.error("Error al actualizar producto:", error.response);
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
          editProduct={editProduct}
          editedProduct={editedProduct}
        />
      )}
        {products.map((product) => (
      <ProductoItems
        key={product.id}
        id={product.id}
        image={product.url_img}
        title={product.nombre}
        category={product.id_categoria}
        price={product.precio}
      />
    ))}
    </div>
  );
};

export default Products;