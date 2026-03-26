document.addEventListener('DOMContentLoaded', () => {
    const clockDisplay = document.querySelector('.clock');
    const backToTopBtn = document.getElementById('back-to-top');

    const START_HOUR = 6;
    const END_HOUR = 30;

    // TODO: Replace these facts with your own fun facts!
    const facts = [
        "Fun fact #1 about yourself — make it memorable or funny!",
        "Fun fact #2 — a surprising hobby, skill, or achievement.",
        "Fun fact #3 — something quirky or unexpected about you.",
        "Fun fact #4 — a goal, dream, or record you're proud of.",
        "Fun fact #5 — your favorite place, food, book, or quote."
    ];
    let currentFactIndex = 0;
    const factText = document.getElementById('fact-text');
    const factNumber = document.getElementById('fact-number');
    const nextFactBtn = document.getElementById('next-fact-btn');

    if (nextFactBtn) {
        nextFactBtn.addEventListener('click', () => {
            currentFactIndex = (currentFactIndex + 1) % facts.length;
            factText.style.opacity = 0;
            setTimeout(() => {
                factText.textContent = facts[currentFactIndex];
                factNumber.textContent = currentFactIndex + 1;
                factText.style.opacity = 1;
            }, 200);
        });
    }

    function updateTime() {
        const scrollTop = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));

        const totalHours = END_HOUR - START_HOUR;
        const currentHour = START_HOUR + (scrollProgress * totalHours);

        // Clock Display
        let displayHour = Math.floor(currentHour) % 24;
        let displayMinute = Math.floor((currentHour % 1) * 60);
        clockDisplay.textContent = `${String(displayHour).padStart(2, '0')}:${String(displayMinute).padStart(2, '0')}`;

        // Back to Top visibility
        if (scrollTop > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        updateVisuals(currentHour);
    }

    function updateVisuals(hour) {
        let h, s, l;
        let sunBottom = -20, moonBottom = -20;
        let starOpacity = 0, textCol = '#333';
        let cardBg = 'rgba(255, 255, 255, 0.8)';

        if (hour >= 6 && hour < 12) {
            const progress = (hour - 6) / 6;
            h = 20 + (180 * progress); s = 80; l = 60 + (20 * progress);
            sunBottom = -10 + (progress * 80);
        }
        else if (hour >= 12 && hour < 17) {
            const progress = (hour - 12) / 5;
            h = 200; s = 80; l = 80;
            sunBottom = 70 - (progress * 20);
        }
        else if (hour >= 17 && hour < 20) {
            const progress = (hour - 17) / 3;
            h = 200 + (60 * progress); s = 80 - (20 * progress); l = 80 - (60 * progress);
            sunBottom = 50 - (progress * 70);
            if (progress > 0.5) { textCol = '#eee'; cardBg = 'rgba(30, 30, 30, 0.8)'; }
        }
        else {
            const progress = (hour - 20) / 10;
            h = 260; s = 60; l = 10;
            if (progress < 0.5) moonBottom = -10 + (progress * 2 * 80);
            else moonBottom = 70 - ((progress - 0.5) * 2 * 80);
            starOpacity = 1; textCol = '#eee'; cardBg = 'rgba(30, 30, 30, 0.8)';
        }

        document.documentElement.style.setProperty('--sky-color', `hsl(${h}, ${s}%, ${l}%)`);
        document.documentElement.style.setProperty('--sun-pos-y', `${sunBottom}vh`);
        document.documentElement.style.setProperty('--moon-pos-y', `${moonBottom}vh`);
        document.documentElement.style.setProperty('--star-opacity', starOpacity);
        document.documentElement.style.setProperty('--text-color', textCol);
        document.documentElement.style.setProperty('--card-bg', cardBg);
    }

    // Scroll listeners
    window.addEventListener('scroll', updateTime);
    window.addEventListener('resize', updateTime);

    // Navigation Click Events
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const wakeUpBtn = document.querySelector('.wake-up-btn');
    if (wakeUpBtn) {
        wakeUpBtn.addEventListener('click', () => {
            document.getElementById('late-morning').scrollIntoView({ behavior: 'smooth' });
        });
    }

    updateTime();
});