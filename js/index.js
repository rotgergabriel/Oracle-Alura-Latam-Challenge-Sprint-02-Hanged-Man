//Body styles
const body = document.getElementById('body')

//Sector <aside> buttons
const addButton = document.getElementById('addButton')
const asideTextarea = document.getElementById('asideTextarea')
const asideInputValue = document.getElementById('asideInputValue')
const startButton = document.getElementById('startButton')
const sendButton = document.getElementById('sendButton')

//Sector <main> buttons
const startGameButton = document.getElementById('startGameButton')
const exitGameButton = document.getElementById('exitGameButton')
const incomingLetter = document.getElementById('incomingLetter')
const underscore = document.getElementById('underscore')
const wrongLetters = document.getElementById('wrongLetters')
const mainHeardImg = document.getElementById('mainHeardImg')
const mainDisplay = document.getElementById('mainDisplay')
const mainDisplayResult = document.getElementById('main-display_result')
const mainAudioStart = document.getElementById('mainAudioStart')
const mainMenuAudio = document.getElementById('mainMenuAudio')
const mainAudio = document.getElementById('mainAudio')

//visibility behavior buttons
const headerPageVisibility = document.getElementById('headerPageVisibility')
const mainPageVisibility = document.getElementById('mainPageVisibility')
const footerPageVisibility = document.getElementById('footerPageVisibility')
const startMenuVisibility = document.getElementById('startMenuVisibility')

const words = [
    'AVION',
    'PAISAJE',
    'COMIDA',
    'GATO',
    'PERRO', 
    'MANZANA', 
    'CARRO', 
    'SALUD',
    'AMOR',
    'MAR',
    'TIGRE',
    'TANQUE',
    'ARMA',
    'INDIO',
    'CAMION'
]

//Sounds functions
function menuSounds(sound) {
    mainMenuAudio.innerHTML =`<audio src="/assets/sounds/${sound}" autoplay></audio>`
}

function sounds(sound) {
    mainAudio.innerHTML =`<audio src="/assets/sounds/${sound}" autoplay></audio>`
}

//Behavior of all buttons in the aside sector
// Add button
addButton.addEventListener('click', (event) => {
        event.preventDefault()
        asideTextarea.style.visibility = 'visible'
    }
)

//Start button
startButton.addEventListener('click', (event) => {
        event.preventDefault()

        body.style.backgroundColor = 'white'
        asideTextarea.style.visibility = 'hidden'
        startMenuVisibility.style.visibility = 'hidden'
        headerPageVisibility.style.display = 'flex'
        mainPageVisibility.style.visibility = 'visible'
        footerPageVisibility.style.display = 'flex'
        sounds('mario-bros-woo-hoo.mp3')
        menuSounds('menuAudio.mp3')
    }
)

//Send button
sendButton.addEventListener('click', (event) => {
        event.preventDefault()

        if(asideInputValue.value != ''){
            words.push(asideInputValue.value.toUpperCase())
        }

        body.style.backgroundColor = 'white'
        asideTextarea.style.visibility = 'hidden'
        startMenuVisibility.style.visibility = 'hidden'
        headerPageVisibility.style.display = 'flex'
        mainPageVisibility.style.visibility = 'visible'
        footerPageVisibility.style.display = 'flex'
        sounds('mario-bros-lets-go.mp3')
        menuSounds('menuAudio.mp3')
        console.log(words)
    }
)

//Random secret word function
function randomSecretWord(words) {
   return Math.round(Math.random() * (words.length)-1)
}

//Start game function
startGameButton.addEventListener('click', (event)=> {
    event.preventDefault()

    startGameButton.style.display = 'none'
    incomingLetter.style.visibility = 'visible'
    underscore.style.visibility = 'visible'
    wrongLetters.style.visibility = 'visible'

    let indexRandomWord = randomSecretWord(words)
    console.log(words[indexRandomWord])

    getUnderscore(indexRandomWord)
    getSecretLetter(indexRandomWord)
    getWrongLetter(indexRandomWord)
    sounds('mario-bros-here-we-go-hoo.mp3')
})

//Underscore function
function getUnderscore(index) {
    let wordUnderscores = words[index].split('')
                                        .fill('_ ')
                                        .join('')
    underscore.value = wordUnderscores
}

// Get secret letter function
function getSecretLetter (index) {

    const splitWord = words[index].split('')
    const wordUnderscores = words[index].split('')
                                        .fill('_ ')

    incomingLetter.addEventListener('keyup', (event) => {
        let letter = event.key.toUpperCase()
        
        //Insert the correct letter in its position
        for (let index = 0; index < splitWord.length; index++) {
            if(letter == splitWord[index]) {
                let position = splitWord.indexOf(letter, index)
                wordUnderscores.splice(position, 1, letter)
                underscore.value = wordUnderscores.join('')
                mainDisplayResult.innerText = 'Excellent'
                mainDisplayResult.style.color = 'darkgreen'
                setTimeout(() => {
                    mainDisplayResult.innerText = ''
                }, 1000);
                sounds('mario-bros-coin.mp3')
            }

            //Message 'Winner / Congratulations'
            if(splitWord.length == underscore.value.length){
                incomingLetter.style.display = 'none'
                mainDisplayResult.innerText = 'Yeah'
                    mainDisplayResult.style.color = 'darkblue'
                setInterval(() => {
                    mainDisplayResult.innerText = ''
                }, 500);
                setInterval(() => {
                    mainDisplayResult.innerText = 'WINNER'
                    mainDisplayResult.style.color = 'darkgreen'
                }, 1000);
                menuSounds('')
                sounds('mario-kart-64.mp3')
            }
        }
            incomingLetter.value = ''
    })
}

//Get wrong letter function
function getWrongLetter(indexWord) {

    const lettersUsed = []
    const img = [
    'img_01.png',
    'img_02.png',
    'img_03.png',
    'img_04.png',
    'img_05.png',
    'img_06.png',
    'img_07.png',
    'img_08.png'
    ]

    incomingLetter.addEventListener('keyup', (event)=> {
        
        let letter = event.key.toUpperCase()

        //Add wrong words
        if(!words[indexWord].includes(letter)) {
            lettersUsed.push(letter)
            mainDisplayResult.innerText = 'Error'
            mainDisplayResult.style.color = 'darkorange'
            setTimeout(() => {
                mainDisplayResult.innerText = ''
            }, 500);
            sounds('mario-bros-ooh.mp3')
        }

        //filter the input of equal wrong letters
        let result = lettersUsed.filter((item,index)=>{
            if(item == item.match(/^[a-zA-Z]+$/)){
                return lettersUsed.indexOf(item) === index;
            }
        })
        wrongLetters.value = result.join('-')

        
        //Add hangman image
        let count = 1
        
        for (let index = 0; index <= result.length; index++) {
            if(result.length != img.length){
                mainDisplay.style.backgroundImage = `url(../assets/img_ahorcado/${img[index]})`
                count ++
            }

            //Message 'GAME OVER'
            if(count == img.length) {
                incomingLetter.style.display = 'none'
                underscore.style.visibility = 'hidden'
                setInterval(() => {
                    mainDisplayResult.innerText = ''
                }, 500);
                setInterval(() => {
                    mainDisplayResult.innerText = 'GAME OVER'
                    mainDisplayResult.style.color = 'darkred'
                }, 1000);
                menuSounds('')
                sounds('mario-kart-lose-1.mp3')
            }
        }
    })
}







