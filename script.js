// Track the current score for both player and computer
let userScore = 0;
let computerScore = 0;

// Reference all choice icons inside the game board
const choices = document.querySelectorAll(".choices img");

// UI element references for score display and result modal
const userScorePara = document.querySelector("#user-score");
const computerScorePara = document.querySelector("#computer-score");
const resultModal = document.querySelector("#resultModal");
const resultText = document.querySelector("#resultText");
const playerChoiceImg = document.querySelector("#playerChoiceImg");
const computerChoiceImg = document.querySelector("#computerChoiceImg");
const playAgainBtn = document.querySelector("#playAgainBtn");
const resetBtn = document.querySelector("#resetBtn");

// Map the choice name to its corresponding image path
const choiceImages = {
    rock: "./images/rock.png",
    paper: "./images/paper.png",
    scissor: "./images/scissor.png"
};

// Generate a random choice for the computer for each round
const genComputerChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
};

// Display the result modal with the selected images and result text
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

// Main game logic: compare user move with computer move and update score
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

// Close the result modal and return to the game board
const closeResultModal = () => {
    resultModal.classList.remove("show");
};

// Reset the game to its initial state and hide the modal
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

// Close the result modal if the user clicks outside the modal content area
resultModal.addEventListener("click", (e) => {
    if (e.target === resultModal) {
        closeResultModal();
    }
});