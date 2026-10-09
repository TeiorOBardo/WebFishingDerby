canvas = document.getElementById('canvas').getContext("2d");


function Update()
{
    canvas.fillStyle = '#000000';
    canvas.fillRect (0, 0, 300, 200);
}

setInterval(Update, 20);