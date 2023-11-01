import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/Dataprovider';

const AdminPage = () => {
  const value = useContext(DataContext);
  const [carrito, setCarrito] = value.carrito;

  const [nuevoProducto, setNuevoProducto] = useState({
    title: '',
    price: 0,
  });

  const [editingProduct, setEditingProduct] = useState(null);

  const agregarProducto = () => {
    if (nuevoProducto.title && nuevoProducto.price > 0) {
      const producto = {
        id: Date.now(),
        ...nuevoProducto,
      };
      setCarrito([...carrito, producto]);
      setNuevoProducto({
        title: '',
        price: 0,
      });
    } else {
      alert('Completa los campos obligatorios.');
    }
  };

  const editarProducto = (id) => {
    const productoAEditar = carrito.find((producto) => producto.id === id);
    if (productoAEditar) {
      setEditingProduct({ ...productoAEditar });
    }
  };

  const guardarCambios = () => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === editingProduct.id ? { ...editingProduct } : producto
      )
    );
    setEditingProduct(null);
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
    setCarrito(nuevoCarrito);
  };

  const adminPageStyles = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    maxWidth: '1200px',
    width: '100%',
    minHeight: '100vh',
    margin: '0 auto',
    boxShadow: '0 2px 6px #ffe6bc',
    padding: '0 15px',
    boxSizing: 'border-box',
  };

  const productFormStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  };

  const productListStyles = {
    listStyle: 'none',
    padding: '0',
  };

  const productItemStyles = {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const buttonStyles = {
    backgroundColor: '#3033d3',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  };

  return (
    <div style={adminPageStyles}>
      <h1>Página de Administrador</h1>
      <h2>Productos</h2>

      <div style={productFormStyles}>
        <input
          type="text"
          placeholder="Título del producto"
          value={nuevoProducto.title}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio del producto"
          value={nuevoProducto.price}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, price: parseFloat(e.target.value) })}
        />
        <button onClick={agregarProducto} style={buttonStyles}>
          Agregar Producto
        </button>
      </div>

      {editingProduct ? (
        <div style={productFormStyles}>
          <input
            type="text"
            placeholder="Título del producto"
            value={editingProduct.title}
            onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio del producto"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
          />
          <button onClick={guardarCambios} style={buttonStyles}>
            Guardar Cambios
          </button>
        </div>
      ) : null}

      <ul style={productListStyles}>
        {carrito.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          carrito.map((producto) => (
            <li key={producto.id} style={productItemStyles}>
              {producto.title} - ${producto.price}
              <button onClick={() => editarProducto(producto.id)} style={buttonStyles}>
                Editar
              </button>
              <button onClick={() => eliminarProducto(producto.id)} style={buttonStyles}>
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdminPage;

