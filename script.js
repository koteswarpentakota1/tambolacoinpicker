let pickedNumbers = [];
let availableNumbers = [...Array(90).keys()].map(i => i + 1); // [1..90]
let intervalId = null;

const numberDisplay = document.getElementById('numberDisplay');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const completionMessage = document.getElementById('completionMessage');

function getRandomNumber() {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const number = availableNumbers.splice(randomIndex, 1)[0];
    pickedNumbers.push(number);
    return number;
}

function displayNextNumber() {
    if (availableNumbers.length === 0) {
        clearInterval(intervalId);
        numberDisplay.textContent = '🎉';
        completionMessage.style.display = 'block';
        resetBtn.style.display = 'inline-block';
        return;
    }

    const number = getRandomNumber();
    numberDisplay.textContent = number;
}

function startGame() {
    startBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    numberDisplay.textContent = 'Starting...';
    completionMessage.style.display = 'none';

    // Reset state
    pickedNumbers = [];
    availableNumbers = [...Array(90).keys()].map(i => i + 1);

    // Start picking every 10 seconds
    setTimeout(() => {
        displayNextNumber();
        intervalId = setInterval(displayNextNumber, 10000); // every 10 sec
    }, 1000); // Initial delay
}

function resetGame() {
    clearInterval(intervalId);
    numberDisplay.textContent = 'Click "Start Game" to begin!';
    pickedNumbers = [];
    availableNumbers = [...Array(90).keys()].map(i => i + 1);
    startBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';
    completionMessage.style.display = 'none';
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
