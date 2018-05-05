class HUD {
    constructor (startTime) {
        this.startTime = startTime;
        this.boxStartPoint = new Point(340, 300);
        this.boxEndPoint = new Point(505, 360);
        this.bestTime;
    }

    calculateEllapsedTime(currentTime) {
        var minutes = parseInt(Math.floor(currentTime - this.startTime) / 3600);
        var seconds = parseInt(Math.floor((currentTime - this.startTime) % 3600) / 60);
        var tenths = parseInt((currentTime - this.startTime) % 60);

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (tenths < 10) {
            tenths = "0" + tenths;
        }

        return minutes + ":" + seconds + ":" + tenths;
    }

    calculateBestTime() {
        var minutes = 0;
        var seconds = 0;
        var tenths = 0;
        
        if (this.bestTime != undefined) {
            minutes = parseInt(Math.floor(this.bestTime) / 3600);
            seconds = parseInt(Math.floor((this.bestTime) % 3600) / 60);
            tenths = parseInt((this.bestTime) % 60);
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (tenths < 10) {
            tenths = "0" + tenths;
        }

        return minutes + ":" + seconds + ":" + tenths;
    }

    draw(ctx, counter) {
        this.drawBox(ctx, this.calculateBestTime(), this.calculateEllapsedTime(counter));
        
    }

    drawEmpty(ctx) {
        this.drawBox(ctx, "00:00:00", "00:00:00");
    }

    drawBox(ctx, best, current) {
        ctx.beginPath();
        
        ctx.fillStyle = "#66666666";
        ctx.fillRect(this.boxStartPoint.x, this.boxStartPoint.y, this.boxEndPoint.x - this.boxStartPoint.x, this.boxEndPoint.y - this.boxStartPoint.y);
        ctx.fill();
        ctx.strokeStyle = "#000000ff";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.boxStartPoint.x, this.boxStartPoint.y, this.boxEndPoint.x - this.boxStartPoint.x, this.boxEndPoint.y - this.boxStartPoint.y);
        ctx.stroke();

        ctx.font = "20px Arial";
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.fillText("Melhor: " + best, 348, 322);
        ctx.fillText("Atual: " + current, 364, 350);
        ctx.stroke();
        ctx.closePath();
    }
 }