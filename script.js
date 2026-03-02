// scene management
const scenes = {
    scene1: document.getElementById('scene-1'),
    scene2: document.getElementById('scene-2'),
    scene3: document.getElementById('scene-3'),
    scene4: document.getElementById('scene-4')
};

// elements
const giftBox = document.getElementById('giftBox');
const itemSunflower = document.getElementById('itemSunflower');
const itemChocolate = document.getElementById('itemChocolate');
const itemLetter = document.getElementById('itemLetter');
const toDreams = document.getElementById('toDreams');
const tower = document.getElementById('towerContainer');
const finalMessage = document.getElementById('finalMessage');
const towerHint = document.getElementById('towerHint');

// dream cards
const dream1 = document.getElementById('dream1');
const dream2 = document.getElementById('dream2');
const dream3 = document.getElementById('dream3');
const dreams = [dream1, dream2, dream3];

let currentDreamIndex = -1;
let allDreamsSeen = false;

// switch scene with fade
function showScene(sceneId) {
    Object.values(scenes).forEach(scene => {
        scene.classList.remove('active');
    });
    scenes[sceneId].classList.add('active');
}

// gift box interaction
giftBox.addEventListener('click', () => {
    giftBox.classList.add('opened');
    
    // haptic feedback (visual)
    giftBox.style.transform = 'scale(0.95)';
    setTimeout(() => {
        giftBox.style.transform = '';
    }, 200);
    
    // go to gift contents
    setTimeout(() => {
        showScene('scene2');
    }, 400);
});

// item interactions
itemSunflower.addEventListener('click', () => {
    // visual feedback
    itemSunflower.classList.add('clicked');
    setTimeout(() => {
        itemSunflower.classList.remove('clicked');
    }, 300);
    
    // go back to scene 1 to see sunflower
    setTimeout(() => {
        showScene('scene1');
    }, 400);
});

itemChocolate.addEventListener('click', () => {
    itemChocolate.classList.add('clicked');
    setTimeout(() => {
        itemChocolate.classList.remove('clicked');
    }, 300);
    
    // just a moment of joy
    alert('🍫 for you!');
});

itemLetter.addEventListener('click', () => {
    itemLetter.classList.add('clicked');
    setTimeout(() => {
        itemLetter.classList.remove('clicked');
    }, 300);
    
    // go to letter
    setTimeout(() => {
        showScene('scene3');
    }, 400);
});

// go to dreams
toDreams.addEventListener('click', () => {
    showScene('scene4');
});

// tower interaction - show dreams one by one
tower.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // tower tap animation
    tower.style.transform = 'scale(0.98)';
    setTimeout(() => {
        tower.style.transform = '';
    }, 200);
    
    if (!allDreamsSeen) {
        currentDreamIndex = (currentDreamIndex + 1) % 3;
        
        // hide all dreams
        dreams.forEach(d => d.classList.remove('active'));
        
        // show current dream
        dreams[currentDreamIndex].classList.add('active');
        
        // update hint
        if (currentDreamIndex === 2) {
            towerHint.textContent = 'one more time';
        } else {
            towerHint.textContent = 'keep going';
        }
        
        // if we've shown all dreams
        if (currentDreamIndex === 2) {
            allDreamsSeen = true;
            
            // show final message after a moment
            setTimeout(() => {
                finalMessage.classList.add('show');
                towerHint.textContent = 'happy birthday fadwa ✦';
            }, 800);
        }
    } else {
        // after all dreams seen, clicking shows message again
        finalMessage.classList.add('show');
        towerHint.textContent = 'happy birthday fadwa ✦';
    }
});

// reset everything (optional, for replay)
function resetExperience() {
    currentDreamIndex = -1;
    allDreamsSeen = false;
    dreams.forEach(d => d.classList.remove('active'));
    finalMessage.classList.remove('show');
    giftBox.classList.remove('opened');
    towerHint.textContent = 'click the tower';
    showScene('scene1');
}

// keyboard shortcut to reset (press 'r')
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        resetExperience();
    }
});

// smooth entrance animations
document.querySelectorAll('.scene').forEach(scene => {
    scene.addEventListener('transitionend', () => {
        // trigger any entrance animations
        const items = scene.querySelectorAll('.item');
        items.forEach((item, i) => {
            item.style.animation = `fadeSlideUp 0.5s ${i * 0.1}s both`;
        });
    });
});

// add floating animation to gift box
let floatAngle = 0;
setInterval(() => {
    if (scenes.scene1.classList.contains('active')) {
        floatAngle += 0.02;
        const yOffset = Math.sin(floatAngle) * 5;
        giftBox.style.transform = `translateY(${yOffset}px)`;
    }
}, 50);

// add some gen z micro-interactions
document.querySelectorAll('.item, .btn, .gift-box').forEach(el => {
    el.addEventListener('mousedown', () => {
        el.style.transform = 'scale(0.98)';
    });
    
    el.addEventListener('mouseup', () => {
        el.style.transform = '';
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = '';
    });
});

// auto-hide hints after a while
setTimeout(() => {
    document.querySelectorAll('.hint').forEach(hint => {
        hint.style.transition = 'opacity 0.5s';
        hint.style.opacity = '0.5';
    });
}, 3000);

// celebrate with confetti on final message
const finalMessageObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('show')) {
            // create minimal confetti effect
            for (let i = 0; i < 10; i++) {
                createConfetti();
            }
        }
    });
});

finalMessageObserver.observe(finalMessage, {
    attributes: true,
    attributeFilter: ['class']
});

function createConfetti() {
    const colors = ['#e6b450', '#8b5a2b', '#d4a5a5', '#f39c12'];
    const confetti = document.createElement('div');
    
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.width = '4px';
    confetti.style.height = '4px';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    confetti.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.style.transform = `translateY(${window.innerHeight + 10}px) translateX(${Math.random() * 100 - 50}px)`;
        confetti.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        confetti.remove();
    }, 2000);
}

// start with scene 1
showScene('scene1');
