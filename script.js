// ===== SCENE MANAGEMENT =====
const scenes = {
    scene1: document.getElementById('scene1'),
    scene2: document.getElementById('scene2'),
    scene3: document.getElementById('scene3'),
    scene4: document.getElementById('scene4'),
    scene5: document.getElementById('scene5')
};

// ===== ELEMENTS =====
const giftBox = document.getElementById('giftBox');
const surpriseCards = document.querySelectorAll('.surprise-card');
const letterSurprise = document.getElementById('letterSurprise');
const toDreamsBtn = document.getElementById('toDreamsBtn');
const eiffelStage = document.getElementById('eiffelStage');
const blowArea = document.getElementById('blowArea');
const blowMeter = document.getElementById('blowMeter');
const meterFill = document.getElementById('meterFill');
const candles = document.querySelectorAll('.candle');
const finalMessage = document.getElementById('finalMessage');
const replayBtn = document.getElementById('replayBtn');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

// ===== STATE =====
let currentScene = 1;
let blownCandles = 0;
const totalCandles = 6;
let blowPower = 0;
let blowInterval;
let confettiAnimation;
let confettiParticles = [];

// ===== INITIALIZATION =====
function init() {
    createFloatingPetals();
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // setup scene transitions
    setupGiftBox();
    setupSurpriseCards();
    setupLetter();
    setupDreams();
    setupCandles();
    setupReplay();
}

// ===== FLOATING PETALS =====
function createFloatingPetals() {
    const container = document.getElementById('petalContainer');
    const petalCount = 30;
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDelay = Math.random() * 10 + 's';
        petal.style.animationDuration = 10 + Math.random() * 10 + 's';
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(petal);
    }
}

// ===== SCENE TRANSITIONS =====
function showScene(sceneId) {
    Object.values(scenes).forEach(scene => {
        scene.classList.remove('active');
    });
    scenes[sceneId].classList.add('active');
    currentScene = parseInt(sceneId.replace('scene', ''));
    
    if (sceneId === 'scene5') {
        startConfetti();
    } else {
        stopConfetti();
    }
}

// ===== GIFT BOX INTERACTION =====
function setupGiftBox() {
    giftBox.addEventListener('click', () => {
        giftBox.classList.add('opened');
        
        // create sparkle explosion
        for (let i = 0; i < 30; i++) {
            createSparkle(giftBox);
        }
        
        // go to gift contents
        setTimeout(() => {
            showScene('scene2');
        }, 800);
    });
}

function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: var(--sunflower-gold);
        border-radius: 50%;
        left: 50%;
        top: 50%;
        pointer-events: none;
        box-shadow: 0 0 10px var(--sunflower-gold);
        z-index: 100;
        animation: sparkleFly 1s forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 100;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    sparkle.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    sparkle.style.opacity = '0';
    
    setTimeout(() => sparkle.remove(), 1000);
}

// add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFly {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(sparkleStyle);

// ===== SURPRISE CARDS =====
function setupSurpriseCards() {
    surpriseCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            
            // create sparkles
            for (let i = 0; i < 10; i++) {
                createSparkle(card);
            }
            
            // special handling for letter
            if (card.id === 'letterSurprise' && card.classList.contains('flipped')) {
                setTimeout(() => {
                    showScene('scene3');
                }, 1000);
            }
        });
    });
}

// ===== LETTER =====
function setupLetter() {
    toDreamsBtn.addEventListener('click', () => {
        toDreamsBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            toDreamsBtn.style.transform = '';
        }, 200);
        
        setTimeout(() => {
            showScene('scene4');
        }, 300);
    });
}

// ===== DREAMS =====
function setupDreams() {
    const dreamCards = document.querySelectorAll('.dream-card');
    const dots = document.querySelectorAll('.dot');
    let currentDream = 0;
    
    eiffelStage.addEventListener('click', () => {
        // hide all dreams
        dreamCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // show current dream
        dreamCards[currentDream].classList.add('active');
        dots[currentDream].classList.add('active');
        
        // create sparkles
        for (let i = 0; i < 15; i++) {
            createDreamSparkle(dreamCards[currentDream]);
        }
        
        // move to next dream
        currentDream = (currentDream + 1) % dreamCards.length;
        
        // if cycled through all dreams, go to cake
        if (currentDream === 0) {
            setTimeout(() => {
                showScene('scene5');
            }, 1500);
        }
    });
}

function createDreamSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: var(--sunflower-gold);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        box-shadow: 0 0 20px var(--sunflower-gold);
        animation: dreamSparkle 1s forwards;
    `;
    
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// add dream sparkle animation
const dreamSparkleStyle = document.createElement('style');
dreamSparkleStyle.textContent = `
    @keyframes dreamSparkle {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(2) translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px); opacity: 0; }
    }
`;
document.head.appendChild(dreamSparkleStyle);

// ===== CANDLES =====
function setupCandles() {
    blowArea.addEventListener('click', () => {
        // simulate blow
        blowPower += 0.2;
        if (blowPower > 1) blowPower = 1;
        
        // update meter
        meterFill.style.width = (blowPower * 100) + '%';
        
        // blow out candles based on power
        if (blowPower >= 0.2 && blownCandles < totalCandles) {
            const candlesToBlow = Math.floor(blowPower * totalCandles);
            for (let i = 0; i < Math.min(candlesToBlow, totalCandles); i++) {
                if (!candles[i].querySelector('.flame').classList.contains('blown')) {
                    blowCandle(i);
                }
            }
        }
        
        // if all candles blown
        if (blownCandles >= totalCandles) {
            setTimeout(() => {
                finalMessage.classList.add('show');
                startConfetti();
            }, 500);
        }
        
        // reset blow power after a moment
        setTimeout(() => {
            blowPower = 0;
            meterFill.style.width = '0%';
        }, 1000);
    });
    
    // also allow clicking individual candles
    candles.forEach((candle, index) => {
        candle.addEventListener('click', (e) => {
            e.stopPropagation();
            blowCandle(index);
        });
    });
}

function blowCandle(index) {
    const flame = candles[index].querySelector('.flame');
    if (!flame.classList.contains('blown')) {
        flame.classList.add('blown');
        blownCandles++;
        
        // create smoke effect
        createSmoke(candles[index]);
    }
}

function createSmoke(candle) {
    for (let i = 0; i < 5; i++) {
        const smoke = document.createElement('div');
        smoke.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgba(200, 200, 200, 0.3);
            border-radius: 50%;
            left: 50%;
            top: -20px;
            pointer-events: none;
            filter: blur(2px);
            animation: smokeFloat 1s forwards;
        `;
        
        candle.style.position = 'relative';
        candle.appendChild(smoke);
        
        setTimeout(() => smoke.remove(), 1000);
    }
}

// add smoke animation
const smokeStyle = document.createElement('style');
smokeStyle.textContent = `
    @keyframes smokeFloat {
        0% { transform: translate(-50%, 0) scale(1); opacity: 0.5; }
        100% { transform: translate(-50%, -50px) scale(2); opacity: 0; }
    }
`;
document.head.appendChild(smokeStyle);

// ===== REPLAY =====
function setupReplay() {
    replayBtn.addEventListener('click', () => {
        // reset everything
        blownCandles = 0;
        finalMessage.classList.remove('show');
        
        // reset flames
        candles.forEach(candle => {
            const flame = candle.querySelector('.flame');
            flame.classList.remove('blown');
        });
        
        // reset gift box
        giftBox.classList.remove('opened');
        
        // reset surprise cards
        surpriseCards.forEach(card => {
            card.classList.remove('flipped');
        });
        
        // go back to scene 1
        showScene('scene1');
    });
}

// ===== CONFETTI =====
function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

function startConfetti() {
    confettiParticles = [];
    for (let i = 0; i < 150; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: `hsl(${Math.random() * 60 + 30}, 100%, 60%)`,
            rotation: Math.random() * 360
        });
    }
    
    function animateConfetti() {
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
        
        confettiAnimation = requestAnimationFrame(animateConfetti);
    }
    
    animateConfetti();
}

function stopConfetti() {
    if (confettiAnimation) {
        cancelAnimationFrame(confettiAnimation);
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

// ===== ANIMATE SUNFLOWERS =====
function animateSunflowers() {
    const sunflowers = document.querySelectorAll('.sunflower');
    let time = 0;
    
    setInterval(() => {
        time += 0.02;
        sunflowers.forEach((sunflower, i) => {
            const sway = Math.sin(time + i) * 2;
            sunflower.style.transform = `rotate(${sway}deg)`;
        });
    }, 50);
}

// ===== START EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    init();
    animateSunflowers();
    
    // show first scene
    showScene('scene1');
});
