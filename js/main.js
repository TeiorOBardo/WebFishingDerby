var canvas = document.getElementById('canvas').getContext("2d");
canvasX = 300
canvasY = 200

var input = {
    W: false,
    A: false,
    S: false,
    D: false,
    Up: false,
    Lelt : false,
    Right : false,
    Down : false,
}

min_vara = 30
max_vara = canvasX/2
min_point = 33
max_point = canvasY-3
vara_movement_multiplier = 6
point_movement_multiplier = 3
grabDistance = 10;




function RandomFishX()
{
    return ~~(25 + Math.random() * (canvasX-50))
}

var fish1 = new Fish(RandomFishX(), 185, 16, 10, "img/fish_1.png", 3);
var fish2 = new Fish(RandomFishX(), 170, 16, 10, "img/fish_1.png", 3);
var fish3 = new Fish(RandomFishX(), 155, 16, 10, "img/fish_1.png", 3);
var fish4 = new Fish(RandomFishX(), 140, 16, 10, "img/fish_1.png", 3);
var fish5 = new Fish(RandomFishX(), 125, 16, 10, "img/fish_1.png", 3);
var fish6 = new Fish(RandomFishX(), 110, 16, 10, "img/fish_1.png", 3);
var shark = new Fish(RandomFishX(), 95, 70, 13, "img/shark_1.png", 3);
var fishes = [fish1, fish2, fish3, fish4, fish5, fish6];
var dock1 = new Obj(0,66,40,134,"img/dock.png")
var dock2 = new Obj(260,66,40,134,"img/dock.png")
var wave = new Wave(0, 71, 299, 9, "img/wave/0.png", 42)
var frontwave = new FrontWave(0, 80, 299, 7, "img/front_wave/0.png", 42)

fishes.forEach(function(fish){
    if(Math.random() < 0.5)
    {
        return;
    }
    fish.direction *= -1;
    fish.flipped = !fish.flipped;
    fish.mouthX = fish.startMouthX - fish.mouthX;
})
shark.startMouthX = 77;
shark.mouthX = 77;


var player1 = {
    score: 0,
    varaX: min_vara, // 100
    varaY: 33,
    pointX: 0,
    pointY: min_point,
    startVaraX: 20,
    grabbing : false,
    grabbedFish : fishes[0]
}

var player2 = {
    score: 0,
    varaX: max_vara, // 100
    varaY: 33,
    pointX: 0,
    pointY: max_point,
    startVaraX: canvasX-20,
    grabbing : false,
    grabbedFish : fishes[0]
}

var players = [player1, player2];



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

function DrawPlayer(player)
{
    canvas.strokeStyle = "black"//'#000000'
    canvas.beginPath();
    canvas.moveTo(player.startVaraX  + 0.5, player.varaY + 0.5);
    canvas.lineTo(player.varaX + 0.5, player.varaY + 0.5);
    canvas.stroke();

    canvas.strokeStyle = '#8a8b8b'

    canvas.beginPath();
    canvas.moveTo(player.varaX  + 0.5, player.varaY + 0.5);
    canvas.lineTo(player.varaX + 0.5, player.pointY + 0.5);
    canvas.stroke();

    if(player.grabbing)
    {
        player.grabbedFish.x = player.varaX - player.grabbedFish.mouthX;
        player.grabbedFish.y = player.pointY - player.grabbedFish.mouthY;
    }
}

function CheckCollision(player, fish)
{
    if((Math.abs(player.varaX - (fish.x + fish.mouthX)) <= grabDistance)&&(Math.abs(player.pointY - (fish.y + fish.mouthY)) <= grabDistance))
    {
        player.grabbing = true;
        player.grabbedFish = fish;
        fish.isGrabbed = true;
    }
}
function CheckCollisionShark(player, fish)
{
    if((Math.abs(player.varaX - (fish.x + fish.mouthX)) <= grabDistance/2)&&(Math.abs(player.pointY - (fish.y + fish.mouthY)) <= grabDistance/2))
    {
        player1.grabbing = false;
        player1.grabbedFish.y = player1.grabbedFish.startY;
        player1.grabbedFish.x = RandomFishX();
        player1.grabbedFish.isGrabbed = false;
    }
}

function Update()
{
    canvas.clearRect(0, 0, canvasX, canvasY); // limpa a tela

    DrawBackgroundWater() // desenha o fundo

    fishes.forEach(function(fish){
        fish.Update();
    } );
    fishes.forEach(function(fish){
        fish.draw();
    } );
    fishes.forEach(function(fish){
        fish.animation("fish");
    } );

    shark.speed = player1.grabbing ? 9 : 3;
        
    shark.Update();
    shark.draw();
    shark.animation("shark");

    wave.animation()
    frontwave.animation()
    wave.draw();
    dock1.draw(); // desenha uma doca no cenário
    dock2.draw(); // desenha uma doca no cenário
    frontwave.draw()

    //canvas.fillStyle = "black"//'#000000'
    //canvas.fillRect(player1.varaX, player1.varaY, 3, 3) // desenha posição vara de pesca

    DrawPlayer(player1)
    if(!player1.grabbing)
    {
        fishes.forEach(function(fish){
        if(!fish.isGrabbed)
        {
            CheckCollision(player1, fish)
        }
    } );
    
    }
    if(player1.grabbing)
    {
        player1.varaX += Math.random() < 0.5 ? 1 : -1;
        CheckCollisionShark(player1, shark);
        if((player1.varaX < 23)||(player1.varaX > (canvasX/2 + 7)))
        {
            player1.grabbing = false;
            player1.grabbedFish.y = player1.grabbedFish.startY;
            player1.grabbedFish.x = RandomFishX();
            player1.grabbedFish.isGrabbed = false;
        }
    }
    if(player1.grabbing && player1.grabbedFish.y < 80)
    {
        player1.score += player1.grabbedFish.score;
        player1.grabbing = false;
        player1.grabbedFish.y = player1.grabbedFish.startY;
        player1.grabbedFish.x = RandomFishX();
        player1.grabbedFish.isGrabbed = false;
    }

    //canvas.fillStyle = "red"//'#000000'
    //canvas.fillRect(player1.varaX, player1.pointY, 3, 3) // desenha posição anzol
    //canvas.fill()
}



setInterval(Update, 20);
setInterval(PlayerMovementCheck, 100);

document.addEventListener("keydown", function (e){
    // WASD Controls
    if(e.key == "w" || e.key == "W"){ input.W = true }
    if(e.key == "a" || e.key == "A"){ input.A = true }
    if(e.key == "s" || e.key == "S"){ input.S = true }
    if(e.key == "d" || e.key == "D"){ input.D = true }

    // Arrow Key Controls (Separate inputs)
    if(e.key == "ArrowUp"){ input.ArrowUp = true }
    if(e.key == "ArrowLeft"){ input.ArrowLeft = true }
    if(e.key == "ArrowDown"){ input.ArrowDown = true }
    if(e.key == "ArrowRight"){ input.ArrowRight = true }
})

document.addEventListener("keyup", function (e){
    // WASD Controls
    if(e.key == "w" || e.key == "W"){ input.W = false }
    if(e.key == "a" || e.key == "A"){ input.A = false }
    if(e.key == "s" || e.key == "S"){ input.S = false }
    if(e.key == "d" || e.key == "D"){ input.D = false }

    // Arrow Key Controls (Separate inputs)
    if(e.key == "ArrowUp"){ input.ArrowUp = false }
    if(e.key == "ArrowLeft"){ input.ArrowLeft = false }
    if(e.key == "ArrowDown"){ input.ArrowDown = false }
    if(e.key == "ArrowRight"){ input.ArrowRight = false }
})