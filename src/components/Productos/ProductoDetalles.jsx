import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from "../../context/Dataprovider"
import { useParams } from 'react-router-dom'
import ProductoItems from './ProductoItems'
import { Navbar } from "../Navbar";
import Menu from "../Navbar/Menu"
import Carrito from "../Carrito";
export const ProductoDetalles = () => {
    const value = useContext(DataContext);
    const [productos] = value.productos;
    const addCarrito = value.addCarrito;
    const [detalle, setDetalle] = useState([]);
    const [url, setUrl] = useState(0);
    const [images, setImages] = useState("");
    const params = useParams();
    let item = 0;

    useEffect(() => {
        productos.forEach(producto => {
            item = 0;
            if (producto.id === parseInt(params.id)) {
                setDetalle(producto);
                setUrl(0)
            }
        });
    }, [params.id, productos]);

    useEffect(() => {
        const values = `${detalle.img1}${url}${detalle.img2}`;
        setImages(values);
    }, [url, params.id]);

    console.log(detalle)

    const handleInput = e => {
        const number = e.target.value.toString().padStart(2, "01");
        setUrl(number)
        console.log(number)
    }


    return (

        <>
            <Navbar />
            <Menu />
            <Carrito />

            {

                <div className="detalles">

                    <h2>{detalle.title}</h2>
                    <p className="price">${detalle.price}</p>
                    <div className='grid'>
                        <p className="nuevo">Nuevo</p>
                        <div className="size">
                            <select placeholder='Tamaño' >
                                <option value="1">1</option>
                                <option value="1">2</option>
                                <option value="1">3</option>
                                <option value="1">4</option>
                                <option value="1">5</option>
                                <option value="1">6</option>
                                <option value="1">7</option>
                                <option value="1">8</option>
                                <option value="1">9</option>

                            </select>
                            <p >Tamaño</p>

                        </div>
                    </div>
                    <button onClick={() => addCarrito(detalle.id)} > Añadir al carrito</button>

                    {/* {
                        url ? <img src={images} alt={detalle.title} /> : <img src={detalle.image} alt={detalle.title} />
                    } */}
                    <img src={detalle.image} alt={detalle.title} />
                    <input type="range" min="1" max="36" value={url} onChange={handleInput} />
                    <div className="description">
                        <p><b>description:</b>Lorem ipsum dolor sit amet consectetur,
                            adipisicing elit. Beatae est pariatur rerum animi quisquam eveniet
                            ut at aliquam suscipit error. Omnis inventore fuga eligendi,
                            assumenda porro et consequatur natus provident!. <br />Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, temporibus. Qui laboriosam soluta sequi ut rem magnam assumenda recusandae officia quo totam. Corporis doloribus adipisci blanditiis veniam inventore illum numquam
                            .</p>
                    </div>

                </div>

            }
            <h2 className='relacionados '> Productos Relacionados </h2>
            <div className="productos">

                {productos.map((producto) => {
                    if ((item < 6) && (detalle.category === producto.category)) {
                        item++;
                        return <ProductoItems
                            key={producto.id}
                            id={producto.id}
                            title={producto.title}
                            price={producto.price}
                            image={producto.image}
                            category={producto.category}
                            cantidad={producto.cantidad}
                        />
                    }
                })
                }





            </div>
        </>
    )
}
