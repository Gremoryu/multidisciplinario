import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const Add = ({ slug, columns, setOpen, addProduct }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');

  const handleSave = () => {
    const newProduct = {
      id: Date.now(), 
      title,
      price,
      image,
    };

    addProduct(newProduct);

 
    setOpen(false);
  };

  return (
    <div className="add">
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <TextField label="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Add;
