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
    Down : false
}

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

var playermodel_1 = new Obj(2,33,32,33,"img/player1.png")
var playermodel_2 = new Obj(266,33,32,33,"img/player2.png")

var grabfish_plr1 = new Audio('/sfx/grabfish_plr1.wav');
var grabfish_plr2 = new Audio('/sfx/grabfish_plr2.wav');
var plr1_point = new Audio('/sfx/plr1_point.wav');
var plr2_point = new Audio('/sfx/plr2_point.wav');
var sharkbite = new Audio('/sfx/sharkbite.wav');
var ambience = new Audio('/sfx/ambience.wav');
ambience.loop = true
ambience.play()

fishes.forEach(function(fish){
    if(Math.random() < 0.5)
    {
        return;
    }
    fish.direction *= -1;
    fish.flipped = !fish.flipped;
    fish.mouthX = fish.startMouthX - fish.mouthX;
})
fish3.score = 4;
fish4.score = 4;
fish1.score = 6;
fish2.score = 6;
shark.startMouthX = 77;
shark.mouthX = 77;


min_point = 58
max_point = canvasY-3
vara_movement_multiplier = 6
point_movement_multiplier = 3
max_score = 10;
grabDistance = 10;

var player1 = {
    score: 0,
    minVara: 50,
    maxVara: (canvasX/2)-3,
    varaX: 50, // 100
    varaY: 48,
    pointX: 0,
    pointY: min_point,
    startVaraX: 20,
    grabbing : false,
    grabbedFish : fishes[0],
    id: 1
}

var player2 = {
    score: 0,
    minVara: (canvasX/2)+3,
    maxVara: canvasX-50,
    varaX: canvasX-50, // 100
    varaY: 48,
    pointX: 0,
    pointY: min_point,
    startVaraX: canvasX-20,
    grabbing : false,
    grabbedFish : fishes[0],
    id: 2
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
        if(player1.varaX+(1*vara_movement_multiplier) >= player1.maxVara){
            player1.varaX = player1.maxVara
        }else{
            player1.varaX = player1.varaX+(1*vara_movement_multiplier)
        }
    }
    else if(input.A){ // A
        if(player1.varaX-(1*vara_movement_multiplier) <= player1.minVara){
            player1.varaX = player1.minVara
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

    if(input.Right){ // D
        if(player2.varaX+(1*vara_movement_multiplier) >= player2.maxVara){
            player2.varaX = player2.maxVara
        }else{
            player2.varaX = player2.varaX+(1*vara_movement_multiplier)
        }
    }
    else if(input.Left){ // A
        if(player2.varaX-(1*vara_movement_multiplier) <= player2.minVara){
            player2.varaX = player2.minVara
        }else{
            player2.varaX = player2.varaX-(1*vara_movement_multiplier)
        }
    }

    // Point
    if(input.Down){ // S
        if(player2.pointY+(1*point_movement_multiplier) >= max_point){
            player2.pointY = max_point
        }else{
            player2.pointY = player2.pointY+(1*point_movement_multiplier)
        }
    }
    else if(input.Up){ // W
        if(player2.pointY-(1*point_movement_multiplier) <= min_point){
            player2.pointY = min_point
        }else{
            player2.pointY = player2.pointY-(1*point_movement_multiplier)
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
        if(player.id == 1){
            grabfish_plr1.play()
        }
        if(player.id == 2){
            grabfish_plr2.play()
        }
        player.grabbing = true;
        player.grabbedFish = fish;
        fish.isGrabbed = true;
    }
}
function CheckCollisionShark(player, fish)
{
    if((Math.abs(player.varaX - (fish.x + fish.mouthX)) <= grabDistance/2)&&(Math.abs(player.pointY - (fish.y + fish.mouthY)) <= grabDistance/2))
    {
        sharkbite.play()
        player.grabbing = false;
        player.grabbedFish.y = player.grabbedFish.startY;
        player.grabbedFish.x = RandomFishX();
        player.grabbedFish.isGrabbed = false;
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

    shark.speed = (player1.grabbing || player2.grabbing) ? 9 : 3;
        
    shark.Update();
    shark.draw();
    shark.animation("shark");

    wave.animation()
    frontwave.animation()
    wave.draw();

    playermodel_1.draw()
    playermodel_2.draw()

    dock1.draw(); // desenha uma doca no cenário
    dock2.draw(); // desenha uma doca no cenário
    frontwave.draw()

    //canvas.fillStyle = "black"//'#000000'
    //canvas.fillRect(player1.varaX, player1.varaY, 3, 3) // desenha posição vara de pesca

    players.forEach(function(player){
        DrawPlayer(player)
    }) 
    players.forEach(function(player){
        if(!player.grabbing )
        {
            fishes.forEach(function(fish){
            if(!fish.isGrabbed)
            {
                CheckCollision(player, fish)
            }
        } );
        }  
    })


    players.forEach(function(player){
        if(player.grabbing)
        {
            player.varaX += Math.random() < 0.5 ? 1 : -1;
            CheckCollisionShark(player, shark);
            if((player.varaX < player.minVara-6)||(player.varaX > player.maxVara+6))
            {
                if(player.id == 1){
                    plr1_point.play()
                }
                if(player.id == 2){
                    plr2_point.play()
                }
                player.grabbing = false;
                player.grabbedFish.y = player.grabbedFish.startY;
                player.grabbedFish.x = RandomFishX();
                player.grabbedFish.isGrabbed = false;
            }
        }
        if(player.grabbing && player.grabbedFish.y < 80)
        {
            if(player.id == 1){
                    plr1_point.play()
                }
                if(player.id == 2){
                    plr2_point.play()
                }
            player.score += player.grabbedFish.score;
            if(player.score >= max_score)
            {
                EndGame();
            }
            player.grabbing = false;
            player.grabbedFish.y = player.grabbedFish.startY;
            player.grabbedFish.x = RandomFishX();
            player.grabbedFish.isGrabbed = false;
        }
    })

    canvas.fillStyle = "red"//'#000000'
    canvas.fillRect(0, 0, player1.score/max_score*canvasX/2, 10) // desenha posição anzol
    canvas.fill()

    canvas.fillStyle = "green"//'#000000'
    canvas.fillRect(canvasX - player2.score/max_score*canvasX/2, 0, canvasX, 10) // desenha posição anzol
    canvas.fill()


}

function EndGame()
{
    clearInterval(loopId1, )
    clearInterval(loopId2)
    canvas.font = "12px serif";
    var winner = (player1.score > player2.score)? 1 : 2
    canvas.fillStyle = winner == 1 ? "red" : "green"
    canvas.fillText("GAME OVER! Player " + winner + " WON", 80, 120);
}


var loopId1 = setInterval(Update, 20);
var loopId2 = setInterval(PlayerMovementCheck, 100);

document.addEventListener("keydown", function (e){
    // WASD Controls
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
    }
    if(e.key == "w" || e.key == "W"){ input.W = true }
    if(e.key == "a" || e.key == "A"){ input.A = true }
    if(e.key == "s" || e.key == "S"){ input.S = true }
    if(e.key == "d" || e.key == "D"){ input.D = true }

    // Arrow Key Controls (Separate inputs)
    if(e.key == "ArrowUp"){ input.Up = true }
    if(e.key == "ArrowLeft"){ input.Left = true }
    if(e.key == "ArrowDown"){ input.Down = true }
    if(e.key == "ArrowRight"){ input.Right = true }
})

document.addEventListener("keyup", function (e){
    // WASD Controls
    if(e.key == "w" || e.key == "W"){ input.W = false }
    if(e.key == "a" || e.key == "A"){ input.A = false }
    if(e.key == "s" || e.key == "S"){ input.S = false }
    if(e.key == "d" || e.key == "D"){ input.D = false }

    // Arrow Key Controls (Separate inputs)
    if(e.key == "ArrowUp"){ input.Up = false }
    if(e.key == "ArrowLeft"){ input.Left = false }
    if(e.key == "ArrowDown"){ input.Down = false }
    if(e.key == "ArrowRight"){ input.Right = false }
})