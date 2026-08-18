// AGUARDA O CARREGAMENTO COMPLETO DA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    
    // ELEMENTOS DO DOM
    const canvas = document.getElementById('opticsCanvas');
    const ctx = canvas.getContext('2d');
    
    const colorSlider = document.getElementById('colorSlider');
    const speedSlider = document.getElementById('speedSlider');
    const angleSlider = document.getElementById('angleSlider');
    const pulseBtn = document.getElementById('pulseBtn');
    const statusText = document.getElementById('robotStatus');

    // VARIÁVEIS DE ESTADO DO LASER
    let laserHue = colorSlider.value;
    let pulseSpeed = parseInt(speedSlider.value);
    let mirrorAngle = parseInt(angleSlider.value);
    let photons = [];
    let isPulsing = false;

    // EVENT LISTENERS
    colorSlider.addEventListener('input', (e) => {
        laserHue = e.target.value;
    });

    speedSlider.addEventListener('input', (e) => {
        pulseSpeed = parseInt(e.target.value);
    });

    angleSlider.addEventListener('input', (e) => {
        mirrorAngle = parseInt(e.target.value);
    });

    pulseBtn.addEventListener('click', () => {
        triggerOpticalPulse();
    });

    function triggerOpticalPulse() {
        isPulsing = true;
        statusText.innerText = "Sinal Óptico Enviado ao Robô!";
        statusText.style.color = "#ff007f";

        // Cria partículas de fótons
        for (let i = 0; i < 20; i++) {
            photons.push({
                x: 30,
                y: 200,
                speedX: pulseSpeed + Math.random() * 2,
                speedY: 0,
                size: Math.random() * 4 + 2,
                reflected: false
            });
        }

        setTimeout(() => {
            statusText.innerText = "Robô Processou os Dados com Sucesso! 🤖✅";
            statusText.style.color = "#00f3ff";
        }, 1500);
    }

    // LOOP DE ANIMAÇÃO DO CANVAS
    function animate() {
        // Limpa o canvas
        ctx.fillStyle = 'rgba(5, 5, 15, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 1. DESENHAR O EMISSOR DE LASER (ÓPTICA + ROBÓTICA)
        ctx.fillStyle = '#333';
        ctx.fillRect(10, 180, 30, 40);
        ctx.fillStyle = `hsl(${laserHue}, 100%, 50%)`;
        ctx.fillRect(35, 195, 10, 10);

        // 2. DESENHAR O ESPELHO ROBÓTICO NO MEIO
        ctx.save();
        ctx.translate(250, 200);
        ctx.rotate((mirrorAngle * Math.PI) / 180);
        ctx.fillStyle = '#00f3ff';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00f3ff';
        ctx.fillRect(-5, -40, 10, 80);
        ctx.restore();

        // 3. DESENHAR O SENSOR/ROBÔ RECEPTOR
        ctx.fillStyle = '#ff007f';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff007f';
        ctx.beginPath();
        ctx.arc(450, 200, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText('SENSOR', 430, 204);

        // 4. DESENHAR E MOVER FÓTONS (FEIXE DE LUZ)
        for (let i = 0; i < photons.length; i++) {
            let p = photons[i];

            ctx.fillStyle = `hsl(${laserHue}, 100%, 60%)`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `hsl(${laserHue}, 100%, 50%)`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Lógica de colisão com o espelho
            if (p.x >= 245 && !p.reflected) {
                p.reflected = true;
                // Altera trajetória baseada no ângulo do espelho
                p.speedY = (mirrorAngle / 10);
            }

            p.x += p.speedX;
            p.y += p.speedY;
        }

        // Remover fótons fora da tela
        photons = photons.filter(p => p.x < canvas.width && p.y > 0 && p.y < canvas.height);

        requestAnimationFrame(animate);
    }

    // Iniciar a animação
    animate();
});