class Car {
    constructor (ctx, x, y, angle) {
        this.ctx = ctx;
        this._img = new Image();
        this._img.src = "assets/blue-sports-car-top-view.svg";
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.carSize = 50;
        this.axlePosition = 5;
        
        this.topLeft = new Point (this.carSize * -1 / this.axlePosition, (this.carSize * -1 / 2) * this._img.height / this._img.width, 0);
        this.topRight = new Point (this.carSize * 4 / this.axlePosition, (this.carSize * -1 / 2) * this._img.height / this._img.width, 0);
        this.bottomLeft = new Point (this.carSize * -1 / this.axlePosition, (this.carSize / 2) * this._img.height / this._img.width, 0);
        this.bottomRight = new Point (this.carSize * 4 / this.axlePosition, (this.carSize / 2) * this._img.height / this._img.width, 0);

        this.center = new Point(this.carSize * -1 / this.axlePosition + this.carSize / 2, (this.carSize * this._img.height / this._img.width) / 2, 0);
    }

    draw(debug) {
        var _carX = this.carSize * -1 / this.axlePosition;
        var _carY = (this.carSize * -1 / 2) * this._img.height / this._img.width;

        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);

        if (debug) {
            this.ctx.moveTo(this.topLeft.x, this.topLeft.y);
            this.ctx.beginPath();
            this.ctx.fillStyle = "white";
            this.ctx.strokeStyle = "#ffffffff";
            //this.ctx.globalApha = 0;
            this.ctx.rect(this.topLeft.x, this.topLeft.y, this.carSize, this.carSize * this._img.height / this._img.width);
            this.ctx.stroke();
            //this.ctx.fill();
            //this.ctx.globalApha = 1;
            this.ctx.closePath();
        }

        this.ctx.drawImage(this._img, _carX, _carY, this.carSize, this.carSize * this._img.height / this._img.width);
        this.ctx.restore();
    }
}