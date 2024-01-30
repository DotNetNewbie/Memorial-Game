


//Globals
let currentLevel = 2;
let inputLength = 2;
let sequence = [];
let numberArray = [];
let numLives = 3;

//DOM elements
const digits = document.getElementById("digit");
const startButton = document.getElementById("start");
const checkButton = document.getElementById("check");
const userSequence = document.getElementById("userSequence");
const lives = document.getElementById("lives");
const level = document.getElementById("level");
const result = document.getElementById("result");

//no category ...
checkButton.disabled = true;

//event listner for input ...
userSequence.addEventListener("input", function(){
    var inputValue = userSequence.ariaValueMax;
    this.value = this.value.replace(/\D/g, "");

    if (inputValue.length > inputLength) {
        userSequence.value = inputValue.slice(0, inputLength);
    }

    if (inputValue.length === inputLength) {
        checkButton.disabled = false;
    }
});

// asysnc function to generate random numbers...
async function generateRandomSequence(length) {
    //DOM events...
    startButton.disabled = true;
    userSequence.disabled = true;
    checkButton.disabled = true;

    for (let i = 0; i < length; i++) {
        rando = Math.floor(Math.random() * 10);
        sequence.push(rando);
        digit.textContent = rando;
        await new Promise(resolve => setTimeout(resolve, 500));
        digit.textContent = '';
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    digit.textContent = '';
    userSequence.disabled = false;
    checkButton.disabled = false;
}

function startNewLevel(){
    digit.style.color = "";
    result.textContent = "";
    generateRandomSequence(currentLevel);
}

// function to check if user input matches the generated sequence

function checkIfMatch(){
    if (sequence.length != numberArray.length) {
        return false;
    }
}

async function checkUserSequence(){
    checkButton.disabled = true;

    for (let i = 0; i <userSequence.value.length; i++){
        const character = userSequence.value.charAt(i);
        const digit = parseInt(character, 10);

        if (!isNaN(digit)) {
            numberArray.push(digit)
        }
    }
    userSequence.value = "";

    const isMatch = checkIfMatch()

    // if it's a match ...
    if (isMatch) {
        digit.textContent = "√";
        digit.style.color = "green";

        let currentWidth =  parseFloat(window.getComputedStyle(userSequence).getPropertyValue('width'));
        //increase input width with each level
        let newWidth = currentWidth * 0.105;
        userSequence.style.width = newWidth + "%";

        await new Promise(resolve => setTimeout(resolve, 1000));
        goToNextLevelSettings()
    }else{
        if (numLives === 1) {
            digit.textContent = "X";
            digit.style.color = "red";
            result.textContent = 'You completed round ${currentLevel - 2} and a digit span of ${currentLevel -1}.'
            restGameSetting()
        }else{
            numberArray.length = 0;
            numLives -= 1;
            lives.textContent=numLives.toString();
            result.textContent= 'Incorrect digit sequence. Try again!'

            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

// next level settings...
function goToNextLevelSettings(){
    if (currentLevel === 10){
        level.textContent = 10;
        result.textContent = 'Congrats! You reached the maximium span of 10 digits!!'
    } else {
        sequence.length = 0;
        numberArray.length = 0;
        startButton.disabled = false;
        currentLevel += 1
        inputLength += 1
        level.textContent = currentLevel - 1
    }
}

// rest game settings...
function restGameSetting() {
    currentLevel = 2;
    inputLength = 2;
    sequence = [];
    numberArray = [];
    numLives = 3;
    userSequence.style.width = "10%";

    lives.textContent = numLives.toString()
    level.textContent = '1'
    startButton.disabled = false
}
