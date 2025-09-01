import { originalWords, lives } from "./ui.js";

export const gameStateOriginal = {
  lives: lives,
  score: 0,
  wordsFalling: [],
  wordsCompleted: [],
  originalWords: [...originalWords],
  wordsStored: [],
};
