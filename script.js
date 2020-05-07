const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is the capital of Poland',
    answers: [
      { text: 'Tokoyo', correct: false },
      { text: ' Warsaw', correct: true },
      { text: 'Ireland', correct: false}
    ]
  },
  {
    question: 'Which contintent is CHINA located',
    answers: [
      { text: 'Asia', correct: true },
      { text: 'Africa', correct: false },
      { text: 'Europe', correct: false }
    
    ]
  },
  {
    question: 'How many countries are in AFRICA',
    answers: [
      { text: '88', correct: false },
      { text: '54', correct: true },
      { text: '70', correct: false }
    ]
  },
  {
      question:'What is the capital of SYCHELLES',
      answers:[
          { text: 'Victoria', correct: true},
          { text: 'Doha', correct: false},
          { text: 'Montreal', correct: false}
      ]
  },
  {
    question: 'MADAGASCAR is found in which continent',
    answers: [
      { text: 'America', correct: false },
      { text: 'Asia', correct: false },
      { text: 'Africa', correct: true}
    ]
  }
]