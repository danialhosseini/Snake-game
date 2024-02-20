
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX  , foodY ;
let SnakeX = 5 , SnakeY = 10;
let velocityY=0 , velocityX=0;
let SnakeBody =[];
let setIntervalId;
let score = 0 ;
let highScore = localStorage.getItem("high-score") || 0;

const ChangeFoodPosition=()=>{
    foodX=Math.floor(Math.random()*30) +1;
    foodY=Math.floor(Math.random()*30) +1;
}
const handleGameOver =() =>{
    clearInterval(setIntervalId);
    alert("GAMEOVER,Press OK for replay...!");
    location.reload();
}
const changeDirection = (e) =>{
    if(e.key === "ArrowUp"  && velocityY != 1){
        velocityY = -1;
        velocityX = 0;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityY = 1;
        velocityX = 0;
    }else if(e.key === "ArrowRight" && velocityX != 1){
        velocityY = 0;
        velocityX = 1;
    }else if(e.key === "ArrowLeft" && velocityX != -1){
        velocityY = 0;
        velocityX = -1;
    }
}

const initGame = () => {
    if(gameOver) return handleGameOver()
    let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;
     
     if( SnakeX === foodX && SnakeY===foodY){
         ChangeFoodPosition();
         SnakeBody.push([foodX , foodY]);
         score++;
         highScore = score >= highScore ? score : highScore;
         localStorage.setItem("high-score" , highScore);
         scoreElement.innerText=`Score:  ${score}`;
         highScoreElement.innerText=`High Score:  ${highScore}`;
        }
    for (let i = SnakeBody.length -1; i > 0; i--) {
        SnakeBody[i] = SnakeBody[i -1]; 
        
    }
   
    SnakeBody[0] = [SnakeX , SnakeY];
    SnakeX += velocityX; 
    SnakeY += velocityY;
    if(SnakeX <= 0 || SnakeY > 30 || SnakeY <= 0 || SnakeX > 30){
        gameOver = true;
    }

    for (let i = 0 ; i < SnakeBody.length; i++) {
        
     htmlMarkup += `<div class="head" style="grid-area:${SnakeBody[i][1]} / ${SnakeBody[i][0]}"></div>`;
      if(i != 0 && SnakeBody[0][1] === SnakeBody[i][1] && SnakeBody[0][0] === SnakeBody[i][0])  {
        gameOver = true;  
      }
    }
    playBoard.innerHTML = htmlMarkup;
}
ChangeFoodPosition();
setIntervalId=setInterval(initGame , 100);
document.addEventListener("keydown" , changeDirection)
