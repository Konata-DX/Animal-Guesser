const startButton = document.getElementById("start");
const instruction = document.querySelector("p")
const question = document.getElementById("question");

startButton.addEventListener("click", async () => {
    instruction.remove()
    startButton.remove();
    response = await fetch("tree.json");
    const data = await response.json();
    startGame(data);
});

function startGame (tree) {
    const card = document.querySelector(".card");
    const decisionContainer = document.createElement("div");
    decisionContainer.classList.add("decision-container");
    card.append(decisionContainer);
    
    const yesButton = document.createElement("button");
    yesButton.textContent = "Yes";
    yesButton.id = "yes";
    yesButton.classList.add("decision");
    decisionContainer.append(yesButton);
    
    const noButton = document.createElement("button");
    noButton.textContent = "No";
    noButton.id = "no";
    noButton.classList.add("decision");
    decisionContainer.append(noButton);
    
    decisionButtons = document.querySelectorAll(".decision");
    let isGuessing = true;
    let current = tree;
    question.textContent = current.question;
    
    decisionButtons.forEach(button => {
        button.addEventListener("click", event => {
            if (!isGuessing) {
                return;
            }
            current = current[event.target.id];
            
            switch (current.type) {
                    case "decision":
                        question.textContent = current.question
                        break;
                    case "leaf":
                        question.textContent = `Your animal is: ${current.animal} | Refresh this page to play again`;
                        yesButton.remove();
                        noButton.remove();
                        isGuessing = false;
                        break;
            }
        });
    });
}