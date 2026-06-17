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
    radius: 180
};

class Star {
    constructor() {
        this.reset(true);
    }

    reset(randomY = false) {
        this.x = Math.random() * width;
        this.y = randomY ? Math.random() * height : -12;
        this.baseSize = Math.random() * 1.8 + 0.35;
        this.size = this.baseSize;
        this.depth = Math.random() * 0.85 + 0.15;
        this.speed = this.depth * 0.28 + 0.08;
        this.twinkle = Math.random() * Math.PI * 2;
        this.color = Math.random() > 0.72 ? "#ffb09e" : "#ffffff";
    }

    draw() {
        const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 5);
        glow.addColorStop(0, this.color);
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.006) * this.depth * 0.18;
        this.twinkle += 0.035;
        this.size = this.baseSize + Math.sin(this.twinkle) * 0.35;

        if (this.y > height + 12 || this.x < -12 || this.x > width + 12) {
            this.reset();
        }

        if (!mouse.active) return;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);

        if (distance > mouse.radius || distance === 0) return;

        const force = (mouse.radius - distance) / mouse.radius;
        this.x -= (dx / distance) * force * 1.6;
        this.y -= (dy / distance) * force * 1.6;
        this.size += force * 2.3;
    }
}

class Spark {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 1;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 1.8 + 0.3;
        this.size = Math.random() * 2 + 0.8;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = "#ff6a45";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life -= 0.018;
        this.size *= 0.985;
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
    const amount = Math.min(360, Math.floor(width * height / 2600));

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

    const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
    cursorGlow.addColorStop(0, "rgba(255, 255, 255, 0.26)");
    cursorGlow.addColorStop(0.28, "rgba(241, 56, 17, 0.2)");
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

            if (distance > 86) continue;

            ctx.strokeStyle = `rgba(255, 176, 158, ${0.08 * (1 - distance / 86)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
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

    for (let i = 0; i < 2; i++) {
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
