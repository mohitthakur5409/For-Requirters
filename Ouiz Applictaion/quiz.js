const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Markup Language",
            "Home Text Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: [
            "HTML",
            "Java",
            "CSS",
            "Python"
        ],
        answer: 2
    },
    {
        question: "Which is used for web page interactivity?",
        options: [
            "CSS",
            "HTML",
            "JavaScript",
            "C++"
        ],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const question = document.getElementById("question");
const options = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");
const timerDisplay = document.getElementById("timer");

function loadQuestion() {
    resetTimer();

    question.textContent = questions[currentQuestion].question;

    options.forEach((btn, index) => {
        btn.textContent = questions[currentQuestion].options[index];
        btn.onclick = () => selectAnswer(index);
    });
}

function selectAnswer(index) {
    if (index === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function startTimer() {
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;

            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    clearInterval(timer);

    document.getElementById("quiz").classList.add("hide");
    document.getElementById("result").classList.remove("hide");

    document.getElementById("score").textContent =
        score + " / " + questions.length;
}

loadQuestion();