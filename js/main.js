canvas = document.getElementById('canvas').getContext("2d");
fish = new Fish(10, 150, 10, 10, "img/fish_1.png", 3);

function Update()
{
    canvas.clearRect(0, 0, 300, 200);
    fish.Update();
    fish.draw();
    
}

setInterval(Update, 20);