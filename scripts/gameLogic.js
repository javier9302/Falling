import { gameStateOriginal } from "./gameState.js";
import {
  livesContainer,
  varScore,
  mainGameContainer,
  gameContainer,
  continueMessage,
  startPage,
  gameOver,
  newGameBtn,
  restartGameBtn,
  winner,
  looser,
} from "./ui.js";
import { createBlocks, blocksFalling } from "./blocks.js";

let gameState = {};

function resetScores() {
  gameState = structuredClone(gameStateOriginal);
}

resetScores();

function starts() {
  mainGameContainer.innerHTML = "";
  startPage.style.display = "none";
  gameContainer.style.display = "flex";
  continueMessage.style.display = "none";
  gameOver.style.display = "none";
  livesContainer.innerHTML = ""; // remove heart display
  varScore.textContent = gameState.score;
  if (gameState.wordsCompleted.length === 0) {
    gameState.wordsStored.push(...gameState.originalWords);
  } else {
    gameState.wordsStored = gameState.originalWords.filter(
      (word) => !gameState.wordsCompleted.includes(word)
    );
  }
}

export function getWords() {
  starts();
  console.table(gameStateOriginal);
  createLifes(gameState.lives);
  const interval = setInterval(async () => {
    if (gameState.wordsStored.length === 0) {
      clearInterval(interval);
      return;
    }
    if (gameState.wordsFalling.length >= 3) return;

    let choosen = Math.floor(Math.random() * gameState.wordsStored.length);
    let currentWord = gameState.wordsStored[choosen];

    gameState.wordsFalling.push(currentWord);
    removeWords(gameState.wordsStored, currentWord);
    createBlocks(currentWord);
    blocksFalling(currentWord, gameState.wordsFalling, gameState.wordsStored);
  }, 1000);
}

function createLifes(lives) {
  for (let i = 0; i < lives; i++) {
    const heart = document.createElement("span");
    heart.textContent = "❤️";
    livesContainer.appendChild(heart);
  }
}

function scoreWords(b, arrayFalling, arrayStored, arrayOriginal) {
  if (b.target.classList.contains("word-block")) {
    const wordClicked = b.target.id;
    gameState.score += 50;
    gameState.wordsCompleted.push(wordClicked);
    varScore.textContent = gameState.score;
    b.target.remove();
    removeWords(arrayFalling, wordClicked);
    removeWords(arrayStored, wordClicked);
    if (gameState.wordsCompleted.length === arrayOriginal.length) {
      gameOverScreen();
    }
  }
}
export function loseLife(arrayFalling, word) {
  removeWords(arrayFalling, word);
  if (arrayFalling.length != 0) {
    arrayFalling.forEach((e) => {
      const blockLeft = document.getElementById(e);
      if (blockLeft) blockLeft.remove();
    });
    arrayFalling.length = 0;
  }
  gameState.lives -= 1;
  if (gameState.lives === 0) {
    gameOverScreen();
  }
}

function removeWords(array, word) {
  const index = array.indexOf(word);
  if (index > -1) {
    array.splice(index, 1);
  }
}

function gameOverScreen() {
  gameOver.style.display = "flex";
  gameContainer.style.display = "none";
  if (gameState.lives === 0) {
    winner.style.visibility = "hidden";
  }
  looser.style.visibility = "hidden";
}

function newGameStart() {
  startPage.style.display = "flex";
  gameOver.style.display = "none";
  resetScores();
}

function restartGameStart() {
  gameOver.style.display = "none";
  resetScores();
  getWords();
}

//Event listener for words
mainGameContainer.addEventListener("click", (b) => {
  scoreWords(
    b,
    gameState.wordsFalling,
    gameState.wordsStored,
    gameState.originalWords
  );
});

newGameBtn.addEventListener("click", newGameStart);
restartGameBtn.addEventListener("click", restartGameStart);
