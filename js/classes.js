class Obj
{
    frame = 1;
    timer = 0;
    constructor(x, y, width, height, image, animDuration)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.animDuration = animDuration
    }
    draw ()
    {
        var img = new Image();
        img.src = this.image;
        pincel.drawImage(img, this.x, this.y, this.width, this.height);
    }

    animation(name)
    {
        this.timer += 1;
        if(this.timer > 10)
        {
            this.timer = 0;
            this.frame += 1;
        }
        if(this.frame > this.animDuration-1)
        {
            this.frame = 1;
        }
        this.image = "img/" + name + this.frame + ".png";
    }
}