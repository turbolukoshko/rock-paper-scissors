// Types
// Global variables
// Number of points to win
var POINTS_TO_WIN = 3;
var currentGameRound = 1;
var userScore = 0;
var robotScore = 0;
var myChoice = "";
var robotChoice = "";
var isUserWonRound = false;
var isRobotWonRound = false;
var roundResult = "";
var options = {
    win: "WIN",
    lose: "LOSE",
    draw: "DRAW",
};
var colorPalette = {
    white: "#fff",
    green: "#29da16",
    yellow: "#ffea00",
    grey: "#e4e4e5",
};
var gameOptions = {
    0: "rock",
    1: "scissors",
    2: "paper",
};
// Selectors
var gameMode = document.querySelector(".game-mode");
var buttonStart = document.querySelector(".button-start");
var board = document.querySelector(".board");
var picker = document.querySelector(".picker");
var pickItem = document.querySelectorAll(".picker__items");
var userImg = document.querySelector(".user-image");
var robotImg = document.querySelector(".robot-image");
var questionMarks = document.querySelectorAll(".question-mark");
var userTile = document.querySelector(".button-user");
var robotTile = document.querySelector(".button-robot");
var userScoreElement = document.querySelectorAll(".user-score")[0];
var robotScoreElement = document.querySelectorAll(".robot-score")[0];
var activeRound = document.querySelector(".round");
var modal = document.querySelector(".modal-overlay");
var modalTitle = document.querySelector(".modal__content-title");
var finalScore = document.querySelector(".modal__content-final-score");
var userAchievement = document.querySelector(".user-achievement");
var robotAchievement = document.querySelector(".robot-achievement");
var roundResultElement = document.querySelector(".round-result");
var score = document.querySelector(".score");
var roundScore = document.querySelector(".round-score");
var title = document.querySelector(".title");
var description = document.querySelector(".description");
var help = document.querySelector(".help");
var rulesBlock = document.querySelector(".rules-block");
var rules = document.querySelectorAll(".rules")[1];
var buttonAgain = document.querySelector(".button-again");
var loader = document.querySelector(".loader");
var loaderCountdown = document.querySelector(".loader__countdown");
var main = document.querySelector(".main");
var robotAvatar = document.querySelector(".robot-avatar");
var modalImage = document.querySelector(".modal__image");
// Event Listeners
buttonStart === null || buttonStart === void 0 ? void 0 : buttonStart.addEventListener("click", function () { return createNewGame(); });
pickItem.forEach(function (item) {
    item.addEventListener("click", function (e) {
        var target = e.target;
        if (target instanceof HTMLElement) {
            // Allow clicks only on .button-item
            if (target.classList.contains("button-item")) {
                if (POINTS_TO_WIN > userScore && POINTS_TO_WIN > robotScore) {
                    robotChoice = random();
                    // Block user clicks for 800ms. When calculating the round result
                    picker.style.background = colorPalette.grey;
                    picker.style.pointerEvents = "none";
                    setTimeout(function () {
                        picker.style.background = "transparent";
                        picker.style.pointerEvents = "auto";
                    }, 800);
                    play(e.target.value, robotChoice);
                }
                if (userScore === POINTS_TO_WIN || robotScore === POINTS_TO_WIN) {
                    gameOver();
                }
            }
        }
    });
});
// Functions
var createNewGame = function () {
    // Countdown timer
    var countdownTimer = 3;
    main.style.display = "none";
    loader.style.display = "flex";
    loaderCountdown.innerHTML = "Game starts in ".concat(countdownTimer--);
    // Game loading interval by 3 seconds by default
    var interval = setInterval(function () {
        if (countdownTimer) {
            robotAvatar.src = "./assets/robot-".concat(countdownTimer, ".png");
            loaderCountdown.innerHTML = "Game starts in ".concat(countdownTimer--);
        }
        else {
            loader.style.display = "none";
            clearInterval(interval);
        }
    }, 1000);
    // Start game in 3 seconds after loading
    setTimeout(function () { return createGameBoard(); }, 3000);
};
var createGameBoard = function () {
    gameMode.style.display = "none";
    board.style.display = "flex";
    help.style.display = "block";
    rulesBlock.style.display = "none";
    title.style.display = "none";
    description.style.display = "none";
};
// Get the converted value for robot choice
var random = function () {
    var index = Math.floor(Math.random() * 3);
    return gameOptions[index];
};
var gameOver = function () {
    var result = userScore > robotScore ? "You win!" : "You lose!";
    modalTitle.innerHTML = result;
    finalScore.innerHTML = "Final score - ".concat(userScore, " : ").concat(robotScore);
    modal.style.display = "block";
    var imageSrc = userScore > robotScore ? "../assets/win.png" : "../assets/lose.png";
    modalImage === null || modalImage === void 0 ? void 0 : modalImage.setAttribute("src", imageSrc);
};
var closeModal = function () {
    modalTitle.style.display = "block";
    buttonAgain.style.display = "inline-block";
    finalScore.style.display = "block";
    rules.style.display = "none";
    modal.style.display = "none";
    modalImage.style.display = "block";
};
var openHelpModal = function () {
    modalTitle.style.display = "none";
    finalScore.style.display = "none";
    buttonAgain.style.display = "none";
    rules.style.display = "block";
    modal.style.display = "block";
    modalImage.style.display = "none";
};
var addArchievement = function (type) {
    var icon = document.createElement("img");
    icon.src = "./assets/sword.png";
    icon.setAttribute("class", "sword-icon");
    if (type === "user") {
        userAchievement.appendChild(icon);
    }
    if (type === "robot") {
        robotAchievement.appendChild(icon);
    }
};
var play = function (myChoice, robotChoice) {
    ++currentGameRound;
    activeRound.innerHTML = "Round ".concat(currentGameRound);
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
        userTile.style.background = colorPalette.green;
        robotTile.style.background = colorPalette.white;
        addArchievement("user");
        setTimeout(function () {
            userTile.style.background = "";
            roundResultElement.innerText = "";
        }, 800);
        roundResult = options.win;
    }
    if (!isUserWonRound) {
        userTile.style.background = colorPalette.white;
        robotTile.style.background = colorPalette.green;
        setTimeout(function () {
            robotTile.style.background = colorPalette.white;
            roundResultElement.innerText = "";
        }, 800);
    }
    if (!isUserWonRound && !isRobotWonRound) {
        userTile.style.background = colorPalette.yellow;
        robotTile.style.background = colorPalette.yellow;
        roundResult = options.draw;
        setTimeout(function () {
            userTile.style.background = colorPalette.white;
            robotTile.style.background = colorPalette.white;
        }, 800);
    }
    if (isRobotWonRound) {
        addArchievement("robot");
        roundResult = options.lose;
    }
    for (var i = 0; i < questionMarks.length; i++) {
        questionMarks[i].style.display = "none";
    }
    robotImg.style.display = "block";
    userImg.style.display = "block";
    robotImg === null || robotImg === void 0 ? void 0 : robotImg.setAttribute("src", "./assets/".concat(robotChoice, ".png"));
    userImg === null || userImg === void 0 ? void 0 : userImg.setAttribute("src", "./assets/".concat(myChoice, ".png"));
    userScoreElement.innerHTML = String(userScore);
    robotScoreElement.innerHTML = String(robotScore);
    roundResultElement.innerText = roundResult;
    roundScore.innerText = "".concat(userScore, " - ").concat(robotScore);
    setTimeout(function () {
        roundResultElement.innerText = "";
    }, 800);
};
var playAgain = function () {
    modal.style.display = "none";
    board.style.display = "none";
    help.style.display = "none";
    createNewGame();
    userScore = 0;
    robotScore = 0;
    currentGameRound = 1;
    userScoreElement.innerHTML = String(userScore);
    robotScoreElement.innerHTML = String(robotScore);
    userTile.style.background = colorPalette.white;
    robotTile.style.background = colorPalette.white;
    activeRound.innerText = "Round ".concat(currentGameRound);
    for (var i = 0; i < questionMarks.length; i++) {
        questionMarks[i].style.display = "block";
    }
    var userArchievementImage = document.createElement("img");
    userArchievementImage.setAttribute("src", "./assets/badge.png");
    userArchievementImage.setAttribute("class", "badge");
    userArchievementImage.setAttribute("alt", "badge");
    var robotArchievementImage = document.createElement("img");
    robotArchievementImage.setAttribute("src", "./assets/badge.png");
    robotArchievementImage.setAttribute("class", "badge");
    robotArchievementImage.setAttribute("alt", "badge");
    robotImg.style.display = "none";
    userImg.style.display = "none";
    userAchievement.innerHTML = "";
    robotAchievement.innerHTML = "";
    userAchievement.appendChild(userArchievementImage);
    robotAchievement.appendChild(robotArchievementImage);
    roundScore.innerText = "0 - 0";
};
