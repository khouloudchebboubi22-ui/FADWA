// ===== SCENE MANAGEMENT =====
const scenes = {
    scene1: document.getElementById('scene1'),
    scene2: document.getElementById('scene2'),
    scene3: document.getElementById('scene3'),
    scene4: document.getElementById('scene4')
};

// ===== ELEMENTS =====
const giftBox = document.getElementById('giftBox');
const flowerCard = document.getElementById('flowerCard');
const chocolateCard = document.getElementById('chocolateCard');
const letterCard = document.getElementById('letterCard');
const toCakeBtn = document.getElementById('toCakeBtn');
const candles = document.querySelectorAll('.candle-item');
const counterFill = document.getElementById('counterFill');
const counterText = document.getElementById('counterText');
const birthdayExplosion = document.getElementById('birthdayExplosion');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

// ===== STATE =====
let blownCandles = 0;
const totalCandles = 6;
let confettiParticles = [];
let confettiAnimation;

// ===== SCENE TRANSITIONS =====
function showScene(sceneId) {
    Object.values(scenes).forEach(scene => {
        scene.classList.remove('active');
    });
    scenes[sceneId].classList.add('active');
    
    if (sceneId === 'scene4') {
        startConfetti();
        createPetalRain();
    } else {
        stopConfetti();
    }
}

// ===== SCENE 1: GIFT BOX =====
giftBox.addEventListener('click', () => {
    giftBox.classList.add('opened');
    
    // create explosion of sparkles
    for (let i = 0; i < 20; i++) {
        createGiftSparkle();
    }
    
    // go to scene 2
    setTimeout(() => {
        showScene('scene2');
    }, 600);
});

function createGiftSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: 50%;
        top: 50%;
        width: 8px;
        height: 8px;
        background: #ffd700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        box-shadow: 0 0 20px #ffd700;
        animation: sparkleExplode 1s forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 100;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    sparkle.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    
    setTimeout(() => sparkle.remove(), 1000);
}

// add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleExplode {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===== SCENE 2: SURPRISE CARDS =====
flowerCard.addEventListener('click', () => {
    cardClick(flowerCard);
    setTimeout(() => showScene('scene1'), 400);
});

chocolateCard.addEventListener('click', () => {
    cardClick(chocolateCard);
    
    // create chocolate message
    const msg = document.createElement('div');
    msg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #8b5a2b;
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 1.5rem;
        z-index: 2000;
        animation: popMessage 1.5s forwards;
    `;
    msg.textContent = '🍫 sweet like you! 🍫';
    document.body.appendChild(msg);
    
    setTimeout(() => msg.remove(), 1500);
});

letterCard.addEventListener('click', () => {
    cardClick(letterCard);
    setTimeout(() => showScene('scene3'), 400);
});

function cardClick(card) {
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 200);
    
    // create ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: 50%;
        top: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle at center, rgba(251, 181, 59, 0.5), transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s forwards;
        z-index: 100;
    `;
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    @keyframes popMessage {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        20% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

// ===== SCENE 3: CONTINUE TO CAKE =====
toCakeBtn.addEventListener('click', () => {
    toCakeBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        toCakeBtn.style.transform = '';
        showScene('scene4');
    }, 200);
});

// ===== SCENE 4: CANDLES =====
candles.forEach((candle, index) => {
    candle.addEventListener('click', () => {
        if (!candle.classList.contains('blown')) {
            // blow this candle
            candle.classList.add('blown');
            blownCandles++;
            
            // update counter
            const progress = (blownCandles / totalCandles) * 100;
            counterFill.style.width = progress + '%';
            counterText.textContent = `${blownCandles}/${totalCandles} candles`;
            
            // create smoke effect
            createSmoke(candle);
            
            // check if all candles are blown
            if (blownCandles === totalCandles) {
                // show birthday explosion
                birthdayExplosion.classList.add('show');
                
                // massive confetti burst
                for (let i = 0; i < 100; i++) {
                    createConfettiBurst();
                }
                
                // create final sparkle shower
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        createFinalSparkle();
                    }, i * 100);
                }
            }
        }
    });
});

function createSmoke(candle) {
    for (let i = 0; i < 5; i++) {
        const smoke = document.createElement('div');
        smoke.style.cssText = `
            position: absolute;
            width: 15px;
            height: 15px;
            background: rgba(200, 200, 200, 0.3);
            border-radius: 50%;
            left: 50%;
            top: -10px;
            filter: blur(3px);
            pointer-events: none;
            animation: smokeFloat 1s forwards;
            z-index: 10;
        `;
        
        candle.style.position = 'relative';
        candle.appendChild(smoke);
        
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 20;
        const y = Math.sin(angle) * 20 - 20;
        
        smoke.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px)`;
        
        setTimeout(() => smoke.remove(), 1000);
    }
}

// add smoke animation
const smokeAnimStyle = document.createElement('style');
smokeAnimStyle.textContent = `
    @keyframes smokeFloat {
        0% { transform: translate(-50%, 0) scale(1); opacity: 0.5; }
        100% { transform: translate(-50%, -50px) scale(2); opacity: 0; }
    }
`;
document.head.appendChild(smokeAnimStyle);

function createFinalSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: 10px;
        height: 10px;
        background: #ffd700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 2000;
        box-shadow: 0 0 30px #ffd700;
        animation: finalSparkle 2s forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 2000);
}

// add final sparkle animation
const finalStyle = document.createElement('style');
finalStyle.textContent = `
    @keyframes finalSparkle {
        0% { transform: scale(0); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.8; }
        100% { transform: scale(3); opacity: 0; }
    }
`;
document.head.appendChild(finalStyle);

// ===== CONFETTI =====
function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function startConfetti() {
    confettiParticles = [];
    for (let i = 0; i < 50; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 3 + 2,
            speedX: (Math.random() - 0.5) * 1,
            color: `hsl(${Math.random() * 60 + 30}, 80%, 60%)`,
            rotation: Math.random() * 360
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        confettiParticles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += 1;
            
            if (p.y > confettiCanvas.height) {
                p.y = -10;
                p.x = Math.random() * confettiCanvas.width;
            }
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            ctx.restore();
        });
        
        confettiAnimation = requestAnimationFrame(animate);
    }
    
    animate();
}

function stopConfetti() {
    if (confettiAnimation) {
        cancelAnimationFrame(confettiAnimation);
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

function createConfettiBurst() {
    for (let i = 0; i < 5; i++) {
        confettiParticles.push({
            x: confettiCanvas.width / 2,
            y: confettiCanvas.height / 2,
            size: Math.random() * 10 + 5,
            speedY: (Math.random() - 0.5) * 5,
            speedX: (Math.random() - 0.5) * 5,
            color: `hsl(${Math.random() * 60 + 30}, 90%, 70%)`,
            rotation: Math.random() * 360
        });
    }
}

// ===== PETAL RAIN =====
function createPetalRain() {
    const petalContainer = document.getElementById('petalRain');
    petalContainer.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: -10px;
            font-size: ${15 + Math.random() * 20}px;
            color: #ffdb8e;
            opacity: ${0.2 + Math.random() * 0.3};
            animation: rain ${5 + Math.random() * 5}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            transform: rotate(${Math.random() * 360}deg);
        `;
        petal.textContent = '🌻';
        petalContainer.appendChild(petal);
    }
}

// ===== ANIMATE SUNFLOWERS =====
const giantSunflower = document.getElementById('dancingSunflower');
let angle = 0;

setInterval(() => {
    angle += 0.02;
    if (giantSunflower) {
        const sway = Math.sin(angle) * 3;
        giantSunflower.style.transform = `translateX(-50%) rotate(${sway}deg)`;
    }
}, 50);

// ===== START =====
// initialize
createPetalRain();
showScene('scene1');
