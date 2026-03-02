// Scene management
const scenes = {
    gift: document.getElementById('scene-gift'),
    giftContent: document.getElementById('scene-gift-content'),
    letter: document.getElementById('scene-letter'),
    dreams: document.getElementById('scene-dreams')
};

// Elements
const giftBox = document.getElementById('giftBox');
const openLetter = document.getElementById('openLetter');
const toDreams = document.getElementById('toDreams');
const eiffelTower = document.getElementById('eiffelTower');
const birthdayMessage = document.getElementById('birthdayMessage');

// Dream lights
const dreamStudy = document.getElementById('dreamStudy');
const dreamChef = document.getElementById('dreamChef');
const dreamTravel = document.getElementById('dreamTravel');

let currentDream = null;

// Switch scenes with fade
function showScene(scene) {
    Object.values(scenes).forEach(s => {
        s.classList.remove('active');
    });
    scene.classList.add('active');
}

// Gift box interaction
giftBox.addEventListener('click', () => {
    giftBox.classList.add('opened');
    
    // Show gift contents after animation
    setTimeout(() => {
        showScene(scenes.giftContent);
    }, 300);
});

// Open letter
openLetter.addEventListener('click', () => {
    showScene(scenes.letter);
});

// Go to dreams
toDreams.addEventListener('click', () => {
    showScene(scenes.dreams);
});

// Eiffel Tower dream lights
eiffelTower.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Cycle through dreams
    const dreams = [
        { element: dreamStudy, name: 'study' },
        { element: dreamChef, name: 'chef' },
        { element: dreamTravel, name: 'travel' }
    ];
    
    // Find next dream to show
    let nextIndex = 0;
    
    if (currentDream) {
        currentDream.element.classList.remove('active');
        
        const currentIndex = dreams.findIndex(d => d.element === currentDream.element);
        nextIndex = (currentIndex + 1) % dreams.length;
    }
    
    // Show next dream
    currentDream = dreams[nextIndex];
    currentDream.element.classList.add('active');
    
    // After showing all dreams, show birthday message
    if (nextIndex === 2) { // After showing travel dream
        setTimeout(() => {
            birthdayMessage.classList.add('show');
        }, 500);
    }
    
    // Add tower animation
    eiffelTower.style.transform = 'scale(0.98)';
    setTimeout(() => {
        eiffelTower.style.transform = '';
    }, 200);
});

// Optional: Click anywhere on dreams scene to cycle
const dreamsScene = document.getElementById('scene-dreams');
dreamsScene.addEventListener('click', (e) => {
    // Only trigger if clicking directly on the scene (not on messages)
    if (e.target === dreamsScene || e.target.classList.contains('dreams-container')) {
        // Simulate tower click
        const clickEvent = new Event('click');
        eiffelTower.dispatchEvent(clickEvent);
    }
});

// Add floating animation to ambient sunflowers
const ambientSunflowers = document.querySelectorAll('.ambient-sunflower');
ambientSunflowers.forEach((flower, index) => {
    setInterval(() => {
        const yOffset = Math.sin(Date.now() * 0.001 + index) * 10;
        flower.style.transform = `translateY(${yOffset}px)`;
    }, 50);
});

// Initialize - ensure first scene is active
showScene(scenes.gift);

// Add subtle hover effect to sunflower in first scene
const mainSunflower = document.querySelector('.sunflower.main');
if (mainSunflower) {
    mainSunflower.addEventListener('mouseenter', () => {
        mainSunflower.style.transform = 'rotate(5deg)';
    });
    
    mainSunflower.addEventListener('mouseleave', () => {
        mainSunflower.style.transform = '';
    });
}

// Add keyboard navigation (optional)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Reset to first scene
        showScene(scenes.gift);
        if (currentDream) {
            currentDream.element.classList.remove('active');
            currentDream = null;
        }
        birthdayMessage.classList.remove('show');
    }
});

// Add touch support for mobile
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
    const threshold = 50;
    const diff = touchEndX - touchStartX;
    
    if (Math.abs(diff) > threshold) {
        // Find current scene index
        const sceneArray = Object.values(scenes);
        const currentIndex = sceneArray.findIndex(s => s.classList.contains('active'));
        
        if (diff > 0 && currentIndex > 0) {
            // Swipe right - go back
            showScene(sceneArray[currentIndex - 1]);
        } else if (diff < 0 && currentIndex < sceneArray.length - 1) {
            // Swipe left - go forward
            showScene(sceneArray[currentIndex + 1]);
        }
    }
}

// Add smooth transitions between scenes
const style = document.createElement('style');
style.textContent = `
    .scene {
        transition: opacity 0.5s ease;
    }
    
    .gift-box {
        transition: transform 0.3s ease;
    }
    
    .gift-lid {
        transition: transform 0.3s ease;
    }
    
    .dream-light {
        transition: opacity 0.5s ease, transform 0.3s ease;
    }
    
    .dream-light.active {
        animation: fadeInLight 0.5s ease;
    }
    
    @keyframes fadeInLight {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
