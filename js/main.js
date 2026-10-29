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
point_movement_multiplier = 3

var player1 = {
    varaX: min_vara, // 100
    varaY: 33,
    pointX: 0,
    pointY: min_point
}




var fish = new Fish(10, 150, 16, 10, "img/fish_1.png", 3);
var dock1 = new Obj(0,66,40,134,"img/dock.png")
var dock2 = new Obj(260,66,40,134,"img/dock.png")

function DrawBackgroundWater(){
    canvas.fillStyle = "#1818a5"
    canvas.fillRect(0, 87, canvasX, canvasY)
    canvas.fill()
}

function PlayerMovementCheck(){
    // Vara
    if(input.D){ // D
        if(player1.varaX+(1*vara_movement_multiplier) >= max_vara){
            player1.varaX = max_vara
        }else{
            player1.varaX = player1.varaX+(1*vara_movement_multiplier)
        }
    }
    else if(input.A){ // A
        if(player1.varaX-(1*vara_movement_multiplier) <= min_vara){
            player1.varaX = min_vara
        }else{
            player1.varaX = player1.varaX-(1*vara_movement_multiplier)
        }
    }

    // Point
    if(input.S){ // S
        if(player1.pointY+(1*point_movement_multiplier) >= max_point){
            player1.pointY = max_point
        }else{
            player1.pointY = player1.pointY+(1*point_movement_multiplier)
        }
    }
    else if(input.W){ // W
        if(player1.pointY-(1*point_movement_multiplier) <= min_point){
            player1.pointY = min_point
        }else{
            player1.pointY = player1.pointY-(1*point_movement_multiplier)
        }
    }
}

function Update()
{
    canvas.clearRect(0, 0, canvasX, canvasY); // limpa a tela

    DrawBackgroundWater() // desenha o fundo

    canvas.fillStyle = "black"//'#000000'
    canvas.fillRect(player1.varaX, player1.varaY, 3, 3)

    canvas.fillStyle = "red"//'#000000'
    canvas.fillRect(player1.varaX, player1.pointY, 3, 3)
    canvas.fill()

    fish.Update();
    fish.draw();
    fish.animation("fish");

    dock1.draw();
    dock2.draw();
}

setInterval(Update, 20);
setInterval(PlayerMovementCheck, 100);

document.addEventListener("keydown", function (e){
    if(e.key == "w" || e.key == "W"){
        input.W = true
    }
    if(e.key == "a" || e.key == "A"){
        input.A = true
    }
    if(e.key == "s" || e.key == "S"){
        input.S = true
    }
    if(e.key == "d" || e.key == "D"){
        input.D = true
    }
})

document.addEventListener("keyup", function (e){
    if(e.key == "w" || e.key == "W"){
        input.W = false
    }
    if(e.key == "a" || e.key == "A"){
        input.A = false
    }
    if(e.key == "s" || e.key == "S"){
        input.S = false
    }
    if(e.key == "d" || e.key == "D"){
        input.D = false
    }
})