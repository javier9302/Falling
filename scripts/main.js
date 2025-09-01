import { startGame, restartGame } from "./ui.js";
import { getWords } from "./gameLogic.js";

startGame.addEventListener("click", getWords);
restartGame.addEventListener("click", getWords);
