var cnv = document.getElementById("snekCanvas");
var ctx = cnv.getContext("2d");
var btns = document.getElementById("buttons");
var posx;
var posy;
var dirx;
var diry;
var gameon = false;
var inter;
var snake;
var apple;
var score = document.getElementById("title");
var loop = true;

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    btns.innerHTML = "<button class='btns' onclick='left()'>&#9668;</button><button class='btns' onclick='space()'>SPACE</button><button class='btns' onclick='right()'>&#9658;</button>";
}

//snake class
class Snek{
    newPos(posx,posy){
        this.posx = posx;
        this.posy = posy;
    }
    get prevx(){
        return this.posx;
    }
    get prevy(){
        return this.posy;
    }
    draw(){
        ctx.fillRect(this.posx,this.posy,40,40);
    }
}

//apple class
class Apple{
    newPos(posx,posy){
        this.posx = posx;
        this.posy = posy;
    }
    get prevx(){
        return this.posx;
    }
    get prevy(){
        return this.posy;
    }
    draw(){
        ctx.fillStyle = "tomato";
        ctx.fillRect(this.posx,this.posy,40,40);
        ctx.fillStyle = "white";
    }
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function gameOver(result){
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    clearTimeout(inter);
    for(i=0;i<500;i++){
        printText("GAME OVER",100,"rgb(0, 64, 64)",i,1.5*i);
        printText("Your score: " + result,40,"rgb(0, 64, 64)",40+i,1.5*i);
    }
    printText("GAME OVER",100,"tomato",0,0);
    printText("Your score: " + result,40,"tomato",40,0);
    score.innerHTML = "SNEK";
    gameon=false;
    snake.length=0;
}

function youWon(result){
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    clearTimeout(inter);
    for(i=0;i<500;i++){
        printText("You Won!",100,"rgb(0, 64, 64)",i,1.5*i);
        printText("Your score: " + result,40,"rgb(0, 64, 64)",40+i,1.5*i);
    }
    printText("You Won!",100,"gold",0,0);
    printText("Your score: " + result,40,"gold",40,0);
    score.innerHTML = "SNEK";
    gameon=false;
    snake.length=0;
}

//used to print messages
function printText(string,size,colour,offsetx,offsety){
    ctx.fillStyle = colour;
    ctx.font = size + "px Monospace";
    ctx.textAlign = "center";
    var x = cnv.width/2 + offsety;
    var y = cnv.height/2 + offsetx;
    ctx.fillText(string,x,y);
    ctx.fillStyle = "white";
}

printText("SNEK",100,"white",0,0);
printText("Press 'Space' to Start",30,"white",50,0);

//Stering
document.addEventListener("keydown",function(e){
    
    if(e.which == 32){
        posx = 0;
        posy = 400;
        dirx = 1;
        diry = 0;
        gameon=true;
        apple = new Apple;
        apple.newPos(getRandomInt(20,30)*40,400);
        snake = [new Snek()];
        clearTimeout(inter);
        inter = setInterval(move,200);
    }

    if(e.which == 38 && gameon){
        if(diry == 0){
            dirx = 0;
            diry = -1;
            clearTimeout(inter);
            move();
            inter = setInterval(move,200);
        }
    }

    if(e.which == 40 && gameon){
        if(diry == 0){
            dirx = 0;
            diry = 1;
            clearTimeout(inter);
            move();
            inter = setInterval(move,200);
        }
    }

    if(e.which == 39 && gameon){
        if(dirx == 0){
            diry = 0;
            dirx = 1;
            clearTimeout(inter);
            move();
            inter = setInterval(move,200);
        }
    }

    if(e.which == 37 && gameon){
        if(dirx == 0){
            diry = 0;
            dirx = -1;
            clearTimeout(inter);
            move();
            inter = setInterval(move,200);
        }
    }
});

//Stering on mobile
function space(){
    posx = 0;
    posy = 400;
    dirx = 1;
    diry = 0;
    gameon=true;
    apple = new Apple;
    apple.newPos(getRandomInt(20,30)*40,400);
    snake = [new Snek()];
    clearTimeout(inter);
    inter = setInterval(move,200);
}

function left(){
    if(gameon){
        if(dirx==1 && diry==0){
            dirx=0;
            diry=-1;
            clearTimeout(inter);
            move();
            inter = setInterval(move,200);
        }
        else if(dirx==0 && diry==-1){
            dirx=-1;
            diry=0;
            clearTimeout(inter);
            move();
            inter = setInterval(move,200);
        }
        else if(dirx==-1 && diry==0){
            dirx=0;
            diry=1;
            clearTimeout(inter);
            move();
            inter = setInterval(move,200);
        }
        else if(dirx==0 && diry==1){
            dirx=1;
            diry=0;
            clearTimeout(inter);
            move();
            inter = setInterval(move,200);
        }
    }
}

function right(){
    if(gameon){
        if(dirx==1 && diry==0){
            dirx=0;
            diry=1;
            clearTimeout(inter);
            move();
            inter = setInterval(move,200);
        }
        else if(dirx==0 && diry==1){
            dirx=-1;
            diry=0;
            clearTimeout(inter);
            move();
            inter = setInterval(move,200);
        }
        else if(dirx==-1 && diry==0){
            dirx=0;
            diry=-1;
            clearTimeout(inter);
            move();
            inter = setInterval(move,200);
        }
        else if(dirx==0 && diry==-1){
            dirx=1;
            diry=0;
            clearTimeout(inter);
            move();
            inter = setInterval(move,200);
        }
    }
}

//Timed move function
function move(){
    if(gameon){
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        posx = posx + dirx * 40;
        posy = posy + diry * 40;


        if(posx==apple.posx && posy==apple.posy){
            score.innerHTML = "Score: " + snake.length;
            snake.push(new Snek());

            if(snake.length == 800){
                youWon(snake.length-1);
                return null;
            }

            loop=true;
            while(loop == true){
                loop = false;
                var ax = getRandomInt(0,40)*40;
                var ay = getRandomInt(0,20)*40;

                for(i=0;i<snake.length;i++){
                    if(ax==snake[i].prevx && ay==snake[i].prevy){
                        loop = true;
                        break;
                    }
                }
            }
            apple.newPos(ax,ay);
        }

        for(i=snake.length-1;i>=0;i--){
            if(i==0){
                snake[i].newPos(posx,posy);
            }
            else{
                snake[i].newPos(snake[i-1].prevx,snake[i-1].prevy)
            }
            snake[i].draw();
        }
        apple.draw();
    }

    //Checking if snake has gone out of borders
    if(posx>=1600 || posx<0 || posy>=800 || posy<0){
        gameOver(snake.length-1);
        return null;
    }

    //Checking if snake has eaten itself
    for(i=4;i<snake.length;i++){
        if(posx == snake[i].prevx && posy == snake[i].prevy){
            gameOver(snake.length-1);
            return null;
        }
    }
}