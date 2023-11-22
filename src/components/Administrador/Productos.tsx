import React, { useState, useEffect } from "react";
import DataTable from "./Datatable";
import Add from "./Add";
import { GridColDef } from "@mui/x-data-grid";
import Header from "./Header";
import axios from "axios";

interface Product {
  id: number;
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
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/producto");
        const fetchedProducts: Product[] = response.data.data;

        const mappedProducts = fetchedProducts.map((product) => ({
          ...product,
          id: product.id,
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
      const response = await axios.post("http://localhost:3001/producto", {
        nombre: newProduct.nombre,
        descripcion: newProduct.descripcion,
        id_categoria: newProduct.id_categoria,
        precio: newProduct.precio,
        cantidad_disponible: newProduct.cantidad_disponible,
        url_img: newProduct.url_img,
        rating: newProduct.rating,
        id_color: newProduct.id_color,
        talla: newProduct.talla,
      });
  
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

  const editProduct = async (editedProduct: Product) => {
    try {
      if (!editedProduct || editedProduct.id === undefined) {
        console.error("El producto a editar es inválido:", editedProduct);
        return;
      }

      const response = await axios.patch(`http://localhost:3001/producto/${editedProduct.id}`, {
        nombre: editedProduct.nombre,
        descripcion: editedProduct.descripcion,
        id_categoria: editedProduct.id_categoria,
        precio: editedProduct.precio,
        cantidad_disponible: editedProduct.cantidad_disponible,
        url_img: editedProduct.url_img,
        rating: editedProduct.rating,
        id_color: editedProduct.id_color,
        talla: editedProduct.talla,
      });

      console.log("Respuesta del servidor al actualizar producto:", response.data);

      const updatedProduct = response.data.producto;

      setProducts((prevProducts) => {
        return prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product));
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
    </div>
  );
};

export default Products;

