let userScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll(".choices img");

const userScorePara = document.querySelector("#user-score");
const computerScorePara = document.querySelector("#computer-score");
const resultModal = document.querySelector("#resultModal");
const resultText = document.querySelector("#resultText");
const playerChoiceImg = document.querySelector("#playerChoiceImg");
const computerChoiceImg = document.querySelector("#computerChoiceImg");
const playAgainBtn = document.querySelector("#playAgainBtn");
const resetBtn = document.querySelector("#resetBtn");

const choiceImages = {
    rock: "./images/rock.png",
    paper: "./images/paper.png",
    scissor: "./images/scissor.png"
};

const genComputerChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
};

const showResult = (userChoice, computerChoice, result) => {
    playerChoiceImg.src = choiceImages[userChoice];
    computerChoiceImg.src = choiceImages[computerChoice];
    
    resultText.classList.remove("win", "lose", "draw");
    
    if (result === "win") {
        resultText.innerText = "🎉 You Win! 🎉";
        resultText.classList.add("win");
    } else if (result === "lose") {
        resultText.innerText = "😢 Computer Wins! 😢";
        resultText.classList.add("lose");
    } else {
        resultText.innerText = "🤝 It's a Draw! 🤝";
        resultText.classList.add("draw");
    }
    
    resultModal.classList.add("show");
};

const playGame = (userChoice) => {
    const computerChoice = genComputerChoice();

    if(userChoice === computerChoice){
        showResult(userChoice, computerChoice, "draw");
    }
    else if(
        (userChoice === "rock" && computerChoice === "scissor") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissor" && computerChoice === "paper")
    ){
        userScore++;
        userScorePara.innerText = userScore;
        showResult(userChoice, computerChoice, "win");
    }
    else{
        computerScore++;
        computerScorePara.innerText = computerScore;
        showResult(userChoice, computerChoice, "lose");
    }
};

const closeResultModal = () => {
    resultModal.classList.remove("show");
};

const resetGame = () => {
    userScore = 0;
    computerScore = 0;
    userScorePara.innerText = userScore;
    computerScorePara.innerText = computerScore;
    closeResultModal();
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

playAgainBtn.addEventListener("click", closeResultModal);
resetBtn.addEventListener("click", resetGame);

// Close modal when clicking outside of it
resultModal.addEventListener("click", (e) => {
    if (e.target === resultModal) {
        closeResultModal();
    }
});