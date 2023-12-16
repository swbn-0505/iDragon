score=0;
cross=true;
game=false;

jump_audio=new Audio("jump.mp3");
gameOver_audio=new Audio("gameOver.mp3");

document.onkeydown=function(e) {
    console.log("Key code : "+e.key);

    if (e.key=='ArrowUp' || e.key=='w') {
        player=document.querySelector(".player");
        player.classList.add("animatePlayer");
        setTimeout(() => {
            player.classList.remove("animatePlayer");
        }, 700);
    }

    if (e.key==='ArrowRight' || e.key=='d') {
        player=document.querySelector(".player");
        playerForward=window.parseInt(getComputedStyle(player,null).getPropertyValue("left"));

        player.style.left=playerForward+112+"px";
    }

    if (e.key==='ArrowLeft' || e.key=='a') {
        player=document.querySelector(".player");
        playerForward=window.parseInt(getComputedStyle(player,null).getPropertyValue("left"));

        player.style.left=playerForward-112+"px";
    }
}

setInterval(() => {
    player=document.querySelector(".player");
    dragon=document.querySelector(".dragon");
    gameOver=document.querySelector(".gameOver");
    restartGame=document.querySelector(".refresh-button");

    px=parseInt(window.getComputedStyle(player,null).getPropertyValue("left"));
    py=parseInt(window.getComputedStyle(player,null).getPropertyValue("top"));

    dx=parseInt(window.getComputedStyle(dragon,null).getPropertyValue("left"));
    dy=parseInt(window.getComputedStyle(dragon,null).getPropertyValue("top"));

    offsetX=Math.abs(px-dx);
    offsetY=Math.abs(py-dy);

    // console.log(offsetX,offsetY);

    if (offsetX<110 && offsetY<90) {
        gameOver_audio.play();
        setTimeout(() => {
            gameOver_audio.pause();
        }, 2000);
        //gameOver.style.visibility="visible";
        dragon.classList.remove("animateDragon");
        gameOver.innerHTML="Game Over 👎"
        restartGame.style.visibility="visible";

        game=true;
    }
    else if (offsetX<145 && cross && !game){
        score+=1;
        jump_audio.play();
        currentScore(score);
        cross=false;

        setTimeout(() => {
            cross=true;
        }, 1000);

       setTimeout(() => {
        animationDur=parseFloat(window.getComputedStyle(dragon,null).getPropertyValue("animation-duration"));
    
        newDur=animationDur-0.05;
    
        dragon.style.animationDuration=newDur+"s";

       }, 500);
    }

}, 100);

function currentScore(score) {
    scoreCont.innerHTML="Your Score : "+ score ;
}

function refreshPage() {
    location.reload(true); 
}
