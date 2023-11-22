import React, { useState } from 'react';
import { Button, Menu, MenuItem, Hidden, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CategoryMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category) => {
    navigate(`/producto-detalles/${category}`);
    handleClose();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
      <Hidden mdDown>
        <Button aria-controls="category-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
          Categorías
        </Button>
      </Hidden>
      {isMobile ? (
        <>
          <Button color="inherit" style={{ fontSize: '7px', margin: '0 -10px' }} onClick={() => handleCategoryClick('tendencia')}>
            Tendencia
          </Button>
          <Button color="inherit" style={{ fontSize: '7px', margin: '0 -10px' }} onClick={() => handleCategoryClick('ofertas')}>
            Ofertas
          </Button>
          <Button color="inherit" style={{ fontSize: '7px', margin: '0 -10px' }} onClick={() => handleCategoryClick('moda')}>
            Moda
          </Button>
          <Button color="inherit" style={{ fontSize: '7px', margin: '0 -10px' }} onClick={() => handleCategoryClick('mujer')}>
            Mujer
          </Button>
          <Button color="inherit" style={{ fontSize: '7px', margin: '0 -10px' }} onClick={() => handleCategoryClick('niños')}>
            Niños
          </Button>
          <Button color="inherit" style={{ fontSize: '7px', margin: '0 -10px' }} onClick={() => handleCategoryClick('mi-cuenta')}>
            Mi cuenta
          </Button>
        </>
      ) : (
        <>
          <Button color="inherit" onClick={() => handleCategoryClick('tendencia')}>
            Tendencia
          </Button>
          <Button color="inherit" onClick={() => handleCategoryClick('ofertas')}>
            Ofertas
          </Button>
          <Button color="inherit" onClick={() => handleCategoryClick('moda')}>
            Moda
          </Button>
          <Button color="inherit" onClick={() => handleCategoryClick('mujer')}>
            Mujer
          </Button>
          <Button color="inherit" onClick={() => handleCategoryClick('niños')}>
            Niños
          </Button>
          <Button color="inherit" onClick={() => handleCategoryClick('mi-cuenta')}>
            Mi cuenta
          </Button>
        </>
      )}

      <Menu id="category-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleCategoryClick('mochilas')}>Mochilas</MenuItem>
        <MenuItem onClick={() => handleCategoryClick('ropa')}>Ropa</MenuItem>
        <MenuItem onClick={() => handleCategoryClick('zapatos')}>Zapatos</MenuItem>
        <MenuItem onClick={() => handleCategoryClick('joyeria')}>Joyería</MenuItem>
      </Menu>
    </div>
  );
}