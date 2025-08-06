
//game constant
let inputDir = { x: 0, y: 0 };

const foodSound = new Audio("./music/food.mp3");
const gameoverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");

let snakeArr = [
    { x: 13, y: 15 }
]

let foodItem = { x: 7, y: 9 }

let speed = 6;
let score = 0;
let lastPaintTime = 0;




//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);



    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }

    lastPaintTime = ctime;
    gameEngine();
}


//logic after colide the snake
function isCollide(snakeArr) {


    //if you bump into its own body

    for (i = 1; i <= snakeArr.length - 1; i++) {
        if (snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y) {
            return true;
        }
    }

    //if you bump into the wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }




    return false;
}

function gameEngine() {
    //part 1: Updating the snake array & food
    if (isCollide(snakeArr)) {
        gameoverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over ! please press any key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        myscore.innerHTML = score;


    }



    //if you have eaten the food, increment the score and regenerate the food and increase the snake by one element
    if (snakeArr[0].y === foodItem.y && snakeArr[0].x === foodItem.x) {
        foodSound.play();
        score += 1;

        if (score > hiScoreVal) {

            hiScoreVal = score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
            let highScoreBox = document.getElementById("highScoreBox");
            highScoreBox.innerHTML = "🌟High Score :" + hiScoreVal;

        }

        myscore = document.getElementById("myScore");
        myscore.innerHTML = score

        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        foodItem = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }




    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    //part 2: Display the snake 
    board = document.getElementById("board");
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;



        if (index === 0) {
            snakeElement.classList.add("snakeHead");
        } else {
            snakeElement.classList.add("snakeBody");
        }

        board.appendChild(snakeElement);
    })


    //part 3: Display the food

    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = foodItem.y;
    foodElement.style.gridColumnStart = foodItem.x;
    foodElement.classList.add("food");

    board.appendChild(foodElement);
}









//implement high score logic using local storage
let hiScore = localStorage.getItem("hiScore")
if (hiScore == null) {
    hiScoreVal = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
}
else {

    hiScoreVal = JSON.parse(hiScore);
    let highScoreBox = document.getElementById("highScoreBox");
    highScoreBox.innerHTML = "🌟High Score :" + hiScore;
}




//our logic starts here
window.requestAnimationFrame(main);

window.addEventListener('keydown', (e) => {

    musicSound.play();
    inputDir = { x: 0, y: 1 } //start the game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            // console.log("Arrowup");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            console.log("Default");

    }
})

