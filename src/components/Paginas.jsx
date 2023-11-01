import React from "react";
import {Inicio}  from "../Inicio";
import {ProductosLista} from "./Productos/index";
import {Router,  Route, Routes } from 'react-router-dom';


export const Paginas = () => {
  return (
    <section>
      <Router>
        <Routes> 
      <Route   path="/" element={Inicio} />
      <Route path="/productos"  element={ProductosLista} />
    </Routes> 
    </Router>
    </section>
  );
};
