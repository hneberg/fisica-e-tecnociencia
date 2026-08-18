/* =========================================================
   OPTIBOT
   JAVASCRIPT
========================================================= */


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.querySelector(".navigation");


menuButton.addEventListener("click", () => {

    navigation.classList.toggle("mobile-open");

});


/* =========================================================
   EXECUTAR CÓDIGO
========================================================= */

const runCode =
    document.getElementById("runCode");


runCode.addEventListener("click", () => {

    runCode.innerText =
        "⚡ ROBÔ EXECUTANDO...";


    runCode.style.background =
        "linear-gradient(90deg,#ff0077,#ffe600)";


    setTimeout(() => {

        runCode.innerText =
            "✓ CÓDIGO EXECUTADO!";

        runCode.style.background =
            "linear-gradient(90deg,#00ff9d,#00eaff)";

    }, 1500);


    setTimeout(() => {

        runCode.innerText =
            "▶ EXECUTAR CÓDIGO";

        runCode.style.background =
            "linear-gradient(90deg,#00eaff,#00ff9d)";

    }, 4000);

});


/* =========================================================
   LABORATÓRIO ÓPTICO
========================================================= */

const angleSlider =
    document.getElementById("angleSlider");

const angleValue =
    document.getElementById("angleValue");

const mirror =
    document.getElementById("mirror");

const beam =
    document.getElementById("beam");

const labButton =
    document.getElementById("labButton");

const labStatus =
    document.getElementById("labStatus");


angleSlider.addEventListener("input", () => {

    const angle =
        angleSlider.value;


    angleValue.innerText =
        `${45 + Number(angle)}°`;


    mirror.style.transform =
        `rotate(${angle}deg)`;


    beam.style.transform =
        `rotate(${angle / 3}deg)`;

});


labButton.addEventListener("click", () => {

    labStatus.innerText =
        "PROCESSANDO...";


    labButton.innerText =
        "🔬 ANALISANDO LUZ";


    setTimeout(() => {

        labStatus.innerText =
            "EXPERIMENTO OK";

        labStatus.style.color =
            "#00ff9d";


        labButton.innerText =
            "✓ EXPERIMENTO CONCLUÍDO";

    }, 1800);


    setTimeout(() => {

        labButton.innerText =
            "⚡ ATIVAR EXPERIMENTO";

    }, 4000);

});


/* =========================================================
   QUIZ
========================================================= */

const answers =
    document.querySelectorAll(".answers button");

const result =
    document.getElementById("quizResult");

const progress =
    document.getElementById("progress");


let score = 0;

let answered = false;


answers.forEach(button => {

    button.addEventListener("click", () => {

        if (answered) return;

        answered = true;


        const answer =
            button.dataset.answer;


        if (answer === "correct") {

            score++;

            button.style.background =
                "linear-gradient(90deg,#00ff9d,#00eaff)";

            button.style.color =
                "#00100d";

            result.innerText =
                "✓ CORRETO! Programação transforma ideias em comandos.";

            result.style.color =
                "#00ff9d";

        } else {

            button.style.background =
                "linear-gradient(90deg,#ff0077,#8b00ff)";

            result.innerText =
                "✕ Quase! Tente novamente na próxima.";

            result.style.color =
                "#ff0077";

        }


        progress.style.width =
            "100%";


        setTimeout(() => {

            answers.forEach(btn => {

                btn.style.background =
                    "";

                btn.style.color =
                    "";

            });


            result.innerText =
                "";

            progress.style.width =
                "25%";

            answered = false;

        }, 2500);

    });

});


/* =========================================================
   ANIMAÇÃO AO ROLAR
========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".technology-section, .flow-card, .quiz-box"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


animatedElements.forEach(element => {

    observer.observe(element);

});


/* =========================================================
   EFEITO DO HEADER AO ROLAR
========================================================= */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background =
            "rgba(2,1,8,.9)";

        header.style.boxShadow =
            "0 10px 40px rgba(0,0,0,.3)";

    } else {

        header.style.background =
            "rgba(5,2,13,.65)";

        header.style.boxShadow =
            "none";

    }

});


/* =========================================================
   CURSOR / BRILHO
========================================================= */

document.addEventListener(
    "mousemove",
    event => {

        const x =
            event.clientX /
            window.innerWidth *
            100;

        const y =
            event.clientY /
            window.innerHeight *
            100;


        document.body.style.setProperty(
            "--mouse-x",
            `${x}%`
        );


        document.body.style.setProperty(
            "--mouse-y",
            `${y}%`
        );

    }
);


/* =========================================================
   MENSAGEM INICIAL
========================================================= */

console.log(
    "⚡ OPTIBOT ONLINE"
);

console.log(
    "🤖 Robótica carregada"
);

console.log(
    "💻 Programação carregada"
);

console.log(
    "🔬 Óptica carregada"
);