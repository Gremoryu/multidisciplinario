import React, { useContext } from "react";
import img from "../components/img/InicioM.png"
import { Navbar } from '../components/Navbar'
import Menu from "../components/Navbar/Menu"
import { DataContext } from "../context/Dataprovider";
import Carrito from "../components/Carrito"
import ProductoItems from '../components/Productos/ProductoItems';
import Footer from "../components/Footer/index"

export const Inicio = () => {
  const value = useContext(DataContext);
  const productos = value.productos && Array.isArray(value.productos) ? value.productos : [];

  console.log(productos);
  return (
    <div>
      <Navbar />
      <Menu />
      <Carrito />
      <img className={"inicio"} src={img} alt="" />
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
  );
};