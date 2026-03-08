// Buttons
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');

// Screens
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

// Quiz Contents
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const scoreText = document.getElementById('score-text');
const progress = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;

// Questions Array
const questions = [
    {
        question: "Which organ pumps blood throughout the body?",
        answers: [
            { text: "Lungs", correct: false },
            { text: "Heart", correct: true },
            { text: "Kidneys", correct: false },
            { text: "Liver", correct: false }
        ]
    },
    {
        question: "Which system controls breathing and circulation?",
        answers: [
            { text: "Nervous System", correct: false },
            { text: "Circulatory System", correct: true },
            { text: "Respiratory System", correct: false },
            { text: "Digestive System", correct: false }
        ]
    },
    {
        question: "Which organ is responsible for filtering blood and producing urine?",
        answers: [
            { text: "Lungs", correct: false },
            { text: "Heart", correct: false },
            { text: "Kidneys", correct: true },
            { text: "Liver", correct: false }
        ]
    },
    {
        question: "Which organ processes nutrients and detoxifies harmful substances?",
        answers: [
            { text: "Brains", correct: false },
            { text: "Heart", correct: false },
            { text: "Skin", correct: false },
            { text: "Liver", correct: true }
        ]
    },
    {
        question: "Which system is responsible for coordinating body functions and responses?",
        answers: [
            { text: "Nervous System", correct: true },
            { text: "Circulatory System", correct: false },
            { text: "Respiratory System", correct: false },
            { text: "Digestive System", correct: false }
        ]
    },
    {
        question: "Which organ is responsible for processing sensory information and controlling body functions?",
        answers: [
            { text: "Brains", correct: true },
            { text: "Heart", correct: false },
            { text: "Spleen", correct: false },
            { text: "Liver", correct: false }
         ]   
    }
]

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}
   
function showQuestion() {
    answersElement.innerHTML=""
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-button");

        button.dataset.correct= answer.correct;
        
        button.addEventListener("click", selectAnswer);
        
        answersElement.appendChild(button);
    });
    progress.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answersElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreText.textContent = `Your Score: ${score} / ${questions.length}`;
}
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}