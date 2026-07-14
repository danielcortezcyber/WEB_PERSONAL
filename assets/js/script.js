// ===== CARGA DE COMPONENTES (navbar y footer) =====
document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.getElementById('navbar');
    const footerContainer = document.getElementById('footer');

    // Ruta base para GitHub Pages
    const basePath = '/WEB_PERSONAL';

    // Cargar navbar
    fetch(basePath + '/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;
            // Activar enlace actual en la navbar
            const currentPath = window.location.pathname;
            const links = navbarContainer.querySelectorAll('.nav-links a');
            links.forEach(link => {
                const href = link.getAttribute('href');
                // Comparar rutas
                if (currentPath.endsWith(href) || (currentPath === '/' && href === '/')) {
                    link.style.color = '#38bdf8';
                }
            });
            // Menú móvil
            const toggle = navbarContainer.querySelector('.menu-toggle');
            const navLinks = navbarContainer.querySelector('.nav-links');
            if (toggle && navLinks) {
                toggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                });
            }
        })
        .catch(err => console.warn('Error al cargar navbar:', err));

    // Cargar footer
    fetch(basePath + '/components/footer.html')
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
        })
        .catch(err => console.warn('Error al cargar footer:', err));
});

// ===== ANIMACIONES AL HACER SCROLL (Intersection Observer) =====
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los elementos con clase 'scroll-animate', 'scroll-animate-left', etc.
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Opcional: dejar de observar una vez visible para mejorar rendimiento
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px' // Ajusta para activar un poco antes
        });

        animatedElements.forEach(el => observer.observe(el));
    }
});

// ===== SMOOTH SCROLL (para enlaces internos) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});