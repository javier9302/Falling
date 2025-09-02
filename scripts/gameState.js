import { getWords } from "./gameLogic.js";

export const form = document.getElementById("settings-form");
const livesInput = document.getElementById("lives");
const contentInput = document.getElementById("content");

let livesNum = 5;

export const gameStateOriginal = {
  lives: livesNum,
  score: 0,
  wordsFalling: [],
  wordsCompleted: [],
  originalWords: [],
  wordsStored: [],
  lostLife: "",
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  livesNum = parseInt(livesInput.value, 10);
  if (isNaN(livesNum)) livesNum = 5;

  let originalWords = contentInput.value.split(",");

  gameStateOriginal.lives = livesNum;
  gameStateOriginal.originalWords = [...originalWords];
  getWords();
});
