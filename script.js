document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('fractalCanvas');
    const ctx = canvas.getContext('2d');
    const textContainer = document.getElementById('textContainer');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let offset = 0;
    let zoom = 1.5;
    let zoomSpeed = 0.01;  // Increased speed

    function drawFractal() {
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        const maxIterations = 100;
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

        // Get the text bounding boxes and invert the color
        const letters = textContainer.children;
        for (let letter of letters) {
            const rect = letter.getBoundingClientRect();
            const x = rect.left + window.scrollX;
            const y = rect.top + window.scrollY;

            // Get the color of the fractal at this position
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const [r, g, b] = pixel;

            // Invert the color
            const invertedColor = `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
            letter.style.color = invertedColor;
        }

        offset += 0.1;  // Increased from 0.05 to 0.1 for faster animation
        zoom += zoomSpeed;  // Control the zoom speed

        // Reverse zoom direction at certain limits to create a continuous effect
        if (zoom > 2 || zoom < 1) {
            zoomSpeed = -zoomSpeed;
        }

        requestAnimationFrame(drawFractal);
    }

    drawFractal();
});
