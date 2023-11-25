const random = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const aiImg = document.querySelector(".ai-choiceMain img");
const userImg = document.querySelector(".user-choiceMain img");
const userChoiceItem = document.querySelectorAll(".choise-item");

let interval = null;
const opt = {
  turnsAi: [],
  turnsUser: [],
  interval: 20,
  aiScore: 0,
  userScore: 0,
};

const generateAi = () => {
  let rand = random(1, 3);
  aiImg.setAttribute("src", `./img/${rand}.png`);
};

interval = setInterval(generateAi, opt.interval);

userChoiceItem.forEach((elem) => {
  elem.addEventListener("click", () => {
    clearInterval(interval);
    let userChoice = elem.firstElementChild.getAttribute("src");
    userImg.setAttribute("src", userChoice);
    let userNam = parseInt(userChoice.match(/\d/));
    let aiNam = parseInt(aiImg.getAttribute("src").match(/\d/));

    ui();

    opt.turnsAi.push(aiNam);
    opt.turnsUser.push(userNam);
    checkWinner(
      opt.turnsUser[opt.turnsUser.length - 1],
      opt.turnsAi[opt.turnsAi.length - 1]
    );
  });
});

const userButtons = (value) => {
  userChoiceItem.forEach((elem) => (elem.style.display = value));
};

const ui = () => {
  userButtons("none");
  const userChoiceWrap = document.querySelector(".choice-wrap");
  const nextRoundButton = document.createElement("div");
  nextRoundButton.classList.add("choise-item");
  nextRoundButton.innerHTML = "Next Round";
  userChoiceWrap.append(nextRoundButton);
};

const checkWinner = (user, ai) => {
  let userScore = document.querySelector(".userScore");
  let aiScore = document.querySelector(".aiScore");
  let winner = document.querySelector(".winner");
  let nextButton = document.querySelector(".choise-item");

  if (user === ai) {
    winner.innerHTML = "It's a tie!!!";
  }
  if (user === 1) {
    if (ai === 2) {
      opt.aiScore++;
    } else {
      opt.userScore++;
    }
  } else if (user === 2) {
    if (ai === 3) {
      opt.aiScore++;
    } else {
      opt.userScore++;
    }
  } else if (user === 3) {
    if (ai === 1) {
      opt.aiScore++;
    } else {
      opt.userScore++;
    }
  }

  userScore.innerHTML = `User: ${opt.userScore}`;
  aiScore.innerHTML = `AI: ${opt.aiScore}`;

  nextButton.addEventListener("click", (e) => {
    document.querySelector(".choise-item").remove();
    userButtons("block");
    document.querySelector(".user-choiceMain img").src = "./img/q.png";
    interval = setInterval(generateAi, opt.interval);
  });
};
