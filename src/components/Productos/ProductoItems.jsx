import React, { useContext } from 'react'
import { DataContext } from '../../context/Dataprovider'
import { Link } from 'react-router-dom';

const ProductoItems = ({ id, image, title, category, price }) => {
  const value = useContext(DataContext);
  const addCarrito = value.addCarrito;
  return (
    <div >
      <div className="producto">
        <Link to ={`/producto/${id}`}>
          <div className="productos_img ">
            <img src={image} alt="" />
          </div>
        </Link>
        <div className="producto_footer">
          <h1>{title}</h1>
          <p>{category}</p>
          <p className="price"> ${price}</p>
        </div>
        {/* <div className="buttom">
          <button className="btn" onClick={() => addCarrito(id)}>
            Añadir al carrito
          </button>
          <div>
            <a href={<a href={`/producto/${id}`}>Vista</a>
            } > Vista</a>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default ProductoItems;