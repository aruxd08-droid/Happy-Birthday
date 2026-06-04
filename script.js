document.addEventListener("DOMContentLoaded", () => {
    const plane = document.getElementById("paper-plane");
    const card = document.getElementById("birthday-card");
    
    const startTime = performance.now();
    const duration = 3500; // 3.5 seconds flight time

    function animatePlane(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (progress < 1) {
            let x, y, angle;
            
            const w = window.innerWidth;
            const h = window.innerHeight;

            if (progress < 0.4) {
                // Stage 1: Entrance swoop
                const t = progress / 0.4;
                x = -50 + (w * 0.4 + 50) * t;
                y = h * 0.8 - (h * 0.4) * Math.sin(t * Math.PI / 2);
                angle = -20;
            } else if (progress < 0.7) {
                // Stage 2: The Loop-de-loop
                const t = (progress - 0.4) / 0.3;
                const loopRadius = 60;
                const centerX = w * 0.4;
                const centerY = h * 0.4;
                
                const theta = (t * 2 * Math.PI) - (Math.PI / 2);
                x = centerX + loopRadius * Math.cos(theta);
                y = centerY + loopRadius * Math.sin(theta) + loopRadius;
                angle = (t * 360) - 20;
            } else {
                // Stage 3: Exit toward top-right
                const t = (progress - 0.7) / 0.3;
                const startX = w * 0.4;
                const startY = h * 0.4;
                x = startX + (w * 0.7 - startX) * t;
                y = startY - (startY + 100) * t;
                angle = -45;
            }

            // Apply styles dynamically
            plane.style.opacity = progress > 0.05 && progress < 0.95 ? 1 : 0;
            plane.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
            
            requestAnimationFrame(animatePlane);
        } else {
            // Flight over: Show card and burst confetti
            plane.style.opacity = 0;
            card.classList.add("show");
            startConfetti();
        }
    }

    // Start the flight after a brief 500ms initial delay
    setTimeout(() => {
        requestAnimationFrame(animatePlane);
    }, 500);

    // Confetti generation
    function startConfetti() {
        const colors = ['#ff477e', '#ff1053', '#6c5ce7', '#00cec9', '#fdcbc4', '#ffeaa7'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -20 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 8 + 6 + 'px';
            confetti.style.height = confetti.style.width;
            
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.opacity = Math.random();

            document.body.appendChild(confetti);

            // Clear element after falling off-screen
            setTimeout(() => confetti.remove(), 5000);
        }
    }
});
