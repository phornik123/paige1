document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('fractalCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let offset = 0;

    function drawFractal() {
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        const maxIterations = 100;
        const zoom = 1.5;
        const panX = width / 2;
        const panY = height / 2;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let zx = (x - panX) / (0.5 * zoom * width);
                let zy = (y - panY) / (0.5 * zoom * height);
                let i = maxIterations;
                while (zx * zx + zy * zy < 4 && i > 0) {
                    const xtemp = zx * zx - zy * zy + Math.sin(offset) * 0.355534;
                    zy = 2 * zx * zy + Math.cos(offset) * 0.337292;
                    zx = xtemp;
                    i--;
                }
                const color = i === 0 ? 'black' : `hsl(${i / maxIterations * 360}, 100%, 50%)`;
                ctx.fillStyle = color;
                ctx.fillRect(x, y, 1, 1);
            }
        }

        offset += 0.01;
        requestAnimationFrame(drawFractal);
    }

    drawFractal();
});
