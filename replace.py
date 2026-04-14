import os

html_path = 'index.html'
css_path = 'style.css'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

replacements = [
    ("IMAGENES/UBICACIÓN/", "SECCIONES/UBICACIÓN/IMAGENES/"),
    ("IMAGENES/lasierra_residencial_", "SECCIONES/PROTOTIPOS/GALERIA DE PLANOS/lasierra_residencial_"),
    ("IMAGENES/La sierra Residencial A.png", "LOGOS/La sierra Residencial A.png"),
    ("IMAGENES/La sierra Residencial B.png", "LOGOS/La sierra Residencial B.png"),
    ("IMAGENES/La Sierra 2.jpg", "SECCIONES/PROYECTO/IMAGENES/La Sierra 2.jpg"),
    ("IMAGENES/La Sierra 3.jpg", "SECCIONES/PROYECTO/IMAGENES/La Sierra 3.jpg"),
    ("IMAGENES/La Sierra 6.jpg", "SECCIONES/PROYECTO/IMAGENES/La Sierra 6.jpg"),
    ("IMAGENES/La Sierra 7.jpg", "SECCIONES/PROYECTO/IMAGENES/La Sierra 7.jpg"),
    ("IMAGENES/WhatsApp Image 2025-11-18 at 9.17.31 AM (7).jpeg", "SECCIONES/PROYECTO/IMAGENES/WhatsApp Image 2025-11-18 at 9.17.31 AM (7).jpeg"),
    ("IMAGENES/WhatsApp Image 2025-11-18 at 9.17.32 AM (1).jpeg", "SECCIONES/PROYECTO/IMAGENES/WhatsApp Image 2025-11-18 at 9.17.32 AM (1).jpeg"),
    ("IMAGENES/WhatsApp Image 2025-11-18 at 9.17.32 AM.jpeg", "SECCIONES/PROYECTO/IMAGENES/WhatsApp Image 2025-11-18 at 9.17.32 AM.jpeg"),
    ("VIDEOS/20251106_222310000_iOS.MP4", "SECCIONES/PROYECTO/VIDEOS/20251106_222310000_iOS.MP4"),
    ("IMAGENES/La Sierra (3).png", "SECCIONES/HERO/IMAGENES/La Sierra (3).png"),
    ("IMAGENES/La Sierra 5.jpg", "SECCIONES/CONTACTO/IMAGENES/La Sierra 5.jpg")
]

for r_from, r_to in replacements:
    html = html.replace(r_from, r_to)
    css = css.replace(r_from, r_to)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Replacement successful")
