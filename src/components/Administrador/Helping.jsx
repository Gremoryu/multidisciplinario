import React, { useState } from 'react';
import Header from './Header';

function Helping() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div>
      <Header OpenSidebar={OpenSidebar} />
      <h2>¡Bienvenido a la página de ayuda!</h2>
      <p>
        Aquí encontrarás información útil para utilizar la aplicación de manera eficiente.
      </p>

      <section>
        <h3>Subir Productos</h3>
        <p>
          Para subir nuevos productos, sigue estos pasos:
        </p>
        <ol>
          <li>Inicia sesión en tu cuenta de administrador.</li>
          <li>Navega a la sección de "Gestión de Productos" en el panel de administración.</li>
          <li>Haz clic en "Agregar Producto" o un botón similar.</li>
          <li>Rellena la información necesaria, como título, precio, descripción, y carga una imagen.</li>
          <li>Guarda los cambios y el nuevo producto estará disponible en tu tienda.</li>
        </ol>
        <p>
          Recuerda proporcionar detalles claros y atractivos para que los clientes comprendan mejor tus productos.
        </p>
      </section>

      {/* Puedes agregar más secciones según sea necesario */}
    </div>
  );
}

export default Helping;
