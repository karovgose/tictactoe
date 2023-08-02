const board = document.querySelector("#board");
const infoMessage = document.querySelector("#info-message");
const winningMessage = document.querySelector(".winning__message");
const gameOver = document.querySelector(".winning__wraper");
const playAgainBtn = document.querySelector(".btn_play-again");
const cells = document.querySelectorAll(".cell");
const winingCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let mark = "cross";
infoMessage.textContent = "Cross goes first";

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.addEventListener("click", addMarks);
  });
  gameOver.classList.add("hide");
  mark = "cross";
  infoMessage.textContent = "Cross goes first";
}

function addMarks(e) {
  if (!gameOver.classList.contains("hide") || e.target.firstChild !== null) {
    return;
  }
  const inputMarks = document.createElement("div");
  inputMarks.classList.add(mark);
  e.target.append(inputMarks);
  if (checkWinner()) {
    return;
  }
  mark = mark === "cross" ? "circle" : "cross";
  infoMessage.textContent = `It is now ${mark}'s turn.`;
  e.target.removeEventListener("click", addMarks);
}

function checkWinner() {
  let draw = true;
  for (let i = 0; i < winingCombination.length; i++) {
    const [a, b, c] = winingCombination[i];
    if (
      cells[a].firstChild?.classList.contains(mark) &&
      cells[b].firstChild?.classList.contains(mark) &&
      cells[c].firstChild?.classList.contains(mark)
    ) {
      winningMessage.textContent = `${mark.toUpperCase()} wins!!! 🎉🎉🎉`;
      gameOver.classList.remove("hide");
      return true;
    }
  }

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].firstChild === null) {
      draw = false;
      break;
    }
  }
  if (draw) {
    winningMessage.textContent = "Game ends with draw!!! ☹️";
    gameOver.classList.remove("hide");
    return true;
  }
  return false;
}

cells.forEach((cell, index) => {
  cell.id = index;
  cell.addEventListener("click", addMarks);
});

playAgainBtn.addEventListener("click", resetGame);

window.addEventListener("load", resetGame);
