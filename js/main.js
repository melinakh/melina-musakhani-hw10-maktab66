const board = {
  xTurn: true,
  xState: [],
  oState: [],
  winningStates: [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],

    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],

    ["0", "4", "8"],
    ["2", "4", "6"],
  ],
};

// const callbackFunction = (e) => {
//   e.style.backgroundColor = "red";
// };

document.addEventListener("click", (event) => {
  const target = event.target;
  const isCell = target.classList.contains("tile");
  const isDisabled = target.classList.contains("disabled");

  if (isCell && !isDisabled) {
    const cellValue = target.dataset.value;

    board.xTurn === true
      ? board.xState.push(cellValue)
      : board.oState.push(cellValue);

    target.classList.add("disabled");
    target.classList.add(board.xTurn ? "x" : "o");

    board.xTurn = !board.xTurn;

    // If all cells are disabled, then its draw
    if (!document.querySelectorAll(".tile:not(.disabled)").length) {
      document.querySelector(".game-over").classList.add("visible");
      document.querySelector(".game-over-text").textContent = "Draw!";
    }

    board.winningStates.forEach((winningState) => {
      const xWins = winningState.every((state) => board.xState.includes(state));
      const oWins = winningState.every((state) => board.oState.includes(state));
      // const winBgX = board.xState;
      // const winBgO = board.oState;
      // winBgX.forEach((value) => {});
      // winBgX.classList.add("bgColor");
      // winBgO.classList.add("bgColor");

      if (xWins || oWins) {
        document
          .querySelectorAll(".tile")
          .forEach((Tile) => Tile.classList.add("disabled"));
        document.querySelector(".game-over").classList.add("visible");
        document.querySelector(".game-over-text").textContent = xWins
          ? "X wins!"
          : "O wins!";
      }
    });
  }
});
document.querySelector(".restart").addEventListener("click", () => {
  document.querySelector(".game-over").classList.remove("visible");
  document.querySelectorAll(".tile").forEach((cell) => {
    cell.classList.remove("disabled", "x", "o");
  });

  board.xTurn = true;
  board.xState = [];
  board.oState = [];
});
