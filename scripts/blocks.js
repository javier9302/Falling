import { mainGameContainer } from "./ui.js";
import { loseLife } from "./gameLogic.js";
import { continueMessage } from "./ui.js";
import { gameState } from "./gameLogic.js";

export function createBlocks(word) {
  const newBlock = document.createElement("button");
  newBlock.setAttribute("id", word);
  newBlock.setAttribute("class", "word-block");
  newBlock.textContent = word;
  newBlock.style.top = "0px";
  mainGameContainer.appendChild(newBlock);
  detectOverflow(newBlock);
}

function detectOverflow(newBlock) {
  let containerRect = mainGameContainer.getBoundingClientRect();
  let blockRect;

  do {
    let leftPos =
      Math.random() * (mainGameContainer.offsetWidth - newBlock.offsetWidth);
    newBlock.style.left = leftPos + "px";
    blockRect = newBlock.getBoundingClientRect();
  } while (
    blockRect.left < containerRect.left ||
    blockRect.right > containerRect.right
  );
}

export function blocksFalling(
  word,
  arrayFalling,
  arrayStored,
  newBlockInterval
) {
  const block = document.getElementById(word);
  let pos = 0;
  let h = mainGameContainer.offsetHeight - block.offsetHeight;
  const t = gameState.timeToFall * 1000;
  let speed = h / t;
  console.log(speed);
  const fall = setInterval(() => {
    let time = new Date().toLocaleTimeString();
    if (!block || gameState.loseLife) {
      clearInterval(fall);
      return;
    }
    pos += 1;
    block.style.top = pos + "px";
    if (pos > h) {
      block.remove();
      clearInterval(fall);
      if (arrayFalling.includes(word)) {
        gameState.loseLife = word;
        loseLife(arrayFalling, word);
        clearInterval(newBlockInterval);
        continueMessage.style.display = "flex";
        return (arrayStored.length = 0);
      }
    }
  }, 1 / speed);
}
