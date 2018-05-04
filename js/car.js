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

        this._carX = this.carSize * -1 / this.axlePosition;
        this._carY = (this.carSize * -1 / 2) * (this._img.height / this._img.width);
    }

    draw(debug) {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);

        if (debug) {
            this.ctx.moveTo(this.topLeft.x, this.topLeft.y);

            this.ctx.strokeStyle = "#fc0ad8";
            this.ctx.lineWidth = 2;

            this.ctx.beginPath();
            this.ctx.rect(this.topLeft.x, this.topLeft.y, this.carSize, this.carSize * this._img.height / this._img.width);
            this.ctx.stroke();
            this.ctx.closePath();
        }

        this.ctx.imageSmoothingEnabled = "true";
        this.ctx.drawImage(this._img, this._carX, this._carY, this.carSize, this.carSize * this._img.height / this._img.width);
        this.ctx.restore();
    }
}