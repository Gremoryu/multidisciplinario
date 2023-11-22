import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Button, Container, Input, InputAdornment, IconButton, Hidden, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/Dataprovider";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import img from "../img/Main_Logo-removebg-preview.png";

export const Navbar = () => {
    const value = useContext(DataContext);
    const [menu, setMenu] = value.menu;
    const [carrito] = value.carrito;
    const [menuVisible, setMenuVisible] = useState(false);
    const [cartMenuVisible, setCartMenuVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const toggleMenuVisible = () => {
        setMenuVisible(!menuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
        setCartMenuVisible(false);
    };

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (value.productos) {
            const filtered = value.productos.filter(producto =>
                producto.title && producto.title.toLowerCase().includes(term.toLowerCase())
            );

            setFilteredProducts(filtered);
        }
    };

    return (
        <div>
            <AppBar position="static" sx={{ maxWidth: "100%", bgcolor: "#FFFFFF", boxShadow: "0px 2px 3px#FFE6BC" }}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Link to="/">
                            <img src={img} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
                        </Link>
                        <Hidden smDown>
                            <Input
                                placeholder="Buscar"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                value={searchTerm}
                                onChange={handleSearchChange}
                                sx={{ flexGrow: 1, color: "#000000", marginRight: "16px" }}
                            />
                        </Hidden>

                        <Hidden smDown>
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
                        </Hidden>

                        <div className="navbar" onClick={toggleMenu}>
                            <div className="cart">
                                <box-icon name="cart"></box-icon>
                                <span className="item_total">{carrito.length}</span>
                            </div>
                        </div>

                        <Hidden mdUp>
                            <IconButton color="inherit" sx={{ color: "#000000", marginLeft: "20px" }} onClick={toggleMenuVisible} >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Menu
                            anchorEl={menuVisible ? document.body : null}
                            open={menuVisible}
                            onClose={closeMenu}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <MenuItem onClick={closeMenu} component={Link} to="/" sx={{ fontSize: "14px" }}>
                                Inicio
                            </MenuItem>
                            <MenuItem onClick={closeMenu} component={Link} to="/productos" sx={{ fontSize: "14px" }}>
                                Productos
                            </MenuItem>
                            <MenuItem onClick={closeMenu} component={Link} to="/inicio" sx={{ fontSize: "14px" }}>
                                Iniciar Sesión
                            </MenuItem>
                            <MenuItem onClick={closeMenu} component={Link} to="/registro" sx={{ fontSize: "14px", backgroundColor: "#ffe6bc" }}>
                                Registrarse
                            </MenuItem>
                        </Menu>

                        {filteredProducts.map((producto) => (
                            <div key={producto.id}>{producto.title}</div>
                        ))}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};
