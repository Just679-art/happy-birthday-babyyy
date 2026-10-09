/* ============================================
   HAPPY BIRTHDAY AROHII JI - ENHANCED SCRIPTS
   ============================================ */

// ========== CURSOR SPARKLE TRAIL ==========
const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

(function initSparkles() {
    if (isMobile) return; // Skip sparkles on mobile for performance
    const canvas = document.getElementById('sparkle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const sparkles = [];
    const colors = ['#ff6b8a', '#ffd166', '#9b5de5', '#06d6a0', '#fff'];

    document.addEventListener('mousemove', (e) => {
        for (let i = 0; i < 3; i++) {
            sparkles.push({
                x: e.clientX + (Math.random() - 0.5) * 20,
                y: e.clientY + (Math.random() - 0.5) * 20,
                size: Math.random() * 4 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2 - 1,
                decay: 0.02 + Math.random() * 0.02,
                rotation: Math.random() * 360
            });
        }
    });

    function animateSparkles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = sparkles.length - 1; i >= 0; i--) {
            const s = sparkles[i];
            s.x += s.vx;
            s.y += s.vy;
            s.alpha -= s.decay;
            s.rotation += 5;
            s.size *= 0.98;

            if (s.alpha <= 0) { sparkles.splice(i, 1); continue; }

            ctx.save();
            ctx.globalAlpha = s.alpha;
            ctx.translate(s.x, s.y);
            ctx.rotate(s.rotation * Math.PI / 180);

            // Draw star shape
            ctx.fillStyle = s.color;
            ctx.beginPath();
            for (let j = 0; j < 5; j++) {
                const outerAngle = (Math.PI * 2 / 5) * j - Math.PI / 2;
                const innerAngle = outerAngle + Math.PI / 5;
                ctx.lineTo(Math.cos(outerAngle) * s.size, Math.sin(outerAngle) * s.size);
                ctx.lineTo(Math.cos(innerAngle) * s.size * 0.4, Math.sin(innerAngle) * s.size * 0.4);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        requestAnimationFrame(animateSparkles);
    }

    animateSparkles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
})();

// ========== PRELOADER ==========
window.addEventListener('load', () => {
    const fill = document.querySelector('.loading-fill');
    const percentEl = document.querySelector('.loading-percent');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 12 + 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('preloader').classList.add('hidden');
                document.getElementById('envelope-intro').classList.add('visible');
                createEnvelopeParticles();
            }, 500);
        }
        fill.style.width = progress + '%';
        percentEl.textContent = Math.floor(progress) + '%';
    }, 180);
});

// ========== ENVELOPE PARTICLES ==========
function createEnvelopeParticles() {
    const container = document.getElementById('envelope-particles');
    const emojis = ['✨', '💖', '🌟', '💫'];
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('span');
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.cssText = `
            position: absolute;
            font-size: ${0.8 + Math.random()}rem;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatUp ${8 + Math.random() * 6}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${0.2 + Math.random() * 0.3};
        `;
        container.appendChild(p);
    }
}

// ========== ENVELOPE ==========
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    envelope.classList.add('opened');

    // Start music on user interaction (browsers require user gesture)
    const audio = document.getElementById('birthday-music');
    audio.play().then(() => {
        musicPlaying = true;
        const btn = document.getElementById('music-toggle');
        btn.classList.add('playing');
        btn.querySelector('.music-icon').textContent = '♪';
    }).catch(() => {});

    setTimeout(() => {
        const intro = document.getElementById('envelope-intro');
        intro.classList.add('fade-out');
        document.getElementById('main-content').style.display = 'block';
        launchFireworks();
        startFloatingElements();

        setTimeout(() => {
            intro.style.display = 'none';
            createStars();
            startTypewriter();
        }, 1000);
    }, 1500);
}

// ========== TYPEWRITER ==========
function startTypewriter() {
    const messages = [
        "May your day be as wonderful as you are ✨",
        "You make the world a better place 💖",
        "Wishing you infinite happiness 🌟",
        "Today is all about YOU! 🎉"
    ];
    const el = document.getElementById('typewriter');
    let msgIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 80;

    function type() {
        const current = messages[msgIndex];

        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            speed = 40;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            speed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            speed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            msgIndex = (msgIndex + 1) % messages.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 1500);
}

// ========== FIREWORKS ==========
function launchFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const particles = [];
    const colors = ['#ff6b8a', '#ffd166', '#9b5de5', '#06d6a0', '#118ab2', '#ef476f', '#fff'];

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.4 + 50;
            this.speed = 4 + Math.random() * 3;
            this.alive = true;
            this.trail = [];
        }
        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 10) this.trail.shift();
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.alive = false;
                this.explode();
            }
        }
        explode() {
            const count = isMobile ? 30 + Math.floor(Math.random() * 20) : 80 + Math.floor(Math.random() * 40);
            const color = colors[Math.floor(Math.random() * colors.length)];
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 / count) * i;
                const speed = 2 + Math.random() * 5;
                particles.push(new Particle(this.x, this.y, Math.cos(angle) * speed, Math.sin(angle) * speed, color));
            }
        }
        draw() {
            for (let i = 0; i < this.trail.length; i++) {
                ctx.globalAlpha = i / this.trail.length * 0.5;
                ctx.fillStyle = '#ffd166';
                ctx.beginPath();
                ctx.arc(this.trail[i].x, this.trail[i].y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#fff';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ffd166';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    class Particle {
        constructor(x, y, vx, vy, color) {
            this.x = x; this.y = y;
            this.vx = vx; this.vy = vy;
            this.color = color;
            this.alpha = 1;
            this.decay = 0.012 + Math.random() * 0.008;
            this.size = 2 + Math.random() * 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.04;
            this.vx *= 0.99;
            this.alpha -= this.decay;
            this.size *= 0.995;
        }
        draw() {
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    let fireworkCount = 0;
    const maxFireworks = 20;

    function animate() {
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        if (fireworkCount < maxFireworks && Math.random() < 0.1) {
            fireworks.push(new Firework());
            fireworkCount++;
        }

        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();
            if (!fireworks[i].alive) fireworks.splice(i, 1);
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].alpha <= 0) particles.splice(i, 1);
        }

        if (fireworkCount < maxFireworks || fireworks.length > 0 || particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'none';
        }
    }

    animate();
}

// ========== CONFETTI ==========
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    const confetti = [];
    const colors = ['#ff6b8a', '#ffd166', '#9b5de5', '#06d6a0', '#118ab2', '#fff', '#ef476f'];
    const shapes = ['rect', 'circle', 'triangle'];

    const confettiCount = isMobile ? 80 : 200;
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * 300,
            w: 6 + Math.random() * 8,
            h: 3 + Math.random() * 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            vx: (Math.random() - 0.5) * 4,
            vy: 2 + Math.random() * 4,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 12,
            alpha: 1,
            wobble: Math.random() * 10
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        confetti.forEach(c => {
            c.x += c.vx + Math.sin(c.wobble) * 0.5;
            c.y += c.vy;
            c.rotation += c.rotSpeed;
            c.vy += 0.015;
            c.wobble += 0.05;
            if (c.y > canvas.height - 100) c.alpha -= 0.015;

            if (c.alpha > 0) {
                alive = true;
                ctx.save();
                ctx.globalAlpha = Math.max(0, c.alpha);
                ctx.translate(c.x, c.y);
                ctx.rotate(c.rotation * Math.PI / 180);
                ctx.fillStyle = c.color;

                if (c.shape === 'rect') {
                    ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
                } else if (c.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, c.w / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.moveTo(0, -c.w / 2);
                    ctx.lineTo(c.w / 2, c.w / 2);
                    ctx.lineTo(-c.w / 2, c.w / 2);
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.restore();
            }
        });

        if (alive) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}

// ========== FLOATING ELEMENTS ==========
function startFloatingElements() {
    const container = document.getElementById('floating-elements');
    const emojis = ['❤️', '💖', '✨', '🌟', '💫', '🎂', '🎉', '🎈', '💝', '⭐', '🦋', '🌸'];

    function createFloating() {
        const el = document.createElement('span');
        el.className = 'floating-heart';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
        el.style.animationDuration = (6 + Math.random() * 8) + 's';
        el.style.opacity = 0.2 + Math.random() * 0.3;
        container.appendChild(el);
        setTimeout(() => el.remove(), 14000);
    }

    // Store interval so it can be cleaned up if needed
    setInterval(() => {
        if (document.hidden) return; // Don't create elements when tab is hidden
        createFloating();
    }, isMobile ? 2000 : 1000);
}

// ========== STARS ==========
function createStars() {
    const container = document.getElementById('stars');
    const starCount = isMobile ? 50 : 120;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (1 + Math.random() * 3) + 's');
        star.style.animationDelay = Math.random() * 3 + 's';
        const size = (1 + Math.random() * 3) + 'px';
        star.style.width = size;
        star.style.height = size;
        if (Math.random() > 0.7) {
            star.style.boxShadow = '0 0 6px 1px rgba(255,255,255,0.3)';
        }
        container.appendChild(star);
    }
}

// ========== GIFT BOX ==========
function openGift() {
    const box = document.getElementById('giftBox');
    if (!box.classList.contains('opened')) {
        box.classList.add('opened');
        launchConfetti();

        // Haptic feedback on supported devices
        if (navigator.vibrate) navigator.vibrate(200);
    }
}

// ========== BALLOON POP ==========
let popCount = 0;

function popBalloon(balloon, message) {
    if (balloon.classList.contains('popped')) return;

    balloon.classList.add('popped');
    balloon.style.animation = 'none';
    popCount++;
    document.getElementById('popCount').textContent = popCount;

    // Sound effect simulation via vibration
    if (navigator.vibrate) navigator.vibrate(50);

    const msgEl = document.createElement('div');
    msgEl.className = 'pop-message';
    msgEl.textContent = message;
    balloon.appendChild(msgEl);

    // Mini confetti burst
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${4 + Math.random() * 4}px;
            height: ${4 + Math.random() * 4}px;
            background: var(--color);
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            top: 50%; left: 50%;
            pointer-events: none;
            animation: particleBurst 0.8s forwards;
            --tx: ${(Math.random() - 0.5) * 150}px;
            --ty: ${(Math.random() - 0.5) * 150}px;
        `;
        balloon.appendChild(particle);
    }

    if (!document.getElementById('particle-style')) {
        const style = document.createElement('style');
        style.id = 'particle-style';
        style.textContent = `
            @keyframes particleBurst {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // All popped celebration
    if (popCount === 6) {
        setTimeout(() => launchConfetti(), 300);
    }
}

// ========== MUSIC TOGGLE ==========
let musicPlaying = false;
function toggleMusic() {
    const audio = document.getElementById('birthday-music');
    const btn = document.getElementById('music-toggle');

    if (musicPlaying) {
        audio.pause();
        btn.classList.remove('playing');
        btn.querySelector('.music-icon').textContent = '♫';
    } else {
        audio.play().catch(() => {});
        btn.classList.add('playing');
        btn.querySelector('.music-icon').textContent = '♪';
    }
    musicPlaying = !musicPlaying;
}

// ========== COUNTDOWN WITH RING ANIMATION ==========
function updateCountdown() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    document.getElementById('hours').textContent = String(h).padStart(2, '0');
    document.getElementById('minutes').textContent = String(m).padStart(2, '0');
    document.getElementById('seconds').textContent = String(s).padStart(2, '0');

    // Update SVG rings
    const circumference = 2 * Math.PI * 54; // r=54
    const hourRing = document.querySelector('.ring-hours');
    const minRing = document.querySelector('.ring-minutes');
    const secRing = document.querySelector('.ring-seconds');

    if (hourRing) hourRing.style.strokeDashoffset = circumference - (h / 24) * circumference;
    if (minRing) minRing.style.strokeDashoffset = circumference - (m / 60) * circumference;
    if (secRing) secRing.style.strokeDashoffset = circumference - (s / 60) * circumference;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ========== SCROLL REVEAL ==========
function initScrollReveal() {
    initScratchCard();
    const revealElements = document.querySelectorAll('.wish-card, .letter-card, .countdown-card, .gift-box-container, .balloon-container, .section-divider, .balloon-score, .wheel-container, .wheel-result, .magic-ball-container, .scratch-card-container');
    revealElements.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 4) * 0.1 + 's';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));

    // Timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Letter paragraphs highlight on scroll
    const letterPs = document.querySelectorAll('.letter-body p');
    const letterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('typed');
            }
        });
    }, { threshold: 0.8 });
    letterPs.forEach(p => letterObserver.observe(p));
}

// Initialize scroll reveal when main content is shown
const mainObserver = new MutationObserver(() => {
    const main = document.getElementById('main-content');
    if (main.style.display !== 'none') {
        initScrollReveal();
        mainObserver.disconnect();
    }
});
mainObserver.observe(document.getElementById('main-content'), { attributes: true, attributeFilter: ['style'] });

// ========== 3D TILT ON WISH CARDS ==========
document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.wish-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const rotateX = (y - rect.height / 2) / rect.height * -12;
            const rotateY = (x - rect.width / 2) / rect.width * 12;
            card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Move shine highlight
            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.left = (x - rect.width) + 'px';
                shine.style.top = (y - rect.height) + 'px';
                shine.style.opacity = '1';
            }
        } else {
            card.style.transform = '';
            const shine = card.querySelector('.card-shine');
            if (shine) shine.style.opacity = '0';
        }
    });
});

// ========== CLICK SPARKLE BURST ==========
document.addEventListener('click', (e) => {
    const colors = ['#ff6b8a', '#ffd166', '#9b5de5', '#06d6a0'];
    for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        const angle = (Math.PI * 2 / 8) * i;
        const dist = 30 + Math.random() * 20;
        spark.style.cssText = `
            position: fixed;
            width: 6px; height: 6px;
            background: ${colors[i % colors.length]};
            border-radius: 50%;
            left: ${e.clientX}px; top: ${e.clientY}px;
            pointer-events: none;
            z-index: 99998;
            transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            opacity: 1;
        `;
        document.body.appendChild(spark);

        requestAnimationFrame(() => {
            spark.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
            spark.style.opacity = '0';
        });

        setTimeout(() => spark.remove(), 700);
    }
});

// ========== SPIN WHEEL ==========
let isSpinning = false;
function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;

    const wheel = document.getElementById('wheel');
    const btn = document.getElementById('spinBtn');
    const result = document.getElementById('wheelResult');
    btn.disabled = true;
    result.className = 'wheel-result';
    result.textContent = '';

    const fortunes = [
        'Endless Love 💖', 'A Big Surprise 🎁', 'Dream Trip ✈️', 'New Friends 🤗',
        'Good Luck 🍀', 'Lots of Cake 🎂', 'Pure Happiness 😊', 'Massive Success 🚀'
    ];

    const extraSpins = 5; // full rotations
    const randomDeg = Math.floor(Math.random() * 360);
    const totalDeg = extraSpins * 360 + randomDeg;

    wheel.style.transform = `rotate(${totalDeg}deg)`;

    setTimeout(() => {
        const segIndex = Math.floor(((360 - (randomDeg % 360)) % 360) / 45);
        result.textContent = `🎊 This year brings you: ${fortunes[segIndex]}`;
        result.className = 'wheel-result show';
        launchConfetti();
        isSpinning = false;
        btn.disabled = false;
    }, 4200);
}

// ========== MAGIC 8-BALL ==========
function shakeMagicBall() {
    const ball = document.getElementById('magicBall');
    const answer = document.getElementById('ballAnswer');

    if (ball.classList.contains('shaking')) return;

    const answers = [
        'Yes! 💖', 'Absolutely! ✨', '100% Yes! 🎉', 'Obviously! 😊',
        'For sure! 🌟', 'You bet! 🚀', 'Definitely! 💫', 'Without a doubt! 🍀',
        'YESSS! 🥳', 'Of course! 💝', 'Always! ⭐', 'Totally! 🎂'
    ];

    ball.classList.add('shaking');
    answer.style.opacity = '0';
    answer.textContent = '';

    setTimeout(() => {
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        answer.textContent = randomAnswer;
        answer.className = 'ball-answer revealing';
        ball.classList.remove('shaking');
    }, 700);
}

// ========== SCRATCH CARD ==========
function initScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Set actual canvas size to match display
    canvas.width = 320;
    canvas.height = 200;

    // Draw scratch surface
    const gradient = ctx.createLinearGradient(0, 0, 320, 200);
    gradient.addColorStop(0, '#9b5de5');
    gradient.addColorStop(0.5, '#ff6b8a');
    gradient.addColorStop(1, '#ffd166');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 320, 200);

    // Add text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Here! ✨', 160, 90);
    ctx.font = '14px Poppins, sans-serif';
    ctx.fillText('Use your finger or mouse', 160, 120);

    // Add sparkle dots
    for (let i = 0; i < 30; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.4})`;
        ctx.beginPath();
        ctx.arc(Math.random() * 320, Math.random() * 200, 1 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
    }

    let isScratching = false;

    function scratch(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();

        // Also draw connecting lines for smooth scratching
        ctx.lineWidth = 50;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        if (e.touches) {
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY
            };
        }
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    canvas.addEventListener('mousedown', (e) => { isScratching = true; const p = getPos(e); scratch(p.x, p.y); });
    canvas.addEventListener('mousemove', (e) => { if (isScratching) { const p = getPos(e); scratch(p.x, p.y); } });
    canvas.addEventListener('mouseup', () => isScratching = false);
    canvas.addEventListener('mouseleave', () => isScratching = false);

    // Touch support
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isScratching = true; const p = getPos(e); scratch(p.x, p.y); }, { passive: false });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (isScratching) { const p = getPos(e); scratch(p.x, p.y); } }, { passive: false });
    canvas.addEventListener('touchend', () => isScratching = false);
}

// ========== PARALLAX ON SCROLL ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    // Parallax on hero stars
    const stars = document.getElementById('stars');
    if (stars) stars.style.transform = `translateY(${scrolled * 0.3}px)`;

    // Parallax on shooting stars
    const shooting = document.querySelector('.shooting-stars');
    if (shooting) shooting.style.transform = `translateY(${scrolled * 0.15}px)`;
});

// ========== RESIZE HANDLER ==========
window.addEventListener('resize', () => {
    const fwCanvas = document.getElementById('fireworks-canvas');
    const cfCanvas = document.getElementById('confetti-canvas');
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
    cfCanvas.width = window.innerWidth;
    cfCanvas.height = window.innerHeight;
});
