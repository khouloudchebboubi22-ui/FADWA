// scenes
const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const scene3 = document.getElementById('scene3');
const scene4 = document.getElementById('scene4');

// elements
const giftBox = document.getElementById('giftBox');
const flowerBtn = document.getElementById('flowerBtn');
const chocolateBtn = document.getElementById('chocolateBtn');
const letterBtn = document.getElementById('letterBtn');
const toCake = document.getElementById('toCake');
const candles = document.querySelectorAll('.candle');
const progressText = document.getElementById('progressText');
const birthdayMsg = document.getElementById('birthdayMsg');

// state
let blownCount = 0;
const totalCandles = 6;

// show scene function
function showScene(scene) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    scene.classList.add('active');
}

// scene 1: gift box
giftBox.addEventListener('click', () => {
    giftBox.classList.add('open');
    setTimeout(() => showScene(scene2), 500);
});

// scene 2: surprises
flowerBtn.addEventListener('click', () => {
    flowerBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        flowerBtn.style.transform = '';
        showScene(scene1);
    }, 300);
});

chocolateBtn.addEventListener('click', () => {
    chocolateBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        chocolateBtn.style.transform = '';
        alert('🍫 for you!');
    }, 200);
});

letterBtn.addEventListener('click', () => {
    letterBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        letterBtn.style.transform = '';
        showScene(scene3);
    }, 300);
});

// scene 3: continue to cake
toCake.addEventListener('click', () => {
    toCake.style.transform = 'scale(0.9)';
    setTimeout(() => {
        toCake.style.transform = '';
        showScene(scene4);
    }, 200);
});

// scene 4: candles
candles.forEach(candle => {
    candle.addEventListener('click', () => {
        if (!candle.classList.contains('blown')) {
            candle.classList.add('blown');
            blownCount++;
            
            // update progress
            progressText.textContent = `tap candles: ${blownCount}/${totalCandles}`;
            
            // check if all candles are blown
            if (blownCount === totalCandles) {
                birthdayMsg.classList.add('show');
                progressText.style.opacity = '0';
                
                // simple confetti (just a few colors)
                for (let i = 0; i < 30; i++) {
                    createConfetti();
                }
            }
        }
    });
});

// simple confetti
function createConfetti() {
    const colors = ['#ffdb8e', '#b47d56', '#d9b8a6', '#8fbc8f'];
    const confetti = document.createElement('div');
    
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.width = '6px';
    confetti.style.height = '6px';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    
    document.body.appendChild(confetti);
    
    let y = -10;
    let x = parseFloat(confetti.style.left);
    let speed = 2 + Math.random() * 2;
    
    function fall() {
        y += speed;
        confetti.style.top = y + 'px';
        
        if (y < window.innerHeight) {
            requestAnimationFrame(fall);
        } else {
            confetti.remove();
        }
    }
    
    fall();
}

// start with scene 1
showScene(scene1);
