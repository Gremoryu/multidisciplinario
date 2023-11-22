import React, { useContext, useState } from "react";
import { DataContext } from "../../context/Dataprovider";

export default function Carrito() {
  const value = useContext(DataContext);
  const [menu, setMenu] = value.menu;
  const [carrito, setCarrito] = value.carrito;
  const [total, setTotal] = value.total;
  const [loading, setLoading] = useState(false);

  const tooglefalse = () => {
    setMenu(false);
  };

  const suma = (id) => {
  };

  const resta = (id) => {
  };

  const removeProducto = (id) => {
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3001/venta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cantidad: carrito.reduce((acc, item) => acc + item.cantidad, 0),
          total,
          subtotal: total,
          descuento: 0,
          venta_producto: carrito.map((item) => ({
            id_producto: item.id,
            cantidad: item.cantidad,
            total: item.price * item.cantidad,
            subtotal: item.price * item.cantidad,
            descuento: 0,
          })),
        }),
      });

      if (response.ok) {
        setCarrito([]);
        setTotal(0);

        console.log("Venta creada exitosamente");
      } else {
        console.error("Error al crear la venta:", response.statusText);
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
