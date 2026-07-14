// ===== CARGA DE COMPONENTES =====
document.addEventListener('DOMContentLoaded', function() {
    const basePath = '/WEB_PERSONAL';
    const navbarContainer = document.getElementById('navbar');
    const footerContainer = document.getElementById('footer');

    // Cargar navbar
    fetch(basePath + '/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;
            // Resaltar enlace activo
            const currentPath = window.location.pathname;
            const links = navbarContainer.querySelectorAll('.nav-links a');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (currentPath.endsWith(href) || (currentPath === '/' && href === '/')) {
                    link.style.color = '#00ffff';
                    link.style.textShadow = '0 0 20px rgba(0, 255, 255, 0.6)';
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

    // ==========================================
    // ===== ANIMACIONES CON GSAP (LO LOCO) =====
    // ==========================================
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // 1. EFECTO GLITCH EN EL TÍTULO PRINCIPAL (entrada)
    gsap.from('.glitch', {
        duration: 1.5,
        opacity: 0,
        scale: 0.5,
        rotation: 10,
        skewX: 10,
        ease: 'back.out(1.7)',
        delay: 0.5,
    });

    // 2. ANIMACIÓN DE TEXTO "SCRAMBLE" EN LAS TARJETAS
    //    (Al hacer scroll, el texto de las tarjetas parece "desordenarse")
    const scrambleElements = document.querySelectorAll('.cert-card h3, .project-card h3, .about-text h3');
    scrambleElements.forEach(el => {
        const originalText = el.innerText;
        // Dividir el texto en caracteres para el efecto
        const chars = originalText.split('');
        // ... (Esta es una implementación más compleja, se puede hacer con GSAP TextPlugin)
        // Por simplicidad, añadimos una clase que activa la animación CSS
        el.classList.add('scramble-text');
    });

    // 3. ANIMACIÓN DE REVELADO CON EFECTO "GLITCH"
    gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
                // markers: true, // Para depurar
            },
            duration: 1.2,
            opacity: 0,
            y: 80,
            skewX: 5,
            ease: 'power3.out',
            onComplete: () => {
                // Añadir un pequeño "glitch" al final
                el.style.transition = 'all 0.1s';
                setTimeout(() => {
                    el.style.transform = 'skewX(-2px)';
                    setTimeout(() => {
                        el.style.transform = 'skewX(0)';
                    }, 50);
                }, 50);
            }
        });
    });

    // 4. EFECTO DE "TEXTO QUE SE ESCRIBE" (Typewriter con GSAP)
    //    Para el subtítulo o la descripción
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.innerText;
        subtitle.innerText = '';
        const tl = gsap.timeline({ delay: 1.5 });
        tl.to(subtitle, {
            duration: 2,
            text: text,
            ease: 'power1.inOut',
        });
    }

    // 5. ANIMACIÓN DE PARALLAX EN TARJETAS (Sigue al mouse)
    document.querySelectorAll('.card-3d, .glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 6. CURSOR PERSONALIZADO CON EFECTO GLITCH
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Cambiar el cursor al pasar sobre elementos interactivos
        document.querySelectorAll('a, button, .btn, .cert-card, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('glitch');
                cursor.style.width = '50px';
                cursor.style.height = '50px';
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('glitch');
                cursor.style.width = '30px';
                cursor.style.height = '30px';
            });
        });
    }
});