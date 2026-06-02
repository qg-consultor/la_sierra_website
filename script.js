$(document).ready(function() {
    
    // 1. Water Ripple Effect Disabled
    // Disabled intentionally: it causes a solid-color glitch (WebGL failure) when running the site from local file:/// paths.
    // If you host this online (HTTPS), you can uncomment this to enable it again.
    /*
    try {
        $('#hero').ripples({
            resolution: 512,
            dropRadius: 20, 
            perturbance: 0.02 
        });
    } catch (e) {
        $('.error').show().text(e);
    }
    
    setInterval(function() {
        var $el = $('#hero');
        var x = Math.random() * $el.outerWidth();
        var y = Math.random() * $el.outerHeight();
        var dropRadius = 15;
        var strength = 0.01 + Math.random() * 0.02;

        $el.ripples('drop', x, y, dropRadius, strength);
    }, 4000);
    */

    // 2. Interactive Hotspots (Click to toggle tooltips)
    // Requirements: "When clicked open a small floating tooltip describing property features."
    $('.hotspot').on('click', function(e) {
        // Prevent click from propagating to the hero background if we don't want ripples exactly where clicked,
        // but let's allow it so user sees a ripple under the click!
        
        const $this = $(this);
        
        // Toggle active class on this hotspot
        $this.toggleClass('active');
        
        // Remove active class from all other hotspots to close their tooltips
        $('.hotspot').not($this).removeClass('active');
        
        e.stopPropagation();
    });

    // Close tooltips when clicking anywhere else on the document
    $(document).on('click', function(e) {
        $('.hotspot').removeClass('active');
    });

    // 3. Herramienta temporal de coordenadas (Loguea top/left en consola al hacer clic en Hero)
    $('#hero').on('click', function(e) {
        var x = (e.pageX / $(this).width() * 100).toFixed(1);
        var y = (e.pageY / $(this).height() * 100).toFixed(1);
        console.log("Coordenadas: top: " + y + "%; left: " + x + "%;");
    });
    // 3. Prevent ripples from intercepting standard button clicks
    $('button, a').on('mouseenter', function() {
        // Optional: stop ripples when hovering over buttons to keep it clean,
        // or just let it be. We will let it be.
    });

    // 4. Lógica del Carrusel de la Galería "Proyecto"
    const nextBtn = document.getElementById('btn-next');
    const prevBtn = document.getElementById('btn-prev');
    const gallery = document.getElementById('gallery-carousel');

    if (nextBtn && prevBtn && gallery) {
        const scrollAmount = 370; // Ancho de tarjeta (350) + gap (20)

        nextBtn.addEventListener('click', () => {
            gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // 5. Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) { // Mostrar si baja más de 300px
            $(backToTopBtn).addClass('visible');
        } else {
            $(backToTopBtn).removeClass('visible');
        }
    });

    // 6. Lógica del Carrusel "Prototipos"
    const protoNextBtn = document.getElementById('proto-btn-next');
    const protoPrevBtn = document.getElementById('proto-btn-prev');
    const protoGallery = document.getElementById('prototipos-carousel');

    if (protoNextBtn && protoPrevBtn && protoGallery) {
        protoNextBtn.addEventListener('click', () => {
             const cardWidth = protoGallery.querySelector('.proto-card').offsetWidth;
             const gap = 20; 
             protoGallery.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        });

        protoPrevBtn.addEventListener('click', () => {
             const cardWidth = protoGallery.querySelector('.proto-card').offsetWidth;
             const gap = 20;
             protoGallery.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        });
    }

    // 7. Lógica de la Galería de Planos (Floorplans)
    const fpNextBtn = document.getElementById('fp-btn-next');
    const fpPrevBtn = document.getElementById('fp-btn-prev');
    const fpGallery = document.getElementById('floorplan-carousel');

    if (fpNextBtn && fpPrevBtn && fpGallery) {
        fpNextBtn.addEventListener('click', () => {
             const cardWidth = fpGallery.querySelector('.fp-card').offsetWidth;
             const gap = 30; // gap from CSS
             fpGallery.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        });

        fpPrevBtn.addEventListener('click', () => {
             const cardWidth = fpGallery.querySelector('.fp-card').offsetWidth;
             const gap = 30;
             fpGallery.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        });
    }

});

/* =========================================
   MASTER PLAN MAPA INTERACTIVO
========================================= */
document.addEventListener('DOMContentLoaded', () => {

        const tooltip = document.getElementById('tooltip');
        const ttTitle = document.getElementById('tt-title');
        const ttDesc = document.getElementById('tt-desc');
        const ttBtn = document.getElementById('tt-btn');

        const LOT_DATA = {
            'lote-52': { title: 'Lote 30', desc: 'Const: 181.10 m² | Terr: 141.40 m² • Disponible' },
            'lote-64': { title: 'Lote 36', desc: 'Const: 181.10 m² | Terr: 141.40 m² • Disponible' },
            'lote-68': { title: 'Lote 38', desc: 'Const: 158.00 m² | Terr: 141.40 m² • Disponible' },
            'lote-70': { title: 'Lote 39', desc: 'Const: 158.00 m² | Terr: 141.40 m² • Disponible' },
            'lote-76': { title: 'Lote 42', desc: 'Const: 158.00 m² | Terr: 216.10 m² • Disponible' },
            'lote-78': { title: 'Lote 43', desc: 'Const: 158.00 m² | Terr: 158.68 m² • Disponible' },
            'lote-80': { title: 'Lote 44', desc: 'Const: 158.00 m² | Terr: 160.94 m² • Disponible' },
            'lote-82': { title: 'Lote 45', desc: 'Const: 158.00 m² | Terr: 163.20 m² • Disponible' },
            'lote-84': { title: 'Lote 46', desc: 'Const: 158.00 m² | Terr: 165.45 m² • Disponible' },
            'lote-88': { title: 'Lote 48', desc: 'Const: 158.00 m² | Terr: 140.00 m² • Disponible' },
            'lote-90': { title: 'Lote 49', desc: 'Const: 158.00 m² | Terr: 140.00 m² • Disponible' },
            'lote-96': { title: 'Lote 52', desc: 'Const: 158.00 m² | Terr: 150.48 m² • Disponible' },
            'lote-158': { title: 'Depto J3', desc: 'Const: 117.00 m² | Terr: 136.60 m² • Disponible' },
            'lote-150': { title: 'Depto K2', desc: 'Const: 117.00 m² | Terr: 136.60 m² • Disponible' }
        };

        window.addEventListener('load', () => {
            setTimeout(() => {
                const svgElement = document.querySelector('.map-container svg');
                if(!svgElement) return;

                const ashuradoHTML = `
                <defs>
                    <pattern id="ashurado-vendido" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                        <rect width="12" height="12" fill="rgba(0,0,0,0.1)" />
                        <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(0,0,0,0.25)" stroke-width="1" />
                    </pattern>
                    <pattern id="ashurado-verde" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                        <rect width="10" height="10" fill="rgba(127,155,79,0.15)" />
                        <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(127,155,79,0.5)" stroke-width="1.5" />
                    </pattern>
                </defs>`;
                
                if(!document.getElementById('ashurado-vendido')) {
                    svgElement.insertAdjacentHTML('afterbegin', ashuradoHTML);
                }

                const shapes = document.querySelectorAll('.map-container svg path, .map-container svg rect, .map-container svg polygon, .st1, .lote-magico');
                let counter = 1;

                shapes.forEach(shape => {
                    const rect = shape.getBoundingClientRect();
                    if (rect.width > 5 && rect.height > 5 && rect.width < 500) {
                        const id = 'lote-' + counter;
                        shape.setAttribute('id', id);
                        
                        if (LOT_DATA[id]) {
                            shape.setAttribute('data-title', LOT_DATA[id].title);
                            shape.setAttribute('data-desc', LOT_DATA[id].desc);
                            shape.classList.add('lote-disponible', 'lote-activo', 'lote-magico');
                        } else {
                            shape.setAttribute('data-title', 'No Disponible');
                            shape.setAttribute('data-desc', 'Esta unidad ya fue vendida o escriturada.');
                            shape.classList.add('lote-vendido', 'lote-activo'); 
                        }
                        counter++;
                    }
                });
            }, 1000); 
        });

        document.addEventListener('click', (e) => {
            const lote = e.target.closest('.lote-activo');
            document.querySelectorAll('.lote-seleccionado').forEach(el => el.classList.remove('lote-seleccionado'));
            
            if(lote) {
                e.stopPropagation(); 
                lote.classList.add('lote-seleccionado');

                const titulo = lote.getAttribute('data-title');
                ttTitle.textContent = titulo;
                ttDesc.textContent = lote.getAttribute('data-desc');
                
                if (titulo === 'No Disponible') {
                    ttBtn.style.display = 'none';
                } else {
                    ttBtn.style.display = 'inline-block';
                }
                
                tooltip.style.left = (e.pageX + 15) + 'px';
                tooltip.style.top = (e.pageY + 15) + 'px';
                tooltip.classList.add('visible');
            } else if (!e.target.closest('#tooltip')) {
/* =========================================
   MASTER PLAN MAPA INTERACTIVO
========================================= */

        const tooltip = document.getElementById('tooltip');
        const ttTitle = document.getElementById('tt-title');
        const ttDesc = document.getElementById('tt-desc');
        const ttBtn = document.getElementById('tt-btn');

        const LOT_DATA = {
            'lote-52': { title: 'Lote 30', desc: 'Const: 181.10 m² | Terr: 141.40 m² • Disponible' },
            'lote-64': { title: 'Lote 36', desc: 'Const: 181.10 m² | Terr: 141.40 m² • Disponible' },
            'lote-68': { title: 'Lote 38', desc: 'Const: 158.00 m² | Terr: 141.40 m² • Disponible' },
            'lote-70': { title: 'Lote 39', desc: 'Const: 158.00 m² | Terr: 141.40 m² • Disponible' },
            'lote-76': { title: 'Lote 42', desc: 'Const: 158.00 m² | Terr: 216.10 m² • Disponible' },
            'lote-78': { title: 'Lote 43', desc: 'Const: 158.00 m² | Terr: 158.68 m² • Disponible' },
            'lote-80': { title: 'Lote 44', desc: 'Const: 158.00 m² | Terr: 160.94 m² • Disponible' },
            'lote-82': { title: 'Lote 45', desc: 'Const: 158.00 m² | Terr: 163.20 m² • Disponible' },
            'lote-84': { title: 'Lote 46', desc: 'Const: 158.00 m² | Terr: 165.45 m² • Disponible' },
            'lote-88': { title: 'Lote 48', desc: 'Const: 158.00 m² | Terr: 140.00 m² • Disponible' },
            'lote-90': { title: 'Lote 49', desc: 'Const: 158.00 m² | Terr: 140.00 m² • Disponible' },
            'lote-96': { title: 'Lote 52', desc: 'Const: 158.00 m² | Terr: 150.48 m² • Disponible' },
            'lote-158': { title: 'Depto J3', desc: 'Const: 117.00 m² | Terr: 136.60 m² • Disponible' },
            'lote-150': { title: 'Depto K2', desc: 'Const: 117.00 m² | Terr: 136.60 m² • Disponible' }
        };

        window.addEventListener('load', () => {
            setTimeout(() => {
                const svgElement = document.querySelector('.map-container svg');
                if(!svgElement) return;

                const ashuradoHTML = `
                <defs>
                    <pattern id="ashurado-vendido" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                        <rect width="12" height="12" fill="rgba(0,0,0,0.1)" />
                        <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(0,0,0,0.25)" stroke-width="1" />
                    </pattern>
                    <pattern id="ashurado-verde" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                        <rect width="10" height="10" fill="rgba(127,155,79,0.15)" />
                        <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(127,155,79,0.5)" stroke-width="1.5" />
                    </pattern>
                </defs>`;
                
                if(!document.getElementById('ashurado-vendido')) {
                    svgElement.insertAdjacentHTML('afterbegin', ashuradoHTML);
                }

                const shapes = document.querySelectorAll('.map-container svg path, .map-container svg rect, .map-container svg polygon, .st1, .lote-magico');
                let counter = 1;

                shapes.forEach(shape => {
                    const rect = shape.getBoundingClientRect();
                    if (rect.width > 5 && rect.height > 5 && rect.width < 500) {
                        const id = 'lote-' + counter;
                        shape.setAttribute('id', id);
                        
                        if (LOT_DATA[id]) {
                            shape.setAttribute('data-title', LOT_DATA[id].title);
                            shape.setAttribute('data-desc', LOT_DATA[id].desc);
                            shape.classList.add('lote-disponible', 'lote-activo', 'lote-magico');
                        } else {
                            shape.setAttribute('data-title', 'No Disponible');
                            shape.setAttribute('data-desc', 'Esta unidad ya fue vendida o escriturada.');
                            shape.classList.add('lote-vendido', 'lote-activo'); 
                        }
                        counter++;
                    }
                });
            }, 1000); 
        });

        document.addEventListener('click', (e) => {
            const lote = e.target.closest('.lote-activo');
            document.querySelectorAll('.lote-seleccionado').forEach(el => el.classList.remove('lote-seleccionado'));
            
            if(lote) {
                e.stopPropagation(); 
                lote.classList.add('lote-seleccionado');

                const titulo = lote.getAttribute('data-title');
                ttTitle.textContent = titulo;
                ttDesc.textContent = lote.getAttribute('data-desc');
                
                if (titulo === 'No Disponible') {
                    ttBtn.style.display = 'none';
                } else {
                    ttBtn.style.display = 'inline-block';
                }
                
                tooltip.style.left = (e.pageX + 15) + 'px';
                tooltip.style.top = (e.pageY + 15) + 'px';
                tooltip.classList.add('visible');
            } else if (!e.target.closest('#tooltip')) {
                tooltip.classList.remove('visible');
                document.querySelectorAll('.lote-seleccionado').forEach(el => el.classList.remove('lote-seleccionado'));
            }
        });

        ttBtn.addEventListener('click', () => {
            alert("¡Llevando al cliente al formulario de contacto!");
        });
    
/* =========================================
   LIGHTBOX GALERIA PLANOS
========================================= */
    const fpCards = document.querySelectorAll('.fp-card');
    const lightbox = document.getElementById('fp-lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbTitle = document.getElementById('lb-title');
    const lbClose = document.getElementById('fp-close');
    const lbPrev = document.getElementById('lb-btn-prev');
    const lbNext = document.getElementById('lb-btn-next');

    if (lightbox && fpCards.length > 0) {
        const fpData = [
            { title: 'CASA <span class="text-green">TIPO 1</span>', src: 'SECCIONES/PROTOTIPOS/GALERIA DE PLANOS/lasierra_residencial_casatipo1.png' },
            { title: 'CASA <span class="text-green">TIPO 2</span>', src: 'SECCIONES/PROTOTIPOS/GALERIA DE PLANOS/lasierra_residencial_casatipo2.png' },
            { title: 'CASA <span class="text-green">TIPO 3</span>', src: 'SECCIONES/PROTOTIPOS/GALERIA DE PLANOS/lasierra_residencial_casatipo3.png' },
            { title: 'CASA <span class="text-green">TIPO 4</span>', src: 'SECCIONES/PROTOTIPOS/GALERIA DE PLANOS/lasierra_residencial_casatipo4.jpg' },
            { title: 'DEPA <span class="text-green">TIPO 1</span>', src: 'SECCIONES/PROTOTIPOS/GALERIA DE PLANOS/lasierra_residencial_depatipo1.png' },
            { title: 'DEPA <span class="text-green">TIPO 2</span>', src: 'SECCIONES/PROTOTIPOS/GALERIA DE PLANOS/lasierra_residencial_depatipo2.png' },
            { title: 'DEPA <span class="text-green">TIPO 3</span>', src: 'SECCIONES/PROTOTIPOS/GALERIA DE PLANOS/lasierra_residencial_depatipo3.png' }
        ];

        let currentLbIndex = 0;

        function openLightbox(index) {
            currentLbIndex = index;
            lbImg.src = fpData[index].src;
            lbTitle.innerHTML = fpData[index].title;
            lightbox.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }

        fpCards.forEach((card) => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.getAttribute('data-index'), 10);
                if (!isNaN(idx)) openLightbox(idx);
            });
        });

        if (lbClose) {
            lbClose.addEventListener('click', () => {
                lightbox.classList.remove('visible');
                document.body.style.overflow = 'auto';
            });
        }

        if (lbPrev) {
            lbPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                currentLbIndex = (currentLbIndex > 0) ? currentLbIndex - 1 : fpData.length - 1;
                openLightbox(currentLbIndex);
            });
        }

        if (lbNext) {
            lbNext.addEventListener('click', (e) => {
                e.stopPropagation();
                currentLbIndex = (currentLbIndex < fpData.length - 1) ? currentLbIndex + 1 : 0;
                openLightbox(currentLbIndex);
            });
        }
        
        // Clic fuera de la imagen también cierra (cuidado con los botones de flecha)
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox || e.target.classList.contains('fp-lightbox-content')) {
                lightbox.classList.remove('visible');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

