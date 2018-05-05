class Checkpoint {
    constructor (ctx, startPoint, endPoint) {
        this.ctx = ctx;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    draw(debug) {
        if (debug) {
            this.ctx.globalAlpha = 1;
        }
        else {
            this.ctx.globalAlpha = 0;
        }

        this.ctx.strokeStyle = "#19c9ff";
        this.ctx.lineWidth = 10;

        this.ctx.beginPath();
        this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
        this.ctx.lineTo(this.endPoint.x, this.endPoint.y);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.moveTo(0, 0);

        this.ctx.globalAlpha = 1;
    }
}