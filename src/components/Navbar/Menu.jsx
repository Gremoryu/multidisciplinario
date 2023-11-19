import React from "react";
import { Button, Menu, MenuItem, Hidden, useMediaQuery } from "@mui/material";

export default function CategoryMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMobile = useMediaQuery("(max-width:600px)"); 

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
            <Hidden mdDown>
                <Button
                    aria-controls="category-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    color="inherit"
                >
                    Categorías
                </Button>
            </Hidden>
            {isMobile ? ( 
                <>
                
                    <Button color="inherit" style={{ fontSize: "7px" , margin: "0 -10px"}}>
                        Tendencia
                    </Button>
                    <Button color="inherit" style={{ fontSize: "7px", margin: "0 -10px" }}>
                        Ofertas
                    </Button>
                    <Button color="inherit" style={{ fontSize: "7px", margin: "0 -10px" }}>
                        Moda
                    </Button>
                    <Button color="inherit" style={{ fontSize: "7px", margin: "0 -10px"}}>
                        Mujer
                    </Button>
                    <Button color="inherit" style={{ fontSize: "7px", margin: "0 -10px"}}>
                        Niños
                    </Button>
                    <Button color="inherit" style={{ fontSize: "7px", margin: "0 -10px" }}>
                        Mi cuenta
                    </Button>
                </>
            ) : (
                <>
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
                </>
            )}

            

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
