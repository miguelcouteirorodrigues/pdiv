class Track {
    constructor () {
        this.delta = 40;
        this.points = [];
        this.lastPoint;
        this._img = new Image();
        this._img.src = "./assets/track.png";
        //this._img.crossOrigin = "localhost";
    }

    drawTrack(ctx) {
        var _scaleX = 1;
        var _scaleY = 1;
        
        ctx.save();
        //this.traceLine(ctx);
        ctx.imageSmoothingEnabled = "true";
        ctx.drawImage(this._img, 0, 0, this._img.width * _scaleX, this._img.height * _scaleY);
        ctx.restore();
    }

    /* traceLine(ctx) {
        this.points.push(new Point(0, ctx.canvas.height / 2 - this.delta, 0));
 
        ctx.lineWidth = 4;

        this.straightLine(ctx, 0, ctx.canvas.height / 2 - this.delta, 300, ctx.canvas.height / 2 - this.delta, null, false, null);
        this.turn(ctx, this.lastPoint, 60, true);
        this.straightLine(ctx, this.lastPoint.x, this.lastPoint.y, null, null, this.lastPoint.angle, true, 200);
        this.turn(ctx, this.lastPoint, 60, true);
    }

    straightLine(ctx, startX, startY, endX, endY, degrees, angleInRads, length) {
        var rads;
        
        if(degrees != null && length != null) {
            if (angleInRads) {
                rads = degrees;
            }
            else {
                rads = this.degreesToRadians(degrees);
            }
            var endPoint = this.getEndPosition(startX, startY, rads, length);
            endX = endPoint.x;
            endY = endPoint.y;
        }
        else {
            rads = 0;
        }
        
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        this.points.push(new Point(endX, endY, rads));
        this.lastPoint = new Point(endX, endY, rads);
    } */

    /**
     * Creates a turn to the specified side with the indicated angle.
     * @param {function} ctx the canvas context on which to draw the turn
     * @param {number} x the x coordinate to start the turn at
     * @param {number} y the y coordinate to start the turn at
     * @param {number} degrees the angle of the turn in degrees
     * @param {boolean} side if true goes left, if false goes right
     */
    /*turn(ctx, point, degrees, side) {
        var rads = this.degreesToRadians(degrees);
        var radius = 40;
        var newPoint;
        var _x = 0;
        var _y = 0;
        var _angle = 0;

        if (point.angle != 0)
        {
            if (point.angle > 0) {
                var tempPoint = this.getEndPosition(point.x, point.y, 0, radius);

                _x = tempPoint.x;
                _y = tempPoint.y;
                _angle = point.angle;
            }
        }
        else {
            _x = point.x;
            _y = point.y;
            _angle = point.angle;
        }

        ctx.save();
        
        if (side) {
            ctx.translate(_x + Math.sin(_angle) * radius, _y - Math.cos(_angle) * radius);
            ctx.rotate(_angle);
            ctx.arc(0, 0, radius, Math.PI / 2, (Math.PI / 2) - rads, true);
            newPoint = new Point(_x + Math.sin(rads) * radius, (_y - radius) + Math.cos(rads) * radius, rads);
        }
        else {
            ctx.translate(_x, _y);
            //ctx.rotate(Math.PI / 2);
            ctx.fillRect(0, 0, 20, 10);
            ctx.arc(0, 0, radius, Math.PI, Math.PI + rads, false);
        }
        ctx.stroke();
        ctx.restore();

        this.points.push(newPoint)
        this.lastPoint = newPoint;

        //ctx.restore();
    } */

    /**
     * Converts degrees into radians
     * @param {number} deg value to convert 
     */
    /* degreesToRadians (deg) {
        return deg * Math.PI / 180;
    }

    radiansToDegree (rad) {
        return rad * 180 / Math.PI;
    } */

    /**
     * Returns end coordinates based on current ones, length of line, and angle to be drawn
     * @param {number} startX  starting x position
     * @param {number} startY starting y position
     * @param {number} angle the angle at which to draw the line
     * @param {number} length the length of the line
     */
    /* getEndPosition (startX, startY, rads, length) {
        var _yLength = length * Math.sin(rads);
        var _xLength = Math.sqrt(length*length - _yLength*_yLength);
        
        if (rads > 0) {
            _yLength = _yLength * -1;
        }

        var _x = _xLength + startX;
        var _y = _yLength + startY;

        return new Point(_x, _y, rads);
    } */
}