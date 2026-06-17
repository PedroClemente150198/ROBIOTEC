const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const hero = canvas.closest(".hero");

let width = 0;
let height = 0;
let stars = [];
let particles = [];
const mouse = {
    x: 0,
    y: 0,
    active: false,
    radius: 150
};

class Star {
    constructor() {
        this.reset(true);
    }

    reset(randomY = false) {
        this.x = Math.random() * width;
        this.y = randomY ? Math.random() * height : -12;
        this.baseSize = Math.random() * 3.5 + 1.2;
        this.size = this.baseSize;
        this.depth = Math.random() * 0.85 + 0.15;
        this.speed = this.depth * 0.28 + 0.08;
        this.twinkle = Math.random() * Math.PI * 2;
        this.color = Math.random() > 0.7 ? "#ffb09e" : "#ffffff";
        this.brightness = 0.6 + Math.random() * 0.35;
    }

    draw() {
        // Glow exterior grande
        const outerGlow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 8);
        outerGlow.addColorStop(0, `rgba(255, 255, 255, ${0.08 * this.brightness})`);
        outerGlow.addColorStop(0.4, `rgba(255, 255, 255, ${0.04 * this.brightness})`);
        outerGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 8, 0, Math.PI * 2);
        ctx.fill();

        // Glow medio
        const midGlow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 5);
        midGlow.addColorStop(0, `rgba(${this.color === "#ffb09e" ? "255,176,158" : "255,255,255"}, ${0.15 * this.brightness})`);
        midGlow.addColorStop(0.6, `rgba(${this.color === "#ffb09e" ? "255,176,158" : "255,255,255"}, ${0.08 * this.brightness})`);
        midGlow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = midGlow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo brillante
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.brightness;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.006) * this.depth * 0.18;
        this.twinkle += 0.035;
        this.size = this.baseSize + Math.sin(this.twinkle) * 0.5;
        this.brightness = 0.5 + Math.sin(this.twinkle) * 0.25;

        if (this.y > height + 12 || this.x < -12 || this.x > width + 12) {
            this.reset();
        }

        if (!mouse.active) return;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);

        if (distance > mouse.radius || distance === 0) return;

        const force = (mouse.radius - distance) / mouse.radius;
        this.x -= (dx / distance) * force * 2.2;
        this.y -= (dy / distance) * force * 2.2;
        this.size += force * 3.5;
        this.brightness = Math.min(0.95, this.brightness + force * 0.2);
    }
}

class Spark {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 1;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 2.5 + 0.5;
        this.size = Math.random() * 3.5 + 1.5;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life * 0.9;
        
        // Glow exterior brillante
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, "#ff6a45");
        gradient.addColorStop(0.5, "rgba(255, 106, 69, 0.5)");
        gradient.addColorStop(1, "rgba(255, 106, 69, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Núcleo brillante amarillo
        ctx.fillStyle = "#ffff00";
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life -= 0.012;
        this.size *= 0.98;
    }
}

function resizeCanvas() {
    const rect = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function init() {
    resizeCanvas();
    stars = [];
    particles = [];
    const amount = Math.min(500, Math.floor(width * height / 1800));

    for (let i = 0; i < amount; i++) {
        stars.push(new Star());
    }
}

function drawNebula() {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "rgba(26, 26, 26, 0.32)");
    gradient.addColorStop(0.48, "rgba(241, 56, 17, 0.13)");
    gradient.addColorStop(1, "rgba(47, 128, 255, 0.08)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    if (!mouse.active) return;

    // Glow primario más intenso
    const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
    cursorGlow.addColorStop(0, "rgba(255, 106, 69, 0.4)");
    cursorGlow.addColorStop(0.3, "rgba(241, 56, 17, 0.25)");
    cursorGlow.addColorStop(1, "rgba(241, 56, 17, 0)");
    ctx.fillStyle = cursorGlow;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
    ctx.fill();
}

function connectStars() {
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const distance = Math.hypot(dx, dy);

            if (distance > 120) continue;

            const alpha = 0.12 * (1 - distance / 120);
            ctx.strokeStyle = `rgba(255, 176, 158, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
        }
        
        // Conexión con el mouse - LÍNEAS DE ENERGÍA
        if (mouse.active) {
            const dx = mouse.x - stars[i].x;
            const dy = mouse.y - stars[i].y;
            const distance = Math.hypot(dx, dy);
            
            if (distance < mouse.radius && distance > 5) {
                const alpha = 0.25 * (1 - distance / mouse.radius);
                ctx.strokeStyle = `rgba(255, 106, 69, ${alpha})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    drawNebula();

    stars.forEach((star) => {
        star.update();
        star.draw();
    });

    connectStars();

    particles = particles.filter((particle) => particle.life > 0);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

init();
animate();

function updateMouse(event) {
    const rect = canvas.getBoundingClientRect();
    const point = event.touches ? event.touches[0] : event;

    mouse.x = point.clientX - rect.left;
    mouse.y = point.clientY - rect.top;
    mouse.active = true;

    for (let i = 0; i < 6; i++) {
        particles.push(new Spark(mouse.x, mouse.y));
    }
}

hero.addEventListener("mousemove", updateMouse);
hero.addEventListener("touchmove", updateMouse, { passive: true });
hero.addEventListener("mouseleave", () => {
    mouse.active = false;
});
hero.addEventListener("touchend", () => {
    mouse.active = false;
});

window.addEventListener("resize", () => {
    init();
});
