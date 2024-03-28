const questions = [
    {
        question: "What does HTML stand for",
        answers: [
            {text: "Human Transmision Module Language", correct: false},
            {text: "HyperText Markup Language", correct: true},
            {text: "High Transmision Math Language", correct: false},
            {text: "Highly Transluscent Mango Leaves", correct: false},

        ]
    },
    {
        question: "What does CSS stand for",
        answers: [
            {text: "Cascading Style Sheet", correct: true},
            {text: " Cake Sour Sweet", correct: false},
            {text: "Candy Styling Sheet", correct: false},
            {text: "Cascading Styling Symbol", correct: false},

        ]
    },
    {
        question: "What does PHP stand for",
        answers: [
            {text: " People Hate Ppeople", correct: false},
            {text: "Hyper  programing", correct: false},
            {text: "Preprocessed Hidden Programing", correct: false},
            {text: "Hyper preprocessor", correct: true},

        ]
    },
    {
        question: "What does JS stand for",
        answers: [
            {text: "Jump Strong", correct: false},
            {text: "Java Style", correct: false},
            {text: "Java Script", correct: true},
            {text: "John Stones", correct: false},

        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questoinNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questoinNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();