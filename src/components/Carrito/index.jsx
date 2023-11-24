import React, { useContext, useState } from "react";
import { DataContext } from "../../context/Dataprovider";

export default function Carrito() {
  const value = useContext(DataContext);
  const [menu, setMenu] = value.menu;
  const [carrito, setCarrito] = value.carrito;
  const [total, setTotal] = value.total;
  const [loading, setLoading] = useState(false);
  const [setPaymentSuccess] = useState(false);

  const tooglefalse = () => {
    setMenu(false);
  };

  const suma = (id) => {
    const newCarrito = carrito.map((producto) => {
      if (producto.id === id) {
        return { ...producto, cantidad: producto.cantidad + 1 };
      }
      return producto;
    });
  
    setCarrito(newCarrito);
    console.log("Carrito después de suma:", newCarrito);
    calcularTotal(newCarrito);
  };
  
  

  const resta = (id) => {
    const newCarrito = carrito.map((producto) => {
      if (producto.id === id && producto.cantidad > 1) {
        return { ...producto, cantidad: producto.cantidad - 1 };
      }
      return producto;
    });

    setCarrito(newCarrito);
    calcularTotal(newCarrito);
  };

  const removeProducto = (id) => {
    const newCarrito = carrito.filter((producto) => producto.id !== id);

    setCarrito(newCarrito);
    calcularTotal(newCarrito);
  };

  const calcularTotal = (carrito) => {
    const newTotal = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);
    setTotal(newTotal);
  };
 
 
  const handlePayment = async () => {
    try {
      console.log("Datos del carrito antes de la venta:", carrito);

      setLoading(true);
  
      const ventaProductos = carrito.map((item) => ({
        id_producto: item.id,
        cantidad: item.cantidad,
        total: item.price * item.cantidad, 
        subtotal: item.price * item.cantidad,
        descuento: 0,
      }));
  
      const ventaResponse = await fetch("http://localhost:3001/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cantidad: carrito.length > 0 ? carrito.reduce((acc, item) => acc + item.cantidad, 0) : 0,
          total, 
          subtotal: total, 
          descuento: 0,
          venta_producto: ventaProductos,
        }),
      });
  
      if (ventaResponse.ok) {
        const ventaData = await ventaResponse.json();
        console.log("Venta creada exitosamente:", ventaData);
        setCarrito([]);
        setTotal(0);
        setPaymentSuccess(true);
      } else {
        const errorData = await ventaResponse.json();
        console.error("Error al crear la venta:", ventaResponse.statusText, errorData);
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
 
  return (
    <div className={menu ? "carritos show" : "carritos"}>
      <div className={menu ? "carrito show" : "carrito"}>
        <div className="carrito_close" onClick={tooglefalse}>
          <box-icon name="x"></box-icon>
        </div>
        <h2>Su carrito</h2>
        <div className="carrito_center">
          {carrito.length === 0 ? (
            <h2 style={{ textAlign: "center", fontSize: "3rem" }}>
              Carrito Vacío
            </h2>
          ) : (
            <>
              {carrito.map((producto) => (
                <div className="carrito_item" key={producto.id}>
                  <img src={producto.image} alt="" />
                  <div>
                    <h3>{producto.title}</h3>
                    <p className="price">{producto.price}</p>
                  </div>
                  <div>
                    <box-icon
                      name="up-arrow"
                      type="solid"
                      onClick={() => suma(producto.id)}
                    ></box-icon>
                    <p className="cantidad">{producto.cantidad}</p>
                    <box-icon
                      name="down-arrow"
                      type="solid"
                      onClick={() => resta(producto.id)}
                    ></box-icon>
                  </div>
                  <div
                    className="remove_item"
                    onClick={() => removeProducto(producto.id)}
                  >
                    <box-icon name="trash" type="solid"></box-icon>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="carrito_footer">
          <h3>Total: ${total}</h3>
          <button className="btn" onClick={handlePayment} disabled={loading}>
            {loading ? "Procesando..." : "Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}
