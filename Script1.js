
const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const timerDisplay = document.getElementById('timer');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

let timerInterval;
let timeLeft = 30;

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestions(0);
    questionCounter(1);
    headerScore();
    startTimer();
}


tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

     questionCount = 0;
     questionNumb = 1;
     userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}


goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
   
}






let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');

nextBtn.addEventListener('click', () => {

    clearInterval(timerInterval); // Clear the timer for the current question
    timeLeft = 30; // Reset the timer for the next question
    startTimer(); // Start the timer for the new question


    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumb++;
        showQuestions(questionCount);
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        
        clearInterval(timerInterval);
        showResultBox();
    }
});

function startTimer() {
    timerDisplay.textContent = timeLeft; // Initialize the timer display
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft; // Update the timer display

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextBtn.click(); // Automatically go to the next question when time runs out
        }
    }, 1000);
}



function showQuestions(index) {
    const questionText = document.querySelector('.question-test');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = questions[index].options.map(option => `
        <div class="option"><span>${option}</span></div>
    `).join('');

    optionList.innerHTML = optionTag;

    
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => optionSelected(option));
    });
}


function optionSelected(answer) {
    let userAnswer = answer.textContent.trim(); 
    let correctAnswer = questions[questionCount].answer.trim(); 
    const allOptions = optionList.children.length;

  
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });

    
    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');
        for (let i = 0; i < allOptions; i++) {
            let optionText = optionList.children[i].textContent.trim(); 
            if (optionText === correctAnswer) {
                optionList.children[i].classList.add('correct');
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}


function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
} 

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
       
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }

    }, speed);
}

