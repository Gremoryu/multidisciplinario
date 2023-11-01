import React from "react";
import "boxicons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Inicio } from "./Inicio";
import { ProductosLista } from "./components/Productos/index";
import { DataProvider } from "./context/Dataprovider";
import AdminPage from "./components/Administrador";
import InicioSesion from "./components/IniciarSesion/index";
import Registro from "./components/Registro/index"
import {ProductoDetalles} from "./components/Productos/ProductoDetalles"

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<ProductosLista />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/inicio" element={<InicioSesion />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/producto/:id" element={<ProductoDetalles />} />


          </Routes>
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;
