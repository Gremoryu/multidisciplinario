import React, { useContext, useEffect } from "react";
import { DataContext } from "../../context/Dataprovider";
import ProductoItems from "./ProductoItems";
import { Navbar } from "../Navbar";
import Menu from "../Navbar/Menu";
import Carrito from "../Carrito";
import Footer from "../Footer";

export const ProductosLista = () => {
  const { productos } = useContext(DataContext);
  const { setProductos } = useContext(DataContext);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:3001/producto");
        const data = await response.json();
        setProductos(data.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, [setProductos]);

  return (
    <>
      <div>
        <Navbar />
        <Menu />
        <Carrito />
        <h1 className="title">Productos</h1>
        <div className="productos">
          {productos.map((producto) => (
            <ProductoItems
              key={producto.id}
              id={producto.id}
              title={producto.nombre}
              price={producto.precio}
              image={producto.url_img}
              category={producto.id_categoria}
              cantidad={producto.cantidad_disponible}
            />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};
