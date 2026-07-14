document.addEventListener('DOMContentLoaded', function() {
    const basePath = '/WEB_PERSONAL';
    const navbarContainer = document.getElementById('navbar');
    const footerContainer = document.getElementById('footer');

    // ===== CARGA DE COMPONENTES =====
    fetch(basePath + '/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;
            const currentPath = window.location.pathname;
            const links = navbarContainer.querySelectorAll('.nav-links a');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (currentPath.endsWith(href) || (currentPath === '/' && href === '/')) {
                    link.style.color = 'var(--accent)';
                }
            });
            const toggle = navbarContainer.querySelector('.menu-toggle');
            const navLinks = navbarContainer.querySelector('.nav-links');
            if (toggle && navLinks) {
                toggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                });
            }
        })
        .catch(err => console.warn('Error al cargar navbar:', err));

    fetch(basePath + '/components/footer.html')
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
            // ===== AÑO DINÁMICO EN FOOTER =====
            const yearSpan = footerContainer.querySelector('.current-year');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        })
        .catch(err => console.warn('Error al cargar footer:', err));

    // ===== LOADER =====
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    }

    // ===== TOGGLE DE TEMA (Modo Oscuro/Claro) =====
    const themeToggle = document.getElementById('themeToggle');
    let isDark = true;

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const root = document.documentElement;
            if (isDark) {
                // Cambiar a modo claro (acento morado)
                root.style.setProperty('--bg-primary', '#f8fafc');
                root.style.setProperty('--bg-secondary', '#e2e8f0');
                root.style.setProperty('--text-primary', '#0f172a');
                root.style.setProperty('--text-secondary', '#334155');
                root.style.setProperty('--accent', '#8b5cf6');
                root.style.setProperty('--accent-glow', 'rgba(139, 92, 246, 0.3)');
                root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.5)');
                root.style.setProperty('--border-color', 'rgba(139, 92, 246, 0.2)');
                root.style.setProperty('--shadow-color', 'rgba(139, 92, 246, 0.1)');
                document.querySelector('.theme-icon').textContent = '☀️';
                isDark = false;
            } else {
                // Volver a modo oscuro (acento azul)
                root.style.setProperty('--bg-primary', '#0b0e14');
                root.style.setProperty('--bg-secondary', '#1a1f2e');
                root.style.setProperty('--text-primary', '#f1f5f9');
                root.style.setProperty('--text-secondary', '#cbd5e1');
                root.style.setProperty('--accent', '#38bdf8');
                root.style.setProperty('--accent-glow', 'rgba(56, 189, 248, 0.3)');
                root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.03)');
                root.style.setProperty('--border-color', 'rgba(56, 189, 248, 0.15)');
                root.style.setProperty('--shadow-color', 'rgba(56, 189, 248, 0.1)');
                document.querySelector('.theme-icon').textContent = '🌙';
                isDark = true;
            }
        });
    }

    // ===== PARALLAX EN EL FONDO =====
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            header.style.transform = `translateY(${rate * 0.1}px)`;
        });
    }

    // ===== REVELADO AL SCROLL =====
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));

    // ===== EFECTO DE BRILLO EN TARJETAS =====
    document.querySelectorAll('.cert-card, .project-card, .contact-wrapper').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});