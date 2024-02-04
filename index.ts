// Types

type GameOptionsType = {
  0: "rock";
  1: "scissors";
  2: "paper";
};

// Global variables

// Number of points to win
const POINTS_TO_WIN = 3;
let currentGameRound = 1;
let userScore = 0;
let robotScore = 0;
let myChoice = "";
let robotChoice = "";
let isUserWonRound = false;
let isRobotWonRound = false;
let roundResult = "";
const options = {
  win: "WIN",
  lose: "LOSE",
  draw: "DRAW",
};
const colorPalette = {
  white: "#fff",
  green: "#29da16",
  yellow: "#ffea00",
  grey: "#e4e4e5",
};

const gameOptions: GameOptionsType = {
  0: "rock",
  1: "scissors",
  2: "paper",
};

// Selectors
const gameMode = document.querySelector(".game-mode");
const buttonStart = document.querySelector(".button-start");
const board = document.querySelector(".board");
const picker = document.querySelector(".picker");
const pickItem = document.querySelectorAll(".picker__items");
const userImg = document.querySelector(".user-image");
const robotImg = document.querySelector(".robot-image");
const questionMarks = document.querySelectorAll(".question-mark");
const userTile = document.querySelector(".button-user");
const robotTile = document.querySelector(".button-robot");
const userScoreElement = document.querySelectorAll(".user-score")[0];
const robotScoreElement = document.querySelectorAll(".robot-score")[0];
const activeRound = document.querySelector(".round");
const modal = document.querySelector(".modal-overlay");
const modalTitle = document.querySelector(".modal__content-title");
const finalScore = document.querySelector(".modal__content-final-score");
const userAchievement = document.querySelector(".user-achievement");
const robotAchievement = document.querySelector(".robot-achievement");
const roundResultElement = document.querySelector(".round-result");
const score = document.querySelector(".score");
const roundScore = document.querySelector(".round-score");
const title = document.querySelector(".title");
const description = document.querySelector(".description");
const help = document.querySelector(".help");
const rulesBlock = document.querySelector(".rules-block");
const rules = document.querySelectorAll(".rules")[1];
const buttonAgain = document.querySelector(".button-again");
const loader = document.querySelector(".loader");
const loaderCountdown = document.querySelector(".loader__countdown");
const main = document.querySelector(".main");
const robotAvatar = document.querySelector(".robot-avatar");
const modalImage = document.querySelector(".modal__image");

// Event Listeners
buttonStart?.addEventListener("click", () => createNewGame());

pickItem.forEach((item) => {
  item.addEventListener("click", (e) => {
    const { target } = e;

    if (target instanceof HTMLElement) {
      // Allow clicks only on .button-item
      if (target.classList.contains("button-item")) {
        if (POINTS_TO_WIN > userScore && POINTS_TO_WIN > robotScore) {
          robotChoice = random();
          // Block user clicks for 800ms. When calculating the round result
          (picker as HTMLDivElement).style.background = colorPalette.grey;
          (picker as HTMLDivElement).style.pointerEvents = "none";

          setTimeout(() => {
            (picker as HTMLDivElement).style.background = "transparent";
            (picker as HTMLDivElement).style.pointerEvents = "auto";
          }, 800);

          play((e.target as HTMLButtonElement).value, robotChoice);
        }

        if (userScore === POINTS_TO_WIN || robotScore === POINTS_TO_WIN) {
          gameOver();
        }
      }
    }
  });
});

// Functions

const createNewGame = () => {
  // Countdown timer
  let countdownTimer = 3;
  (main as HTMLDivElement).style.display = "none";
  (loader as HTMLDivElement).style.display = "flex";
  (
    loaderCountdown as HTMLDivElement
  ).innerHTML = `Game starts in ${countdownTimer--}`;

  // Game loading interval by 3 seconds by default
  const interval = setInterval(() => {
    if (countdownTimer) {
      (
        robotAvatar as HTMLImageElement
      ).src = `./assets/robot-${countdownTimer}.png`;
      (
        loaderCountdown as HTMLDivElement
      ).innerHTML = `Game starts in ${countdownTimer--}`;
    } else {
      (loader as HTMLDivElement).style.display = "none";
      clearInterval(interval);
    }
  }, 1000);

  // Start game in 3 seconds after loading
  setTimeout(() => createGameBoard(), 3000);
};

const createGameBoard = () => {
  (gameMode as HTMLDivElement).style.display = "none";
  (board as HTMLDivElement).style.display = "flex";
  (help as HTMLDivElement).style.display = "block";
  (rulesBlock as HTMLDivElement).style.display = "none";
  (title as HTMLParagraphElement).style.display = "none";
  (description as HTMLParagraphElement).style.display = "none";
};

// Get the converted value for robot choice
const random = (): string => {
  const index = Math.floor(Math.random() * 3);
  return gameOptions[index as keyof GameOptionsType];
};

const gameOver = () => {
  let result = userScore > robotScore ? "You win!" : "You lose!";
  (modalTitle as HTMLHeadingElement).innerHTML = result;

  (
    finalScore as HTMLParagraphElement
  ).innerHTML = `Final score - ${userScore} : ${robotScore}`;

  (modal as HTMLDivElement).style.display = "block";

  const imageSrc =
    userScore > robotScore ? "../assets/win.png" : "../assets/lose.png";
  modalImage?.setAttribute("src", imageSrc);
};

const closeModal = () => {
  (modalTitle as HTMLHeadingElement).style.display = "block";
  (buttonAgain as HTMLDivElement).style.display = "inline-block";
  (finalScore as HTMLParagraphElement).style.display = "block";
  (rules as HTMLDivElement).style.display = "none";
  (modal as HTMLDivElement).style.display = "none";
  (modalImage as HTMLDivElement).style.display = "block";
};

const openHelpModal = () => {
  (modalTitle as HTMLHeadingElement).style.display = "none";
  (finalScore as HTMLParagraphElement).style.display = "none";
  (buttonAgain as HTMLDivElement).style.display = "none";
  (rules as HTMLDivElement).style.display = "block";
  (modal as HTMLDivElement).style.display = "block";
  (modalImage as HTMLDivElement).style.display = "none";
};

const addArchievement = (type: string) => {
  const icon = document.createElement("img");
  icon.src = "./assets/sword.png";
  icon.setAttribute("class", "sword-icon");

  if (type === "user") {
    (userAchievement as HTMLDListElement).appendChild(icon);
  }

  if (type === "robot") {
    (robotAchievement as HTMLDListElement).appendChild(icon);
  }
};

const play = (myChoice: string, robotChoice: string) => {
  ++currentGameRound;
  (activeRound as HTMLDivElement).innerHTML = `Round ${currentGameRound}`;

  // TODO: Need to fix game calculation proccess

  if (myChoice === "rock" && robotChoice === "scissors") {
    userScore += 1;
    robotScore += 0;
    isUserWonRound = true;
    isRobotWonRound = false;
  }
  if (myChoice === "rock" && robotChoice === "rock") {
    isUserWonRound = false;
    isRobotWonRound = false;
  }
  if (myChoice === "rock" && robotChoice === "paper") {
    userScore += 0;
    robotScore += 1;
    isUserWonRound = false;
    isRobotWonRound = true;
  }
  if (myChoice === "paper" && robotChoice === "rock") {
    userScore += 1;
    robotScore += 0;
    isUserWonRound = true;
    isRobotWonRound = false;
  }
  if (myChoice === "paper" && robotChoice === "paper") {
    isUserWonRound = false;
    isRobotWonRound = false;
  }
  if (myChoice === "paper" && robotChoice === "scissors") {
    userScore += 0;
    robotScore += 1;
    isUserWonRound = false;
    isRobotWonRound = true;
  }
  if (myChoice === "scissors" && robotChoice === "paper") {
    userScore += 1;
    robotScore += 0;
    isUserWonRound = true;
    isRobotWonRound = false;
  }
  if (myChoice === "scissors" && robotChoice === "scissors") {
    isUserWonRound = false;
    isRobotWonRound = false;
  }
  if (myChoice === "scissors" && robotChoice === "rock") {
    userScore += 0;
    robotScore += 1;
    isUserWonRound = false;
    isRobotWonRound = true;
  }

  if (isUserWonRound) {
    (userTile as HTMLDListElement).style.background = colorPalette.green;
    (robotTile as HTMLDListElement).style.background = colorPalette.white;
    addArchievement("user");

    setTimeout(() => {
      (userTile as HTMLDListElement).style.background = "";
      (roundResultElement as HTMLParagraphElement).innerText = "";
    }, 800);

    roundResult = options.win;
  }
  if (!isUserWonRound) {
    (userTile as HTMLDListElement).style.background = colorPalette.white;
    (robotTile as HTMLDListElement).style.background = colorPalette.green;

    setTimeout(() => {
      (robotTile as HTMLDListElement).style.background = colorPalette.white;
      (roundResultElement as HTMLParagraphElement).innerText = "";
    }, 800);
  }
  if (!isUserWonRound && !isRobotWonRound) {
    (userTile as HTMLDListElement).style.background = colorPalette.yellow;
    (robotTile as HTMLDListElement).style.background = colorPalette.yellow;
    roundResult = options.draw;

    setTimeout(() => {
      (userTile as HTMLDListElement).style.background = colorPalette.white;
      (robotTile as HTMLDListElement).style.background = colorPalette.white;
    }, 800);
  }

  if (isRobotWonRound) {
    addArchievement("robot");
    roundResult = options.lose;
  }

  for (let i = 0; i < questionMarks.length; i++) {
    (questionMarks[i] as HTMLDListElement).style.display = "none";
  }

  (robotImg as HTMLDListElement).style.display = "block";
  (userImg as HTMLDListElement).style.display = "block";
  robotImg?.setAttribute("src", `./assets/${robotChoice}.png`);
  userImg?.setAttribute("src", `./assets/${myChoice}.png`);
  userScoreElement.innerHTML = String(userScore);
  robotScoreElement.innerHTML = String(robotScore);
  (roundResultElement as HTMLParagraphElement).innerText = roundResult;
  (
    roundScore as HTMLParagraphElement
  ).innerText = `${userScore} - ${robotScore}`;

  setTimeout(() => {
    (roundResultElement as HTMLParagraphElement).innerText = "";
  }, 800);
};

const playAgain = () => {
  (modal as HTMLDivElement).style.display = "none";
  (board as HTMLDivElement).style.display = "none";
  (help as HTMLDivElement).style.display = "none";
  createNewGame();

  userScore = 0;
  robotScore = 0;
  currentGameRound = 1;
  userScoreElement.innerHTML = String(userScore);
  robotScoreElement.innerHTML = String(robotScore);
  (userTile as HTMLDListElement).style.background = colorPalette.white;
  (robotTile as HTMLDListElement).style.background = colorPalette.white;
  (activeRound as HTMLDivElement).innerText = `Round ${currentGameRound}`;

  for (let i = 0; i < questionMarks.length; i++) {
    (questionMarks[i] as HTMLDListElement).style.display = "block";
  }

  const userArchievementImage = document.createElement("img");
  userArchievementImage.setAttribute("src", "./assets/badge.png");
  userArchievementImage.setAttribute("class", "badge");
  userArchievementImage.setAttribute("alt", "badge");

  const robotArchievementImage = document.createElement("img");
  robotArchievementImage.setAttribute("src", "./assets/badge.png");
  robotArchievementImage.setAttribute("class", "badge");
  robotArchievementImage.setAttribute("alt", "badge");

  (robotImg as HTMLDListElement).style.display = "none";
  (userImg as HTMLDListElement).style.display = "none";
  (userAchievement as HTMLDListElement).innerHTML = "";
  (robotAchievement as HTMLDListElement).innerHTML = "";
  (userAchievement as HTMLDListElement).appendChild(userArchievementImage);
  (robotAchievement as HTMLDListElement).appendChild(robotArchievementImage);
  (roundScore as HTMLParagraphElement).innerText = "0 - 0";
};
