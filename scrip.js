/* =========================================
   OPTIBOT
   JAVASCRIPT
========================================= */


/* =========================================
   PARTÍCULAS
========================================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {

    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        size: Math.random() * 2 + 0.5,

        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
    });
}


function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        p.x += p.speedX;
        p.y += p.speedY;


        if (p.x < 0 || p.x > canvas.width) {
            p.speedX *= -1;
        }

        if (p.y < 0 || p.y > canvas.height) {
            p.speedY *= -1;
        }


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(0,217,255,0.7)";

        ctx.fill();
    });

    requestAnimationFrame(drawParticles);
}

drawParticles();


window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});


/* =========================================
   MODO NEON / LIGHT
========================================= */

const modeButton =
    document.getElementById("modeButton");

modeButton.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (
        document.body.classList.contains("light-mode")
    ) {

        modeButton.textContent =
            "🌙 MODO ESCURO";

    } else {

        modeButton.textContent =
            "✨ MODO NEON";
    }

});


/* =========================================
   LABORATÓRIO ÓPTICO
========================================= */

const angleSlider =
    document.getElementById("angleSlider");

const angleValue =
    document.getElementById("angleValue");

const incidence =
    document.getElementById("incidence");

const reflection =
    document.getElementById("reflection");

const mirror =
    document.getElementById("mirror");

const laserBeam =
    document.getElementById("laserBeam");

const laserButton =
    document.getElementById("laserButton");


let laserActive = true;


angleSlider.addEventListener("input", () => {

    const angle = angleSlider.value;

    angleValue.textContent = angle;

    incidence.textContent = angle + "°";

    reflection.textContent = angle + "°";


    mirror.style.transform =
        `rotate(${angle - 45}deg)`;


    const beamAngle =
        (angle - 45) * -1;


    laserBeam.style.transform =
        `rotate(${beamAngle / 2}deg)`;

});


laserButton.addEventListener("click", () => {

    laserActive = !laserActive;


    if (laserActive) {

        laserBeam.style.opacity = "1";

        laserButton.textContent =
            "⚡ DESATIVAR LASER";

    } else {

        laserBeam.style.opacity = "0";

        laserButton.textContent =
            "⚡ ATIVAR LASER";
    }

});


/* =========================================
   PROGRAMAÇÃO DO ROBÔ
========================================= */

const runCode =
    document.getElementById("runCode");

const consoleOutput =
    document.getElementById("consoleOutput");


runCode.addEventListener("click", () => {

    consoleOutput.innerHTML = `
        <p>> Inicializando OPTIBOT...</p>
        <p>> Conectando sensores ópticos...</p>
        <p>> Sensor de luz: OK</p>
        <p>> Laser: ATIVO</p>
        <p>> Obstáculos: ANALISANDO</p>
        <p>> Movimento: 90°</p>
        <p style="color:#00ff9d;">
            > PROGRAMA EXECUTADO COM SUCESSO ✓
        </p>
    `;


    const robot =
        document.querySelector(".mini-robot");

    robot.style.animation =
        "robotFloat 0.4s infinite";


    setTimeout(() => {

        robot.style.transform =
            "rotate(5deg)";

    }, 300);


    setTimeout(() => {

        robot.style.transform =
            "rotate(-5deg)";

    }, 600);


    setTimeout(() => {

        robot.style.transform =
            "rotate(0deg)";

    }, 900);

});


/* =========================================
   QUIZ
========================================= */

const questions = [

    {
        question:
            "Qual área estuda o comportamento da luz?",

        answers: [
            "Robótica",
            "Óptica",
            "Programação",
            "Mecânica"
        ],

        correct: 1
    },


    {
        question:
            "Qual elemento permite que um robô perceba o ambiente?",

        answers: [
            "Sensor",
            "Parafuso",
            "Bateria",
            "Carcaça"
        ],

        correct: 0
    },


    {
        question:
            "Qual linguagem é usada neste projeto para criar interações?",

        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],

        correct: 2
    },


    {
        question:
            "Quando a luz bate em uma superfície e retorna, temos:",

        answers: [
            "Combustão",
            "Reflexão",
            "Eletrização",
            "Magnetismo"
        ],

        correct: 1
    },


    {
        question:
            "Qual combinação representa o projeto OPTIBOT?",

        answers: [
            "Química + História + Música",
            "Matemática + Arte + História",
            "Robótica + Programação + Óptica",
            "Geografia + Biologia + Literatura"
        ],

        correct: 2
    }

];


let currentQuestion = 0;

let score = 0;


const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const questionNumber =
    document.getElementById("questionNumber");

const progressBar =
    document.getElementById("progressBar");

const quizResult =
    document.getElementById("quizResult");


function loadQuestion() {

    const question =
        questions[currentQuestion];


    questionElement.textContent =
        question.question;


    questionNumber.textContent =
        currentQuestion + 1;


    progressBar.style.width =
        ((currentQuestion + 1) /
            questions.length * 100) + "%";


    answersElement.innerHTML = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.textContent = answer;


            button.addEventListener(
                "click",
                () => checkAnswer(index)
            );


            answersElement.appendChild(button);

        }
    );

}


function checkAnswer(index) {

    const question =
        questions[currentQuestion];


    const buttons =
        answersElement.querySelectorAll("button");


    buttons.forEach(button => {

        button.disabled = true;

    });


    if (index === question.correct) {

        score++;

        quizResult.textContent =
            "✅ CORRETO! Excelente!";

        quizResult.style.color =
            "#00ff9d";

    } else {

        quizResult.textContent =
            "❌ Quase! Continue tentando!";

        quizResult.style.color =
            "#ff2bd6";
    }


    setTimeout(() => {

        currentQuestion++;


        if (
            currentQuestion <
            questions.length
        ) {

            quizResult.textContent = "";

            loadQuestion();

        } else {

            finishQuiz();

        }

    }, 1200);

}


function finishQuiz() {

    questionElement.innerHTML =
        `🏆 DESAFIO FINALIZADO!<br><br>
        Você acertou ${score} de ${questions.length}.`;


    answersElement.innerHTML = `

        <button onclick="restartQuiz()">
            🔄 JOGAR NOVAMENTE
        </button>

    `;


    quizResult.textContent =
        score === 5
            ? "🚀 NÍVEL: ESPECIALISTA OPTIBOT!"
            : "🤖 Continue explorando tecnologia!";

}


function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    quizResult.textContent = "";

    loadQuestion();

}


loadQuestion();


/* =========================================
   BOTÃO SURPRESA
========================================= */

const surpriseButton =
    document.getElementById("surpriseButton");


surpriseButton.addEventListener("click", () => {

    for (let i = 0; i < 40; i++) {

        createConfetti();

    }

});


function createConfetti() {

    const confetti =
        document.createElement("div");


    confetti.style.position =
        "fixed";

    confetti.style.width =
        "8px";

    confetti.style.height =
        "8px";

    confetti.style.background =
        randomColor();

    confetti.style.left =
        Math.random() * 100 + "vw";

    confetti.style.top =
        "-10px";

    confetti.style.zIndex =
        "9999";

    confetti.style.borderRadius =
        "2px";


    document.body.appendChild(confetti);


    const animation =
        confetti.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)"
                },

                {
                    transform:
                        `translateY(110vh)
                         rotate(${Math.random() * 720}deg)`
                }
            ],

            {
                duration:
                    Math.random() * 2000 + 2000,

                easing: "ease-in"
            }

        );


    animation.onfinish = () => {

        confetti.remove();

    };

}


function randomColor() {

    const colors = [

        "#ff2bd6",
        "#00d9ff",
        "#00ff9d",
        "#ffe600",
        "#8b5cf6",
        "#ff7b00"

    ];

    return colors[
        Math.floor(
            Math.random() * colors.length
        )
    ];

}


/* =========================================
   ANIMAÇÃO AO ENTRAR NAS SEÇÕES
========================================= */

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.15
        }

    );


document
    .querySelectorAll(".tech-card, .flow-item, .quiz-card")
    .forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "0.7s ease";

        observer.observe(element);

    });