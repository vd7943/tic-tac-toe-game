const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO

const winPatterns = [
    [0, 1, 2], 
    [0, 3, 6], 
    [0, 4, 8],
    [1, 4, 7], 
    [2, 5, 8], 
    [2, 4, 6],
    [3, 4, 5], 
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide")
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "X";
            box.classList.add("xPlayer")
            box.classList.remove("oPlayer")
            turnO = false;
        }
        else{
            box.innerText = "O";
            box.classList.add("oPlayer")
            box.classList.remove("xPlayer")
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    })
})

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("xPlayer", "oPlayer")
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText = "Oh! It is a draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    let isDraw = true;
    for(let pattern of winPatterns){
        let pos1 =  boxes[pattern[0]].innerText;
        let pos2 =  boxes[pattern[1]].innerText;
        let pos3 =  boxes[pattern[2]].innerText;
 
        //winning condition
        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return;
            }
        }

        // if any box is empty it is not a draw
        if(pos1 === "" || pos2 === "" || pos3 === ""){
            isDraw = false;
        }
    }
        // if all the boxes are filled and no winner then it is a draw
        if(isDraw){
            showDraw();
        }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
