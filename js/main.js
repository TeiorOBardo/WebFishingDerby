var canvas = document.getElementById('canvas').getContext("2d");

fish = new Fish(10, 150, 10, 10, "img/fish_1.png", 3);

var player1 = {
    px:80, // 100
    py:40,
}

function Update()
{
    canvas.fillStyle = "green"//'#000000'
    canvas.fillRect(10, 10, 1000, 100)
    canvas.fill()


    //canvas.clearRect(0, 0, 300, 200); // arrumar isso aqui
    fish.Update();
    fish.draw();
    fish.animation("fish");
}

setInterval(Update, 20);

document.addEventListener("keydown", function (e){
    //Player1
    if(e.keyCode === 87){ // W
        player1.py =- 8
    }
    else if(e.keyCode === 83){ // S
        player1.py =+ 8
    }
})

document.addEventListener("keyup", function (e){
    //Player1
    if(e.keyCode === 87){ // W
        player1.px =+ 1
    }
    else if(e.keyCode === 83){ // S
        player1.px =+ 1
    }
})