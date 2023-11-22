import React, { useContext } from "react";
import { DataContext } from "../../context/Dataprovider";

export default function Carrito() {
    const value = useContext(DataContext);
    const [menu, setMenu] = value.menu;
    const [carrito, setCarrito] = value.carrito;
    const [total, setTotal] = value.total;

    const tooglefalse = () => {
        setMenu(false);
    };

    const show1 = menu ? "carritos show" : "carritos";
    const show2 = menu ? "carrito show" : "carrito";

    const resta = async (id) => {
        
        try {
            const response = await fetch(`http://localhost:3001/ventas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cantidad: -1 }), // decrementar la cantidad
            });

            if (response.ok) {
                // Actualizar el carrito local
                const nuevosProductos = carrito.map((item) => {
                    if (item.id === id) {
                        item.cantidad -= 1;
                    }
                    return item;
                });
                setCarrito([...nuevosProductos]);

                // Actualizar el total local
                const totalCalculado = nuevosProductos.reduce((prev, item) => prev + item.price * item.cantidad, 0);
                setTotal(totalCalculado);
            } else {
                console.error("Error al actualizar la venta de producto:", response.statusText);
            }
        } catch (error) {
            console.error("Error al actualizar la venta de producto:", error);
        }
    };

    const suma = async (id) => {
        // Hacer una solicitud para actualizar la venta asociada al producto
        try {
            const response = await fetch(`http://localhost:3001/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cantidad: 1 }), // incrementar la cantidad
            });

            if (response.ok) {
                // Actualizar el carrito local
                const nuevosProductos = carrito.map((item) => {
                    if (item.id === id) {
                        item.cantidad += 1;
                    }
                    return item;
                });
                setCarrito([...nuevosProductos]);

                // Actualizar el total local
                const totalCalculado = nuevosProductos.reduce((prev, item) => prev + item.price * item.cantidad, 0);
                setTotal(totalCalculado);
            } else {
                console.error("Error al actualizar la venta de producto:", response.statusText);
            }
        } catch (error) {
            console.error("Error al actualizar la venta de producto:", error);
        }
    };

    const removeProducto = async (id) => {
        if (window.confirm("¿Quiere eliminar el producto?")) {
            try {
                // Hacer una solicitud para eliminar la venta asociada al producto
                await fetch(`http://localhost:3001/ventas/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // Actualizar el carrito local eliminando el producto
                const nuevosProductos = carrito.filter((item) => item.id !== id);
                setCarrito([...nuevosProductos]);

                // Actualizar el total local
                const totalCalculado = nuevosProductos.reduce((prev, item) => prev + item.price * item.cantidad, 0);
                setTotal(totalCalculado);
            } catch (error) {
                console.error("Error al eliminar la venta de producto:", error);
            }
        }
    };

    const handlePayment = async () => {
        try {
            // Hacer una solicitud para procesar el pago con la información del carrito
            await fetch('URL_DE_TU_API/pago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ carrito, total }),
            });

            // Puedes reiniciar el carrito local o realizar otras acciones según tus necesidades
            setCarrito([]);
            setTotal(0);
        } catch (error) {
            console.error("Error al procesar el pago:", error);
        }
    };

    return (
        <div className={show1}>
            <div className={show2}>
                <div className="carrito_close" onClick={tooglefalse}>
                    <box-icon name="x"></box-icon>
                </div>
                <h2>Su carrito</h2>
                <div className="carrito_center">
                    {
                        carrito.length === 0 ? <h2 style={{
                            textAlign: "center", fontSize: "3rem"
                        }} > Carrito Vacio </h2> : <>
                            {
                                carrito.map((producto) => (
                                    <div className="carrito_item" key={producto.id} >
                                        <img src={producto.image} alt="" />
                                        <div>
                                            <h3>{producto.title}</h3>
                                            <p className="price">{producto.price}</p>
                                        </div>
                                        <div>
                                            <box-icon name="up-arrow" type="solid" onClick={() => suma(producto.id)}> </box-icon>
                                            <p className="cantidad">{producto.cantidad}</p>
                                            <box-icon name="down-arrow" type="solid" onClick={() => resta(producto.id)}></box-icon>
                                        </div>
                                        <div className="remove_item" onClick={() => removeProducto(producto.id)}>
                                            <box-icon name="trash" type="solid"></box-icon>
                                        </div>
                                    </div>
                                ))}
                        </>
                    }
                </div>
                <div className="carrito_footer">
                    <h3>Total: ${total}</h3>
                    <button className="btn" onClick={handlePayment}>Payment</button>
                </div>
            </div>
        </div>
    );
}
