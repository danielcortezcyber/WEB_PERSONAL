// ===== SISTEMA DE PARTÍCULAS CON ATRACCIÓN AL MOUSE =====
(function() {
    // Obtener el canvas
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) {
        console.warn('No se encontró el canvas #particles-canvas');
        return;
    }
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null };

    // ===== REDIMENSIONAR =====
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // ===== DETECTAR MOUSE =====
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Cuando el mouse sale de la ventana, lo "olvidamos"
    document.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // ===== CLASE PARTÍCULA =====
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1; // Tamaño entre 1 y 4
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
            this.opacity = Math.random() * 0.6 + 0.2;
        }

        update() {
            // Atracción hacia el mouse (efecto de campo de fuerza)
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    this.x += dx * force * 0.03;
                    this.y += dy * force * 0.03;
                }
            }

            // Movimiento libre
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebote en los bordes
            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

            // Degradado neón (cian a magenta)
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size * 2
            );
            gradient.addColorStop(0, `rgba(0, 255, 255, ${this.opacity})`);
            gradient.addColorStop(1, `rgba(255, 0, 255, ${this.opacity * 0.3})`);

            ctx.fillStyle = gradient;
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset para no afectar otros dibujos
        }
    }

    // ===== INICIALIZAR PARTÍCULAS =====
    function initParticles(count = 150) {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    // ===== CONECTAR PARTÍCULAS (líneas) =====
    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    const opacity = 0.3 * (1 - distance / 120);
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    // ===== BUCLE DE ANIMACIÓN =====
    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();

    // ===== REINICIAR AL REDIMENSIONAR =====
    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });
})();