var startButton = document.querySelector("#start-btn");
var nextButton = document.querySelector("#next-btn");
var highScore = document.querySelector("#high-scorer");
var questionContainerEl = document.querySelector("#question-container");
var questionEl = document.querySelector("#question");
var ansButtonsEl = document.querySelector("#answer-buttons");
var timeEl = document.querySelector("#time")
var controls = document.querySelector("#controls")

//my list of varibles that I grabbed from the html

var shuffledQuestions;
var currentQuestionsIndex;

//variables used for randomizing my questions and creating the start of the questions

var highScores = JSON.parse(localStorage.getItem("CountScore")) || [];
console.log(highScores)

//local storage for accounting for the high scores

var CountScore = 0; 

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionsIndex++
    setNextQuestion()
})

var secondsLeft = 40;

startButton.addEventListener('click', startGame);

function startGame() {
    //console.log("started")
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionsIndex = 0;
    questionContainerEl.classList.remove("hide");
    setNextQuestion();
    setTime();

    //I added the function to loop through the questions and hide the start after initially clicked. 



}

function setTime() {
    var timerInterval = setInterval(function () {
        // console.log("this anonymous callback function ran");
        secondsLeft--;
        // let's us know the countdown
        timeEl.textContent = secondsLeft + " seconds left till Game Over.";



        if (secondsLeft === 0) {

            clearInterval(timerInterval);
            timeEl.classList.add("hide")
        }
        //clears interval and clears the timer itself

    }, 1000);
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex]);

}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
        ansButtonsEl.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hide");
    while (ansButtonsEl.firstChild) {
        ansButtonsEl.removeChild(ansButtonsEl.firstChild)

    };
}

function selectAnswer(event) {
    var selectedButton = event.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(ansButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    });
    if (shuffledQuestions.length > currentQuestionsIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "GAME OVER: Try Again";
        highScore.innerText = "Your High Score is " + CountScore; 
        startButton.classList.remove("hide")
        timeEl.classList.add("hide")
        questionContainerEl.classList.add("hide");
        highScores.push(CountScore);
        

        localStorage.setItem("CountScore", JSON.stringify(highScores));

        
    };

    if (selectedButton.dataset = correct) {
        CountScore++; 

        //localStorage.setItem("CountScore", CountScore);
    }




}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    }
    else {
        element.classList.add("wrong");
    }

}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

var questions = [
    {
        question: "How long was this year's Tour de France?",
        answers: [
            { text: "2,162 miles", correct: true },
            { text: "1,000 miles", correct: false },
            { text: "14,459 miles", correct: false },

        ]


    },

    {
        question: "What year was the first Tour de France held?",
        answers: [
            { text: "1903", correct: true },
            { text: "1942", correct: false },
            { text: "2003", correct: false },
        ]

    },

    {
        question: "Who won the 2020 tour de France?",
        answers: [
            { text: "Tadej Pogacar", correct: true },
            { text: "Julian Alaphillippe", correct: false },
            { text: "Egan Bernal", correct: false },
        ]

    },

    {
        question: "Who has won the most Tour de France titles?",
        answers: [
            { text: "Chris Froome", correct: false },
            { text: "Lance Armstrong", correct: true },
            { text: "Egan Bernal", correct: false },
        ]

    },

    {
        question: "Who was the youngest cyclist to ever win the Tour de France?",
        answers: [
            { text: "Chris Froome", correct: false },
            { text: "Lance Armstrong", correct: false },
            { text: "Tadej Pogacar", correct: true },
            { text: "Egan Bernal", correct: false },
        ]

    },

    {
        question: "What year was the longest Tour de France?",
        answers: [
            { text: "1904", correct: false },
            { text: "2004", correct: false },
            { text: "2019", correct: false},
            { text: "1926", correct: true },
        ]

    }


]