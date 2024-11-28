// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>© 2024 Sitio Web Hospital Luis Negreiros. Todos los derechos reservados.</p>
        <nav style={styles.nav}>
          <a href="https://github.com/Kaymi-2022" style={styles.link}>Términos y Condiciones</a>
          <a href="https://github.com/Kaymi-2022" style={styles.link}>Política de Privacidad</a>
          <a href="https://github.com/Kaymi-2022" style={styles.link}>Contacto</a>
        </nav>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    display: "flex",
    flexdirection: "row",
    padding: '20px 0',
    color: '#000',
    textAlign: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px',
  },
  text: {
    margin: '0 0 10px',
    fontSize: '14px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  link: {
    color: '#000',
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default Footer;
