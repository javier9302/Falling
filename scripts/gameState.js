import { gameState, getWords } from "./gameLogic.js";

export const form = document.getElementById("settings-form");
const livesInput = document.getElementById("lives");
const contentInput = document.getElementById("content");
const timeToFall = document.getElementById("fall-time");
const timeToSeparateBlocks = document.getElementById("separate-time");
let livesNum = 5;

export const gameStateOriginal = {
  lives: livesNum,
  score: 0,
  wordsFalling: [],
  wordsCompleted: [],
  originalWords: [],
  wordsStored: [],
  lostLife: "",
  timeToFall: 0,
  timeToSeparateBlocks: 0,
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  livesNum = parseInt(livesInput.value, 10);
  if (isNaN(livesNum)) livesNum = 5;

  let originalWords = contentInput.value.split(",");

  gameStateOriginal.lives = livesNum;
  gameStateOriginal.originalWords = [...originalWords];
  gameStateOriginal.timeToFall = timeToFall.value;
  gameStateOriginal.timeToSeparateBlocks = timeToSeparateBlocks.value;
  getWords();
});
