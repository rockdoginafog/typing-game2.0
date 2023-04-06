const input = document.querySelector('.input')
const output = document.querySelector('.output')
const randomWordP = document.querySelector('.random-word')
const form = document.querySelector('.form')
const points = document.querySelector('.points')
const timerId = document.querySelector('#timer')
const spanContainer = document.querySelector('.span-container')
const spanLetters = document.querySelectorAll('.random-letter')
const outputHidden = document.querySelector('.output-hidden')
const startAgain = document.querySelector('.start-again')
const messageToUser = document.querySelector('.message-to-user')
const rankingBtn = document.querySelector('.ranking-btn')
const submit = document.querySelector('.ranking-submit')
const inputName = document.querySelector('.name')
const ranking = document.querySelector('.ranking')
const rankingContainer = document.querySelector('.ranking-container')
const hero = document.querySelector('.hero')
const nice = document.querySelector('.nice')
const wrong = document.querySelector('.wrong')
const dog = document.querySelector('.dog')
const pageHeight = document.documentElement.scrollHeight
let timer
let isTimerStarted = false

function scrollToBottom(){
    window.scrollTo({
        top: pageHeight,
        behavior: 'smooth'
      })
    }

//wszystkie słowa
function getRandomWord(){
    fetch('https://random-word-api.vercel.app/api?words=1')
    .then(response => response.json())
    .then(data => {
        const randomWord = data[0]
        outputHidden.innerHTML = data
        randomWord.split('').forEach(randomLetter =>{
            const oneLetter = document.createElement('span')
            oneLetter.classList.add('random-letter')
            oneLetter.innerHTML = randomLetter
            randomWordP.appendChild(oneLetter)
        })
    })
}
getRandomWord()

function getRandomDog(){
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
        const randomDog = data.message
        dog.src = randomDog
    })
}
getRandomDog()



//poniżej lub równe 6
/* function getRandomWord() {
    fetch('http://random-word-api.herokuapp.com//all')
        .then(response => response.json())
        .then(data => {
            let randomWord;
            do {
                randomWord = data[Math.floor(Math.random() * data.length)];
            } while (randomWord.length > 6);
            outputHidden.innerHTML = randomWord;
            randomWord.split('').forEach(randomLetter =>{
                const oneLetter = document.createElement('span');
                oneLetter.classList.add('random-letter');
                oneLetter.innerHTML = randomLetter;
                randomWordP.appendChild(oneLetter);
            });
        });
}
  
  getRandomWord(); */


form.addEventListener('input', (e) =>{
    e.preventDefault()
})

input.addEventListener('input', () =>{
    output.innerHTML = input.value
    const allSpans = document.querySelectorAll('.random-letter')
    const inputValue = input.value.split('')
    if(input.value === outputHidden.innerHTML && inputValue.length === randomWordP.childNodes.length){
        points.innerHTML = parseInt(points.innerHTML) + 1
        nice.classList.remove('hidden')
        setTimeout(() => {
            nice.classList.add('hidden');
          }, 800);
    }
    if(input.value !== outputHidden.innerHTML && inputValue.length === randomWordP.childNodes.length){
        wrong.classList.remove('hidden')
        setTimeout(() => {
            wrong.classList.add('hidden');
          }, 800);
    }
    if(inputValue.length === randomWordP.childNodes.length){
        randomWordP.innerHTML = ''
        input.value = ''
        output.innerHTML = ''
        getRandomWord()
    }
    allSpans.forEach((span, index) =>{
        const oneLetter = inputValue[index]
        if(oneLetter == null){
            span.classList.remove('green')
            span.classList.remove('red')
        }
        else if(oneLetter === span.innerHTML){
            span.classList.add('green')
            span.classList.remove('red')
        }
        else{
            span.classList.add('red')
            span.classList.remove('green')
        }
    })
    if(isTimerStarted || !input.value) {
        return
      }
      startTimer()
      isTimerStarted = true
  });

// Funkcja, która uruchamia timer po wpisaniu znaku w polu input
function startTimer() {
    let seconds = 0

    const timerElement = document.getElementById('timer')
    timerElement.innerHTML = seconds.toFixed(1)

    timer = setInterval(() => {
        seconds += 0.1
        timerElement.innerHTML = seconds.toFixed(1)
    }, 100)

    setTimeout(() => {
        clearInterval(timer)
        input.disabled = true
        startAgain.classList.remove('hidden')
        rankingContainer.classList.remove('hidden')
        randomWordP.classList.add('hidden')
        dog.classList.remove('hidden')
        if(points.innerHTML <= 5){
            messageToUser.innerHTML = 'do u even have a keyboard?!'
        }
        if(points.innerHTML >= 6){
            messageToUser.innerHTML = 'not bad, not bad'
        }
        if(points.innerHTML >= 10){
            messageToUser.innerHTML = 'nice one!'
        }
        if(points.innerHTML >= 15){
            messageToUser.innerHTML = 'no way, you must have been cheating'
        }
        if(points.innerHTML >= 20){
            messageToUser.innerHTML = 'true sigma alpha male'
        }
        scrollToBottom()
    }, 30000);
}

startAgain.addEventListener('click', () =>{
    isTimerStarted = false
    startAgain.classList.add('hidden')
    rankingContainer.classList.add('hidden')
    randomWordP.classList.remove('hidden')
    dog.classList.add('hidden')
    input.disabled = false
    input.value = ''
    timerId.innerHTML = '0'
    randomWordP.innerHTML = ''
    points.innerHTML = '0'
    messageToUser.innerHTML = ''
    getRandomWord()
})

rankingBtn.addEventListener('click', () =>{
    ranking.classList.toggle('hidden')
    hero.classList.toggle('hidden')
})

submit.addEventListener('submit', (e) =>{
    e.preventDefault()
    const newPlayerContainer = document.createElement('div')
    newPlayerContainer.classList.add('new-player')
    const newPlayer = document.createElement('p')
    newPlayer.classList.add('nameP')
    newPlayer.innerHTML = inputName.value
    const score = document.createElement('p')
    const span = document.createElement('span')
    span.innerHTML = ' points'
    score.innerHTML = points.innerHTML
    ranking.appendChild(newPlayerContainer)
    newPlayerContainer.appendChild(newPlayer)
    newPlayerContainer.appendChild(score)
    score.appendChild(span)
    localStorage.setItem('ranking', ranking.innerHTML)
    inputName.value = ''
})

let local = localStorage.getItem('ranking')

if(local){
    ranking.innerHTML = local
}