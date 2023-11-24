import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/Dataprovider';
import { useParams } from 'react-router-dom';
import ProductoItems from './ProductoItems';
import { Navbar } from '../Navbar';
import Menu from '../Navbar/Menu';
import Carrito from '../Carrito';
import Footer from '../Footer';

export const ProductoDetalles = () => {
  const value = useContext(DataContext);
  const { productos, addCarrito } = value;
  const [detalle, setDetalle] = useState(null);
  const [url, setUrl] = useState(0);
  const [images, setImages] = useState('');
  const params = useParams();
  let item = 0;

  useEffect(() => {
    const productoDetalle = productos.find(
      (producto) => producto.id === parseInt(params.id)
    );
    setDetalle(productoDetalle);
    setUrl(0);
  }, [params.id, productos]);

  useEffect(() => {
    if (detalle) {
      const values = `${detalle.img1 || ''}${url}${detalle.img2 || ''}`;
      setImages(values);
    }
  }, [url, detalle]);

  const handleInput = (e) => {
    const number = e.target.value.toString().padStart(2, '01');
    setUrl(number);
  };

  return (
    <>
      <div>
        <Navbar />
        <Menu />
        <Carrito />
        {detalle && (
          <div className="detalles">
            <h2>{detalle.nombre}</h2>
            <p className="price">${detalle.precio}</p>
            <div className="grid">
              <p className="nuevo">Rated</p>
              <div className="size">
                <select placeholder="Tamaño">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <p>Tipo</p>
              </div>
            </div>
            <img src={images || detalle.url_img} alt={detalle.nombre} />
            <input
              type="range"
              min="1"
              max="36"
              value={url}
              onChange={handleInput}
            />
            <button onClick={() => addCarrito(detalle)}>
              <box-icon
                type="solid"
                name="heart"
                style={{ verticalAlign: 'middle', fontSize: '10px' }}
              ></box-icon>
              Añadir al carrito
            </button>

            <div className="description">
              <p>
                <b>Description:</b>
                {detalle.descripcion}
              </p>
            </div>
          </div>
        )}

        <h2 className="relacionados"> Productos Relacionados </h2>
        <div className="productos">
          {productos.map((producto) => {
            if (
              item < 6 &&
              detalle &&
              detalle.id_categoria === producto.id_categoria &&
              detalle.id !== producto.id
            ) {
              item++;
              return (
                <ProductoItems
                  key={producto.id}
                  id={producto.id}
                  title={producto.nombre}
                  price={producto.precio}
                  image={producto.url_img}
                  category={producto.id_categoria}
                  cantidad={producto.cantidad_disponible}
                />
              );
            }
            return null;
          })}
        </div>
        <Footer />
      </div>
    </>
  );
};

