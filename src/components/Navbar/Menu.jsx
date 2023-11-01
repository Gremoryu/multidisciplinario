import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

export default function CategoryMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
      <Button
        aria-controls="category-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        Categorías
      </Button>
      <Button color="inherit">
        Tendencia
      </Button>
      <Button color="inherit">
        Ofertas
      </Button>
      <Button color="inherit">
        Moda
      </Button>
      <Button color="inherit">
        Mujer
      </Button>
      <Button color="inherit">
        Niños
      </Button>
      <Button color="inherit">
        Mi cuenta
      </Button>

      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Mochilas</MenuItem>
        <MenuItem onClick={handleClose}>Ropa</MenuItem>
        <MenuItem onClick={handleClose}>Zapatos</MenuItem>
        <MenuItem onClick={handleClose}>Joyería</MenuItem>
      </Menu>
    </div>
  );
}
