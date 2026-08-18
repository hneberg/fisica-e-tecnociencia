/* =========================================================
   MENU MOBILE
========================================================= */

const menuMobile = document.getElementById("menuMobile");
const nav = document.querySelector(".nav");

menuMobile.addEventListener("click", () => {

    nav.classList.toggle("active");

});


/* =========================================================
   LABORATÓRIO — SENSOR ÓPTICO
========================================================= */

const lightRange = document.getElementById("lightRange");
const lightValue = document.getElementById("lightValue");
const sensorStatus = document.getElementById("sensorStatus");
const statusDot = document.getElementById("statusDot");
const laser = document.querySelector(".laser");
const sensorLight = document.querySelector(".sensor-light");
const labRobot = document.querySelector(".lab-robot");

function updateSensor() {

    const value = Number(lightRange.value);

    lightValue.textContent = value + "%";


    /*
        Quanto maior a luminosidade,
        mais intensa fica a representação visual.
    */

    const intensity = 0.2 + (value / 100) * 1;

    laser.style.opacity = intensity;

    sensorLight.style.opacity = intensity;


    /*
        Simulação da lógica do robô
    */

    if (value < 30) {

        sensorStatus.textContent =
            "Pouca luz detectada — robô parado.";

        statusDot.style.background = "#ef4444";

        labRobot.style.transform = "translateX(0px)";

    }

    else if (value < 70) {

        sensorStatus.textContent =
            "Luminosidade intermediária — sensor analisando.";

        statusDot.style.background = "#facc15";

        labRobot.style.transform = "translateX(30px)";

    }

    else {

        sensorStatus.textContent =
            "Muita luz detectada — robô avançando.";

        statusDot.style.background = "#22c55e";

        labRobot.style.transform = "translateX(100px)";

    }

}


lightRange.addEventListener(
    "input",
    updateSensor
);


/* =========================================================
   BOTÃO DE SIMULAÇÃO
========================================================= */

const simulateBtn =
    document.getElementById("simulateBtn");

simulateBtn.addEventListener("click", () => {

    let value = 0;

    const interval = setInterval(() => {

        value += 5;

        lightRange.value = value;

        updateSensor();

        if (value >= 100) {

            clearInterval(interval);

        }

    }, 80);

});


/* =========================================================
   QUIZ
========================================================= */

const questions = [

    {
        question:
            "Qual área é responsável por estudar a luz?",

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
            "Qual elemento pode detectar informações do ambiente?",

        answers: [
            "Sensor",
            "Parafuso",
            "Gabinete",
            "Teclado"
        ],

        correct: 0
    },

    {
        question:
            "O que transforma instruções em ações para o robô?",

        answers: [
            "Código",
            "Luz solar",
            "Plástico",
            "Bateria"
        ],

        correct: 0
    },

    {
        question:
            "Qual fenômeno está relacionado ao desvio da luz ao passar de um meio para outro?",

        answers: [
            "Refração",
            "Gravidade",
            "Eletrização",
            "Combustão"
        ],

        correct: 0
    },

    {
        question:
            "Qual combinação representa o conceito do OPTIBOT?",

        answers: [
            "Música + Arte + História",
            "Robótica + Programação + Óptica",
            "Matemática + Esporte + Música",
            "Química + Biologia + Geografia"
        ],

        correct: 1
    }

];


let currentQuestion = 0;

let score = 0;


const questionElement =
    document.getElementById("question");

const answerButtons =
    document.querySelectorAll(".answer");

const questionNumber =
    document.getElementById("questionNumber");

const progressBar =
    document.getElementById("progressBar");

const quizResult =
    document.getElementById("quizResult");


function loadQuestion() {

    const current =
        questions[currentQuestion];


    questionElement.textContent =
        current.question;


    questionNumber.textContent =
        `PERGUNTA ${currentQuestion + 1}/${questions.length}`;


    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    answerButtons.forEach((button, index) => {

        button.textContent =
            current.answers[index];

        button.disabled = false;

        button.style.opacity = "1";

    });


    quizResult.textContent = "";

}


answerButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const current =
            questions[currentQuestion];


        answerButtons.forEach(btn => {

            btn.disabled = true;

        });


        if (index === current.correct) {

            score++;

            quizResult.textContent =
                "🚀 CORRETO! Você mandou muito bem!";

            quizResult.style.color =
                "#22c55e";

        }

        else {

            quizResult.textContent =
                "💡 Quase! Continue tentando.";

            quizResult.style.color =
                "#facc15";

        }


        setTimeout(() => {

            currentQuestion++;


            if (currentQuestion < questions.length) {

                loadQuestion();

            }

            else {

                finishQuiz();

            }

        }, 1200);

    });

});


function finishQuiz() {

    questionElement.textContent =
        "🎉 DESAFIO CONCLUÍDO!";


    document.querySelector(".answers").innerHTML = "";


    questionNumber.textContent =
        "RESULTADO FINAL";


    progressBar.style.width = "100%";


    quizResult.innerHTML = `
        Você acertou <strong>${score}</strong>
        de <strong>${questions.length}</strong> perguntas!<br><br>

        ${
            score === questions.length
                ? "🏆 PERFEITO! Você é praticamente um engenheiro do futuro!"
                : "🚀 Continue estudando. O conhecimento é o combustível da inovação!"
        }
    `;

}


loadQuestion();


/* =========================================================
   BOTÃO FINAL
========================================================= */

const startBtn =
    document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    document
        .getElementById("laboratorio")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =========================================================
   ANIMAÇÃO AO APARECER NA TELA
========================================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

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
    .querySelectorAll(
        ".tech-card, .connection-card, .quiz-box, .code-window"
    )
    .forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(40px)";

        element.style.transition =
            "opacity .8s ease, transform .8s ease";

        observer.observe(element);

    });