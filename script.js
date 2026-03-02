// ===== SCENE MANAGEMENT =====
const scenes = {
    scene1: document.getElementById('scene-1'),
    scene2: document.getElementById('scene-2'),
    scene3: document.getElementById('scene-3'),
    scene4: document.getElementById('scene-4'),
    scene5: document.getElementById('scene-5')
};

// ===== ELEMENTS =====
const magicalGift = document.getElementById('magicalGift');
const giftItems = document.querySelectorAll('.gift-item-3d');
const toDreamsBtn = document.getElementById('toDreamsBtn');
const eiffelTower = document.getElementById('eiffelTowerContainer');
const replayBtn = document.getElementById('replayBtn');

// ===== STATE =====
let currentDreamIndex = 0;
const dreamLights = ['lightStudy', 'lightChef', 'lightTravel'];
let allDreamsSeen = false;
let blownCandles = 0;
const totalCandles = 6;

// ===== PARTICLES SYSTEM =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `floatParticle ${15 + Math.random() * 10}s infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

function floatParticle() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        setInterval(() => {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            particle.style.transform = `translate(${x}px, ${y}px)`;
        }, 3000);
    });
}

// ===== SCENE TRANSITIONS =====
function showScene(sceneId) {
    Object.values(scenes).forEach(scene => {
        scene.classList.remove('active');
    });
    scenes[sceneId].classList.add('active');
    
    // trigger entrance animations
    if (sceneId === 'scene5') {
        startConfetti();
    } else {
        stopConfetti();
    }
}

// ===== GIFT INTERACTIONS =====
magicalGift.addEventListener('click', () => {
    // open animation
    const giftBox = document.querySelector('.gift-box-3d');
    giftBox.classList.add('opened');
    
    // particle explosion
    for (let i = 0; i < 20; i++) {
        createGiftParticle();
    }
    
    // go to gift contents
    setTimeout(() => {
        showScene('scene2');
    }, 800);
});

function createGiftParticle() {
    const particle = document.createElement('div');
    particle.className = 'gift-particle';
    particle.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background: #e6b450;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        pointer-events: none;
        z-index: 100;
        animation: particleFly 1s forwards;
    `;
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 100;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    particle.style.transform = `translate(${x}px, ${y}px)`;
    particle.style.opacity = '0';
    
    setTimeout(() => particle.remove(), 1000);
}

// add keyframe for particle
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFly {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(0); opacity: 0; }
    }
    
    @keyframes floatParticle {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(50px, -30px); }
        50% { transform: translate(100px, 0); }
        75% { transform: translate(50px, 30px); }
    }
`;
document.head.appendChild(style);

// ===== GIFT ITEMS INTERACTIONS =====
giftItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const id = item.id;
        
        // haptic feedback
        item.style.transform = 'scale(0.9)';
        setTimeout(() => {
            item.style.transform = '';
        }, 200);
        
        // create sparkles
        for (let i = 0; i < 10; i++) {
            createSparkle(item);
        }
        
        // handle each gift
        if (id === 'giftSunflower') {
            // go back to sunflower field
            setTimeout(() => {
                showScene('scene1');
            }, 500);
        } else if (id === 'giftChocolate') {
            // chocolate animation
            alert('🍫 sweet like you!');
        } else if (id === 'giftLetter') {
            // go to letter
            setTimeout(() => {
                showScene('scene3');
            }, 500);
        }
    });
});

function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #e6b450;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        animation: sparkleFly 0.8s forwards;
    `;
    
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 800);
}

// add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFly {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(sparkleStyle);

// ===== LETTER INTERACTIONS =====
toDreamsBtn.addEventListener('click', () => {
    // button animation
    toDreamsBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        toDreamsBtn.style.transform = '';
    }, 200);
    
    // go to dreams
    setTimeout(() => {
        showScene('scene4');
    }, 300);
});

// ===== EIFFEL TOWER DREAMS =====
eiffelTower.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // tower tap animation
    eiffelTower.style.transform = 'scale(0.98)';
    setTimeout(() => {
        eiffelTower.style.transform = '';
    }, 200);
    
    if (!allDreamsSeen) {
        // hide all dreams
        dreamLights.forEach(id => {
            const light = document.getElementById(id);
            if (light) light.classList.remove('active');
        });
        
        // show current dream
        const currentLight = document.getElementById(dreamLights[currentDreamIndex]);
        if (currentLight) {
            currentLight.classList.add('active');
            
            // create sparkles around dream
            for (let i = 0; i < 15; i++) {
                createDreamSparkle(currentLight);
            }
        }
        
        // update counter
        const counterText = document.querySelector('.counter-text');
        const progressFill = document.getElementById('progressFill');
        
        counterText.textContent = `${currentDreamIndex + 1}/3 dreams discovered`;
        progressFill.style.width = `${((currentDreamIndex + 1) / 3) * 100}%`;
        
        // move to next dream
        currentDreamIndex++;
        
        if (currentDreamIndex >= 3) {
            allDreamsSeen = true;
            
            // show all dreams for a moment
            setTimeout(() => {
                dreamLights.forEach(id => {
                    const light = document.getElementById(id);
                    if (light) light.classList.add('active');
                });
                
                // go to cake scene after a moment
                setTimeout(() => {
                    showScene('scene5');
                }, 2000);
            }, 500);
        }
    }
});

function createDreamSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: #e6b450;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        box-shadow: 0 0 20px #e6b450;
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

// ===== CANDLE BLOWING =====
const candles = document.querySelectorAll('.candle');
const blowVisualizer = document.getElementById('blowVisualizer');
const blowInstruction = document.getElementById('blowInstruction');
const finalMessage = document.getElementById('finalMessage');

let blowIntensity = 0;
let blowInterval;

candles.forEach((candle, index) => {
    candle.addEventListener('click', () => {
        blowCandle(index);
    });
});

// simulate blow detection with microphone-like visualizer
blowVisualizer.addEventListener('click', () => {
    // simulate blow
    blowIntensity = Math.min(1, blowIntensity + 0.3);
    
    // animate waves
    const waves = document.querySelectorAll('.wave');
    waves.forEach(wave => {
        wave.style.transform = `scaleY(${1 + blowIntensity})`;
        wave.style.opacity = '0.5';
        setTimeout(() => {
            wave.style.transform = '';
            wave.style.opacity = '';
        }, 300);
    });
    
    // blow out random candle
    if (blownCandles < totalCandles) {
        const randomCandle = Math.floor(Math.random() * totalCandles);
        blowC
