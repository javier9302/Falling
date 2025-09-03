import { gameStateOriginal, form } from "./gameState.js";
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
  resultmessage,
} from "./ui.js";
import { createBlocks, blocksFalling } from "./blocks.js";

export let gameState = {};

function resetScores() {
  gameState = structuredClone(gameStateOriginal);
  return gameState;
}
function starts() {
  //Clean messages and dynamic created content

  mainGameContainer.innerHTML = "";
  resultmessage.innerHTML = "";

  //Hide start and ending screens

  startPage.style.display = "none";
  continueMessage.style.display = "none";
  gameOver.style.display = "none";
  livesContainer.innerHTML = ""; // remove hearts display
  // Show the game screen
  gameContainer.style.display = "flex";

  varScore.textContent = gameState.score;

  //Confirm if this is a continuation of the game or a new game.
  if (Object.keys(gameState).length === 0) {
    resetScores();
    gameState.wordsStored.push(...gameState.originalWords);
  } //When game continues, gets the original user data but filters completed words
  else {
    gameState.loseLife = "";
    gameState.wordsStored = gameState.originalWords.filter(
      (word) => !gameState.wordsCompleted.includes(word)
    );
  }
}

export function getWords() {
  starts();
  console.table(gameState);
  createLives(gameState.lives);
  const newBlockInterval = setInterval(() => {
    if (gameState.wordsStored.length === 0) {
      clearInterval(newBlockInterval);
      return;
    }
    let choosen = Math.floor(Math.random() * gameState.wordsStored.length);
    let currentWord = gameState.wordsStored[choosen];

    gameState.wordsFalling.push(currentWord);
    removeWords(gameState.wordsStored, currentWord);
    createBlocks(currentWord);
    blocksFalling(
      currentWord,
      gameState.wordsFalling,
      gameState.wordsStored,
      newBlockInterval
    );
  }, gameState.timeToSeparateBlocks * 1000);
}

function createLives(lives) {
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
  return gameState.loseLife;
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
    resultmessage.insertAdjacentHTML(
      "afterbegin",
      `
       <h1>GAME OVER</h1>
       <p><strong>You have lost all your lives! </strong><br>
       Your score is: <strong>${gameState.score}</strong><br>
       <br>
       Start a new game with fresh words, or restart to try again with the same
        words.
       </p>
       `
    );
  } else {
    resultmessage.insertAdjacentHTML(
      "afterbegin",
      `
       <h1>Congratulations!!</h1>
       <p><strong>You have won</strong><br><br>
       Your score is: <strong>${gameState.score}</strong><br>
       <br>
       Start a new game with fresh words, or restart to try again with the same
        words.
       </p>
       `
    );
  }
}
function newGameStart() {
  startPage.style.display = "flex";
  gameOver.style.display = "none";
  gameState = {};
  form.reset();
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
