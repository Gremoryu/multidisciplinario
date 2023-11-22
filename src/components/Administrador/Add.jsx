// Add.tsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

interface AddProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addProduct: (newProduct: any) => void;
  editProduct: (newProduct: any) => void;
  editedProduct: any;
}


const Add: React.FC<AddProps> = ({ setOpen, addProduct, editProduct, editedProduct }) => {
  const [id,setId]=useState (editedProduct ? editedProduct.id : 0);
  const [nombre, setNombre] = useState(editedProduct ? editedProduct.nombre : '');
  const [descripcion, setDescripcion] = useState(editedProduct ? editedProduct.descripcion : '');
  const [id_categoria, setIdCategoria] = useState(editedProduct ? editedProduct.id_categoria : 0);
  const [precio, setPrecio] = useState(editedProduct ? editedProduct.precio : 0);
  const [cantidad_disponible, setCantidadDisponible] = useState(editedProduct ? editedProduct.cantidad_disponible : 0);
  const [url_img, setUrlImg] = useState(editedProduct ? editedProduct.url_img : '');
  const [rating, setRating] = useState(editedProduct ? editedProduct.rating : 0);
  const [id_color, setIdColor] = useState(editedProduct ? editedProduct.id_color : 0);
  const [talla, setTalla] = useState(editedProduct ? editedProduct.talla : '');

  const handleSave = () => {
    const newProduct = {
      id: id !== 0 ? id : editedProduct.id, 
      nombre: nombre !== '' ? nombre : editedProduct.nombre,
      descripcion: descripcion !== '' ? descripcion : editedProduct.descripcion,
      id_categoria: id_categoria !== 0 ? id_categoria : editedProduct.id_categoria,
      precio: precio !== 0 ? precio : editedProduct.precio,
      cantidad_disponible: cantidad_disponible !== 0 ? cantidad_disponible : editedProduct.cantidad_disponible,
      url_img: url_img !== '' ? url_img : editedProduct.url_img,
      rating: rating !== 0 ? rating : editedProduct.rating,
      id_color: id_color !== 0 ? id_color : editedProduct.id_color,
      talla: talla !== '' ? talla : editedProduct.talla,
    };

    if (editedProduct) {
      editProduct(newProduct);
    } else {
      addProduct(newProduct);
    }

    
    setId(0)
    setNombre('');
    setDescripcion('');
    setIdCategoria(0);
    setPrecio(0);
    setCantidadDisponible(0);
    setUrlImg('');
    setRating(0);
    setIdColor(0);
    setTalla('');

    setOpen(false);
  };

  return (
    <div className="add">
      <TextField label="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <TextField label="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      <TextField label="Categoría ID" type="number" value={id_categoria} onChange={(e) => setIdCategoria(Number(e.target.value))} />
      <TextField label="Precio" type="number" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} />
      <TextField label="Cantidad Disponible" type="number" value={cantidad_disponible} onChange={(e) => setCantidadDisponible(Number(e.target.value))} />
      <TextField label="URL de la Imagen" value={url_img} onChange={(e) => setUrlImg(e.target.value)} />
      <TextField label="Rating" type="number" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
      <TextField label="Color ID" type="number" value={id_color} onChange={(e) => setIdColor(Number(e.target.value))} />
      <TextField label="Talla" value={talla} onChange={(e) => setTalla(e.target.value)} />
      <button onClick={handleSave}>{editedProduct ? 'Actualizar' : 'Guardar'}</button>
    </div>
  );
};

export default Add;
