var canvas = document.getElementById('canvas').getContext("2d");
canvasX = 300
canvasY = 200

var input = {
    W: false,
    A: false,
    S: false,
    D: false
}

min_vara = 30
max_vara = canvasX/2
min_point = 33
max_point = canvasY-3
vara_movement_multiplier = 6
point_movement_multiplier = 2

var player1 = {
    varaX: min_vara, // 100
    varaY: 33,
    pointX: 0,
    pointY: min_point
}




var fish = new Fish(10, 150, 10, 10, "img/fish_1.png", 3);


function Update()
{
    canvas.clearRect(0, 0, canvasX, canvasY); // limpa a tela

    canvas.fillStyle = "black"//'#000000'
    canvas.fillRect(player1.varaX, player1.varaY, 3, 3)

    canvas.fillStyle = "red"//'#000000'
    canvas.fillRect(player1.varaX, player1.pointY, 3, 3)
    canvas.fill()

    fish.Update();
    fish.draw();
    fish.animation("fish");
}

setInterval(Update, 20);

document.addEventListener("keydown", function (e){
    ////Player1
    //Vara
    if(e.keyCode === 68){ // D
        if(player1.varaX+(1*vara_movement_multiplier) >= max_vara){
            player1.varaX = max_vara
        }else{
            player1.varaX = player1.varaX+(1*vara_movement_multiplier)
        }
    }
    else if(e.keyCode === 65){ // A
        if(player1.varaX-(1*vara_movement_multiplier) <= min_vara){
            player1.varaX = min_vara
        }else{
            player1.varaX = player1.varaX-(1*vara_movement_multiplier)
        }
    }
    //Point
    if(e.keyCode === 83){ // S
        if(player1.pointY+(1*point_movement_multiplier) >= max_point){
            player1.pointY = max_point
        }else{
            player1.pointY = player1.pointY+(1*point_movement_multiplier)
        }
    }
    else if(e.keyCode === 87){ // W
        if(player1.pointY-(1*point_movement_multiplier) <= min_point){
            player1.pointY = min_point
        }else{
            player1.pointY = player1.pointY-(1*point_movement_multiplier)
        }
    }
})

document.addEventListener("keyup", function (e){
    //Player1
})