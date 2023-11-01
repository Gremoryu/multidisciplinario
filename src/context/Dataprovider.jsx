import React, { createContext, useState, useEffect } from "react";
import Data from "../components/Data";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [productos, setProductos] = useState([]);
  const [menu, setMenu] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const producto = Data.items;
    if (producto) {
      setProductos(producto);
    } else {
      setProductos([]);
    }
    setProductos(producto);
  }, []);

  const addCarrito = (id) => {
    console.log("Añadiendo producto al carrito con ID:", id);
    const check = carrito.every((item) => {
      return item.id !== id;
    });
    console.log("Check:", check);

    if (check) {
      const data = productos.filter((producto) => {
        return producto.id === id;
      });
      console.log("Datos a agregar al carrito:", data);

      setCarrito((prevCarrito) => {
        const newCarrito = [...prevCarrito, ...data];
        localStorage.setItem("dataCarrito", JSON.stringify(newCarrito));
        console.log("Carrito actualizado:", newCarrito);
        return newCarrito;
      });
    } else {
      alert("El producto ya se ha añadido al carrito");
    }
  };

  useEffect(() => {
    const dataCarrito = JSON.parse(localStorage.getItem("dataCarrito"));
    if (dataCarrito) {
      setCarrito(dataCarrito);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dataCarrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    const calculateTotal = () => {
      const res = carrito.reduce((prev, item) => {
        return prev + item.price * item.cantidad;
      }, 0);
      setTotal(res); 
    };

    calculateTotal(); 

  }, [carrito]);

  const value = {
    productos: [productos],
    menu: [menu, setMenu],
    addCarrito: addCarrito,
    carrito: [carrito, setCarrito],
    total: [total, setTotal]
  };

  return (
    <DataContext.Provider value={value}>
      {props.children}
    </DataContext.Provider>
  );
};