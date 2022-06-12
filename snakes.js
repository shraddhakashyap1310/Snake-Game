let inputDir={x:0,y:0};
const foodSound=new Audio('food_found.wav');
const pathDirectionChange=new Audio('direction.wav');
const gameOver=new Audio('game_over.wav');
const startSound=new Audio('startSound.mp3');

let speed=20;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    {x:15,y:17}
];
food={x:12,y:10};
//game function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    //if you collide in yourself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            gameOver.play();
            return true;
        }
    }
    if(snake[0].x>=20 || snake[0].x<=0 || snake[0].y>=20 || snake[0].y<=0){
        gameOver.play();
        return true;
    }
      return false;  
}

function gameEngine(){
    //part 1:updating the snake array and food
    if(isCollide(snakeArr)){
        
        inputDir={x:0,y:0};
        alert("Game Over...press any key to play again");
        snakeArr=[{x:15,y:17}];
        score=0;
    }
    // if you have eaten the food ,increment the score and generate the
   if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
       foodSound.play();
       score =score + 1;
       scoreBox.innerHTML="Score: " + score;
       if(score>=highscoreval){
           highscoreval=score;
           localStorage.setItem("highscore",JSON.stringify(highscoreval));
           highscoreBox.innerHTML="High Score: "+highscoreval;
       }
       snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
       let a=2;
       let b=19;
       food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
   }

   //moving snake
   for (let i = snakeArr.length-2; i >=0; i--) {
       snakeArr[i+1]={...snakeArr[i]};
   }

   snakeArr[0].x+=inputDir.x;
   snakeArr[0].y+=inputDir.y;
    //part 2:display the snake and food
    //display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
      
        }
          board.appendChild(snakeElement);
    });
    //display food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}


//main logic
let highscore=localStorage.getItem("highscore");
if(highscore===null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval=JSON.parse(highscore);
    highscoreBox.innerHTML="High score:" +highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir={x:0,y:1} ;   //start the game
    pathDirectionChange.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;    
        default:
            break;
    }
     
});

















//game loop - init,draw,update
/*
--requestAnimationFrame() is much better than setInterval()--

function init(){
    //console.log(init);
    canvas=document.getElementById('mycanvas');
    pen=canvas.getContext('2d');
    W=canvas.width;
    H=canvas.height;
    box={
        x:10,
        y:20,
        w:20,
        h:20
    }
}

function draw(){
    //console.log(draw);
    pen.fillStyle="green";s
    pen.fillRect(box.x,box.y,box.w,box.h);
}

function update(){
    console.log(update);
}

function gameloop(){
    draw();
    update();
}

init();
setInterval(gameloop,100);     //calls gameloop after 100ms time*/