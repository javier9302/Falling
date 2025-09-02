import { restartGame } from "./ui.js";
import { getWords } from "./gameLogic.js";

restartGame.addEventListener("click", getWords);
