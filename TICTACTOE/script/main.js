let wrap = document.querySelector(".wrap");
let bg = document.querySelector(".background");

let settings = {
  xPath: "./imeges/dz3_XObg/X.png",
  oPath: "./imeges/dz3_XObg/O.png",
  countSquares: 9,
  flag: true, // Change the initial flag to true for 'X'
  winComb: [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9],
  ],
  store: [],
  winX: [],
  winO: [],
  once: true,
};

const createElement = (tag, classElem, append) => {
  let element = document.createElement(tag);
  element.classList.add(classElem);
  append.appendChild(element);
};

const startGame = () => {
  for (let i = 0; i < settings.countSquares; i++) {
    createElement("div", "square", wrap);
  }
  createElement("span", "turn-text", bg);
  createElement("span", "win-text", bg);
  createElement("button", "restart-button", bg);
};

startGame();

const winner = () => {
  let winText = document.querySelector(".win-text");
  let x = settings.winX;
  let o = settings.winO;
  if (settings.countSquares === 0) {
    winText.innerHTML = "It's a tie!";
    return;
  }
  for (let i = 0; i < settings.winComb.length; i++) {
    let win = settings.winComb[i];

    if (x.includes(win[0]) && x.includes(win[1]) && x.includes(win[2])) {
      winText.innerHTML = "Win X";
    } else if (o.includes(win[0]) && o.includes(win[1]) && o.includes(win[2])) {
      winText.innerHTML = "Win O";
    }
  }
};

const playerTurn = (player, img) => {
  img.setAttribute("src", player);
};

let squares = document.querySelectorAll(".square");

squares.forEach((elem, index) => {
  elem.addEventListener(
    "click",
    (e) => {
      if (settings.store[index] === undefined) {
        let img = document.createElement("img");

        if (settings.flag) {
          playerTurn(settings.xPath, img);
          settings.winX.push(index + 1);
        } else {
          playerTurn(settings.oPath, img);
          settings.winO.push(index + 1);
        }
        elem.appendChild(img);
        settings.countSquares -= 1;
        winner();
        settings.flag = !settings.flag;
      }
    },
    { once: settings.once }
  );
});

let restart = document.querySelector(".restart-button");

restart.innerHTML = "Restart";

restart.addEventListener("click", () => {
  window.location.reload();
});
