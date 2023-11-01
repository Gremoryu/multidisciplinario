import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Input, InputAdornment, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/Dataprovider";
import SearchIcon from "@mui/icons-material/Search";


export const Navbar = () => {
    const value = useContext(DataContext);
    const [menu, setMenu] = value.menu;
    const [carrito] = value.carrito;

    const toggleMenu = () => {
        setMenu(!menu);
    };

    return (
        <div>
            <AppBar position="static" sx={{ maxWidth: "100%", bgcolor: "#FFFFFF", boxShadow: "0px 2px 3px#FFE6BC" }}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#000000" }}>
                            MARCELLA
                        </Typography>
                        <Input
                            placeholder="Buscar"
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            sx={{ flexGrow: 1, color: "#000000", marginRight: "16px" }} // Ajusta el margen a tu gusto
                        />
                        <Button component={Link} to="/" color="inherit" sx={{ color: "#000000" }}>
                            Inicio
                        </Button>
                        <Button component={Link} to="/productos" color="inherit" sx={{ color: "#000000" }}>
                            Productos
                        </Button>

                        <Button component={Link} to="/inicio" color="inherit" sx={{ color: "#000000" }}>
                            Iniciar Sesión
                        </Button>
                        <Button component={Link} to="/registro" color="inherit" sx={{ color: "#000000", backgroundColor: "#ffe6bc" }}>
                            Registrarse
                        </Button>
                        <div className="navbar" onClick={toggleMenu}>
                            <div className="cart">
                                <box-icon name="cart"></box-icon>
                                <span className="item_total">{carrito.length}</span>
                            </div>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};
