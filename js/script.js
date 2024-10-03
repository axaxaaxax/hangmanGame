const words = ["hangman", "programming", "web", "developer", "computer"];

let chosenWord = "";
let guessedLetters = [];
let incorrectGuesses = 0;

const wordElement = document.getElementById("word");
const hangmanCanvas = document.getElementById("hangman-canvas");
const lettersContainer = document.getElementById("letters");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart");
const context = hangmanCanvas.getContext("2d");

// initialize the game

function initializeGame() {
  // choose a random word from the array
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  incorrectGuesses = 0;
  renderWord();
  renderLetters();
  renderHangman();
  messageElement.textContent = "";
}

// render word placeholder

function renderWord() {
  let displayedWord = "";
  for (let letter of chosenWord) {
    if (guessedLetters.includes(letter)) {
      displayedWord += letter + " ";
    } else {
      displayedWord += "_ ";
    }
  }
  wordElement.textContent = displayedWord.trim(); // Trim extra space at the end
}

// render letter buttons

function renderLetters() {
  lettersContainer.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement("button");
    button.textContent = letter;
    button.disabled = guessedLetters.includes(letter.toLowerCase());
    if (button.disabled) {
      button.classList.add('crossed-out');
    }
    button.addEventListener("click", () => guessLetter(letter.toLowerCase())); // Ensure lowercase
    lettersContainer.appendChild(button);
  }
}

// handle letter guess

function guessLetter(letter, button) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    if (!chosenWord.includes(letter)) {
      incorrectGuesses++;
    }
    renderWord();
    renderLetters();
    renderHangman();
    checkGameStatus();
    button.classList.add('crossed-out');
    button.disabled = true;  
  }
}

// render hangman figure

function renderHangman() {
  context.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
  
  // Draw the stand
  context.lineWidth = 2;
  context.strokeStyle = '#000';
  context.beginPath();
  context.moveTo(60, 230);
  context.lineTo(140, 230);
  context.moveTo(100, 230);
  context.lineTo(100, 20);
  context.lineTo(140, 20);
  context.lineTo(140, 50);
  context.stroke();

  // Draw parts based on incorrect guesses
  if (incorrectGuesses > 0) {
    // Head
    context.beginPath();
    context.arc(140, 70, 20, 0, Math.PI * 2, true);
    context.stroke();
  }
  if (incorrectGuesses > 1) {
    // Body
    context.beginPath();
    context.moveTo(140, 90);
    context.lineTo(140, 150);
    context.stroke();
  }
  if (incorrectGuesses > 2) {
    // Left arm
    context.beginPath();
    context.moveTo(140, 120);
    context.lineTo(120, 100);
    context.stroke();
  }
  if (incorrectGuesses > 3) {
    // Right arm
    context.beginPath();
    context.moveTo(140, 120);
    context.lineTo(160, 100);
    context.stroke();
  }
  if (incorrectGuesses > 4) {
    // Left leg
    context.beginPath();
    context.moveTo(140, 150);
    context.lineTo(120, 180);
    context.stroke();
  }
  if (incorrectGuesses > 5) {
    // Right leg
    context.beginPath();
    context.moveTo(140, 150);
    context.lineTo(160, 180);
    context.stroke();
  }
}

// check game status (win or lose)

function checkGameStatus() {
  let allLettersGuessed = true;
  for (let letter of chosenWord) {
    if (!guessedLetters.includes(letter.toLowerCase())) { // Ensure lowercase comparison
      allLettersGuessed = false;
      break;
    }
  }

  if (allLettersGuessed) {
    messageElement.textContent = "You win! You guessed the word!";
  } else if (incorrectGuesses === 6) {
    messageElement.textContent = `Game over! You lost. The word was "${chosenWord}".`;
  }
}


// restart game

restartButton.addEventListener("click", initializeGame);

// initialize the game on page load

initializeGame();
