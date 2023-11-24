import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [productos, setProductos] = useState([]);
  const [menu, setMenu] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/producto');
        const data = response.data.data;
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchData();
  }, []);

  const addCarrito = (producto) => {
    console.log('Añadiendo producto al carrito:', producto);
    const check = carrito.every((item) => {
      return item.id !== producto.id;
    });

    if (check) {
      setCarrito((prevCarrito) => {
        const newCarrito = [...prevCarrito, { ...producto, cantidad: 1 }];
        localStorage.setItem('dataCarrito', JSON.stringify(newCarrito));
        console.log('Carrito actualizado:', newCarrito);
        return newCarrito;
      });
    } else {
      alert('El producto ya se ha añadido al carrito');
    }
  };

  useEffect(() => {
    const dataCarrito = JSON.parse(localStorage.getItem('dataCarrito'));
    if (dataCarrito) {
      setCarrito(dataCarrito);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dataCarrito', JSON.stringify(carrito));
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
    productos,
    menu: [menu, setMenu],
    addCarrito,
    carrito: [carrito, setCarrito],
    total: [total, setTotal],
  };

  return (
    <DataContext.Provider value={value}>
      {props.children}
    </DataContext.Provider>
  );
};
