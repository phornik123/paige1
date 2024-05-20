document.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.bouncing');
    letters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.1}s`;
    });
});
