const fs = require('fs');

const htmlPath = 'index.html';
const cssPath = 'style.css';

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

const replacements = [
    { from: 'IMAGENES/UBICACIÓN/', to: 'SECCIONES/UBICACIÓN/IMAGENES/' },
    { from: 'IMAGENES/lasierra_residencial_', to: 'SECCIONES/PROTOTIPOS/GALERIA DE PLANOS/lasierra_residencial_' },
    { from: 'IMAGENES/La sierra Residencial A.png', to: 'LOGOS/La sierra Residencial A.png' },
    { from: 'IMAGENES/La sierra Residencial B.png', to: 'LOGOS/La sierra Residencial B.png' },
    { from: 'IMAGENES/La Sierra 2.jpg', to: 'SECCIONES/PROYECTO/IMAGENES/La Sierra 2.jpg' },
    { from: 'IMAGENES/La Sierra 3.jpg', to: 'SECCIONES/PROYECTO/IMAGENES/La Sierra 3.jpg' },
    { from: 'IMAGENES/La Sierra 6.jpg', to: 'SECCIONES/PROYECTO/IMAGENES/La Sierra 6.jpg' },
    { from: 'IMAGENES/La Sierra 7.jpg', to: 'SECCIONES/PROYECTO/IMAGENES/La Sierra 7.jpg' },
    { from: 'IMAGENES/WhatsApp Image 2025-11-18 at 9.17.31 AM (7).jpeg', to: 'SECCIONES/PROYECTO/IMAGENES/WhatsApp Image 2025-11-18 at 9.17.31 AM (7).jpeg' },
    { from: 'IMAGENES/WhatsApp Image 2025-11-18 at 9.17.32 AM (1).jpeg', to: 'SECCIONES/PROYECTO/IMAGENES/WhatsApp Image 2025-11-18 at 9.17.32 AM (1).jpeg' },
    { from: 'IMAGENES/WhatsApp Image 2025-11-18 at 9.17.32 AM.jpeg', to: 'SECCIONES/PROYECTO/IMAGENES/WhatsApp Image 2025-11-18 at 9.17.32 AM.jpeg' },
    { from: 'VIDEOS/20251106_222310000_iOS.MP4', to: 'SECCIONES/PROYECTO/VIDEOS/20251106_222310000_iOS.MP4' },
    { from: 'IMAGENES/La Sierra (3).png', to: 'SECCIONES/HERO/IMAGENES/La Sierra (3).png' },
    { from: 'IMAGENES/La Sierra 5.jpg', to: 'SECCIONES/CONTACTO/IMAGENES/La Sierra 5.jpg' }
];

replacements.forEach(({from, to}) => {
    // global replacement
    html = html.split(from).join(to);
    css = css.split(from).join(to);
});

fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(cssPath, css, 'utf8');

console.log('Paths updated successfully.');
