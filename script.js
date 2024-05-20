document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('fractalCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let t = 0;
    function drawFractal() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const maxIterations = 100;
        const zoom = 1.5;
        const panX = canvas.width / 2;
        const panY = canvas.height / 2;

        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                let zx = (x - panX) / (0.5 * zoom * canvas.width);
                let zy = (y - panY) / (0.5 * zoom * canvas.height);
                let i = maxIterations;
                while (zx * zx + zy * zy < 4 && i > 0) {
                    const xtemp = zx * zx - zy * zy + Math.sin(t) * 0.355534;
                    zy = 2 * zx * zy + Math.cos(t) * 0.337292;
                    zx = xtemp;
                    i--;
                }
                const color = i === 0 ? 'black' : `hsl(${i / maxIterations * 360}, 100%, 50%)`;
                ctx.fillStyle = color;
                ctx.fillRect(x, y, 1, 1);
            }
        }

        t += 0.01;
        requestAnimationFrame(drawFractal);
    }

    drawFractal();
});
