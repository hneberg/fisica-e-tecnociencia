// Seleção do Canvas e Contexto 2D
const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');

// Elementos de Entrada (Controles)
const laserSlider = document.getElementById('laserAngle');
const mirrorSlider = document.getElementById('mirrorAngle');
const algoSelect = document.getElementById('algoMode');

// Elementos da Interface de Telemetria
const laserVal = document.getElementById('laserVal');
const mirrorVal = document.getElementById('mirrorVal');
const luxVal = document.getElementById('luxVal');
const servoVal = document.getElementById('servoVal');
const sensorState = document.getElementById('sensorState');
const logicSignal = document.getElementById('logicSignal');

// Ajuste dinâmico do tamanho do Canvas
function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight - 40;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let robotServoAngle = 0;

// Loop principal de renderização física
function drawSimulation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Leituras dos Sliders
    const laserDeg = parseFloat(laserSlider.value);
    const mirrorDeg = parseFloat(mirrorSlider.value);
    laserVal.innerText = laserDeg + '°';
    mirrorVal.innerText = mirrorDeg + '°';

    // 1. DIBUJAR EMISSOR LASER (COMPONENTE ÓTICO)
    const emitterX = 50;
    const emitterY = canvas.height - 80;
    ctx.fillStyle = '#334155';
    ctx.fillRect(emitterX - 20, emitterY - 15, 40, 30);
    ctx.fillStyle = '#ff0055';
    ctx.fillRect(emitterX + 20, emitterY - 5, 10, 10);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText("Emissor Laser", emitterX - 30, emitterY + 30);

    // 2. DIBUJAR ESPELHO (COMPONENTE ÓTICO)
    const mirrorX = canvas.width * 0.45;
    const mirrorY = canvas.height - 220;
    ctx.save();
    ctx.translate(mirrorX, mirrorY);
    ctx.rotate((-mirrorDeg * Math.PI) / 180);
    ctx.fillStyle = '#00f2fe';
    ctx.fillRect(-5, -40, 10, 80);
    ctx.restore();
    ctx.fillStyle = '#94a3b8';
    ctx.fillText("Espelho Refletor", mirrorX - 40, mirrorY + 60);

    // 3. DIBUJAR ROBÔ E SENSOR (COMPONENTE DE ROBÓTICA)
    const robotX = canvas.width - 120;
    const robotY = canvas.height - 100;

    // Base do Robô
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(robotX - 40, robotY, 80, 40);
    // Rodas
    ctx.fillStyle = '#475569';
    ctx.beginPath(); ctx.arc(robotX - 25, robotY + 40, 12, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(robotX + 25, robotY + 40, 12, 0, Math.PI*2); ctx.fill();

    // Braço Articulado com Servo Motor
    ctx.save();
    ctx.translate(robotX, robotY);
    ctx.rotate((-robotServoAngle * Math.PI) / 180);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(-8, -60, 16, 60); // Braço

    // Sensor Óptico (Fotodiodo) na ponta do braço
    const sensorPosRel = { x: 0, y: -65 };
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(sensorPosRel.x, sensorPosRel.y, 10, 0, Math.PI*2); ctx.fill();
    ctx.restore();

    // Posição Global do Sensor no espaço 2D
    const sensorGlobalX = robotX + Math.sin((robotServoAngle * Math.PI)/180) * 65;
    const sensorGlobalY = robotY - Math.cos((robotServoAngle * Math.PI)/180) * 65;

    // 4. CÁLCULO E TRAÇADO DOS RAIOS (FÍSICA DA ÓTICA)
    const laserRad = (laserDeg * Math.PI) / 180;

    // Desenhar Raio Incidente
    ctx.strokeStyle = '#ff0055';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#ff0055';
    ctx.beginPath();
    ctx.moveTo(emitterX + 30, emitterY);
    ctx.lineTo(mirrorX, mirrorY);
    ctx.stroke();

    // Cálculo da Lei de Reflexão (i = r)
    const incidentAngle = laserDeg;
    const reflectedAngle = 2 * mirrorDeg - incidentAngle;
    const refRad = (reflectedAngle * Math.PI) / 180;

    const ray2EndX = mirrorX + Math.cos(refRad) * 500;
    const ray2EndY = mirrorY - Math.sin(refRad) * 500;

    // Desenhar Raio Refletido
    ctx.beginPath();
    ctx.moveTo(mirrorX, mirrorY);
    ctx.lineTo(ray2EndX, ray2EndY);
    ctx.stroke();
    ctx.shadowBlur = 0; // Limpar o efeito de brilho

    // 5. LÓGICA DE DETECÇÃO E PROGRAMAÇÃO
    const angleToSensor = Math.atan2(mirrorY - sensorGlobalY, sensorGlobalX - mirrorX) * (180 / Math.PI);
    const hitTarget = Math.abs(angleToSensor - reflectedAngle) < 6;

    if (hitTarget) {
        luxVal.innerText = '980 lx';
        sensorState.innerText = 'CONECTADO';
        sensorState.style.color = '#10b981';
        logicSignal.innerText = 'HIGH (1)';

        // Algoritmo Robótico Ajustando o Servo
        if (algoSelect.value === 'pid') {
            if (robotServoAngle < 45) robotServoAngle += 0.5;
        }
    } else {
        luxVal.innerText = '120 lx';
        sensorState.innerText = 'BUSCANDO...';
        sensorState.style.color = '#ff0055';
        logicSignal.innerText = 'LOW (0)';

        if (algoSelect.value === 'pid') {
            // Varredura automática em caso de perda de sinal
            robotServoAngle = Math.sin(Date.now() / 300) * 30 + 30; 
        }
    }

    if (algoSelect.value === 'manual') {
        robotServoAngle = laserDeg; // Controle direto
    }

    servoVal.innerText = Math.round(robotServoAngle) + '°';

    // Próximo frame de animação
    requestAnimationFrame(drawSimulation);
}

// Inicia a animação assim que o script é carregado
drawSimulation();