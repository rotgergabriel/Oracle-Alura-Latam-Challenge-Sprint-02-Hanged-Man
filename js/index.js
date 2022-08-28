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
const mainDisplayResult = document.getElementById('main-display_result')

//visibility behavior buttons
const headerPageVisibility = document.getElementById('headerPageVisibility')
const mainPageVisibility = document.getElementById('mainPageVisibility')
const footerPageVisibility = document.getElementById('footerPageVisibility')
const startMenuVisibility = document.getElementById('startMenuVisibility')

const words = ['AVION','PAISAJE','AUTO','COMIDA','GATO','PERRO', 'BANANA']
const wrong = []

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
        console.log(words)
    }
)

//Random secret word function
function randomSecretWord(words) {
   return Math.round(Math.random() * (words.length - 1))
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
})

//Underscore function
const getUnderscore = (index) => {
    let wordUnderscores = words[index].split('')
                                            .fill('_ ')
                                            .join('')
    console.log('getUnderscore', wordUnderscores)
    underscore.value = wordUnderscores
}

// Get secret letter function
function getSecretLetter (index) {

    const splitWord = words[index].split('')
    const wordUnderscores = words[index].split('')
                                        .fill('_ ')

    incomingLetter.addEventListener('keyup', (event) => {
        let letter = event.key.toUpperCase()
        
        //Inserta la letra correcta en su posicion
        for (let index = 0; index < splitWord.length; index++) {
            if(letter == splitWord[index]) {
                let position = splitWord.indexOf(letter, index)
                wordUnderscores.splice(position, 1, letter)
                underscore.value = wordUnderscores.join('')
                mainDisplayResult.innerText = 'Excellent'
                setTimeout(() => {
                    mainDisplayResult.innerText = ''
                }, 1000);
            }

            //Mensaje 'Winner'
            if(splitWord.length == underscore.value.length){
                incomingLetter.style.display = 'none'
                mainDisplayResult.innerText = 'WINNER'
                setInterval(() => {
                    mainDisplayResult.innerText = ''
                }, 500);
                setInterval(() => {
                    mainDisplayResult.innerText = 'CONGRATULATIONS'
                }, 1000);
            }
        }
            incomingLetter.value = ''
    })
}

//Get wrong letter function
function getWrongLetter(indexWord) {

    const wrongLettersUsed = []

    incomingLetter.addEventListener('keyup', (event)=> {
        let letter = event.key.toUpperCase()

        if(!words[indexWord].includes(letter)) {
            wrongLettersUsed.push(letter)
        }

        const auxArray = new Set(wrongLettersUsed)
        let result = [...auxArray].join('-')
        wrongLetters.value = result
    })
}







