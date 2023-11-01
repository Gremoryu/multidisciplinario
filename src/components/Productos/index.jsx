import React, { useContext } from "react";
import { DataContext } from "../../context/Dataprovider";
import ProductoItems from "./ProductoItems";
import { Navbar } from "../Navbar";
import Menu from "../Navbar/Menu"
import Carrito from "../Carrito";
export const ProductosLista = () => {

    const value = useContext(DataContext)
    const [productos] = value.productos

    console.log(productos)


    return (
        <>
            <Navbar />
            <Menu />
            <Carrito />
            <h1 className="title"> Productos</h1>
            <div className="productos">
                {
                    productos.map(producto => (
                        <ProductoItems
                            key={producto.id}
                            id={producto.id}
                            title={producto.title}
                            price={producto.price}
                            image={producto.image}
                            category={producto.category}
                            cantidad={producto.cantidad}
                        />


                    ))
                }
             
            </div>

        </>
    )
}