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
const endGameButton = document.getElementById('endGameButton')
const underscore = document.getElementById('underscore')

//visibility behavior buttons
const headerPageVisibility = document.getElementById('headerPageVisibility')
const mainPageVisibility = document.getElementById('mainPageVisibility')
const footerPageVisibility = document.getElementById('footerPageVisibility')
const startMenuVisibility = document.getElementById('startMenuVisibility')

const words = ['AVION','PAISAJE','AUTO','COMIDA','GATO','PERRO']

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

    let randomWord = randomSecretWord(words)
    console.log(words[randomWord])

    let wordFill = words[randomWord].split('')
                                    .fill('_ ')
                                    .join('')
    console.log(wordFill)
    underscore.value = wordFill
})






