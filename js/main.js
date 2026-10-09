canvas = document.getElementById('canvas').getContext("2d");
fish = new Fish(10, 150, 10, 10, "img/fish.jpg", 3);

function Update()
{
    fish.Update();
    fish.draw();
}

setInterval(Update, 20);