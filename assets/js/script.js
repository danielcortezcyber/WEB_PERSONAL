// Carga de componentes (navbar y footer)
document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.getElementById('navbar');
    const footerContainer = document.getElementById('footer');

    // Cargar navbar
    fetch('../components/navbar.html')
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
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
        })
        .catch(err => console.warn('Error al cargar footer:', err));
});

// Smooth scroll (opcional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});