// ===== SCENE MANAGEMENT =====
const scenes = {
    scene1: document.getElementById('scene1'),
    scene2: document.getElementById('scene2'),
    scene3: document.getElementById('scene3'),
    scene4: document.getElementById('scene4')
};

// ===== ELEMENTS =====
const giftBox = document.getElementById('giftBox');
const flowerItem = document.getElementById('flowerItem');
const chocolateItem = document.getElementById('chocolateItem');
const letterItem = document.getElementById('letterItem');
const toCakeBtn = document.getElementById('toCakeBtn');
const candles = document.querySelectorAll('.candle');
const birthdayMessage = document.getElementById('birthdayMessage');
const cakeInstruction = document.getElementById('cakeInstruction');
const confettiCanvas = document.getElementById('confetti');
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
    } else {
        stopConfetti();
    }
}

// ===== GIFT BOX =====
giftBox.addEventListener('click', () => {
    giftBox.classList.add('opened');
    
    // subtle animation
    setTimeout(() => {
        showScene('scene2');
    }, 500);
});

// ===== GIFT ITEMS =====
flowerItem.addEventListener('click', () => {
    // go back to sunflowers
    itemClick(flowerItem);
    setTimeout(() => {
        showScene('scene1');
    }, 400);
});

chocolateItem.addEventListener('click', () => {
    // sweet message
    itemClick(chocolateItem);
    alert('🍫 sweet like you!');
});

letterItem.addEventListener('click', () => {
    // go to letter
    itemClick(letterItem);
    setTimeout(() => {
        showScene('scene3');
    }, 400);
});

function itemClick(item) {
    item.style.transform = 'scale(0.95)';
    setTimeout(() => {
        item.style.transform = '';
    }, 200);
}

// ===== CONTINUE TO CAKE =====
toCakeBtn.addEventListener('click', () => {
    toCakeBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        toCakeBtn.style.transform = '';
    }, 200);
    
    setTimeout(() => {
        showScene('scene4');
    }, 300);
});

// ===== CANDLES =====
candles.forEach((candle, index) => {
    candle.addEventListener('click', () => {
        // blow this candle if not already blown
        if (!candle.classList.contains('blown')) {
            candle.classList.add('blown');
            blownCandles++;
            
            // create tiny spark
            createSpark(candle);
            
            // check if all candles are blown
            if (blownCandles === totalCandles) {
                // show birthday message
                birthdayMessage.classList.add('show');
                cakeInstruction.textContent = 'happy birthday! 🎉';
                
                // extra confetti burst
                for (let i = 0; i < 30; i++) {
                    createConfettiBurst();
                }
            }
        }
    });
});

function createSpark(candle) {
    for (let i = 0; i < 5; i++) {
        const spark = document.createElement('div');
        spark.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ffb347;
            border-radius: 50%;
            left: 50%;
            top: -10px;
            pointer-events: none;
            z-index: 10;
            animation: sparkFly 0.6s forwards;
        `;
        
        candle.style.position = 'relative';
        candle.appendChild(spark);
        
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 20;
        const y = Math.sin(angle) * 20 - 10;
        
        spark.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px)`;
        spark.style.opacity = '0';
        
        setTimeout(() => spark.remove(), 600);
    }
}

// add spark animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkFly {
        0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -30px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

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
            size: Math.random() * 6 + 2,
            speedY: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            color: `hsl(${Math.random() * 60 + 30}, 70%, 70%)`,
            rotation: Math.random() * 360
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        confettiParticles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += 0.5;
            
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
            size: Math.random() * 8 + 4,
            speedY: (Math.random() - 0.5) * 3,
            speedX: (Math.random() - 0.5) * 3,
            color: `hsl(${Math.random() * 60 + 30}, 80%, 70%)`,
            rotation: Math.random() * 360
        });
    }
}

// ===== GENTLE ANIMATIONS =====
// subtle sway for sunflowers
const sunflowers = document.querySelectorAll('.sunflower');
let time = 0;

setInterval(() => {
    time += 0.02;
    sunflowers.forEach((flower, i) => {
        const sway = Math.sin(time + i) * 1.5;
        flower.style.transform = `rotate(${sway}deg)`;
    });
}, 50);

// ===== START =====
// ensure first scene is active
showScene('scene1');
