class Palmtree {
    constructor (ctx) {
        this.ctx = ctx;
        this.radius = 10;
        this.leaveLength = 30;
        this.leaveWidth = 8;
        this.startPoint = new Point(0, this.radius * -1);
        this.controlPoint1 = new Point(this.leaveWidth, this.radius * -1);
        this.controlPoint2 = new Point(this.leaveWidth, this.radius * -1 - this.leaveLength);
        this.endPoint = new Point(0, this.radius * -1 - this.leaveLength);
        this.controlPoint3 = new Point(this.leaveWidth * -1, this.radius * -1 - this.leaveLength);
        this.controlPoint4 = new Point(this.leaveWidth * -1, this.radius * -1);
    }

    /**
     * Creates a palmtree with the specified number of leaves on top
     * @param {Point} center the center point of the palmtree 
     * @param {number} leaves the number of leaves on the palmtree
     */
    draw(center) {
        var leaves = center.angle;
        var angle = 360 / leaves;
        
        this.ctx.save();

        var grd = this.ctx.createLinearGradient(0, 0, this.endPoint.x, this.endPoint.y);
        grd.addColorStop(0, "green");
        grd.addColorStop(0.3, "#0aa801");
        grd.addColorStop(1, "#033500");

        this.ctx.fillStyle = grd;
        this.ctx.strokeStyle = "green";

        this.ctx.translate(center.x, center.y);

        for (var i = 1; i <= leaves; i++) {
            this.drawLeave();
            this.ctx.rotate(angle * Math.PI / 180);
        }

        this.drawCenter();

        this.ctx.restore();
    }

    drawLeave() {
        //this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
        

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);

        this.ctx.lineWidth = 3;
        this.ctx.lineTo(this.startPoint.x, this.startPoint.y);
        this.ctx.stroke();

        this.ctx.bezierCurveTo(this.controlPoint1.x,
            this.controlPoint1.y,
            this.controlPoint2.x,
            this.controlPoint2.y,
            this.endPoint.x,
            this.endPoint.y);

        this.ctx.bezierCurveTo(this.controlPoint3.x,
            this.controlPoint3.y,
            this.controlPoint4.x,
            this.controlPoint4.y,
            this.startPoint.x,
            this.startPoint.y);

        this.ctx.fill();

        this.ctx.closePath();
    }

    drawCenter() {
        this.ctx.moveTo(0, 0);

        this.ctx.beginPath();

        this.ctx.fillStyle = "#c68407";

        this.ctx.arc(0, 0, this.radius / 2, 0, Math.PI * 2);

        this.ctx.fill();

        this.ctx.closePath();
    }
}