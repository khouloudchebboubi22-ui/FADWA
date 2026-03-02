// Scene management
const scenes = {
    sunflower: document.getElementById('sunflower-field'),
    dreams: document.getElementById('dreams-scene'),
    birthday: document.getElementById('birthday-scene')
};

const mainSunflower = document.getElementById('main-sunflower');
const continueBtn = document.getElementById('continue-to-birthday');

// Confetti setup
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confetti = [];
let animationId = null;

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Confetti class
class ConfettiPiece {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 60 + 30}, 100%, 50%)`;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        ctx.restore();
    }
}

// Start confetti
function startConfetti() {
    for (let i = 0; i < 100; i++) {
        confetti.push(new ConfettiPiece());
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        animationId = requestAnimationFrame(animateConfetti);
    }
    
    animateConfetti();
}

// Stop confetti
function stopConfetti() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti = [];
}

// Switch scenes with animation
function switchScene(fromScene, toScene) {
    fromScene.classList.remove('active');
    
    setTimeout(() => {
        toScene.classList.add('active');
        
        // Start confetti when reaching birthday scene
        if (toScene === scenes.birthday) {
            startConfetti();
        } else {
            stopConfetti();
        }
    }, 100);
}

// Click on main sunflower
mainSunflower.addEventListener('click', () => {
    // Add click animation
    mainSunflower.style.animation = 'pulse 0.5s';
    setTimeout(() => {
        mainSunflower.style.animation = '';
    }, 500);
    
    // Switch to dreams scene
    switchScene(scenes.sunflower, scenes.dreams);
});

// Continue to birthday scene
continueBtn.addEventListener('click', () => {
    // Add button click animation
    continueBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        continueBtn.style.transform = '';
    }, 200);
    
    // Switch to birthday scene
    switchScene(scenes.dreams, scenes.birthday);
});

// Add interactive elements to dream cards
const dreamCards = document.querySelectorAll('.dream-card');

dreamCards.forEach(card => {
    card.addEventListener('click', function() {
        // Pop effect
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // Add sparkle effect
        const emoji = this.querySelector('.dream-emoji');
        emoji.style.animation = 'none';
        emoji.offsetHeight; // Trigger reflow
        emoji.style.animation = 'rotate 4s infinite linear';
    });
});

// Add floating animation to sunflowers in birthday scene
const celebratingSunflowers = document.querySelectorAll('.celebrating-sunflower');
celebratingSunflowers.forEach((sunflower, index) => {
    sunflower.style.animation = `bounce 1s infinite ${index * 0.2}s`;
});

// Typewriter effect for birthday message (optional)
function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize any special effects
document.addEventListener('DOMContentLoaded', () => {
    // Ensure first scene is active
    scenes.sunflower.classList.add('active');
    
    // Add random movement to floating sunflowers
    const floatingSunflowers = document.querySelectorAll('.floating-sunflower');
    floatingSunflowers.forEach(sunflower => {
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 50;
            const randomY = (Math.random() - 0.5) * 50;
            sunflower.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
        }, 3000);
    });
});

// Add keyboard navigation for fun (optional)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        if (scenes.sunflower.classList.contains('active')) {
            switchScene(scenes.sunflower, scenes.dreams);
        } else if (scenes.dreams.classList.contains('active')) {
            switchScene(scenes.dreams, scenes.birthday);
        }
    } else if (e.key === 'ArrowLeft') {
        if (scenes.birthday.classList.contains('active')) {
            switchScene(scenes.birthday, scenes.dreams);
        } else if (scenes.dreams.classList.contains('active')) {
            switchScene(scenes.dreams, scenes.sunflower);
        }
    }
});

// Add touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe right - go to previous scene
            if (scenes.dreams.classList.contains('active')) {
                switchScene(scenes.dreams, scenes.sunflower);
            } else if (scenes.birthday.classList.contains('active')) {
                switchScene(scenes.birthday, scenes.dreams);
            }
        } else {
            // Swipe left - go to next scene
            if (scenes.sunflower.classList.contains('active')) {
                switchScene(scenes.sunflower, scenes.dreams);
            } else if (scenes.dreams.classList.contains('active')) {
                switchScene(scenes.dreams, scenes.birthday);
            }
        }
    }
}

// Add background music (optional - uncomment if you want to add music)
/*
const audio = new Audio('happy-birthday.mp3');
audio.loop = true;

document.addEventListener('click', () => {
    if (scenes.birthday.classList.contains('active') && audio.paused) {
        audio.play().catch(e => console.log('Audio autoplay prevented'));
    }
}, { once: true });
*/
