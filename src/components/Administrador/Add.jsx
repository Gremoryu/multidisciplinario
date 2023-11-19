import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const Add = ({ slug, columns, setOpen, addProduct, editProduct, editedProduct }) => {
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [price, setPrice] = useState(editedProduct ? editedProduct.price : 0);
  const [image, setImage] = useState(editedProduct ? editedProduct.image : '');

  const handleSave = () => {
    const newProduct = {
      id: editedProduct ? editedProduct.id : Date.now(),
      title,
      price,
      image,
    };

    if (editedProduct) {
      editProduct(newProduct);
    } else {
      addProduct(newProduct);
    }

    setTitle('');
    setPrice(0);
    setImage('');

    setOpen(false);
  };

  return (
    <div className="add">
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <TextField label="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />

      <button onClick={handleSave}>{editedProduct ? 'Update' : 'Save'}</button>
    </div>
  );
};

export default Add;

