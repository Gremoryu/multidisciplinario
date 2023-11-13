import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div>
      <footer className='footer'>
        <div className='container'>
          <div className='row'>
            <div className='footer-col'>
              <h4> Compañia </h4>
              <ul>
                <li><a href="#">Acerca de nosotros</a></li>
                <li><a href="#">Nuestros servicios</a></li>
                <li><a href="#">Politicas de privacidad</a></li>
                <li><a href="#">Programas afiliados</a></li>
              </ul>
            </div>
            <div className='footer-col'>
              <h4> Obtener ayuda</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Shipping</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Order status</a></li>
                <li><a href="#">Payment options</a></li>
              </ul>
            </div>
            <div className='footer-col'>
              <h4> Tienda Online</h4>
              <ul>
                <li><a href="#">Watch</a></li>
                <li><a href="#">Bag</a></li>
                <li><a href="#">Shoes</a></li>
                <li><a href="#">Dress</a></li>
              </ul>
            </div>
            <div className='footer-col'>
              <h4> Síguenos</h4>
              <div className='social-links'>
                <a href="#"><FacebookIcon /></a>
                <a href="#"><TwitterIcon /></a>
                <a href="#"><InstagramIcon /></a>
                <a href="#"><LinkedInIcon /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
